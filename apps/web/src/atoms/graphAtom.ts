import { atom } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import type { Node } from 'sociogram';
import { api } from '~/utils/api';

const serializedGraphAtom = api.graph.getGraph.atomWithQuery();
export const graphAtom = atom(async get => {
  const serializedGraph = await get(serializedGraphAtom);
  return new MultiDirectedGraph<Node>().import(serializedGraph);
});
