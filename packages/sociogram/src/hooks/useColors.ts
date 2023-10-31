import { useMemo } from 'react';
import iwanthue, { ColorSpace, IWantHueSettings } from 'iwanthue';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../atoms';
import { SociogramTheme } from '../types';

const colorSpaceMapping: Record<SociogramTheme, ColorSpace> = {
  dark: 'fancy-dark',
  light: 'fancy-light'
};

export type UseColorsOptions = IWantHueSettings;

export function useColors(count: number, options?: UseColorsOptions) {
  const theme = useAtomValue(themeAtom);
  const colorSpace = colorSpaceMapping[theme];
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
