import * as React from 'react';
import type Sigma from 'sigma/sigma';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import clsx from 'clsx';
import { SigmaContainer } from '@react-sigma/core';
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import { useAtomValue } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import { inferSettings } from 'graphology-layout-forceatlas2';
import { GraphEvents } from './GraphEvents';
import { GraphLayout } from './GraphLayout';
import { GraphSettings } from './GraphSettings';
import { Graph } from './Graph';
import { hoveredNodeAtom } from '../../atoms';

export type SociogramProps = React.ComponentPropsWithoutRef<
  typeof SigmaContainer
>;

export const Sociogram = React.forwardRef<Sigma, SociogramProps>(
  (props, ref) => {
    const { children, className, ...other } = props;
    const hoveredNode = useAtomValue(hoveredNodeAtom);

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
        settings={{
          nodeProgramClasses: {
            image: getNodeProgramImage()
          },
          defaultEdgeType: 'arrow',
          defaultNodeType: 'image',
          zIndex: true
        }}
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
    );
  }
);
