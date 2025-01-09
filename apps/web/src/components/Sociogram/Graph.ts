import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { communityGraphAtom } from '~/atoms/communityGraphAtom';
import { sigmaAtom } from '~/atoms/sigmaAtom';

export function Graph() {
  const sigma = useAtomValue(sigmaAtom);
  const communityGraph = useAtomValue(communityGraphAtom);

  useEffect(() => {
    if (sigma) {
      sigma.getGraph().clear();
      sigma.getGraph().import(communityGraph);
      sigma.refresh();
    }
  }, [sigma, communityGraph]);

  return null;
}
