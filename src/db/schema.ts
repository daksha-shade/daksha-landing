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

// Journal streaks for tracking writing consistency
export const journalStreaks = pgTable("journal_streaks", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  currentStreak: integer("current_streak"),
  longestStreak: integer("longest_streak"),
  totalEntries: integer("total_entries"),
  lastEntryDate: timestamp("last_entry_date", { withTimezone: true }),
  streakStartDate: timestamp("streak_start_date", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Daily analytics for journal entries
export const journalAnalytics = pgTable("journal_analytics", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  entryCount: integer("entry_count").default(0),
  wordCount: integer("word_count").default(0),
  averageMood: real("average_mood"),
  dominantEmotions: jsonb("dominant_emotions").$type<string[]>(),
  topTags: jsonb("top_tags").$type<string[]>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Notes table for the notes app
export const notes = pgTable("notes", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull().default("Personal"),
  tags: jsonb("tags").$type<string[]>().default([]),
  isFavorite: boolean("is_favorite").default(false),
  aiGenerated: boolean("ai_generated").default(false),
  // Milvus embedding ID for vector search
  embeddingId: text("embedding_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Google Drive integration table
export const googleDriveTokens = pgTable("google_drive_tokens", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  tokenType: text("token_type").default("Bearer"),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  scope: text("scope").notNull(),
  // User's Google account info
  googleAccountId: text("google_account_id").notNull(),
  email: text("email").notNull(),
  name: text("name"),
  picture: text("picture"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Google Drive file cache for better performance
export const googleDriveFiles = pgTable("google_drive_files", {
  id: text("id").primaryKey(), // Google Drive file ID
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: text("size"),
  parents: jsonb("parents").$type<string[]>(),
  webViewLink: text("web_view_link"),
  webContentLink: text("web_content_link"),
  thumbnailLink: text("thumbnail_link"),
  iconLink: text("icon_link"),
  shared: boolean("shared").default(false),
  // AI analysis results
  aiSummary: text("ai_summary"),
  aiTags: jsonb("ai_tags").$type<string[]>(),
  embeddingId: text("embedding_id"),
  // Google Drive metadata
  modifiedTime: timestamp("modified_time", { withTimezone: true }),
  createdTime: timestamp("created_time", { withTimezone: true }),
  // Cache timestamps
  lastSynced: timestamp("last_synced", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});