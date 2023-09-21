import { Button, ButtonGroup, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useCamera } from 'sociogram';

export function Camera() {
  const { zoomIn, zoomOut, reset } = useCamera();
  return (
    <Paper>
      <ButtonGroup
        orientation="vertical"
        size="small"
        variant="text"
        color="inherit"
      >
        <Button onClick={zoomIn}>
          <AddIcon />
        </Button>
        <Button onClick={zoomOut}>
          <RemoveIcon />
        </Button>
        <Button onClick={reset}>
          <AdjustIcon/>
        </Button>
      </ButtonGroup>
    </Paper>
  );
}
