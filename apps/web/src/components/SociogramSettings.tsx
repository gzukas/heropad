import { useEffect, useMemo } from 'react';
import { useSetSettings } from '@react-sigma/core';
import { useTheme, decomposeColor, recomposeColor } from '@mui/material/styles';
import {
  createNodeHoverRenderer,
  useEdgeReducer,
  useNodeReducer
} from '@heropad/sociogram';
import { blendAlpha } from '~/utils';

export function SociogramSettings() {
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
    size: 3,
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
  }, [setSettings, nodeReducer, edgeReducer, palette]);

  return null;
}
