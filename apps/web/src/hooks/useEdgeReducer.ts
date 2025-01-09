import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { Settings } from 'sigma/settings';
import { EdgeDisplayData } from 'sigma/types';
import { useCommittedRef } from '~/hooks/useCommittedRef';
import { graphAtom } from '~/atoms/graphAtom';
import { selectedNodeAtom } from '~/atoms/selectedNodeAtom';
import { sigmaAtom } from '~/atoms/sigmaAtom';

/**
 * Defines the display data for an graph edge in the sociogram.
 */
export type SociogramEdgeDisplayData = Partial<EdgeDisplayData>;

/**
 * Represents a function type used to modify the data of graph edge.
 */
export type EdgeReducer = NonNullable<Settings['edgeReducer']>;

/**
 * A hook for managing edge data in sociogram visualization.
 *
 * This hook returns a memoized function that applies the given edge reducer logic
 * while enhancing it with source node coloring and visibility based on the selected node.
 *
 * @param edgeReducer A function to apply additional modifications to the edge data.
 * Defaults to returning the original data.
 *
 * @example
 * ```
 * const edgeReducer = useEdgeReducer((edge, data) => ({
 *   ...data,
 *   label: `Edge ${edge}`
 * }));
 * ```
 */
export function useEdgeReducer(
  edgeReducer: (
    edge: string,
    data: SociogramEdgeDisplayData
  ) => SociogramEdgeDisplayData = (_, data) => data
) {
  const edgeReducerRef = useCommittedRef(edgeReducer);
  const selectedNode = useAtomValue(selectedNodeAtom);
  const graph = useAtomValue(graphAtom);
  const sigma = useAtomValue(sigmaAtom);

  return useCallback<EdgeReducer>(
    (edge, data) => {
      const color = sigma?.getNodeDisplayData(graph.source(edge))?.color;
      const hidden = !!selectedNode && !graph.hasExtremity(edge, selectedNode);
      return edgeReducerRef.current(edge, {
        ...data,
        hidden,
        color
      });
    },
    [sigma, edgeReducerRef, graph, selectedNode]
  );
}
