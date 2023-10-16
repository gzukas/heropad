import { atom } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import type { Node } from 'sociogram';
import { api } from '~/utils/api';

const edgesAtom = api.graph.getEdges.atomWithQuery();

export const graphAtom = atom(async get => {
  const edges = await get(edgesAtom);
  const graph = new MultiDirectedGraph<Node>();
  for (const { id, from, to } of edges) {
    graph.mergeNode(from, {
      image: `${import.meta.env.VITE_API_URL}/avatars/${to}.svg`
    });
    graph.mergeNode(to, {
      image: `${import.meta.env.VITE_API_URL}/avatars/${from}.svg`
    });
    graph.mergeEdgeWithKey(id, from, to);
  }
  return graph;
});
