CREATE EXTENSION pg_trgm;

CREATE TABLE "hero" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "name" VARCHAR NOT NULL UNIQUE
);

CREATE TABLE "award" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "givenAt" TIMESTAMP DEFAULT now() NOT NULL,
  "description" TEXT NOT NULL,
  "fromId" UUID NOT NULL REFERENCES "hero" ("id"),
  "toId" UUID NOT NULL REFERENCES "hero" ("id")
);

CREATE INDEX "hero_name_index" ON "hero" ("name");

CREATE INDEX "award_description_trigram" ON "award" USING gin ("description" gin_trgm_ops);