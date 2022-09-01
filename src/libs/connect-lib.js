import * as ecs from "./ecs-lib.js";
var http = require("http");
var _ = require("lodash");

//TODO:  The design of this mechanism assumes that there are N number of configuration items (distinct Java tasks, usually)
//that run against a single ECS task.  This is exampled by the fact that each IP lookup only references the first item in the array,
// which is a hard coded value.  It may be prudent to allow running multiple tasks each with a distinct set of configuration,
//and if that is determined to be the case, quite a bit of refactoring will be required in this library, and in how the configuration
//is passed to this library to facilitate that use case.

const resolver = (req, resolve) => {
  console.log("Finished");
  req.socket.destroy();
  resolve(req.statusCode);
};

export async function connectRestApiWithRetry(params) {
  return new Promise((resolve, reject) => {
    var retry = function (e) {
      console.log("Got error: " + e);
      setTimeout(async function () {
        return await connectRestApiWithRetry(params);
      }, 5000);
    };
    var options = {
      hostname: params.hostname,
      port: params.port || 8083,
      path: params.path || "",
      method: params.method || "GET",
      headers: params.headers || {
        "Content-Type": "application/json",
      },
    };
    const req = http.request(options, (res) => {
      res
        .on("data", (d) => {
          console.log(d.toString("utf-8"));
        })
        .on("error", (error) => {
          console.log(error.toString("utf-8"));
          retry.call(`${error}`);
        })
        .on("end", (d) => {
          resolver(req, resolve);
        });
    });
    if (params.body) {
      req.write(JSON.stringify(params.body));
    }
    req.end();
  });
}

export async function putConnectors(cluster, service, connectors) {
  const workerIp = await ecs.findIpForEcsService(cluster, service);
  await connectRestApiWithRetry({
    hostname: workerIp,
  });
  for (var i = 0; i < connectors.length; i++) {
    console.log(
      `Putting connector with config: ${JSON.stringify(connectors[i], null, 2)}`
    );
    //This won't account for multiple tasks with multiple interfaces
    await connectRestApiWithRetry({
      hostname: workerIp,
      path: `/connectors/${connectors[i].name}/config`,
      method: "PUT",
      body: connectors[i].config,
    });
  }
}

export async function restartConnectors(cluster, service, connectors) {
  const workerIp = await ecs.findIpForEcsService(cluster, service);
  for (var i = 0; i < connectors.length; i++) {
    let connector = _.omit(connectors[i], "config");
    connector.tasks = connectors[i].config["tasks.max"];
    console.log(`Restarting connector: ${JSON.stringify(connector, null, 2)}`);
    //This won't account for multiple tasks with multiple interfaces
    await connectRestApiWithRetry({
      hostname: workerIp,
      path: `/connectors/${connectors[i].name}/tasks/0/restart`,
      method: "POST",
    });
  }
}

export async function deleteConnector(ip, name) {
  return new Promise((resolve, reject) => {
    var retry = function (e) {
      console.log("Got error: " + e);
      setTimeout(async function () {
        return await deleteConnector(ip, name);
      }, 5000);
    };

    var options = {
      hostname: ip,
      port: 8083,
      path: `/connectors/${name}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      res
        .on("data", (d) => {
          console.log(d.toString("utf-8"));
          if (JSON.parse(d).message != `Connector ${name} not found`) {
            return retry.call(d.toString("utf-8"));
          }
        })
        .on("error", (error) => {
          return retry.call(`${error}`);
        })
        .on("end", (d) => {
          resolver(req, resolve);
        });
    });
    req.write(JSON.stringify({}));
    req.end();
  });
}

export async function deleteConnectors(cluster, service, connectors) {
  const workerIp = await ecs.findIpForEcsService(cluster, service);
  for (var i = 0; i < connectors.length; i++) {
    console.log(`Deleting connector: ${connectors[i]}`);
    //This won't account for multiple tasks with multiple interfaces
    await deleteConnector(workerIp, connectors[i]);
  }
}

export async function testConnector(ip, config) {
  return new Promise((resolve, reject) => {
    var options = {
      hostname: ip,
      port: 8083,
      path: `/connectors/${config.name}/status`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Test Kafka-connect service", options);
    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      res
        .on("data", (d) => {
          console.log(d.toString("utf-8"));
          var data = JSON.parse(d);
          if (data.connector.state != "RUNNING") {
            throw new Error(
              `Expected ${data.name} state to be RUNNING, saw state ${data.connector.state}`
            );
          }
        })
        .on("error", (error) => {
          console.log(error);
        })
        .on("end", (d) => {
          resolver(req, resolve);
        });
    });

    req.write(JSON.stringify({}));
    req.end();
  });
}

export async function testConnectors(cluster, service, connectors) {
  const workerIp = await ecs.findIpForEcsService(cluster, service);
  for (var i = 0; i < connectors.length; i++) {
    console.log(`Testing connector: ${connectors[i].name}`);
    //This won't account for multiple tasks with multiple interfaces
    await testConnector(workerIp, connectors[i]);
  }
}
