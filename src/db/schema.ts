import { pgTable, text, timestamp, jsonb, vector, integer, boolean, real } from "drizzle-orm/pg-core";

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

// Journal entries with comprehensive features
export const journalEntries = pgTable("journal_entries", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  content: jsonb("content"), // Plate.js JSON content for editing
  markdownContent: text("markdown_content"), // Markdown version for LLMs and search
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

  // Privacy and sharing
  isPrivate: boolean("is_private").default(true),
  shareToken: text("share_token"), // For sharing entries

  // Vector embedding for semantic search
  embedding: vector("embedding", { dimensions: 1536 }),

  // Timestamps
  entryDate: timestamp("entry_date", { withTimezone: true }).notNull(), // User-specified date
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Journal templates for prompts and guided journaling
export const journalTemplates = pgTable("journal_templates", {
  id: text("id").primaryKey(),
  userId: text("user_id"), // null for system templates, user_id for custom templates
  name: text("name").notNull(),
  description: text("description"),
  prompts: jsonb("prompts").$type<string[]>(), // Array of prompts/questions
  category: text("category"), // gratitude, reflection, goals, etc.
  isSystem: boolean("is_system").default(false), // System vs user templates
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Journal streaks and habits tracking
export const journalStreaks = pgTable("journal_streaks", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  totalEntries: integer("total_entries").default(0),
  lastEntryDate: timestamp("last_entry_date", { withTimezone: true }),
  streakStartDate: timestamp("streak_start_date", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Journal analytics and insights
export const journalAnalytics = pgTable("journal_analytics", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(), // Daily analytics
  entryCount: integer("entry_count").default(0),
  wordCount: integer("word_count").default(0),
  averageMood: real("average_mood"), // Average mood for the day
  dominantEmotions: jsonb("dominant_emotions").$type<string[]>(),
  topTags: jsonb("top_tags").$type<string[]>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

