import { useCallback } from 'react';
import { Settings } from 'sigma/settings';
import { NodeDisplayData } from 'sigma/types';
import { useAtomValue } from 'jotai';
import { useCommittedRef } from '@heropad/base';
import { debouncedHoveredAtom } from '~/atoms/hoveredNodeAtom';
import { selectedNodeAtom } from '~/atoms/selectedNodeAtom';
import { focusedNodesAtom } from '~/atoms/focusedNodesAtom';
import { useGetCommunityColor } from './useGetCommunityColor';
import { useDevicePixelRatio } from './useDevicePixelRatio';

export interface SociogramNodeDisplayData extends Partial<NodeDisplayData> {
  image?: string | null;
}

type NodeReducer = NonNullable<Settings['nodeReducer']>;

export function useNodeReducer(
  nodeReducer: (
    node: string,
    data: SociogramNodeDisplayData
  ) => Partial<SociogramNodeDisplayData> = (_node, data) => data
) {
  const nodeReducerRef = useCommittedRef(nodeReducer);
  const getCommunityColor = useGetCommunityColor();
  const selectedNode = useAtomValue(selectedNodeAtom);
  const focusedNodes = useAtomValue(focusedNodesAtom);
  const debouncedHoveredNode = useAtomValue(debouncedHoveredAtom);
  const devicePixelRatio = useDevicePixelRatio();

  return useCallback<NodeReducer>(
    (node, data) => {
      const highlighted =
        node === selectedNode || node === debouncedHoveredNode;
      const focused = focusedNodes.has(node);
      const label = focused || highlighted ? data['name'] : null;
      return nodeReducerRef.current(node, {
        ...data,
        color: getCommunityColor(node),
        size: 24 / devicePixelRatio,
        zIndex: 1,
        ...(!focused && {
          zIndex: 0,
          image: null
        }),
        label,
        highlighted
      });
    },
    [
      selectedNode,
      debouncedHoveredNode,
      focusedNodes,
      getCommunityColor,
      devicePixelRatio
    ]
  );
}
