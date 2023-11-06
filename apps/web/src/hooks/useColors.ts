import { useMemo } from 'react';
import iwanthue, { ColorSpace, IWantHueSettings } from 'iwanthue';
import { useAtomValue } from 'jotai';
import { SociogramTheme } from '../types';
import { useColorScheme } from '@mui/material';

const colorSpaceMapping: Record<SociogramTheme, ColorSpace> = {
  dark: 'fancy-dark',
  light: 'fancy-light'
};

export type UseColorsOptions = IWantHueSettings;

export function useColors(count: number, options?: UseColorsOptions) {
  const { colorScheme } = useColorScheme();
  const colorSpace = colorSpaceMapping[colorScheme];
  return useMemo(
    () =>
      count === 0
        ? []
        : iwanthue(count, {
            seed: '@heropad/sociogram',
            colorSpace,
            ...options
          }),
    [count, colorSpace]
  );
}
