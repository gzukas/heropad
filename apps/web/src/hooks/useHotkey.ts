import { useEffect } from 'react';
import { useEventCallback } from './useEventCallback';

export const KeyModifier = {
  ALT: 1,
  CTRL: 2,
  META: 4,
  SHIFT: 8
} as const;

type KeyModifiers = number;
type KeyCombination = string | { key: string; modifiers?: KeyModifiers };
type KeyListener = (event: KeyboardEvent) => void;

export function useHotkey(
  key: KeyCombination | KeyCombination[],
  listener: KeyListener
) {
  const handleKeydown = useEventCallback((event: KeyboardEvent) => {
    const eventModifiers =
      (event.ctrlKey ? KeyModifier.CTRL : 0) |
      (event.shiftKey ? KeyModifier.SHIFT : 0) |
      (event.altKey ? KeyModifier.ALT : 0) |
      (event.metaKey ? KeyModifier.META : 0);

    const keyCombinations = Array.isArray(key) ? key : [key];

    for (const combination of keyCombinations) {
      const { key, modifiers = 0 } =
        typeof combination === 'string' ? { key: combination } : combination;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        eventModifiers === modifiers
      ) {
        event.preventDefault();
        console.log('hello');
        listener(event);
        break;
      }
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);
}
