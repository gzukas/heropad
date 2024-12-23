import { blendColor } from '../blendColor';

interface BlendColorCase {
  foreground: string;
  background: string;
  ratio: number;
  expected: string;
}

describe('blendColor', () => {
  it.each`
    foreground   | background   | ratio   | expected
    ${'#000000'} | ${'#FFFFFF'} | ${0}    | ${'rgb(255, 255, 255)'}
    ${'#000000'} | ${'#FFFFFF'} | ${0.5}  | ${'rgb(127, 127, 127)'}
    ${'#000000'} | ${'#FFFFFF'} | ${1}    | ${'rgb(0, 0, 0)'}
    ${'#0000FF'} | ${'#FF00FF'} | ${0.25} | ${'rgb(191, 0, 255)'}
    ${'#FF0000'} | ${'#00FF00'} | ${0.8}  | ${'rgb(204, 50, 0)'}
    ${'#FF0000'} | ${'#00FF00'} | ${-1}   | ${'rgb(0, 255, 0)'}
    ${'#FF0000'} | ${'#00FF00'} | ${2}    | ${'rgb(255, 0, 0)'}
  `(
    'should blend $foreground and $background with a ratio of $ratio to produce $expected',
    ({ foreground, background, ratio, expected }: BlendColorCase) => {
      const actualColor = blendColor(foreground, background, ratio);
      expect(actualColor).toBe(expected);
    }
  );
});
