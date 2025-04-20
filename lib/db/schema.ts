// lib/db/schema.ts

import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  userType: text("user_type").notNull(),
  graduationYear: text("graduation_year"),
  company: text("company"),
  position: text("position"),
  location: text("location"),
  bio: text("bio"),
  linkedin: text("linkedin"),
  github: text("github"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
