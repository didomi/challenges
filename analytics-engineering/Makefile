.PHONY: build down shell seed dbt-run dbt-debug dbt-test dbt-deps

build:
	docker-compose up -d --build

down:
	docker-compose down

shell:
	docker-compose exec analytics-env bash

dbt-deps:
	docker-compose exec analytics-env bash -c "cd dbt_project && dbt deps --profiles-dir ../profiles"

seed: dbt-deps
	docker-compose exec analytics-env bash -c "cd dbt_project && dbt seed --profiles-dir ../profiles"

dbt-run: dbt-deps
	docker-compose exec analytics-env bash -c "cd dbt_project && dbt run --profiles-dir ../profiles"

dbt-debug:
	docker-compose exec analytics-env bash -c "cd dbt_project && dbt debug --profiles-dir ../profiles"

dbt-test: dbt-deps
	docker-compose exec analytics-env bash -c "cd dbt_project && dbt test --profiles-dir ../profiles"