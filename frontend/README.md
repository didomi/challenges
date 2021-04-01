# Front-end engineering challenge

This challenge is used by Didomi for evaluating candidates for front-end development positions.

This challenge is a chance for engineers at Didomi to see how you code and organize a project to implement a specification.

## Deliverables

The expected deliverable is a fully functional project that includes the following:

- Code of the application
- Tests of the application
- Documentation for launching a development environment and running the application

You are expected to match the mockups and use the right components as needed.

## Technical stack

The application should use one of the following stacks:

- [Angular](https://angular.io/) with [Angular Material](https://material.angular.io/)
- [React](https://reactjs.org/) with Redux and a Material library

Except for these requirements, feel free to use whichever libraries, frameworks or tools you deem necessary.

## HTTP API calls

This challenge requires HTTP API calls when a user adds a consent or to populate the list of consents.

What we recommend is to implement the calls as standard HTTP requests to a REST API with the following specification:

- `GET /consents`: Returns a list of consents along with pagination data.
- `POST /consents`: Add a new consent.

You can then mock the HTTP calls by mocking the `XMLHttpRequest` object or the `fetch` method in the browser. The mock should have a pre-populated list of objects and add a new object to the list when a `POST` request is sent.

Other methods of mocking are also acceptable as long as there is no actual HTTP calls sent out.

## Expectations

Your code will be reviewed by multiple engineers at Didomi and will serve as the base for a discussion in interviews.  
We want to see how you approach working on a complete project and strongly recommend that you work on this challenge alone. We will particularly focus on your attention to details and expect the code to be professionally structured, commented, documented, and tested.

If anything is unclear, feel free to ask any question that might help you understand the specifications or requirements better.

## Delivery

Your application can be sent to us as a GitHub repository (in which case you are welcome to fork this repository) or as a compressed archive containing all the deliverables.

# The challenge

In some specific cases, companies need to collect consent from consumers before using their data. For instance, website visitors might need to explicitly consent to receive email newsletters through a form before a company can send emails to those visitors.

The goal of this challenge is to build the simplest possible consent collection and management application where a user can enter its information and agree to a list of data processing. It's not very user-friendly but that'll do the trick for this time.

## Product specification

The application is composed of two views.

### 1. Consent collection form

A form that allows a user to enter her name, email address and to select data processes that she agrees to.

When the user fills out the form and clicks on the "Give consent" button, the consent gets added to the list of consents that appears on the second view.

![Mockup](https://github.com/didomi/challenges/raw/master/frontend/wireframes/1%20-%20Give%20consent.png)

### 2. Consent management

A list of consents that were given by users. This view simply displays items from a list with client-side pagination.

![Mockup](https://github.com/didomi/challenges/raw/master/frontend/wireframes/2%20-%20Collected%20consents.png)

## Review session

After receiving your code challenge, we organize a review session with you and a few engineers from Didomi. During the review session, we will:

- Ask you to share you screen and do a quick demo of the app you built
- Ask you to present your project structure and walk us through the code (the different components, the state management, etc.)
- Ask you general technical questions related to your project and frontend architecture

A few examples of the topic that we like to discuss in more details:

- Scaling of an SPA
- Smart/dumb components
- UI libraries
- State management
- Styling
- Testing
