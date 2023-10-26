CREATE TABLE "hero" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "username" VARCHAR NOT NULL UNIQUE,
  "name" TEXT NOT NULL
);

CREATE TABLE "award" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "givenAt" TIMESTAMP DEFAULT now() NOT NULL,
  "description" TEXT NOT NULL,
  "fromId" UUID NOT NULL REFERENCES "hero" ("id"),
  "toId" UUID NOT NULL REFERENCES "hero" ("id")
);

CREATE INDEX "hero_username_index" ON "hero" ("username");

CREATE INDEX "award_givenAt_index" ON "award" ("givenAt");