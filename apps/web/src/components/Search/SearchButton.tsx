import { Paper, styled, Stack, ButtonBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { useSetAtom } from 'jotai';
import { isSearchOpenAtom } from '~/atoms';

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
  const { i18n } = useLingui();
  const toggleSearch = useSetAtom(isSearchOpenAtom);

  const handleClick = () => {
    toggleSearch(true);
  };

  return (
    <Paper
      sx={{
        flex: 1,
        minWidth: 296,
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
        <Placeholder>{t(i18n)`Search`}</Placeholder>
      </Stack>
    </Paper>
  );
}
