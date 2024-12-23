import { useCallback, useMemo } from 'react';
import { SupportedColorScheme, useColorScheme } from '@mui/material';
import { useAtomValue } from 'jotai';
import invariant from 'tiny-invariant';
import { kMeansPalette } from '~/utils/kMeansPalette';
import { communityGraphAtom } from '~/atoms/communityGraphAtom';

export interface UseGetCommunityColorOptions {
  /**
   * An optional pallete for different color schemes.
   *
   * The pallete is a record where the key is a color scheme (`dark` or `light`)
   * and the value is an array of color strings.
   */
  palette?: Record<SupportedColorScheme, readonly string[]>;
}

/**
 * A hook that returns a function which retrieves the color associated with a community 
 * in a graph, based on the current color scheme.
 * 
 * The function returned takes a node identifier and returns the color associated with
 * the community of that node, or `undefined` if the node does not exist.

 * @param options The customization options.
 */
export function useGetCommunityColor(
  options: UseGetCommunityColorOptions = {}
) {
  const { palette = kMeansPalette } = options;
  const communityGraph = useAtomValue(communityGraphAtom);
  const { colorScheme = 'dark' } = useColorScheme();
  const colors = palette[colorScheme];

  const communities = useMemo(
    () =>
      new Set(communityGraph.mapNodes((_, { community }) => community ?? 0))
        .size,
    [communityGraph]
  );

  invariant(
    communities < colors.length,
    `Palette has ${colors.length} color(s), but there are ${communities} community(ies) in the graph.`
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
