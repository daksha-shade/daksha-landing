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
                eq(journalTemplates.isSystem, true),
                eq(journalTemplates.userId, user.id)
            )
        ];

        if (category) {
            conditions.push(eq(journalTemplates.category, category));
        }

        const templates = await db
            .select()
            .from(journalTemplates)
            .where(or(...conditions))
            .orderBy(desc(journalTemplates.isSystem), desc(journalTemplates.createdAt));

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

        const body = await req.json();
        const { name, description, prompts, category } = body;

        if (!name || !prompts || !Array.isArray(prompts)) {
            return NextResponse.json(
                { error: "Name and prompts array are required" },
                { status: 400 }
            );
        }

        const id = crypto.randomUUID();

        await db.insert(journalTemplates).values({
            id,
            userId: user.id,
            name,
            description,
            prompts,
            category,
            isSystem: false,
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