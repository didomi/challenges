# Analytics Engineer Take-Home Assignment

## Overview

Welcome! This repository contains a complete, self-contained development environment for your analytics engineering take-home assignment. The environment consists of a Postgres database and a container with Python, `uv`, and `dbt` pre-installed.

If you need additional Python libraries you can add them to the `dependencies` list in `pyproject.toml` and run `make build` again to reinstall them.

## Setup Instructions

1. Clone this repository to your local machine.
2. The source data files are provided in the `input/` directory (see Data Schema section below for details).
3. Build and start the Docker containers:
   ```bash
   make build
   ```
4. Enter the analytics container's shell:
   ```bash
   make shell
   ```
5. You are now inside the container. Test your `dbt` connection to the database:
   ```bash
   make dbt-debug
   ```
6. You are all set! You can now start developing.

## Data Schema

The source data is located in the `input/` directory and consists of two main datasets:

### 1. Company Information

**Location:** `input/country_and_industry/industry and country.csv`

This file contains information about companies and their industry classifications.

**Schema:**

- `PUBLIC_API_KEY` (string/UUID): Unique identifier for each company. This is the primary key that links to the events data.
- `INDUSTRY_BACK` (string): Backend/detailed industry classification (e.g., "Media & Publishers", "Gaming / Sport", "Food / Beverage / Consumer Staples")
- `INDUSTRY_FRONT` (string): Frontend/simplified industry classification for display purposes (e.g., "Media & Publishers", "Sport", "Gaming")
- `HQ_COUNTRY` (string): Headquarters country of the company (can be empty/null for some records)

**Sample Data:**

```
PUBLIC_API_KEY,INDUSTRY_BACK,INDUSTRY_FRONT,HQ_COUNTRY
e158f373-2e1a-4e7e-b4dd-0e48860c8f99,Media & Publishers,Media & Publishers,France
c9dfdd5a-cfda-4bdb-914d-aa6ac00e5471,Services,Services,Spain
947ffed0-e35a-4517-8845-29a7d587a805,Gaming / Sport,Sport,Spain
```

### 2. Event Data

**Location:** `input/events/`

This directory contains event tracking data for 10 companies, split across two formats:

- **CSV format:** Companies 1-5 (`input/events/csv/events-company-1.csv` through `events-company-5.csv`)
- **Parquet format:** Companies 6-10 (`input/events/parquet/events-company-6.parquet` through `events-company-10.parquet`)

Both formats contain the same schema with approximately 2,000-3,000 events per company file.

**Schema:**

- `EVENT_ID` (string/UUID): Unique identifier for each event
- `TYPE` (string): Type of event. Common values include:
  - `consent.given` - User has granted consent 
  - `pageview` - Page view event
  - `consent.asked` - Consent prompt was shown 
  - `ui.action` - User interface interaction 
- `RATE` (float): Sampling rate for the event (e.g., 0.1 means 10% sample rate, 1 means 100%)
- `PARAMETERS` (string/JSON): JSON object containing detailed event parameters. Structure varies by event type:
  - For `consent.given` and `consent.asked`: Contains nested objects with purposes, vendors, and previous states
  - For `pageview` and `ui.action`: Often empty
- `EVENT_TIME` (timestamp): When the event occurred (format: `YYYY-MM-DD HH:MM:SS.mmm`)
- `WINDOW_START` (timestamp): Start of the aggregation time window (format: `YYYY-MM-DD HH:MM:SS.mmm`)
- `APIKEY` (string/UUID): Company identifier - foreign key to `PUBLIC_API_KEY` in the company information file
- `CONSENT` (string): User's consent status (e.g., "full opt-in", "empty", "partial")
- `COUNT` (integer): Event count (often represents aggregated events)
- `EXPERIMENT` (string): Experiment/A-B test identifier (can be empty)
- `SDK_TYPE` (string): SDK type used to track the event (e.g., "sdk-mobile", "sdk-web")
- `DOMAIN` (string): Domain where the event occurred (e.g., "service1.org")
- `DEPLOYMENT_ID` (string): Deployment identifier (can be empty)
- `COUNTRY` (string): Country code(s) where event originated, enclosed in triple quotes (e.g., `"""ES"""`, `"""FR"""`)
- `REGION` (string): Region code where event originated, enclosed in triple quotes (e.g., `"""CM"""`, `"""MD"""`)
- `BROWSER_FAMILY` (string): Browser or SDK identifier (e.g., "Didomi SDK", "Chrome", "Safari")
- `DEVICE_TYPE` (string): Type of device (e.g., "smartphone", "desktop", "tablet")

#### Important: Event Sampling

The volume of events we receive is prohibitively large to analyze every pageview cost-effectively. Therefore, we sample non-critical events, with the company-specific sampling rate provided in the `RATE` field for each individual event.

**When calculating metrics based on this events data, you must apply the sampling rate to extrapolate the actual event counts.** For example, if an event has `RATE=0.1` and `COUNT=10`, the extrapolated actual count would be `10 / 0.1 = 100` events.

**Sample Data:**

```
EVENT_ID,TYPE,RATE,PARAMETERS,EVENT_TIME,WINDOW_START,APIKEY,CONSENT,COUNT,EXPERIMENT,SDK_TYPE,DOMAIN,DEPLOYMENT_ID,COUNTRY,REGION,BROWSER_FAMILY,DEVICE_TYPE
91e36d4b-21b5-43a5-90c8-229b61ed22f2,pageview,0.1,,2025-09-05 01:14:29.602,2025-09-05 01:00:00.000,c9dfdd5a-cfda-4bdb-914d-aa6ac00e5471,full opt-in,10,,sdk-mobile,service1.org,aRV9g4BY,"""ES""","""CM""",Didomi SDK,smartphone
```

**Notes:**

- Country and region codes are wrapped in triple quotes (e.g., `"""ES"""`)
- The APIKEY field links events to companies in the company information dataset
- Parquet files provide the similar data in a more efficient binary format

## The Assignment

This assignment is designed to test your skills in data engineering, data modeling with dbt, and analytical thinking. You will work with consent management event data from multiple companies.

**Note:** You are encouraged to use AI tools (like ChatGPT, Claude, GitHub Copilot, etc.) to help you complete this assignment. We use these tools in our daily work and want to see how you leverage them effectively.

### Part 1: Data Ingestion (Python)

**Objective:** Load the raw data from the `input/` directory into your local Postgres database.

**Tasks:**

1. Write a Python script (or scripts) in the `scripts/` directory that:
   - Reads the company information CSV from `input/country_and_industry/`
   - Reads all event data files from `input/events/` (both CSV and Parquet formats)
   - Loads this data into appropriate table(s) in the Postgres database
   - Handles data type conversions and any data quality issues appropriately

### Part 2: Data Modeling (dbt)

**Objective:** Create dbt models that transform the raw data into analytics-ready tables with useful business metrics.

**Tasks:**

1. Define dbt sources for the table(s) you created in Part 1
2. Create dbt models that calculate the following metrics:

   **Important:** Remember to apply the sampling rate from the `RATE` field to extrapolate actual event volumes (see Event Sampling section above).

   **Consent Metrics:**

   - Consent conversion rate per company (ratio of `consent.given` to `consent.asked` events)
   - Distribution of consent statuses (full opt-in, partial, empty)
   - Average time between consent being asked and consent being given

   **Company Performance Metrics:**

   - Total event volume per company
   - Breakdown by event type (pageview, consent.given, consent.asked, ui.action)
   - Geographic reach (number of distinct countries where events occurred)
   - All metrics enriched with company industry and headquarters country

3. Organize your models in a way that follows dbt best practices and makes sense for the data

**Notes:**

- You decide how to split and organize your models (staging, intermediate, marts, etc.)
- You decide where and how to clean/transform the data
- Consider reusability and maintainability in your model structure
- Add appropriate tests and documentation to your models

### Part 3: Documentation

Create a `SOLUTION.md` file in the root directory that documents your work. This file should be comprehensive enough for a reviewer to understand your approach and replicate your results.

**Your `SOLUTION.md` should include:**

1. **How to Run Your Solution:**

   - Any additional dependencies you added and why
   - Step-by-step commands to run your data ingestion script(s)
   - Step-by-step commands to run your dbt models
   - (Optional) Example queries to verify results

2. **Data Quality Observations:**

   - What data quality issues did you encounter?
   - How did you handle them?

3. **Architecture Decisions:**

   - Your data ingestion strategy and rationale
   - Your dbt model organization approach
   - Any trade-offs or important choices you made

4. **Key Insights:**

   - 2-3 interesting findings from the metrics you calculated about consent behavior, company performance, or other patterns in the data

5. **Caveats & Notes:**
   - Anything else the reviewer should know about your solution

### Part 4: Data Visualization (ONLY for Live Review)

**IMPORTANT: You do NOT need to create any visualizations when submitting your assignment. This section only applies IF you are invited to a live code review.**

If you are scheduled for a live review of your work, you will be asked to present a dashboard or visualizations based on the metrics you calculated in Part 2. During the live session, you will screenshare and walk us through your visualizations.

**Requirements for the live review:**

- Create visualizations showcasing the metrics from your dbt models
- Use any tool of your choice (e.g., Metabase, Tableau, Superset, Python notebooks, Streamlit, Looker, Power BI, or any other tool you're comfortable with)
- Be prepared to screenshare and present your dashboard during the live session
- Focus on clarity and storytelling - help us understand the insights from the data

**What to visualize:**

- At minimum, visualize 3-4 key metrics from your models (e.g., consent conversion rates by company, event type distribution, geographic reach)
- Choose visualizations that best communicate the insights (bar charts, line charts, tables, etc.)
- Feel free to add any additional analysis or visualizations you find interesting

**Again: Do not spend time on this until you are scheduled for a live review!**

## Evaluation Criteria

We will evaluate your submission on:

- **Code Quality:** Clean, readable, well-documented code
- **Data Engineering:** Effective data loading and transformation strategies
- **dbt Skills:** Proper use of sources, refs, modeling best practices, and documentation
- **Analytical Thinking:** Sound metric definitions and insightful analysis
- **Problem Solving:** How you handle data quality issues and edge cases
- **Communication:** Clear documentation and instructions for reproducing your work

## Submission Instructions

1. Complete all parts of the assignment (data ingestion, dbt models, and documentation)
2. Create your `SOLUTION.md` file as described in Part 3
3. Create a ZIP file of the entire project directory, **excluding:**
   - `postgres-data/`
   - `dbt_project/logs/`
   - `dbt_project/target/`
   - Any `__pycache__/` directories or `.pyc` files
4. Submit the ZIP file as instructed by the HR team

**What to include in your ZIP:**

- Your `SOLUTION.md` file in the root directory
- All your Python scripts in `scripts/`
- All your dbt models, sources, and configuration files in `dbt_project/`
- Updated `pyproject.toml` (if you added dependencies)
- The original `input/` directory with source data files

## Helpful Commands

- `make build`: Start all containers.
- `make shell`: Enter the `analytics-env` container.
- `make dbt-run`: Run your dbt models.
- `make seed`: Load/reload data from the `seeds/` directory.
- `make down`: Stop and remove all containers.
