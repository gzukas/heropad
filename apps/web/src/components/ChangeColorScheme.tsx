import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

export function ChangeColorScheme() {
  const { _ } = useLingui();
  const { mode, setMode } = useColorScheme();

  const handleClick = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip
      title={
        mode === 'dark' ? _(msg`Turn on the light`) : _(msg`Turn off the light`)
      }
    >
      <IconButton color="inherit" onClick={handleClick}>
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
