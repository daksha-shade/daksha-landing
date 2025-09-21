-- Add markdown_content column to journal_entries table
-- This migration adds the markdown_content column for storing markdown versions of journal entries

ALTER TABLE journal_entries 
ADD COLUMN IF NOT EXISTS markdown_content TEXT;

-- Create an index on markdown_content for better search performance
CREATE INDEX IF NOT EXISTS idx_journal_entries_markdown_content 
ON journal_entries USING gin(to_tsvector('english', markdown_content));

-- Update existing entries to have markdown_content based on existing content
-- This is a one-time migration for existing data
UPDATE journal_entries 
SET markdown_content = COALESCE(
  CASE 
    WHEN content IS NOT NULL THEN 
      -- Extract text from JSON content (simplified approach)
      regexp_replace(content::text, '[{}"\[\]]', '', 'g')
    ELSE ''
  END,
  ''
)
WHERE markdown_content IS NULL;