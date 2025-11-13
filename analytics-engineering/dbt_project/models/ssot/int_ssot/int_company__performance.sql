{{ config(materialized='table') }}

WITH events AS (SELECT * FROM {{ ref('stg_events') }}),

 events_light AS (
    SELECT
        company_id,
        event_type,
        country,
        extrapolated_count
    FROM events
),

summaries AS (
    SELECT
        company_id,
        SUM(extrapolated_count) AS total_events,
        SUM(extrapolated_count) FILTER (WHERE event_type = 'pageview') AS total_pageviews,
        SUM(extrapolated_count) FILTER (WHERE event_type = 'consent.given') AS total_consent_given,
        SUM(extrapolated_count) FILTER (WHERE event_type = 'consent.asked') AS total_consent_asked,
        SUM(extrapolated_count) FILTER (WHERE event_type = 'ui.action') AS total_ui_actions,
        COUNT(DISTINCT country) AS distinct_countries
    FROM events_light
    GROUP BY company_id
)

SELECT * FROM summaries