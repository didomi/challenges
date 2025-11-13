import os
import io
import psycopg2
import pandas as pd

# ---- Database connection info ----
PG_USER = "ae_interview"
PG_PASSWORD = "password"
PG_HOST = "db"
PG_PORT = 5432
PG_DB = "analytics_db"

conn_params = {
    "user": PG_USER,
    "password": PG_PASSWORD,
    "host": PG_HOST,
    "port": PG_PORT,
    "dbname": PG_DB,
}

# --------------------------------------------------------------------------- #
# Utility: drop all tables in a schema
# --------------------------------------------------------------------------- #
def drop_all_tables(cur, schema: str = "main") -> None:
    """Drop all tables in the given schema."""
    cur.execute("""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = %s;
    """, (schema,))

    tables = [row[0] for row in cur.fetchall()]
    if not tables:
        print(f"No tables found in schema '{schema}' to drop.")
        return

    for table in tables:
        cur.execute(f'DROP TABLE IF EXISTS "{schema}"."{table}" CASCADE;')
        print(f"Dropped table: {schema}.{table}")

# --------------------------------------------------------------------------- #
# COPY helpers
# --------------------------------------------------------------------------- #
def define_table(cursor, table_name: str, columns: list[str]) -> None:
    """Drop and recreate table with all TEXT columns."""
    col_defs = ", ".join(f'"{c}" text' for c in columns)
    cursor.execute(f'DROP TABLE IF EXISTS "{table_name}" CASCADE;')
    cursor.execute(f'CREATE TABLE "{table_name}" ({col_defs});')

def copy_csv_file(cursor, table_name: str, csv_path: str, create_table: bool = False) -> None:
    """Load a CSV file into a Postgres table."""
    with open(csv_path, "r", encoding="utf-8-sig") as f:
        if create_table:
            header = f.readline().strip()
            columns = [h.strip().replace(" ", "_").lower() for h in header.split(",")]
            define_table(cursor, table_name, columns)
        else:
            next(f)  # skip header

        cursor.copy_expert(
            f"COPY {table_name} FROM STDIN WITH (FORMAT csv, HEADER false, NULL '', DELIMITER ',')",
            f,
        )
    print(f"Loaded CSV: {csv_path}")

def copy_parquet_file(cursor, table_name: str, parquet_path: str, create_table: bool = False) -> None:
    """Read Parquet → in‑memory CSV → COPY into Postgres."""
    df = pd.read_parquet(parquet_path)
    csv_buf = io.StringIO()
    df.to_csv(csv_buf, index=False)
    csv_buf.seek(0)

    if create_table:
        columns = [c.strip().replace(" ", "_").lower() for c in df.columns]
        define_table(cursor, table_name, columns)

    cursor.copy_expert(
        f"COPY {table_name} FROM STDIN WITH (FORMAT csv, HEADER true, NULL '', DELIMITER ',')",
        csv_buf,
    )
    print(f"Loaded Parquet: {parquet_path}")

# --------------------------------------------------------------------------- #
# Loaders
# --------------------------------------------------------------------------- #
def load_company_info(cur):
    path = "input/country_and_industry/company_info.csv"
    if os.path.exists(path):
        copy_csv_file(cur, "company_info", path, create_table=True)
    else:
        print(f"File not found: {path}")

def load_event_files(cur):
    input_dir = "input/events"
    if not os.path.exists(input_dir):
        print(f"Events directory not found: {input_dir}")
        return

    csv_files, parquet_files = [], []
    for root, _, files in os.walk(input_dir):
        for file in sorted(files):
            path = os.path.join(root, file)
            if file.endswith(".csv"):
                csv_files.append(path)
            elif file.endswith(".parquet"):
                parquet_files.append(path)

    if not csv_files and not parquet_files:
        print("No event files found.")
        return

    first = True
    for path in csv_files + parquet_files:
        if path.endswith(".csv"):
            copy_csv_file(cur, "events", path, create_table=first)
        elif path.endswith(".parquet"):
            copy_parquet_file(cur, "events", path, create_table=first)
        first = False

# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def main():
    print("Starting raw data ingestion into schema 'main'...")
    with psycopg2.connect(**conn_params) as conn:
        with conn.cursor() as cur:
            # ensure the schema exists and set it as the default
            cur.execute("CREATE SCHEMA IF NOT EXISTS main;")
            cur.execute("SET search_path TO main;")

            # drop existing tables first
            drop_all_tables(cur, schema="main")

            load_company_info(cur)
            load_event_files(cur)

        conn.commit()
    print("Data ingestion complete (schema: main).")

if __name__ == "__main__":
    main()