import { useEffect, useMemo } from 'react';
import { decomposeColor, recomposeColor, useTheme } from '@mui/material';
import { useSetSettings } from '@react-sigma/core';
import { useEdgeReducer } from '~/hooks/useEdgeReducer';
import { useNodeReducer } from '~/hooks/useNodeReducer';
import { blendAlpha } from '~/utils/blendAlpha';
import { createNodeHoverRenderer } from '~/utils/createNodeHoverRenderer';

export function GraphSettings() {
  const setSettings = useSetSettings();
  const { palette } = useTheme();

  const grayish = useMemo(
    () =>
      recomposeColor(
        blendAlpha(
          decomposeColor(palette.action.selected),
          decomposeColor(palette.background.default),
          palette.action.selectedOpacity
        )
      ),
    [palette]
  );

  const nodeReducer = useNodeReducer((_node, data) => ({
    ...data,
    ...(!data.zIndex && { color: grayish })
  }));

  const edgeReducer = useEdgeReducer((_edge, data) => ({
    ...data,
    color: grayish
  }));

  useEffect(() => {
    setSettings({
      nodeReducer,
      edgeReducer,
      hoverRenderer: createNodeHoverRenderer({
        hoverBackgroundColor: palette.primary.main,
        labelColor: { color: palette.primary.contrastText }
      }),
      labelColor: {
        color: palette.text.primary
      },
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: 15
    });
  }, [setSettings, nodeReducer, edgeReducer]);

  return null;
}
