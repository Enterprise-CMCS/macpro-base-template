---
layout: default
title: topics
parent: Services
nav_order: 2
---

# topics
{: .no_toc }

#### Summary

The topics service creates MMDL data topics in CMS Bigmac.  These topics are later used by the connector service, and are what hold the MMDL business data.

#### Notes

- The topics service is deployed for all branches/stages, without exception.
- the service builds a lambda function, which has access to a CMS Bigmac environment.  **The mmdl main branch, as well as all mmdl dev branches, connect to the shared Bigmac main cluster.  The mmdl val branch connects to the Bigmac val cluster.  The mmdl production branch connects to the production cluster**
- This lambda is invoked just after the service's deployment.  It connects to Bigmac and creates the data topics as defined in [createTopics.js](link src/services/topics/handlers/createTopics.js).
- To support 'n' number of dev branches connecting to the shared Bigmac main cluster, all mmdl dev branches create their topics with a prefix:  `--mmdl--branchname--`.  So the topics service for the 'foo' branch in the mmdl repository will create all of its topics with `--mmdl-foo--` as a topic prefix.  The mmdl 'main', 'val', and 'production' branches do not have such a prefix.
