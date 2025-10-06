import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";

import { env } from "@/env";

import * as authSchema from "./schema/auth";

const sqlite = new Database(env.DATABASE_URL);
export const db = drizzle({
	client: sqlite,
	casing: "snake_case",
	schema: { ...authSchema },
});
