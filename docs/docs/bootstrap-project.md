# Bootstrapping a New Project

Standard Operating Procedure for MACPRO Project Creation Output of: https://qmacbis.atlassian.net/browse/OY2-20437

## Introduction
 On MACPRO, we get a lot of ideas. These stem both from the client and our development teams, both aimed at delivering on the project’s charter. These ideas often require a new project to be created. Project in this context refers to a github repository with its own distinct delivery repository and lifecycle. This document aims to be a guide for starting a new project, or a guide on how to take an idea and start delivering it.
## Audience
This SOP is suited for anyone involved with project creation. Parts will be non technical process oriented, and other parts will require technical knowledge and experience. CMS Jira requests will need to be made, so someone with appropriate access will need to be involved.
## Summary

1. Request a new GitHub repository for the project
1. Request a new set of AWS accounts (if applicable).
1. Create a new Slack channel for the project.
1. Bootstrap the new project with the base template.

## Details

### Step 1: Request a new GitHub repository for the project.
Creating a new project will always involve creating a new GitHub repository, so this step must always be completed. Before making the request for the new repo, you need to decide a few things:
- Should the repo be public or private? CMS, as a rule, likes to open source its projects, and keep some projects private by exception. So, if the project you’re creating is allowed to be public from a security stance, it should probably be public. If there’s any reason it should not be public, it should be private. The answer to this question is not always straightforward. Sometimes we have a project that doesn’t contain any secret or sensitive information, but it sheds light on the deployed, operational architecture of systems that do have such information. In that case we may decide to keep the project private. The public or private decision should be considered carefully.
- Should GitHub Actions be enabled? The answer is almost certainly yes. New MACPRO projects use GitHub Actions as it’s CI/CD appliance. In the future, Actions may be substituted for a different tool, but for now Actions is required. This question is mainly being listed since the request for Actions to be enabled on the repo is done as a distinct task.
- Who should be the initial repository admin? The repo creation process requires adding at least one MACPRO user as a repository administrator. This administrator can then add the appropriate team members to the repo.
- What should the project be called? This may already have an answer, one that you decided before referencing this document. But consider the repo name anyways. Keep in mind:
- Newly created projects will be created within the CMSGov GitHub organization, so it usually doesn’t make sense to include ‘cms’ in the repository name.
- All lowercase letters is a standard
- The name of the project/repo will be used a lot. It should be accurate, but
sometimes less is more.

#### After considering the items above and making decisions, follow this procedure to get the repo created:

1. Create a Web Help Service Desk (WHSD) Jira Ticket for repo creation, using https://jira.cms.gov/browse/WHSD-46744 as a template for the body. Update fields accordingly.
1. Wait. Wait until the repository is created.
1. Create another WHSD Jira Ticket, this one for enabling GitHub Actions on the newly created repository, using https://jira.cms.gov/browse/WHSD-46923 as a template for the body. Update fields accordingly.
1. The administrator added to the repository (that may well be you) may now go add
anyone to the repository that should have permissions.

### Step 2: Request a new set of AWS accounts (if applicable).
The ‘if applicable part’ is important. You’ll need to decide if this new project requires its own set of AWS accounts. For background, CMS creates AWS accounts in sets of three: a ‘dev’ account, an ‘impl’ account, and a ‘prod’ account. These are created when requested by MACPRO to support new products.
However, not all new projects require its own set of accounts. While a new service or idea may be best organized in its own repository, it's sometimes unnecessary to organize it in its own AWS accounts. For example: there exists a set of ‘Bigmac’ accounts (bigmac-dev, bigmac-val, bigmac-prod). Within this set of accounts, however, several projects (repositories) are deployed. The cms-bigmac project, mmdl-connectors, seatool-connectors, and seatool-compare are each an individual project and repository, but leverage the same set of accounts. This was done because from a security standpoint, there’s no harm in them coexisting. And from a business management perspective, having less AWS Accounts when it’s acceptably secure is preferred.
In general, answer this: can my new project leverage an existing set of AWS Accounts without compromising security? Keep in mind, our developer access is organized at the account level. So for instance, anyone who gets access to Project B also gets access to Project A if B and A are deployed to the same set of AWS Accounts.
If you do have a set of AWS Accounts you can use, great! Move along to step 3. If you need to create new AWS Accounts, follow this procedure:
 - https://cloud.cms.gov/aws-account-creation
### Step 3: Create a new Slack channel for the project.
Slack is used on MACPRO as a primary means of communication. While Slack is neither a "System of Record" nor approved for sensitive information or inappropriate use, it nonetheless is crucial to MACPRO development.
While there are many Slack channels for various purposes, we typically create one dedicated slack channel per project or repository. This channel is typically subscribed to GitHub repository events, such as releases, and is where developers can send messages regarding the product. As such, creating a new Slack channel is part of the project creation SOP
Consider this:
- Should the channel be public or private? This answer should usually follow the
repository’s visibility. A public repository should probably have a public Slack channel, and a private repository should probably have a private Slack channel.
Someone with appropriate permissions can follow this procedure to create a new Slack Channel:
1. Login to the CMS Slack workspace (cmsgov.slack.com)
1. Next to ‘Channels, click the ‘+’ sign.
1. Create a new channel.
    1. Set the visibility (public/private) accordingly
    1. Name it the same as the project repository.
1. Once created, make a note of the new channel’s URL
    1. Find the channel on the sidebar
    1. Right click it
    1. Select Copy, and Copy Link. You may put this link somewhere like a notepad as you will use it later. But don’t worry, this can always be found again.
1. You may add anyone who should have access to the channel.
1. Bootstrap the new project with the base template.
New MACPRO project repositories are bootstrapped with code from our base template repository. This base template repository is a github repo itself; it’s maintained by the MACPRO Platform Team as the standard MACPRO project structure. It includes patterns for deployment, deployment of dev branches, testing, security scanning, and so forth. There’s a lot of functionality packed into it, without commenting much on the actual application architecture. This is done deliberately, so projects may use the template as a starting point, and build the new project’s services on top of it. In the future, there may be other templates that are more specific, such as a webapp template or a kafka consumer template, but for now there is only the single base template. This step involved getting the latest copy of that template and pushing it to the new project repository. These instructions are held elsewhere in detail.

Follow this procedure to bootstrap your new project repository:
- Follow the document here:
https://docs.google.com/document/d/1FdweJT8a4edK9hGHLg7Zf6ETV58a264PSGYrZYldEUE/edit

*** This section currently points to a gdrive doc explaining how to bootstrap a project based on mmdl-connectors, while this procedure explains how to bootstrap from a base template repo. This is admittedly inconsistent, but deliberate; I expect this document to be updated when the base template is created, and the gdrive doc to be further refined and eventually made static.
End
If you’ve followed this document, you should have a new GitHub project deployed to AWS and ready for further development. This document is a WIP, and assuredly has errors and omissions, and will change over time. You can help this by reaching out to the MACPRO Platform team on Slack and letting us know about issues you find.