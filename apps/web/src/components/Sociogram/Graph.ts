import { useEffect } from 'react';
import { useLoadGraph } from '@react-sigma/core';
import { useAtomValue } from 'jotai';
import { communityGraphAtom } from '~/atoms/communityGraphAtom';

export function Graph() {
  const communityGraph = useAtomValue(communityGraphAtom);
  const loadGraph = useLoadGraph();

  useEffect(() => {
    loadGraph(communityGraph);
  }, [communityGraph]);

  return null;
}
