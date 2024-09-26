import { Typography } from '@mui/material';

export type ShortcutProps = React.ComponentPropsWithoutRef<'kbd'>;

export function Shortcut({
  children,
  ...other
}: React.PropsWithChildren<ShortcutProps>) {
  return (
    <Typography
      component="kbd"
      variant="body2"
      sx={{ color: 'text.secondary' }}
      {...other}
    >
      {children}
    </Typography>
  );
}
