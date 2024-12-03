import { useLingui } from '@lingui/react/macro';
import { Button, ButtonGroup, Paper, PaperProps, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useCamera } from '~/hooks/useCamera';

export function Camera<C extends React.ElementType>(
  props: PaperProps<C, { component: C }>
) {
  const { t } = useLingui();
  const { zoomIn, zoomOut, reset } = useCamera();

  return (
    <Paper {...props}>
      <ButtonGroup
        orientation="vertical"
        size="small"
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
        <Tooltip title={t`Reset zoom`} placement="left">
          <Button onClick={reset}>
            <AdjustIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Paper>
  );
}
