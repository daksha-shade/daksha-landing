CREATE TABLE "context_files" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"source_url" text,
	"embedding_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"yoopta_content" jsonb,
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
	"ai_sentiment" jsonb,
	"embedding_id" text,
	"is_private" boolean DEFAULT true,
	"share_token" text,
	"entry_date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"display_name" text,
	"profile_image_url" text,
	"primary_email" text,
	"primary_email_verified" text,
	"client_metadata" jsonb,
	"server_metadata" jsonb,
	"oauth_providers" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone
);
