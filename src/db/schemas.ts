import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  googleId: text("google_id").unique(),
  name: text("name"),
  username: text("username").unique(),
  dateOfBirth: timestamp("dateofbirth", { mode: "date" }),
  bio: text("bio"),
  location: text("location"),
  email: text("email").unique().notNull(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
});

export const tweetsTable = pgTable("tweet", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  text: text("tweet_text").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  hasEntities: boolean("has_entities").notNull().default(false),
});

export const entityType = pgEnum("entity_type", ["image", "video", "user"]);

export const entityTable = pgTable("tweet_entity", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  tweetId: text("tweet_id")
    .notNull()
    .references(() => tweetsTable.id),
  entityType: entityType("entity_type"),
  entityUrl: text("entity_url").notNull(),
});

export type DBUser = typeof usersTable.$inferSelect;
export type DBUserInsert = typeof usersTable.$inferInsert;
export type DBTweet = typeof tweetsTable.$inferSelect;
export type DBTweetInsert = typeof tweetsTable.$inferInsert;
export type DBEntity = typeof entityTable.$inferSelect;
export type DBEntityInsert = typeof entityTable.$inferInsert;
