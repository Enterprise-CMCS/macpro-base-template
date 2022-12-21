---
layout: default
title: Run Docs Site Locally
parent: Development Workflows
nav_order: 4
---

# Run Jekyll Docs Site Locally
{: .no_toc }

How-to run our GitHub Pages Jekyll docs site (the site you're viewing) locally.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

### Start the docs site locally

#### Summary
This procedure will walk you through starting up the docs site locally.  You may want to run the docs site locally if you are modifying the documentation, allowing you to preview before committing.  

#### Prerequisites:
- Completed all [onboarding]({{ site.baseurl }}{% link docs/onboarding/onboarding.md %})

#### Procedure
- Start the docs site using the run script:
  ```bash
    cd {{ site.repo.name }}
    run docs
  ```
- In a browser, visit [http://localhost:4000](http://localhost:4000) to view the running site.
- As you make changes to the files under the repo's docs folder, you should see the changes reflected in your browser in less than a second.

#### Notes
- ~~Note:  Jekyll's reloading performance in Docker on an M1 Mac when using docker volumes has been observed to be unacceptable.  The shortest reload time possible was close to 10 seconds.  In view of this, this procedure starts the docs site on bare metal (your Mac).~~
Note:  Jekyll's reloading performance in Docker on M1 chipped Macs has been observed to be slow.  Reloading takes 12-15 second, usually.  However, it's proven very problematic to support bare metal Jekyll, so we accept the performance hit.  The hope is that most developers making changes don't need to wait for the site reload on each small change; instead, they likely make many edits to a markdown file's content at once, and can wait for the page to reload once.
