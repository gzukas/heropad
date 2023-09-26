import { styled } from '@mui/material/styles';

type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'right';
type Placement = Vertical | `${Vertical}-${Horizontal}`;

export interface AbsoluteProps {
  placement: Placement;
  gutters?: number;
}

export const Absolute = styled('div', { label: 'Absolute' })<AbsoluteProps>(
  ({ placement, gutters = 0 }) => ({
    position: 'absolute',
    ...(placement === 'top' && {
      top: gutters,
      left: gutters,
      right: gutters
    }),
    ...(placement === 'top-left' && {
      top: gutters,
      left: gutters
    }),
    ...(placement === 'top-right' && {
      top: gutters,
      right: gutters
    }),
    ...(placement === 'bottom-left' && {
      bottom: gutters,
      left: gutters
    }),
    ...(placement === 'bottom-right' && {
      bottom: gutters,
      right: gutters
    })
  })
);
