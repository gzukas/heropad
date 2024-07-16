import { renderHook } from '@testing-library/react';
import { useEventCallback } from '../useEventCallback';
import { useEffect } from 'react';

describe('useEventCallback', () => {
  it('should be invokable with most recent prop value', () => {
    const fn = vi.fn();
    const { rerender } = renderHook(
      x => {
        const callback = useEventCallback(y => fn(y));
        useEffect(() => {
          callback(x);
        }, [callback, x]);
      },
      { initialProps: 0 }
    );

    expect(fn).toHaveBeenCalledWith(0);
    rerender(1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});
