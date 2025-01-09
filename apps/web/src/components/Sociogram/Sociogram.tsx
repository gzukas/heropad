import { Suspense, useCallback } from 'react';
import clsx from 'clsx';
import { Sigma } from 'sigma';
import { Settings } from 'sigma/settings';
import { NodeImageProgram } from '@sigma/node-image';
import EdgeCurveProgram from '@sigma/edge-curve';
import { Box, BoxProps } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import { HeroNode } from '~/atoms/graphAtom';
import { hoveredNodeAtom } from '~/atoms/hoveredNodeAtom';
import { GraphEvents } from './GraphEvents';
import { GraphLayout } from './GraphLayout';
import { GraphSettings } from './GraphSettings';
import { Graph } from './Graph';
import { sigmaAtom } from '~/atoms/sigmaAtom';

const defaultSettings: Partial<Settings> = {
  nodeProgramClasses: {
    image: NodeImageProgram
  },
  edgeProgramClasses: {
    curve: EdgeCurveProgram
  },
  defaultEdgeType: 'curve',
  defaultNodeType: 'image',
  labelFont: 'Roboto, sans-serif',
  zIndex: true
};

export type SociogramProps<C extends React.ElementType> = BoxProps<
  C,
  { component?: C }
>;

export function Sociogram<C extends React.ElementType>(
  props: SociogramProps<C>
) {
  const { className, children, sx = [], ...other } = props;
  const hoveredNode = useAtomValue(hoveredNodeAtom);
  const setSigma = useSetAtom(sigmaAtom);

  const handleContainerRef = useCallback(
    (container: HTMLDivElement | null) => {
      setSigma(
        container
          ? new Sigma(
              new MultiDirectedGraph<HeroNode>(),
              container,
              defaultSettings
            )
          : null
      );
    },
    [setSigma]
  );

  return (
    <Box
      ref={handleContainerRef}
      className={clsx({
        'Sociogram-nodeHovered': Boolean(hoveredNode),
        className
      })}
      sx={[
        {
          '&.Sociogram-nodeHovered': {
            cursor: 'pointer'
          }
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...other}
    >
      <Graph />
      <Suspense fallback="wer">
        <GraphSettings />
      </Suspense>
      <GraphEvents />
      <GraphLayout />
      {children}
    </Box>
  );
}
