import { Atom, useAtomValue } from 'jotai';

export interface UseAtomValueProps<TValue> {
  atom: Atom<TValue>;
  children: (atom: Awaited<TValue>) => React.ReactNode;
}

export function UseAtomValue<TValue>(props: UseAtomValueProps<TValue>) {
  const { atom, children } = props;
  const atomValue = useAtomValue(atom);
  return children(atomValue);
}
