import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { seedJournalData, deleteAllJournalData } from "@/lib/journal-seed";

export async function POST(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = (await req.json().catch(() => ({}))) as any;
        const { deleteFirst = false } = body;

        if (deleteFirst) {
            await deleteAllJournalData(user.id);
        }

        await seedJournalData(user.id, deleteFirst);

        return NextResponse.json({
            message: deleteFirst ? "Journal data deleted and reseeded successfully" : "Journal data seeded successfully",
            userId: user.id
        });
    } catch (error) {
        console.error("Journal seed error:", error);
        return NextResponse.json({ error: "Failed to seed journal data" }, { status: 500 });
    }
}
