import { NextRequest, NextResponse } from "next/server";

// You can replace this with your preferred search API (Tavily, Serper, etc.)
const SEARCH_API_KEY = process.env.SEARCH_API_KEY;
const SEARCH_API_URL = "https://api.tavily.com/search"; // or your preferred search API

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { query: string; maxResults?: number };
    const { query, maxResults = 5 } = body;

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // If no search API key is configured, return a mock response
    if (!SEARCH_API_KEY) {
      return NextResponse.json({
        results: [
          {
            title: "Search functionality not configured",
            url: "#",
            snippet: "To enable web search, please configure your search API keys in the environment variables.",
          },
        ],
        query,
        totalResults: 1,
      });
    }

    // Make request to search API (example using Tavily format)
    const response = await fetch(SEARCH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": SEARCH_API_KEY,
      },
      body: JSON.stringify({
        query,
        max_results: maxResults,
        search_depth: "basic",
        include_answer: false,
        include_images: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }

    const data = await response.json() as { results?: any[] };
    
    // Transform the response to a consistent format
    const results = data.results?.map((item: any) => ({
      title: item.title,
      url: item.url,
      snippet: item.content || item.snippet,
    })) || [];

    return NextResponse.json({
      results,
      query,
      totalResults: results.length,
    });

  } catch (error) {
    console.error("Web search error:", error);
    return NextResponse.json(
      { error: "Failed to perform web search" },
      { status: 500 }
    );
  }
}