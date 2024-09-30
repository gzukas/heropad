import { sql, Insertable } from 'kysely';
import { copycat } from '@snaplet/copycat';
import Graph from 'graphology';
import girvanNewman from 'graphology-generators/random/girvan-newman';
import { db, type HeroTable, type AwardTable } from '../src/database/db.js';

type NewHero = Insertable<HeroTable>;
type NewAward = Insertable<AwardTable>;

async function seed() {
  const sourceGraph = girvanNewman(Graph, {
    zOut: 5
  });

  const heroesByNode = new Map(
    sourceGraph.nodes().map<[string, NewHero]>((node, index) => {
      const username = copycat.username(node);
      const name = copycat.fullName(username);
      return [node, { id: index + 1, username, name }];
    })
  );

  let edgeId = 0;
  const awards = sourceGraph.mapEdges<NewAward>(
    (edge, _attributes, source, target) => {
      const fromId = heroesByNode.get(source)!.id!;
      const toId = heroesByNode.get(target)!.id!;
      return {
        id: ++edgeId,
        givenAt: new Date(copycat.dateString(edge)),
        description: copycat.sentence(edge),
        fromId,
        toId
      };
    }
  );

  await db.transaction().execute(async trx => {
    await sql`truncate "award", "hero" restart identity cascade`.execute(trx);
    await trx
      .insertInto('hero')
      .values([...heroesByNode.values()])
      .execute();
    await trx.insertInto('award').values(awards).execute();
  });

  await db.destroy();
}

await seed();
