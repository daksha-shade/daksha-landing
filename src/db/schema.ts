import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

// Threads table for chat conversations
export const threads = pgTable("threads", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Messages table for individual messages within threads
export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  threadId: text("thread_id").notNull().references(() => threads.id),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: jsonb("content").notNull(), // For assistant-ui's message format
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});