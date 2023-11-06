import { useEffect, useMemo } from 'react';
import { useSetSettings } from '@react-sigma/core';
import { useEdgeReducer, useNodeReducer } from '../../hooks';
import { decomposeColor, recomposeColor, useTheme } from '@mui/material';
import { blendAlpha, createNodeHoverRenderer } from '~/utils';

export function GraphSettings() {
  const setSettings = useSetSettings();
  const { palette } = useTheme();

  const grayish = useMemo(
    () =>
      recomposeColor(
        blendAlpha(
          decomposeColor(palette.background.default),
          decomposeColor(palette.action.selected),
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
      }
    });
  }, [setSettings, nodeReducer, edgeReducer]);

  return null;
}
