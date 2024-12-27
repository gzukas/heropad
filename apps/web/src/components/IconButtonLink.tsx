import React from 'react';
import { createLink } from '@tanstack/react-router';
import { IconButton, IconButtonProps } from '@mui/material';

export const IconButtonLink = createLink(
  React.forwardRef<HTMLAnchorElement, Omit<IconButtonProps<'a'>, 'ref'>>(
    (props, ref) => <IconButton component="a" ref={ref} {...props} />
  )
);
