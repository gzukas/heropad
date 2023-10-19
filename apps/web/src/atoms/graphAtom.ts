import { atom } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import type { Node } from 'sociogram';
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
  for (const { id, from, to } of edges) {
    graph.addEdgeWithKey(id, from, to);
  }
  return graph;
});
