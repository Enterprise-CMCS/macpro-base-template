---
layout: default
title: Overview
nav_order: 2
---

# Overview
{: .no_toc }

The 10,000ft view
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

View this site's [\_config.yml](https://github.com/cmsgov/mmdl-connectors/tree/main/_config.yml) file as an example.

## Overview

The mmdl-connectors project is a MACPRO microservice deployed to AWS which sends CMS Meidcaid Model Data Lab (MMDL) data to [CMS Bigmac](https://github.com/cmsgov/cms-bigmac) in realtime.  It deploys a [Kafka Connect](https://docs.confluent.io/platform/current/connect/index.html) service to ECS Fargate.  The Kafka Connect service is configured with a [JDBC Source connector](https://docs.confluent.io/kafka-connectors/jdbc/current/index.html), which watches MMDL's Oracle database for data changes and sends them to topics in CMS Bigmac.  AWS Lambda is used to create topics in Bigmac, as well as some other perform some other deployment operations.  Alerting is leveraged through AWS Cloudwatch.  

## Archtecture

![Architecture Diagram](../../../assets/architecture.svg)
