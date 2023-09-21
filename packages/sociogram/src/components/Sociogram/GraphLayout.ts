import { useEffect } from 'react';
import { LayoutWorkerHook } from '@react-sigma/layout-core';
import Graph from 'graphology';
import { useAtomValue } from 'jotai';
import { communityGraphAtom } from '../../atoms';

export interface GraphLayoutProps<T> {
  layout: LayoutWorkerHook<T>;
  getSettings: (graph: Graph) => T;
}

export function GraphLayout<T>(props: GraphLayoutProps<T>) {
  const { layout: useLayout, getSettings } = props;
  const communityGraph = useAtomValue(communityGraphAtom);
  const { start, kill } = useLayout(getSettings(communityGraph));

  useEffect(() => {
    start();
    return () => kill();
  }, [start, kill]);

  return null;
}
