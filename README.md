<h1 align="center" style="border-bottom: none;">mmdl-connectors</h1>
<h3 align="center">A microservice sending CMS Medicaid Model Data Lab (MMDL) data to CMS Bigmac.</h3>
<p align="center">
  <a href="https://cmsgov.slack.com/archives/C0403M0D007">
    <img alt="Slack" src="https://img.shields.io/badge/Slack-mmdl--connectors-purple.svg">
  </a>
  <a href="https://codeclimate.com/repos/63122231cf202c2a4a00ffe9/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/719b68a07022e9833caf/maintainability" />
  </a>
  <a href="https://dependabot.com/">
    <img alt="Dependabot" src="https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
</p>

## Overview

The mmdl-connnectors project (oftened referenced in the context of this repository as just 'mmdl') is a microservice that streams Medicaid Data Lab (MMDL) data from it's Oracle database to CMS Bigmac's Kafka cluster in real time. It is powered by Kafka Connect and a JDBC connector.

That's all for now; this project was just created!

![Architecture Diagram](./.images/architecture.svg?raw=true)

## Contributing

Work items for mmdl-connectors are tracked in CMS' Jira. If you have access to our Jira, you can view mmdl-connectors related work there. While there's no dedicated mmdl-connectors product view in Jira yet, the [Platform Team board](https://qmacbis.atlassian.net/jira/software/c/projects/OY2/boards/216/backlog?selectedIssue=OY2-17657&epics=visible&issueLimit=100) is a good stand in.

If you don't have access to Jira, would like access to Jira, or would like to discuss any enhancement, bug, idea, or question, please visit the [MMDL Connectors Slack channel](https://cmsgov.slack.com/archives/C0403M0D007). This is a public channel open to anyone in CMS Slack, and all input is welcome!

## License

[![License](https://img.shields.io/badge/License-CC0--1.0--Universal-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/legalcode)

See [LICENSE](LICENSE) for full details.
