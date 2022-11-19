import pytest
from pyspark.sql import SparkSession
from pyspark_test import assert_pyspark_df_equal

from transaction_report.generate_transaction_report import metrics_calculation


@pytest.fixture(scope="session")
def spark():
    spark = SparkSession.builder \
        .master("local[*]") \
        .appName("test transaction report") \
        .getOrCreate()

    return spark


def test_metrics_calculation(spark):
    transaction_df = spark.createDataFrame(
        [
            ('2021-01-23 10', '2021-01-23', '10', 'www.domain-A.eu', '1', 'consent.given', 'true', 'FR', '1'),
            ('2021-01-23 10', '2021-01-23', '10', 'www.domain-A.eu', '2', 'consent.given', 'true', 'FR', '2'),
            ('2021-01-23 11', '2021-01-23', '11', 'www.mywebsite.com', '3', 'pageview', 'true', 'DE', '3'),
            ('2021-01-23 10', '2021-01-23', '10', 'www.mywebsite.com', '4', 'pageview', 'false', 'FR', '4'),
            ('2021-01-23 11', '2021-01-23', '11', 'www.domain-A.eu', '5', 'pageview', 'true', 'ES', '5'),
            ('2021-01-23 10', '2021-01-23', '10', 'www.domain-A.eu', '6', 'pageview', 'false', 'FR', '6'),
            ('2021-01-23 10', '2021-01-23', '10', 'www.mywebsite.com', '7.', 'consent.asked', 'false', 'FR', '7'),
            ('2021-01-23 10', '2021-01-23', '10', 'www.domain-A.eu', '8', 'pageview', 'false', 'ES', '8')
        ],
        ['datehour', 'date', 'hour', 'domain', 'id', 'type', 'user_consent', 'country', 'user_id']
    )

    metrics_df = metrics_calculation(transaction_df)

    final_df = spark.createDataFrame(
        [
            ('2021-01-23 11', '2021-01-23', '11', 'www.domain-A.eu', 'ES', 1, 1, 0, 0, 0, 0, 1.0),
            ('2021-01-23 11', '2021-01-23', '11', 'www.mywebsite.com', 'DE', 1, 1, 0, 0, 0, 0, 1.0),
            ('2021-01-23 10', '2021-01-23', '10', 'www.domain-A.eu', 'FR', 1, 0, 0, 0, 2, 2, 0.3333333333333333),
            ('2021-01-23 10', '2021-01-23', '10', 'www.domain-A.eu', 'ES', 1, 0, 0, 0, 0, 0, 1.0),
            ('2021-01-23 10', '2021-01-23', '10', 'www.mywebsite.com', 'FR', 1, 0, 1, 0, 0, 0, 0.5)
        ],
        ['datehour', 'date', 'hour', 'domain', 'country', 'page_views', 'page_views_with_consent', 'consents_asked', 'consents_asked_with_consent', 'consents_given', 'consents_given_with_consent', 'average_page_views']
        )
    assert_pyspark_df_equal(metrics_df, final_df)
