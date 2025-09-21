#!/usr/bin/env node

/**
 * Script to run database migrations
 * Usage: node scripts/run-migration.js
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
    console.log('🚀 Running database migration...');

    // Get database URL from environment
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('❌ DATABASE_URL environment variable is required');
        process.exit(1);
    }

    const client = new Client({
        connectionString: databaseUrl,
    });

    try {
        await client.connect();
        console.log('✅ Connected to database');

        // Read the migration SQL file
        const migrationPath = path.join(__dirname, 'add-markdown-content-column.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        console.log('📝 Executing migration...');
        await client.query(migrationSQL);

        console.log('✅ Migration completed successfully!');
        console.log('📊 Added markdown_content column to journal_entries table');

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

runMigration();