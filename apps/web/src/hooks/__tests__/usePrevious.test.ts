import { renderHook } from '@testing-library/react';
import { usePrevious } from '../usePrevious';

describe('usePrevious', () => {
  it('should return previous value after each render', () => {
    const { result, rerender } = renderHook(x => usePrevious(x), {
      initialProps: 0
    });

    expect(result.current).toBeUndefined();

    rerender(1);
    expect(result.current).toBe(0);

    rerender(2);
    expect(result.current).toBe(1);

    rerender(3);
    expect(result.current).toBe(2);
  });
});
