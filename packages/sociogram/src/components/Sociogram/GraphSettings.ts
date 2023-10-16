import { useEffect } from 'react';
import { useSetSettings } from '@react-sigma/core';
import { useAtomValue } from 'jotai';
import { useGetCommunityColor } from '../../hooks';
import { communityGraphAtom, debouncedHoveredAtom } from '../../atoms';

export function GraphSettings() {
  const setSettings = useSetSettings();
  const getCommunityColor = useGetCommunityColor();
  const debouncedHoveredNode = useAtomValue(debouncedHoveredAtom);
  const communityGraph = useAtomValue(communityGraphAtom);

  useEffect(() => {
    const hoveredColor = debouncedHoveredNode
      ? getCommunityColor(debouncedHoveredNode)
      : undefined;

    setSettings({
      nodeReducer: (node, data) => {
        const commonData = {
          ...data,
          name: node,
          size: 16,
          color: getCommunityColor(node),
          zIndex: 1
        };

        if (!debouncedHoveredNode) {
          return commonData;
        }

        const isHighlighted =
          node === debouncedHoveredNode ||
          communityGraph.hasEdge(node, debouncedHoveredNode) ||
          communityGraph.hasEdge(debouncedHoveredAtom, node);

        return isHighlighted
          ? { ...commonData, zIndex: 2 }
          : { ...commonData, zIndex: 1 };
      },
      edgeReducer: debouncedHoveredNode
        ? (edge, data) =>
            communityGraph.hasExtremity(edge, debouncedHoveredNode)
              ? { ...data, color: hoveredColor, size: 3 }
              : { ...data, hidden: true }
        : null
    });
  }, [getCommunityColor, communityGraph, debouncedHoveredNode]);

  return null;
}
