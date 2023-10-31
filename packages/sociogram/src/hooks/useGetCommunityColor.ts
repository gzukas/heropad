import { useCallback, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { communityGraphAtom } from '../atoms';
import { useColors } from './useColors';

export function useGetCommunityColor() {
  const communityGraph = useAtomValue(communityGraphAtom);
  const communities = useMemo(
    () =>
      new Set(
        communityGraph.mapNodes(
          (_node, attributes) => attributes.community ?? 0
        )
      ).size,
    [communityGraph]
  );
  const colors = useColors(communities);
  return useCallback(
    (node: string) => {
      return communityGraph.hasNode(node)
        ? colors[communityGraph.getNodeAttribute(node, 'community') ?? 0]
        : undefined;
    },
    [communityGraph, colors]
  );
}
