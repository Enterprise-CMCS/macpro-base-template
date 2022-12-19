---
layout: default
title: Home
nav_order: 1
description: "The macpro-base-template. This is placeholder and can be replaced with what makes sense for your project"
permalink: /
---

# {{site.title}}
{: .fs-9 }

{{ site.description }}
{: .fs-6 .fw-300 }

[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub]({{ site.repo.url }}){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Welcome!

{{ site.repo.name }} is a serverless monorepo template.  The actual application is 'hello world', but the repository support and configuration is full featured. This is by design, to allow for simpler project creation from the template.  Full CI/CD support with GitHub Actions, automated security scanning, documentation with GH Pages, infrastructure and application deployment workflows, etc. is all included.  There are a few services that apply to almost any project in Amazon, and those are included.

---

## About the project

The {{ site.repo.name }} is a work of the [Centers for Medicare & Medicaid Services (CMS)](https://www.cms.gov/).


#### Thank you to the contributors of {{ site.repo.name }}!

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>
