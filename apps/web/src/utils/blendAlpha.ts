import { ColorObject } from '@mui/material/styles';

export function blendAlpha(
  { values: [r0, g0, b0] }: ColorObject,
  { values: [r1, g1, b1] }: ColorObject,
  alpha: number
): ColorObject {
  const r = Math.floor(alpha * r0 + (1 - alpha) * r1);
  const g = Math.floor(alpha * g0 + (1 - alpha) * g1);
  const b = Math.floor(alpha * b0 + (1 - alpha) * b1);
  return {
    type: 'rgb',
    values: [r, g, b]
  };
}
