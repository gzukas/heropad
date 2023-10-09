import { atomWithToggle } from '~/utils';

export const isSearchOpenAtom = atomWithToggle(false);
isSearchOpenAtom.debugLabel = 'isSearchOpenAtom';
