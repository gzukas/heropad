import { useCallback, useRef, useEffect } from 'react';
import { WritableAtom } from 'jotai';
import { useHydrateAtoms, useAtomCallback } from 'jotai/utils';

type AnyWritableAtom = WritableAtom<unknown, never[], unknown>;
type InferAtomTuples<T> = {
  [K in keyof T]: T[K] extends readonly [infer A, unknown]
    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
      A extends WritableAtom<unknown, infer Args, infer _Result>
      ? readonly [A, Args[0]]
      : T[K]
    : never;
};

type Options = Parameters<typeof useHydrateAtoms>[1];

export function useHydrateAndSyncAtoms<
  T extends Iterable<readonly [AnyWritableAtom, unknown]>
>(values: InferAtomTuples<T>, options?: Options) {
  useHydrateAtoms(values, options);
  const sync = useAtomCallback(
    useCallback(
      (_get, set) => {
        for (const [a, v] of values) {
          set(a, v as never);
        }
      },
      [values]
    ),
    options
  );
  const isInitial = useRef(true);
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
    } else {
      sync();
    }
  }, [sync]);
}
