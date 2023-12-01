import { useEffect } from 'react';
import type { LayoutWorkerHook } from '@react-sigma/layout-core';

export interface GraphLayoutProps<T> {
  layout: LayoutWorkerHook<T>;
  settings: T;
}

export function GraphLayout<T>(props: GraphLayoutProps<T>) {
  const { layout: useLayout, settings } = props;
  const { start, kill } = useLayout(settings);

  useEffect(() => {
    start();
    return () => kill();
  }, [start, kill]);

  return null;
}
