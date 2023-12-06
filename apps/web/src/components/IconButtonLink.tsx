import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { RouterLinkComponent } from '~/types';

export const IconButtonLink: RouterLinkComponent<typeof IconButton> =
  React.forwardRef<HTMLElement, IconButtonProps>(
    function IconButtonLink(props, ref) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <IconButton ref={ref} {...props} component={Link as any} />;
    }
  );
