---
layout: default
title: List Running Stages
parent: GitHub Workflows
nav_order: 14
---

# List Running Stages
{: .no_toc }

Retrieving and reporting currently running stages.
{: .fs-6 .fw-300 }
---

## Summary
The "Running Stage Notifier" workflow automates the process of retrieving and reporting currently running stages in a project or pipeline, ensuring better visibility and communication through Slack notifications.

## How it Works

- The workflow has the necessary permissions to read repository contents and obtain an ID token. It begins by checking out the repository and setting up any required configuration. It then configures AWS credentials to assume a specified role in the AWS account.

- The main step of the workflow is to retrieve a list of running stages using the command run listRunningStages. The output of this command is stored in the $runningStages variable. If the Slack webhook is provided and there are running stages, a Slack notification is sent with the list of running stages, providing visibility into the currently active stages.

- There is also a conditional step to send a Slack notification in case of a failure while retrieving the running stages. This step executes if the Slack webhook is provided and the workflow fails, ensuring that any issues with retrieving the running stages are promptly reported.

