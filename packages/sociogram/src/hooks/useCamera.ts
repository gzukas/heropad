import { useSigma } from '@react-sigma/core';
import { useCallback, useEffect, useRef } from 'react';
import { AnimateOptions } from 'sigma/utils/animate';

export type UseCameraOptions = Partial<AnimateOptions> & {
  factor?: number;
};

export function useCamera(options?: UseCameraOptions) {
  const sigma = useSigma();
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options
  }, [options]);

  const zoomIn = useCallback(() => {
    sigma.getCamera().animatedZoom(optionsRef.current);
  }, [sigma]);

  const zoomOut = useCallback(() => {
    sigma.getCamera().animatedUnzoom(optionsRef.current);
  }, [sigma]);

  const reset = useCallback(() => {
    sigma.getCamera().animatedReset(optionsRef.current);
  }, [sigma]);

  return { zoomIn, zoomOut, reset };
}
