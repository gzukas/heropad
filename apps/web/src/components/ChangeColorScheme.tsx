import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Trans } from '@lingui/macro';

export function ChangeColorScheme() {
  const { mode, setMode } = useColorScheme();

  const handleClick = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip
      title={
        mode === 'dark' ? (
          <Trans>Turn on the light</Trans>
        ) : (
          <Trans>Turn off the light</Trans>
        )
      }
    >
      <IconButton color="inherit" onClick={handleClick}>
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
