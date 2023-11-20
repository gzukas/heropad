import { atom } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import type { Node } from '~/types';
import { api } from '~/utils/api';

const serializedGraphAtom = api.graph.getGraph.atomWithQuery();

export const graphAtom = atom(async get => {
  const { edges, nodes } = await get(serializedGraphAtom);
  const graph = new MultiDirectedGraph<Node>();
  for (const { username, name } of nodes) {
    graph.addNode(username, {
      name,
      image: `${import.meta.env.VITE_API_URL}/avatars/${username}.svg`
    });
  }
  for (const { from, to } of edges) {
    graph.addEdge(from, to);
  }
  return graph;
});
