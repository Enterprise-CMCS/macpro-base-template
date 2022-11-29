---
layout: default
title: AWS Login
parent: Development Workflows
nav_order: 1
---

# AWS Login
{: .no_toc }

Authenticating to an AWS account(s) is a required first step for many workflows.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

### AWS Console Login

#### Summary
This procedure will take you to the AWS Console in a web browser, for one of the AWS accounts used by this project.

#### Prerequisites
- Completed all [onboarding]({{ site.baseurl }}{% link docs/onboarding/onboarding.md %})

#### Procedure
To get to the AWS Console:
- Login to the cloud VPN, https://cloudvpn.cms.gov
- Go to the CMS [Kion (Cloudtamer) site](https://cloudtamer.cms.gov/login).  This is a great link to bookmark.  Note: if the Kion site fails to load in your browser, it is very likely an issue with your VPN.  The Kion site is only accessibly while actively on the VPN.
- Login with your CMS EUA credentials.
- Select the drop down menu next to the appropriate account.
- Select Cloud Access Roles
- Select the role you wish to assume.
- Select Web Access.  The AWS Console for the account should open in a new browser tab.  Once the console is open, you may close your VPN connection, if you wish.

#### Notes
- This project deploys to the 'Bigmac Dev', 'Bigmac Val', and 'Bigmac Prod' accounts.  This is not a typo.  MMDL deploys to the same set of accounts as CMS Bigmac, although they are distinct products.  You very likely want to select Bigmac Dev, as you are most likely trying to interact with a dev/ephemeral environment or main.  You should only select Bigmac Val or Bigmac Prod if you have a specific reason, and are confident in what you are doing.
- If you can't see your target Bigmac account when logging in, try clicking 'All Projects' on the left hand side.  It may simply not be available in your quick menu displayed at login.
- If you still cannot find the correct Bigmac account, you don't have access.  Please see the onboarding instructions listed in the Prerequisites section of this procedure.

### AWS CLI credentials

#### Summary
This procedure will show you how to retrieve AWS CLI credentils for one of the AWS accounts used by this project, granting you programmatic access to AWS.  This is required for any operations you may run directly against AWS.

#### Prerequisites
- Completed all [onboarding]({{ site.baseurl }}{% link docs/onboarding/onboarding.md %})

#### Procedure
- Login to the cloud VPN, https://cloudvpn.cms.gov
- Go to the CMS [Kion (Cloudtamer) site](https://cloudtamer.cms.gov/login).  This is a great link to bookmark.  Note: if the Kion site fails to load in your browser, it is very likely an issue with your VPN.  The Kion site is only accessibly while actively on the VPN.
- Login with your CMS EUA credentials.
- Select the drop down menu next to the appropriate account.
- Select Cloud Access Roles
- Select the role you wish to assume.
- Select 'Short-term Access Keys'.
- Click the code block under 'Option 1', to copy the AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_SESSION_TOKEN environment variables to your clipboard.
- Navigate to a terminal on your mac, and paste the credentials.  You should now be able to interact with AWS programmatically, based on the role you selected in Kion.

#### Notes
- All notes regarding Kion in the 'AWS Console Login' procedure above apply here.  See them for more detail.
- There are three available options when getting access keys from Kion.  The instructions above detail Option 1, which is essentially copying and pasting env variables to a terminal.  Feel free to use one of the other options if you'd prefer.  For sake of simplicity, Option 1 will be the only one documented and supported here.
