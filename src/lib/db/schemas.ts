import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  google_id: text("google_id").unique(),
  name: text("name"),
  username: text("username").unique(),
  dateOfBirth: timestamp("dateofbirth", { mode: "date" }),
  bio: text("bio"),
  location: text("location"),
  email: text("email").unique().notNull(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
});

export type DBUser = typeof users.$inferSelect;
