---
layout: default
title: Create Production Pull Request
parent: GitHub Workflows
nav_order: 9
---

# Create Production Pull Request
{: .no_toc }

Reflect our active Security Hub findings in Jira.
{: .fs-6 .fw-300 }
---

## Summary
In summary, this workflow enables the automated creation of a pull request to release code changes from the "val" branch to the "production" branch, providing a standardized process for promoting code updates to a production environment.

## How it Works 
- The workflow is triggered when a push event occurs on the "val" branch. The first step of the job checks out the repository's code using the actions/checkout action, and the next step utilizes the repo-sync/pull-request action to create a pull request.
- The pull request is created with the destination branch set as "production". This action requires a GitHub token to access the repository, and it uses the secrets.GITHUB_TOKEN secret for authentication.
- The pull request's title is set as "Release to production", and the body of the pull request includes a brief message stating "Release to production. Please create a merge commit."