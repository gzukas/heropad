import { decomposeColor, recomposeColor } from '@mui/material/styles';

/**
 * Blends two colors based on the specified `alpha` value.
 *
 * It combines a `foreground` color and a `background` color using ratio blending, resulting in a new
 * color that is weighted mix of the two.
 *
 * @param foreground The foreground color
 * @param background The background color
 * @param ratio A number between 0 and 1 representing the blending ratio. `0` uses the background color
 * only, while `1` uses the foreground color only.
 */
export function blendColor(
  foreground: string,
  background: string,
  ratio: number
) {
  const {
    values: [fr, fg, fb],
    type
  } = decomposeColor(foreground);
  const {
    values: [br, bg, bb]
  } = decomposeColor(background);

  const safeRatio = Math.max(0, Math.min(1, ratio));

  const r = Math.floor(safeRatio * fr + (1 - safeRatio) * br);
  const g = Math.floor(safeRatio * fg + (1 - safeRatio) * bg);
  const b = Math.floor(safeRatio * fb + (1 - safeRatio) * bb);

  return recomposeColor({ type, values: [r, g, b] });
}
