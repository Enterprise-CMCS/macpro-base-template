---
layout: default
title: Auto Create PR Val
parent: GitHub Workflows
nav_order: 9
---

# Auto Create PR Val
{: .no_toc }

Automated creation of a pull request.
{: .fs-6 .fw-300 }
---

## Summary
In summary, this workflow enables the automated creation of a pull request to release code changes from the "master" branch to the "Val" branch, providing a standardized process for promoting code updates to a production environment.

## How it Works 
- The workflow is triggered when a push event occurs on the "master" branch. The first step of the job checks out the repository's code using the actions/checkout action, and the next step utilizes the repo-sync/pull-request action to create a pull request.
- The pull request is created with the destination branch set as "Val". This action requires a GitHub token to access the repository, and it uses the secrets.GITHUB_TOKEN secret for authentication.
- The pull request's title is set as "Release to Val", and the body of the pull request includes a brief message stating "Release to Val. Please create a merge commit."