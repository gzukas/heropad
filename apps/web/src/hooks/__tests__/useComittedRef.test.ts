import { vi } from 'vitest';
import { useEffect } from 'react';
import { renderHook } from '@testing-library/react';
import { useCommittedRef } from '../useCommittedRef';

describe('useCommittedRef', () => {
  it('should use latest value', () => {
    const fnA = vi.fn();
    const fnB = vi.fn();

    const { rerender } = renderHook(
      fn => {
        const fnRef = useCommittedRef(fn);
        useEffect(() => {
          fnRef.current();
        });
      },
      { initialProps: fnA }
    );

    rerender(fnB);
    expect(fnA).toHaveBeenCalledOnce();
    expect(fnB).toHaveBeenCalledOnce();
  });
});
