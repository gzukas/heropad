import { ColorObject } from '@mui/material/styles';

export function blendAlpha(
  { values: [r0, g0, b0] }: ColorObject,
  { values: [r1, g1, b1] }: ColorObject,
  alpha: number
): ColorObject {
  const r = (1 - alpha) * r0 + alpha * r1;
  const g = (1 - alpha) * g0 + alpha * g1;
  const b = (1 - alpha) * b0 + alpha * b1;
  return { type: 'rgb', values: [r, g, b] };
}
