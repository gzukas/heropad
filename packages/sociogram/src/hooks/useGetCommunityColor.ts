import { useCallback, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { communityGraphAtom } from '../atoms';
import { useColors } from './useColors';

export function useGetCommunityColor() {
  const communityGraph = useAtomValue(communityGraphAtom);
  const communities = useMemo(
    () =>
      new Set(
        communityGraph
          .mapNodes((_node, attributes) => attributes.community)
          .filter(Boolean)
      ).size,
    [communityGraph]
  );
  const colors = useColors({
    count: communities || 1
  });
  return useCallback(
    (node: string) => {
      return communityGraph.hasNode(node)
        ? colors[communityGraph.getNodeAttribute(node, 'community') || 0]
        : undefined;
    },
    [colors, communityGraph]
  );
}
