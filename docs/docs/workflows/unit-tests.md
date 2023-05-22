---
layout: default
title: Unit Tests
parent: GitHub Workflows
nav_order: 15
---

# Unit Tests
{: .no_toc }

Generate a test coverage report and publish to Code Climate.
{: .fs-6 .fw-300 }
---

## Summary
The workflow ensures that a test coverage report is generated for the "master" branch and pull requests targeting the "master" branch. It then publishes the report to Code Climate for analysis, contributing to the project's code quality assessment.

## How it Works 
- The workflow consists of a single job named "coverage-report". The job performs the following steps:
    - Checkout: It checks out the repository's code for the workflow execution.
    - Setup: It uses a custom action defined in the repository to set up any necessary configurations or dependencies.
    - Install: It runs a command to install the project's dependencies.
    - Run Coverage: It executes a command to generate the test coverage report.
    - Publish Test Coverage to Code Climate: It uses the Code Climate action to publish the generated test coverage report. This step is conditional and will only execute if the conditions always() and env.CC_TEST_REPORTER_ID != '' are met. The CC_TEST_REPORTER_ID is expected to be a secret in the repository's settings. The coverage report is specified using the coverageLocations parameter, which points to the Clover XML format report located in the ${{github.workspace}}/coverage/clover.xml path.
