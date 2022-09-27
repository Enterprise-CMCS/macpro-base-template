---
layout: default
title: Connect to the Connector
parent: Development Workflows
nav_order: 6
---

# Connect to the Connector
{: .no_toc }

How-to to remote onto the connector service running in ECS Fargate.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

### Connect to the Connector

#### Summary
The connector service deploys a continuously running ECS Fargate task.  For debugging and testing purposes, it's often useful to gain access to the connector and use it's [REST API](https://docs.confluent.io/platform/current/connect/references/restapi.html).  This procedure will allow you to remote directly onto the running ECS task, where you can interact with the api in a local fashion.

#### Prerequisites:
- Completed all [onboarding]({{ site.baseurl }}{% link docs/onboarding/onboarding.md %})

#### Procedure
- [Obtain and set AWS CLI credentials]({{ site.baseurl }}{%link docs/development-workflows/aws-auth.md %})
- Use the run script's top level 'connect' command to generate the connection string:
  ```bash
    cd mmdl-connectors
    run connect --service [servicename] --stage [stagename]
  ```
  If the connector ECS task is running, this will output a command that begins with 'aws'.
- Copy the command outputted by the above step, paste it into your terminal, and hit Enter.
- You should now be on the connector task.  You may interact with the Kafka Connect REST API by curling the ip address stored in the $SELF environment variable.  For example:
  ```bash
    curl http://$SELF:8083/connectors | python -m json.tool
  ```
- When you want to exit the task, simply run `exit`.  You will be automatically exited after a certain time period of no activity.

#### Notes
- Due to the CMS VPC's not having DNS hostname support enabled, 'localhost' will not function for interacting with the REST API.  This is why the above proecdure uses the $SELF environment variable.  This environment variable holds the private IP address of the running ECS task.  So, when you interact/curl $SELF, you are indeed hitting the task you are currently sitting on, just not with the word 'localhost'.  FWIW, '127.0.0.1' won't work either; use $SELF.
- The procedure asks you to copy and paste a command, rather than simply running it, due to some odd shell behavior.  If I remember correctly, if the script automatically ran the command, any error in something you execute would cause you to get kicked off the ECS task.  This can and should be revisited.  I don't like the copy and paste step.
