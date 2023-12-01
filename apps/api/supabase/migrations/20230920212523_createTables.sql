CREATE extension pg_hashids WITH SCHEMA extensions;

CREATE TABLE "hero" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "search" TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', "name")) stored
);

CREATE TABLE "award" (
  "id" SERIAL PRIMARY KEY,
  "givenAt" TIMESTAMP DEFAULT now() NOT NULL,
  "description" TEXT NOT NULL,
  "fromId" INTEGER NOT NULL REFERENCES "hero" ("id"),
  "toId" INTEGER NOT NULL REFERENCES "hero" ("id"),
  "search" TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', "description")) stored
);

CREATE INDEX "hero_username" ON "hero" ("username");

CREATE INDEX "award_givenAt" ON "award" ("givenAt");

CREATE INDEX "hero_search" on "hero" using gin ("search");

CREATE INDEX "award_search" on "award" using gin ("search");