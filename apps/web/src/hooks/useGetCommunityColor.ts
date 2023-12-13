import { useCallback, useMemo } from 'react';
import { SupportedColorScheme, useColorScheme } from '@mui/material';
import { useAtomValue } from 'jotai';
import invariant from 'tiny-invariant';
import { kMeansPalette } from '~/utils/kMeansPalette';
import { communityGraphAtom } from '~/atoms/communityGraphAtom';

export interface UseGetCommunityColorOptions {
  palette?: Record<SupportedColorScheme, readonly string[]>;
}

export function useGetCommunityColor(
  options: UseGetCommunityColorOptions = {}
) {
  const { palette = kMeansPalette } = options;
  const communityGraph = useAtomValue(communityGraphAtom);
  const { colorScheme = 'dark' } = useColorScheme();
  const colors = palette[colorScheme];

  const communities = useMemo(
    () =>
      new Set(
        communityGraph.mapNodes(
          (_node, attributes) => attributes.community ?? 0
        )
      ).size,
    [communityGraph]
  );

  invariant(
    communities < colors.length,
    `Palette has ${colors.length} colors, but there are ${communities} communities in the graph.`
  );

  return useCallback(
    (node: string) => {
      return communityGraph.hasNode(node)
        ? colors[communityGraph.getNodeAttribute(node, 'community') ?? 0]
        : undefined;
    },
    [communityGraph, colors]
  );
}
