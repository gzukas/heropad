import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

export function ChangeColorScheme() {
  const { _ } = useLingui();
  const { setColorScheme, colorScheme } = useColorScheme();

  const handleClick = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip
      title={
        colorScheme === 'dark'
          ? _(msg`Turn on the light`)
          : _(msg`Turn off the light`)
      }
    >
      <IconButton color="inherit" onClick={handleClick}>
        {colorScheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
