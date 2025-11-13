{{ config(materialized='table') }}

WITH src AS (
    SELECT * FROM {{ source('main', 'company_info') }}
),

typed AS (
    SELECT
        TRIM(public_api_key) AS company_id,
        TRIM(industry_back) AS industry_back,
        TRIM(industry_front) AS industry_front,
        NULLIF(TRIM(hq_country), '') AS hq_country
    FROM src
    WHERE public_api_key IS NOT NULL
)

SELECT * FROM typed