import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";

// Users from StackAuth (Stack) — we only reference by id (string)
export const users = pgTable("users", {
  id: text("id").primaryKey(),
});

// Context files authored by a user
export const contextFiles = pgTable("context_files", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  // Raw content stored as plain text (we'll store tiptap JSON or plain string)
  content: text("content").notNull(),
  // Optional URL if imported from the web
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Embedding chunks per context file. One row per chunk stored in Qdrant
export const contextEmbeddings = pgTable("context_embeddings", {
  id: text("id").primaryKey(), // same as Qdrant point id for traceability
  contextFileId: text("context_file_id").notNull(),
  userId: text("user_id").notNull(),
  // Chunk text used to generate embedding
  chunkText: text("chunk_text").notNull(),
  // Embedding meta
  model: text("model").notNull(),
  dims: integer("dims").notNull(),
  // Optional extra metadata (e.g., position)
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

