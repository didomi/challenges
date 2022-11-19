import argparse
import os

from pyspark.sql.session import SparkSession
from pyspark.sql import DataFrame

from generate_transaction_report import flatten_data_frame, deduplication, metrics_calculation


def process_transaction_data(transaction_data: DataFrame, output_data_path_prefix: str) -> None:
    """
    Processes the transaction data
    :param transaction_data: transaction data
    :param output_data_path_prefix: output path
    :param process_date: processing date
    """
    deduplicated_transaction_data = deduplication(transaction_data)
    flattened_transaction_data = flatten_data_frame(deduplicated_transaction_data)
    metrics = metrics_calculation(flattened_transaction_data)
    metrics.write.mode('overwrite')\
        .option('partitionOverwriteMode', 'dynamic')\
        .partitionBy('date', 'hour')\
        .parquet(f"{output_data_path_prefix}/consent_metrics/")


def parse_arguments() -> argparse.Namespace:
    parse = argparse.ArgumentParser()
    parse.add_argument('-ip', '--inputDataPathPrefix', type=str, required=True,
                       help='Path to the input files')
    parse.add_argument('-op', '--outputDataPathPrefix', type=str, required=True,
                       help='Path to the output files')
    parse.add_argument('-d', '--processDate', type=str, required=True,
                       help='processing date of the pipeline')
    return parse.parse_args()


def main() -> None:
    args = parse_arguments()
    spark = SparkSession.builder\
            .appName("Generate transaction data")\
            .config("spark.scheduler.mode", "FAIR") \
            .getOrCreate()

    transaction_data = spark.read.json(f"{args.inputDataPathPrefix}/datehour={args.processDate}*")

    process_transaction_data(transaction_data, args.outputDataPathPrefix)


if __name__ == '__main__':
    main()