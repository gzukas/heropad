import { IconButton } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export function ChangeColorScheme() {
  const { mode, setMode } = useColorScheme();

  const handleClick = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <IconButton color="inherit" onClick={handleClick}>
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
