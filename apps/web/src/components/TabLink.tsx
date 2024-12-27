import React from 'react';
import { createLink } from '@tanstack/react-router';
import { Tab, TabProps } from '@mui/material';

export const TabLink = createLink(
  React.forwardRef<HTMLAnchorElement, Omit<TabProps<'a'>, 'href'>>(
    (props, ref) => <Tab component="a" ref={ref} {...props} />
  )
);
