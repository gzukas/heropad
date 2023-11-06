import { atom } from 'jotai';
import { graphAtom, selectedNodeAtom } from '.';

export const focusedNodesAtom = atom(async get => {
  const graph = await get(graphAtom);
  const selectedNode = get(selectedNodeAtom);
  return selectedNode
    ? new Set([
        selectedNode,
        ...(graph.hasNode(selectedNode) ? graph.neighbors(selectedNode) : [])
      ])
    : new Set(graph.nodes());
});
