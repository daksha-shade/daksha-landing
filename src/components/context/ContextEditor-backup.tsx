"use client";
import { useState } from "react";
import { Plate, usePlateEditor } from 'platejs/react';
import { EditorKit } from '@/components/editor/editor-kit';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { serializeHtml } from 'platejs/serializer-html';

export function ContextEditor({ onSaved }: { onSaved?: () => void }) {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: [
      {
        type: 'p',
        children: [{ text: 'Start writing your context content here...' }],
      },
    ],
  });

  async function handleSave() {
    if (!editor) return;
    
    // Get plain text for embedding
    const plainText = editor.api.markdown.serialize();
    
    if (!title.trim() || !plainText.trim()) {
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
          content: plainText // Send plain text for vector embedding
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      
      // Reset form
      setTitle("");
      editor.api.resetEditor();
      onSaved?.();
    } catch (e: any) {
      alert(`Save failed: ${e?.message ?? e}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <input
        className="w-full rounded border px-3 py-2 bg-background text-foreground"
        placeholder="Context title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <div className="rounded border min-h-[300px]">
        <Plate editor={editor}>
          <EditorContainer>
            <Editor 
              variant="demo" 
              className="min-h-[280px] p-4"
              placeholder="Write your context content here. This will be used to enhance your chat conversations..."
            />
          </EditorContainer>
        </Plate>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-60 transition-opacity"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "Saving..." : "Save Context"}
        </button>
        <button
          className="px-4 py-2 rounded border border-border hover:bg-muted transition-colors"
          onClick={async () => {
            if (!confirm("Import Assistant UI docs into your context?")) return;
            const res = await fetch("/api/context/seed/assistant-ui", { method: "POST" });
            if (!res.ok) {
              alert("Import failed");
            } else {
              alert("Imported Assistant UI docs.");
              onSaved?.();
            }
          }}
        >
          Import Assistant UI docs
        </button>
      </div>
    </div>
  );
}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-2 rounded bg-primary text-primary-foreground disabled:opacity-60"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "Saving..." : "Save Context"}
        </button>
        <button
          className="px-3 py-2 rounded border"
          onClick={async () => {
            if (!confirm("Import Assistant UI docs into your context?")) return;
            const res = await fetch("/api/context/seed/assistant-ui", { method: "POST" });
            if (!res.ok) {
              alert("Import failed");
            } else {
              alert("Imported Assistant UI docs.");
              onSaved?.();
            }
          }}
        >
          Import Assistant UI docs
        </button>
      </div>
    </div>
  );
}
