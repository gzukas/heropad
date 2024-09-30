import userEvent, { UserEvent } from '@testing-library/user-event';
import { renderHook } from '~/testing/utils';
import { KeyModifier, useHotkey } from '../useHotkey';

describe('useHotkey', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should trigger listener on specified key press without modifiers', async () => {
    const listener = vi.fn();

    renderHook(() => useHotkey('a', listener));

    await user.keyboard('b');
    expect(listener).not.toHaveBeenCalled();

    await user.keyboard('a');
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining<Partial<KeyboardEvent>>({
        key: 'a',
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        metaKey: false
      })
    );
  });

  it('should invoke listener on key press with all modifiers', async () => {
    const listener = vi.fn();

    renderHook(() =>
      useHotkey(
        'a',
        KeyModifier.ALT |
          KeyModifier.CTRL |
          KeyModifier.META |
          KeyModifier.SHIFT,
        listener
      )
    );

    await user.keyboard('{Alt>}{Control>}{Meta>}a');
    expect(listener).not.toHaveBeenCalled();

    await user.keyboard('{Alt>}{Control>}{Meta>}{Shift>}a');
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining<Partial<KeyboardEvent>>({
        key: 'a',
        altKey: true,
        ctrlKey: true,
        shiftKey: true,
        metaKey: true
      })
    );
  });
});
