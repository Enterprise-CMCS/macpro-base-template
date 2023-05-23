---
layout: default
title: Dependency Review
parent: GitHub Workflows
nav_order: 14
---

# Dependency Review
{: .no_toc }

Scaning dependency manifest files in pull requests.
{: .fs-6 .fw-300 }
---

## Summary
The "Dependency Review" workflow scans dependency manifest files in pull requests to identify known-vulnerable versions of packages and prevent merging if vulnerabilities are found. 

## How it Works

- The workflow named "Dependency Review" is triggered by pull requests in a GitHub repository. This workflow utilizes the "actions/dependency-review-action" GitHub Action to perform a dependency review.

- The workflow consists of a single job called "dependency-review" that contains two steps.

    - The first step, named "Checkout Repository," uses the "actions/checkout@v3" GitHub Action to fetch the contents of the repository in the pull request. This step ensures that the workflow has access to the necessary files.

    - The second step, named "Dependency Review," utilizes the "actions/dependency-review-action@v2" GitHub Action. This action scans the dependency manifest files that have changed in the pull request. It identifies any known-vulnerable versions of the packages declared or updated in the pull request. If any known-vulnerable packages are found, this action can block the pull request from being merged if the workflow run is marked as required.

- Developers using this workflow can gain visibility into potential security vulnerabilities introduced by package updates and enforce policies to prevent merging pull requests that introduce known-vulnerable packages.