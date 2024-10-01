import React from 'react';
import { createLink, Link, CreateLinkProps } from '@tanstack/react-router';
import { Tab, TabProps } from '@mui/material';

export const TabLink = createLink(
  React.forwardRef<HTMLAnchorElement, CreateLinkProps & TabProps<'a'>>(
    (props, ref) => {
      return <Tab {...props} ref={ref} component={Link} />;
    }
  )
);
