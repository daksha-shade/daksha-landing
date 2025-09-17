import { pgTable, text, timestamp, jsonb, vector } from "drizzle-orm/pg-core";

// Users from StackAuth (Stack) — enhanced with user profile data
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email"),
  displayName: text("display_name"),
  profileImageUrl: text("profile_image_url"),
  primaryEmail: text("primary_email"),
  primaryEmailVerified: text("primary_email_verified"),
  // Client metadata - stored as JSONB for flexibility
  clientMetadata: jsonb("client_metadata"),
  // Server metadata - stored as JSONB for flexibility  
  serverMetadata: jsonb("server_metadata"),
  // OAuth account information
  oauthProviders: jsonb("oauth_providers"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
});

// Context files authored by a user
export const contextFiles = pgTable("context_files", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  // Raw content stored as plain text
  content: text("content").notNull(),
  // Vector embedding for semantic search (using pgvector)
  embedding: vector("embedding", { dimensions: 1536 }), // OpenAI text-embedding-3-small uses 1536 dimensions
  // Optional URL if imported from the web
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Remove the separate embeddings table since we're storing embeddings directly in context_files
// export const contextEmbeddings = pgTable("context_embeddings", {
//   id: text("id").primaryKey(),
//   contextFileId: text("context_file_id").notNull(),
//   userId: text("user_id").notNull(),
//   chunkText: text("chunk_text").notNull(),
//   model: text("model").notNull(),
//   dims: integer("dims").notNull(),
//   metadata: jsonb("metadata"),
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
// });

