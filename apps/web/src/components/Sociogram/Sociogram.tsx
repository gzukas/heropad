import * as React from 'react';
import clsx from 'clsx';
import { Settings } from 'sigma/settings';
import { createNodeImageProgram } from '@sigma/node-image';
import { createEdgeCurveProgram } from '@sigma/edge-curve';
import { SigmaContainer } from '@react-sigma/core';
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import { useAtomValue } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import { inferSettings } from 'graphology-layout-forceatlas2';
import { graphAtom } from '~/atoms/graphAtom';
import { hoveredNodeAtom } from '~/atoms/hoveredNodeAtom';
import { GraphEvents } from './GraphEvents';
import { GraphLayout } from './GraphLayout';
import { GraphSettings } from './GraphSettings';
import { Graph } from './Graph';

const defaultGraphSettings: Partial<Settings> = {
  nodeProgramClasses: {
    image: createNodeImageProgram()
  },
  edgeProgramClasses: {
    curve: createEdgeCurveProgram()
  },
  defaultEdgeType: 'curve',
  defaultNodeType: 'image',
  labelFont: 'Roboto, sans-serif',
  zIndex: true
};

export function Sociogram(props: React.PropsWithChildren) {
  const { children, ...other } = props;
  const hoveredNode = useAtomValue(hoveredNodeAtom);
  const graph = useAtomValue(graphAtom);

  return (
    <SigmaContainer
      className={clsx({
        'Sociogram-nodeHovered': Boolean(hoveredNode)
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
      {children}
    </SigmaContainer>
  );
}
