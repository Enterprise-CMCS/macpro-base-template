---
layout: default
title: GitHub Actions
nav_order: 4
has_children: true
permalink: docs/continuous-integration
---

# GitHub Actions
{: .no_toc }

Details for each GitHub Actions workflow the project uses to enable Continuous Integration (CI) and GitOps.
{: .fs-6 .fw-300 }

The {{ site.repo.name }} project uses [GitHub Actions](https://github.com/features/actions) as its Continuous Integration (CI) tool.  GitHub Actions, sometimes abbreviated as GHA, is similiar to Jenkins, CircleCI, GitLab CI/CD, and TravisCI; all of these tools provide a means of defining workflows in code and a place for them to be centrally run and viewed.

GHA's highest level concept is a 'workflow'.  Each workflow is defined in a seperate yml file, and stored in the repo in the .github/workflows/ folder.  Inside each workflow there can be one to many 'jobs'.  Each job contains one to many 'steps'.  This is a very high level overview of how GitHub Actions is organized.

This section describes each GHA workflow we use on the {{ site.repo.name }} project.