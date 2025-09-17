"use client";
import { useState } from "react";

interface SearchResult {
  id: string;
  score: number;
  contextFileId: string;
  title: string;
  chunkText: string;
  sourceUrl?: string;
}

export function ContextSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  async function handleSearch() {
    if (!query.trim()) return;
    
    setSearching(true);
    try {
      const res = await fetch("/api/context/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), limit: 10 }),
      });
      
      if (!res.ok) throw new Error(await res.text());
      
      const data = await res.json() as { results: SearchResult[] };
      setResults(data.results || []);
      setLastQuery(query.trim());
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed");
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">Test Context Search</h3>
        <p className="text-sm text-muted-foreground">
          Search your context files using semantic similarity. This is how the chat will find relevant context.
        </p>
      </div>
      
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2 bg-background text-foreground"
          placeholder="Search your context..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-60"
          disabled={searching || !query.trim()}
          onClick={handleSearch}
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>

      {lastQuery && (
        <div className="space-y-3">
          <div className="text-sm">
            <span className="font-medium">Results for:</span> "{lastQuery}"
            {results.length > 0 && (
              <span className="text-muted-foreground ml-2">
                ({results.length} matches)
              </span>
            )}
          </div>
          
          {results.length === 0 ? (
            <div className="text-sm text-muted-foreground p-4 border rounded bg-muted/30">
              No matching context found. Try a different search term.
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="p-3 border rounded bg-card space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{result.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Score: {(result.score * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-3">
                    {result.chunkText}
                  </div>
                  {result.sourceUrl && (
                    <div className="text-xs text-muted-foreground">
                      Source: {result.sourceUrl}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}