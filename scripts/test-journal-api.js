#!/usr/bin/env node

/**
 * Script to test journal API functionality
 * Usage: node scripts/test-journal-api.js
 */

async function testJournalAPI() {
    const baseUrl = 'http://localhost:3000';

    console.log('🧪 Testing Journal API...\n');

    try {
        // Test 1: Delete and reseed data
        console.log('1️⃣ Testing delete and reseed...');
        const seedResponse = await fetch(`${baseUrl}/api/journal/seed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deleteFirst: true })
        });

        if (seedResponse.ok) {
            const seedResult = await seedResponse.json();
            console.log('✅ Seed successful:', seedResult.message);
        } else {
            console.log('❌ Seed failed:', await seedResponse.text());
            return;
        }

        // Test 2: Get journal entries
        console.log('\n2️⃣ Testing get journal entries...');
        const getResponse = await fetch(`${baseUrl}/api/journal?limit=10&offset=0`);

        if (getResponse.ok) {
            const getResult = await getResponse.json();
            console.log('✅ Get entries successful');
            console.log(`📊 Found ${getResult.entries.length} entries`);

            if (getResult.entries.length > 0) {
                const firstEntry = getResult.entries[0];
                console.log(`📝 First entry: "${firstEntry.title}"`);
                console.log(`🔧 Content type: ${typeof firstEntry.content}`);

                // Check if content is properly stored as JSON string
                if (typeof firstEntry.content === 'string') {
                    try {
                        const parsedContent = JSON.parse(firstEntry.content);
                        console.log('✅ Content is valid JSON string');
                        console.log(`📄 Content structure: ${parsedContent.type || 'unknown'}`);
                    } catch (e) {
                        console.log('⚠️  Content is string but not JSON:', firstEntry.content.substring(0, 100) + '...');
                    }
                } else {
                    console.log('⚠️  Content is not a string:', typeof firstEntry.content);
                }
            }
        } else {
            console.log('❌ Get entries failed:', await getResponse.text());
        }

        console.log('\n🎉 Journal API test completed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('💡 Make sure your development server is running on http://localhost:3000');
    }
}

testJournalAPI();