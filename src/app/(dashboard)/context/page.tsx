
"use client";
import { useEffect, useState } from "react";
import { ContextEditor } from "@/components/context/ContextEditor";

type ContextFile = { id: string; title: string; updatedAt: string };

export default function ContextPage() {
  const [items, setItems] = useState<ContextFile[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/context");
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      setItems(json.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-4 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Context</h1>
        <p className="text-sm text-muted-foreground">
          Create reference context files. These are prioritized in chat.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-medium">New Context</h2>
        <ContextEditor onSaved={load} />
      </div>

      <div className="space-y-2">
        <h2 className="font-medium">Your Context Files</h2>
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-muted-foreground">No context files yet.</div>
        ) : (
          <ul className="divide-y rounded border">
            {items.map((it) => (
              <li key={it.id} className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-muted-foreground">Updated {new Date(it.updatedAt).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
