import { AnimateOptions } from 'sigma/utils';
import { useEventCallback } from './useEventCallback';
import { useAccumulatedContentShift } from './useAccumulatedContentShift';
import { useAtomValue } from 'jotai';
import { sigmaAtom } from '~/atoms/sigmaAtom';
import { CoordinateConversionOverride, Coordinates } from 'sigma/types';

export type UseCameraOptions = Partial<AnimateOptions> & {
  factor?: number;
};

/**
 * Hook for interacting with the Sigma camera.
 *
 * Provides utilities for zooming, centering, and navigating to the specific node in the graph. It
 * also ensures content alignment using accumulated content shifts.
 *
 * @param options Optional configuration options for camera animations.
 */
export function useCamera(options?: UseCameraOptions) {
  const sigma = useAtomValue(sigmaAtom);
  const camera = sigma?.getCamera();
  const shiftContentBy = useAccumulatedContentShift();

  const contentToFramedGraph = (
    coordinates: Coordinates,
    override?: CoordinateConversionOverride
  ) => {
    if (!shiftContentBy || !sigma) {
      return coordinates;
    }
    const { x, y } = sigma.framedGraphToViewport(coordinates, override);
    return sigma.viewportToFramedGraph(
      {
        x: x + shiftContentBy / 2,
        y
      },
      override
    );
  };

  const zoomIn = useEventCallback(() => camera?.animatedZoom(options));
  const zoomOut = useEventCallback(() => camera?.animatedUnzoom(options));

  const goto = useEventCallback((node: string) => {
    const data = sigma?.getNodeDisplayData(node);
    if (data) {
      camera?.animate(contentToFramedGraph(data), options);
    }
  });

  const reset = useEventCallback(() =>
    camera?.animate({
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
