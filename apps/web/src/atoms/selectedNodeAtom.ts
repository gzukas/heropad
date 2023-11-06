import { atom } from 'jotai';

export const selectedNodeAtom = atom<string | null | undefined>(null);
