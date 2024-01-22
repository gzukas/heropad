CREATE VIEW "hero_award_search" AS
SELECT
  "hero"."id" AS "id",
  "name" AS "text",
  "hero"."search" AS "search",
  ARRAY[["username", "name"]] AS "nodes",
  'hero' AS "kind"
FROM
  "hero"
UNION ALL
SELECT
  "award"."id" AS "id",
  "description" AS "text",
  "award"."search" AS "search",
  ARRAY[
    ["from"."username", "from"."name"],
    ["to"."username", "to"."name"]
  ] AS "nodes",
  'award' AS "kind"
FROM
  "award"
  INNER JOIN "hero" AS "from" ON "award"."fromId" = "from"."id"
  INNER JOIN "hero" AS "to" ON "award"."toId" = "to"."id";