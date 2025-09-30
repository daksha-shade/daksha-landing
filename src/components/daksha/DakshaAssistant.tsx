"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function DakshaAssistant() {
  const runtime = useChatRuntime();
  const [filter, setFilter] = useState("");

  const samplePrompts = [
    "Summarize my latest journal entries",
    "When did I last meet Sara?",
    "What were my top moods last week?",
    "Draft a message to thank John for yesterday's meeting",
    "Create a plan for this week based on my goals",
  ];

  const knowledgeBadges = [
    "Personal journals",
    "Context files",
    "Goals",
  ];

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-[calc(100vh-6rem)] grid-cols-[260px_1fr_340px] gap-4">
        {/* Left: Threads */}
        <div className="border rounded-lg overflow-hidden">
          <div className="p-3 border-b">
            <Input
              placeholder="Search conversations..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="h-full overflow-hidden">
            <ThreadList />
          </div>
        </div>

        {/* Center: Chat */}
        <div className="border rounded-lg overflow-hidden">
          <Thread />
        </div>

        {/* Right: Hints & Connected Sources */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Connected knowledge</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {knowledgeBadges.map((b) => (
                <Badge key={b} variant="secondary" className="text-xs">
                  {b}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Try asking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {samplePrompts.map((p, i) => (
                <div key={i} className="rounded-md border p-2 hover:bg-muted/60 cursor-pointer" onClick={() => runtime?.append?.({ role: 'user', content: p })}>
                  {p}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Use your journals and context files as memory. Ask Daksha to summarize, compare, or extract details.</p>
              <p>Follow-up questions refine results — Daksha carries the context forward.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}

