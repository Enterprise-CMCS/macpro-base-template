---
layout: default
title: Code Deploy 
parent: GitHub Workflows
nav_order: 11
---

# Code Deploy 
{: .no_toc }

Automates the deployment process.
{: .fs-6 .fw-300 }
---

## Summary
This workflow automates the entire deployment process for a serverless application on AWS, ensuring consistency, reliability, and controlled deployment. It integrates testing, analysis, resource management, and release processes, providing a streamlined and efficient deployment pipeline.

## How it Works 
- The workflow is triggered by any push event on any branch, except for branches starting with "skipci". It consists of several jobs that perform various tasks related to the deployment, testing, analysis, resource retrieval, release management, and failure notifications.

- The workflow ensures that the stage name is valid and conforms to a specific pattern. It then deploys the serverless application to AWS, runs tests on the deployed application, performs static analysis on AWS CloudFormation templates, retrieves and archives information about the AWS resources created during the deployment, triggers a semantic release process, and sends a notification in case of a deployment failure.

- Each job includes steps for checking out the code, setting up dependencies, configuring AWS credentials, executing commands, archiving artifacts, and performing specific actions related to the job's purpose.
