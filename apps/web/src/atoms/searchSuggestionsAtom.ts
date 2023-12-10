import { DISABLED } from 'jotai-trpc';
import { api } from '~/utils/api';
import { debouncedSearchTermAtom } from './searchTermAtom';

export const searchSuggestionsAtom = api.search.getSuggestions.atomWithQuery(
  get => {
    const query = get(debouncedSearchTermAtom);
    return query ? { query } : DISABLED;
  },
  {
    disabledOutput: []
  }
);
