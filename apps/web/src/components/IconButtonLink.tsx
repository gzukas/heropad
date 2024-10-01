import React from 'react';
import { createLink, Link, CreateLinkProps } from '@tanstack/react-router';
import { IconButton, IconButtonProps } from '@mui/material';

export const IconButtonLink = createLink(
  React.forwardRef<HTMLAnchorElement, CreateLinkProps & IconButtonProps<'a'>>(
    (props, ref) => {
      return <IconButton {...props} ref={ref} component={Link} />;
    }
  )
);
