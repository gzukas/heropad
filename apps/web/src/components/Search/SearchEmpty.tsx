import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { useAtomValue } from 'jotai';
import { debouncedSearchTermAtom } from '~/atoms/searchTermAtom';
import { searchSuggestionsByKindAtom } from '~/atoms/searchSuggestionsByKindAtom';

export function SearchEmpty({ children }: React.PropsWithChildren) {
  const debouncedSearchTerm = useAtomValue(debouncedSearchTermAtom);
  const searchSuggestionsByKind = useAtomValue(searchSuggestionsByKindAtom);

  return (
    !searchSuggestionsByKind.size &&
    debouncedSearchTerm && (
      <ListItem>
        <ListItemText
          secondary={children}
          secondaryTypographyProps={{ align: 'center' }}
        />
      </ListItem>
    )
  );
}
