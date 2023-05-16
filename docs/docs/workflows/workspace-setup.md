---
layout: default
title: Workspace Setup 
parent: GitHub Workflows
nav_order: 8
---

# Workspace Setup 
{: .no_toc }

Reflect our active Security Hub findings in Jira.
{: .fs-6 .fw-300 }
---

## Summary
- 

## How it Works
- The workflow is triggered either manually through the workflow dispatch event or on a scheduled basis every Sunday at 10:00 AM. This flexibility allows developers to execute the workflow when needed or automatically at a specific time.

- The main job defined in the workflow is named "test" and is configured to run on a macOS runner with version 12. This job has a timeout set to 30 minutes to prevent stuck builds from consuming resources unnecessarily.

- The job consists of several steps. First, the repository's code is checked out using the actions/checkout action. Then, AWS credentials are configured using the aws-actions/configure-aws-credentials action, assuming a specific AWS IAM role we have defined in the AWS_OIDC_ROLE_TO_ASSUME secret.

- Shell script named "setup.sh" located in the "docs/assets" directory is executed. This script contains instructions for setting up the workspace.

- Node Version Manager (nvm) is used to install a specific version of Node.js. This step ensures that the desired version is available for subsequent tasks.

- After the Above the workflow then proceeds with testing and deployment tasks. These tasks involve using direnv, a shell extension manager, to configure the environment and execute various commands with specific stage names. The tasks include testing documentation, performing installations, deploying the code to a specified stage, running tests, and finally destroying the environment.

- If any of the previous steps fail, a Slack notification is sent using the rtCamp/action-slack-notify action. The notification includes details about the job's failure status, such as color, icon, title, username, and a webhook to send the notification to a Slack channel. This provides a way to alert relevant team members or stakeholders about any issues in the workflow.
