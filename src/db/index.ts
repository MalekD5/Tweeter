import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";

export const pool = postgres(env.DATABASE_URL, { max: 1 });

export const db = drizzle(pool);
