import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { searchUserContext } from "@/lib/context-service";

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as { query: string; limit?: number };
    const { query, limit = 5 } = body;
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: "Query is required and must be a string" },
        { status: 400 }
      );
    }

    const results = await searchUserContext(user.id, query, limit);
    
    return NextResponse.json({
      query,
      results: results.map(result => ({
        id: result.id,
        score: result.score,
        contextFileId: result.payload?.contextFileId,
        title: result.payload?.title,
        chunkText: result.payload?.chunkText,
        sourceUrl: result.payload?.sourceUrl,
      }))
    });
  } catch (error) {
    console.error("Error searching context:", error);
    return NextResponse.json(
      { error: "Failed to search context" },
      { status: 500 }
    );
  }
}