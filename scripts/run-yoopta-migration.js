#!/usr/bin/env node

/**
 * Script to migrate database to Yoopta Editor format
 * Usage: node scripts/run-yoopta-migration.js
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runYooptaMigration() {
    console.log('🚀 Running Yoopta Editor migration...');

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
        const migrationPath = path.join(__dirname, 'migrate-to-yoopta.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        console.log('📝 Executing Yoopta migration...');
        await client.query(migrationSQL);

        console.log('✅ Yoopta migration completed successfully!');
        console.log('📊 Updated journal_entries table for Yoopta Editor');

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

runYooptaMigration();