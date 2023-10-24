import * as React from 'react';
import { useState } from 'react';
import type Sigma from 'sigma/sigma';
import { Settings } from 'sigma/settings';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import clsx from 'clsx';
import { SigmaContainer } from '@react-sigma/core';
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import { createStore, useAtomValue, Provider as JotaiProvider } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import { inferSettings } from 'graphology-layout-forceatlas2';
import { GraphEvents } from './GraphEvents';
import { GraphLayout } from './GraphLayout';
import { GraphSettings } from './GraphSettings';
import { Graph } from './Graph';
import { useHydrateAndSyncAtoms } from 'base';
import {
  graphAtom,
  hoveredNodeAtom,
  themeAtom,
  selectedNodeAtom
} from '../../atoms';
import { Node, SociogramTheme } from '../../types';

export interface SociogramProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
  graph: MultiDirectedGraph<Node>;
  selectedNode?: string | null;
  theme?: SociogramTheme;
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
      theme = 'dark',
      children,
      className,
      selectedNode,
      ...other
    } = props;

    const [store] = useState(() => createStore());
    const hoveredNode = useAtomValue(hoveredNodeAtom, { store });

    useHydrateAndSyncAtoms(
      [
        [graphAtom, graph],
        [themeAtom, theme],
        [selectedNodeAtom, selectedNode]
      ],
      { store }
    );

    return (
      <JotaiProvider store={store}>
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
            getSettings={graph => ({ settings: inferSettings(graph) })}
          />
          {children}
        </SigmaContainer>
      </JotaiProvider>
    );
  }
);
