---
layout: default
title: Code Destroy
parent: GitHub Workflows
nav_order: 12
---

# Code Destroy 
{: .no_toc }

Facilitates the destruction of a deployment.
{: .fs-6 .fw-300 }
---

## Summary
This workflow provides an automated way to destroy a deployment environment. It handles different trigger events, configures AWS credentials, initiates the destruction process, and sends notifications in case of failures. The inclusion of the "delete_environment" job ensures that the deployment environment is properly removed after destruction.

## How it Works 
- The "Destroy" workflow facilitates the destruction of a deployment environment. It can be triggered when a branch is deleted or manually through a workflow dispatch event. The workflow consists of two jobs: "destroy" and "delete_environment".

- The "destroy" job is responsible for initiating the destruction process. The job sets the deployment environment based on user input or the branch reference from the event. It configures AWS credentials and executes the necessary commands to destroy the environment. If the destruction process fails, a Slack notification is sent to a specified channel.

- The "delete_environment" job is triggered after the "destroy" job completes successfully. The job uses a specific action to delete the deployment environment, utilizing the provided GitHub token and environment name.

