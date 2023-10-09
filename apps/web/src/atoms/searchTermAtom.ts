import { atomWithDebounce } from 'base';

export const [searchTermAtom, debouncedSearchTermAtom] = atomWithDebounce(
  '',
  200
);
