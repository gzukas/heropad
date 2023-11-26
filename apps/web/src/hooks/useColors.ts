import { useMemo } from 'react';
import iwanthue, { ColorSpace, IWantHueSettings } from 'iwanthue';
import { useColorScheme, SupportedColorScheme } from '@mui/material';

const colorSpaceMapping: Record<SupportedColorScheme, ColorSpace> = {
  dark: 'fancy-dark',
  light: 'fancy-light'
};

export type UseColorsOptions = IWantHueSettings;

export function useColors(count: number, options?: UseColorsOptions) {
  const { colorScheme = 'dark' } = useColorScheme();
  const colorSpace = colorSpaceMapping[colorScheme];
  return useMemo(
    () =>
      count === 0
        ? []
        : iwanthue(count, {
            seed: 'use-colors',
            colorSpace,
            ...options
          }),
    [count, colorSpace]
  );
}
