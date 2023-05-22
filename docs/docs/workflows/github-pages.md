---
layout: default
title: GitHub Pages 
parent: GitHub Workflows
nav_order: 13
---

# GitHub Pages 
{: .no_toc }

Building and deploying a Jekyll site to GitHub Pages.
{: .fs-6 .fw-300 }
---

## Summary
The workflow allows for the automatic building and deployment of a Jekyll site to GitHub Pages whenever there is a push to the master branch. It ensures the necessary dependencies are installed, builds the site, and then deploys it to the appropriate GitHub Pages environment.

## How it Works 
- The build job runs and performs several steps. First, it checks out the repository and configures the necessary settings for GitHub Pages. It then sets up the Node.js environment and installs the required packages for the project. Next, it builds the Dora project and the Jekyll site. Finally, it uploads the generated site as an artifact.

- The deploy job runs and depends on the build job. It sets up the deployment environment for GitHub Pages and retrieves the page URL from the build job. It then uses the actions/deploy-pages action to deploy the generated site to GitHub Pages.
