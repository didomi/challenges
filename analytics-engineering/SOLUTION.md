
# SOLUTION.md

## Overview

Welcome!  
This project provides a complete, self‑contained environment for the analytics engineering take‑home assignment.  
The solution ingests raw company and event data from the provided `input/` directory into Postgres, transforms it with **dbt**, and outputs analytics‑ready tables with consent and company performance metrics.

The environment already includes:
- **Postgres** (database)
- **Python**, **uv**, and **dbt** pre‑installed inside a Docker container  
- **Makefile commands** that simplify running dbt and ingestion workflows

---

## How to Run the Solution

### Build the environment

Clone the repository and start the Docker setup:
```bash
git clone https://github.com/didomi/challenges.git
cd analytics-engineering
make build
```

This installs dependencies (from `pyproject.toml`), builds containers, and sets up the local Postgres instance.

### Enter the analytics container

```bash
make shell
```

You are now inside the container, ready to ingest data or execute dbt.

### Verify dbt connectivity

```bash
make dbt-debug
```

Expected output:  
`All checks passed! Connection test: OK`

---

## Run the ingestion python scipt

### Files
- **Company** data: `input/country_and_industry/industry and country.csv`
- **Events** data: `input/events/`
  - CSV: `events-company-1.csv` – `events-company-5.csv`
  - Parquet: `events-company-6.parquet` – `events-company-10.parquet`

### Script
Location: `scripts/data_ingestion.py`

### Command

```bash
docker compose exec analytics-env python scripts/data_ingestion.py
```

---

### Run dbt models

```bash
make dbt-deps
make dbt-run
```

### Run dbt tests

```bash
make dbt-test
```

---

## Data Models Overview

| Layer | Folder | Purpose |
|--------|--------|----------|
| **staging** | `models/staging/` | Clean raw data from Postgres (`stg_events.sql`, `stg_companies.sql`) |
| **intermediate** | `models/int_ssot/` | Compute event‑level metrics, apply sampling rate extrapolation |
| **ssot** | `models/ssot/` | Aggregate consent and performance metrics per company |
| **report** | `models/report.sql` | Combined output table with all KPIs |

### Tests
- Uses `dbt-utils` for numeric range checks.
- Tests: `not_null`, `unique`, `>= 0`, and `value_between` for conversion rates.

---

### Example verification queries

Open a psql shell or use your SQL client and run queries against the models created by dbt (example model: `report.companies_kpis`).

Example: inspect top companies KPIs

```sql
SELECT *
FROM report.companies_kpis
ORDER BY total_events DESC
LIMIT 50;
```

Example: consent behavior by country

```sql
SELECT country, COUNT(*) AS users, AVG(consent_opt_in::float) AS opt_in_rate
FROM report.companies_kpis
GROUP BY country
ORDER BY opt_in_rate DESC
LIMIT 20;
```
---

## Data Quality Observations (rewrite it)

| Issue | Description | Handling |
|--------|--------------|----------|
| **Triple‑quoted country codes** | e.g. `"""ES"""` | Trimmed quotes in staging model |
| **Mixed event schemas** | CSV vs Parquet data slight structure differences | Unified column order and datatypes before load |
| **Missing consent statuses** | Empty/null CONSENT field | Counted under `empty` status |
| **Sampled data** | `RATE` < 1 for sampled events | Applied extrapolation `COUNT / RATE` in dbt |
| **Timestamp mismatches** | Some malformed timestamps | Filtered out invalid rows during ingestion |

All metrics are validated through dbt tests to confirm non‑negative numbers, uniqueness of `company_id`, and valid conversion rate range (`0–1`).

---

## Architecture Decisions (rewrite it)

Data ingestion strategy and rationale

- Lightweight ETL script: I used the `scripts/data_ingestion.py` script (COPY FROM and pandas) to read input files and push canonical staging tables into Postgres. Rationale: the dataset can be small but using the COPY from Postgress makes it easy to handle large ingestions
- Staging to dbt: ingestion writes raw, minimally transformed data to staging tables. dbt performs the heavy transformations, testing, and documentation. This separation keeps raw data immutable and provides an auditable transformation layer.

dbt model organization approach

- `models/staging/` — raw->cleaned staging SQL (casts, dedupe, timestamp normalization, canonical column names). These are one-to-one with source tables.
- `models/ssot/` — Single Source Of Truth models that join staging tables into canonical dimension and fact tables.
- `models/report/` — reporting / KPI models that aggregate SSOT models into business-facing metrics (for example `report.companies_kpis`).

Trade-offs and important choices

- Keeping transformations in dbt increases transparency and testability, but it does assume a SQL-native transformation workflow and that Postgres can handle the transformation workload.

---

## Key Insights

---

## Caveats & Notes

- **Sampling bias:** Since data uses company‑specific `RATE`, extrapolated metrics assume representative sampling.  
- **Temporal limitation:** Dataset duration unknown — metrics represent a snapshot, not time trends.  
- **Performance:** Works efficiently at the dataset size provided; scaling for billions of events would need partitioned or incremental builds.  
- **Goals:** Simplicity, auditability, and clarity took precedence over maximum performance.
---