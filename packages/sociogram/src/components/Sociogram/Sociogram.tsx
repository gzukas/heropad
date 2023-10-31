import * as React from 'react';
import type Sigma from 'sigma/sigma';
import { Settings } from 'sigma/settings';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import clsx from 'clsx';
import { SigmaContainer } from '@react-sigma/core';
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import { useAtomValue } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import { inferSettings } from 'graphology-layout-forceatlas2';
import { useHydrateAndSyncAtoms } from '@heropad/base';
import { GraphEvents } from './GraphEvents';
import { GraphLayout } from './GraphLayout';
import { GraphSettings } from './GraphSettings';
import { Graph } from './Graph';
import {
  graphAtom,
  hoveredNodeAtom,
  selectedNodeAtom,
  themeAtom
} from '../../atoms';
import { Node, SociogramTheme } from '../../types';

export interface SociogramProps extends React.ComponentPropsWithoutRef<'div'> {
  graph: MultiDirectedGraph<Node>;
  theme?: SociogramTheme;
  selectedNode?: string;
  children?: React.ReactNode;
}

const defaultGraphSettings: Partial<Settings> = {
  nodeProgramClasses: {
    image: getNodeProgramImage()
  },
  defaultEdgeType: 'arrow',
  defaultNodeType: 'image',
  labelFont: 'Roboto, sans-serif',
  zIndex: true
};

export const Sociogram = React.forwardRef<Sigma, SociogramProps>(
  (props, ref) => {
    const {
      graph,
      children,
      className,
      theme = 'dark',
      selectedNode,
      ...other
    } = props;
    const hoveredNode = useAtomValue(hoveredNodeAtom);

    useHydrateAndSyncAtoms([
      [graphAtom, graph],
      [themeAtom, theme],
      [selectedNodeAtom, selectedNode]
    ]);

    return (
      <SigmaContainer
        ref={ref}
        className={clsx(
          {
            'Sociogram-nodeHovered': Boolean(hoveredNode)
          },
          className
        )}
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
);
