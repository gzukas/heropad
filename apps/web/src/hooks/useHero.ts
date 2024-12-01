import { useAtomValue } from 'jotai';
import { communityGraphAtom } from '~/atoms/communityGraphAtom';

export function useHero(username: string) {
  const communityGraph = useAtomValue(communityGraphAtom);
  return communityGraph.getNodeAttributes(username);
}
