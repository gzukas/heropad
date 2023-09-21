import { useCallback, useRef, useEffect } from 'react';
import { WritableAtom } from 'jotai';
import { useHydrateAtoms, useAtomCallback } from 'jotai/utils';

type AnyWritableAtom = WritableAtom<unknown, any[], any>;
type AtomTuple<A = AnyWritableAtom, V = unknown> = readonly [A, V];
type InferAtoms<T extends Iterable<AtomTuple>> = {
  [K in keyof T]: T[K] extends AtomTuple<infer A>
    ? A extends AnyWritableAtom
      ? AtomTuple<A, ReturnType<A['read']>>
      : T[K]
    : never;
};

type Options = Parameters<typeof useHydrateAtoms>[1];

export function useHydrateAndSyncAtoms<T extends Iterable<AtomTuple>>(
  values: InferAtoms<T>,
  options?: Options
) {
  useHydrateAtoms(values, options);
  const sync = useAtomCallback(
    useCallback(
      (_get, set) => {
        for (const [a, v] of values) {
          set(a, v);
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
