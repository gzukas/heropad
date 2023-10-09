import { Atom, atom } from 'jotai';
import { selectAtom, unwrap } from 'jotai/utils';

export function atomsWithPagination<T, TNextPageParam>(
  getQueryAtom: (
    nextPageParamAtom: Atom<TNextPageParam | undefined>
  ) => Atom<Promise<T>>,
  getNextPageParam: (lastPage?: T) => TNextPageParam | undefined
) {
  const nextPageParamAtom = atom<TNextPageParam | undefined>(undefined);
  const dataPagesAtom = unwrap(
    selectAtom(
      getQueryAtom(nextPageParamAtom),
      (curr, prev: Array<NonNullable<T>> = []) =>
        [...prev, curr].filter(Boolean)
    ),
    prev => prev || []
  );

  const lastDataPageAtom = atom(get => [...get(dataPagesAtom)].pop());
  const fetchNextPageAtom = atom(
    get => Boolean(getNextPageParam(get(lastDataPageAtom))),
    (get, set) => {
      set(nextPageParamAtom, getNextPageParam(get(lastDataPageAtom)));
    }
  );

  return [dataPagesAtom, fetchNextPageAtom] as const;
}
