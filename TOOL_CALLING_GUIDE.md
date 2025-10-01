# Tool Calling Integration with Assistant UI

This document explains how tool calling has been integrated into the DAKSHA chat interface using AI SDK v5 and Assistant UI.

## Features Implemented

### 1. API Route with Tool Support (`/src/app/api/chat/route.ts`)

The chat API now includes several tools that the AI can call:

#### Available Tools:

1. **Weather Tool** (`getWeather`)
   - Get current weather for any location
   - Supports Celsius and Fahrenheit
   - Example: "What's the weather in San Francisco?"

2. **Time Tool** (`getCurrentTime`)
   - Get current time in any timezone
   - Example: "What time is it in New York?"

3. **Knowledge Search** (`searchKnowledge`)
   - Search through your personal knowledge base
   - Integrates with Mem0 when available
   - Example: "Search for information about machine learning"

4. **Calculator** (`calculator`)
   - Perform mathematical calculations
   - Example: "Calculate 2500 * 12 / 100"

### 2. Custom Tool UI Components

Each tool has a custom UI component that shows:
- Loading states while the tool is running
- Beautifully formatted results
- Error handling with clear messaging

Located in `/src/components/assistant-ui/tools/`:
- `weather-tool-ui.tsx` - Weather card with icons
- `time-tool-ui.tsx` - Time display with timezone info
- `search-tool-ui.tsx` - Search results with relevance scores
- `calculator-tool-ui.tsx` - Mathematical expressions and results

### 3. Multi-Step Tool Execution

The API supports multi-step tool calls using `stepCountIs(5)`, allowing the AI to:
- Call multiple tools in sequence
- Use tool results to inform follow-up actions
- Provide comprehensive responses

## How It Works

### 1. Tool Definition (Server-side)
```typescript
tools: {
  getWeather: {
    description: 'Get the current weather in a given location',
    inputSchema: z.object({
      location: z.string(),
      unit: z.enum(['celsius', 'fahrenheit']).default('celsius'),
    }),
    execute: async ({ location, unit }) => {
      // Tool implementation
    },
  },
}
```

### 2. Tool UI Registration (Client-side)
```typescript
export const WeatherToolUI = makeAssistantToolUI<WeatherArgs, WeatherResult>({
  toolName: 'getWeather',
  render: ({ args, result, status }) => {
    // Custom UI rendering based on tool state
  },
});
```

### 3. Integration in Thread Component
Tool UI components are automatically registered when rendered within the AssistantRuntimeProvider:

```typescript
<WeatherToolUI />
<TimeToolUI />
<SearchToolUI />
<CalculatorToolUI />
```

## Testing the Tools

Try these example prompts in the chat:

1. **Weather**: "What's the weather like in Tokyo today?"
2. **Time**: "What time is it in London right now?"
3. **Search**: "Search for my notes about productivity"
4. **Calculator**: "What's 15% of 2400?"
5. **Combined**: "What's the weather in Paris and what time is it there?"

## Key Features

### Real-time Updates
- Tool execution states are shown in real-time
- Beautiful loading animations
- Progressive result display

### Error Handling
- Graceful fallbacks for failed tool calls
- Clear error messages to users
- Retry mechanisms built-in

### Type Safety
- Full TypeScript support
- Strongly typed tool arguments and results
- Compile-time validation of tool schemas

### Extensibility
- Easy to add new tools
- Modular tool UI components
- Consistent design patterns

## Adding New Tools

1. **Define the tool** in `/src/app/api/chat/route.ts`:
```typescript
newTool: {
  description: 'Description of what the tool does',
  inputSchema: z.object({
    // Define parameters with Zod
  }),
  execute: async ({ param1, param2 }) => {
    // Tool implementation
  },
}
```

2. **Create tool UI** in `/src/components/assistant-ui/tools/`:
```typescript
export const NewToolUI = makeAssistantToolUI<Args, Result>({
  toolName: 'newTool',
  render: ({ args, result, status }) => {
    // Custom UI rendering
  },
});
```

3. **Register the tool UI** in the Thread component:
```typescript
<NewToolUI />
```

## Configuration

### API Route Configuration
- Uses `stepCountIs(5)` for multi-step execution
- Returns `toUIMessageStreamResponse()` for proper streaming
- Includes comprehensive error handling

### Runtime Configuration
The `useChatRuntime` is configured to work with the `/api/chat` endpoint and automatically handles tool streaming.

## Technical Details

- **AI SDK Version**: v5.0+
- **Assistant UI Version**: v0.11+
- **Tool Streaming**: Enabled by default
- **Multi-step Execution**: Up to 5 steps
- **Response Format**: UI Message Stream

This implementation provides a robust foundation for AI tool calling with excellent user experience and developer experience.