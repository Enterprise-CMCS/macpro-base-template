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

Note:  Jekyll's reloading performance in Docker on an M1 Mac when using docker volumes has been observed to be unacceptable.  The shortest reload time possible was close to 10 seconds.  In view of this, this procedure starts the docs site on bare metal (your Mac).

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
- Jekyll's reloading performance in Docker on an M1 Mac when using docker volumes has been observed to be unacceptable.  The shortest reload time possible was close to 10 seconds.  In view of this, this procedure starts the docs site on bare metal (your Mac).
- The livereload functionality of Jekyll, whereby you can change a file in source and not need to refresh your browser, requires a ruby gem that is problematic on an M1 Mac.  In view of this, while Jekyll will automatically regenerate the site when files are changed with sub second performance, you will need to refresh your browser to see the update.  I'd like to get this fixed, but it's not seen as a priority at the moment.
