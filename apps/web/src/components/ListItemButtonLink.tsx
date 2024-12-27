import React from 'react';
import { createLink } from '@tanstack/react-router';
import { ListItemButton, ListItemButtonProps } from '@mui/material';

export const ListItemButtonLink = createLink(
  React.forwardRef<HTMLAnchorElement, Omit<ListItemButtonProps<'a'>, 'href'>>(
    (props, ref) => <ListItemButton component="a" ref={ref} {...props} />
  )
);
