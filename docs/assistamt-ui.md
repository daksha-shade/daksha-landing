================
CODE SNIPPETS
================
TITLE: Set Up and Run AI SDK v5 Example Project
DESCRIPTION: This snippet provides the necessary steps to get the AI SDK v5 example project running locally, including installing Node.js dependencies, configuring environment variables with an Anthropic API key, and starting the development server.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/with-ai-sdk-v5/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install
```

LANGUAGE: bash
CODE:
```
cp .env.example .env.local
```

LANGUAGE: text
CODE:
```
ANTHROPIC_API_KEY=your-api-key-here
```

LANGUAGE: bash
CODE:
```
npm run dev
```

--------------------------------

TITLE: Run LangGraph Assistant UI Example Locally
DESCRIPTION: Provides the commands to install project dependencies and start the development server for the LangGraph assistant-ui example, allowing local testing and interaction.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/with-langgraph/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
npm install
npm run dev
```

--------------------------------

TITLE: Run Assistant-UI Parent ID Grouping Example
DESCRIPTION: Provides the necessary bash commands to install project dependencies and start the development server for the `assistant-ui` parent ID grouping example. This allows users to run and interact with the example locally.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/with-parent-id-grouping/README.md#_snippet_1

LANGUAGE: bash
CODE:
```
npm install

npm run dev
```

--------------------------------

TITLE: Install AI Provider SDKs for Backend Integration
DESCRIPTION: These shell commands facilitate the installation of essential npm packages required to integrate various AI providers into your application. Each command installs the core `ai` and `@assistant-ui/react-ai-sdk` libraries, along with the specific SDK for a chosen AI provider (e.g., OpenAI, Anthropic, Azure, AWS, Gemini, GCP, Groq, Fireworks, Cohere, Ollama, Chrome AI). This setup is crucial for enabling communication with their respective AI models and building AI-powered features.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_25

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/openai
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/anthropic
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/azure
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/amazon-bedrock
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/google
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/google-vertex
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/openai
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/openai
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/cohere
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk ollama-ai-provider
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk chrome-ai
```

--------------------------------

TITLE: Add assistant-ui to an existing React project
DESCRIPTION: This command facilitates the integration of `assistant-ui` into an already existing React application. It streamlines the setup process for current projects.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_1

LANGUAGE: sh
CODE:
```
# Add assistant-ui to an existing React project
npx assistant-ui@latest init
```

--------------------------------

TITLE: Start the assistant-ui development server
DESCRIPTION: Command to launch the development server for the `assistant-ui` application. This allows developers to run and test their project locally during development.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_3

LANGUAGE: sh
CODE:
```
npm run dev
```

--------------------------------

TITLE: Install Core Assistant UI Dependencies (Without Tailwind)
DESCRIPTION: Provides the `npm install` command to add all necessary packages for `assistant-ui` when not using the Tailwind CSS integration. This includes `@assistant-ui/react`, `@assistant-ui/styles`, `@radix-ui` components, and utility libraries like `lucide-react` and `clsx`.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_5

LANGUAGE: sh
CODE:
```
npm install \
  @assistant-ui/react \
  @assistant-ui/react-markdown \
  @assistant-ui/styles \
  @radix-ui/react-tooltip \
  @radix-ui/react-slot \
  lucide-react \
  remark-gfm \
  class-variance-authority \
  clsx
```

--------------------------------

TITLE: Initialize a new assistant-ui project
DESCRIPTION: Commands to create a new project using the `assistant-ui` CLI. Users can choose between a default template, a LangGraph-specific template, or a template with MCP support.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
# Create a new project with the default template
npx assistant-ui@latest create

# Or start with a template:
# LangGraph
npx assistant-ui@latest create -t langgraph

# MCP support
npx assistant-ui@latest create -t mcp
```

--------------------------------

TITLE: Add Assistant UI Thread Components (Tailwind)
DESCRIPTION: Demonstrates the recommended method to quickly add `thread` and `thread-list` components to a project using `npx assistant-ui add`. This approach is optimized for projects utilizing Tailwind CSS, streamlining the setup process.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_4

LANGUAGE: sh
CODE:
```
npx assistant-ui add thread thread-list
```

--------------------------------

TITLE: Configure Environment Variables for AI Providers
DESCRIPTION: This section provides examples of how to define API keys and other necessary credentials for various AI service providers in a `.env.local` file. These environment variables are crucial for authenticating requests to the respective AI models.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_28

LANGUAGE: sh
CODE:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
ANTHROPIC_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
AZURE_RESOURCE_NAME="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AZURE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
AWS_ACCESS_KEY_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_REGION="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GOOGLE_GENERATIVE_AI_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GOOGLE_VERTEX_PROJECT="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_VERTEX_LOCATION="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_APPLICATION_CREDENTIALS="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GROQ_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
FIREWORKS_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
COHERE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: Start the Next.js development server
DESCRIPTION: This command initiates the local development server for the Next.js application. Once the server is running, the frontend can be accessed in a web browser, typically at `http://localhost:3000`, allowing for real-time development and testing.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/tutorial/part-1.mdx#_snippet_2

LANGUAGE: sh
CODE:
```
npm run dev
```

--------------------------------

TITLE: Install assistant-ui and LangGraph SDK dependencies
DESCRIPTION: Install the required npm packages for integrating Assistant UI components and the LangGraph SDK into an existing React project. These dependencies provide the core UI components and the client for interacting with the LangGraph API.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_2

LANGUAGE: sh
CODE:
```
npm install @assistant-ui/react @assistant-ui/react-ui @assistant-ui/react-langgraph @langchain/langgraph-sdk
```

--------------------------------

TITLE: Create a Tooltip Component (React/TypeScript)
DESCRIPTION: Provides the TypeScript React implementation for a `Tooltip` component, built upon `@radix-ui/react-tooltip`. This component includes `TooltipProvider`, `Tooltip`, `TooltipTrigger`, and `TooltipContent`, offering a customizable and accessible tooltip solution for non-Tailwind setups.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_7

LANGUAGE: tsx
CODE:
```
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("aui-tooltip-content", className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

--------------------------------

TITLE: Build the Main Assistant UI Thread Component (React/TypeScript)
DESCRIPTION: Presents the core `Thread` component for `assistant-ui`, showcasing its structure and integration with various primitive components like `ActionBarPrimitive`, `ComposerPrimitive`, and `MessagePrimitive`. This example is part of the manual setup for projects without Tailwind, demonstrating how to assemble the main chat interface.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_8

LANGUAGE: tsx
CODE:
```
import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import type { FC } from "react";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="aui-root aui-thread-root"
      style={{
        ["--thread-max-width" as string]: "42rem",
      }}
    >
      <ThreadPrimitive.Viewport className="aui-thread-viewport">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage: UserMessage,
            EditComposer: EditComposer,
            AssistantMessage: AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className="aui-thread-viewport-spacer" />
        </ThreadPrimitive.If>

        <div className="aui-thread-viewport-footer">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="aui-thread-scroll-to-bottom"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="aui-thread-welcome-root">
        <div className="aui-thread-welcome-center">
          <p className="aui-thread-welcome-message">
            How can I help you today?
          </p>
        </div>
        <ThreadWelcomeSuggestions />
      </div>
    </ThreadPrimitive.Empty>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  return (
    <div className="aui-thread-welcome-suggestions">
      <ThreadPrimitive.Suggestion
        className="aui-thread-welcome-suggestion"
        prompt="What is the weather in Tokyo?"
        method="replace"
        autoSend
      >
        <span className="aui-thread-welcome-suggestion-text">
```

--------------------------------

TITLE: Create new project with LangGraph assistant-ui template
DESCRIPTION: Use npx to scaffold a new project based on the LangGraph assistant-ui template. This command initializes a new directory with the necessary project structure and configurations.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
npx create-assistant-ui@latest -t langgraph my-app
```

--------------------------------

TITLE: Import Pre-compiled Assistant UI CSS Styles
DESCRIPTION: This example demonstrates how to import pre-compiled CSS files for the Assistant UI components. These imports are necessary when not using a framework like Tailwind CSS to generate styles, providing ready-to-use styling for the UI elements. It includes imports for general styles and specific markdown-related styles.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_24

LANGUAGE: ts
CODE:
```
import "@assistant-ui/styles/index.css";
import "@assistant-ui/styles/markdown.css";
// import "@assistant-ui/styles/modal.css";  // for future reference, only if you use our modal component
```

--------------------------------

TITLE: Initialize Assistant UI in New or Existing Projects
DESCRIPTION: Start by setting up Assistant UI in your project. These commands install necessary dependencies and create basic configuration files, including a default chat API route, for either a new or an existing project.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/mastra/full-stack-integration.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
npx assistant-ui@latest create
```

LANGUAGE: sh
CODE:
```
npx assistant-ui@latest init
```

--------------------------------

TITLE: Configure OpenAI API Key and Chat History URL
DESCRIPTION: Instructions for setting up environment variables in a `.env` file. This includes adding your OpenAI API key, which is essential for the application's functionality, and optionally configuring a base URL for chat history services.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_2

LANGUAGE: plaintext
CODE:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# chat history -- sign up for free on https://cloud.assistant-ui.com
# NEXT_PUBLIC_ASSISTANT_BASE_URL="https://..."
```

--------------------------------

TITLE: Render Welcome Suggestions in React
DESCRIPTION: This React component displays initial suggestions to the user within a conversational UI. It utilizes `ThreadPrimitive.Suggestion` to create clickable prompts that can either replace the current input or be sent automatically upon selection, enhancing user interaction at the start of a conversation.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_9

LANGUAGE: JSX
CODE:
```
      <ThreadPrimitive.Suggestion
        className="aui-thread-welcome-suggestion"
        prompt="What is the weather in Tokyo?"
        method="replace"
        autoSend
      >
        <span className="aui-thread-welcome-suggestion-text">
          What is the weather in Tokyo?
        </span>
      </ThreadPrimitive.Suggestion>
      <ThreadPrimitive.Suggestion
        className="aui-thread-welcome-suggestion"
        prompt="What is assistant-ui?"
        method="replace"
        autoSend
      >
        <span className="aui-thread-welcome-suggestion-text">
          What is assistant-ui?
        </span>
      </ThreadPrimitive.Suggestion>
    </div>
  );
};
```

--------------------------------

TITLE: Run Example Project in Development Mode
DESCRIPTION: These commands allow you to navigate into a specific example project directory and then run it in development mode. Replace `<your-example>` with the actual name of the example you wish to run.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/CONTRIBUTING.md#_snippet_3

LANGUAGE: sh
CODE:
```
cd examples/<your-example>
pnpm dev
```

--------------------------------

TITLE: Initialize assistant-ui Project
DESCRIPTION: These commands provide a quick way to get started with assistant-ui. Use `npx assistant-ui create` to scaffold a new project with assistant-ui pre-configured, or `npx assistant-ui init` to add assistant-ui to an existing React application, streamlining the integration process.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx assistant-ui create   # new project
npx assistant-ui init     # add to existing project
```

--------------------------------

TITLE: Define Chat API Route with AI Models
DESCRIPTION: This section demonstrates how to set up a Next.js API route (`/api/chat`) for streaming chat responses using various AI models from different providers. Each example shows the necessary imports, the `maxDuration` constant, and the `POST` function that processes incoming messages and streams text responses.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_27

LANGUAGE: ts
CODE:
```
baseURL: "https://api.fireworks.ai/inference/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: fireworks("accounts/fireworks/models/firefunction-v2"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { cohere } from "@ai-sdk/cohere";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: cohere("command-r-plus"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { ollama } from "ollama-ai-provider";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: ollama("llama3"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { chromeai } from "chrome-ai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: chromeai(),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

--------------------------------

TITLE: Create a new Mastra server project using npx
DESCRIPTION: Initiates a new Mastra server project via `npx create-mastra@latest`. This command scaffolds a standalone AI backend, guiding the user through an interactive setup process. It prepares the directory for further Mastra development.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/mastra/separate-server-integration.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-mastra@latest
```

LANGUAGE: bash
CODE:
```
cd your-mastra-server-directory
```

--------------------------------

TITLE: Install and Manage assistant-ui MCP Server via Claude Code CLI
DESCRIPTION: Commands to add the `@assistant-ui/mcp-docs-server` to your Claude Code project or globally, enabling direct access to `assistant-ui` documentation. Includes commands for listing, getting details, and removing the server.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/mcp-docs-server.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
# Add to current project only
claude mcp add assistant-ui -- npx -y @assistant-ui/mcp-docs-server

# Or add globally for all projects
claude mcp add --scope user assistant-ui -- npx -y @assistant-ui/mcp-docs-server
```

LANGUAGE: bash
CODE:
```
# View configured servers
claude mcp list

# Get server details
claude mcp get assistant-ui

# Remove the server
claude mcp remove assistant-ui
```

--------------------------------

TITLE: Setup and Run assistant-stream State Management Test Server
DESCRIPTION: These commands provide the necessary steps to set up the local development environment and run the test server for the `assistant-stream` state management project. It involves installing required Python packages and then launching the server application.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/python/state-test/README.md#_snippet_0

LANGUAGE: Shell
CODE:
```
pip install -r requirements.txt
```

LANGUAGE: Shell
CODE:
```
python server.py
```

--------------------------------

TITLE: Install Assistant UI Sync Server API
DESCRIPTION: Instructions for installing the `assistant-ui-sync-server-api` Python package using either `pip` or `uv` package managers.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/python/assistant-ui-sync-server-api/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
pip install assistant-ui-sync-server-api
```

LANGUAGE: bash
CODE:
```
uv add assistant-ui-sync-server-api
```

--------------------------------

TITLE: Configure LangGraph Environment Variables
DESCRIPTION: This section provides example environment variables for configuring the LangGraph API URL and assistant ID. It distinguishes between production variables (commented out) and development variables, noting that the development URL (`NEXT_PUBLIC_LANGGRAPH_API_URL`) does not require an API key.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_7

LANGUAGE: sh
CODE:
```
# LANGCHAIN_API_KEY=your_api_key # for production
# LANGGRAPH_API_URL=your_api_url # for production
NEXT_PUBLIC_LANGGRAPH_API_URL=your_api_url # for development (no api key required)
NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID=your_graph_id
```

--------------------------------

TITLE: Use MyAssistant Component in Next.js Page
DESCRIPTION: This snippet demonstrates how to import and render the `MyAssistant` component within a Next.js `Home` page. It shows a basic setup for displaying the assistant UI by wrapping it in a `main` element with full viewport height.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_6

LANGUAGE: tsx
CODE:
```
import { MyAssistant } from "@/components/MyAssistant";

export default function Home() {
  return (
    <main className="h-dvh">
      <MyAssistant />
    </main>
  );
}
```

--------------------------------

TITLE: Assistant UI Codemod Example Usage with Dry Run and Directory Targeting
DESCRIPTION: These examples illustrate practical applications of the codemod. The first demonstrates a dry run to preview changes without applying them. The subsequent examples show how to apply the transformation to a specific `src/` directory or the entire project by specifying `.` as the path.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/packages/cli/src/codemods/v0-11/README.md#_snippet_7

LANGUAGE: bash
CODE:
```
# Preview changes without applying them
npx @assistant-ui/cli codemod v0-11/content-part-to-message-part src/ --dry

# Apply the transformation to your src directory
npx @assistant-ui/cli codemod v0-11/content-part-to-message-part src/

# Apply to entire project
npx @assistant-ui/cli codemod v0-11/content-part-to-message-part .
```

--------------------------------

TITLE: Install KaTeX and Remark/Rehype dependencies
DESCRIPTION: This command installs the necessary npm packages: `katex` for rendering, `rehype-katex` for integrating KaTeX with rehype, and `remark-math` for parsing math syntax with remark.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/guides/Latex.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
npm i katex rehype-katex remark-math
```

--------------------------------

TITLE: Create a new Next.js project with LangGraph template
DESCRIPTION: This command initializes a new Next.js application using the `create-assistant-ui` CLI tool, specifically with the `langgraph` template. It also navigates into the newly created project directory, preparing it for further development.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/tutorial/part-1.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
npx create-assistant-ui@latest -t langgraph my-app
cd my-app
```

--------------------------------

TITLE: Install Assistant-UI MCP Server with Claude Code
DESCRIPTION: Instructions for adding the Assistant-UI MCP Docs Server to your current project or globally for all projects using the `claude mcp add` command-line interface.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/packages/mcp-docs-server/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
# Add to current project
claude mcp add assistant-ui -- npx -y @assistant-ui/mcp-docs-server

# Or add globally for all projects
claude mcp add --scope user assistant-ui -- npx -y @assistant-ui/mcp-docs-server
```

--------------------------------

TITLE: Implement Backend API Endpoints for AI Chat Streaming
DESCRIPTION: These TypeScript code examples illustrate how to create a backend API endpoint, typically located at `/app/api/chat/route.ts`, designed to handle chat requests and stream responses from various AI models. Each example demonstrates the configuration of a specific AI provider's SDK (e.g., OpenAI, Anthropic, Azure, AWS, Gemini, GCP, Groq, Fireworks) to process incoming user messages, convert them into the model's required format, and efficiently stream the generated text back to the client-side UI. The `maxDuration` is set to 30 seconds, and the endpoint expects a JSON payload containing a `messages` array as input.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_26

LANGUAGE: ts
CODE:
```
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { azure } from "@ai-sdk/azure";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: azure("your-deployment-name"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { bedrock } from "@ai-sdk/amazon-bedrock";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: bedrock("anthropic.claude-3-5-sonnet-20240620-v1:0"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { vertex } from "@ai-sdk/google-vertex";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: vertex("gemini-1.5-pro"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: groq("llama3-70b-8192"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

LANGUAGE: ts
CODE:
```
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

const fireworks = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY ?? "",

```

--------------------------------

TITLE: Basic Setup for Vercel AI SDK Chat Runtime with Assistant UI
DESCRIPTION: This snippet demonstrates the fundamental integration of `@assistant-ui/react-ai-sdk` with `@assistant-ui/react`. It shows how to use `useChatRuntime` to get a runtime instance, which by default employs `AssistantChatTransport` for automatic system message and tool forwarding, and then provides it to `AssistantRuntimeProvider`.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/packages/react-ai-sdk/README.md#_snippet_0

LANGUAGE: typescript
CODE:
```
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { AssistantRuntimeProvider } from '@assistant-ui/react';

function App() {
  // By default, uses AssistantChatTransport which forwards system messages and tools
  const runtime = useChatRuntime();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* Your assistant UI components */}
    </AssistantRuntimeProvider>
  );
}
```

--------------------------------

TITLE: Install @assistant-ui/react-data-stream package
DESCRIPTION: Instructions to install the `@assistant-ui/react-data-stream` package using npm or yarn, which provides integration with data stream protocol endpoints.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/data-stream.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-data-stream
```

--------------------------------

TITLE: Install assistant-stream with LangGraph Integration
DESCRIPTION: Instructions to install the `assistant-stream` package with the necessary LangGraph dependencies using pip.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/python/assistant-stream/README_LANGGRAPH.md#_snippet_0

LANGUAGE: bash
CODE:
```
pip install assistant-stream[langgraph]
```

--------------------------------

TITLE: Convert LangChain Messages to Assistant-UI Format
DESCRIPTION: This example demonstrates using `convertLangChainMessages` to transform messages from LangChain's format into the format expected by `assistant-ui`. This conversion utility is crucial for ensuring compatibility between the backend's message structures and the frontend's display requirements.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_9

LANGUAGE: typescript
CODE:
```
import { convertLangChainMessages } from "@assistant-ui/react-langgraph";

const threadMessage = convertLangChainMessages(langChainMessage);
```

--------------------------------

TITLE: Install shadcn/ui Button Component
DESCRIPTION: This command installs the `Button` component from shadcn/ui, which is a prerequisite for the fallback UI. It uses `npx` to execute the `shadcn` CLI tool to add the component to the project's dependencies and generate its code.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/tutorial/part-2.mdx#_snippet_7

LANGUAGE: sh
CODE:
```
npx shadcn@latest add button
```

--------------------------------

TITLE: Add conversation starter suggestions to Thread component
DESCRIPTION: This TypeScript/React code modifies the `Home` component to embed predefined conversation starter suggestions within the `Thread` component. These suggestions appear to users, guiding them on potential interactions and capabilities of the assistant.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/tutorial/part-1.mdx#_snippet_3

LANGUAGE: tsx
CODE:
```
export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Thread
        welcome={{
          suggestions: [
            {
              prompt: "How much revenue did Apple make last year?",
            },
            {
              prompt: "Is McDonald's profitable?",
            },
            {
              prompt: "What's the current stock price of Tesla?",
            },
          ],
        }}
        assistantMessage={{ components: { Text: MarkdownText } }}
      />
    </div>
  );
}
```

--------------------------------

TITLE: Backend API Route for Workspace Auth Token (Clerk Example)
DESCRIPTION: This example shows a Next.js API route (`/app/api/assistant-ui-token/route.ts`) that generates an `assistant-ui` workspace auth token. It uses Clerk to get the authenticated user's `userId` and `orgId`, constructs a `workspaceId`, and then uses `AssistantCloud` with an API key to create a short-lived token for the frontend.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/cloud/authorization.mdx#_snippet_1

LANGUAGE: ts
CODE:
```
import { AssistantCloud } from "@assistant-ui/react";
import { auth } from "@clerk/nextjs/server";
 
export const POST = async (req: Request) => {
  const { userId, orgId } = await auth();
 
  if (!userId) throw new Error("User not authenticated");
 
  const workspaceId = orgId ? `${orgId}:${userId}` : userId;
  const assistantCloud = new AssistantCloud({
    apiKey: process.env["ASSISTANT_API_KEY"]!,
    userId,
    workspaceId,
  });
  const {token} = await assistantCloud.auth.tokens.create();

  return new Response(token);
};
```

--------------------------------

TITLE: Install Assistant UI React Dependencies
DESCRIPTION: This snippet demonstrates how to install the `@assistant-ui/react` package using npm or yarn. This is the foundational step required to begin integrating the Assistant UI library into your project.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/custom/external-store.mdx#_snippet_1

LANGUAGE: sh
CODE:
```
npm install @assistant-ui/react
```