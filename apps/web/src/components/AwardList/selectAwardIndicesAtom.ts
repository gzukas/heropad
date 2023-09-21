import { atom } from 'jotai';
import { Edge } from 'sociogram';

export function selectAwardIndicesAtom(awards: Edge[]) {
  return atom(() => new Map(awards.map((award, index) => [award.id, index])));
}
