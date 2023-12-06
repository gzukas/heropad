import { Generated, Selectable } from 'kysely';

export interface Database {
  hero: HeroTable;
  award: AwardTable;
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

export type Hero = Selectable<HeroTable>;
export type Award = Selectable<AwardTable>;
