import React, { Suspense } from 'react';
import { Stack, InputBase, Dialog } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLingui } from '@lingui/react';
import { msg } from '@lingui/macro';
import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { isSearchOpenAtom } from '~/atoms/isSearchOpenAtom';
import { searchTermAtom } from '~/atoms/searchTermAtom';
import { debouncedSearchTermAtom } from '~/atoms/searchTermAtom';
import { SearchSuggestions } from './SearchSuggestions';
import { useCloseSearch } from './useCloseSearch';

export function SearchDialog() {
  const { _ } = useLingui();
  const searchTerm = useAtomValue(searchTermAtom);
  const setDebouncedSearchTerm = useSetAtom(debouncedSearchTermAtom);
  const resetDebouncedSearchTerm = useResetAtom(debouncedSearchTermAtom);
  const isSearchOpen = useAtomValue(isSearchOpenAtom);
  const closeSearch = useCloseSearch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearchTerm(event.target.value);
  };

  return (
    <Dialog
      open={isSearchOpen}
      onClose={closeSearch}
      TransitionProps={{ onExited: resetDebouncedSearchTerm }}
      maxWidth="sm"
      disableRestoreFocus
      fullWidth
      sx={{
        '.MuiDialog-container': {
          alignItems: 'flex-start'
        }
      }}
    >
      <Stack
        sx={{ display: 'flex', alignItems: 'center', m: 1 }}
        direction="row"
        spacing={1}
      >
        <SearchIcon />
        <InputBase
          placeholder={_(msg`Search for heroes and awards...`)}
          sx={{ flex: 1 }}
          value={searchTerm}
          onChange={handleInputChange}
          autoFocus
        />
      </Stack>
      <Suspense>
        <SearchSuggestions />
      </Suspense>
    </Dialog>
  );
}
