# Solutions engineering challenge

This challenge is used by Didomi for evaluating candidates for solutions engineering positions.

As a solutions engineer, you will work closely with Didomi's clients throughout the sales and implementation processes. You will guide them through the Didomi platform and the correct integration paths for their existing applications.

The goal of this challenge is to walk you through the different stages of integrating the Didomi platform and give you a chance to see how our clients do it every day.  
Throughout this challenge, the [Didomi documentation](https://developers.didomi.io) will help you understand how to configure and deploy our platform.

This challenge is composed of 4 steps:

1. Create a consent notice
2. Validate a CMP deployment
3. Use our API to manage user consents
4. Pass consent to third-parties in the backend

## Step 1 - Create a consent notice

One of the key requirements of GDPR is that user consent is needed before personal data is used for any purpose like targeted advertising, personalization, analytics, etc. One of the tools that Didomi offers to comply with this requirement is "consent notices".

A consent notice asks the user for consent to a set of purposes (what will the collected personal data be used for) and vendors (who will collect personal data). It can be a small banner at the top or bottom of a website or mobile app, a full screen popin, etc.

Using the [Getting Started](https://developers.didomi.io/cmp/web-sdk/getting-started) section of the Didomi documentation, create an HTML page that displays a consent notice to collect consent from the user.  
You can use the following public API key for your notice: **89a1965c-e470-462e-9467-6132bb46ab94**.

We expect the consent notice to have the following properties:

### Notice Configuration

- Be a popin that blocks access to the page until consent has been given/denied
- Use red as its main theme color
- Collect consent for all IAB vendors, Google, and one custom vendor
- Allow French and English as languages with English as the default language

### Notice Behavior

As an additional feature, ensure that consent is collected when the user scrolls more than 30% of the page.  
Note that there is no configuration option to enable this so it has to be coded in JavaScript with the [Didomi SDK API](https://developers.didomi.io/cmp/web-sdk/reference/api).

Here is what the result should look like:

![Notice](./notice-popin.png)

### Deliverable

Your HTML file should be sent to us as the deliverable. Comments in the HTML are welcome.

## Step 2 - Validate a CMP deployment

Our clients usually configure their CMP through the Didomi Console (and not by writing their own JSON configuration). Once their setup is done, Didomi often double-checks their configuration and confirms that the setup is correct.

If you were tasked with validating a CMP deployment for a client, how would you validate the following elements:

- The notice tag is correctly deployed
- The notice behaves as expected
- The following specific integrations are correctly configured: [Google DFP/Ad Manager](https://developers.didomi.io/cmp/web-sdk/consent-notice/vendors-and-purposes/google-dfp-adsense-adx), [Prebid](https://developers.didomi.io/cmp/web-sdk/consent-notice/vendors-and-purposes/prebid), [Google Tag Manager](https://developers.didomi.io/cmp/web-sdk/tags-management/google-tag-manager)

You can use the following website to run some of your tests: [Le Parisien](http://www.leparisien.fr)

### Deliverable

We expect you to present your findings and thought process during one of your interviews. No written answer is expected for this step.  
We understand that you might not be familiar with some of the tools listed (DFP, GTM, etc.), in which case you can ignore that part or do only one of them.

## Step 3 - Use our API to manage user consents

The Didomi platform exposes an API to manage user consents: <https://developers.didomi.io/api/guides/consents>  
The API allows clients to get the consent status of their users as well as update it when they collect new consent.

Using the Didomi API, write a script that:

1. Creates 10 consent events for 10 different users with a positive consent for the purpose `cookies` and the vendor `google`
2. Gets the consent status for these 10 users as well as their Didomi ID and displays it
3. Updates the consent status for these 10 users to disable the purpose `cookies`

Your script can be written in any language that you are familiar with.

The following documentation sections should be useful:

- [Guide on Consents](https://developers.didomi.io/api/guides/consents)
- [Consent Events](https://developers.didomi.io/api/resources/consents/events) and [Consent Users](https://developers.didomi.io/api/resources/consents/users)
- [Authentication](https://developers.didomi.io/api/introduction/authentication)

### Deliverable

Your script should be sent to us as the deliverable. Comments in the code are welcome.

## Step 4 - Pass consent to third-parties in the backend

The consents that are collected via consent notices then need to be passed to third-party vendors (advertising, marketing, analytics, etc.) that companies work with to ensure that the user choice is respected. For instance, if a user denies consent, you want to ensure that your marketing vendors are not using the user personal data for advertising or sending emails.

In this step, we want to show the engineering team of a prospect how to integrate Didomi into their systems and pass consents collected from their websites to their internal databases and to Salesforce Marketing Cloud.

The [Integrations section of our documentation](https://developers.didomi.io/integrations/introduction) presents the integration options that Didomi offers.

### Deliverable

Provide an architecture schema that shows the different components and the Didomi integrations used for passing consents between Didomi and the client/Salesforce.

You can assume that the setup fo collecting consent via a consent notice is already done and that consents are automatically sent from the user browser to the Didomi API.
