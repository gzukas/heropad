import { t } from '@lingui/macro';
import { Button, ButtonGroup, Paper, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useCamera } from 'sociogram';
import { useLingui } from '@lingui/react';

export function Camera() {
  const { i18n } = useLingui();
  const { zoomIn, zoomOut, reset } = useCamera();
  return (
    <Paper>
      <ButtonGroup
        orientation="vertical"
        size="small"
        variant="text"
        color="inherit"
      >
        <Tooltip title={t(i18n)`Zoom in`} enterDelay={600} placement="left">
          <Button onClick={zoomIn}>
            <AddIcon />
          </Button>
        </Tooltip>
        <Tooltip title={t(i18n)`Zoom out`} enterDelay={600} placement="left">
          <Button onClick={zoomOut}>
            <RemoveIcon />
          </Button>
        </Tooltip>
        <Tooltip title={t(i18n)`Reset zoom`} enterDelay={600} placement="left">
          <Button onClick={reset}>
            <AdjustIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Paper>
  );
}
