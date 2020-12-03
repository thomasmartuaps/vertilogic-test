CREATE TABLE "public"."Vendor" (

  id SERIAL PRIMARY KEY NOT NULL,

  "name" VARCHAR(128) UNIQUE NOT NULL

);

CREATE TABLE "public"."Dish" (
  
  id SERIAL PRIMARY KEY NOT NULL,

  menuname VARCHAR(255) NOT NULL,

  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),

  "vendorId" INTEGER NOT NULL,

  FOREIGN KEY ("vendorId") REFERENCES "public"."Vendor"(id)

);

CREATE TABLE "public"."Order" (
  id SERIAL PRIMARY KEY NOT NULL,
  
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),

  specialreq TEXT,

  "dishId" INTEGER NOT NULL,

  FOREIGN KEY ("dishId") REFERENCES "public"."Dish"(id)

);