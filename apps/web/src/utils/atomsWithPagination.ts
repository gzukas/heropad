import { Atom, atom } from 'jotai';
import { loadable, selectAtom, unwrap } from 'jotai/utils';

export interface AtomsWithPaginationOptions<TPage, TNextPageParam> {
  getQueryAtom: (
    nextPageParamAtom: Atom<TNextPageParam | undefined>
  ) => Atom<Promise<TPage>>;
  getNextPageParam: (lastPage?: TPage) => TNextPageParam | undefined;
}

export function atomsWithPagination<TPage, TNextPageParam>({
  getQueryAtom,
  getNextPageParam
}: AtomsWithPaginationOptions<TPage, TNextPageParam>) {
  const nextPageParamAtom = atom<TNextPageParam | undefined>(undefined);
  const queryAtom = getQueryAtom(nextPageParamAtom);
  const pagesAtom = unwrap(
    selectAtom<Promise<TPage>, TPage[]>(queryAtom, (curr, prev = []) => [
      ...prev,
      curr
    ]),
    prev => prev || []
  );
  const _nextPageParamAtom = atom(get =>
    getNextPageParam([...get(pagesAtom)].pop())
  );
  const fetchNextPageAtom = atom(
    get => Boolean(get(_nextPageParamAtom)),
    (get, set) => {
      set(nextPageParamAtom, get(_nextPageParamAtom));
    }
  );
  return [pagesAtom, fetchNextPageAtom, queryAtom] as const;
}
