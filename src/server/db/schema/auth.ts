import * as t from "drizzle-orm/sqlite-core";

export const userTable = t.sqliteTable("user", {
	id: t.text().primaryKey(),
	name: t.text().notNull(),
	email: t.text().notNull().unique(),
	emailVerified: t.integer({ mode: "boolean" }).default(false).notNull(),
	image: t.text(),
	createdAt: t
		.integer({ mode: "timestamp_ms" })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: t
		.integer({ mode: "timestamp_ms" })
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date())
		.notNull(),
});

export const sessionTable = t.sqliteTable("session", {
	id: t.text().primaryKey(),
	expiresAt: t.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
	token: t.text("token").notNull().unique(),
	createdAt: t
		.integer({ mode: "timestamp_ms" })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: t
		.integer({ mode: "timestamp_ms" })
		.$onUpdate(() => new Date())
		.notNull(),
	ipAddress: t.text(),
	userAgent: t.text(),
	userId: t
		.text()
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = t.sqliteTable("account", {
	id: t.text().primaryKey(),
	accountId: t.text("account_id").notNull(),
	providerId: t.text("provider_id").notNull(),
	userId: t
		.text("user_id")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	accessToken: t.text("access_token"),
	refreshToken: t.text("refresh_token"),
	idToken: t.text("id_token"),
	accessTokenExpiresAt: t.integer("access_token_expires_at", {
		mode: "timestamp_ms",
	}),
	refreshTokenExpiresAt: t.integer("refresh_token_expires_at", {
		mode: "timestamp_ms",
	}),
	scope: t.text("scope"),
	password: t.text("password"),
	createdAt: t
		.integer("created_at", { mode: "timestamp_ms" })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: t
		.integer("updated_at", { mode: "timestamp_ms" })
		.$onUpdate(() => new Date())
		.notNull(),
});

export const verificationTable = t.sqliteTable("verification", {
	id: t.text("id").primaryKey(),
	identifier: t.text("identifier").notNull(),
	value: t.text("value").notNull(),
	expiresAt: t.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
	createdAt: t
		.integer("created_at", { mode: "timestamp_ms" })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: t
		.integer("updated_at", { mode: "timestamp_ms" })
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date())
		.notNull(),
});
