import { useEffect, useRef } from 'react';

export function useDidUpdate(
  fn: React.EffectCallback,
  dependencies?: React.DependencyList
) {
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) {
      return fn();
    }
    mountRef.current = true;
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);
}
