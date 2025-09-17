-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to existing context_files table
ALTER TABLE "context_files" ADD COLUMN "embedding" vector(1536);