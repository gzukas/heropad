import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

export function ChangeColorScheme() {
  const { i18n } = useLingui();
  const { mode, setMode } = useColorScheme();

  const handleClick = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip
      title={
        mode === 'dark'
          ? t(i18n)`Turn on the light`
          : t(i18n)`Turn off the light`
      }
      enterDelay={300}
    >
      <IconButton color="inherit" onClick={handleClick}>
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
