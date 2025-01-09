import { useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { useAtomValue, useStore } from 'jotai';
import { useEdgeReducer } from '~/hooks/useEdgeReducer';
import { useNodeReducer } from '~/hooks/useNodeReducer';
import { createNodeHoverDrawingFunction } from '~/utils/createNodeHoverDrawingFunction';
import { blendedColorFamily } from '~/atoms/blendedColorFamily';
import { sigmaAtom } from '~/atoms/sigmaAtom';

export const NODE_COLOR_BLEND_RATIO = 0.08;
export const EDGE_COLOR_BLEND_RATIO = 0.76;

export function GraphSettings() {
  const sigma = useAtomValue(sigmaAtom);
  const { palette } = useTheme();
  const store = useStore();

  const {
    primary: { main: primaryMain, contrastText },
    text: { primary: textPrimary },
    background
  } = palette;

  const nodeReducer = useNodeReducer((_node, data) => ({
    ...data,
    ...(!data.zIndex && {
      color: store.get(
        blendedColorFamily([
          primaryMain,
          background.default,
          NODE_COLOR_BLEND_RATIO
        ])
      )
    })
  }));

  const edgeReducer = useEdgeReducer((_edge, data) => ({
    ...data,
    color:
      data.color &&
      store.get(
        blendedColorFamily([
          data.color,
          background.default,
          EDGE_COLOR_BLEND_RATIO
        ])
      )
  }));

  const defaultDrawNodeHover = useMemo(
    () =>
      createNodeHoverDrawingFunction({
        hoverBackgroundColor: primaryMain,
        labelColor: { color: contrastText }
      }),
    [primaryMain, contrastText]
  );

  useEffect(() => {
    sigma?.setSettings({
      nodeReducer,
      edgeReducer,
      defaultDrawNodeHover,
      labelColor: {
        color: textPrimary
      },
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: 15
    });
  }, [sigma, nodeReducer, edgeReducer, textPrimary, defaultDrawNodeHover]);

  return null;
}
