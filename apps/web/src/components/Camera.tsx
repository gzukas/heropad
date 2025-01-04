import { useLingui } from '@lingui/react/macro';
import { Button, ButtonBase, ButtonGroup, Paper, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useCamera } from '~/hooks/useCamera';

export function Camera() {
  const { t } = useLingui();
  const { zoomIn, zoomOut, reset } = useCamera();

  return (
    <>
      <Tooltip title={t`Reset zoom`} placement="left">
        <Paper component={ButtonBase} onClick={reset} sx={{ p: 1 }}>
          <AdjustIcon />
        </Paper>
      </Tooltip>
      <ButtonGroup
        component={Paper}
        orientation="vertical"
        variant="text"
        color="inherit"
      >
        <Tooltip title={t`Zoom in`} placement="left">
          <Button onClick={zoomIn}>
            <AddIcon />
          </Button>
        </Tooltip>
        <Tooltip title={t`Zoom out`} placement="left">
          <Button onClick={zoomOut}>
            <RemoveIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </>
  );
}
