{{ config(materialized='table') }}

WITH src AS (SELECT * FROM {{ source('main', 'events') }}),

typed AS (
    SELECT
        event_id,
        user_id,
        type AS event_type,
        COALESCE(CAST(rate AS FLOAT), 1.0) AS rate,
        parameters,
        CAST(event_time AS TIMESTAMP) AS event_time,
        CAST(window_start AS TIMESTAMP) AS window_start,
        apikey AS company_id,
        consent AS consent_status,
        count AS sampled_count,
        CASE
            WHEN CAST(rate AS FLOAT) > 0
                 THEN CAST(count AS FLOAT) / CAST(rate AS FLOAT)
            ELSE NULL
        END AS extrapolated_count,
        experiment,
        sdk_type,
        domain,
        deployment_id,
        REGEXP_REPLACE(country, '"""', '', 'g') AS country,
        REGEXP_REPLACE(region, '"""', '', 'g') AS region,
        browser_family,
        device_type
    FROM src
    WHERE event_id IS NOT NULL
)

SELECT * FROM typed