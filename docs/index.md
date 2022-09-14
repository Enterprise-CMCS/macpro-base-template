---
layout: default
title: Home
nav_order: 1
description: "The mmdl-connectors project is a serverless monorepo template.  It sets up projects the way we like them, and exists to get ideas from zero to deployed as fast as possible."
permalink: /
---

# mmdl-connectors
{: .fs-9 }

The mmdl-connectors project is a MACPRO microservice sending CMS Meidcaid Model Data Lab (MMDL) data to CMS Bigmac in realtime.
{: .fs-6 .fw-300 }

[Join us on Slack](https://cmsgov.slack.com/archives/C0403M0D007){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/cmsgov/mmdl-connectors){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Welcome!

The mmdl-connectors project is a MACPRO microservice deployed to AWS which sends CMS Meidcaid Model Data Lab (MMDL) data to [CMS Bigmac](https://github.com/cmsgov/cms-bigmac) in realtime.  It deploys a [Kafka Connect](https://docs.confluent.io/platform/current/connect/index.html) service to ECS Fargate.  The Kafka Connect service is configured with a [JDBC Source connector](https://docs.confluent.io/kafka-connectors/jdbc/current/index.html), which watches MMDL's Oracle database for data changes and sends them to topics in CMS Bigmac.  AWS Lambda is used to create topics in Bigmac, as well as some other perform some other deployment operations.  Alerting is leveraged through AWS Cloudwatch.  

This project is under active development by the MACPRO Platform team.  Read on for more details, and feel free to join us on [Slack](https://cmsgov.slack.com/archives/C0403M0D007).

Thanks, and we're glad you're here!

---

## About the project

The mmdl-connectors project is a work of the MACPRO Platform Team for the [Centers for Medicare & Medicaid Services (CMS)](https://www.cms.gov/).


#### Thank you to the contributors of mmdl-connectors!

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>
