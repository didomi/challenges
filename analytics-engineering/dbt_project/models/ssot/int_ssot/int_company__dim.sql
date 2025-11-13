{{ config(materialized='table') }}

WITH company_info AS (SELECT * FROM {{ ref('stg_company_info') }})

SELECT
    company_id,
    industry_back,
    industry_front,
    hq_country
FROM company_info ci