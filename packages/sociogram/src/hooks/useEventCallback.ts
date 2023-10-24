import { useCallback } from 'react';
import { useCommitedRef } from 'base';

export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
) {
  const ref = useCommitedRef(fn);
  return useCallback((...args: Args) => ref.current(...args), []);
}
