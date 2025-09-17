-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

--> statement-breakpoint
CREATE TABLE "context_files" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(1536),
	"source_url" text,
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
