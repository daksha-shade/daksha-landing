-- Migrate journal_entries table to work with Yoopta Editor
-- This migration updates the content structure for Yoopta Editor

-- Drop the existing markdown_content column if it exists
ALTER TABLE journal_entries DROP COLUMN IF EXISTS markdown_content;

-- Rename content to yoopta_content for clarity
ALTER TABLE journal_entries RENAME COLUMN content TO yoopta_content;

-- Add a plain text content column for search and LLM processing
ALTER TABLE journal_entries ADD COLUMN IF NOT EXISTS plain_text_content TEXT;

-- Create an index on plain_text_content for better search performance
CREATE INDEX IF NOT EXISTS idx_journal_entries_plain_text_content 
ON journal_entries USING gin(to_tsvector('english', plain_text_content));

-- Update existing entries to have plain_text_content based on existing yoopta_content
-- This is a one-time migration for existing data
UPDATE journal_entries 
SET plain_text_content = COALESCE(
  CASE 
    WHEN yoopta_content IS NOT NULL THEN 
      -- Extract text from Yoopta JSON content (simplified approach)
      regexp_replace(yoopta_content::text, '[{}"\[\],:]', ' ', 'g')
    ELSE ''
  END,
  ''
)
WHERE plain_text_content IS NULL;