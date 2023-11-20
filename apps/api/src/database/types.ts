import { Generated, Selectable } from 'kysely';

export interface Database {
  hero: HeroTable;
  award: AwardTable;
}

export interface HeroTable {
  id: Generated<number>;
  username: string;
  name: string;
}

export interface AwardTable {
  id: Generated<number>;
  givenAt: Generated<Date>;
  description: string;
  fromId: number;
  toId: number;
}

export type Hero = Selectable<HeroTable>;
export type Award = Selectable<AwardTable>;
