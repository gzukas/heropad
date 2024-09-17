import { Paper, styled, Stack, ButtonBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Trans } from '@lingui/macro';
import { useSetAtom } from 'jotai';
import { isSearchOpenAtom } from '~/atoms/isSearchOpenAtom';

const Placeholder = styled('div')(({ theme }) => ({
  color: 'currentcolor',
  opacity: theme.vars.opacity.inputPlaceholder,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter
  })
}));

export function SearchButton() {
  const toggleSearch = useSetAtom(isSearchOpenAtom);

  const handleClick = () => {
    toggleSearch(true);
  };

  return (
    <Paper
      component={ButtonBase}
      onClick={handleClick}
      elevation={2}
      sx={{
        width: 296,
        justifyContent: 'left',
        font: 'inherit',
        p: 1
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <SearchIcon sx={{ color: 'action.active' }} />
        <Placeholder sx={{ flex: 1 }}>
          <Trans>Search</Trans>
        </Placeholder>
      </Stack>
    </Paper>
  );
}
