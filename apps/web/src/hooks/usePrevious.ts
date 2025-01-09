import { useEffect, useRef } from 'react';

/**
 * A hook to return the previous value of a given `value`.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
