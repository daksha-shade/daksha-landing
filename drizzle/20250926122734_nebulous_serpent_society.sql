CREATE TABLE "google_drive_files" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"mime_type" text NOT NULL,
	"size" text,
	"parents" jsonb,
	"web_view_link" text,
	"web_content_link" text,
	"thumbnail_link" text,
	"icon_link" text,
	"shared" boolean DEFAULT false,
	"ai_summary" text,
	"ai_tags" jsonb,
	"embedding_id" text,
	"modified_time" timestamp with time zone,
	"created_time" timestamp with time zone,
	"last_synced" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "google_drive_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text NOT NULL,
	"refresh_token" text NOT NULL,
	"token_type" text DEFAULT 'Bearer',
	"expires_at" timestamp with time zone NOT NULL,
	"scope" text NOT NULL,
	"google_account_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"picture" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
