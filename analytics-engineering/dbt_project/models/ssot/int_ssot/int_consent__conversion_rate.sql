{{ config(materialized='table') }}

WITH events AS (SELECT * FROM {{ ref('stg_events') }}),

asked AS (
    SELECT
        company_id,
        SUM(extrapolated_count) AS asked_extrapolated_count
    FROM events
    WHERE event_type = 'consent.asked'
    GROUP BY 1
),

given AS (

    SELECT
        company_id,
        SUM(extrapolated_count) AS given_extrapolated_count
    FROM events
    WHERE event_type = 'consent.given'
    GROUP BY 1
),

joined AS (
    SELECT
        a.company_id,
        given_extrapolated_count,
        asked_extrapolated_count,
        given_extrapolated_count / NULLIF(asked_extrapolated_count, 0) AS consent_conversion_rate_pct
    FROM asked a
    LEFT JOIN given g USING (company_id)
)

SELECT * FROM joined