"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContextEditor({ onSaved }: { onSaved?: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and some content.");
      return;
    }
    
    setSaving(true);
    try {
      const res = await fetch("/api/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: title.trim(), 
          content: content.trim()
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      
      // Reset form
      setTitle("");
      setContent("");
      onSaved?.();
    } catch (e: any) {
      alert(`Save failed: ${e?.message ?? e}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Context title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your context content here. This will be used to enhance your chat conversations..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] resize-y"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "Saving..." : "Save Context"}
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            if (!confirm("Import Assistant UI docs into your context?")) return;
            setSaving(true);
            try {
              const res = await fetch("/api/context/seed/assistant-ui", { method: "POST" });
              if (!res.ok) {
                alert("Import failed");
              } else {
                alert("Imported Assistant UI docs.");
                onSaved?.();
              }
            } finally {
              setSaving(false);
            }
          }}
        >
          Import Assistant UI docs
        </Button>
      </div>
    </div>
  );
}