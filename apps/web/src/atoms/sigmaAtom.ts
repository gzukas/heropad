import { atom } from 'jotai';
import { type Sigma } from 'sigma';
import { HeroNode } from './graphAtom';

export type SociogramSigma = Sigma<HeroNode>;

const baseSigmaAtom = atom<SociogramSigma | null>();

export const sigmaAtom = atom(
  get => get(baseSigmaAtom),
  async (get, set, nextSigma: SociogramSigma | null) => {
    get(baseSigmaAtom)?.kill();
    set(baseSigmaAtom, nextSigma);
  }
);
