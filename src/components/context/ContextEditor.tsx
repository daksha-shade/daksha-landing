"use client";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function ContextEditor({ onSaved }: { onSaved?: () => void }) {
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!editor) return;
    const html = editor.getHTML();
    // Convert to plain text by stripping tags for embedding simplicity
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const plain = tmp.textContent || tmp.innerText || "";
    if (!title.trim() || !plain.trim()) {
      alert("Please enter a title and some content.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: plain }),
      });
      if (!res.ok) throw new Error(await res.text());
      setTitle("");
      editor.commands.clearContent();
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
      <div className="rounded border p-2 min-h-[240px]">
        <EditorContent editor={editor} />
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
