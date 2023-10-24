import { atomWithDebounce } from '@heropad/base';

export const [searchTermAtom, debouncedSearchTermAtom] = atomWithDebounce(
  '',
  200
);
