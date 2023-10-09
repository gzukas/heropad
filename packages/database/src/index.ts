import 'dotenv/config';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './types';

const globalForDb = globalThis as unknown as {
  db: Kysely<Database> | undefined;
};

export const db =
  globalForDb.db ??
  new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL
      })
    })
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.db = db;
}

export * from 'kysely';
export type { Hero, Award } from './types';
