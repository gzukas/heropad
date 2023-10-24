import { useCallback } from 'react';
import { Settings } from 'sigma/settings';
import { useAtomValue } from 'jotai';
import { useGetCommunityColor } from './useGetCommunityColor';
import { useCommitedRef } from 'base';
import {
  debouncedHoveredAtom,
  selectedNodeAtom,
  focusedNodesAtom
} from '../atoms';
import { SociogramNodeDisplayData } from '../types';

export type NodeReducer = NonNullable<Settings['nodeReducer']>;

export interface UseNodeReducerOptions {
  unfocusedColor?: string;
}

export function useNodeReducer(
  options: UseNodeReducerOptions = {}
): NodeReducer {
  const optionsRef = useCommitedRef(options);
  const getCommunityColor = useGetCommunityColor();
  const selectedNode = useAtomValue(selectedNodeAtom);
  const focusedNodes = useAtomValue(focusedNodesAtom);
  const debouncedHoveredNode = useAtomValue(debouncedHoveredAtom);

  return useCallback<NodeReducer>(
    (node, data) => {
      const focused = focusedNodes.has(node);
      const highlighted =
        node === selectedNode || node === debouncedHoveredNode;
      return {
        ...data,
        size: 24,
        color: getCommunityColor(node),
        label: focused || highlighted ? data['name'] : null,
        zIndex: 1,
        highlighted,
        ...(!focused && {
          zIndex: 0,
          color: optionsRef.current.unfocusedColor,
          image: null
        })
      } satisfies SociogramNodeDisplayData;
    },
    [getCommunityColor, selectedNode, focusedNodes, debouncedHoveredNode]
  );
}
