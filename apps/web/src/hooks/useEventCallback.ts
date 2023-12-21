import { useCallback } from 'react';
import { useCommittedRef } from '~/hooks/useCommittedRef';

export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
) {
  const ref = useCommittedRef(fn);
  return useCallback((...args: Args) => ref.current(...args), []);
}
