import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useLingui } from '@lingui/react/macro';

export function ChangeColorScheme() {
  const { t } = useLingui();
  const { setColorScheme, colorScheme } = useColorScheme();

  const handleClick = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip
      title={
        colorScheme === 'dark' ? t`Turn on the light` : t`Turn off the light`
      }
    >
      <IconButton color="inherit" onClick={handleClick}>
        {colorScheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
