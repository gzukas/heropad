import React, { Suspense } from 'react';
import { Stack, InputBase, Chip, Dialog } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import {
  isSearchOpenAtom,
  searchTermAtom,
  debouncedSearchTermAtom
} from '~/atoms';
import { SearchSuggestions } from './SearchSuggestions';

export function SearchDialog() {
  const searchTerm = useAtomValue(searchTermAtom);
  const setDebouncedSearchTerm = useSetAtom(debouncedSearchTermAtom);
  const resetDebouncedSearchTerm = useResetAtom(debouncedSearchTermAtom);
  const [isSearchOpen, toggleSearch] = useAtom(isSearchOpenAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearchTerm(event.target.value);
  };

  const handleClose = () => {
    toggleSearch(false);
  };

  return (
    <Dialog
      open={isSearchOpen}
      onClose={handleClose}
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
          onClick={handleClose}
        />
      </Stack>
      <Suspense>
        <SearchSuggestions />
      </Suspense>
    </Dialog>
  );
}
