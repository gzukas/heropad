import { styled } from '@mui/material/styles';

export const Layout = styled('div', { label: 'Content' })<{
  shift?: number;
}>(({ theme, shift }) => ({
  position: 'relative',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(shift && {
    [theme.breakpoints.up('md')]: {
      marginRight: shift,
      transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  })
}));
