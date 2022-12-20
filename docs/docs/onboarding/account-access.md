---
layout: default
title: Account Access
parent: Onboarding
nav_order: 2
---

# Account Access
{: .no_toc }

You'll need access to a few systems to be a fully privileged developer.  This section will guide you in making the necessary access requests.  
{: .fs-6 .fw-300 }
**Note:  Account access should be your first step in onboarding, as the requests can take time to complete.**

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

## Git Repository

To be a fully privileged developer on {{ site.repo.name }}, you will need write access to the repository.

To request access, please send an email to mdial@collabralink.com which includes:

- Name
- GitHub user id
- Reason for access / who you are

## AWS Account(s)

{{ site.repo.name }} is deployed to one (or many) AWS accounts.  While many workflows can be done without direct AWS Console/CLI access, a fully equipped developer will need AWS access. To request access, please send an email to mdial@collabralink.com which includes:

- Name
- Your email address
- Reason for access / who you are
- Level of Access:  developer or audit

Once your request has been completed, the email address you submitted will receive a message from AWS. This message will include a login url, a username, and a temporary password. Follow the login url, login, and change your password.

## Code Climate

We use [Code Climate](https://codeclimate.com/) to monitor project quality.  This includes running maintainability checks for Pull Requests, which flags code that doesn't meet best practices.  Checks include function length, file length, cognitive complexity, and duplication.

Code Climate is a completely external tool which is free to use.  You may go to Code Climate and create a new account.  We recommend you sign up with GitHub, for convenience, so you won't need to maintain a separate username and password.  

Once you have an account, you may view any repositories for which you have access.  For private repositories ({{ site.repo.name }} is currently private), you will not be able to view the repository in Code Climate until you have Git repository write access (see above).