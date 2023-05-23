---
layout: default
title: CodeQL
parent: GitHub Workflows
nav_order: 10
---

# CodeQL
{: .no_toc }

Analyze code for security vulnerabilities
{: .fs-6 .fw-300 }
---

## Summary
This GitHub Actions workflow utilizes CodeQL, a static analysis tool, to analyze code for security vulnerabilities and code quality issues. This workflow is triggered by events such as code pushes and pull requests on specific branches, as well as scheduled runs. This workflow serves as a foundation for automated code analysis, ensuring that code in our repository is regularly checked for security flaws and code quality problems. It can be tailored to fit specific project requirements by adjusting the languages analyzed, specifying custom queries, or modifying the build process.

## How it Works 
- The workflow consists of a single job named "Analyze". The job is configured to analyze code written in JavaScript or TypeScript, but this can be customized to support other languages. 

- The steps within the job include checking out the repository, initializing CodeQL, and optionally building the code if it's a compiled language. Then, the actual CodeQL analysis is performed, leveraging pre-configured or custom queries to identify potential vulnerabilities and quality issues. The results of the analysis are saved in the SARIF format and uploaded as an artifact.