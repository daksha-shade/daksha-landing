# Context File System

This document explains the comprehensive context file system that enhances your chat experience with semantic search and vector embeddings.

## Overview

The context file system allows you to:

- Create and manage rich-text context files using a Plate.js editor
- Automatically generate vector embeddings using OpenAI's embedding model
- Store embeddings in Qdrant vector database for fast semantic search
- Retrieve relevant context during chat conversations for enhanced AI responses
- Search your knowledge base using natural language queries

## Features

### 📝 Rich Text Editor

- **Plate.js Integration**: Full-featured rich text editor with formatting, lists, links, and more
- **Auto-save**: Context files are saved to PostgreSQL database
- **Version Control**: Track creation and update timestamps

### 🔍 Vector Search

- **OpenAI Embeddings**: Uses `text-embedding-3-small` model (1536 dimensions)
- **Qdrant Storage**: High-performance vector database for similarity search
- **Semantic Search**: Find relevant content using natural language queries
- **Chunk Processing**: Large texts are intelligently chunked for better search results

### 💬 Chat Integration

- **Priority Context**: Context files take priority over general knowledge
- **Automatic Retrieval**: Relevant context is automatically found and included
- **Score-based Ranking**: Results ranked by semantic similarity
- **Real-time Search**: Context retrieved in real-time during conversations

## Architecture

```
User Input → Plate.js Editor → PostgreSQL (metadata)
                           ↘
                             OpenAI Embeddings → Qdrant (vectors)
                                              ↘
Chat Query → Vector Search → Context Retrieval → Enhanced AI Response
```

## Database Schema

### Context Files Table

```sql
CREATE TABLE context_files (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,           -- Raw content for embedding
  source_url TEXT,                 -- Optional URL reference
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Context Embeddings Table

```sql
CREATE TABLE context_embeddings (
  id TEXT PRIMARY KEY,             -- Same as Qdrant point ID
  context_file_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  chunk_text TEXT NOT NULL,       -- Text chunk used for embedding
  model TEXT NOT NULL,            -- Embedding model used
  dims INTEGER NOT NULL,          -- Vector dimensions
  metadata JSONB,                 -- Additional metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## API Endpoints

### Context Files

- `GET /api/context` - List user's context files
- `POST /api/context` - Create new context file
- `DELETE /api/context/[id]` - Delete context file and embeddings

### Context Search

- `POST /api/context/search` - Search context using semantic similarity

### System Initialization

- `POST /api/init` - Initialize database schema and Qdrant collection

## Usage Guide

### 1. Creating Context Files

Navigate to `/context` and use the rich text editor to create context files:

```typescript
// Example: Creating a context file
const contextFile = {
  title: "Project Documentation",
  content:
    "This project uses Next.js, TypeScript, and Qdrant for vector search...",
};
```

### 2. Searching Context

Test your context search on the `/context` page:

```typescript
// Example: Searching context
const searchQuery = "How do I set up vector search?";
const results = await fetch("/api/context/search", {
  method: "POST",
  body: JSON.stringify({ query: searchQuery, limit: 5 }),
});
```

### 3. Chat Integration

The chat system automatically uses your context files:

1. User asks a question in `/chat`
2. System searches context files for relevant information
3. Top matches are included as priority context
4. AI responds using both context and general knowledge

## Configuration

### Environment Variables

```bash
# OpenAI for embeddings
OPENAI_API_KEY=your_openai_api_key

# Qdrant vector database
QDRANT_URL=https://your-cluster.qdrant.io:6333
QDRANT_API_KEY=your_qdrant_api_key

# PostgreSQL database
DATABASE_URL=postgresql://user:password@host:5432/database
```

### Embedding Settings

```typescript
// Current configuration
const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSION = 1536;
const MAX_CHUNK_SIZE = 1200; // characters
const SEARCH_SCORE_THRESHOLD = 0.2;
```

## Best Practices

### Content Creation

1. **Clear Titles**: Use descriptive titles for better organization
2. **Structured Content**: Use headings, lists, and clear paragraphs
3. **Specific Information**: Include specific details, examples, and procedures
4. **Regular Updates**: Keep context files current and relevant

### Search Optimization

1. **Natural Language**: Use natural language queries for best results
2. **Specific Terms**: Include specific technical terms or keywords
3. **Context Relevance**: Create context files for topics you frequently discuss
4. **Test Searches**: Use the search feature to validate your context files

## Troubleshooting

### Common Issues

**No Search Results**

- Check if context files exist and contain relevant content
- Try different search terms or phrases
- Verify Qdrant connection and API key

**Context Not Appearing in Chat**

- Ensure context files are created and saved
- Check that search terms in chat match context content
- Verify OpenAI API key for embeddings

**Database Errors**

- Run `npm run db:test` to check database connectivity
- Ensure DATABASE_URL is properly formatted and encoded
- Check that all required tables exist

### Debug Commands

```bash
# Test database connection
npm run db:test

# Initialize database and Qdrant
curl -X POST http://localhost:3000/api/init

# Test context search
curl -X POST http://localhost:3000/api/context/search \
  -H "Content-Type: application/json" \
  -d '{"query": "your search term"}'
```

## Files and Components

### Core Files

- `/src/lib/qdrant.ts` - Qdrant client configuration
- `/src/lib/embeddings.ts` - OpenAI embedding utilities
- `/src/lib/context-service.ts` - Context file CRUD operations
- `/src/components/context/ContextEditor.tsx` - Rich text editor
- `/src/components/context/ContextSearch.tsx` - Search interface

### API Routes

- `/src/app/api/context/route.ts` - Context file CRUD
- `/src/app/api/context/search/route.ts` - Semantic search
- `/src/app/api/context/[id]/route.ts` - Individual file operations
- `/src/app/api/chat/route.ts` - Chat with context integration

### Database

- `/src/db/schema.ts` - Database schema definitions
- `/src/db/sync.ts` - Schema synchronization utilities

## Performance Considerations

- **Chunking**: Large texts are automatically chunked for optimal embedding
- **Caching**: Consider implementing Redis caching for frequent searches
- **Batch Processing**: Embeddings are processed efficiently in batches
- **Index Optimization**: Qdrant uses cosine similarity for fast searches

## Security

- **User Isolation**: Context files are isolated per user
- **API Authentication**: All endpoints require valid StackAuth session
- **Input Validation**: Content and queries are validated before processing
- **Rate Limiting**: Consider implementing rate limiting for embedding requests
