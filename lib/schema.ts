import { pgTable, serial, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  userType: varchar("user_type", { length: 50 }).notNull().default("student"),
  graduationYear: varchar("graduation_year", { length: 4 }),
  company: varchar("company", { length: 255 }),
  position: varchar("position", { length: 255 }),
  location: varchar("location", { length: 255 }),
  bio: text("bio"),
  avatar: varchar("avatar", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// User privacy settings
export const privacySettings = pgTable("privacy_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  showEmail: boolean("show_email").default(false),
  showPhone: boolean("show_phone").default(false),
  showCompany: boolean("show_company").default(true),
  profileVisibility: varchar("profile_visibility", { length: 50 }).default("public"),
})

// Achievements table
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
})

// User achievements
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  achievementId: integer("achievement_id")
    .notNull()
    .references(() => achievements.id),
  featured: boolean("featured").default(false),
  earnedAt: timestamp("earned_at").defaultNow(),
})

// Donations table
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  amount: integer("amount").notNull(),
  paymentId: varchar("payment_id", { length: 255 }),
  donationType: varchar("donation_type", { length: 50 }).notNull(),
  fundType: varchar("fund_type", { length: 50 }).notNull(),
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Mentorship sessions
export const mentorshipSessions = pgTable("mentorship_sessions", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id")
    .notNull()
    .references(() => users.id),
  menteeId: integer("mentee_id")
    .notNull()
    .references(() => users.id),
  topic: varchar("topic", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  duration: integer("duration").notNull(), // in minutes
  method: varchar("method", { length: 50 }).notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 50 }).notNull().default("scheduled"),
  feedback: integer("feedback"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  privacySettings: many(privacySettings),
  userAchievements: many(userAchievements),
  donations: many(donations),
  mentorSessions: many(mentorshipSessions, { relationName: "mentor" }),
  menteeSessions: many(mentorshipSessions, { relationName: "mentee" }),
}))
