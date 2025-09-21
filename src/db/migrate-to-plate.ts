import { db } from './client';
import { journalEntries } from './schema';
import { sql } from 'drizzle-orm';

/**
 * Migration script to update journal entries schema for Plate.js
 * This script:
 * 1. Adds markdownContent column
 * 2. Removes plainTextContent column
 * 3. Updates content to store Plate.js JSON format
 */

export async function migrateToPlate() {
    console.log('🔄 Starting migration to Plate.js format...');

    try {
        // Step 1: Add markdownContent column
        console.log('📝 Adding markdownContent column...');
        await db.execute(sql`
      ALTER TABLE journal_entries 
      ADD COLUMN IF NOT EXISTS markdown_content TEXT
    `);

        // Step 2: Update content column to JSONB
        console.log('🔧 Updating content column to JSONB...');
        await db.execute(sql`
      ALTER TABLE journal_entries 
      ALTER COLUMN content TYPE JSONB USING content::jsonb
    `);

        // Step 3: Migrate existing data
        console.log('📊 Migrating existing data...');

        // Get all entries with plainTextContent
        const entries = await db.execute(sql`
      SELECT id, plain_text_content, content 
      FROM journal_entries 
      WHERE plain_text_content IS NOT NULL
    `);

        console.log(`Found ${entries.rows.length} entries to migrate`);

        for (const entry of entries.rows) {
            const id = entry.id;
            const plainText = entry.plain_text_content as string;

            // Create Plate.js content from plain text
            const plateContent = plainText.split('\n\n').map(paragraph => ({
                type: 'p',
                children: [{ text: paragraph }]
            }));

            // Update the entry
            await db.execute(sql`
        UPDATE journal_entries 
        SET 
          content = ${JSON.stringify(plateContent)},
          markdown_content = ${plainText}
        WHERE id = ${id}
      `);
        }

        // Step 4: Drop plainTextContent column
        console.log('🗑️ Dropping plainTextContent column...');
        await db.execute(sql`
      ALTER TABLE journal_entries 
      DROP COLUMN IF EXISTS plain_text_content
    `);

        console.log('✅ Migration completed successfully!');

        return {
            success: true,
            migratedEntries: entries.rows.length
        };
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    }
}

// Run migration if called directly
if (require.main === module) {
    migrateToPlate()
        .then((result) => {
            console.log(`🎉 Migration completed! Migrated ${result.migratedEntries} entries.`);
            process.exit(0);
        })
        .catch((error) => {
            console.error('Migration failed:', error);
            process.exit(1);
        });
}