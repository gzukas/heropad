import { useEffect, useMemo } from 'react';
import { useSetSettings } from '@react-sigma/core';
import { useTheme, decomposeColor, recomposeColor } from '@mui/material/styles';
import { createNodeHoverRenderer, useNodeReducer } from '@heropad/sociogram';
import { blendAlpha } from '~/utils';

export function SociogramSettings() {
  const setSettings = useSetSettings();
  const { palette } = useTheme();

  const unfocusedColor = useMemo(
    () =>
      recomposeColor(
        // Because there's no alpha support in sigma's webgl renderer
        blendAlpha(
          decomposeColor(palette.background.default),
          decomposeColor(palette.action.disabledBackground),
          palette.action.focusOpacity
        )
      ),
    [palette]
  );

  const nodeReducer = useNodeReducer({
    unfocusedColor
  });

  useEffect(() => {
    setSettings({
      nodeReducer,
      hoverRenderer: createNodeHoverRenderer({
        hoverBackgroundColor: palette.primary.main,
        labelColor: { color: palette.primary.contrastText }
      }),
      labelColor: {
        color: palette.text.primary
      }
    });
  }, [setSettings, nodeReducer, palette]);

  return null;
}
