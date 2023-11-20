/// <reference path=".snaplet/snaplet.d.ts" />

import crypto from 'node:crypto';
import { defineConfig } from 'snaplet';
import { copycat } from '@snaplet/copycat';
import Graph, { MultiDirectedGraph } from 'graphology';
import erdosRenyi from 'graphology-generators/random/erdos-renyi';
import { type Hero } from './src/database/types';
import { awardsScalars, herosScalars } from './.snaplet/snaplet-client';

export default defineConfig({
  generate: {
    async run(snaplet) {
      const erdosRenyiGraph = erdosRenyi(Graph, {
        order: 100,
        probability: 0.8
      });

      const heroesByNode = new Map(
        erdosRenyiGraph.nodes().map<[string, Hero]>((node, index) => {
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
      erdosRenyiGraph.forEachEdge((_edge, _attributes, source, target) => {
        const { id: fromId } = heroesByNode.get(source)!;
        const { id: toId } = heroesByNode.get(target)!;
        const id = crypto.randomUUID();

        graph.addDirectedEdgeWithKey(id, fromId, toId, {
          id: ++edgeId,
          givenAt: copycat.dateString(id),
          description: copycat.sentence(id),
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
