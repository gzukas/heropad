import { atom, useAtom, useAtomValue } from 'jotai';
import {
  atomsWithPagination,
  AtomsWithPaginationResult
} from '../atomsWithPagination';
import { renderHook, waitFor, act } from '@testing-library/react';

type Page = [data: string, next?: number];
const pages: Array<Page> = [['a', 1], ['b', 2], ['c']];

describe('atomsWithPagination', () => {
  let atoms: AtomsWithPaginationResult<Page>;

  const usePaginationAtomValues = (atoms: AtomsWithPaginationResult<Page>) => {
    const pages = useAtomValue(atoms.pagesAtom);
    const [hasNextPage, fetchNextPage] = useAtom(atoms.fetchNextPageAtom);
    const loadableQuery = useAtomValue(atoms.loadableQueryAtom);
    return { pages, hasNextPage, fetchNextPage, loadableQuery };
  };

  const fetchNextPage = async (result: {
    current: ReturnType<typeof usePaginationAtomValues>;
  }) => {
    act(result.current.fetchNextPage);
    await waitFor(() => result.current.loadableQuery.state === 'hasData');
    return result.current.pages;
  };

  beforeEach(() => {
    atoms = atomsWithPagination<Page, number>({
      getQueryAtom: nextPageAtom =>
        atom(async get => {
          const nextPage = get(nextPageAtom) ?? 0;
          return Promise.resolve(pages[nextPage]);
        }),
      getNextPageParam: lastPage => lastPage?.[1]
    });
  });

  it('should fetch next page when triggered', async () => {
    const { result } = renderHook(() => usePaginationAtomValues(atoms));
    expect(result.current.pages).toHaveLength(0);

    const [p1, p2, p3] = pages;

    expect(await fetchNextPage(result)).toStrictEqual([p1]);
    expect(result.current.hasNextPage).toBe(true);
    expect(await fetchNextPage(result)).toStrictEqual([p1, p2]);
    expect(result.current.hasNextPage).toBe(true);
    expect(await fetchNextPage(result)).toStrictEqual([p1, p2, p3]);
    expect(result.current.hasNextPage).toBe(false);
  });
});
