import { Kysely, PostgresDialect, Generated } from 'kysely';
import pg from 'pg';

export interface Database {
  hero: HeroTable;
  award: AwardTable;
  hero_award_search: HeroAwardSearchTable;
}

export interface HeroTable {
  id: Generated<number>;
  username: string;
  name: string;
  search: Generated<string>;
}

export interface AwardTable {
  id: Generated<number>;
  givenAt: Generated<Date>;
  description: string;
  fromId: number;
  toId: number;
  search: Generated<string>;
}

export interface HeroAwardSearchTable {
  id: Generated<number>;
  text: string;
  search: Generated<string>;
  nodes: string[];
  kind: 'hero' | 'award';
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: process.env.HEROPAD_DB_URL
    })
  })
});
