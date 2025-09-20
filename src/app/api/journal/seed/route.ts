import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { seedJournalData } from "@/lib/journal-seed";

export async function POST(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await seedJournalData(user.id);

        return NextResponse.json({
            message: "Journal data seeded successfully",
            userId: user.id
        });
    } catch (error) {
        console.error("Journal seed error:", error);
        return NextResponse.json({ error: "Failed to seed journal data" }, { status: 500 });
    }
}