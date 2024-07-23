import { styled } from '@mui/material/styles';

type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'right';
type Placement = Vertical | `${Vertical}-${Horizontal}`;

type Positions = Pick<React.CSSProperties, 'top' | 'right' | 'bottom' | 'left'>;

function getPositionStyles(
  placement: Placement,
  spacing: Positions[keyof Positions],
  {
    left = spacing,
    right = spacing,
    top = spacing,
    bottom = spacing
  }: Positions = {}
): React.CSSProperties {
  return {
    ...(placement === 'top' && {
      top,
      left,
      right
    }),
    ...(placement === 'top-left' && {
      top,
      left
    }),
    ...(placement === 'top-right' && {
      top,
      right
    }),
    ...(placement === 'bottom-left' && {
      bottom,
      left
    }),
    ...(placement === 'bottom-right' && {
      bottom,
      right
    })
  };
}

export interface AbsoluteProps {
  placement: Placement;
}

export const Absolute = styled('div', { label: 'Absolute' })<AbsoluteProps>(
  ({ placement }) => ({
    position: 'absolute',
    ...getPositionStyles(placement, 'var(--Absolute-gutters, 0)')
  })
);
