import { groupBy } from '../groupBy';

describe('groupBy', () => {
  const array = [6.6, 1.1, 5.5];

  it('should group by `iteratee` function', () => {
    const actual = groupBy(array, Math.floor);
    expect(actual).toEqual(
      new Map([
        [6, [6.6]],
        [1, [1.1]],
        [5, [5.5]]
      ])
    );
  });
});
