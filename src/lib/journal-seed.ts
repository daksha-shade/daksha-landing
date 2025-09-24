import "server-only";
import { db } from "@/db/client";
import { journalEntries, journalTemplates, journalStreaks, journalAnalytics } from "@/db/schema";
import { embedText, storeEmbeddingsInMilvus } from "@/lib/embeddings";
import { eq } from "drizzle-orm";

const SAMPLE_TEMPLATES = [
    {
        name: "Daily Reflection",
        description: "Simple daily check-in prompts",
        category: "daily",
        prompts: [
            "How am I feeling right now?",
            "What went well today?",
            "What challenged me today?",
            "What am I grateful for?",
            "What do I want to focus on tomorrow?"
        ]
    },
    {
        name: "Gratitude Practice",
        description: "Focus on appreciation and positive moments",
        category: "gratitude",
        prompts: [
            "What are three things I'm grateful for today?",
            "Who made a positive impact on my day?",
            "What small moment brought me joy?",
            "How did I grow or learn something new today?",
            "What am I looking forward to?"
        ]
    },
    {
        name: "Goal Setting",
        description: "Reflect on goals and progress",
        category: "goals",
        prompts: [
            "What progress did I make toward my goals today?",
            "What obstacles did I encounter?",
            "What would I do differently?",
            "What support do I need to succeed?",
            "How will I celebrate my progress?"
        ]
    },
    {
        name: "Emotional Processing",
        description: "Work through difficult emotions",
        category: "emotions",
        prompts: [
            "What emotions am I experiencing right now?",
            "What triggered these feelings?",
            "How are these emotions serving me?",
            "What do I need right now to feel better?",
            "What would I tell a friend in this situation?"
        ]
    },
    {
        name: "Creative Inspiration",
        description: "Explore creativity and ideas",
        category: "creativity",
        prompts: [
            "What inspired me today?",
            "What new idea am I excited about?",
            "How did I express my creativity?",
            "What would I create if I had unlimited resources?",
            "What story do I want to tell?"
        ]
    }
];

// Helper: build minimal Yoopta content with paragraphs (YooptaContentValue)
const createYooptaContent = (text: string) => {
    const mapping: Record<string, any> = {};
    const paragraphs = text.split('\n\n').filter(Boolean);
    paragraphs.forEach((paragraph, index) => {
        const id = String(index + 1);
        mapping[id] = {
            id,
            type: 'Paragraph',
            value: [
                {
                    id: `${id}-p`,
                    type: 'paragraph',
                    children: [{ text: paragraph }],
                },
            ],
            meta: { order: index, depth: 0 },
        };
    });
    if (paragraphs.length === 0) {
        mapping['1'] = {
            id: '1',
            type: 'Paragraph',
            value: [{ id: '1-p', type: 'paragraph', children: [{ text: '' }] }],
            meta: { order: 0, depth: 0 },
        };
    }
    return mapping;
};

// Back-compat for existing SAMPLE_ENTRIES using Plate-like content
const createPlateContent = (text: string) => text;

const SAMPLE_ENTRIES = [
    {
        title: "Morning Coffee Reflections",
        content: createPlateContent("Sitting with my coffee this morning, I'm struck by how peaceful the early hours are. The world feels full of possibility when it's quiet like this. I've been thinking about the conversation I had with Sarah yesterday about taking more risks in life. She's right that I tend to play it safe, but maybe that's not always serving me well.\n\nI want to be more intentional about stepping outside my comfort zone this week. Small steps, but meaningful ones."),
        markdownContent: "Sitting with my coffee this morning, I'm struck by how peaceful the early hours are. The world feels full of possibility when it's quiet like this. I've been thinking about the conversation I had with Sarah yesterday about taking more risks in life. She's right that I tend to play it safe, but maybe that's not always serving me well.\n\nI want to be more intentional about stepping outside my comfort zone this week. Small steps, but meaningful ones.",
        type: "text",
        mood: "contemplative",
        moodIntensity: 6,
        emotionalTags: ["peaceful", "reflective", "hopeful"],
        tags: ["morning", "coffee", "reflection", "growth"],
        location: "Home",
        weather: "Sunny"
    },
    {
        title: "Gratitude for Small Moments",
        content: createPlateContent("Today I'm grateful for:\n\n1. The way the sunlight streamed through my kitchen window this morning\n2. My neighbor's friendly wave when I was getting the mail\n3. Finding that book I'd been looking for at the library\n4. The perfect temperature for my evening walk\n5. My cat's purring while I read before bed\n\nIt's amazing how much joy can be found in these tiny, everyday moments when I actually pay attention to them."),
        markdownContent: "Today I'm grateful for:\n\n1. The way the sunlight streamed through my kitchen window this morning\n2. My neighbor's friendly wave when I was getting the mail\n3. Finding that book I'd been looking for at the library\n4. The perfect temperature for my evening walk\n5. My cat's purring while I read before bed\n\nIt's amazing how much joy can be found in these tiny, everyday moments when I actually pay attention to them.",
        type: "text",
        mood: "grateful",
        moodIntensity: 8,
        emotionalTags: ["grateful", "content", "peaceful"],
        tags: ["gratitude", "mindfulness", "daily life"],
        location: "Home"
    },
    {
        title: "Challenging Day at Work",
        content: createPlateContent("Work was particularly stressful today. The project deadline got moved up, and I felt overwhelmed trying to coordinate with the team. I noticed I was getting short with people, which isn't like me.\n\nTaking a step back now, I realize I was putting too much pressure on myself to have all the answers. It's okay to ask for help and to admit when something feels too big to handle alone. Tomorrow I'm going to reach out to my manager about redistributing some of the workload.\n\nI'm proud of myself for recognizing these feelings instead of just pushing through them."),
        markdownContent: "Work was particularly stressful today. The project deadline got moved up, and I felt overwhelmed trying to coordinate with the team. I noticed I was getting short with people, which isn't like me.\n\nTaking a step back now, I realize I was putting too much pressure on myself to have all the answers. It's okay to ask for help and to admit when something feels too big to handle alone. Tomorrow I'm going to reach out to my manager about redistributing some of the workload.\n\nI'm proud of myself for recognizing these feelings instead of just pushing through them.",
        type: "text",
        mood: "stressed",
        moodIntensity: 4,
        emotionalTags: ["overwhelmed", "frustrated", "self-aware"],
        tags: ["work", "stress", "self-reflection", "growth"],
        location: "Office"
    },
    {
        title: "Weekend Adventure",
        content: createPlateContent("Went hiking with friends today at the state park. It felt so good to be outdoors and moving my body after a week of sitting at my desk. The trail was more challenging than expected, but that made reaching the summit even more rewarding.\n\nWe sat at the top for almost an hour, just talking and enjoying the view. These are the moments that remind me what's really important - connection, nature, and being present. I want to make sure I prioritize more experiences like this.\n\nAlready planning our next adventure!"),
        markdownContent: "Went hiking with friends today at the state park. It felt so good to be outdoors and moving my body after a week of sitting at my desk. The trail was more challenging than expected, but that made reaching the summit even more rewarding.\n\nWe sat at the top for almost an hour, just talking and enjoying the view. These are the moments that remind me what's really important - connection, nature, and being present. I want to make sure I prioritize more experiences like this.\n\nAlready planning our next adventure!",
        type: "text",
        mood: "energized",
        moodIntensity: 9,
        emotionalTags: ["joyful", "accomplished", "connected"],
        tags: ["hiking", "friends", "nature", "adventure", "weekend"],
        location: "State Park",
        weather: "Clear"
    },
    {
        title: "Late Night Thoughts",
        content: createPlateContent("Can't sleep tonight. My mind keeps racing with thoughts about the future. Sometimes I feel like I'm exactly where I'm supposed to be, and other times I wonder if I'm wasting time or missing opportunities.\n\nI think this restlessness is actually a good sign though - it means I'm not settling for complacency. I'm growing and changing, and that can feel uncomfortable sometimes. Maybe the uncertainty is part of the journey.\n\nGoing to try some deep breathing and see if I can quiet my mind enough to rest."),
        markdownContent: "Can't sleep tonight. My mind keeps racing with thoughts about the future. Sometimes I feel like I'm exactly where I'm supposed to be, and other times I wonder if I'm wasting time or missing opportunities. I think this restlessness is actually a good sign though - it means I'm not settling for complacency. I'm growing and changing, and that can feel uncomfortable sometimes. Maybe the uncertainty is part of the journey. Going to try some deep breathing and see if I can quiet my mind enough to rest.",
        type: "text",
        mood: "anxious",
        moodIntensity: 5,
        emotionalTags: ["restless", "uncertain", "philosophical"],
        tags: ["late night", "future", "anxiety", "growth", "uncertainty"],
        location: "Home"
    }
];

export async function deleteAllJournalData(userId: string) {
    try {
        console.log("Deleting all journal data for user:", userId);

        // Delete journal entries
        await db.delete(journalEntries).where(eq(journalEntries.userId, userId));

        // Delete journal streaks
        await db.delete(journalStreaks).where(eq(journalStreaks.userId, userId));

        // Delete journal analytics
        await db.delete(journalAnalytics).where(eq(journalAnalytics.userId, userId));

        // Delete user-created templates (keep system templates)
        await db.delete(journalTemplates).where(eq(journalTemplates.userId, userId));

        console.log("All journal data deleted successfully!");
    } catch (error) {
        console.error("Error deleting journal data:", error);
        throw error;
    }
}

export async function seedJournalData(userId: string, forceReseed = false) {
    try {
        console.log("Seeding journal data for user:", userId);

        // Check if user already has journal entries (unless forcing reseed)
        if (!forceReseed) {
            const existingEntries = await db
                .select()
                .from(journalEntries)
                .where(eq(journalEntries.userId, userId))
                .limit(1);

            if (existingEntries.length > 0) {
                console.log("User already has journal entries, skipping seed");
                return;
            }
        }

        // Seed templates (system templates)
        console.log("Seeding journal templates...");
        for (const template of SAMPLE_TEMPLATES) {
            await db.insert(journalTemplates).values({
                id: crypto.randomUUID(),
                userId: null, // System template
                name: template.name,
                description: template.description,
                prompts: template.prompts,
                category: template.category,
                isSystem: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        // Seed journal entries
        console.log("Seeding journal entries...");
        const now = new Date();

        for (let i = 0; i < SAMPLE_ENTRIES.length; i++) {
            const entry = SAMPLE_ENTRIES[i];

            // Create entries over the past week
            const entryDate = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));

            // Normalize to Yoopta + plain text
            const plain = (entry as any).plainTextContent
                || (entry as any).markdownContent
                || (Array.isArray((entry as any).content)
                    ? (entry as any).content.map((p: any) => (p?.children?.[0]?.text || '')).join('\n\n')
                    : '');
            const yooptaValue = (entry as any).yooptaContent || createYooptaContent(plain);

            // Generate embedding
            const embedding = await embedText(plain);
            const id = crypto.randomUUID();

            await db.insert(journalEntries).values({
                id,
                userId,
                title: entry.title,
                yooptaContent: yooptaValue,
                plainTextContent: plain,
                type: entry.type,
                mood: entry.mood,
                moodIntensity: entry.moodIntensity,
                emotionalTags: entry.emotionalTags,
                tags: entry.tags,
                location: entry.location,
                weather: entry.weather,
                entryDate,
                createdAt: entryDate,
                updatedAt: entryDate,
            });

            await storeEmbeddingsInMilvus([embedding], [id], "journal_entries");
        }

        // Create streak data
        console.log("Creating streak data...");
        await db.insert(journalStreaks).values({
            id: crypto.randomUUID(),
            userId,
            currentStreak: 5,
            longestStreak: 12,
            totalEntries: SAMPLE_ENTRIES.length,
            lastEntryDate: now,
            streakStartDate: new Date(now.getTime() - (4 * 24 * 60 * 60 * 1000)),
            updatedAt: now,
        });

        // Create analytics data for the past week
        console.log("Creating analytics data...");
        for (let i = 0; i < 7; i++) {
            const analyticsDate = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
            analyticsDate.setHours(0, 0, 0, 0);

            // Find entries for this date
            const dayEntries = SAMPLE_ENTRIES.filter((_, index) => index === i);

            if (dayEntries.length > 0) {
                const entry = dayEntries[0];

                await db.insert(journalAnalytics).values({
                    id: crypto.randomUUID(),
                    userId,
                    date: analyticsDate,
                    entryCount: 1,
                    wordCount: (entry as any).plainTextContent
                        ? (entry as any).plainTextContent.split(' ').length
                        : ((entry as any).markdownContent
                            ? (entry as any).markdownContent.split(' ').length
                            : (Array.isArray((entry as any).content)
                                ? (entry as any).content.map((p: any) => (p?.children?.[0]?.text || '')).join(' ').split(' ').length
                                : 0)),
                    averageMood: entry.moodIntensity,
                    dominantEmotions: entry.emotionalTags,
                    topTags: entry.tags,
                    createdAt: analyticsDate,
                });
            }
        }

        console.log("Journal data seeded successfully!");
    } catch (error) {
        console.error("Error seeding journal data:", error);
        throw error;
    }
}