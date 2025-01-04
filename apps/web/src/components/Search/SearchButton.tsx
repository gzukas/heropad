import { Trans } from '@lingui/react/macro';
import { Paper, styled, ButtonBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSetAtom } from 'jotai';
import { isSearchOpenAtom } from '~/atoms/isSearchOpenAtom';
import { Shortcut } from '../Shortcut';
import { KeyModifier, useHotkey } from '~/hooks/useHotkey';

const Placeholder = styled('div')(({ theme }) => ({
  color: 'currentcolor',
  opacity: theme.vars.opacity.inputPlaceholder,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter
  })
}));

export function SearchButton() {
  const toggleSearch = useSetAtom(isSearchOpenAtom);
  const macOS = window.navigator.userAgent.toLowerCase().includes('mac');

  useHotkey('K', KeyModifier.CTRL, () => {
    toggleSearch();
  });

  const handleClick = () => {
    toggleSearch(true);
  };

  return (
    <Paper
      component={ButtonBase}
      onClick={handleClick}
      elevation={2}
      sx={{
        flex: 1,
        width: 296,
        textAlign: 'left',
        font: 'inherit',
        p: 1,
        px: 1.75,
        gap: 1
      }}
    >
      <SearchIcon sx={{ color: 'action.active' }} />
      <Placeholder sx={{ flexGrow: 1 }}>
        <Trans>Search</Trans>
      </Placeholder>
      <Shortcut aria-hidden="true">{macOS ? '⌘' : 'Ctrl+'}K</Shortcut>
    </Paper>
  );
}
