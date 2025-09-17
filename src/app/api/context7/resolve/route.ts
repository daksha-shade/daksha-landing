import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { libraryName } = await req.json() as { libraryName: string };

    if (!libraryName || typeof libraryName !== 'string') {
      return NextResponse.json(
        { error: "Library name is required" },
        { status: 400 }
      );
    }

    // For now, return a simple mapping for common libraries
    // In a real implementation, you would use the actual Context7 MCP
    const libraryMappings: Record<string, string> = {
      "react": "/facebook/react",
      "nextjs": "/vercel/next.js", 
      "next.js": "/vercel/next.js",
      "prisma": "/prisma/prisma",
      "vercel ai sdk": "/vercel/ai",
      "ai sdk": "/vercel/ai",
      "supabase": "/supabase/supabase",
      "tailwind": "/tailwindcss/tailwindcss",
      "tailwindcss": "/tailwindcss/tailwindcss",
    };

    const libraryId = libraryMappings[libraryName.toLowerCase()];
    
    if (!libraryId) {
      // Default to a generic format
      return NextResponse.json({ 
        libraryId: `/${libraryName.toLowerCase()}/${libraryName.toLowerCase()}` 
      });
    }

    return NextResponse.json({ libraryId });

  } catch (error) {
    console.error("Context7 resolve error:", error);
    return NextResponse.json(
      { error: "Failed to resolve library" },
      { status: 500 }
    );
  }
}