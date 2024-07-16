import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { Settings } from 'sigma/settings';
import { EdgeDisplayData } from 'sigma/types';
import { useCommittedRef } from '~/hooks/useCommittedRef';
import { graphAtom } from '~/atoms/graphAtom';
import { selectedNodeAtom } from '~/atoms/selectedNodeAtom';

export type SociogramEdgeDisplayData = Partial<EdgeDisplayData>;

export type EdgeReducer = NonNullable<Settings['edgeReducer']>;

export function useEdgeReducer(
  edgeReducer: (
    edge: string,
    data: SociogramEdgeDisplayData
  ) => SociogramEdgeDisplayData = (_edge, data) => data
) {
  const edgeReducerRef = useCommittedRef(edgeReducer);
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
    [edgeReducerRef, selectedNode, graph]
  );
}
