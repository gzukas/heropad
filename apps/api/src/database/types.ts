import { Generated, Selectable } from 'kysely';

export interface Database {
  hero: HeroTable;
  award: AwardTable;
}

export interface HeroTable {
  id: Generated<string>;
  username: string;
  name: string;
}

export interface AwardTable {
  id: Generated<string>;
  givenAt: Generated<Date>;
  description: string;
  fromId: string;
  toId: string;
}

export type Hero = Selectable<HeroTable>;
export type Award = Selectable<AwardTable>;
