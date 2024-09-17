import React from 'react';
import { List, ListProps, ListSubheader } from '@mui/material';

export type SearchGroupProps<C extends React.ElementType> = Omit<
  ListProps<C, { component?: C }>,
  'subheader'
> & {
  heading?: React.ReactNode;
};

export function SearchGroup<C extends React.ElementType>(
  props: SearchGroupProps<C>
) {
  const { heading, ...other } = props;
  return (
    <List
      {...(heading && {
        subheader: (
          <ListSubheader
            sx={{
              backgroundColor: 'background.paper',
              backgroundImage: 'var(--Paper-overlay)',
              zIndex: 2
            }}
          >
            {heading}
          </ListSubheader>
        )
      })}
      {...other}
    />
  );
}
