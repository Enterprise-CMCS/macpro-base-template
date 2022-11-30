---
layout: default
title: connector
parent: Services
nav_order: 3
---

# connector
{: .no_toc }

#### Summary

The connector service deploys a Kafka Connect docker container into ECS Fargate, on which runs an Oracle JDBC connector.  This connector streams changes out of MMDL's Oracle database for a specified list of tables.

#### Notes

- An ECS Cluster, ECS Service, and ECS Task definition are deployed.  The task definition runs a single (desiredCount: 1) container of the confluent-cp/kafka-connect image.  
- The ECS Task gets the Bigmac brokerString added to it as an environment variable.  On task startup, the task connects to Kafka/Bigmac.  Here, it creates a status, config, and offsets topic in bigmac.  These topics are also prefixed with '--mmdl--branchname--' if the stage being deployed is a dev environment connecting to master Bigmac.
- Also on ECS Task startup, connectors are downloaded and installed.  In the case of this service, the JDBC connector is installed.  This is what is used to stream data from MMDL.
- A lambda function, named configureConnectors, is built and deployed.  This lambda gets MMDL Oracle database information injected into it via environment variables.  This lambda deploys directly after service deployment.  It's job is to use the Kafka Connect REST API to create the MMDL source connector on the Kafka Connect ECS task.
- The kafka connect ECS task can be reached via ECS Exec, for debugging.  This is supported as a top level run command in the repo.  See [connecting to an ECS task](link to it here).
- An EventBridge rule is made that will publish to the 'alerts' service SNS topic if the ECS task dies unexpectedly.