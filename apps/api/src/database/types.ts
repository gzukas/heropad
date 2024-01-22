import { Generated } from 'kysely';

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
