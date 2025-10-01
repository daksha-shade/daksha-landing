Got it 🚀 — let’s create a **full documentation-style guide** on how to save **Assistant-UI chat threads/history** to **Postgres** using **Drizzle ORM**.

This doc will cover:

1. The **schema** (threads + messages).
2. The **ThreadHistoryAdapter** interface.
3. The **Drizzle implementation** (saving/loading).
4. Example integration in **Assistant-UI runtime**.

---

# 📘 Saving Assistant-UI Chat Threads to Postgres with Drizzle ORM

Assistant-UI doesn’t provide storage out-of-the-box. Instead, it defines the `ThreadHistoryAdapter` interface so you can plug in any database.
This guide shows how to implement **Postgres storage with Drizzle**.

---

## 1. Install dependencies

```bash
npm install drizzle-orm pg postgres
npm install -D drizzle-kit
```

---

## 2. Define your schema with Drizzle

We’ll create two tables:

* **threads** → represents a conversation
* **messages** → stores chat messages inside a thread

```ts
// db/schema.ts
import {
  pgTable, uuid, text, timestamp, serial
} from "drizzle-orm/pg-core";

export const threads = pgTable("threads", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").default("New Chat"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  threadId: uuid("thread_id").notNull().references(() => threads.id, { onDelete: "cascade" }),
  role: text("role").notNull(), // "user" | "assistant" | "system"
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

Run migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

---

## 3. Connect Drizzle to Postgres

```ts
// db/client.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. "postgres://user:pass@localhost:5432/mydb"
});

export const db = drizzle(pool, { schema });
```

---

## 4. Implement the `ThreadHistoryAdapter`

Assistant-UI expects this interface:

```ts
type ThreadHistoryAdapter = {
  load: (threadId: string) => Promise<{ messages: Array<Message> }>;
  append: (threadId: string, message: Message) => Promise<void>;
};
```

Where `Message` matches Assistant-UI’s internal message format.

### Drizzle implementation:

```ts
// adapters/pgHistoryAdapter.ts
import { db } from "../db/client";
import { messages, threads } from "../db/schema";
import { eq, desc } from "drizzle-orm";

// Map DB rows ↔ Assistant-UI messages
type Role = "user" | "assistant" | "system";

export interface UIMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: Date;
}

export const pgHistoryAdapter = {
  async load(threadId: string) {
    const rows = await db
      .select()
      .from(messages)
      .where(eq(messages.threadId, threadId))
      .orderBy(desc(messages.createdAt));

    return {
      messages: rows.map((row) => ({
        id: String(row.id),
        role: row.role as Role,
        content: row.content,
        createdAt: row.createdAt,
      })),
    };
  },

  async append(threadId: string, message: UIMessage) {
    await db.insert(messages).values({
      threadId,
      role: message.role,
      content: message.content,
    });
  },
};
```

---

## 5. Using it in Assistant-UI

Now you can plug this adapter into Assistant-UI’s runtime:

```tsx
import { useLocalRuntime } from "assistant-ui/react";
import { OpenAIAdapter } from "assistant-ui/adapters/openai";
import { pgHistoryAdapter } from "./adapters/pgHistoryAdapter";

export function ChatApp() {
  const runtime = useLocalRuntime(OpenAIAdapter, {
    adapters: { history: pgHistoryAdapter },
  });

  return <Chat runtime={runtime} />;
}
```

---

## 6. Extending schema for advanced features

You can expand the schema to match ChatGPT-like functionality:

* Add **tool calls**:

  ```ts
  toolName: text("tool_name"),
  toolArgs: jsonb("tool_args"),
  toolResult: jsonb("tool_result"),
  ```

* Add **embeddings for semantic search**:

  ```ts
  embedding: jsonb("embedding"),
  ```

* Add **metadata**:

  ```ts
  metadata: jsonb("metadata"),
  ```

---

## ✅ Summary

1. Define `threads` + `messages` schema in Drizzle.
2. Implement `ThreadHistoryAdapter` to connect Assistant-UI to Postgres.
3. Plug your adapter into Assistant-UI runtime.
4. Extend schema with tool support, embeddings, metadata as needed.

This gives you **ChatGPT-style persistent history** in Postgres, fully compatible with Assistant-UI.

---

👉 Do you want me to also include a **ready-made migration SQL** (so you don’t rely only on drizzle-kit) and an example **REST API layer** for history (`/threads/:id/history`)? That way you could run it in a serverless backend too.
