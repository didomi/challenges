from pyspark.sql import DataFrame, window
from pyspark.sql import functions  as f
from pyspark.sql.types import StructType, StructField, StringType, ArrayType


def flatten_data_frame(transaction_data_df: DataFrame) -> DataFrame:
    """
    Flattens a dataframe with nested columns
    :param df: dataframe to flatten
    """
    token = StructType([
    StructField('vendors',
                StructType([
                    StructField('enabled', ArrayType(StringType())),
                    StructField('disabled', ArrayType(StringType()))
                ])
                ),
    StructField('purposes',
                StructType([
                    StructField('enabled', ArrayType(StringType())),
                    StructField('disabled', ArrayType(StringType()))
                ])
                ),
    ])
    with_user_consent_df = transaction_data_df.withColumn('user_token', \
        f.from_json(f.col('user.token'), schema = token))\
        .withColumn('user_consent' ,f.when(f.size('user_token.purposes.enabled') > 0, True).otherwise(False))\
        .withColumn('hour', f.hour('datetime'))\
        .withColumn('date', f.date_format('datetime', 'yyyy-MM-dd'))\
        .withColumn('datehour', f.date_format('datetime', 'yyyy-MM-dd HH'))

    return with_user_consent_df.select('datehour', 'date', 'hour', 'domain', 'id', 'type', 'user_consent', f.col('user.country').alias('country'), f.col('user.id').alias('user_id'))


def deduplication(transaction_data_df: DataFrame) -> DataFrame:
    """
    Removes duplicate transactions
    :param transaction_data_df: transaction data
    """
    return transaction_data_df.dropDuplicates(['id'])


def metrics_calculation(flattened_transaction_data_df: DataFrame) -> DataFrame:
    """
    Calculates the metrics for the transaction data
    :param flattened_transaction_data_df: flattened transaction data
    """
    return flattened_transaction_data_df \
        .withColumn('page_views', f.when(f.col('type') == 'pageview', 1).otherwise(0))\
        .withColumn('page_views_with_consent', f.when((f.col('type') == 'pageview') & (f.col('user_consent') == True), 1).otherwise(0))\
        .withColumn('consents_asked', f.when(f.col('type') == 'consent.asked', 1).otherwise(0))\
        .withColumn('consents_asked_with_consent', f.when((f.col('type') == 'consent.asked') & (f.col('user_consent') == True), 1).otherwise(0))\
        .withColumn('consents_given', f.when(f.col('type') == 'consent.given', 1).otherwise(0))\
        .withColumn('consents_given_with_consent', f.when((f.col('type') == 'consent.given') & (f.col('user_consent') == True), 1).otherwise(0))\
        .withColumn('average_page_views', f.avg('page_views').over(window.Window.partitionBy('user_id')))\
        .groupBy('datehour', 'date', 'hour', 'domain', 'country')\
        .agg(f.sum('page_views').alias('page_views'),\
            f.sum('page_views_with_consent').alias('page_views_with_consent'),\
            f.sum('consents_asked').alias('consents_asked'), \
            f.sum('consents_asked_with_consent').alias('consents_asked_with_consent'),\
            f.sum('consents_given').alias('consents_given'),\
            f.sum('consents_given_with_consent').alias('consents_given_with_consent'),\
            f.avg('average_page_views').alias('average_page_views')\
            )