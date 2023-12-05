import { Paper, styled, Stack, ButtonBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Trans } from '@lingui/macro';
import { useSetAtom } from 'jotai';
import { isSearchOpenAtom } from '~/atoms/isSearchOpenAtom';

const Placeholder = styled('span')(({ theme }) => ({
  color: 'currentcolor',
  opacity:
    theme.vars?.opacity.inputPlaceholder ?? theme.palette.mode === 'light'
      ? 0.42
      : 0.5,
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
      sx={{
        flex: 1,
        width: 296,
        justifyContent: 'left',
        font: 'inherit',
        p: 1
      }}
      component={ButtonBase}
      onClick={handleClick}
      elevation={2}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <SearchIcon />
        <Placeholder>
          <Trans>Search</Trans>
        </Placeholder>
      </Stack>
    </Paper>
  );
}
