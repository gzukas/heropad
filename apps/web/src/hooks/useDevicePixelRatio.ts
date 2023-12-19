import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

function getDevicePixelRatio() {
  return window.devicePixelRatio;
}

/**
 * A hook for tracking and retrieving the current device pixel ratio.
 */
export function useDevicePixelRatio() {
  const [dpr, setDpr] = useState(getDevicePixelRatio());
  const matches = useMediaQuery(`screen and (resolution: ${dpr}dppx)`);
  useEffect(() => setDpr(getDevicePixelRatio()), [matches]);
  return dpr;
}
