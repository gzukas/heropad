CREATE EXTENSION pg_hashids WITH SCHEMA extensions;

CREATE TABLE "hero" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "search" TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', "name")) STORED
);

CREATE TABLE "award" (
  "id" SERIAL PRIMARY KEY,
  "givenAt" TIMESTAMP DEFAULT now() NOT NULL,
  "description" TEXT NOT NULL,
  "fromId" INTEGER NOT NULL REFERENCES "hero" ("id"),
  "toId" INTEGER NOT NULL REFERENCES "hero" ("id"),
  "search" TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', "description")) STORED
);

ALTER TABLE
  "hero" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
  "award" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."hero" AS PERMISSIVE FOR
SELECT
  TO public USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."award" AS PERMISSIVE FOR
SELECT
  TO public USING (true);

CREATE INDEX "hero_username" ON "hero" ("username");

CREATE INDEX "award_givenAt" ON "award" ("givenAt");

CREATE INDEX "hero_search" ON "hero" USING GIN ("search");

CREATE INDEX "award_search" ON "award" USING GIN ("search");