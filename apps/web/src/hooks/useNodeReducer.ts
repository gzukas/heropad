import { useCallback } from 'react';
import { Settings } from 'sigma/settings';
import { NodeDisplayData } from 'sigma/types';
import { useAtomValue } from 'jotai';
import { useCommittedRef } from '~/hooks/useCommittedRef';
import { debouncedHoveredAtom } from '~/atoms/hoveredNodeAtom';
import { selectedNodeAtom } from '~/atoms/selectedNodeAtom';
import { useGetCommunityColor } from './useGetCommunityColor';
import { useDevicePixelRatio } from './useDevicePixelRatio';
import { communityGraphAtom } from '~/atoms/communityGraphAtom';

/**
 * Defines the display data for an graph node in the sociogram.
 */
export interface SociogramNodeDisplayData extends Partial<NodeDisplayData> {
  /**
   * URL for a node image.
   */
  image?: string | null;
}

/**
 * Represents a function type used to modify the data of graph node.
 */
export type NodeReducer = NonNullable<Settings['nodeReducer']>;

/**
 * A hook for managing node data in sociogram visualization.
 *
 * This hook provides a memoized function that enhances node rendering based on application state
 * (e.g., selected, focused, or hovered nodes) and applies visual updates like color and size.
 *
 * @param nodeReducer A function to apply additional modifications to the node data.
 * Defaults to returning the original data.
 *
 * @example
 * ```
 * const nodeReducer = useNodeReducer((node, data) => ({
 *   ...data,
 *   label: `Node ${node}`
 * }));
 * ```
 */
export function useNodeReducer(
  nodeReducer: (
    node: string,
    data: SociogramNodeDisplayData
  ) => SociogramNodeDisplayData = (_, data) => data
) {
  const nodeReducerRef = useCommittedRef(nodeReducer);
  const getCommunityColor = useGetCommunityColor();
  const selectedNode = useAtomValue(selectedNodeAtom);
  const communityGraph = useAtomValue(communityGraphAtom);
  const debouncedHoveredNode = useAtomValue(debouncedHoveredAtom);
  const devicePixelRatio = useDevicePixelRatio();

  const getNodeSettings = useCallback<NodeReducer>(
    (node, data) => {
      const focused =
        !selectedNode ||
        node === selectedNode ||
        communityGraph.areNeighbors(selectedNode, node);
      const highlighted =
        node === selectedNode || node === debouncedHoveredNode;
      return {
        ...data,
        color: getCommunityColor(node),
        size: 24 / devicePixelRatio,
        zIndex: focused ? 1 : 0,
        image: focused ? data.image : null,
        label: focused || highlighted ? data.name : null,
        highlighted
      };
    },
    [
      selectedNode,
      debouncedHoveredNode,
      communityGraph,
      getCommunityColor,
      devicePixelRatio
    ]
  );

  return useCallback<NodeReducer>(
    (node, data) => nodeReducerRef.current(node, getNodeSettings(node, data)),
    [nodeReducerRef, getNodeSettings]
  );
}
