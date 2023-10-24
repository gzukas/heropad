import { Atom, atom } from 'jotai';
import { selectAtom, unwrap } from 'jotai/utils';

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
  const _nextPageParamAtom = atom(get =>
    getNextPageParam([...get(dataPagesAtom)].pop())
  );
  const dataPagesAtom = unwrap(
    selectAtom<Promise<TPage>, TPage[]>(
      getQueryAtom(nextPageParamAtom),
      (curr, prev = []) => [...prev, curr]
    ),
    prev => prev || []
  );
  const fetchNextPageAtom = atom(
    get => Boolean(get(_nextPageParamAtom)),
    (get, set) => {
      set(nextPageParamAtom, get(_nextPageParamAtom));
    }
  );
  return [dataPagesAtom, fetchNextPageAtom] as const;
}
