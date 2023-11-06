import { atom } from 'jotai';
import louvain from 'graphology-communities-louvain';
import toSimple from 'graphology-operators/to-simple';
import { random } from 'graphology-layout';
import { graphAtom } from './graphAtom';

export const communityGraphAtom = atom(async get => {
  const graph = toSimple(await get(graphAtom));
  louvain.assign(graph);
  random.assign(graph);
  return graph;
});
