{{ config(materialized='table') }}

WITH int_consent__conversion_rate AS (SELECT * FROM {{ ref('int_consent__conversion_rate') }}),
int_consent__status_distribution AS (SELECT * FROM {{ ref('int_consent__status_distribution') }}),
int_consent__time AS (SELECT * FROM {{ ref('int_consent__time') }}),
int_company__dim AS (SELECT * FROM {{ ref('int_company__dim') }}),

 median_int_consent__time AS (
    SELECT
        company_id,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY seconds_to_consented) AS median_seconds_to_consented
    FROM int_consent__time
    GROUP BY 1
)

SELECT
    dim.*,
    given_extrapolated_count,
    asked_extrapolated_count,
    consent_conversion_rate_pct,
    total_events,
    total_empty_consent_statuses,
    total_full_opt_in_consent_statuses,
    total_partial_opt_in_consent_statuses,
    median_seconds_to_consented
FROM int_company__dim dim
LEFT JOIN int_consent__conversion_rate cr USING (company_id)
LEFT JOIN int_consent__status_distribution dist USING (company_id)
LEFT JOIN median_int_consent__time t USING (company_id)