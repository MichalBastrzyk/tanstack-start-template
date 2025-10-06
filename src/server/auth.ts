import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/server/db";
import {
	accountTable,
	sessionTable,
	userTable,
	verificationTable,
} from "@/server/db/schema/auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			user: userTable,
			session: sessionTable,
			account: accountTable,
			verification: verificationTable,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
});
