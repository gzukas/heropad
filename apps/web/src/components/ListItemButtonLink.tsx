import React from 'react';
import { createLink, Link, CreateLinkProps } from '@tanstack/react-router';
import { ListItemButton, ListItemButtonProps } from '@mui/material';

export const ListItemButtonLink = createLink(
  React.forwardRef<
    HTMLAnchorElement,
    CreateLinkProps & ListItemButtonProps<'a'>
  >((props, ref) => {
    return <ListItemButton {...props} ref={ref} component={Link} />;
  })
);
