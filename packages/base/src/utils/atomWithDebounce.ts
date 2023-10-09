import { atom } from 'jotai';
import { RESET } from 'jotai/utils';

type Timeout = ReturnType<typeof setTimeout>;
type SetStateActionWithReset<T> =
  | T
  | typeof RESET
  | ((prev: T) => T | typeof RESET);

export function atomWithDebounce<T>(initialValue: T, delay = 500) {
  const prevTimeoutAtom = atom<Timeout | undefined>(undefined);
  const _currentValueAtom = atom(initialValue);
  _currentValueAtom.debugPrivate = true;
  const debouncedValueAtom = atom(
    initialValue,
    (get, set, update: SetStateActionWithReset<T>) => {
      clearTimeout(get(prevTimeoutAtom));

      const prevValue = get(_currentValueAtom);
      const nextValue =
        typeof update === 'function'
          ? (update as (prev: T) => T)(prevValue)
          : update;

      set(_currentValueAtom, nextValue === RESET ? initialValue : nextValue);

      if (nextValue === RESET) {
        set(debouncedValueAtom, initialValue);
      } else {
        set(
          prevTimeoutAtom,
          setTimeout(() => set(debouncedValueAtom, nextValue), delay)
        );
      }
    }
  );

  return [atom(get => get(_currentValueAtom)), debouncedValueAtom] as const;
}
