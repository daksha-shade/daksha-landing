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
CREATE TABLE "journal_streaks" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"current_streak" integer,
	"longest_streak" integer,
	"total_entries" integer,
	"last_entry_date" timestamp with time zone,
	"streak_start_date" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
