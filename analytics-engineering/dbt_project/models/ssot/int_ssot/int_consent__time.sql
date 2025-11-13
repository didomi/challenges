{{ config(materialized='table') }}

WITH events AS (SELECT * FROM {{ ref('stg_events') }}),

asked AS (
    SELECT
        company_id,
        event_time AS asked_at,
        window_start,
        ROW_NUMBER() OVER (PARTITION BY company_id,window_start ORDER BY event_time ASC) AS rank_asked
    FROM events
),

given AS (

    SELECT
        company_id,
        event_time AS given_at,
        window_start,
        ROW_NUMBER() OVER (PARTITION BY company_id,window_start ORDER BY event_time ASC) AS rank_given
    FROM events
    WHERE event_type = 'consent.given'
),

asked_dedup AS (
    SELECT
        *
    FROM asked
    WHERE rank_asked=1
),

given_dedup AS (
    SELECT
        *
    FROM given
    WHERE rank_given=1
),


joined AS (
    SELECT
        a.company_id,
        a.window_start,
        a.asked_at,
        g.given_at,
        EXTRACT(EPOCH FROM (g.given_at - a.asked_at)) AS seconds_to_consented
    FROM asked a
    LEFT JOIN given g USING (company_id,window_start)
)

SELECT * FROM joined