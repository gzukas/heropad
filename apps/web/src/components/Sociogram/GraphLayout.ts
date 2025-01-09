import { useEffect } from 'react';
import FA2Layout from 'graphology-layout-forceatlas2/worker';
import { inferSettings } from 'graphology-layout-forceatlas2';
import { useAtomValue } from 'jotai';
import { sigmaAtom } from '~/atoms/sigmaAtom';
import { communityGraphAtom } from '~/atoms/communityGraphAtom';

export function GraphLayout() {
  const sigma = useAtomValue(sigmaAtom);
  const communityGraph = useAtomValue(communityGraphAtom);

  useEffect(() => {
    if (!sigma) {
      return;
    }
    const layout = new FA2Layout(sigma.getGraph(), {
      settings: inferSettings(communityGraph)
    });
    layout.start();
    return () => layout.kill();
  }, [sigma, communityGraph]);

  return null;
}
