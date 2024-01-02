import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDidUpdate } from '../useDidUpdate';

describe('useDidUpdate', () => {
  it('should call `fn` when `dependencies` change', () => {
    const fn = vi.fn();
    const { rerender } = renderHook(dep => useDidUpdate(fn, [dep]), {
      initialProps: ''
    });
    expect(fn).not.toHaveBeenCalled();
    rerender('foo');
    expect(fn).toHaveBeenCalled();
  });
});
