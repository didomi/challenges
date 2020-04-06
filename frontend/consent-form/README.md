## Give Consents Form App Overview

In some specific cases, companies need to collect consent from consumers before using their data. For instance, website visitors might need to explicitly consent to receive email newsletters through a form before a company can send emails to those visitors.

this is the simplest possible consent collection and management application where a user can enter its information and agree to a list of data processing.

### Installation and Startup

first start by running `yarn` in the root directory or `npm install` and that should get all the dependencies ready for you

- to run the app `npm start`
- to run the app with mock data `npm run start:mockdata`
- you can also generate some dummy data using `npm run generate`
- running the the json-server `npm run mockdata`

### About the App

startin the app should give you two links Give consent and collected consents you can either start by navigating to collected cosents where you can find a button labeled FETCH FAKE DATA that should give you all the data of consents in the mock database
or you can go ahead in the Give consent page where you are welcomed with a form to fill your data and sumbit to the mockdata which is gonna redirect you to the collected consents page

### Tech used in the app

this app is using the React stack with Redux implemented to manage the data across the app with the Material-UI library for better visuals and the mocked data is handled with the json-server that gets the data generated using the json-schema-faker
