import { act, render, screen } from '@testing-library/react';
import { atom, createStore } from 'jotai';
import { UseAtomValue } from '../UseAtomValue';

describe('UseAtomValue', () => {
  it('renders the value from the provided atom', () => {
    const testAtom = atom('test');
    render(
      <UseAtomValue
        atom={testAtom}
        render={value => <div data-testid="rendered">{value}</div>}
      />
    );
    expect(screen.getByTestId('rendered')).toHaveTextContent('test');
  });

  it('updates rendering when atom value changes', () => {
    const testAtom = atom(1);
    const store = createStore();

    render(
      <UseAtomValue
        atom={testAtom}
        options={{ store }}
        render={value => <div data-testid="rendered">{value}</div>}
      />
    );
    expect(screen.getByTestId('rendered')).toHaveTextContent('1');

    act(() => {
      store.set(testAtom, prev => prev + 1);
    });

    expect(screen.getByTestId('rendered')).toHaveTextContent('2');
  });
});
