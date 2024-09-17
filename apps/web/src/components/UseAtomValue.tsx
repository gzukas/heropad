import { Atom, useAtomValue } from 'jotai';

export interface UseAtomValueProps<TValue> {
  atom: Atom<TValue>;
  render: (value: Awaited<TValue>) => React.ReactNode;
}

export function UseAtomValue<TValue>({
  atom,
  render
}: UseAtomValueProps<TValue>) {
  return render(useAtomValue(atom));
}
