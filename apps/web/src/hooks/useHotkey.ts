import { useEffect } from 'react';
import { useEventCallback } from './useEventCallback';

export const KeyModifier = {
  ALT: 1,
  CTRL: 2,
  META: 4,
  SHIFT: 8
} as const;

type KeyModifiers = number;
type ListenerFn = (event: KeyboardEvent) => void;

export function useHotkey(
  key: string,
  modifiersOrListener: KeyModifiers | ListenerFn,
  listenerMaybe?: ListenerFn
) {
  const handleKeydown = useEventCallback((event: KeyboardEvent) => {
    const [modifiers, listener] =
      typeof modifiersOrListener === 'number'
        ? [modifiersOrListener, listenerMaybe!]
        : [0, modifiersOrListener];

    const eventModifiers =
      (event.ctrlKey ? KeyModifier.CTRL : 0) |
      (event.shiftKey ? KeyModifier.SHIFT : 0) |
      (event.altKey ? KeyModifier.ALT : 0) |
      (event.metaKey ? KeyModifier.META : 0);

    if (
      event.key.toLowerCase() === key.toLowerCase() &&
      eventModifiers === modifiers
    ) {
      event.preventDefault();
      listener(event);
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);
}
