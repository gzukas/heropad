import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, ButtonGroup, Paper, PaperProps, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useCamera } from '~/hooks';

export function Camera<C extends React.ElementType>(
  props: PaperProps<C, { component: C }>
) {
  const { i18n } = useLingui();
  const { zoomIn, zoomOut, reset } = useCamera();
  return (
    <Paper {...props}>
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
