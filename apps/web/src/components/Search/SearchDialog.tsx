import React, { Suspense } from 'react';
import { Stack, InputBase, Chip, Dialog } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { isSearchOpenAtom } from '~/atoms/isSearchOpenAtom';
import { searchTermAtom } from '~/atoms/searchTermAtom';
import { debouncedSearchTermAtom } from '~/atoms/searchTermAtom';
import { SearchSuggestions } from './SearchSuggestions';
import { useCloseSearch } from './useCloseSearch';

export function SearchDialog() {
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
          sx={{ flex: 1 }}
          value={searchTerm}
          onChange={handleInputChange}
          autoFocus
        />
        <Chip
          size="small"
          label="esc"
          variant="outlined"
          onClick={closeSearch}
        />
      </Stack>
      <Suspense>
        <SearchSuggestions />
      </Suspense>
    </Dialog>
  );
}
