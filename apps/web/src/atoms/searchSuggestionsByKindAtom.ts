import { atom } from 'jotai';
import { groupBy } from '~/utils/groupBy';
import { searchSuggestionsAtom } from './searchSuggestionsAtom';

export const searchSuggestionsByKindAtom = atom(async get => {
  const searchSuggestions = await get(searchSuggestionsAtom);
  return [
    ...groupBy(searchSuggestions, suggestion => suggestion.kind).entries()
  ];
});
