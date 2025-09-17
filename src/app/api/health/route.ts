import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Health check starting...");
    
    const start = Date.now();
    const totalTime = Date.now() - start;
    console.log(`Total health check took: ${totalTime}ms`);
    
    return NextResponse.json({ 
      status: "ok", 
      message: "API is working",
      totalTime: `${totalTime}ms`,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json({ 
      status: "error", 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}