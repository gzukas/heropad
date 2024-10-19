import { sql, Insertable } from 'kysely';
import { copycat } from '@snaplet/copycat';
import Graph from 'graphology';
import { createSpinner } from 'nanospinner';
import girvanNewman from 'graphology-generators/random/girvan-newman';
import { db, type HeroTable, type AwardTable } from '../src/database/db.js';

type NewHero = Insertable<HeroTable>;
type NewAward = Insertable<AwardTable>;

async function seed() {
  const spinner = createSpinner();
  spinner.start({ text: 'Generating the graph' });

  const graph = girvanNewman(Graph, {
    zOut: 5
  });

  const heroesByNode = new Map(
    graph.nodes().map<[string, NewHero]>((node, index) => {
      const username = copycat.username(node);
      const name = copycat.fullName(username);
      return [node, { id: index + 1, username, name }];
    })
  );

  let edgeId = 0;
  const awards = graph.mapEdges<NewAward>(
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

  spinner.start({ text: 'Recreating the graph in the database' });

  try {
    await db.transaction().execute(async trx => {
      await sql`truncate "award", "hero" restart identity cascade`.execute(trx);
      await trx
        .insertInto('hero')
        .values([...heroesByNode.values()])
        .execute();
      await trx.insertInto('award').values(awards).execute();
    });
    spinner.success({
      text: `Graph successfully seeded with ${heroesByNode.size} hero(es) and ${awards.length} award(s)`
    });
  } catch (error) {
    spinner.error({ text: 'Failed to recreate the graph in the database:' });
    throw error;
  } finally {
    await db.destroy();
  }
}

await seed();
