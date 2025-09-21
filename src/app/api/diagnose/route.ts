import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test without database first
    const basicTest = {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT_SET",
        NODE_ENV: process.env.NODE_ENV || "not set"
      }
    };

    // Now test database connection with timeout
    let dbTest: { status: string; responseTime?: string; error?: string } = { status: "not_tested" };
    
    try {
      console.log("Testing database connection...");
      const dbStart = Date.now();
      
      // Import database client here to avoid blocking the API if there's an import issue
      const { db } = await import("@/db/client");
      
      // Set a manual timeout for the database query
      const queryPromise = db.execute(`SELECT 1 as test`);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Database query timeout")), 5000)
      );
      
      await Promise.race([queryPromise, timeoutPromise]);
      
      const dbTime = Date.now() - dbStart;
      dbTest = { status: "success", responseTime: `${dbTime}ms` };
      
    } catch (dbError) {
      console.error("Database test failed:", dbError);
      dbTest = { 
        status: "error", 
        error: dbError instanceof Error ? dbError.message : "Unknown database error" 
      };
    }

    return NextResponse.json({ 
      basic: basicTest,
      database: dbTest
    });
    
  } catch (error) {
    console.error("Diagnosis failed:", error);
    return NextResponse.json({ 
      status: "error", 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
