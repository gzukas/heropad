import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { Settings } from 'sigma/settings';
import { graphAtom, selectedNodeAtom } from '../atoms';

export type EdgeReducer = Settings['edgeReducer'];

export function useEdgeReducer(): EdgeReducer {
  const selectedNode = useAtomValue(selectedNodeAtom);
  const graph = useAtomValue(graphAtom);
  return useMemo<EdgeReducer>(
    () =>
      selectedNode
        ? (edge, data) => ({
            ...data,
            hidden: !graph.hasExtremity(edge, selectedNode)
          })
        : null,
    [selectedNode, graph]
  );
}
