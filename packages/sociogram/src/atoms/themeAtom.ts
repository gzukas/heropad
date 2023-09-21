import { atom } from 'jotai';
import { SociogramTheme } from '../types';

export const themeAtom = atom<SociogramTheme>('dark');