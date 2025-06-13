---
layout: default
title: Dependency Update
parent: GitHub Workflows
nav_order: 14
---

# Dependency Update
{: .no_toc }

Upgrading node dependencies.
{: .fs-6 .fw-300 }
---

## Summary
The "Dependency Update" workflow automates the process of upgrading node dependencies, allowing for easier maintenance and keeping the project up to date with the latest versions. It provides notifications to the team, allowing them to review and merge the updates if necessary.

## How it Works

- When triggered, the workflow runs it performs the following steps:

    - It checks out the repository code and sets up the necessary environment.
    The workflow identifies all yarn.lock files in the repository, excluding those in the node_modules directories.
    - It then upgrades the dependencies using the yarn upgrade command for each identified lockfile.
    - If there are changes detected during the upgrade, the workflow sets an output variable called "changes" to indicate the presence of changes.
    - If there are changes, the workflow proceeds to commit the updated code to a branch named "dep-update". It configures Git, creates or deletes the branch, commits the changes, and force pushes the branch to the repository.
    - Finally, the workflow sends a Slack notification to the specified webhook, informing the team about the success or failure of the upgrade. The notification includes a link to create a pull request for the dependency updates.
