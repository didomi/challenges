This challenge is used by Didomi for evaluating candidates for data engineering positions.

# Rules of the game
This challenge is a chance for engineers at Didomi to see how you code and organize a project to implement a specification.

## Deliverables
The expected deliverable is a fully functional project that includes the following:

- Code of the app
- Tests of the app
- Documentation for launching a development environment and running the app
 
## Technical stack
The application should use the following stack:

- [Spark](https://spark.apache.org/)
- Python or Scala

Except for these requirements, feel free to use whichever libraries, frameworks or tools you deem necessary.

## Expectations
Your code will be reviewed by multiple engineers at Didomi and will serve as the base for a discussion in interviews.  
We want to see how you approach working on a complete project and strongly recommend that you work on this challenge alone. We will particularly focus on your attention to details and expect the code to be professionally structured, commented, documented, and tested.

If anything is unclear, feel free to ask any question that might help you understand the specifications or requirements better.

## Delivery
Your application can be sent to us as a GitHub repository (in which case you are welcome to fork this repository) or as a compressed archive containing all the deliverables. 

# The challenge
In some specific cases, companies need to collect consent from consumers before using their data. For instance, app users might need to explicitly consent to share their geolocation before a company can use it for advertising.

As users interact with the Didomi platform, we collect different types of events like:
 - "Page view" when a user visits a webpage
 - "Consent asked" when a user is asked for consent (ie a consent notice is displayed)
 - "Consent given" when a user gives consent (ie has clicked on a Agree or Disagree in the notice)

The goal of this challenge is to build a very simple Spark app that processes events and summarizes various metrics as time-series data.

[Download the example data for the challenge.](./input-example.zip)

## Input

### Format

Events are stored as JSON Lines files with the following format:

```js
{
    "timestamp": "2020-01-21T15:19:34Z",
    "id": "94cabac0-088c-43d3-976a-88756d21132a",
    "type": "pageview",
    "domain": "www.website.com",
    "user": {
        "id": "09fcb803-2779-4096-bcfd-0fb1afef684a",
        "consent": true,
        "country": "US"
    }
}
```

| Property | Values | Description |
| -------- | ------ | ----------- |
| `timestamp` | ISO 8601 date | Date of the event |
| `id` | UUID | Unique event ID |
| `type` | `pageview`, `consent.given`, `consent.asked` | Event type |
| `domain` | Domain name | Domain where the event was collected |
| `user.id` | UUID | Unique user ID |
| `user.consent` | Boolean | Consent status of the user |
| `user.country` | ISO 3166-1 alpha-2 country code | Country of the user |

### Partitioning

The data is partitioned by date/hour with Hive partition structure.

## Output

The Spark job is expected to compute the following metrics:

| Metric | Description |
| ------ | ----------- |
| `pageviews` | Number of events of type `pageview` |
| `pageviews_with_consent` | Number of events of type `pageview` with consent (ie `user.consent = true`) |
| `consents_asked` | Number of events of type `consent.asked` |
| `consents_asked_with_consent` | Number of events of type `consent.asked` with consent (ie `user.consent = true`) |
| `consents_given` | Number of events of type `consent.given` |
| `consents_given_with_consent` | Number of events of type `consent.given` with consent (ie `user.consent = true`) |
| `users` | Number of unique users |

The metrics should be grouped by the following dimensions:

 - Date and hour (YYYY-MM-DD-HH)
 - Domain
 - User country

## Processing

On top of computing the metrics listed above, the following operations must be run:

 - Deduplication of events based on event ID