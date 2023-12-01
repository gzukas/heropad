import { ExtractAtomValue } from 'jotai';
import { DISABLED } from 'jotai-trpc';
import { api } from '~/utils/api';
import { Extract } from '~/types';
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

export type SearchSuggestion = Extract<
  Awaited<ExtractAtomValue<typeof searchSuggestionsAtom>>
>;
