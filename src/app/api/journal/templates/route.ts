import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/db/client";
import { journalTemplates } from "@/db/schema";
import { eq, or, isNull, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        // Get both system templates and user's custom templates
        let conditions = [
            or(
                isNull(journalTemplates.userId), // System templates have no userId
                eq(journalTemplates.userId, user.id)
            )
        ];

        const templates = await db
            .select()
            .from(journalTemplates)
            .where(or(...conditions))
            .orderBy(desc(journalTemplates.createdAt));

        return NextResponse.json({ templates });
    } catch (error) {
        console.error("Journal templates GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser({ or: "return-null" });
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = (await req.json()) as any;
        const { name, description, content } = body;

        if (!name || !content) {
            return NextResponse.json(
                { error: "Name and content are required" },
                { status: 400 }
            );
        }

        const id = crypto.randomUUID();

        await db.insert(journalTemplates).values({
            id,
            userId: user.id,
            name,
            description,
            content,
            isPublic: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({
            id,
            message: "Template created successfully"
        });
    } catch (error) {
        console.error("Journal templates POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
