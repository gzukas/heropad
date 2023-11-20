CREATE extension pg_hashids WITH SCHEMA extensions;

CREATE TABLE "hero" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR NOT NULL UNIQUE,
  "name" TEXT NOT NULL
);

CREATE TABLE "award" (
  "id" SERIAL PRIMARY KEY,
  "givenAt" TIMESTAMP DEFAULT now() NOT NULL,
  "description" TEXT NOT NULL,
  "fromId" INTEGER NOT NULL REFERENCES "hero" ("id"),
  "toId" INTEGER NOT NULL REFERENCES "hero" ("id")
);

CREATE INDEX "hero_username_index" ON "hero" ("username");

CREATE INDEX "award_givenAt_index" ON "award" ("givenAt");