import { Atom, useAtomValue } from 'jotai';

type Options = Parameters<typeof useAtomValue>[1];

export interface UseAtomValueProps<TValue> {
  atom: Atom<TValue>;
  options?: Options;
  render: (value: Awaited<TValue>) => React.ReactNode;
}

export function UseAtomValue<TValue>({
  atom,
  options,
  render
}: UseAtomValueProps<TValue>) {
  return render(useAtomValue(atom, options));
}
