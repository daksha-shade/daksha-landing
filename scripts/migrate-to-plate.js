#!/usr/bin/env node

/**
 * Script to migrate journal entries to Plate.js format
 * Usage: node scripts/migrate-to-plate.js
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function migrateToPlate() {
    console.log('🚀 Plate.js Migration Script');
    console.log('This will migrate your journal entries to use Plate.js editor format.');
    console.log('⚠️  This will modify your database schema and data!');

    rl.question('\nAre you sure you want to continue? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() !== 'yes') {
            console.log('❌ Migration cancelled.');
            rl.close();
            return;
        }

        try {
            console.log('\n🔄 Starting migration...');

            const response = await fetch('http://localhost:3000/api/migrate/plate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Success:', result.message);
                console.log(`📊 Migrated ${result.migratedEntries} journal entries`);
                console.log('🎉 Your journal now uses the new Plate.js editor!');
            } else {
                const error = await response.json();
                console.error('❌ Error:', error.error);
                if (error.details) {
                    console.error('Details:', error.details);
                }
            }
        } catch (error) {
            console.error('❌ Network error:', error.message);
            console.log('💡 Make sure your development server is running on http://localhost:3000');
        }

        rl.close();
    });
}

migrateToPlate();