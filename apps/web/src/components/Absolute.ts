import { styled } from '@mui/material/styles';

type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'right';

export type Placement = Vertical | `${Vertical}-${Horizontal}`;
export type Positions = Pick<
  React.CSSProperties,
  'top' | 'right' | 'bottom' | 'left'
>;

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
  switch (placement) {
    case 'top':
      return { top, left, right };
    case 'top-left':
      return { top, left };
    case 'top-right':
      return { top, right };
    case 'bottom-left':
      return { bottom, left };
    case 'bottom-right':
      return { bottom, right };
    default:
      return {};
  }
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
