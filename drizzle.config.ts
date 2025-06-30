import { defineConfig } from "drizzle-kit";

// @ts-ignore
export default defineConfig({
	schema: ["./src/lib/db/schema.ts", "./src/db/auth-schema.ts"],
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
