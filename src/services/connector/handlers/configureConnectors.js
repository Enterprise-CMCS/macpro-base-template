import * as connect from "./../../../libs/connect-lib";

const connectors = [];

async function myHandler(event, context, callback) {
  await connect.putConnectors(
    process.env.cluster,
    process.env.service,
    connectors
  );
  await connect.deleteConnectors(process.env.cluster, process.env.service, []);
  await connect.restartConnectors(
    process.env.cluster,
    process.env.service,
    connectors
  );
}

exports.handler = myHandler;
