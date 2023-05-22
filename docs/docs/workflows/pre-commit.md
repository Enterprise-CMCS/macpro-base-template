---
layout: default
title: Pre Commit
parent: GitHub Workflows
nav_order: 14
---

# Pre Commit
{: .no_toc }

Enforcing code formatting standards.
{: .fs-6 .fw-300 }
---

## Summary
The workflow helps maintain code quality and consistency by enforcing code formatting standards during the pull request process, providing developers with immediate feedback on any formatting issues that need to be addressed.

## How it Works 
- The workflow called "Pre-commit" is triggered when pull requests are opened or updated. Its purpose is to enforce code formatting using the "pre-commit" tool.

- The workflow consists of a single job called "prettier". The job's steps include checking out the repository's code, setting up the Python environment, and running the "pre-commit" tool.

- The "pre-commit" tool is a framework for managing pre-commit hooks that perform various code formatting and linting tasks. In this case, the tool is executed with the "--all-files" extra argument, which ensures that code formatting checks are applied to all files in the repository.

- By including this workflow in a project, any pull request that modifies the code will trigger the "prettier" job. The job will then run the "pre-commit" tool, automatically applying code formatting checks and ensuring that the code adheres to the defined style guidelines.

