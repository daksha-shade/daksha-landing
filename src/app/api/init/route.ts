import { NextResponse } from "next/server";
import { ensureCollection } from "@/lib/qdrant";
import { EMBEDDING_DIMS } from "@/lib/embeddings";
import { ensureDbSchema } from "@/db/sync";

export async function POST() {
  try {
    console.log("Initializing database schema...");
    await ensureDbSchema();
    
    console.log("Initializing Qdrant collection...");
    await ensureCollection(EMBEDDING_DIMS);
    
    return NextResponse.json({ 
      success: true, 
      message: "Database and vector store initialized successfully" 
    });
  } catch (error) {
    console.error("Initialization error:", error);
    return NextResponse.json(
      { 
        error: "Failed to initialize", 
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}