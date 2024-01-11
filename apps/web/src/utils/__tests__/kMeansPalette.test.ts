import { kMeansPalette } from '../kMeansPalette';

describe('kMeansPalette', () => {
  it('should provide an equal number of dark and light colors', () => {
    const { dark, light } = kMeansPalette;
    expect(dark).toHaveLength(light.length);
  });
});
