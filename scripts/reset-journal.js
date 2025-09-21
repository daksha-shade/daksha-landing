#!/usr/bin/env node

/**
 * Script to delete all journal entries and reseed with sample data
 * Usage: node scripts/reset-journal.js
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function resetJournal() {
    console.log('🗑️  Journal Reset Script');
    console.log('This will delete ALL journal entries and reseed with sample data.');
    console.log('⚠️  This action cannot be undone!');

    rl.question('\nAre you sure you want to continue? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() !== 'yes') {
            console.log('❌ Operation cancelled.');
            rl.close();
            return;
        }

        try {
            console.log('\n🔄 Deleting all journal data and reseeding...');

            const response = await fetch('http://localhost:3000/api/journal/seed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deleteFirst: true })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Success:', result.message);
                console.log('🎉 Journal has been reset with sample data!');
            } else {
                const error = await response.json();
                console.error('❌ Error:', error.error || 'Failed to reset journal');
            }
        } catch (error) {
            console.error('❌ Network error:', error.message);
            console.log('💡 Make sure your development server is running on http://localhost:3000');
        }

        rl.close();
    });
}

resetJournal();