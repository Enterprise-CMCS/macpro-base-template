---
layout: default
title: Home
nav_order: 1
description: "The macpro-base-template. This is placeholder and can be replaced with what makes sense for your project"
permalink: /
---

# macpro-base-template
{: .fs-9 }

The macpro-base-template project is a project that can serve as a baseline to get up and running faster.
{: .fs-6 .fw-300 }

[Join us on Slack](https://cmsgov.slack.com/archives/C0403M0D007){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/Enterprise-CMCS/macpro-base-template){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Welcome!

Thanks, and we're glad you're here!

---

## About the project

The macpro-base-template project is a work of the MACPRO Platform Team for the [Centers for Medicare & Medicaid Services (CMS)](https://www.cms.gov/).


#### Thank you to the contributors of macpro-base-template!

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>
