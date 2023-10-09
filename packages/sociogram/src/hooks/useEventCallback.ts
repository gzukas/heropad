import { useCallback, useLayoutEffect, useRef } from 'react';

export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
) {
  const ref = useRef(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: Args) => ref.current(...args), []);
}
