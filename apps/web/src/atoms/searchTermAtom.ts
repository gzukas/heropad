import { atomWithDebounce } from '~/utils/atomWithDebounce';

export const [searchTermAtom, debouncedSearchTermAtom] = atomWithDebounce(
  '',
  200
);
