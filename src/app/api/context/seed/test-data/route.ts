import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { createContextFileForUser } from "@/lib/context-service";

// export const runtime = "nodejs";

export async function GET(_req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Create sample personal data that includes birthday information
    const personalData = [
      {
        title: "Personal Information",
        content: `Personal details and important dates:

Birthday: March 15, 1990
Age: 34 years old
Favorite color: Blue
Favorite food: Italian cuisine
Location: San Francisco, California
Occupation: Software Developer

Important anniversaries:
- Wedding anniversary: June 22, 2018
- First job: September 10, 2012
- Graduation: May 15, 2011

Goals for this year:
- Learn a new programming language
- Travel to Japan
- Read 24 books
- Exercise regularly`,
      },
      {
        title: "Daily Journal - Today",
        content: `Today's reflections:

Had a great day working on the Daksha project. Really excited about the AI agent capabilities we're building. The chat interface is coming along nicely.

Mood: Happy and productive
Energy level: High
Accomplishments:
- Fixed the context search functionality
- Improved tool integration
- Made progress on the chat suggestions

Tomorrow's plans:
- Continue working on the AI tools
- Test the birthday search functionality
- Add more context to the system`,
      },
      {
        title: "Favorite Memories",
        content: `Special moments I want to remember:

Birthday celebration last year (March 15, 2024): Had an amazing surprise party with family and friends. The cake was chocolate with strawberries - my absolute favorite.

Best vacation: Trip to Italy in summer 2023. Loved the pasta in Rome and the sunset in Venice.

Career milestone: Got promoted to Senior Developer in January 2024. Very proud of this achievement.

Personal growth: Started journaling regularly in 2024. It's been incredibly helpful for self-reflection and tracking my progress.`,
      }
    ];

    const createdIds = [];
    
    for (const data of personalData) {
      const created = await createContextFileForUser({
        userId: user.id,
        title: data.title,
        content: data.content,
      });
      createdIds.push(created.id);
    }

    return NextResponse.json({ 
      message: "Test data seeded successfully",
      createdIds,
      count: createdIds.length 
    });
  } catch (e: any) {
    console.error("seed test data error", e);
    return NextResponse.json({ error: e?.message ?? "Internal Error" }, { status: 500 });
  }
}