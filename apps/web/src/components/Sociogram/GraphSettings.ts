import { useEffect, useMemo } from 'react';
import { decomposeColor, recomposeColor, useTheme } from '@mui/material';
import { useSetSettings } from '@react-sigma/core';
import { useEdgeReducer } from '~/hooks/useEdgeReducer';
import { useNodeReducer } from '~/hooks/useNodeReducer';
import { blendAlpha } from '~/utils/blendAlpha';
import { createNodeHoverDrawingFunction } from '~/utils/createNodeHoverDrawingFunction';

export function GraphSettings() {
  const setSettings = useSetSettings();
  const { palette } = useTheme();

  const {
    action: { selected, selectedOpacity },
    background: { default: bgDefault },
    primary: { main: primaryMain, contrastText },
    text: { primary: textPrimary }
  } = palette;

  const grayish = useMemo(
    () =>
      recomposeColor(
        blendAlpha(
          decomposeColor(selected),
          decomposeColor(bgDefault),
          selectedOpacity
        )
      ),
    [selected, bgDefault, selectedOpacity]
  );

  const nodeReducer = useNodeReducer((_node, data) => ({
    ...data,
    ...(!data.zIndex && { color: grayish })
  }));

  const edgeReducer = useEdgeReducer((_edge, data) => ({
    ...data,
    color: grayish
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
    setSettings({
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
  }, [
    setSettings,
    nodeReducer,
    edgeReducer,
    textPrimary,
    defaultDrawNodeHover
  ]);

  return null;
}
