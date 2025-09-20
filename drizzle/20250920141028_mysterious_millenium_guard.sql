CREATE TABLE "journal_analytics" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"entry_count" integer DEFAULT 0,
	"word_count" integer DEFAULT 0,
	"average_mood" real,
	"dominant_emotions" jsonb,
	"top_tags" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"plain_text_content" text,
	"type" text DEFAULT 'text' NOT NULL,
	"mood" text,
	"mood_intensity" integer,
	"emotional_tags" jsonb,
	"tags" jsonb,
	"location" text,
	"weather" text,
	"audio_url" text,
	"video_url" text,
	"image_urls" jsonb,
	"attachment_urls" jsonb,
	"duration" integer,
	"transcript" text,
	"transcript_confidence" real,
	"ai_summary" text,
	"ai_insights" jsonb,
	"ai_questions" jsonb,
	"is_private" boolean DEFAULT true,
	"share_token" text,
	"embedding" vector(1536),
	"entry_date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_streaks" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"current_streak" integer DEFAULT 0,
	"longest_streak" integer DEFAULT 0,
	"total_entries" integer DEFAULT 0,
	"last_entry_date" timestamp with time zone,
	"streak_start_date" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_templates" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"name" text NOT NULL,
	"description" text,
	"prompts" jsonb,
	"category" text,
	"is_system" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
