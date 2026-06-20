import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL as string;

if (!databaseUrl) {
  throw new Error("you must have DATABASE_URL defined in your env file");
}

export default defineConfig({
  schema: "./src/db/schemas.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
});
