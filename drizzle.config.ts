import { Config, defineConfig } from 'drizzle-kit'

// @ts-ignore
export default defineConfig({
 schema: "./src/db/schemas.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
