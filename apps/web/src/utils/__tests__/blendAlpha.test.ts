import { blendAlpha } from '../blendAlpha';

interface BlendAlphaCase<RGB = [number, number, number]> {
  c1: RGB;
  c2: RGB;
  a: number;
  expected: RGB;
}

describe('blendAlpha', () => {
  it.each<BlendAlphaCase>([
    { c1: [0, 0, 0], c2: [255, 255, 255], a: 0, expected: [255, 255, 255] },
    { c1: [0, 0, 0], c2: [255, 255, 255], a: 0.5, expected: [127, 127, 127] },
    { c1: [0, 0, 0], c2: [255, 255, 255], a: 1, expected: [0, 0, 0] },
    { c1: [0, 0, 255], c2: [255, 0, 255], a: 0.25, expected: [191, 0, 255] },
    { c1: [255, 0, 0], c2: [0, 255, 0], a: 0.8, expected: [204, 50, 0] }
  ])(
    'should blend $c1 and $c2 with alpha of $a to $expected',
    ({ c1, c2, a, expected }) => {
      const actualColor = blendAlpha(
        { type: 'rgb', values: c1 },
        { type: 'rgb', values: c2 },
        a
      );

      expect(actualColor.values).toStrictEqual(expected);
    }
  );
});
