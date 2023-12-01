import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { isSearchOpenAtom } from '~/atoms/isSearchOpenAtom';

export function useCloseSearch() {
  const toggleSearch = useSetAtom(isSearchOpenAtom);
  return useCallback(() => toggleSearch(false), [toggleSearch]);
}
