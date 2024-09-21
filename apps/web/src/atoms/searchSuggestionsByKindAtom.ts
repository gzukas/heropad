import { atom } from 'jotai';
import { searchSuggestionsAtom } from './searchSuggestionsAtom';

export const searchSuggestionsByKindAtom = atom(async get => {
  const searchSuggestions = await get(searchSuggestionsAtom);
  return Map.groupBy(searchSuggestions, suggestion => suggestion.kind);
});
