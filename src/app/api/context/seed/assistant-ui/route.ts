import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { createContextFileForUser } from "@/lib/context-service";

export const runtime = "nodejs";

export async function POST(_req: NextRequest) {
  try {
    const user = await stackServerApp.getUser({ or: "return-null" });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = "https://www.assistant-ui.com/llms.txt";
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch docs: ${res.status}`);
    const text = await res.text();

    const title = "Assistant UI LLMs Docs";
    const created = await createContextFileForUser({
      userId: user.id,
      title,
      content: text,
      sourceUrl: url,
    });
    return NextResponse.json({ id: created.id });
  } catch (e: any) {
    console.error("seed assistant-ui error", e);
    return NextResponse.json({ error: e?.message ?? "Internal Error" }, { status: 500 });
  }
}
