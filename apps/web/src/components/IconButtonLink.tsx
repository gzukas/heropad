import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { RouterLinkComponent } from '~/types';

export const IconButtonLink: RouterLinkComponent<IconButtonProps> =
  React.forwardRef<HTMLElement, IconButtonProps>(
    function IconButtonLink(props, ref) {
      return <IconButton ref={ref} component={Link} {...props} />;
    }
  );
