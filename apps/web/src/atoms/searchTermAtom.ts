import { atomWithDebounce } from 'base';

export const [searchTermAtom, debouncedSearchTermAtom] = atomWithDebounce(
  '',
  200
);

searchTermAtom.debugLabel = 'searchTermAtom';
debouncedSearchTermAtom.debugLabel = 'debouncedSearchTermAtom';
