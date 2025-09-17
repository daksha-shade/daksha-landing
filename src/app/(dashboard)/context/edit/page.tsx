"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContextEditPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const contextId = searchParams.get('id')
  const isEdit = !!contextId

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEdit)

  useEffect(() => {
    async function loadContextData() {
      if (isEdit && contextId) {
        setLoading(true)
        try {
          const res = await fetch(`/api/context/${contextId}`)
          if (!res.ok) throw new Error("Failed to load context")
          const context = await res.json() as { title: string; content: string }
          setTitle(context.title || "")
          setContent(context.content || "")
        } catch (error) {
          console.error("Error loading context:", error)
          alert("Failed to load context")
          router.push("/context")
        } finally {
          setLoading(false)
        }
      }
    }
    
    loadContextData()
  }, [contextId, isEdit, router])

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and some content.")
      return
    }
    
    setSaving(true)
    try {
      const url = isEdit ? `/api/context/${contextId}` : "/api/context"
      const method = isEdit ? "PUT" : "POST"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: title.trim(), 
          content: content.trim()
        }),
      })
      
      if (!res.ok) throw new Error(await res.text())
      
      // Navigate back to context list
      router.push("/context")
    } catch (e: any) {
      alert(`Save failed: ${e?.message ?? e}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/context")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Context
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              disabled={saving || !title.trim() || !content.trim()}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Context
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Context" : "Create New Context"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit 
              ? "Update your context file content"
              : "Create a new context file to enhance your AI conversations"
            }
          </p>
        </div>

        {/* Editor Card */}
        <Card>
          <CardHeader>
            <CardTitle>Context Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title for your context..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your context content here. This will be used to enhance your chat conversations with relevant information..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] resize-y font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Tip: Include relevant information, documentation, or knowledge that you want the AI to reference during conversations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/context")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !title.trim() || !content.trim()}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEdit ? "Update Context" : "Create Context"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}