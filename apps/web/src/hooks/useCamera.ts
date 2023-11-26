import { useSigma } from '@react-sigma/core';
import { AnimateOptions } from 'sigma/utils/animate';
import { useEventCallback } from './useEventCallback';

export type UseCameraOptions = Partial<AnimateOptions> & {
  factor?: number;
};

export function useCamera(options?: UseCameraOptions) {
  const sigma = useSigma();

  const zoomIn = useEventCallback(() =>
    sigma.getCamera().animatedZoom(options)
  );

  const zoomOut = useEventCallback(() => {
    sigma.getCamera().animatedUnzoom(options);
  });

  const reset = useEventCallback(() => {
    sigma.getCamera().animatedReset(options);
  });

  const goto = useEventCallback((node: string) => {
    const nodeDisplayData = sigma.getNodeDisplayData(node);
    if (nodeDisplayData) {
      sigma.getCamera().animate(nodeDisplayData, options);
    }
  });

  return { zoomIn, zoomOut, goto, reset } as const;
}
