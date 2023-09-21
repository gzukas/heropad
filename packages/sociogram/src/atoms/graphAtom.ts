import { atom } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import type { Node } from '../types';

export const graphAtom = atom(new MultiDirectedGraph<Node>());
