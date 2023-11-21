import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { isSearchOpenAtom } from '~/atoms';

export function useCloseSearch() {
  const toggleSearch = useSetAtom(isSearchOpenAtom);
  return useCallback(() => toggleSearch(false), [toggleSearch]);
}
