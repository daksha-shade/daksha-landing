import { pgTable, text, timestamp, jsonb, integer, boolean, real } from "drizzle-orm/pg-core";

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
  // Optional URL if imported from the web
  sourceUrl: text("source_url"),
  // Milvus embedding ID for vector search
  embeddingId: text("embedding_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Journal entries with comprehensive features
export const journalEntries = pgTable("journal_entries", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  yooptaContent: jsonb("yoopta_content"), // Yoopta Editor JSON content for editing
  plainTextContent: text("plain_text_content"), // Plain text version for LLMs and search
  type: text("type").notNull().default("text"), // text, audio, video

  // Mood and emotional data
  mood: text("mood"), // happy, sad, excited, anxious, etc.
  moodIntensity: integer("mood_intensity"), // 1-10 scale
  emotionalTags: jsonb("emotional_tags").$type<string[]>(), // ["grateful", "stressed", "hopeful"]

  // Metadata
  tags: jsonb("tags").$type<string[]>(), // User-defined tags
  location: text("location"), // Optional location
  weather: text("weather"), // Optional weather

  // Media attachments
  audioUrl: text("audio_url"), // R2 URL for audio recordings
  videoUrl: text("video_url"), // R2 URL for video recordings
  imageUrls: jsonb("image_urls").$type<string[]>(), // Array of image URLs
  attachmentUrls: jsonb("attachment_urls").$type<string[]>(), // Other file attachments

  // Audio/Video specific metadata
  duration: integer("duration"), // Duration in seconds for audio/video
  transcript: text("transcript"), // AI-generated transcript
  transcriptConfidence: real("transcript_confidence"), // 0-1 confidence score

  // AI analysis
  aiSummary: text("ai_summary"), // AI-generated summary in markdown
  aiInsights: jsonb("ai_insights").$type<string[]>(), // AI-generated insights
  aiQuestions: jsonb("ai_questions").$type<string[]>(), // AI-suggested reflection questions
  aiSentiment: jsonb("ai_sentiment").$type<{
    overall: string;
    confidence: number;
    emotions: Array<{ emotion: string; intensity: number }>;
  }>(), // AI sentiment analysis

  // Milvus embedding ID for vector search
  embeddingId: text("embedding_id"),

  // Privacy and sharing
  isPrivate: boolean("is_private").default(true),
  shareToken: text("share_token"), // For sharing entries

  // Timestamps
  entryDate: timestamp("entry_date", { withTimezone: true }).notNull(), // User-specified date
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

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