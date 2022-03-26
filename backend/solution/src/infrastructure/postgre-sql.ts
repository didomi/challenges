import { Pool, QueryResult } from 'pg';
import { inject, injectable } from 'tsyringe';

export interface IPostgreSQLBase {
  query(sql: string, values?: unknown[]): Promise<QueryResult>;
}

@injectable()
export default class PostgreSQL implements PostgreSQL {
  constructor(@inject('PGPool') private readonly _pool: Pool) {}

  async query(sql: string, values?: unknown[]): Promise<QueryResult> {
    return this._pool.query(sql, values);
  }

  async unit<T>(func: (client: IPostgreSQLBase) => Promise<T>): Promise<T> {
    const client = await this._pool.connect();

    try {
      return await func(client);
    } finally {
      client.release();
    }
  }
}
