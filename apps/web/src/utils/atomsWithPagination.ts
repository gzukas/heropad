import { Atom, WritableAtom, atom } from 'jotai';
import { selectAtom, unwrap, loadable } from 'jotai/utils';
import { Loadable } from 'jotai/vanilla/utils/loadable';

export interface AtomsWithPaginationOptions<TPage, TNextPageParam> {
  getQueryAtom: (
    nextPageParamAtom: Atom<TNextPageParam | undefined>
  ) => Atom<Promise<TPage>>;
  getNextPageParam: (lastPage?: TPage) => TNextPageParam | undefined;
}

export interface AtomsWithPaginationResult<TPage> {
  pagesAtom: Atom<TPage[]>;
  fetchNextPageAtom: WritableAtom<boolean, [], void>;
  loadableQueryAtom: Atom<Loadable<Promise<TPage>>>;
}

export function atomsWithPagination<TPage, TNextPageParam>({
  getQueryAtom,
  getNextPageParam
}: AtomsWithPaginationOptions<
  TPage,
  TNextPageParam
>): AtomsWithPaginationResult<TPage> {
  const nextPageParamAtom = atom<TNextPageParam | undefined>(undefined);
  const queryAtom = getQueryAtom(nextPageParamAtom);
  const pagesAtom = selectAtom<TPage | undefined, TPage[]>(
    unwrap(queryAtom),
    (curr, prev = []) => (curr ? [...prev, curr] : prev)
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
  const loadableQueryAtom = loadable(queryAtom);
  return { pagesAtom, fetchNextPageAtom, loadableQueryAtom };
}
