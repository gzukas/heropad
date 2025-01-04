import * as React from 'react';
import clsx from 'clsx';
import { Settings } from 'sigma/settings';
import { NodeImageProgram } from '@sigma/node-image';
import EdgeCurveProgram from '@sigma/edge-curve';
import { Portal, PortalProps } from '@mui/material';
import { SigmaContainer, SigmaContainerProps } from '@react-sigma/core';
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import { useAtomValue } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import { inferSettings } from 'graphology-layout-forceatlas2';
import { type Attributes } from 'graphology-types';
import { graphAtom, HeroNode } from '~/atoms/graphAtom';
import { hoveredNodeAtom } from '~/atoms/hoveredNodeAtom';
import { GraphEvents } from './GraphEvents';
import { GraphLayout } from './GraphLayout';
import { GraphSettings } from './GraphSettings';
import { Graph } from './Graph';

const defaultGraphSettings: Partial<Settings> = {
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

export type SociogramProps = SigmaContainerProps<
  HeroNode,
  Attributes,
  Attributes
> &
  React.PropsWithChildren<Pick<PortalProps, 'container' | 'disablePortal'>>;

export function Sociogram(props: SociogramProps) {
  const { children, className, container, disablePortal, ...other } = props;
  const hoveredNode = useAtomValue(hoveredNodeAtom);
  const graph = useAtomValue(graphAtom);

  return (
    <SigmaContainer
      className={clsx({
        'Sociogram-nodeHovered': Boolean(hoveredNode),
        className
      })}
      graph={MultiDirectedGraph}
      settings={defaultGraphSettings}
      {...other}
    >
      <Graph />
      <GraphEvents />
      <GraphSettings />
      <GraphLayout
        layout={useWorkerLayoutForceAtlas2}
        settings={{ settings: inferSettings(graph) }}
      />
      <Portal container={container} disablePortal={disablePortal}>
        {children}
      </Portal>
    </SigmaContainer>
  );
}
