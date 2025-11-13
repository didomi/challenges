{{ config(materialized='table') }}

WITH int_company__performance AS (SELECT * FROM {{ ref('int_company__performance') }}),
int_company__dim AS (SELECT * FROM {{ ref('int_company__dim') }})

SELECT
    dim.*,
    total_events,
    total_pageviews,
    total_consent_given,
    total_consent_asked,
    total_ui_actions,
    distinct_countries
FROM int_company__performance perf
LEFT JOIN int_company__dim dim USING(company_id)