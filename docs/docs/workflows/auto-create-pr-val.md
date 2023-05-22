---
layout: default
title: Auto Create PR 
parent: GitHub Workflows
nav_order: 17
---

# Auto Create PR 
{: .no_toc }

Auto Create PR for Val.
{: .fs-6 .fw-300 }
---

## Summary
- The workflow is triggered by a push to the master branch. It then checks out the repository's code and creates a pull request targeting the "val" branch, with specific title and body instructions for merging.

## How it Works 
- The workflow is triggered when a push event occurs on the "master" branch. The first step of the job checks out the repository's code using the actions/checkout action, and the next step utilizes the repo-sync/pull-request action to create a pull request.
- The pull request is created with the destination branch set as "Val". This action requires a GitHub token to access the repository, and it uses the secrets.GITHUB_TOKEN secret for authentication.
- The pull request's title is set as "Release to Val", and the body of the pull request includes a brief message stating "Release to Val. Please create a merge commit."