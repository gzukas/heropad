import { styled } from '@mui/material/styles';

type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'right';

type Position = `${Vertical}${Capitalize<Horizontal>}`;

export interface AbsoluteProps {
  position: Position;
  gutters?: number;
}

export const Absolute = styled('div', { label: 'Absolute' })<AbsoluteProps>(
  ({ position, gutters = 0 }) => ({
    position: 'absolute',
    ...(position === 'topLeft' && {
      top: gutters,
      left: gutters
    }),
    ...(position === 'topRight' && {
      top: gutters,
      right: gutters
    }),
    ...(position === 'bottomLeft' && {
      bottom: gutters,
      left: gutters
    }),
    ...(position === 'bottomRight' && {
      bottom: gutters,
      right: gutters
    })
  })
);
