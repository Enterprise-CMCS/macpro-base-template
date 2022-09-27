---
layout: default
title: ksqldb
parent: Services
nav_order: 4
---

# ksqldb
{: .no_toc }

#### Summary

The ksqldb service is used to combine mmdl db records into easy to manage streams of data.

#### DDL

The data definition layer or DDL, contains the SQL files which are parsed and concatenated into a single file that is handed off
to the ksqlDB database during deploy time in order to create the requisite streams and tables that will be hosted within the
ksqlDB database.

#### Structure

The directory structure can contain any level of nesting. By default, the structure is iterated in alphanumeric sort order,
but an optional manifest file, `manifest.js`, may be applied to determine the sort order of any given directory. This manifest
file must contain an array of all items within the directory structure in the order in which each item will be parsed, but only
file with a `.sql` extension will be parsed, and this extension is not case dependent. This array must be assigned to the
manifest attribute within the module exports. See the following example:

```
module.exports.manifest = [
  "global_config.sql",
  "orders",
  "inventory",
  "users"
  "fulfillment_centers"
];
```

If any items exist a level in which a manifest file exists, and those items are not listed in the manifest, the sort order
in which the items are parsed cannot be guaranteed.

#### Result

The result of the compilation process, is that all of the files with a `.sql` file extension are parsed in the default, or
prescribed order, and all contents concatenated into `headlessSqlContents` variable. This variable is echoed in the standard
input within the headless ksqlDB instance during deploy time, into a file in the following location: `/home/appuser/headless.sql`.
This file is referenced in the ksqlDB configuration and is used to define the requisite streams and tables to be deployed in ksqlDB.

#### Notes

- The ksqldb service includes both headless and interactive ecs clusters/tasks. The Headless task desired count is set to 1, the interactive desired task count is set to 0 but can be increased for development and testing purposes.
- Similar to the approach taken in bigmac the sql files are all located within the ddl directory and are combined using the combineDDL function. This function combines all of the sql files into a single file which is zipped and uploaded as an artifact to the deployment bucket via the service's single lambda.
- stage parameters are used to define environment specific values for cpu, cache, memory, heap, and importantly: topicNamespace.
- Namespacing ephemeral topics is crucial and is defined among these stage parameters for ephemeral stages as:
  `--${self:custom.project}--${sls:stage}--` which is used to preface all topics in this service.
- An example sql query is provided at `ddl/mmdl/example.sql` which outlines a basic example of ingesting a topic, creating a nested stream, and using that stream to create a queryable stream using a namespaced topic.
- In order to correctly delete all of the automatically created \_confluent-ksql-\* generated topics the deleteTopics function has been modified.
- The ksql service ID is used to define the ksql cluster membership of a server instance. We are customizing this value for the headless and interactive server instances as `${param:topicNamespace}${self:service}-headless` and `${param:topicNamespace}${self:service}-interactive` respectively.
