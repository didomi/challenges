{{ config(materialized='table') }}

WITH events AS (SELECT * FROM {{ ref('stg_events') }}),

 events_light AS (
    SELECT
        company_id,
        consent_status,
        extrapolated_count
    FROM events
),

summaries AS (
    SELECT
        company_id,
        SUM(extrapolated_count) AS total_events,
        SUM(
            CASE 
                WHEN consent_status = 'empty'
                THEN extrapolated_count
                ELSE 0
            END
            ) AS total_empty_consent_statuses,

        SUM(
            CASE 
                WHEN consent_status = 'full opt-in'
                THEN extrapolated_count
                ELSE 0
            END
            ) AS total_full_opt_in_consent_statuses,
        SUM(
            CASE 
                WHEN consent_status = 'partial'
                THEN extrapolated_count
                ELSE 0
            END
            ) AS total_partial_opt_in_consent_statuses
    FROM events_light
    GROUP BY company_id
)

SELECT * FROM summaries