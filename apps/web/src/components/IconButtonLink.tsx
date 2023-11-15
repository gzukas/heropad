import { IconButton, IconButtonProps } from '@mui/material';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { RouterLinkComponent } from '~/types';

export const IconButtonLink: RouterLinkComponent<typeof IconButton> =
  React.forwardRef<HTMLElement, IconButtonProps>((props, ref) => (
    <IconButton ref={ref} {...props} component={Link as any} />
  ));
