import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { Settings } from 'sigma/settings';
import { useCommitedRef } from '@heropad/base';
import { graphAtom, selectedNodeAtom } from '../atoms';
import { SociogramEdgeDisplayData } from '../types';

export type EdgeReducer = NonNullable<Settings['edgeReducer']>;

export function useEdgeReducer(
  edgeReducer: (
    edge: string,
    data: SociogramEdgeDisplayData
  ) => SociogramEdgeDisplayData = (_edge, data) => data
) {
  const edgeReducerRef = useCommitedRef(edgeReducer);
  const selectedNode = useAtomValue(selectedNodeAtom);
  const graph = useAtomValue(graphAtom);

  return useCallback<EdgeReducer>(
    (edge, data) =>
      edgeReducerRef.current(edge, {
        ...(selectedNode && {
          hidden: !graph.hasExtremity(edge, selectedNode)
        }),
        ...data
      }),
    [selectedNode, graph]
  );
}
