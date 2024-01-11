import { act, renderHook } from '@testing-library/react';
import { useAtom } from 'jotai';
import { atomWithToggle } from '../atomWithToggle';

describe('atomWithToggle', () => {
  let isOpenAtom: ReturnType<typeof atomWithToggle>;

  beforeEach(() => {
    isOpenAtom = atomWithToggle(true);
  });

  it('should return an atom with initial value', () => {
    const { result } = renderHook(() => useAtom(isOpenAtom));
    expect(result.current[0]).toBe(true);
  });

  it('should return an atom that can toggle its value', () => {
    const { result } = renderHook(() => useAtom(isOpenAtom));
    const toggleOpen = (next?: boolean) => {
      const [, toggle] = result.current;
      toggle(next);
    };

    act(toggleOpen);
    expect(result.current[0]).toBe(false);
    act(toggleOpen);
    expect(result.current[0]).toBe(true);
    act(toggleOpen);
    expect(result.current[0]).toBe(false);
  });

  it('should return an atom supporting a forced value', () => {
    const { result } = renderHook(() => useAtom(isOpenAtom));
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
  });
});
