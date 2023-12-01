import * as React from 'react';
import { Settings } from 'sigma/settings';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import clsx from 'clsx';
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
    image: getNodeProgramImage()
  },
  defaultEdgeType: 'arrow',
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
