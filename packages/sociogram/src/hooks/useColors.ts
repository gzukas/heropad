import { useMemo } from 'react';
import iwanthue, { ColorSpace } from 'iwanthue';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../atoms';
import { SociogramTheme } from '../types';

const colorSpaceMapping: Record<SociogramTheme, ColorSpace> = {
  dark: 'fancy-dark',
  light: 'fancy-light'
};

export interface UseColorsOptions {
  count: number;
}

export function useColors({ count }: UseColorsOptions) {
  const theme = useAtomValue(themeAtom);
  const colorSpace = colorSpaceMapping[theme];
  return useMemo(
    () =>
      iwanthue(count, {
        seed: '@heropad/sociogram',
        colorSpace
      }),
    [count, colorSpace]
  );
}
