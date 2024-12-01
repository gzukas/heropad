import { renderHook, act } from '@testing-library/react';
import { atomWithDebounce } from '../atomWithDebounce';
import { useAtom, useAtomValue } from 'jotai';
import { RESET } from 'jotai/utils';

vi.useFakeTimers();

describe('atomWithDebounce', () => {
  const useDebouncedAtomValues = <T>([
    valueAtom,
    debouncedValueAtom
  ]: ReturnType<typeof atomWithDebounce<T>>) => {
    const value = useAtomValue(valueAtom);
    const [debouncedValue, setDebouncedValue] = useAtom(debouncedValueAtom);
    return { value, debouncedValue, setDebouncedValue };
  };

  it('should initialize with the initial value', () => {
    const [valueAtom] = atomWithDebounce('initial');
    const { result } = renderHook(() => useAtomValue(valueAtom));
    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after the specified delay', () => {
    const atom = atomWithDebounce('initial', 500);
    const { result } = renderHook(() => useDebouncedAtomValues(atom));

    act(() => {
      result.current.setDebouncedValue('updated');
    });

    expect(result.current.value).toBe('updated');
    expect(result.current.debouncedValue).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.debouncedValue).toBe('updated');
  });

  it('should reset to initial value on RESET', () => {
    const atom = atomWithDebounce('initial', 500);
    const { result } = renderHook(() => useDebouncedAtomValues(atom));

    act(() => {
      result.current.setDebouncedValue('updated');
      vi.advanceTimersByTime(500);
    });

    expect(result.current.debouncedValue).toBe('updated');

    act(() => {
      result.current.setDebouncedValue(RESET);
    });

    expect(result.current.debouncedValue).toBe('initial');
  });
});
