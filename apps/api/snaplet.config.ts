// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path=".snaplet/snaplet.d.ts" />

import { defineConfig } from 'snaplet';
import { copycat } from '@snaplet/copycat';
import Graph, { MultiDirectedGraph } from 'graphology';
import girvanNewman from 'graphology-generators/random/girvan-newman';
import { type Hero } from './src/database/types';
import { awardsScalars, herosScalars } from './.snaplet/snaplet-client';

export default defineConfig({
  generate: {
    async run(snaplet) {
      const sourceGraph = girvanNewman(Graph, {
        zOut: 5
      });

      const heroesByNode = new Map(
        sourceGraph.nodes().map<[string, Hero]>((node, index) => {
          const username = copycat.username(node);
          const name = copycat.fullName(username);
          return [node, { id: index + 1, username, name }];
        })
      );

      const graph = new MultiDirectedGraph<herosScalars, awardsScalars>();

      for (const [, hero] of heroesByNode) {
        graph.addNode(hero.id, hero);
      }

      let edgeId = 0;
      sourceGraph.forEachEdge((edge, _attributes, source, target) => {
        const { id: fromId } = heroesByNode.get(source)!;
        const { id: toId } = heroesByNode.get(target)!;

        graph.addDirectedEdge(fromId, toId, {
          id: ++edgeId,
          givenAt: copycat.dateString(edge),
          description: copycat.sentence(edge),
          fromId,
          toId
        });
      });

      await snaplet.$pipe([
        snaplet.heros(
          [...graph.nodeEntries()].map(({ attributes }) => attributes)
        ),
        snaplet.awards(
          [...graph.edgeEntries()].map(({ attributes }) => attributes)
        )
      ]);
    }
  }
});
