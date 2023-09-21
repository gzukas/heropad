import { atom } from 'jotai';

export const directionAtom = atom<'received' | 'given' | undefined>('received');
