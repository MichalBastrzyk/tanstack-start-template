import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/server/db/schema/**",

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  casing: "snake_case",
  breakpoints: true,
  strict: true,
  verbose: true,
});
