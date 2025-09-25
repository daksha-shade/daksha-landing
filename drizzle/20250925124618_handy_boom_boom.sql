CREATE TABLE "notes" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"category" text DEFAULT 'Personal' NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"is_favorite" boolean DEFAULT false,
	"ai_generated" boolean DEFAULT false,
	"embedding_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
