import { useSigma } from '@react-sigma/core';
import { AnimateOptions } from 'sigma/utils/animate';
import { useEventCallback } from './useEventCallback';
import { useAccumulatedContentShift } from './useAccumulatedContentShift';

export type UseCameraOptions = Partial<AnimateOptions> & {
  factor?: number;
};

export function useCamera(options?: UseCameraOptions) {
  const sigma = useSigma();
  const camera = sigma.getCamera();
  const shiftContentBy = useAccumulatedContentShift();

  const contentToFramedGraph: (typeof sigma)['viewportToFramedGraph'] = (
    coordinates,
    ...other
  ) => {
    if (!shiftContentBy) {
      return coordinates;
    }
    const { x, y } = sigma.framedGraphToViewport(coordinates, ...other);
    return sigma.viewportToFramedGraph(
      {
        x: x + shiftContentBy / 2,
        y
      },
      ...other
    );
  };

  const zoomIn = useEventCallback(() => camera.animatedZoom(options));
  const zoomOut = useEventCallback(() => camera.animatedUnzoom(options));

  const goto = useEventCallback((node: string) => {
    const data = sigma.getNodeDisplayData(node);
    if (data) {
      camera.animate(contentToFramedGraph(data), options);
    }
  });

  const reset = useEventCallback(() =>
    camera.animate({
      ...contentToFramedGraph(
        { x: 0.5, y: 0.5 },
        { cameraState: { ...camera.getState(), ratio: 1 } }
      ),
      ratio: 1,
      angle: 0
    })
  );

  return { zoomIn, zoomOut, goto, reset };
}
