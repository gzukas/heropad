import { render, screen } from '@testing-library/react';
import { Absolute, Placement, Positions } from '../Absolute';

describe('Absolute', () => {
  it.each<[Placement, Array<keyof Positions>]>([
    ['top', ['top', 'left', 'right']],
    ['top-left', ['top', 'left']],
    ['bottom-left', ['bottom', 'left']],
    ['bottom-right', ['bottom', 'right']]
  ])(
    'should render with correct styles for %s placement',
    (placement, expectedPositions) => {
      render(
        <Absolute
          placement={placement}
          style={{ '--Absolute-gutters': '24px' } as React.CSSProperties}
          data-testid="absolute"
        />
      );
      expect(screen.getByTestId('absolute')).toHaveStyle({
        position: 'absolute',
        ...Object.fromEntries(expectedPositions.map(pos => [pos, '24px']))
      });
    }
  );
});
