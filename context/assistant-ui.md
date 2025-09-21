================
CODE SNIPPETS
================
TITLE: Setup UI Components Guide
DESCRIPTION: Instructions on how to set up UI components for the Assistant UI. This section references the shadcn-ui guide for detailed steps.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: html
CODE:
```
<h3 id="setup-ui-components" class="flex scroll-m-28 flex-row items-center gap-2">
  Setup UI components
  <a data-card="" href="#setup-ui-components" class="peer">
  </a>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" aria-label="Link to section">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
</h3>
<p>
  Follow the 
  <a href="/docs/ui/shadcn-ui/Thread">
    UI Components
  </a> 
  guide to setup the UI components.
</p>
```

--------------------------------

TITLE: Setup Backend Endpoint for Assistant UI
DESCRIPTION: This example demonstrates setting up a backend endpoint. It requires a backend server and defines how Assistant UI communicates with it.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });
    res.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
```

--------------------------------

TITLE: Getting Started Guide with Backend Walkthroughs
DESCRIPTION: This snippet provides instructions for getting started with Assistant UI. It guides users to create an account on the Assistant Cloud Dashboard and follow specific walkthroughs for integrating with backends like AI SDK and LangGraph.

SOURCE: https://assistant-ui.com/docs/cloud/overview

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"41:[\"$\",\"h2\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"getting-started\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#getting-started\",\"className\":\"peer\",\"children\":\"Getting Started\"}],[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\",\"aria-label\":\"Link to section\",\"children\":[[[\"$\",\"path\",\"1cjeqo\",{\"d\":\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"}],[\"$\",\"path\",\"19qd67\",{\"d\":\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"}]},\"$undefined\"]}]]}]\n42:[\"$\",\"p\",null,{\"children\":[\"To get started, create an account at \",[\"$\",\"$Le\",null,{\"href\":\"https://cloud.assistant-ui.com/\",\"children\":\"Assistant Cloud Dashboard\"}],\" and follow one of the walkthroughs for your preferred backend:\"}]]\n43:[\"$\",\"ul\",null,{\"children\":[\"\\n\",[\"$\",\"li\",null,{\"children\":[\"$\",\"$Le\",null,{\"href\":\"/docs/cloud/persistence/ai-sdk\",\"children\":\"AI SDK\"}]}]},\"\\n\",[\"$\",\"li\",null,{\"children\":[\"$\",\"$Le\",null,{\"href\":\"/docs/cloud/persistence/langgraph\",\"children\":\"LangGraph\"}]}]},\"\\n\"}]}]\n44:[\"$\",\"p\",null,{\"children\":\"You can also check out our example repositories to see how to integrate Assistant Cloud with your frontend:\"}]\n45:[\"$\",\"ul\",null,{\"children\":[\"\\n\",[\"$\",\"li\",null,{\"children\":[\"$\",\"$Le\",null,{\"href\":\"https://github.com/assistant-ui/assistant-ui/tree/main/examples/with-cloud\",\"children\":\"With AI SDK\"}]}]},\"\\n\",[\"$\",\"li\",null,{\"children\":[\"$\",\"$Le\",null,{\"href\":\"https://github.com/assistant
```

--------------------------------

TITLE: Manual Installation of Assistant UI
DESCRIPTION: Instructions for manually installing Assistant UI, typically involving cloning the repository and installing dependencies.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
git clone https://github.com/assistant-ui/assistant-ui.git
cd assistant-ui
npm install
```

--------------------------------

TITLE: GET /api/example
DESCRIPTION: This endpoint provides an example of a GET request. It demonstrates how to retrieve data from the API.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: APIDOC
CODE:
```
## GET /api/example

### Description
This endpoint provides an example of a GET request. It demonstrates how to retrieve data from the API.

### Method
GET

### Endpoint
/api/example

### Parameters
#### Query Parameters
- **param1** (string) - Required - An example query parameter.

### Request Example
```json
{
  "message": "This is a GET request example."
}
```

### Response
#### Success Response (200)
- **data** (string) - Description of the data returned.

#### Response Example
```json
{
  "data": "Sample data from the API."
}
```
```

--------------------------------

TITLE: Install Assistant UI Project
DESCRIPTION: This command installs the latest version of create-assistant-ui and initializes a new project with the langgraph template. It is the primary method for starting a new project.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: bash
CODE:
```
npx create-assistant-ui@latest -t langgraph my-app
```

--------------------------------

TITLE: Install Assistant UI Packages with npm
DESCRIPTION: Installs the necessary @assistant-ui packages using npm. This includes the core React components, markdown support, and styling. Ensure you have Node.js and npm installed.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install
 @assistant-ui/react @assistant-ui/react-markdown @assistant-ui/styles
```

--------------------------------

TITLE: Install Assistant UI Packages
DESCRIPTION: Installs the core Assistant UI packages and related dependencies using npm. This command ensures all necessary libraries are available for the UI components.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx assistant-ui add thread thread-list
```

LANGUAGE: bash
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

TITLE: Manual Installation Header
DESCRIPTION: This snippet defines the header for the manual installation section, including a title and an anchor link for navigation.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<h2 class="flex scroll-m-28 flex-row items-center gap-2" id="manual-installation">
  <a data-card="" href="#manual-installation" class="peer">Manual installation</a>
  <svg ref="$undefined" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" aria-label="Link to section">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
</h2>
```

--------------------------------

TITLE: Install AI SDKs (npm)
DESCRIPTION: Installs the core AI SDK and specific provider packages for various AI models. These commands are typically run in a terminal.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/openai
```

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/anthropic
```

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/azure
```

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/amazon-bedrock
```

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/google
```

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/google-vertex
```

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/cohere
```

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk ollama-ai-provider
```

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk chrome-ai
```

--------------------------------

TITLE: Install AssistantModal Component
DESCRIPTION: This command installs the AssistantModal component using shadcn-ui. Ensure you have npx and shadcn-ui set up in your project.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
// run 
npx shadcn@latest add \"https://r.assistant-ui.com/assistant-modal\"
```

--------------------------------

TITLE: Setup Environment Variables (.env.local)
DESCRIPTION: Provides example environment variables for configuring the LangGraph API URL and Assistant ID. It includes variables for development and production, noting that an API key is not required for development.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: env
CODE:
```
# LANGCHAIN_API_KEY=your_api_key # for production
# LANGGRAPH_API_URL=your_api_url # for production
NEXT_PUBLIC_LANGGRAPH_API_URL=your_api_url # for development (no api key required)
NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID=your_graph_id
```

--------------------------------

TITLE: Configure Environment Variables
DESCRIPTION: Example of how to set up the OpenAI API key and optional assistant base URL in a `.env` file for the project.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# chat history -- sign up for free on https://cloud.assistant-ui.com
# NEXT_PUBLIC_ASSISTANT_BASE_URL="https://..."
```

--------------------------------

TITLE: Initialize assistant-ui Project
DESCRIPTION: This command initializes a new project with the default assistant-ui template. Ensure you have Node.js installed before running this command.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
# Create a new project with the default template
```

--------------------------------

TITLE: Page Metadata and Title
DESCRIPTION: This snippet illustrates the configuration of page metadata, including the title 'Getting Started | assistant-ui' and icon links. It's used for browser tab display and favicon setup.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
{
  "metadata": [
    ["$", "title", "0", {"children": "Getting Started | assistant-ui"}],
    ["$", "link", "1", {"rel": "icon", "href": "/favicon.ico", "type": "image/x-icon", "sizes": "32x32"}],
    ["$", "link", "2", {"rel": "icon", "href": "/icon.svg?addb97940703cbed", "type": "image/svg+xml", "sizes": "any"}]
  ],
  "error": null,
  "digest": "$undefined"
}
```

--------------------------------

TITLE: Install OpenAI SDK for Assistant UI
DESCRIPTION: This snippet shows how to install the necessary SDKs for using OpenAI with the Assistant UI. It includes the main Assistant UI package and the specific OpenAI provider package.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-ai-sdk @ai-sdk/openai
```

--------------------------------

TITLE: HTTP Method Example
DESCRIPTION: Demonstrates the usage of an HTTP GET method within the context of request handling.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
 "GET"
```

--------------------------------

TITLE: Setup Proxy Backend Endpoint (Optional)
DESCRIPTION: This section provides instructions for setting up a proxy backend endpoint, which is optional but recommended for production environments. It highlights potential security or configuration warnings related to this setup.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: html
CODE:
```
<h3 class="flex scroll-m-28 flex-row items-center gap-2" id="setup-a-proxy-backend-endpoint-optional-for-production">
  <a data-card="" href="#setup-a-proxy-backend-endpoint-optional-for-production" class="peer">
    Setup a proxy backend endpoint (optional, for production)
  </a>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" aria-label="Link to section">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
</h3>
<div class="flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md" style="--callout-color: var(--color-fd-warning, var(--color-fd-muted))">
  <div role="none" class="w-0.5 bg-(--callout-color)/50 rounded-sm"></div>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-5 -me-0.5 fill-(--callout-color) text-fd-card">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
  <div class="flex flex-col gap-2 min-w-0 flex-1">
    $undefined
    $L53
  </div>
</div>
$L54
$L55
$L56
$L57
$L58
$L59
```

--------------------------------

TITLE: Install Groq AI SDK with npm
DESCRIPTION: Installs the React AI SDK for Groq using npm. This command enables the integration of Groq's LLM capabilities into your project.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai
```

--------------------------------

TITLE: Install Anthropic SDK for Assistant UI
DESCRIPTION: This snippet demonstrates the installation command for integrating Anthropic's LLM with the Assistant UI. It requires installing the core Assistant UI SDK and the Anthropic provider package.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-ai-sdk @ai-sdk/anthropic
```

--------------------------------

TITLE: Install AI SDK Packages with npm
DESCRIPTION: This snippet demonstrates how to install the assistant-ui/react-ai-sdk and @ai-sdk/anthropic packages using npm. It ensures the necessary dependencies for AI functionalities are available.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/anthropic
```

--------------------------------

TITLE: Install Dependencies using npm
DESCRIPTION: Installs the necessary project dependencies using npm. This command fetches and installs all required packages listed in the project's package.json file, ensuring the application has all its building blocks.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: shell
CODE:
```
npm install
```

--------------------------------

TITLE: Install Cohere SDK for Assistant UI
DESCRIPTION: Installs the Cohere SDK and the Assistant UI React AI SDK using npm. This allows for the integration of Cohere's AI models into the Assistant UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/cohere
```

--------------------------------

TITLE: Install Dependencies (npm/yarn)
DESCRIPTION: Installs the necessary packages for the LangGraph Assistant UI. This command should be run in your project's root directory.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: bash
CODE:
```
npm install @langchain/community
yarn add @langchain/community
```

--------------------------------

TITLE: Example Node.js Environment Variable Structure
DESCRIPTION: Provides an example of the structure of the `process.env` object in Node.js, showcasing common environment variables and their values.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: json
CODE:
```
{
  "TERM": "xterm-256color",
  "SHELL": "/usr/local/bin/bash",
  "USER": "maciej",
  "PATH": "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
  "PWD": "/Users/maciej/Projects/assistant-ui",
  "LANG": "en_US.UTF-8",
  "SHLVL": "1",
  "HOME": "/Users/maciej",
  "LOGNAME": "maciej"
}
```

--------------------------------

TITLE: Navigation Link Configuration
DESCRIPTION: Defines the structure for navigation links, including href, icon components, and display text. This example shows links for Docs, Showcase, Examples, Dashboard, and Pricing.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
["$","$L2b","0",{
  "href": "/docs/getting-started",
  "icon": ["$","svg",null,{
    "ref": "$undefined",
    "xmlns": "http://www.w3.org/2000/svg",
    "width": 24,
    "height": 24,
    "viewBox": "0 0 24 24",
    "fill": "none",
    "stroke": "currentColor",
    "strokeWidth": 2,
    "strokeLinecap": "round",
    "strokeLinejoin": "round",
    "className": "lucide lucide-book",
    "aria-hidden": "true",
    "children": [
      ["$","path", "k3hazp", {"d": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }],
      "$undefined"
    ]
  }],
  "external": "$undefined",
  "className": "",
  "children": "Docs"
}]
["$","$L2b","1",{
  "href": "/showcase",
  "icon": ["$","svg",null,{
    "ref": "$undefined",
    "xmlns": "http://www.w3.org/2000/svg",
    "width": 24,
    "height": 24,
    "viewBox": "0 0 24 24",
    "fill": "none",
    "stroke": "currentColor",
    "strokeWidth": 2,
    "strokeLinecap": "round",
    "strokeLinejoin": "round",
    "className": "lucide lucide-projector",
    "aria-hidden": "true",
    "children": [
      ["$","path", "1yys58", {"d": "M5 7 3 5"}],
      ["$","path", "1ptz9u", {"d": "M9 6V3"}],
      ["$","path", "1w3vmq", {"d": "m13 7 2-2"}],
      ["$","circle", "1mma13", {"cx": "9", "cy": "13", "r": "3"}],
      ["$","path", "2frwzc", {"d": "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"}],
      ["$","path", "dnq2od", {"d": "M16 16h2"}],
      "$undefined"
    ]
  }],
  "external": "$undefined",
  "className": "",
  "children": "Showcase"
}]
["$","$L2b","2",{
  "href": "/examples",
  "icon": ["$","svg",null,{
    "ref": "$undefined",
    "xmlns": "http://www.w3.org/2000/svg",
    "width": 24,
    "height": 24,
    "viewBox": "0 0 24 24",
    "fill": "none",
    "stroke": "currentColor",
    "strokeWidth": 2,
    "strokeLinecap": "round",
    "strokeLinejoin": "round",
    "className": "lucide lucide-sparkles",
    "aria-hidden": "true",
    "children": [
      ["$","path", "1s2grr", {"d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],
      ["$","path", "1rf3ol", {"d": "M20 2v4"}],
      ["$","path", "gwowj6", {"d": "M22 4h-4"}],
      ["$","circle", "6kqj1y", {"cx": "4", "cy": "20", "r": "2"}],
      "$undefined"
    ]
  }],
  "external": "$undefined",
  "className": "",
  "children": "Examples"
}]
["$","$L2b","3",{
  "href": "https://cloud.assistant-ui.com/",
  "icon": ["$","svg",null,{
    "ref": "$undefined",
    "xmlns": "http://www.w3.org/2000/svg",
    "width": 24,
    "height": 24,
    "viewBox": "0 0 24 24",
    "fill": "none",
    "stroke": "currentColor",
    "strokeWidth": 2,
    "strokeLinecap": "round",
    "strokeLinejoin": "round",
    "className": "lucide lucide-cloud",
    "aria-hidden": "true",
    "children": [
      ["$","path", "p7xjir", {"d": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}],
      "$undefined"
    ]
  }],
  "external": "$undefined",
  "className": "",
  "children": "Dashboard"
}]
["$","$L2b","4",{
  "href": "/pricing",
  "icon": ["$","svg",null,{
    "ref": "$undefined",
    "xmlns": "http://www.w3.org/2000/svg",
    "width": 24,
    "height": 24,
    "viewBox": "0 0 24 24",
    "fill": "none",
    "stroke": "currentColor",
    "strokeWidth": 2,
    "strokeLinecap": "round",
    "strokeLinejoin": "round",
    "className": "lucide lucide-wallet",
    "aria-hidden": "true",
    "children": [
      ["$","path", "18etb6", {"d": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],
      ["$","path", "xoc0q4", {"d": "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"}],
      "$undefined"
    ]
  }],
  "external": "$undefined",
  "className": "mb-4",
  "children": "Pricing"
}]
```

--------------------------------

TITLE: Install React AI SDK and Azure SDK with npm
DESCRIPTION: Command to install the necessary packages for integrating Assistant UI with React AI SDK and Azure AI SDK using npm. Ensures the required dependencies are available in your project.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/azure
```

--------------------------------

TITLE: Install OpenAI SDK for Assistant UI
DESCRIPTION: Installs the OpenAI SDK and the Assistant UI React AI SDK using npm. This enables integration with OpenAI's language models within the Assistant UI framework.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/openai
```

--------------------------------

TITLE: Install Ollama SDK for Assistant UI
DESCRIPTION: Installs the Ollama SDK and the Assistant UI React AI SDK using npm. This facilitates the integration of Ollama's AI models within the Assistant UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/ollama
```

--------------------------------

TITLE: Start Assistant UI Development Server
DESCRIPTION: Command to start the development server for the Assistant UI project. This allows for local testing and development.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: bash
CODE:
```
npm run dev
# or
yarn dev
```

--------------------------------

TITLE: TypeScript: Response Headers Example
DESCRIPTION: Provides an example of working with response headers in TypeScript, specifically showing how to access the 'headers' property of a Response object and its type.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const res: Response;
res.headers: Headers
```

--------------------------------

TITLE: Install Google Vertex AI SDK with npm
DESCRIPTION: Installs the React AI SDK for Google Vertex AI using npm. This command is used to integrate Google's AI services into your application.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/google-vertex
```

--------------------------------

TITLE: Initialize Assistant UI Project
DESCRIPTION: Command to initialize a new project with Assistant UI. This sets up the necessary files and configurations for the UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx @assistant-ui/create-assistant-ui@latest my-app
```

--------------------------------

TITLE: Start Server and View Frontend
DESCRIPTION: This snippet describes how to start the server and access the frontend application. It specifies the URL to open in a browser for viewing the assistant interface and observing real-time LLM responses.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: text
CODE:
```
The server will start and you can view the frontend by opening a browser tab to http://localhost:3000. You should be able to chat with the assistant and see LLM responses streaming in real-time.
```

--------------------------------

TITLE: Create assistant-ui Project
DESCRIPTION: Command-line interface commands to create a new assistant-ui project with different templates like default, cloud, langgraph, or mcp.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest create

# Or choose one of the following templates:
# Assistant Cloud for baked in persistence and thread management
npx assistant-ui@latest create -t cloud

# LangGraph
npx assistant-ui@latest create -t langgraph

# MCP support
npx assistant-ui@latest create -t mcp
```

--------------------------------

TITLE: Setup Groq Chat Endpoint (Next.js)
DESCRIPTION: Creates a POST endpoint for handling chat messages using Groq with the Llama3-70b model. Requires Groq API key and base URL configuration.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  createOpenAI
} from "@ai-sdk/openai";
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

--------------------------------

TITLE: Add API Key Configuration
DESCRIPTION: Example of how to configure the API key for Assistant UI. This is crucial for connecting the UI to the backend service.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "3c:I[75607,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"1550\",\"static/chunks/1550-04da82d2480730d0.js\",\"7870\",\"static/chunks/app/docs/%5B%5B...slug%5D%5D/page-5c10b87452d6fdd8.js\"],"CodeBlock"\]\n"])
```

--------------------------------

TITLE: Project Initialization Recommendation
DESCRIPTION: This snippet shows a recommendation to use 'npx assistant-ui init' for setting up existing projects, presented in a callout box.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<div class="flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md" style="--callout-color: var(--color-fd-info, var(--color-fd-muted));">
  <div role="none" class="w-0.5 bg-(--callout-color)/50 rounded-sm"></div>
  <svg ref="$undefined" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-5 -me-0.5 fill-(--callout-color) text-fd-card">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
  <div class="flex flex-col gap-2 min-w-0 flex-1">
    <div></div>
    <div class="text-fd-muted-foreground prose-no-margin empty:hidden">
      <p>
        We recommend 
        <code>npx assistant-ui init</code>
        to setup existing projects.
      </p>
    </div>
  </div>
</div>
```

--------------------------------

TITLE: Start Assistant UI Server
DESCRIPTION: This command starts the development server for the Assistant UI. After running, the UI can be accessed at http://localhost:3000, allowing interaction with the LLM and viewing real-time responses.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: bash
CODE:
```
npm run dev
```

--------------------------------

TITLE: Next.js API Route Setup
DESCRIPTION: Example of exporting an API route handler in Next.js. This snippet shows the basic structure for defining an exported function for a specific HTTP method.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
export const PUT = async (req: NextRequest, res: NextResponse) => {
  // Placeholder for PUT logic
};
export const GET = async (req: NextRequest, res: NextResponse) => {
  // Placeholder for GET logic
};
```

--------------------------------

TITLE: Anthropic AI SDK Integration Example
DESCRIPTION: This snippet illustrates a basic integration with the Anthropic AI SDK. It likely involves initializing a client or setting up a call to an Anthropic model.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const anthropicClient = new AnthropicAIClient({ ... });
```

--------------------------------

TITLE: Setup OpenAI Chat Endpoint (Next.js)
DESCRIPTION: Creates a POST endpoint for handling chat messages using OpenAI's GPT-4o-mini model. It streams the response back to the client.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  openai
} from "@ai-sdk/openai";
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

--------------------------------

TITLE: Install Assistant UI Packages with npx
DESCRIPTION: Demonstrates the usage of npx to add Assistant UI components like 'thread' and 'thread-list'. This command is typically used for scaffolding or adding specific functionalities to an existing project.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx assistant-ui add thread thread-list
```

--------------------------------

TITLE: Install React AI SDK and Amazon Bedrock SDK with npm
DESCRIPTION: Command to install packages for integrating Assistant UI with React AI SDK and Amazon Bedrock SDK via npm. This command adds the essential libraries for connecting to Amazon Bedrock.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/amazon-bedrock
```

--------------------------------

TITLE: AssistantModal Button Variants
DESCRIPTION: Examples of different button variants available for the AssistantModal component: primary, outline, and ghost.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
default: "aui-button-primary",
outline: "aui-button-outline",
ghost: "aui-button-ghost",
```

--------------------------------

TITLE: Getting Started with Assistant UI (HTML/JSX)
DESCRIPTION: Provides the structure for the 'Getting Started' section, including a heading and a link to the section ID. This is part of the UI's documentation structure.

SOURCE: https://assistant-ui.com/docs/ui/ThreadList

LANGUAGE: jsx
CODE:
```
["$", "h2", null, {"className": "flex scroll-m-28 flex-row items-center gap-2", "id": "getting-started", "children": [["$", "a", null, {"data-card": "", "href": "#getting-started", "className": "peer", "children": "Getting Started"}], ["$", "svg", null, {"ref": "$undefined", "xmlns": "http://www.w3.org/2000/svg", "width": 24, "height": 24, "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": 2, "strokeLinecap": "round", "strokeLinejoin": "round", "className": "lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100", "aria-label": "Link to section", "children": [[["$", "path", "1cjeqo", {"d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}], ["$", "path", "19qd67", {"d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]], "$undefined"]}]], "$undefined"]}]}

```

--------------------------------

TITLE: Azure AI SDK Integration Example
DESCRIPTION: This snippet showcases a conceptual integration with Azure AI services, likely involving setting up a client or configuration. The provided code represents a fragment of a larger integration process.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const azureClient = new AzureAIClient({ ... });
```

--------------------------------

TITLE: Regular Expression Syntax Example
DESCRIPTION: Provides an example of regular expression syntax, including delimiters, flags, and character classes. This snippet illustrates common regex patterns used for text matching.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
/^/api*?//?
```

--------------------------------

TITLE: Set Page Title and Favicon (JavaScript)
DESCRIPTION: Configures the page's title and favicon links. This snippet includes setting the document title to 'Getting Started | assistant-ui' and linking to both a favicon.ico and an SVG icon.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"3c6:I[17824,[],\"IconMark\"]\n23:{\"metadata\":[[ \"$\",\"title\",\"0\",{\"children\":\"Getting Started | assistant-ui\"}],[ \"$\",\"link\",\"1\",{\"rel\":\"icon\",\"href\":\"/favicon.ico\",\"type\":\"image/x-icon\",\"sizes\":\"32x32\"}],[ \"$\",\"link\",\"2\",{\"rel\":\"icon\",\"href\":\"/icon.svg?addb97940703cbed\",\"type\":\"image/svg+xml\",\"sizes\":\"any\"}],[ \"$\",\"$L3c6\",\"3\",{} ]],\"error\":null,\"digest\":\"$undefined\"}\n"])
```

--------------------------------

TITLE: Setup Environment Variables in .env.local
DESCRIPTION: Create a `.env.local` file in your project root to configure environment variables. This includes API keys and URLs for services like Langchain and Langgraph. The file supports comments starting with '#'.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: dotenv
CODE:
```
# LANGCHAIN_API_KEY=your_api_key # for production
# LANGGRAPH_API_URL=your_api_url # for production
NEXT_PUBLIC_LANGGRAPH_API_URL=your_api_url # for development (no api key required)

```

--------------------------------

TITLE: Setup Google Gemini Chat Endpoint (Next.js)
DESCRIPTION: Creates a POST endpoint for handling chat messages using Google Gemini 2.0 Flash. It streams the response back to the client.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  google
} from "@ai-sdk/google";
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

--------------------------------

TITLE: Migration Guides
DESCRIPTION: Documentation for project migrations, specifically detailing changes for v0.11 and v0.12. Each migration has a corresponding .mdx file.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: mdx
CODE:
```
{
  "$id": "migrations/v0-11.mdx",
  "type": "page",
  "name": "Migration to v0.11",
  "description": "$undefined",
  "icon": "$undefined",
  "url": "/docs/migrations/v0-11",
  "$ref": {
    "file": "migrations/v0-11.mdx"
  }
}
```

LANGUAGE: mdx
CODE:
```
{
  "$id": "migrations/v0-12.mdx",
  "type": "page",
  "name": "Migration to v0.12",
  "description": "$undefined",
  "icon": "$undefined",
  "url": "/docs/migrations/v0-12",
  "$ref": {
    "file": "migrations/v0-12.mdx"
  }
}
```

--------------------------------

TITLE: Setup Azure OpenAI Chat Endpoint (Next.js)
DESCRIPTION: Creates a POST endpoint for handling chat messages using an Azure OpenAI deployment. Requires a deployment name and appropriate configuration.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  azure
} from "@ai-sdk/azure";
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

--------------------------------

TITLE: Initialize Assistant UI Project
DESCRIPTION: This snippet shows the command to initialize a new Assistant UI project. It sets up the basic project structure and dependencies.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx create-next-app@latest --example with-tailwindcss assistant-ui-example
cd assistant-ui-example
```

--------------------------------

TITLE: Configure Ollama service in .env.local
DESCRIPTION: Configures the Ollama service. This snippet indicates that no specific Ollama API key or endpoint is required, likely relying on local installation or default configurations.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
<none>
```

--------------------------------

TITLE: Getting Started Section Link
DESCRIPTION: Provides a link to the 'Getting Started' section of the documentation, identified by an ID for easy navigation. It includes an SVG icon for linking.

SOURCE: https://assistant-ui.com/docs/ui/Attachment

LANGUAGE: html
CODE:
```
<h2 id="getting-started" class="flex scroll-m-28 flex-row items-center gap-2">
  <a data-card="" href="#getting-started" class="peer">
    Getting Started
  </a>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" aria-label="Link to section">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
</h2>
```

--------------------------------

TITLE: Display User Environment Variables (Example)
DESCRIPTION: This snippet shows an example of a user environment object, likely used to store and access system or application-specific settings. It references the 'environ(7)' man page for more details on environment variables.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: text
CODE:
```
{
  "TERM": 'xterm-256color'
}
```

--------------------------------

TITLE: Install Ollama AI Provider for Assistant UI React
DESCRIPTION: Installs the Ollama AI provider for the Assistant UI React SDK. This command requires npm and is used to integrate Ollama's capabilities into your application.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk ollama-ai-provider
```

--------------------------------

TITLE: Install Assistant UI React Dependencies
DESCRIPTION: npm command to install the necessary packages for integrating assistant-ui with a React project, specifically including LangGraph SDK support.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react @assistant-ui/react-ui @assistant-ui/react-langgraph @langchain/langgraph-sdk
```

--------------------------------

TITLE: Getting Started: Adding a Thread via Command Line
DESCRIPTION: This snippet demonstrates how to initiate the process of adding a new thread using a command-line interface. It specifies the command and the package to be used, indicating a typical setup or initialization step for the feature.

SOURCE: https://assistant-ui.com/docs/ui/Thread

LANGUAGE: bash
CODE:
```
npx shadcn@latest add thread
```

--------------------------------

TITLE: Setup Runtime Instructions
DESCRIPTION: Provides instructions for setting up the runtime environment, emphasizing that no initial configuration is required. This section is crucial for project initialization.

SOURCE: https://assistant-ui.com/docs/guides/Attachments

LANGUAGE: html
CODE:
```
<div className=\"fd-step\">[\"$\",\"h3\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\", \"id\":\"set-up-runtime-no-configuration-required\", \"children\":[[\"$\",\"a\",null,{\"data-card\":\"\", \"href\":\"#set-up-runtime-no-configuration-required\", \"className\":\"peer\", \"children\":\"Set up Runtime (No Configuration Required)\"}],[\"$\",\"svg\",null,{\"ref\":\"$undefined\", \"xmlns\":\"http://www.w3.org/2000/svg\", \"width\":24, \"height\":24, \"viewBox\":\"0 0 24 24\", \"fill\":\"none\", \"stroke\":\"currentColor\", \"strokeWidth\":2, \"strokeLinecap\":\"round\", \"strokeLinejoin\":\"round\", \"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\", \"aria-label\":\"Link to section\", \"children\":[[\"$L70\",\"$L71\"]]}]}]}
```

--------------------------------

TITLE: Import and Access Environment Variables in Node.js
DESCRIPTION: This example demonstrates how to import the `process` module and access environment variables. It shows setting a variable and then retrieving it.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import { env } from 'node:process';
env.foo = "bar";
console.log(env.foo);
```

--------------------------------

TITLE: Setup Confirmation for Card Component
DESCRIPTION: This snippet describes the user interaction during the installation process, confirming that a 'components.json' file will be set up and the 'card' UI component will be installed.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-2

LANGUAGE: javascript
CODE:
```
You will be prompted to setup a components.json file, after this step, a card UI component will be installed in your project.
```

--------------------------------

TITLE: Setup Anthropic Chat Endpoint (Next.js)
DESCRIPTION: Creates a POST endpoint for handling chat messages using Anthropic's Claude 3.5 Sonnet model. It streams the response back to the client.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  anthropic
} from "@ai-sdk/anthropic";
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

--------------------------------

TITLE: NextRequest Object Access Example
DESCRIPTION: Shows how to access properties of a `NextRequest` object, specifically demonstrating the common pattern of `req.NextRequest`.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
req: NextRequest
```

--------------------------------

TITLE: Environment Variable Setup with .env.local
DESCRIPTION: Illustrates how to set up environment variables by creating a `.env.local` file. This is a common practice in web development for managing sensitive information or configuration settings. It includes a code example for defining variables and a snippet for inline styling of a code block.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"40:[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#setup-environment-variables\",\"className\":\"peer\",\"children\":\"Setup environment variables\"}]\n41:[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\",\"aria-label\":\"Link to section\",\"children\":[[[\"$\",\"path\",\"1cjeqo\",{\"d\":\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"}], [\"$\",\"path\",\"19qd67\",{\"d\":\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"}]],\"$undefined\"}]}\n42:[\"$\",\"p\",null,{\"children\":[\"Create a \",[\"$\",\"code\",null,{\"children\":\".env.local\"}],\" file in your project with the following variables:\"}]}\n
```

LANGUAGE: css
CODE:
```
/* Shiki syntax highlighting styles */
.shiki {
  --shiki-light: #4c4f69;
  --shiki-dark: #cdd6f4;
  --shiki-light-bg: #eff1f5;
  --shiki-dark-bg: #1e1e2e;
}
```

--------------------------------

TITLE: Create New Project with LangGraph (CLI)
DESCRIPTION: Use npx to create a new Assistant UI project with LangGraph support. This command initializes a project configured for LangGraph.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest create -t langgraph
```

--------------------------------

TITLE: Create Assistant UI Project with Template
DESCRIPTION: Command to create a new Assistant UI project with a specific template, such as 'Assistant Cloud' for built-in persistence and thread management. This allows for pre-configured project structures.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest create -t "Assistant Cloud for baked in persistence and thread management"
```

--------------------------------

TITLE: Setup Google Vertex AI Chat Endpoint (Next.js)
DESCRIPTION: Creates a POST endpoint for handling chat messages using Google Vertex AI with the Gemini 1.5 Pro model. It streams the response back to the client.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  vertex
} from "@ai-sdk/google-vertex";
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

--------------------------------

TITLE: Setup Fireworks AI Chat Endpoint (Next.js)
DESCRIPTION: Creates a POST endpoint for handling chat messages using Fireworks AI. Requires Fireworks API key and base URL configuration.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  createOpenAI
} from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

const fireworks = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY ?? "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({

```

--------------------------------

TITLE: Handle Request with NextRequest and NextResponse
DESCRIPTION: Example of a function that handles an incoming request using NextRequest and returns a NextResponse. Demonstrates type annotations and basic response creation.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
function handleRequest(req: NextRequest): NextResponse {
  const method = req.method;
  return new NextResponse("unknown", 
    {
      status: 200,
    }
  );
}
```

--------------------------------

TITLE: Install Chrome AI Provider for Assistant UI React
DESCRIPTION: Installs the Chrome AI provider for the Assistant UI React SDK using npm. This enables the integration of Chrome AI features within your Assistant UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react-ai-sdk chrome-ai
```

--------------------------------

TITLE: Setup Helper Functions Section (Next.js)
DESCRIPTION: This snippet defines the structure for a 'Setup helper functions' section in a Next.js application. It includes an h3 heading, a link to the section, and a shiki code block for displaying TypeScript code, possibly from '@/@/lib/chatApi.ts'.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"55:[\"$\",\"div\",null,{\"className\":\"fd-step\",\"children\":[[\"$\",\"h3\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"setup-helper-functions\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#setup-helper-functions\",\"className\":\"peer\",\"children\":\"Setup helper functions\"}],"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\",\"aria-label\":\"Link to section\",\"children\":[[[\"$\",\"path\",\"1cjeqo\",{\"d\":\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"}],"$\",\"path\",\"19qd67\",{\"d\":\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"}]],\"$undefined\"}]}]},{\"$\",\"$L51\",null,{\"className\":\"shiki shiki-themes catppuccin-latte catppuccin-mocha twoslash lsp\",\"style\":{\"--shiki-light\":\"#4c4f69\",\"--shiki-dark\":\"#cdd6f4\",\"--shiki-light-bg\":\"#eff1f5\",\"--shiki-dark-bg\":\"#1e1e2e\"},\"tabIndex\":\"0\",\"title\":\"@/lib/chatApi.ts\",\"icon\":\"$b1\",\"children\":\"$Lb2\"}]}]])
```

--------------------------------

TITLE: Navigation Link: Examples
DESCRIPTION: Defines a navigation link for 'Examples' featuring a sparkles icon. This snippet is part of the main navigation, guiding users to example implementations or use cases.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: javascript
CODE:
```
["$","$L2b","2",{"href":"/examples","icon":["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-sparkles","aria-hidden":"true","children":[[["$","path","1s2grr",{"d":"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["$","path","1rf3ol",{"d":"M20 2v4"}],["$","path","gwowj6",{"d":"M22 4h-4"}],["$","circle","6kqj1y",{"cx":4,"cy":20,"r":2}],"$undefined"]}]},"external":"$undefined","className":"","children":"Examples"}]
```

--------------------------------

TITLE: ThreadPrimitive Usage Example
DESCRIPTION: Demonstrates the basic structure and usage of the ThreadPrimitive component, including its root, viewport, empty state, messages, and composer. This is a fundamental example for getting started with the ThreadPrimitive.

SOURCE: https://assistant-ui.com/docs/api-reference/primitives/Thread

LANGUAGE: jsx
CODE:
```
import { ThreadPrimitive } from "@assistant-ui/react";

const Thread = () => (
  <ThreadPrimitive.Root>
    <ThreadPrimitive.Viewport>
      <ThreadPrimitive.Empty>...</ThreadPrimitive.Empty>
      <ThreadPrimitive.Messages components={...} />
    </ThreadPrimitive.Viewport>
    <Composer />
  </ThreadPrimitive.Root>
);
```

--------------------------------

TITLE: TooltipIconButton with Tooltip
DESCRIPTION: Shows an example of TooltipIconButton configured with a 'tooltip' prop. This component displays an icon and a tooltip message when hovered.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
<TooltipIconButton tooltip="Refresh">
</TooltipIconButton>
```

--------------------------------

TITLE: Example MyAssistant Component Usage
DESCRIPTION: Demonstrates how to import and use the MyAssistant component within a React application. Ensure all necessary environment variables and configurations are set up prior to use.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import { MyAssistant } from "@langchain/community/react"

function App() {
  return (
    <MyAssistant />
  )
}
```

--------------------------------

TITLE: Create New Project with MCP Support (CLI)
DESCRIPTION: Use npx to create a new Assistant UI project with MCP (Multi-component Processing) support. This command initializes a project configured for MCP.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest create -t mcp
```

--------------------------------

TITLE: Add Assistant UI to Your App
DESCRIPTION: This snippet shows how to add Assistant UI as a dependency to your existing project using npm.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react
```

--------------------------------

TITLE: Define LLM Prompt Example
DESCRIPTION: This snippet represents a specific LLM prompt, 'What is the weather in Tokyo?'. It's structured in a way that suggests it's being processed or prepared for display within the UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: json
CODE:
```
["$","span",null,{
  "className": "line",
  "children": [
    ["$","span",null,{
      "style": {
        "--shiki-light": "#DF8E1D",
        "--shiki-dark": "#F9E2AF"
      },
      "children": " prompt"
    }],
    ["$","span",null,{
      "style": {
        "--shiki-light": "#179299",
        "--shiki-dark": "#94E2D5"
      },
      "children": "="
    }],
    ["$","span",null,{
      "style": {
        "--shiki-light": "#40A02B",
        "--shiki-dark": "#A6E3A1"
      },
      "children": "\\"What is the weather in Tokyo?\\""
    }]
  ]
}]
```

--------------------------------

TITLE: Create OpenAI Compatible Response
DESCRIPTION: This snippet shows the initialization for creating a response object that is compatible with OpenAI's API structure. It indicates the start of such a response.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"382:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" fireworks \"}]...)
```

--------------------------------

TITLE: Render ThreadPrimitive.If example
DESCRIPTION: Demonstrates the rendering of a ThreadPrimitive.If component, likely used for conditional rendering in the UI. It shows the structure with opening and closing angle brackets.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"9\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#EA76CB\", \"--shiki-dark\": \"#F5C2E7\" }, \"children\": \"ThreadPrimitive.If\" } ], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#179299\", \"--shiki-dark\": \"#94E2D5\" }, \"children\": \"\u003e\" } ] ] }])
```

--------------------------------

TITLE: Stream text with Chrome AI
DESCRIPTION: This example demonstrates how to stream text using the Chrome AI provider. It requires the 'chrome-ai' package and the 'streamText' function from the 'ai' SDK.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
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

TITLE: Basic Assistant Runtime Provider Setup
DESCRIPTION: Illustrates a basic setup for the AssistantRuntimeProvider, which is necessary for managing the assistant's runtime environment. This setup likely involves passing configuration or state to the provider.

SOURCE: https://assistant-ui.com/docs/guides/Tools

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "f1:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"AssistantRuntimeProvider\"}]
```

--------------------------------

TITLE: Setup AWS Bedrock Chat Endpoint (Next.js)
DESCRIPTION: Creates a POST endpoint for handling chat messages using AWS Bedrock, specifically with an Anthropic Claude model. Requires the model identifier.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  bedrock
} from "@ai-sdk/amazon-bedrock";
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

--------------------------------

TITLE: Stream text with Cohere AI
DESCRIPTION: This code example shows how to stream text using the Cohere AI model. It utilizes the '@ai-sdk/cohere' package and the 'streamText' function from the 'ai' SDK.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
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

--------------------------------

TITLE: Execute npx command
DESCRIPTION: This snippet demonstrates how to execute the 'npx' command, typically used for running Node.js packages. It is a fundamental step in setting up or interacting with development environments.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
npx
```

--------------------------------

TITLE: HTML for 'aui-thread-welcome-center' div
DESCRIPTION: This snippet illustrates the HTML structure for a div element with the class 'aui-thread-welcome-center'. It showcases attribute assignment, similar to the 'aui-thread-welcome-root' example, for UI element identification.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> &lt;</span><span style="--shiki-light: #1E66F5; --shiki-dark: #89B4FA;">div</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> className</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;">=</span><span style="--shiki-light: #40A02B; --shiki-dark: #A6E3A1;">"aui-thread-welcome-center"</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;">&gt;</span>
```

--------------------------------

TITLE: Render CircleStopIcon example
DESCRIPTION: Details the inclusion of a CircleStopIcon component, likely used to represent a stop action. It shows the component's structure within the UI hierarchy.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"hiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#179299\", \"--shiki-dark\": \"#94E2D5\" }, \"children\": \" \u003c\" } ], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#EA76CB\", \"--shiki-dark\": \"#F5C2E7\" }, \"children\": \"CircleStopIcon\" } ], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#179299\", \"--shiki-dark\": \"#94E2D5\" }, \"children\": \" /\u003e\" } ] ] }])
```

--------------------------------

TITLE: Import OpenAI SDK with Groq Provider
DESCRIPTION: Imports the 'createOpenAI' function from the '@ai-sdk/openai' package, commonly used for integrating OpenAI-compatible APIs. This snippet showcases a typical setup for using the Groq provider in a Next.js application.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { createOpenAI } from "@ai-sdk/openai";
```

--------------------------------

TITLE: Assistant UI Setup Guide
DESCRIPTION: Provides instructions for setting up the Assistant UI, requiring an Assistant Cloud account. Users are directed to sign up to begin the setup process.

SOURCE: https://assistant-ui.com/docs/cloud/persistence/langgraph

LANGUAGE: html
CODE:
```
<div>
  <div>
    <div>
      <div>
        <div>
          <div>You need an assistant-cloud account to follow this guide. </div>
          <a href="https://cloud.assistant-ui.com/">Sign up here</a>
          <div> to get started.</div>
        </div>
      </div>
    </div>
  </div>
</div>
<h2 id="setup-guide">
  <a data-card="" href="#setup-guide" class="peer">Setup Guide</a>
</h2>

```

--------------------------------

TITLE: Return AssistantRuntimeProvider
DESCRIPTION: Returns an 'AssistantRuntimeProvider' component, passing the 'runtime' object as a prop. This component likely provides the chat runtime context to its children.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
return <AssistantRuntimeProvider runtime={runtime} {
  runtime
}/>;
```

--------------------------------

TITLE: JavaScript Console Log Example
DESCRIPTION: Demonstrates how to log messages to the console in JavaScript, including accessing environment variables. This is a common pattern for debugging and monitoring application behavior.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
console.log(env.test);
// => 'null'
env.test = undefined;
console.log(env.test);
// => 'undefined'
```

--------------------------------

TITLE: Set Groq API Key
DESCRIPTION: Specifies the Groq API key for accessing Groq's AI inference services.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
GROQ_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: JavaScript Import Example with Shiki Styling
DESCRIPTION: Illustrates a JavaScript import statement styled using Shiki, a syntax highlighter. This snippet shows how Shiki can be applied to enhance code readability with theme-specific coloring.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import {
}
```

--------------------------------

TITLE: Render ComposerPrimitive.Cancel example
DESCRIPTION: Illustrates the usage of ComposerPrimitive.Cancel, potentially for a cancel action within a composer UI. It includes attributes like 'asChild', 'tooltip', 'variant', and 'className'.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"hiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#EA76CB\", \"--shiki-dark\": \"#F5C2E7\" }, \"children\": \"ComposerPrimitive.Cancel\" }, { \"style\": { \"--shiki-light\": \"#DF8E1D\", \"--shiki-dark\": \"#F9E2AF\" }, \"children\": \" asChild\" } ], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#179299\", \"--shiki-dark\": \"#94E2D5\" }, \"children\": \"\u003e\" } ] ] }])
```

--------------------------------

TITLE: Install with Yarn
DESCRIPTION: This command installs a package and runs a post-install script. The script likely performs necessary setup or modifications for the installed package, potentially related to LLM integration or compatibility.

SOURCE: https://assistant-ui.com/docs/react-compatibility

LANGUAGE: bash
CODE:
```
yarn postinstall
```

--------------------------------

TITLE: Async Function Declaration in TypeScript
DESCRIPTION: An example of an asynchronous function declaration, commonly used for operations that involve waiting for network requests or other I/O-bound tasks.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
async function POST {
  
}

```

--------------------------------

TITLE: Add API Key for Assistant UI
DESCRIPTION: This snippet demonstrates how to add your API key to the Assistant UI configuration. Ensure you replace 'YOUR_API_KEY' with your actual key.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: bash
CODE:
```
echo "OPENAI_API_KEY=YOUR_API_KEY" >> .env
```

--------------------------------

TITLE: MessagePrimitive.If Example
DESCRIPTION: Demonstrates the usage of MessagePrimitive.If for conditional rendering in a UI. This component likely controls the visibility of UI elements based on a boolean condition.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
<MessagePrimitive.If copied={false}>
</MessagePrimitive.If>
```

--------------------------------

TITLE: Create .env File for OpenAI API Key
DESCRIPTION: This snippet shows how to create a .env file and set your OpenAI API key. This is essential for the application to authenticate with OpenAI services.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
# chat history -- sign up for free on https://cloud.assistant-ui.com
# NEXT_PUBLIC_ASSISTANT_BASE_URL="https://..."
```

--------------------------------

TITLE: Add Component Step (HTML/JSX)
DESCRIPTION: Defines a single step in a guided process, likely for installation or setup. It includes a heading for 'Add the component' with a link and an associated SVG icon.

SOURCE: https://assistant-ui.com/docs/ui/ThreadList

LANGUAGE: jsx
CODE:
```
["$", "div", null, {"className": "fd-step", "children": [["$", "h3", null, {"className": "flex scroll-m-28 flex-row items-center gap-2", "id": "add-the-component", "children": [["$", "a", null, {"data-card": "", "href": "#add-the-component", "className": "peer", "children": "Add the component"}], ["$", "svg", null, {"ref": "$undefined", "xmlns": "http://www.w3.org/2000/svg", "width": 24, "height": 24, "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": 2, "strokeLinecap": "round", "strokeLinejoin": "round", "className": "lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100", "aria-label": "Link to section", "children": [[["$", "path", "1cjeqo", {"d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}], ["$", "path", "19qd67", {"d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]], "$undefined"]}]], "$undefined"]}], "$L3d"]}]

```

--------------------------------

TITLE: Node.js Environment Variable Access Example
DESCRIPTION: Demonstrates accessing and setting environment variables using Node.js's `process.env`. This snippet shows how to import the 'node:process' module and log environment variables.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
import process from 'node:process';

env.TEST = 1;
console.log(env.test);

// => 1
```

--------------------------------

TITLE: Assistant UI Examples with LLM Frameworks
DESCRIPTION: Demonstrates how to use Assistant UI with various LLM frameworks like Vercel AI SDK, External Store, Assistant Cloud, LangGraph, and OpenAI Assistants. Each example showcases a different integration pattern and its specific use case.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: markdown
CODE:
```
### LocalRuntime Pitfalls
```

--------------------------------

TITLE: Handling PATCH Requests (TypeScript)
DESCRIPTION: An example of how to handle HTTP PATCH requests using the NextRequest object within a Next.js application. It illustrates type annotations for request and method.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
181:["$","span",null,{"style":{"--shiki-light":"#40A02B","--shiki-dark":"#A6E3A1"},"children":" \"PATCH\""}]
182:["$","span",null,{"style":{"--shiki-light":"#4C4F69","--shiki-dark":"#CDD6F4"},"children":")"}]
```

--------------------------------

TITLE: Navigate to Project Directory
DESCRIPTION: After creating the project, this command changes the current directory to the newly created project folder, allowing you to access and manage project files.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: bash
CODE:
```
cd my-app
```

--------------------------------

TITLE: Getting Started with AssistantModal
DESCRIPTION: This section provides instructions on how to add the AssistantModal to your project. It outlines the necessary steps for integration.

SOURCE: https://assistant-ui.com/docs/ui/AssistantModal

LANGUAGE: javascript
CODE:
```
import AssistantModal from './path/to/AssistantModal';

// Usage:
<AssistantModal />
```

--------------------------------

TITLE: Import React from 'react'
DESCRIPTION: This snippet shows the standard import statement for the React library, essential for building React applications.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import * as React from "react"

```

--------------------------------

TITLE: Navigation Header with Logo and Action Buttons
DESCRIPTION: Renders the main navigation header, including a logo linking to the homepage and action buttons for features like GitHub integration. It utilizes a flex layout for alignment.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
function HeaderComponent(props) {
  // ... component logic and rendering
  return (
    <div className=\"flex\">
      <a href=\"/.../>
      {/* Other navigation elements */}
      <div className=\"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none hover:bg-fd-accent hover:text-fd-accent-foreground p-1.5 [\u0026_svg]:size-4.5 mb-auto text-fd-muted-foreground\">
        {/* SVG Icon */}
        <svg xmlns=\"http://www.w3.org/2000/svg\" width=24 height=24 viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=2 strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide\">
          <rect width=18 height=18 x=3 y=3 rx=2 />
          <path d=\"M9 3v18\" />
        </svg>
      </div>
      {/* More action buttons */}
    </div>
  );
}
```

--------------------------------

TITLE: Next.js Client Entrypoint Configuration
DESCRIPTION: Configures the client-side entry point for a Next.js application, including script loading and route handling. This often involves bundling and managing JavaScript modules.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "33:I[14016, [ \"3991\", \"static/chunks/a481b260-4ea16b2cb2d5964d.js\", \"7857\", \"static/chunks/7857-031040a915662d8a.js\", \"3230\", \"static/chunks/3230-0e52275e3939333e.js\", \"5560\", \"static/chunks/5560-c132b61017d185dd.js\", \"7484\", \"static/chunks/7484-92989dddc8aa5297.js\", \"5817\", \"static/chunks/5817-085a6b2739e98564.js\", \"243\", \"static/chunks/243-b70d19e16f061ae9.js\", \"1679\", \"static/chunks/1679-7f1ffad4356b88e0.js\", \"265\", \"static/chunks/265-5221c29d87acf641.js\", \"6082\", \"static/chunks/6082-7122824aafe075fd.js\", \"3341\", \"static/chunks/3341-6e6fba5f79b3758a.js\", \"2283\", \"static/chunks/2283-5108a0ecf2479a0c.js\", \"6249\", \"static/chunks/6249-ff0f18c5b1527af2.js\", \"8444\", \"static/chunks/8444-4438f8aa38c60a35.js\", \"3595\", \"static/chunks/3595-efc91f45d0b7420d.js\", \"2032\", \"static/chunks/2032-3f5992acfba397be.js\", \"9926\", \"static/chunks/9926-881e1fc7fffbe717.js\", \"5967\", \"static/chunks/5967-89e5ea0ae819b9fd.js\", \"6957\", \"static/chunks/6957-e573b2b026755259.js\", \"8198\", \"static/chunks/8198-e69520b749b413e4.js\", \"9745\", \"static/chunks/9745-fd94a343788c6195.js\", \"8993\", \"static/chunks/8993-37889e39b7f04e7c.js\", \"1550\", \"static/chunks/1550-04da82d2480730d0.js\", \"7870\", \"static/chunks/app/docs/%5B%5B...slug%5D%5D/page-5c10b87452d6fdd8.js\" ], \"TOCProvider\" ]\n"])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "34:I[57991, [ \"3991\", \"static/chunks/a481b
```

--------------------------------

TITLE: Import and use environment variables in Node.js
DESCRIPTION: This example shows how to import the 'env' object from 'node:process' and then access or set environment variables within a Node.js script. It illustrates setting `env.foo` to a value.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import { env } from 'node:process';

env.foo = "bar";
```

--------------------------------

TITLE: Render Lucide Sparkles Icon
DESCRIPTION: Renders the Lucide Sparkles icon, often used for 'Examples' or feature highlights. The code defines paths and a circle for the sparkle effect.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
["$","svg",null,{
  "ref": "$undefined",
  "xmlns": "http://www.w3.org/2000/svg",
  "width": 24,
  "height": 24,
  "viewBox": "0 0 24 24",
  "fill": "none",
  "stroke": "currentColor",
  "strokeWidth": 2,
  "strokeLinecap": "round",
  "strokeLinejoin": "round",
  "className": "lucide lucide-sparkles",
  "aria-hidden": "true",
  "children": [
    ["$","path", "1s2grr", {"d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],
    ["$","path", "1rf3ol", {"d": "M20 2v4"}],
    ["$","path", "gwowj6", {"d": "M22 4h-4"}],
    ["$","circle", "6kqj1y", {"cx": "4", "cy": "20", "r": "2"}],
    "$undefined"
  ]
}]
```

--------------------------------

TITLE: Set Cohere API Key
DESCRIPTION: Defines the Cohere API key, necessary for authenticating with Cohere's AI platform.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
COHERE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: Render Slottable Component
DESCRIPTION: This snippet demonstrates rendering a Slottable component with associated styling and children. It shows the opening and closing tags of the component.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: HTML
CODE:
```
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}],
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"Slottable\"}],
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}],
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"{\"}]
```

--------------------------------

TITLE: When to Use Pre-built Integrations
DESCRIPTION: Provides reasons to opt for pre-built integrations, focusing on scenarios where the user is already invested in a particular framework, requires the quickest setup, or finds the existing integration meets all requirements.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: text
CODE:
```
Use a pre-built integration when:
You're already using that framework
You want the fastest possible setup
The integration covers your needs
```

--------------------------------

TITLE: Add Assistant UI Step
DESCRIPTION: This snippet represents a step in a UI process, detailing how to add Assistant UI, with options for Tailwind CSS integration.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<div class="fd-step">
  <h3 class="flex scroll-m-28 flex-row items-center gap-2" id="add-assistant-ui">
    <a data-card="" href="#add-assistant-ui" class="peer">Add assistant-ui</a>
    <svg ref="$undefined" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" aria-label="Link to section">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  </h3>
  <div>
    <div>
      <div class="shiki shiki-themes catppuccin-latte catppuccin-mocha" style="--shiki-light: #4c4f69; --shiki-dark: #cdd6f4; --shiki-light-bg: #eff1f5; --shiki-dark-bg: #1e1e2e;" tabindex="0" icon="<svg viewBox='0 0 24 24'><path d='m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z' fill='currentColor' /></svg>">
        <div class="max-h-[400px]">
          <code class="inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow
        sm:text-sm select-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80
        font-bold text-lg
        flex items-center gap-1
        text-lg
        leading-none
        text-lg
        text-primary
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-center gap-1
        text-lg
        bg-transparent
        text-fd-muted-foreground
        uppercase
        flex items-
```

--------------------------------

TITLE: Start Assistant UI Docs Server
DESCRIPTION: This command starts the documentation server for the Assistant UI project. It likely uses Node.js and a package manager like npm or yarn to run the specified script. Ensure you are in the project's root directory.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: bash
CODE:
```
npm run --prefix ./packages/mcp-docs-server start
```

--------------------------------

TITLE: Set Anthropic API Key
DESCRIPTION: Configures the Anthropic API key, essential for accessing Anthropic's AI models.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
ANTHROPIC_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: Initializing MyApp Component
DESCRIPTION: Shows the basic structure for defining the main application component 'MyApp' in TypeScript. It includes standard React component declaration and a placeholder for the component's logic.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
const MyApp = () => {
  return {};
};

export default MyApp;
```

--------------------------------

TITLE: Return Statement in JavaScript/TypeScript
DESCRIPTION: A simple return statement example, often used in functions to pass back a value or indicate completion. This snippet is language-agnostic but commonly seen in JavaScript and TypeScript.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
return (
  // ...
);
```

--------------------------------

TITLE: Set Azure API Credentials
DESCRIPTION: Provides Azure resource name and API key for Azure OpenAI services. Requires both AZURE_RESOURCE_NAME and AZURE_API_KEY.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
AZURE_RESOURCE_NAME="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AZURE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: Assistant UI - Page Structure and Content (React JSX)
DESCRIPTION: Example of the page structure and content rendering in the Assistant UI project, likely for a documentation page. It includes layout, headings, and placeholders for content.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: jsx
CODE:
```
self.__next_f.push([1, "1f:[\"$\",\"$L33\",null,{\"toc\":[{\"depth\":2,\"url\":\"#create-a-new-project\",\"title\":\"Create a new project\"},{\"depth\":3,\"url\":\"#setup-environment-variables\",\"title\":\"Setup environment variables\"},{\"depth\":3,\"url\":\"#start-the-server\",\"title\":\"Start the server\"},{\"depth\":2,\"url\":\"#explore-features\",\"title\":\"Explore features\"},{\"depth\":3,\"url\":\"#streaming\",\"title\":\"Streaming\"},{\"depth\":3,\"url\":\"#markdown-support\",\"title\":\"Markdown support\"},{\"depth\":2,\"url\":\"#add-conversation-starter-messages\",\"title\":\"Add conversation starter messages\"}],\"single\":\"$undefined\",\"children\":[\"$\",\"div\",null,{\"id\":\"nd-page\",\"className\":\"flex flex-1 w-full mx-auto max-w-(--fd-page-width) pt-(--fd-tocnav-height)\",\"children\":[[\"$\",\"$L34\",null,{\"children\":[[\"$\",\"$L35\",null,{}],[\"$\",\"$L36\",null,{\"children\":[[\"$\",\"$L37\",null,{\"children\":[[\"$\",\"$L38\",null,{}]]}],\"$undefined\"],"$undefined"\]]]},[\"$\",\"article\",null,{\"children\":[[\"$\",\"$L39\",null,{}],[\"$\",\"div\",null,{\"ref\":\"$undefined\",\"children\":[[\"$\",\"h1\",null,{\"children\":\"Part 1: Setup frontend\"}],[\"$\",\"$L3a\",null,{\"children\":[[\"$\",\"h2\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"create-a-new-project\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#create-a-new-project\",\"className\":\"peer\",\"children\":\"Create a new project\"}],[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\",\"aria-label\":\"Link to section\",\"children\":[[[\"$\",\"path\",\"1cjeqo\",{\"d\":\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"}],[\"$\",\"path\",\"19qd67\",{\"d\":\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"}]],\"$undefined\"}]}]}]},\"\\n\",[\"$\",\"p\",null,{\"children\":\"Run the following command to create a new Next.js project with the LangGraph assistant-ui template:\"}],\"\\n\",[\"$\",\"$L3b\",null,{\"className\":\"shiki shiki-themes catppuccin-latte cat
```

--------------------------------

TITLE: Importing and Using Environment Variables in Node.js
DESCRIPTION: Shows how to import the `env` object from the 'node:process' module and then use it to access or set environment variables. The example includes setting an environment variable 'test' to null and then logging its value.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import { env } from 'node:process';

env.test = null;
console.log(env.test);
```

--------------------------------

TITLE: Render Navigation Links with Icons
DESCRIPTION: Renders a list of navigation links, each with an associated SVG icon. The links include 'Docs', 'Showcase', 'Examples', and 'Dashboard', with external links supported. Styling is applied for a clean interface.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "1a:[",
  "$",
  "$L2a",
  null,
  {
    "children": [
      [
        [
          "$",
          "$L2b",
          "0",
          {
            "href": "/docs/getting-started",
            "icon": [
              "$",
              "svg",
              null,
              {
                "ref": "$undefined",
                "xmlns": "http://www.w3.org/2000/svg",
                "width": 24,
                "height": 24,
                "viewBox": "0 0 24 24",
                "fill": "none",
                "stroke": "currentColor",
                "strokeWidth": 2,
                "strokeLinecap": "round",
                "strokeLinejoin": "round",
                "className": "lucide lucide-book",
                "aria-hidden": "true",
                "children": [
                  [
                    "$",
                    "path",
                    "k3hazp",
                    {
                      "d": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                    }
                  ],
                  "$undefined"
                ]
              }
            ],
            "external": "$undefined",
            "className": "",
            "children": "Docs"
          }
        ],
        [
          "$",
          "$L2b",
          "1",
          {
            "href": "/showcase",
            "icon": [
              "$",
              "svg",
              null,
              {
                "ref": "$undefined",
                "xmlns": "http://www.w3.org/2000/svg",
                "width": 24,
                "height": 24,
                "viewBox": "0 0 24 24",
                "fill": "none",
                "stroke": "currentColor",
                "strokeWidth": 2,
                "strokeLinecap": "round",
                "strokeLinejoin": "round",
                "className": "lucide lucide-projector",
                "aria-hidden": "true",
                "children": [
                  [
                    "$",
                    "path",
                    "1yys58",
                    {
                      "d": "M5 7 3 5"
                    }
                  ],
                  [
                    "$",
                    "path",
                    "1ptz9u",
                    {
                      "d": "M9 6V3"
                    }
                  ],
                  [
                    "$",
                    "path",
                    "1w3vmq",
                    {
                      "d": "m13 7 2-2"
                    }
                  ],
                  [
                    "$",
                    "circle",
                    "1mma13",
                    {
                      "cx": "9",
                      "cy": "13",
                      "r": "3"
                    }
                  ],
                  [
                    "$",
                    "path",
                    "2frwzc",
                    {
                      "d": "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"
                    }
                  ],
                  [
                    "$",
                    "path",
                    "dnq2od",
                    {
                      "d": "M16 16h2"
                    }
                  ],
                  "$undefined"
                ]
              }
            ],
            "external": "$undefined",
            "className": "",
            "children": "Showcase"
          }
        ],
        [
          "$",
          "$L2b",
          "2",
          {
            "href": "/examples",
            "icon": [
              "$",
              "svg",
              null,
              {
                "ref": "$undefined",
                "xmlns": "http://www.w3.org/2000/svg",
                "width": 24,
                "height": 24,
                "viewBox": "0 0 24 24",
                "fill": "none",
                "stroke": "currentColor",
                "strokeWidth": 2,
                "strokeLinecap": "round",
                "strokeLinejoin": "round",
                "className": "lucide lucide-sparkles",
                "aria-hidden": "true",
                "children": [
                  [
                    "$",
                    "path",
                    "1s2grr",
                    {
                      "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
                    }
                  ],
                  [
                    "$",
                    "path",
                    "1rf3ol",
                    {
                      "d": "M20 2v4"
                    }
                  ],
                  [
                    "$",
                    "path",
                    "gwowj6",
                    {
                      "d": "M22 4h-4"
                    }
                  ],
                  [
                    "$",
                    "circle",
                    "6kqj1y",
                    {
                      "cx": "4",
                      "cy": "20",
                      "r": "2"
                    }
                  ],
                  "$undefined"
                ]
              }
            ],
            "external": "$undefined",
            "className": "",
            "children": "Examples"
          }
        ],
        [
          "$",
          "$L2b",
          "3",
          {
            "href": "https://cloud.assistant-ui.com/",
            "icon": [
              "$",
              "svg",
              null,
              {
                "ref": "$undefined",
                "xmlns": "http://www.w3.org/2000/svg",
                "width": 24,
                "height": 24,
                "viewBox": "0 0 24 24",
                "fill": "none",
                "stroke": "currentColor",
                "strokeWidth": 2,
                "strokeLinecap": "round",
                "strokeLinejoin": "round",
                "className": "lucide lucide-cloud",
                "aria-hidden": "true",
                "children": [
                  [
                    "$",
                    "path",
                    "p7xjir",
                    {
                      "d": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                    }
                  ],
                  "$undefined"
                ]
              }
            ],
            "external": "$undefined",
            "className": "",
            "children": "Dashboard"
          }
        ],
        [
          "$",
          "$L2b",
          "4",
          {
            "href": "/pricing",
            "icon": [
              "$",
              "svg",
              null,
              {
                "ref": "$undefined",
                "xmlns": "http://www.w3.org/2000/svg",
                "width": 24,
                "height": 24,
                "viewBox": "0 0 24 24",
                "fill": "none",
                "stroke": "currentColor",
                "strokeWidth": 2,
                "strokeLinecap": "round",
                "strokeLinejoin": "round",
                "className": "lucide lucide-wallet",
                "aria-hidden": "true"
              }
            ]
          }
        ]
      ]
    ]
  }
]
)
```

--------------------------------

TITLE: React Fragment and Provider Setup
DESCRIPTION: This snippet demonstrates the initialization of a React application, likely setting up a Provider component for context management and a React Fragment.

SOURCE: https://assistant-ui.com/docs/api-reference/runtimes/ThreadRuntime

LANGUAGE: javascript
CODE:
```
self.__next_f = self.__next_f || [];
self.__next_f.push([
  0
]);
self.__next_f.push([
  1,
  "1:\"$Sreact.fragment\"\n2:I[38425,[\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"7177\",\"static/chunks/app/layout-bb03756ba71223c0.js\"],\"Provider\"]\n3:I[45320,[],\"\"]\n4:I[34494,[],\"\"]\n5:I[50228,[\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"7177\",\"static/chunks/app/layout-bb03756ba71223c0.js\"],\"\"]\n"
]);
```

--------------------------------

TITLE: Return Client Initialization in JavaScript
DESCRIPTION: This snippet shows the return statement for client initialization within a JavaScript function. It assigns the result of calling `createClient` to a variable, signifying the setup of a client object for use in the application. It also includes handling for default values and unknown parameters.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
return createClient()

```

--------------------------------

TITLE: Initialize Umami Analytics
DESCRIPTION: This snippet initializes Umami, a simple, fast, privacy-focused alternative to Google Analytics. It requires the Umami script to be loaded and configured with a website ID and domain.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function UmamiAnalytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.umami) {
        window.umami.track('pageview', { url });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <script
      async
      defer
      data-website-id="6f07c001-46a2-411f-9241-4f7f5afb60ee"
      data-domains="www.assistant-ui.com"
      src="/umami/script.js"
    />
  );
}

export default UmamiAnalytics;
```

--------------------------------

TITLE: Local Runtime Setup
DESCRIPTION: This snippet defines the setup for the 'Local Runtime', suggesting its use for running processes or models directly on the local machine. It is presented in a JavaScript context.

SOURCE: https://assistant-ui.com/docs/api-reference/overview

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"45:[\"$\",\"h3\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"local-runtime\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#local-runtime\",\"className\":\"peer\",\"children\":\"Local Runtime\"}],[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\",\"aria-label\":\"Link to section\",\"children\":[[[\"$\",\"path\",\"1cjeqo\",{\"d\":\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"}],[\"$\",\"path\",\"19qd67\",{\"d\":\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"}]],\"$undefined\" ]}] ]}]\n"])
```

--------------------------------

TITLE: Assistant UI Next Steps and Runtime Guide
DESCRIPTION: This section outlines the next steps for using Assistant UI, emphasizing the choice of runtime based on project needs. It provides links to specific guides for AI SDK, LocalRuntime, ExternalStoreRuntime, and LangGraph integrations.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: markdown
CODE:
```
## Next Steps

1. **Choose your runtime** based on the decision tree above:
2. **Follow the specific guide**:
   - [AI SDK Integration](/docs/runtimes/ai-sdk/use-chat)
   - [LocalRuntime Guide](/docs/runtimes/custom/local)
   - [ExternalStoreRuntime Guide](/docs/runtimes/custom/external-store)
   - [LangGraph Integration](/docs/runtimes/langgraph)
3. **Start with an example** from our [examples repository](https://github.com/assistant-ui/assistant-ui/tree/main/examples)
4. **Add features progressively** using adapters
5. **Consider Assistant Cloud** for production persistence
```

--------------------------------

TITLE: Navigation: Example Links List
DESCRIPTION: This snippet renders an unordered list of example project links. Each list item contains a strong tag for the example title and a brief description, with external links for accessing the code.

SOURCE: https://assistant-ui.com/docs/runtimes/data-stream

LANGUAGE: jsx
CODE:
```
self.__next_f.push([1,"5e:[\"$\",\"ul\",null,{\"children\":[\"\\n\",[\"$\",\"li\",null,{\"children\":[[\"$\",\"strong\",null,{\"children\":[[\"$\",\"$Le\",null,{\"href\":\"https://github.com/assistant-ui/assistant-ui/tree/main/examples/with-data-stream\",\"children\":\"Basic Data Stream Example\"}]}]},\" - Simple streaming chat\"],\"\\n\",[\"$\",\"li\",null,{\"children\":[[\"$\",\"strong\",null,{\"children\":[[\"$\",\"$Le\",null,{\"href\":\"https://github.com/assistant-ui/assistant-ui/tree/main/examples/with-data-stream-tools\",\"children\":\"Tool Integration Example\"}]}]},\" - Frontend and backend tools\"],\"\\n\",[\"$\",\"li\",null,{\"children\":[[\"$\",\"strong\",null,{\"children\":[[\"$\",\"$Le\",null,{\"href\":\"https://github.com/assistant-ui/assistant-ui/tree/main/examples/with-data-stream-auth\",\"children\":\"Authentication Example\"}]}]},\" - Secure endpoints\"],\"\\n\"}]}]]\n"])
```

--------------------------------

TITLE: Create New LangGraph Project
DESCRIPTION: Command to create a new Next.js project using the assistant-ui LangGraph template. This sets up the basic file structure and dependencies for a LangGraph-powered application.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: bash
CODE:
```
npx create-assistant-ui@latest -t langgraph my-app
cd my-app
```

--------------------------------

TITLE: React Fragment and Provider Setup
DESCRIPTION: This snippet shows the basic React setup, including the Fragment and Provider components, likely for managing application state and routing. It's part of the Next.js application layout.

SOURCE: https://assistant-ui.com/docs/ui/AssistantSidebar

LANGUAGE: javascript
CODE:
```
self.__next_f.push([0,{
  "P": null,
  "b": "nsoEZXezeEiEsB37v7-Ry",
  "p": "",
  "c": [
    "",
    "docs",
    "ui",
    "AssistantSidebar"
  ],
  "i": false,
  "f": [
    [
      [
        "",
        {
          "children": [
            "docs",
            {
              "children": [
                ["slug", "ui/AssistantSidebar", "oc"],
                {
                  "children": ["__PAGE__", {}]
                }
              ]
            }
          ]
        },
        "$undefined",
        "$undefined",
        true
      ],
      [
        "",
        [
          "$Sreact.fragment",
          "react.fragment"
        ]
      ]
    ]
  ]
}])
```

--------------------------------

TITLE: URLSearchParams Interface Documentation
DESCRIPTION: Explains the `URLSearchParams` interface, a utility for working with URL query strings. It provides a link to its MDN reference.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
URLSearchParams
```

--------------------------------

TITLE: JavaScript: Make POST request and get JSON response
DESCRIPTION: This snippet demonstrates making an asynchronous POST request using the 'req' object and expecting a JSON response. It's used for fetching data or sending information to an API.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
async function POST(req: Request) {
  const messages = await req.json();
}
```

--------------------------------

TITLE: Configure Chat Runtime
DESCRIPTION: Initializes the chat runtime by calling the 'useChatRuntime' hook. This hook likely manages the state and logic for chat interactions.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const runtime = useChatRuntime({
  api: "/api/chat"
});
```

--------------------------------

TITLE: Render CheckIcon in React
DESCRIPTION: This code demonstrates rendering a CheckIcon component in React, typically used to indicate success or completion. It includes theme-aware styling.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
["$","span",null,{"style":{"--shiki-light":"#EA76CB","--shiki-dark":"#F5C2E7"},"children":"CheckIcon"}]
```

--------------------------------

TITLE: Set Environment Variables (.env.local)
DESCRIPTION: Instructions for creating a .env.local file and defining necessary environment variables like API keys and URLs for Langchain and Langgraph.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: dotenv
CODE:
```
# LANGCHAIN_API_KEY=your_api_key # for production
# LANGGRAPH_API_URL=your_api_url # for production
```

--------------------------------

TITLE: URLSearchParams Interface
DESCRIPTION: Information about the URLSearchParams interface for working with query strings.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: APIDOC
CODE:
```
## URLSearchParams

### Description
The `URLSearchParams` interface defines utility methods to work with the query string of a URL. It allows for easy manipulation of key-value pairs within the URL's search parameters.

### Endpoint
N/A (Interface)

### Usage Example
```javascript
const url = new URL('https://example.com/page?name=test&value=123');
const params = new URLSearchParams(url.search);

console.log(params.get('name')); // "test"
console.log(params.get('value')); // "123"
```

### MDN Reference
[URLSearchParams](https://developer.mozilla.org/docs/Web/API/URLSearchParams)
```

--------------------------------

TITLE: Assistant UI LLM Text Example Usage
DESCRIPTION: Demonstrates how to use the Assistant UI LLM Text hook with system instructions. The example illustrates a basic setup for integrating the hook into a component.

SOURCE: https://assistant-ui.com/docs/copilots/use-assistant-instructions

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"45:[\"$\",\"h2\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"example\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#example\",\"className\":\"peer\",\"children\":\"Example\"}], [\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\"
```

--------------------------------

TITLE: Render Button Component
DESCRIPTION: This snippet demonstrates the closing tag of a Button component, indicating its placement within a UI structure.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: HTML
CODE:
```
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c/\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"Button\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]
```

--------------------------------

TITLE: Initialize OpenAI Client with Groq API Key
DESCRIPTION: This snippet demonstrates the initialization of an OpenAI client, specifically configured for Groq. It retrieves the Groq API key from environment variables, providing a fallback if it's not found. This is essential for making API calls to Groq's language models.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
});
```

--------------------------------

TITLE: Basic Function Definition in JavaScript
DESCRIPTION: A simple JavaScript code snippet showcasing a basic function definition. This example illustrates how to declare and define a function in JavaScript, without specific framework or library dependencies.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
function greet() {
  console.log('Hello from a basic function!');
}
```

--------------------------------

TITLE: Import TooltipPrimitive from '@radix-ui/react-tooltip'
DESCRIPTION: Imports the TooltipPrimitive component from the Radix UI library, which serves as the foundation for custom tooltip implementations.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

```

--------------------------------

TITLE: POST /api/process
DESCRIPTION: This endpoint processes incoming data. It expects a JSON payload with specific fields.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: APIDOC
CODE:
```
## POST /api/process

### Description
This endpoint processes incoming data. It expects a JSON payload with specific fields.

### Method
POST

### Endpoint
/api/process

### Parameters
#### Request Body
- **input_data** (string) - Required - The data to be processed.
- **options** (object) - Optional - Additional processing options.
  - **verbose** (boolean) - Optional - Enables verbose output.

### Request Example
```json
{
  "input_data": "Some data to process.",
  "options": {
    "verbose": true
  }
}
```

### Response
#### Success Response (200)
- **result** (string) - The result of the data processing.

#### Response Example
```json
{
  "result": "Processed data successfully."
}
```
```

--------------------------------

TITLE: Accessing Environment Variables in Node.js
DESCRIPTION: Demonstrates how to access environment variables using `process.env`. This example shows how to log the value of an environment variable named 'foo'. Note that accessing `process.env.foo` directly retrieves its value.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
console.log(env.foo);
```

--------------------------------

TITLE: Delete Environment Variable in Node.js
DESCRIPTION: This example shows how to delete an environment variable named 'TEST' using the `delete` keyword in Node.js. This operation modifies the current process's environment.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
delete process.env.TEST;
```

--------------------------------

TITLE: AI SDK, LangGraph, LangServe, Mastra Runtime Integration Examples
DESCRIPTION: Demonstrates how pre-built integrations like AI SDK, LangGraph, LangServe, and Mastra are built on top of 'LocalRuntime'. These integrations offer specific adapters for their respective functionalities, simplifying setup and providing automatic state management.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: text
CODE:
```
AI SDK Integration → Built on LocalRuntime with streaming adapter
LangGraph Runtime → Built on LocalRuntime with graph execution adapter
LangServe Runtime → Built on LocalRuntime with LangServe client adapter
Mastra Runtime → Built on LocalRuntime with workflow adapter
```

--------------------------------

TITLE: Set Google Generative AI API Key
DESCRIPTION: Sets the API key for Google Generative AI, enabling access to Google's AI models.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
GOOGLE_GENERATIVE_AI_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: Import Google AI SDK and Stream Text
DESCRIPTION: Imports necessary functions like 'google' and 'streamText' from the '@ai-sdk/google' package. These are foundational for interacting with Google's AI services.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

```

--------------------------------

TITLE: Assigning and Logging process.env.foo
DESCRIPTION: Shows how to assign a string value to an environment variable 'foo' using `process.env.foo` and then log it to the console using `console.log()`.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
env.foo = 'bar';
console.log(env.foo);
```

--------------------------------

TITLE: Setup Environment Variables for Assistant UI
DESCRIPTION: Instructions for setting up environment variables, typically by creating a .env file in the project root. This is crucial for configuring API keys and other settings.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: dotenv
CODE:
```
# .env
OPENAI_API_KEY=sk-...
```

--------------------------------

TITLE: Set tooltip prop for TooltipIconButton in React
DESCRIPTION: This code example shows how to set the 'tooltip' prop for a TooltipIconButton component in React. The tooltip text is 'Copy', and it's applied with theme-aware styling.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
["$","span",null,{"style":{"--shiki-light":"#DF8E1D","--shiki-dark":"#F9E2AF"},"children":" tooltip"}]
```

LANGUAGE: jsx
CODE:
```
["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":"="}]
```

LANGUAGE: jsx
CODE:
```
["$","span",null,{"style":{"--shiki-light":"#40A02B","--shiki-dark":"#A6E3A1"},"children":"\\\"Copy\\\""}]
```

--------------------------------

TITLE: Render Span with Class and Tooltip
DESCRIPTION: This snippet shows rendering a span element with a specific class name and a tooltip. It includes styling and content within the span.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: HTML
CODE:
```
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}],
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#1E66F5\",\"--shiki-dark\":\"#89B4FA\"},\"children\":\"span\"}],
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-dark\":\"#F9E2AF\"},\"children\":\" className\"}],
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"=\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\"\\\"aui-sr-only\\\"\"}]
```

--------------------------------

TITLE: Table of Contents Data Structure
DESCRIPTION: This snippet shows the structure of the table of contents data, including depth, URL, and title for each section.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: json
CODE:
```
{"toc":[{"depth":2,"url":"#start-with-a-new-project","title":"Start with a new project"},{"depth":3,"url":"#initialize-assistant-ui","title":"Initialize assistant-ui"},{"depth":3,"url":"#add-api-key","title":"Add API key"},{"depth":3,"url":"#start-the-app","title":"Start the app"},{"depth":2,"url":"#manual-installation","title":"Manual installation"},{"depth":3,"url":"#add-assistant-ui","title":"Add assistant-ui"},{"depth":3,"url":"#setup-bac"}]}
```

--------------------------------

TITLE: AssistantRuntimeProvider Setup in JavaScript/TypeScript
DESCRIPTION: Demonstrates the basic setup of the `AssistantRuntimeProvider` component, commonly used for runtime configurations in Assistant UI. This setup is typically part of a React application's main entry point or a relevant parent component.

SOURCE: https://assistant-ui.com/docs/api-reference/integrations/vercel-ai-sdk

LANGUAGE: javascript
CODE:
```
import { AssistantRuntimeProvider } from "@assistant-ui/react";

function App() {
  return (
    <AssistantRuntimeProvider>
      {/* Your application components */}
    </AssistantRuntimeProvider>
  );
}

```

--------------------------------

TITLE: Avoiding Over-engineering
DESCRIPTION: It's recommended to start with pre-built integrations before attempting to build custom solutions.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: text
CODE:
```
Over-engineering Start with pre-built integrations before building custom solutions
```

--------------------------------

TITLE: Component Imports for UI Development
DESCRIPTION: Demonstrates the import of several key libraries used for building user interfaces, including Radix UI for tooltips, Radix UI slot, Lucide React for icons, remark-gfm for markdown processing, class-variance-authority for styling, and clsx for conditional class names.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import @radix-ui/react-tooltip
import @radix-ui/react-slot
import lucide-react
import remark-gfm
import class-variance-authority
import clsx
```

--------------------------------

TITLE: Define LangGraph Runtime and Thread State
DESCRIPTION: This example demonstrates the structure for defining the LangGraph runtime, including the `messages` property typed as `LangChainMessage[]`. It also shows the basic structure of a `ThreadState` object.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
getThreadState: (threadId: string) => Promise<ThreadState<{
  messages: LangChainMessage[];
}> {
}
```

--------------------------------

TITLE: Accessing Node.js Environment Variables (Node.js)
DESCRIPTION: Demonstrates how to access environment variables in Node.js. The `process.env` property returns an object containing the user environment. This example shows accessing the `TERM` variable.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
var process = NodeJS.Process;
process.env: NodeJS.ProcessEnv

// Example of process.env object:
{
  TERM: 'xterm-256color'
}
```

--------------------------------

TITLE: Claude Desktop Server Start
DESCRIPTION: Describes the automatic startup of the MCP server by Zed when Claude Desktop is launched. This enables the AI assistant to access documentation and examples.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: text
CODE:
```
Zed will automatically start the MCP server when needed. The assistant-ui documentation and examples will be available to the AI assistant in your conversations.
```

--------------------------------

TITLE: JavaScript: Handle GET Request with NextResponse
DESCRIPTION: This JavaScript code defines a function to handle a GET request and return a NextResponse. It demonstrates how to structure an API route handler in a framework like Next.js.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
const GET = req: NextRequest = > Promise<NextResponse> {
  return NextResponse.json('req: NextRequest')
}
```

--------------------------------

TITLE: Setup Proxy Backend Endpoint (Next.js)
DESCRIPTION: This Next.js API route acts as a proxy, forwarding requests to the LangGraph server. It handles different HTTP methods, manages query parameters, and sets CORS headers. It's designed for optional production use, recommending limited endpoint access and authorization.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
import { NextRequest, NextResponse } from "next/server";


function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };
}

async function handleRequest(req: NextRequest, method: string) {
  try {
    const path = req.nextUrl.pathname.replace(/^\/?api\//, "");
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    searchParams.delete("_path");
    searchParams.delete("nxtP_path");
    const queryString = searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";

    const options: RequestInit = {
      method,
      headers: {
        "x-api-key": process.env["LANGCHAIN_API_KEY"] || "",
      },
    };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      options.body = await req.text();
    }

    const res = await fetch(
      `${process.env["LANGGRAPH_API_URL"]}/${path}${queryString}`,
      options,
    );

    return new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: {
        ...res.headers,
        ...getCorsHeaders(),
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}

export const GET = (req: NextRequest) => handleRequest(req, "GET");
export const POST = (req: NextRequest) => handleRequest(req, "POST");
export const PUT = (req: NextRequest) => handleRequest(req, "PUT");
export const PATCH = (req: NextRequest) => handleRequest(req, "PATCH");
export const DELETE = (req: NextRequest) => handleRequest(req, "DELETE");

// Add a new OPTIONS handler
export const OPTIONS = () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...getCorsHeaders(),
    },
  });
};

```

--------------------------------

TITLE: Importing Assistant UI Components
DESCRIPTION: Demonstrates importing the necessary component for the assistant UI from a specified path. This is a fundamental step for integrating the UI into a React application.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import App from "@/components/assistant-ui/thread";
```

--------------------------------

TITLE: Stream text with Ollama AI
DESCRIPTION: This snippet illustrates streaming text responses with the Ollama AI provider, specifically using the 'llama3' model. It depends on the 'ollama-ai-provider' package and the 'ai' SDK.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
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

--------------------------------

TITLE: Install shadcn/ui CLI
DESCRIPTION: This command installs the shadcn/ui CLI globally, allowing you to use its features for your project. Ensure you have Node.js and npm installed.

SOURCE: https://assistant-ui.com/docs/ui/AssistantSidebar

LANGUAGE: bash
CODE:
```
npx shadcn@latest add assistant-sidebar
```

--------------------------------

TITLE: URL Properties
DESCRIPTION: Accessing the URL string and search parameters from a URL object.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: APIDOC
CODE:
```
## GET /url

### Description
Retrieves information about a URL, including its full string representation and search parameters.

### Method
GET

### Endpoint
/url

### Parameters
#### Query Parameters
- **url** (string) - Required - The URL to inspect.

### Response
#### Success Response (200)
- **url** (string) - The complete URL string.
- **search** (string) - The query string part of the URL (including '?').

### Response Example
```json
{
  "url": "https://example.com/page?name=test&value=123",
  "search": "?name=test&value=123"
}
```
```

--------------------------------

TITLE: Render Lucide Wallet Icon
DESCRIPTION: Renders the Lucide Wallet icon, associated with 'Pricing' links. This SVG uses paths to depict a wallet with coins and a strap.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
["$","svg",null,{
  "ref": "$undefined",
  "xmlns": "http://www.w3.org/2000/svg",
  "width": 24,
  "height": 24,
  "viewBox": "0 0 24 24",
  "fill": "none",
  "stroke": "currentColor",
  "strokeWidth": 2,
  "strokeLinecap": "round",
  "strokeLinejoin": "round",
  "className": "lucide lucide-wallet",
  "aria-hidden": "true",
  "children": [
    ["$","path", "18etb6", {"d": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],
    ["$","path", "xoc0q4", {"d": "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"}],
    "$undefined"
  ]
}]
```

--------------------------------

TITLE: Define TooltipProvider component
DESCRIPTION: Defines the TooltipProvider component, which likely wraps other tooltip components to provide context and manage shared state or configurations.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const TooltipProvider = TooltipPrimitive.Provider;

```

--------------------------------

TITLE: JavaScript URL Constructor
DESCRIPTION: Shows the instantiation of a JavaScript `URL` object. This is typically used for parsing and manipulating URLs.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
const url = new URL: URL("URL")
```

--------------------------------

TITLE: Memoize Markdown Components
DESCRIPTION: This code snippet appears to be related to memoizing markdown components, likely for performance optimization. It references 'memoizeMarkdownComponents' which suggests a custom utility for this purpose.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
memoizeMarkdownComponents
```

--------------------------------

TITLE: Install @assistant-ui/react-ui
DESCRIPTION: Install the assistant-ui react package using npm. This is the first step to using the AssistantModal component.

SOURCE: https://assistant-ui.com/docs/legacy/styled/AssistantModal

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-ui
```

--------------------------------

TITLE: Basic Function Definition in TypeScript
DESCRIPTION: This snippet shows a basic function definition in TypeScript. It includes the 'function' keyword and a placeholder for the function body, indicating the start of a new function declaration.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
self.__next_f.push([
  1,
  'function',
]);
self.__next_f.push([
  1,
  ' ',
]);
self.__next_f.push([
  1,
  ' ',
]);

```

--------------------------------

TITLE: Render AssistantModal and AssistantRuntimeProvider Components
DESCRIPTION: These snippets demonstrate the structure for rendering the AssistantModal and AssistantRuntimeProvider components, likely within a larger UI framework. They show the closing tags for these components, indicating their usage in the application's JSX or template.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "316:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" <\"}]},{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"AssistantModal\"},{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" /\u003e\"}]}]])
self.__next_f.push([
  1,
  "317:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" </\"}]},{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"AssistantRuntimeProvider\"},{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]}]])
self.__next_f.push([
  1,
  "318:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" )\"}]},{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]}]])
self.__next_f.push([
  1,
  "319:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]}]])"
])
```

--------------------------------

TITLE: Define and Call React Component Function with Props
DESCRIPTION: This code illustrates the definition of a React functional component that accepts various props, including `className`. It shows how to destructure props and pass them down, often used for reusable UI elements. The example includes handling spread props.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
self.__next_f.push([1,"2a5:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#1E66F5\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#89B4FA\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" code\"},{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"},{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\" function\"},{\"style\":{\"--shiki-light\":\"#1E66F5\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#89B4FA\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" Code\"},{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"({\"}],\[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#E64553\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#EBA0AC\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" className\"},{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"},{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" ...\"},{\"style\":{\"--shiki-light\":\"#E64553\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#EBA0AC\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\"props\"},{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" })\"}]\

```

--------------------------------

TITLE: Legacy Styled Components Documentation
DESCRIPTION: This section lists legacy styled components used in the project, including Thread, ThreadWidth, AssistantModal, Markdown, Decomposition, and Custom Scrollbar. It references their respective .mdx files.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: mdx
CODE:
```
{
  "$id": "legacy/styled/Thread.mdx",
  "type": "page",
  "name": "Thread",
  "description": "$undefined",
  "icon": "$undefined",
  "url": "/docs/legacy/styled/Thread",
  "$ref": {
    "file": "legacy/styled/Thread.mdx"
  }
}
```

LANGUAGE: mdx
CODE:
```
{
  "$id": "legacy/styled/ThreadWidth.mdx",
  "type": "page",
  "name": "Thread Width",
  "description": "$undefined",
  "icon": "$undefined",
  "url": "/docs/legacy/styled/ThreadWidth",
  "$ref": {
    "file": "legacy/styled/ThreadWidth.mdx"
  }
}
```

LANGUAGE: mdx
CODE:
```
{
  "$id": "legacy/styled/AssistantModal.mdx",
  "type": "page",
  "name": "AssistantModal",
  "description": "$undefined",
  "icon": "$undefined",
  "url": "/docs/legacy/styled/AssistantModal",
  "$ref": {
    "file": "legacy/styled/AssistantModal.mdx"
  }
}
```

LANGUAGE: mdx
CODE:
```
{
  "$id": "legacy/styled/Markdown.mdx",
  "type": "page",
  "name": "Markdown",
  "description": "$undefined",
  "icon": "$undefined",
  "url": "/docs/legacy/styled/Markdown",
  "$ref": {
    "file": "legacy/styled/Markdown.mdx"
  }
}
```

LANGUAGE: mdx
CODE:
```
{
  "$id": "legacy/styled/Decomposition.mdx",
  "type": "page",
  "name": "Decomposition",
  "description": "$undefined",
  "icon": "$undefined",
  "url": "/docs/legacy/styled/Decomposition",
  "$ref": {
    "file": "legacy/styled/Decomposition.mdx"
  }
}
```

LANGUAGE: mdx
CODE:
```
{
  "$id": "legacy/styled/Scrollbar.mdx",
  "type": "page",
  "name": "Custom Scrollbar",
  "description": "$undefined",
  "icon": "$undefined",
  "url": "/docs/legacy/styled/Scrollbar",
  "$ref": {
    "file": "legacy/styled/Scrollbar.mdx"
  }
}
```

--------------------------------

TITLE: Render 'pre' component with className
DESCRIPTION: This snippet demonstrates the initial part of rendering a 'pre' component. It sets up the structure with a 'line' class and prepares for passing properties, including a 'className' to the 'pre' element, likely for styling or identification.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
<
    span
    className="line"
    children={[
        ["$", "span", null, {
            "style": {
                "--shiki-light": "#1E66F5",
                "--shiki-light-font-style": "italic",
                "--shiki-dark": "#89B4FA",
                "--shiki-dark-font-style": "italic"
            },
            "children": " pre"
        }
        ], [
            "$", "span", null, {
                "style": {
                    "--shiki-light": "#179299",
                    "--shiki-dark": "#94E2D5"
                },
                "children": ":"
            }
        ], [
            "$", "span", null, {
                "style": {
                    "--shiki-light": "#7C7F93",
                    "--shiki-dark": "#9399B2"
                },
                "children": " ({"
            }
        ], [
            "$", "span", null, {
                "style": {
                    "--shiki-light": "#E64553",
                    "--shiki-light-font-style": "italic",
                    "--shiki-dark": "#EBA0AC",
                    "--shiki-dark-font-style": "italic"
                },
                "children": " className"
            }
        ], [
            "$", "span", null, {
                "style": {
                    "--shiki-light": "#7C7F93",
                    "--shiki-dark": "#9399B2"
                },
                "children": ","
            }
        ], [
            "$", "span", null, {
                "style": {
                    "--shiki-light": "#179299",
                    "--shiki-dark": "#94E2D5"
                },
                "children": " ..."
            }
        ]
    ]
}

```

--------------------------------

TITLE: Navigation Link: Examples
DESCRIPTION: Defines a navigation link for 'Examples' with a 'sparkles' icon. This link leads to '/examples' and is intended to showcase interactive or notable features of the project.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: javascript
CODE:
```
["$","$L2b","2",{"href":"/examples","icon":["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-sparkles","aria-hidden":"true","children":[[ "$","path","1s2grr",{"d":"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["$","path","1rf3ol",{"d":"M20 2v4"}],["$","path","gwowj6",{"d":"M22 4h-4"}],["$","circle","6kqj1y",{"cx":4,"cy":20,"r":2}],"$undefined"]}]},"external":"$undefined","className":"","children":"Examples"}]
```

--------------------------------

TITLE: Apply Syntax Highlighting with Shiki
DESCRIPTION: This snippet demonstrates the application of syntax highlighting using the Shiki library. It defines color themes for different code elements, differentiating between light and dark modes.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: css
CODE:
```
\"shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \\u003c\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#1E66F5\",\"--shiki-dark\":\"#89B4FA\"},\"children\":\"div\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-dark\":\"#F9E2AF\"},\"children\":\" className\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"=\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\" \\\"flex h-full flex-col\\\"\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]]}]\n61:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \\u003c\"}},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"Thread\"}]}]}\n62:[\"$\",\"span\",null,{\"className\":\"line highlighted\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-dark\":\"#F9E2AF\"},\"children\":\" welcome\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"=\"}},{\"s
```

--------------------------------

TITLE: Import Assistant UI React Markdown
DESCRIPTION: Imports the '@assistant-ui/react-markdown' package, which provides markdown rendering capabilities within the React application. This enables the display of formatted markdown content.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import "@assistant-ui/react-markdown";
```

--------------------------------

TITLE: Importing NextRequest and NextResponse (Next.js)
DESCRIPTION: Demonstrates how to import the NextRequest and NextResponse classes from the 'next/server' module in a Next.js application.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import { NextRequest, NextResponse } from "next/server";
```

--------------------------------

TITLE: MDX Navigation Tree Structure (JavaScript)
DESCRIPTION: Defines the navigation structure for MDX documentation. This object represents a tree of pages and separators, including their names, descriptions, and URLs.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
{"$id":"root","name":"mdx","children":[{"$id":"#0","type":"separator","icon":"$undefined","name":"Introduction"},{"$id":"about-assistantui.mdx","type":"page","name":"About assistant-ui","description":"$undefined","icon":"$undefined","url":"/docs/about-assistantui","$ref":{"file":"about-assistantui.mdx"}},{"$id":"getting-started.mdx","type":"page","name":"Getting Started","description":"$undefined","icon":"$undefined","url":"/docs/getting-started","$ref":{"file":"getting-started.mdx"}},{"$id":"mcp-docs-server.mdx","type":"page","name":"MCP Docs Server","description":"Learn how to use the assistant-ui MCP documentation server in your IDE to access documentation and examples directly.","icon":"$undefined","url":"/docs/mcp-docs-server","$ref":{"file":"mcp-docs-server.mdx"}},{"$id":"architecture.mdx","type":"page","name":"Architecture","description":"$undefined","icon":"$undefined","url":"/docs/architecture","$ref":{"file":"architecture.mdx"}},{"$id":"#5","type":"separator","icon":"$undefined","name":"Guides"},{"$id":"guides/context-api.mdx","type":"page","name":"Context API","description":"$undefined","icon":"$undefined","url":"/docs/guides/context-api","$ref":{"file":"guides/context-api.mdx"}},{"$id":"guides/Attachments.mdx","type":"page","name":"Attachments","description":"$undefined","icon":"$undefined","url":"/docs/guides/Attachments","$ref":{"file":"guides/Attachments.mdx"}},{"$id":"guides/Branching.mdx","type":"page","name":"Message Branching","description":"$undefined","icon":"$undefined","url":"/docs/guides/Branching","$ref":{"file":"guides/Branching.mdx"}}]}
```

--------------------------------

TITLE: Displaying Environment Variables (Shell)
DESCRIPTION: This snippet demonstrates how environment variables like PATH, PWD, EDITOR, SHLVL, HOME, LOGNAME, and the executed program are displayed.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: shell
CODE:
```
PATH='~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
PWD='/Users/maciej'
EDITOR='vim'
SHLVL='1'
HOME='/Users/maciej'
LOGNAME='maciej'
_='/usr/local/bin/node'
```

--------------------------------

TITLE: Next Steps Recommendations
DESCRIPTION: This snippet lists recommendations for further development, including learning about LangGraph runtime setup, exploring ThreadListRuntime for thread management, and checking out the LangGraph example on GitHub.

SOURCE: https://assistant-ui.com/docs/cloud/persistence/langgraph

LANGUAGE: html
CODE:
```
<ul>
  <li>Learn about <a href="/docs/runtimes/langgraph">LangGraph runtime setup</a> for your application</li>
  <li>Explore <a href="/docs/api-reference/runtimes/ThreadListRuntime">ThreadListRuntime</a> for advanced thread management</li>
  <li>Check out the <a href="https://github.com/assistant-ui/assistant-ui/tree/main/examples/with-langgraph">LangGraph example</a> on GitHub</li>
</ul>
```

--------------------------------

TITLE: Assistant UI Community and Resources
DESCRIPTION: Provides information on how to get help and access resources for Assistant UI. It includes a link to the Discord community for real-time support and the GitHub repository for code contributions and issue tracking.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: markdown
CODE:
```
Need help? Join our [Discord community](https://discord.gg/assistant-ui) or check the [GitHub](https://github.com/assistant-ui/assistant-ui).
```

--------------------------------

TITLE: Add API Endpoint
DESCRIPTION: A placeholder for adding an API endpoint. This snippet indicates where custom API endpoint logic would be implemented.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: plaintext
CODE:
```
Add an API endpoint:
```

--------------------------------

TITLE: JavaScript: Stream Text from AI Model
DESCRIPTION: This snippet shows how to use the `streamText` function to get a text stream from an AI model. It takes model configuration and message history as input. The output is a stream that can be processed further.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const result = streamText({
  model: "chromeai",
  messages: convertToModelMessages(messages),
});
```

--------------------------------

TITLE: Application Routing Structure
DESCRIPTION: This snippet defines the core routing structure of the application, likely for a Next.js application. It specifies a parallel router setup with keys for 'children', and defines templates, error handling, and not-found/forbidden/unauthorized states.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "1d:[ \"$\", \"$L3\", null, { \"parallelRouterKey\": \"children\", \"error\": \"$undefined\", \"errorStyles\": \"$undefined\", \"errorScripts\": \"$undefined\", \"template\": [ \"$\", \"$L4\", null, {} ], \"templateStyles\": \"$undefined\", \"templateScripts\": \"$undefined\", \"notFound\": \"$undefined\", \"forbidden\": \"$undefined\", \"unauthorized\": \"$undefined\" } ] \n1e:[ \"$\", \"$L32\", null, {} ] \n"])
```

--------------------------------

TITLE: Create New Next.js Project with LangGraph Template
DESCRIPTION: Command to create a new Next.js project using the LangGraph assistant-ui template. This sets up the basic project structure and dependencies.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: bash
CODE:
```
npx create-next-app@latest --example https://github.com/langchain-ai/langgraph/tree/main/templates/assistant-ui assistant-ui
```

--------------------------------

TITLE: Displaying System Instructions with Syntax Highlighting
DESCRIPTION: Demonstrates how system instructions are displayed within the Assistant UI, utilizing a Shiki syntax highlighter with specific theme configurations (catppuccin-latte, catppuccin-mocha).

SOURCE: https://assistant-ui.com/docs/copilots/model-context

LANGUAGE: jsx
CODE:
```
<div
  className="shiki shiki-themes catppuccin-latte catppuccin-mocha"
  style={{
    --shiki-light: '#4c4f69',
    --shiki-dark: '#cdd6f4',
    --shiki-light-bg: '#eff1f5',
    --shiki-dark-bg: '#1e1e2e'
  }}
  tabIndex="0"
  icon="$3c"
>
  $L3d
</div>
```

--------------------------------

TITLE: Model Selection and Message Formatting in TypeScript
DESCRIPTION: Demonstrates how to select a model (e.g., 'gemini-2.0-flash') and format messages for UI display. This function likely prepares data for a streaming response.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
model: "gemini-2.0-flash",
messages: convertToModelMessages(messages),

```

--------------------------------

TITLE: Speech Guide
DESCRIPTION: Guide on implementing speech input and output in Assistant UI.

SOURCE: https://context7_llms

LANGUAGE: APIDOC
CODE:
```
## GET /docs/guides/Speech

### Description
Guide on implementing speech input and output in Assistant UI.

### Method
GET

### Endpoint
/docs/guides/Speech
```

--------------------------------

TITLE: Load Next.js Chunks for App Docs Layout (Variant)
DESCRIPTION: Loads an alternative set of JavaScript chunks for the '/docs/layout' route, including components like 'Navbar'. This suggests variations in the layout's code splitting strategy.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "e:I[65052,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],\"Navbar\"\]\n
```

--------------------------------

TITLE: Stream Text from LLM
DESCRIPTION: This snippet demonstrates how to stream text from an LLM, likely for displaying responses in real-time within a user interface. It involves a function call to `streamText`.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
streamText()
```

--------------------------------

TITLE: Set OpenAI API Key
DESCRIPTION: Defines the OpenAI API key for authentication. This is a crucial environment variable for using OpenAI services.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: JavaScript: Rendering UI Elements with Styles
DESCRIPTION: This snippet demonstrates how to render UI elements, likely within a virtual DOM framework. It shows the structure for defining elements, applying styles based on themes (light and dark, using '--shiki-light' and '--shiki-dark' CSS variables), and passing children nodes. The 'props' object is utilized for dynamic styling and content.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"28f:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#94E2D5\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"...\"}]])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"290:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" )\"}],{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}]])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"291:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#94E2D5\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" ...\"},{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"props\"},{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"}\"}]])
```

--------------------------------

TITLE: JavaScript Response Initialization
DESCRIPTION: This snippet outlines the structure for initializing a response, specifying 'ResponseInit' as a key component. It includes type annotations for clarity.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"142:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\".\"}]\n143:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"message\"}]\n144:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" \"}]\n145:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" },\"}]\n146:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" {\"}]\n147:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" \"}]\n148:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":[\"$\",\"$Lb7\",null,{\"className\":\"twoslash-hover\",\"children\":[[\"$\",\"$Lb8\",null,{\"className\":\"nd-copy-ignore\",\"children\":[\"$\",\"div\",null,{\"className\":\"twoslash shiki fd-codeblock prose-no-margin\",\"children\":[\"$\",\"code\",null,{\"className\":\"twoslash-popup-code\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"ResponseInit\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\".\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"\n"])
```

--------------------------------

TITLE: TypeScript: RunsClient definition
DESCRIPTION: This TypeScript snippet defines 'RunsClient' and 'DefaultValues', suggesting components for managing runs and default configurations in an application.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
RunsClient<DefaultValues, DefaultValues>
```

--------------------------------

TITLE: Render Tooltip Portal in JavaScript
DESCRIPTION: This JavaScript snippet appears to be part of a rendering process, specifically for a TooltipPrimitive.Portal component. It indicates the start of a portal element with the tag '</TooltipPrimitive.Portal>' followed by a closing '>'. This is common in frameworks like React for rendering components outside their parent DOM hierarchy.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"c1:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" <\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"TooltipPrimitive.Portal\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\">\"}]]}\n
```

--------------------------------

TITLE: Set Google Vertex AI Credentials
DESCRIPTION: Configures Google Vertex AI project, location, and application credentials for using Google Cloud's AI platform.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
GOOGLE_VERTEX_PROJECT="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_VERTEX_LOCATION="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_APPLICATION_CREDENTIALS="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: Navigation Link with Icons (React)
DESCRIPTION: Renders navigation links for 'Docs', 'Showcase', 'Examples', 'Dashboard', and 'Pricing'. Each link includes an associated Lucide icon and a CSS class for styling. The 'Dashboard' link points to an external URL.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
    1,
    "1a:[\"$\",\"$L2a\",null,{\"children\":[[[\"$\",\"$L2b\",\"0\",{\"href\":\"/docs/getting-started\",\"icon\":[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide lucide-book\",\"aria-hidden\":\"true\",\"children\":[[\"$\",\"path\",\"k3hazp\",{\"d\":\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"}],\"$undefined\"],\"$undefined\"],\"external\":\"$undefined\",\"className\":\"\",\"children\":\"Docs\"}],[[\"$\",\"$L2b\",\"1\",{\"href\":\"/showcase\",\"icon\":[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide lucide-projector\",\"aria-hidden\":\"true\",\"children\":[[\"$\",\"path\",\"1yys58\",{\"d\":\"M5 7 3 5\"}],\"$\",\"path\",\"1ptz9u\",{\"d\":\"M9 6V3\"}],\"$\",\"path\",\"1w3vmq\",{\"d\":\"m13 7 2-2\"}],\"$\",\"circle\",\"1mma13\",{\"cx\":\"9\",\"cy\":\"13\",\"r\":\"3\"}],\"$\",\"path\",\"2frwzc\",{\"d\":\"M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17\"}],\"$\",\"path\",\"dnq2od\",{\"d\":\"M16 16h2\"}],\"$undefined\"],\"$undefined\"],\"external\":\"$undefined\",\"className\":\"\",\"children\":\"Showcase\"}],[[\"$\",\"$L2b\",\"2\",{\"href\":\"/examples\",\"icon\":[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide lucide-sparkles\",\"aria-hidden\":\"true\",\"children\":[[\"$\",\"path\",\"1s2grr\",{\"d\":\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"}],\"$\",\"path\",\"1rf3ol\",{\"d\":\"M20 2v4\"}],\"$\",\"path\",\"gwowj6\",{\"d\":\"M22 4h-4\"}],\"$\",\"circle\",\"6kqj1y\",{\"cx\":\"4\",\"cy\":\"20\",\"r\":\"2\"}],\"$undefined\"],\"$undefined\"],\"external\":\"$undefined\",\"className\":\"\",\"children\":\"Examples\"}],[[\"$\",\"$L2b\",\"3\",{\"href\":\"https://cloud.assistant-ui.com/\",\"icon\":[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide lucide-cloud\",\"aria-hidden\":\"true\",\"children\":[[\"$\",\"path\",\"p7xjir\",{\"d\":\"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z\"}],\"$undefined\"],\"$undefined\"],\"external\":\"$undefined\",\"className\":\"\",\"children\":\"Dashboard\"}],[[\"$\",\"$L2b\",\"4\",{\"href\":\"/pricing\",\"icon\":[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide lucide-wallet\",\"aria-hidden\":\"true\",\"children\":[[\"$\",\"path\",\"18etb6\",{\"d\":\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\"}],\"$\",\"path\",\"xoc0q4\",{\"d\":\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\"}],\"$undefined\"],\"$undefined\"],\"external\":\"$undefined\",\"className\":\"mb-4\",\"children\":\"Pricing\"}]],[[\"$\",\"$L2c\",null,{\"components\":\"$undefined\"}]]}]

```

--------------------------------

TITLE: Define LLM Provider Environment Variables
DESCRIPTION: Illustrates how to set up environment variables for LLM providers. It shows a configuration for the 'OpenAI' provider, suggesting that other providers like 'Anthropic', 'Azure', 'Gemini', etc., can also be configured similarly.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
Define environment variables:
{
  "id": "provider",
  "items": [
    "OpenAI",
    "Anthropic",
    "Azure",
    "AWS",
    "Gemini",
    "GCP",
    "Groq",
    "Fireworks",
    "Cohere",
    "Ollama",
    "Chrome AI"
  ],
  "children": [
    {
      "value": "OpenAI",
      "children": [
        {
          "className": "shiki shiki-themes catppuccin-latte catppuccin-mocha",
          "style": {
            "--shiki-light": "#4c4f69",
            "--shiki-dark": "#cdd6f4",
            "--shiki-light-bg": "#eff1f5",
            "--shiki-dark-bg": "#1e1e2e"
          },
          "tabIndex": "0",
          "title": "/.env.local",
          "icon": "<svg viewBox=\"0 0 24 24\">"
        }
      ]
    }
  ]
}
```

--------------------------------

TITLE: Set Fireworks API Key
DESCRIPTION: Configures the Fireworks AI API key, required for utilizing Fireworks AI models.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
FIREWORKS_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: Define Tooltip component
DESCRIPTION: Defines the main Tooltip component, built upon Radix UI's TooltipPrimitive.Provider, suggesting it manages the visibility and content of tooltips.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const Tooltip = TooltipPrimitive.Root;

```

--------------------------------

TITLE: Configure Anthropic Claude Model in JavaScript
DESCRIPTION: This code configures an AI model to use Anthropic's Claude, specifically the 'claude-3-5-sonnet-20240620' version. It's part of a larger setup for interacting with AI models, likely within a chat or assistant application.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
model: anthropic("claude-3-5-sonnet-20240620"),

```

--------------------------------

TITLE: Initialize Assistant UI (New Project)
DESCRIPTION: This command is used to create a new Assistant UI project. It assumes you are starting from scratch and need to generate the initial project files.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/full-stack-integration

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest create
```

--------------------------------

TITLE: URL Property: Request URL Documentation
DESCRIPTION: Describes the `url` property of the Request interface, which holds the URL of the request. It links to the MDN reference for further details.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
url: string
```

--------------------------------

TITLE: Use MyAssistant Component
DESCRIPTION: This snippet demonstrates how to use the 'MyAssistant' component in another part of the application. It shows the structure for including the component and its associated content.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: tsx
CODE:
```
$\,\"div\",null,{\"className\":\"fd-step\",\"children\":[[\"$\",\"h3\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"use-the-myassistant-component\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#use-the-myassistant-component\",\"className\":\"peer\",\"children\":[\"Use the \",[\"$\",\"code\",null,{\"children\":\"MyAssistant\"}],\" componen
```

--------------------------------

TITLE: Closing MessagePrimitive.If Tag
DESCRIPTION: Represents the closing tag for the MessagePrimitive.If component, indicating the end of a conditional rendering block.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
</MessagePrimitive.If>
```

--------------------------------

TITLE: React Compatibility Guide
DESCRIPTION: This section provides guidance on using the assistant-ui with older versions of React, specifically versions 18, 17, and 16. It addresses potential compatibility issues and solutions.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: mdx
CODE:
```
{
  "$id": "react-compatibility.mdx",
  "type": "page",
  "name": "Using old React versions",
  "description": "Guide for using assistant-ui with older React versions (18, 17, 16)",
  "icon": "$undefined",
  "url": "/docs/react-compatibility",
  "$ref": {
    "file": "react-compatibility.mdx"
  }
}
```

--------------------------------

TITLE: TooltipIconButton attributes
DESCRIPTION: Shows the configuration of a TooltipIconButton component, specifying its tooltip text, variant, and CSS class name for styling.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"hiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#EA76CB\", \"--shiki-dark\": \"#F5C2E7\" }, \"children\": \"TooltipIconButton\" } ] ] }])
self.__next_f.push([1,"hiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#DF8E1D\", \"--shiki-dark\": \"#F9E2AF\" }, \"children\": \" tooltip\" }, { \"style\": { \"--shiki-light\": \"#179299\", \"--shiki-dark\": \"#94E2D5\" }, \"children\": \"=\" } ], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#40A02B\", \"--shiki-dark\": \"#A6E3A1\" }, \"children\": \"\\\"Cancel\\\"\" } ] ] }])
self.__next_f.push([1,"hiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#DF8E1D\", \"--shiki-dark\": \"#F9E2AF\" }, \"children\": \" variant\" }, { \"style\": { \"--shiki-light\": \"#179299\", \"--shiki-dark\": \"#94E2D5\" }, \"children\": \"=\" } ], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#40A02B\", \"--shiki-dark\": \"#A6E3A1\" }, \"children\": \"\\\"default\\\"\" } ] ] }])
self.__next_f.push([1,"hiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#DF8E1D\", \"--shiki-dark\": \"#F9E2AF\" }, \"children\": \" className\" }, { \"style\": { \"--shiki-light\": \"#179299\", \"--shiki-dark\": \"#94E2D5\" }, \"children\": \"=\" } ], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#40A02B\", \"--shiki-dark\": \"#A6E3A1\" }, \"children\": \"\\\"aui-composer-cancel\\\"\" } ] ] }])
self.__next_f.push([1,"hiki-dark\":\"#94E2D5\"},\"children\":\" \u003e\"}] }])
```

--------------------------------

TITLE: Render BranchPickerPrimitive.Previous with Tooltip
DESCRIPTION: This snippet demonstrates rendering the BranchPickerPrimitive.Previous component, which is likely used to navigate to the previous item in a list. It is configured with a tooltip for user guidance.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
["$","span",null,{"className":"line","children":[["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" <"}]},{"style":{"--shiki-light":"#EA76CB","--shiki-dark":"#F5C2E7"},"children":"BranchPickerPrimitive.Previous"},{"style":{"--shiki-light":"#DF8E1D","--shiki-dark":"#F9E2AF"},"children":" asChild"},{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" >"}]}]
```

LANGUAGE: jsx
CODE:
```
["$","span",null,{"className":"line","children":[["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" <"}]},{"style":{"--shiki-light":"#EA76CB","--shiki-dark":"#F5C2E7"},"children":"TooltipIconButton"},{"style":{"--shiki-light":"#DF8E1D","--shiki-dark":"#F9E2AF"},"children":" tooltip"},{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":"="},{"style":{"--shiki-light":"#40A02B","--shiki-dark":"#A6E3A1"},"children":" \"Previous\""},{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" >"}]}]
```

--------------------------------

TITLE: Import TooltipIconButton component
DESCRIPTION: Imports the TooltipIconButton component from '@ /components/assistant-ui/tooltip-icon-button'. This component likely combines an icon button with a tooltip for user interaction.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
```

--------------------------------

TITLE: Response Handling API
DESCRIPTION: This section details how the API handles responses, including status codes and status text.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: APIDOC
CODE:
```
## GET /api/response/status

### Description
Retrieves the status code of the API response.

### Method
GET

### Endpoint
/api/response/status

### Parameters
#### Query Parameters
- **response** (Response) - Required - The response object to check.

### Response
#### Success Response (200)
- **status** (number) - The HTTP status code of the response.

### Response Example
```json
{
  "status": 200
}
```

## GET /api/response/statusText

### Description
Retrieves the status text of the API response.

### Method
GET

### Endpoint
/api/response/statusText

### Parameters
#### Query Parameters
- **response** (Response) - Required - The response object to check.

### Response
#### Success Response (200)
- **statusText** (string | undefined) - The HTTP status text of the response.

### Response Example
```json
{
  "statusText": "OK"
}
```
```

--------------------------------

TITLE: Install Assistant UI Packages (Recommended)
DESCRIPTION: This snippet shows the recommended method for installing the assistant-ui library using npm or yarn. It highlights the core package for data streaming.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/v4-legacy

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-data-stream
# or
yarn add @assistant-ui/react-data-stream
```

--------------------------------

TITLE: Close BranchPickerPrimitive.Root Tag
DESCRIPTION: Shows the closing tag for the BranchPickerPrimitive.Root component, marking the end of its JSX element.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
self.__next_f.push([
  1,
  "\u003c/BranchPickerPrimitive.Root\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]]}]
```

--------------------------------

TITLE: Import Slottable from Radix-UI (TypeScript)
DESCRIPTION: Imports the 'Slottable' type from the '@radix-ui/react-slot' library. This is used for creating accessible component compositions.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { Slottable } from "@radix-ui/react-slot";
```

--------------------------------

TITLE: Render TooltipContent Component
DESCRIPTION: This snippet displays the closing tag of a TooltipContent component with a 'side' property, used to define the placement of the tooltip.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: HTML
CODE:
```
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"TooltipContent\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-dark\":\"#F9E2AF\"},\"children\":\" side\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"=\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"{\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"side\"}]
```

--------------------------------

TITLE: NextRequest Class Documentation
DESCRIPTION: Provides contextual documentation for the NextRequest class, explaining its purpose as an extension of the Web Request API with added convenience methods for Next.js.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: plaintext
CODE:
```
This class extends the Web Request API with additional convenience methods.
Read more: Next.js Docs: NextRequest
```

--------------------------------

TITLE: Import Button component
DESCRIPTION: Imports the Button component from the '@ /components/ui/button' path. This component is likely a reusable button element for the UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { Button } from "@/components/ui/button";
```

--------------------------------

TITLE: AssistantRuntimeProvider Usage Example
DESCRIPTION: Demonstrates how to wrap an application with AssistantRuntimeProvider, passing a runtime object obtained from useChatRuntime. This is essential for assistant-ui components to work.

SOURCE: https://assistant-ui.com/docs/api-reference/context-providers/AssistantRuntimeProvider

LANGUAGE: javascript
CODE:
```
import { AssistantRuntimeProvider } from "@assistant-ui/react";

const MyApp = () => {
  const runtime = useChatRuntime({ api: "/api/chat" });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* your app */}
    </AssistantRuntimeProvider>
  );
};
```

--------------------------------

TITLE: Import AssistantModal Component
DESCRIPTION: Imports the AssistantModal component from the specified path. This component is likely used to display modal interfaces for assistant interactions.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import "@/components/assistant-ui/assistant-modal"
```

--------------------------------

TITLE: External Store Runtime Setup
DESCRIPTION: This snippet defines the setup for the 'External Store Runtime', indicating its role in managing data stored externally. It is presented in a JavaScript context.

SOURCE: https://assistant-ui.com/docs/api-reference/overview

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"47:[\"$\",\"h3\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"external-store-runtime\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#external-store-runtime\",\"className\":\"peer\",\"children\":\"External Store Runtime\"}],[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\",\"aria-label\":\"Link to section\",\"children\":[[[\"$\",\"path\",\"1cjeqo\",{\"d\":\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"}],[\"$\",\"path\",\"19qd67\",{\"d\":\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"}]],\"$undefined\" ]}] ]}]\n"])
```

--------------------------------

TITLE: Setup Backend Route for Streaming
DESCRIPTION: Demonstrates how to create an API route using the AI SDK v4 for streaming capabilities. The example route is located at '@/app/api/chat/route.ts'.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/v4-legacy

LANGUAGE: typescript
CODE:
```
// Example route file: '@/app/api/chat/route.ts'
// Content of the route file would go here, demonstrating streaming capabilities.
```

--------------------------------

TITLE: Get URLSearchParams from search parameters
DESCRIPTION: This code snippet demonstrates how to create a URLSearchParams object from the current URL's search parameters in JavaScript. It utilizes the built-in URLSearchParams class.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
const searchParams = new URLSearchParams(window.location.search);
```

--------------------------------

TITLE: CopyIcon Component
DESCRIPTION: Showcases the CopyIcon component, which is likely used to represent a copy action within the UI. It might be integrated with other components for functionality.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
<CopyIcon />
```

--------------------------------

TITLE: Shell: Run postinstall script for patches
DESCRIPTION: This snippet shows how to execute the postinstall script using npm. Running this script applies necessary patches to the project, ensuring all functionalities are correctly set up.

SOURCE: https://assistant-ui.com/docs/react-compatibility

LANGUAGE: bash
CODE:
```
npm run postinstall
```

--------------------------------

TITLE: Navigation Link: Examples
DESCRIPTION: A navigation link for 'Examples' with a Lucide 'sparkles' icon. It points to the '/examples' route.

SOURCE: https://assistant-ui.com/docs/architecture

LANGUAGE: javascript
CODE:
```
["$","$L2b","2",{"href":"/examples","icon":["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-sparkles","aria-hidden":"true","children":[["$","path","1s2grr",{"d":"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["$","path","1rf3ol",{"d":"M20 2v4"}],["$","path","gwowj6",{"d":"M22 4h-4"}],["$","circle","6kqj1y",{"cx":4,"cy":20,"r":2}],"$undefined"]}]},"external":"$undefined","className":"","children":"Examples"}]
```

--------------------------------

TITLE: Next.js Route Initialization (DocsChat)
DESCRIPTION: Initializes the Next.js framework with routing information for the DocsChat component. This includes a list of JavaScript chunks required for its functionality.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"32:I[31444,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],\"DocsChat\"]\n
```

--------------------------------

TITLE: Run Postinstall Script
DESCRIPTION: Executes the postinstall script to apply all defined patches.

SOURCE: https://assistant-ui.com/docs/react-compatibility

LANGUAGE: bash
CODE:
```
npm run postinstall
yarn postinstall
```

--------------------------------

TITLE: Best Practices for LLM UI Components
DESCRIPTION: Outlines best practices for managing system instructions and tools within an LLM UI. It covers how to keep instructions focused, use specific hooks for instructions and visibility, and how to define tool schemas and behavior using helper functions.

SOURCE: https://assistant-ui.com/docs/copilots/model-context

LANGUAGE: text
CODE:
```
Best Practices

System Instructions
Keep them focused and specific to the component's purpose
Use useAssistantInstructions for explicit instructions
Let makeAssistantVisible handle component structure

Tools
Use the tool() helper to define tool schemas and behavior
Pre
```

--------------------------------

TITLE: SpeechSynthesisAdapter Usage
DESCRIPTION: Demonstrates the definition and usage of the SpeechSynthesisAdapter in the UI. It highlights the adapter's role in handling speech-related functionalities.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
speech?: SpeechSynthesisAdapter;
feedback?: FeedbackAdapter;
```

--------------------------------

TITLE: Define Prompt String
DESCRIPTION: This snippet demonstrates how to define a prompt string, likely for use in a conversational AI or assistant interface. It assigns a specific question to the 'prompt' variable.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
prompt = "What is assistant-ui?"
```

--------------------------------

TITLE: Basic React App Setup with AssistantRuntimeProvider
DESCRIPTION: This code illustrates a basic React functional component, `MyApp`, which utilizes the `AssistantRuntimeProvider`. It's a foundational setup for integrating Assistant UI features into a React application.

SOURCE: https://assistant-ui.com/docs/api-reference/context-providers/AssistantRuntimeProvider

LANGUAGE: javascript
CODE:
```
const MyApp = () => {
  return {
    // App content here
  };
};

```

--------------------------------

TITLE: Import AssistantRuntime
DESCRIPTION: Shows the import statement for AssistantRuntime from a React package. This suggests the use of a specific runtime environment for managing assistant functionalities.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import("/vercel/path0/packages/react/dist/index")
.AssistantRuntime
```

--------------------------------

TITLE: Configure Remark GFM Plugin
DESCRIPTION: Imports the 'remarkGfm' plugin for remark, a markdown processor. This plugin enables support for GitHub Flavored Markdown (GFM) features, enhancing markdown parsing capabilities.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import remarkGfm from "remark-gfm";
```

--------------------------------

TITLE: Client Initialization in TypeScript
DESCRIPTION: Demonstrates the initialization of a `client` variable using `const` in TypeScript. This snippet likely sets up a client instance for interacting with a service, possibly related to the LLM or UI.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const client: Client
```

--------------------------------

TITLE: Install Assistant UI MCP Docs Server
DESCRIPTION: This command installs the necessary package for the Assistant UI documentation server. It ensures all dependencies are met for serving documentation.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: bash
CODE:
```
npx @assistant-ui/mcp-docs-server
```

--------------------------------

TITLE: Stream Text Output
DESCRIPTION: This snippet demonstrates how to initiate a text stream from a language model. It shows the basic structure for calling a streaming function with model and message parameters.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"37c:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" model\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#1E66F5\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#89B4FA\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" groq\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"(\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\"\\\"llama3-70b-8192\\\"\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\")\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}]}]}])...
```

--------------------------------

TITLE: Get Thread State Function (TypeScript)
DESCRIPTION: Defines a TypeScript function `getThreadState` that takes a threadId string and returns a Promise. This function is asynchronous and likely interacts with a system to fetch the state of a given thread.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
function getThreadState(threadId: string): Promise<any> {
  return await getThreadState(threadId);
}
```

--------------------------------

TITLE: TypeScript: Response Initialization Headers
DESCRIPTION: Shows the structure for initializing Response headers using the HeadersInit type in TypeScript. This is typically used within ResponseInit.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
ResponseInit.headers: HeadersInit | undefined
```

--------------------------------

TITLE: Export UI Assistant Configuration
DESCRIPTION: Exports various configuration constants or variables for the UI Assistant. These might include model identifiers, API keys, or other settings required for the assistant's operation.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
export {};
export const client = new AzureChat({})
```

--------------------------------

TITLE: TypeScript: Function to get threadId
DESCRIPTION: Illustrates a function that likely retrieves or generates a 'threadId'. It returns a 'string' and is marked with a comment indicating it's a command, suggesting it's part of a larger CLI or API interaction.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
threadId: string;
```

--------------------------------

TITLE: AssistantRuntimeProvider
DESCRIPTION: Documentation for the AssistantRuntimeProvider context provider.

SOURCE: https://context7_llms

LANGUAGE: APIDOC
CODE:
```
## GET /api-reference/context-providers/AssistantRuntimeProvider

### Description
Documentation for the AssistantRuntimeProvider context provider.

### Method
GET

### Endpoint
/api-reference/context-providers/AssistantRuntimeProvider
```

--------------------------------

TITLE: Initialize Assistant UI Project
DESCRIPTION: This command installs the latest version of Assistant UI and sets up the project with necessary dependencies and configuration files. It includes the creation of a default chat API route.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/full-stack-integration

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest init
```

--------------------------------

TITLE: Set Request Method in RequestInit (TypeScript)
DESCRIPTION: Demonstrates how to set the 'method' property within the RequestInit object in TypeScript. This property specifies the HTTP request method (e.g., GET, POST). It accepts a string or undefined.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
self.__next_f.push([1, "86:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" \"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":[\"$\",\"$Lb7\",null,{\"className\":\"twoslash-hover\",\"children\":[[\"$\",\"$Lb8\",null,{\"className\":\"nd-copy-ignore\",\"children\":[[\"$\",\"div\",null,{\"className\":\"twoslash shiki fd-codeblock prose-no-margin\",\"children\":[\"$\",\"code\",null,{\"className\":\"twoslash-popup-code\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"RequestInit\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\".\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"method\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"?:\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" string \"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"|\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#D20F39\",\"--shiki-dark\":\"#F38BA8\"},\"children\":\" undefined\"}]}]}]},{\"$\",\"div\",null,{\"className\":\"prose twoslash-popup-docs\",\"children\":[[\"$\",\"p\",null,{\"children\":\"A string to set request's method.\"}]}]}]}],\"$\",$Lb9\",null,{\"children\":\"method\"}]}]}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\".\"}]])self.__next_f.push([1, "87:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" \"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":[\"$\",\"$Lb7\",null,{\"className\":\"twoslash-hover\",\"children\":[[\"$\",\"$Lb8\",null,{\"className\":\"nd-copy-ignore\",\"children\":[[\"$\",\"div\",null,{\"className\":\"twoslash shiki fd-codeblock prose-no-margin\",\"children\":[\"$\",\"code\",null,{\"className\":\"twoslash-popup-code\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"RequestInit\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\".\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"headers\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"?:\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" HeadersInit \"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"|\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#D20F39\",\"--shiki-dark\":\"#F38BA8\"},\"children\":\" undefined\"}]}]}]},{\"$\",\"div\",null,{\"className\":\"prose twoslash-popup-docs\",\"children\":[[\"$\",\"p\",null,{\"children\":\"A Headers object, an object literal, or an array of two-item arrays to set request's headers.\"}]}]}]}],\"$\",$Lb9\",null,{\"children\":\"headers\"}]}]}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" {\"}]])self.__next_f.push([1, "88:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\" \\\"x-api-key\\\"\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"c
```

--------------------------------

TITLE: Initialize Assistant UI Frontend (Existing Project)
DESCRIPTION: Integrates Assistant UI into an existing project. This command is used when you already have a frontend project set up.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/separate-server-integration

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest
```

--------------------------------

TITLE: Define Page Metadata (JavaScript)
DESCRIPTION: Defines essential metadata for a web page, including character set, viewport settings, and page title. This is crucial for SEO and proper rendering across different devices.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"25:[[\"$\",\"meta\",\"0\",{\"charSet\":\"utf-8\"}], [\"$\",\"meta\",\"1\",{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"}]]\n21:null\n"])
```

--------------------------------

TITLE: Configure useLangGraphRuntime with Options
DESCRIPTION: Demonstrates the usage of the `useLangGraphRuntime` hook with various configuration options. These options allow customization of behavior like pending tool call cancellation, adapter integration, attachment handling, feedback mechanisms, and speech support.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
const { autoCancelPendingToolCalls, adapters, attachments, feedback, speech, unstable_allowCancellation } = useLangGraphRuntime({
  autoCancelPendingToolCalls: {},
  adapters: {},
  attachments: {},
  feedback: {},
  speech: {},
  unstable_allowCancellation: true
});
```

--------------------------------

TITLE: Define MyApp Component
DESCRIPTION: Defines a functional React component named 'MyApp'. This is a common pattern for creating the root component of a React application.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const MyApp = () => {
  // Component logic here
}
```

--------------------------------

TITLE: Array includes() Method - TypeScript
DESCRIPTION: Demonstrates the usage of the `includes()` method in TypeScript to check for the presence of an element in an array. It returns a boolean value indicating whether the element is found. The search can optionally start from a specified index.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
array.includes(searchElement: string, fromIndex?: number): boolean
```

--------------------------------

TITLE: Get Thread State Function (TypeScript)
DESCRIPTION: Defines a TypeScript function `getThreadState` that takes a `threadId` (string) and returns an unspecified type. This function is likely used to retrieve the current status or data associated with a specific thread.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const getThreadState: (threadId: string) =>
  // ... implementation details not fully shown in snippet
```

--------------------------------

TITLE: Render TooltipTrigger Component
DESCRIPTION: This snippet shows the closing tag of a TooltipTrigger component, which is typically used to wrap elements that trigger a tooltip.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: HTML
CODE:
```
[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c/\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"TooltipTrigger\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]
```

--------------------------------

TITLE: CORS Headers Configuration
DESCRIPTION: Sets standard CORS headers for Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers. These headers control cross-origin resource sharing policies.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};
```

--------------------------------

TITLE: Next.js Routing Configuration
DESCRIPTION: Defines the parallel routing structure for a Next.js application. It specifies the 'children' router key and provides a template for the page layout.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "1d:[\"$\", \"$L3\", null, { \"parallelRouterKey\": \"children\", \"error\": \"$undefined\", \"errorStyles\": \"$undefined\", \"errorScripts\": \"$undefined\", \"template\": [ \"$\", \"$L4\", null, {} ], \"templateStyles\": \"$undefined\", \"templateScripts\": \"$undefined\", \"notFound\": \"$undefined\", \"forbidden\": \"$undefined\", \"unauthorized\": \"$undefined\" }]\n1e: [ \"$\", \"$L32\", null, {} ]\n"])
```

--------------------------------

TITLE: Render 'blockquote' with dynamic className prop
DESCRIPTION: This code illustrates rendering a 'blockquote' element. It demonstrates how a dynamic 'className' prop is passed, receiving its value from a 'props' object, and subsequently uses an arrow function syntax.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
["$","span",null,{"className":"line","children":[["$","span",null,{"style":{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#89B4FA","--shiki-dark-font-style":"italic"},"children":" blockquote"}],["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":":"}],["$","span",null,{"style":{"--shiki-light":"#7C7F93","--shiki-dark":"#9399B2"},"children":" ({\"}"},["$","span",null,{"style":{"--shiki-light":"#E64553","--shiki-light-font-style":"italic","--shiki-dark":"#EBA0AC","--shiki-dark-font-style":"italic"},"children":" className"}],["$","span",null,{"style":{"--shiki-light":"#7C7F93","--shiki-dark":"#9399B2"},"children":","}],["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" ..."}],["$","span",null,{"style":{"--shiki-light":"#E64553","--shiki-light-font-style":"italic","--shiki-dark":"#EBA0AC","--shiki-dark-font-style":"italic"},"children":"props"}],["$","span",null,{"style":{"--shiki-light":"#7C7F93","--shiki-dark":"#9399B2"},"children":" })"}],["$","span",null,{"style":{"--shiki-light":"#8839EF","--shiki-dark":"#CBA6F7"},"children":" =>"}],["$","span",null,{"style":{"--shiki-light":"#4C4F69","--shiki-dark":"#CDD6F4"},"children":" ("}]]}]
```

--------------------------------

TITLE: Import React Hooks and Components
DESCRIPTION: Imports essential hooks and components like FC, memo, and useState from the 'react' library. These are fundamental for building React components and managing their state.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { FC, memo, useState } from "react";
```

--------------------------------

TITLE: Assistant UI Configuration Example
DESCRIPTION: An example JSON configuration for the Assistant UI, specifying the 'servers' and 'assistant-ui' properties. This configuration is used to define the behavior and components of the UI.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: json
CODE:
```
{
 "servers": {},
 "assistant-ui": {}
}
```

--------------------------------

TITLE: Install @assistant-ui/react-ui Package
DESCRIPTION: This command installs the @assistant-ui/react-ui package, which is necessary for using the AssistantModal component. Ensure you have Node.js and npm or yarn installed.

SOURCE: https://assistant-ui.com/docs/legacy/styled/AssistantModal

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-ui
yarn add @assistant-ui/react-ui
```

--------------------------------

TITLE: HTML for 'aui-thread-welcome-root' div
DESCRIPTION: This snippet details the HTML for a div element with the class 'aui-thread-welcome-root'. It demonstrates how class names are assigned to elements, likely for styling or component identification in the UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> &lt;</span><span style="--shiki-light: #1E66F5; --shiki-dark: #89B4FA;">div</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> className</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;">=</span><span style="--shiki-light: #40A02B; --shiki-dark: #A6E3A1;">"aui-thread-welcome-root"</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;">&gt;</span>
```

--------------------------------

TITLE: Import AssistantModal from @assistant-ui/react-ai-sdk
DESCRIPTION: This snippet demonstrates the import of the `AssistantModal` component from the '@assistant-ui/react-ai-sdk' library. This component likely provides a modal interface for interacting with an AI assistant.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { AssistantModal } from "@assistant-ui/react-ai-sdk";
```

--------------------------------

TITLE: Using Chat Runtime Hook
DESCRIPTION: Illustrates the initialization of the 'useChatRuntime' hook, which is likely used to manage chat-related state and logic. It shows how to destructure properties from the hook's return value.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
const runtime = useChatRuntime({
  // ... configuration options
});

const { api } = runtime;
```

--------------------------------

TITLE: Define AssistantRuntime Configuration
DESCRIPTION: Defines a constant named `runtime` which is an instance of `AssistantRuntime`. This likely sets up the runtime environment for an assistant, specifying its type and potentially initial configuration.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const runtime: AssistantRuntime
```

--------------------------------

TITLE: Use useLangGraphRuntime Hook
DESCRIPTION: Demonstrates the usage of the useLangGraphRuntime hook. This hook is likely employed to integrate LangGraph's runtime capabilities within the Assistant UI.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
useLangGraphRuntime
```

--------------------------------

TITLE: Initialize Mastra Server Project
DESCRIPTION: This command initializes a new Mastra server project in the specified directory. It sets up the basic project structure and configuration files. Ensure you replace 'your-mastra-server-directory' with your desired project name.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/separate-server-integration

LANGUAGE: bash
CODE:
```
cd your-mastra-server-directory # Replace with the actual directory name
```

--------------------------------

TITLE: MCP Docs Server
DESCRIPTION: Learn how to use the assistant-ui MCP documentation server in your IDE to access documentation and examples directly.

SOURCE: https://context7_llms

LANGUAGE: APIDOC
CODE:
```
## GET /docs/mcp-docs-server

### Description
Learn how to use the assistant-ui MCP documentation server in your IDE to access documentation and examples directly.

### Method
GET

### Endpoint
/docs/mcp-docs-server
```

--------------------------------

TITLE: Import Azure SDK for AI
DESCRIPTION: Imports necessary functions from the Azure SDK and the 'ai' library. This includes components for handling Azure-specific AI functionalities and converting data to model messages.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { } from "@ai-sdk/azure";
import { } from "ai";
```

--------------------------------

TITLE: Example with Multiple Tools
DESCRIPTION: Demonstrates an example UI component with multiple tools. This likely involves interactive elements and possibly SVG icons for tool representation. The structure suggests a peer interaction for styling or functionality.

SOURCE: https://assistant-ui.com/docs/copilots/make-assistant-tool

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"44:[\"$\",\"h2\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"example-with-multiple-tools\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#example-with-multiple-tools\",\"className\":\"peer\",\"children\":\"Example with Multiple Tools\"}],[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\",\"aria-label\":\"Link to section\",\"children\":[[[\"$\",\"path\",\"1cjeqo\",{\"d\":\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"}],[\"$\",\"path\",\"19qd67\",{\"d\":\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"}]],\"$undefined\"}]}]\n"])
```

--------------------------------

TITLE: Close BranchPickerPrimitive.Next Tag
DESCRIPTION: Represents the closing tag for the BranchPickerPrimitive.Next component, signifying the end of its element in the JSX.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
self.__next_f.push([
  1,
  "\u003c/BranchPickerPrimitive.Next\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]]}]
```

--------------------------------

TITLE: Format UI Message Stream Response
DESCRIPTION: This snippet illustrates the process of taking a raw model response and transforming it into a UI-friendly format. It demonstrates the function used for this conversion.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"37f:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\" return\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" result\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\".\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#1E66F5\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#89B4FA\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\"toUIMessageStreamResponse\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"()\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]}])...
```

--------------------------------

TITLE: Next.js Route Initialization (LargeSearchToggle)
DESCRIPTION: Initializes the Next.js framework with routing information for the LargeSearchToggle component. This includes a list of JavaScript chunks required for its functionality.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"31:I[83821,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],\"LargeSearchToggle\"]\n
```

--------------------------------

TITLE: LangGraph Runtime Setup
DESCRIPTION: This snippet defines the setup for 'LangGraph Runtime', indicating its use in graph-based AI models. It is presented in a JavaScript context.

SOURCE: https://assistant-ui.com/docs/api-reference/overview

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"43:[\"$\",\"h3\",null,{\"className\":\"flex scroll-m-28 flex-row items-center gap-2\",\"id\":\"langgraph\",\"children\":[[\"$\",\"a\",null,{\"data-card\":\"\",\"href\":\"#langgraph\",\"className\":\"peer\",\"children\":\"LangGraph\"}],[\"$\",\"svg\",null,{\"ref\":\"$undefined\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"width\":24,\"height\":24,\"viewBox\":\"0 0 24 24\",\"fill\":\"none\",\"stroke\":\"currentColor\",\"strokeWidth\":2,\"strokeLinecap\":\"round\",\"strokeLinejoin\":\"round\",\"className\":\"lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100\",\"aria-label\":\"Link to section\",\"children\":[[[\"$\",\"path\",\"1cjeqo\",{\"d\":\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"}],[\"$\",\"path\",\"19qd67\",{\"d\":\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"}]],\"$undefined\" ]}] ]}]\n"])
```

--------------------------------

TITLE: Convert Messages to Model Format
DESCRIPTION: This snippet illustrates the conversion of general messages into a format suitable for the LLM. The `convertToModelMessages` function takes an array of messages as input.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
messages: convertToModelMessages(messages)
```

--------------------------------

TITLE: Render TooltipIconButton with Next
DESCRIPTION: Displays a TooltipIconButton component with the text 'Next' and applies the 'asChild' prop. This suggests it's meant to be integrated as a child element of another component.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
self.__next_f.push([
  1,
  "1ce:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"ChevronRightIcon\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" /\u003e\"}]]}]\n1cf:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c/\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"TooltipIconButton\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]]}]\n1d0:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c/\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"BranchPickerPrimitive.Next\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]]}]\n1d1:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c/\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"BranchPickerPrimitive.Root\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]]}]\n1d2:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" )\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]]}]\n1d3:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"};\"}]}]
```

--------------------------------

TITLE: Importing Assistant UI Stylesheet
DESCRIPTION: Imports the 'dot.css' stylesheet from the '@assistant-ui/react-markdown' package. This CSS file likely contains styles for markdown rendering within the Assistant UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import "@assistant-ui/react-markdown/styles/dot.css";
```

--------------------------------

TITLE: Install Dependencies with Pip
DESCRIPTION: This command installs the necessary Python dependencies for the LangGraph tutorial. Ensure you have Python and pip installed.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-2

LANGUAGE: bash
CODE:
```
pip install -r requirements.txt
```

--------------------------------

TITLE: TypeScript: ResponseInit Interface
DESCRIPTION: This snippet defines or references the `ResponseInit` interface in TypeScript, which is used to provide initial configuration for a `Response` object. It includes properties like `status` and `statusText`.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
ResponseInit.statusText: string | undefined
```

--------------------------------

TITLE: React Fragment and Provider Setup
DESCRIPTION: This snippet demonstrates the basic structure for setting up a React Fragment and a Provider component, likely used for state management or context in the application. It includes references to JavaScript chunk files.

SOURCE: https://assistant-ui.com/docs/api-reference/runtimes/MessageRuntime

LANGUAGE: javascript
CODE:
```
self.__next_f = self.__next_f || [];
self.__next_f.push([0]);
self.__next_f.push([1, "1:\"$Sreact.fragment\"\n2:I[38425,[\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"7177\",\"static/chunks/app/layout-bb03756ba71223c0.js\"],\"Provider\"]\n3:I[45320,[],\"\"]\n4:I[34494,[],\"\"]\n5:I[50228,[\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"7177\",\"static/chunks/app/layout-bb03756ba71223c0.js\"],\"\"]\n"]);
```

--------------------------------

TITLE: Load Next.js Chunks for App Docs Layout
DESCRIPTION: Loads JavaScript chunks for the '/docs/layout' route in a Next.js application. This enables dynamic loading of necessary code for the documentation layout.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "e:I[65052,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"1550\",\"static/chunks/1550-04da82d2480730d0.js\",\"7870\",\"static/chunks/app/docs/[[...slug]]/page-5c10b87452d6fdd8.js\"],"default"]\n
```

--------------------------------

TITLE: Install @assistant-ui/react-markdown
DESCRIPTION: Provides instructions for installing the @assistant-ui/react-markdown package using npm or yarn. This package is essential for enabling markdown support in the UI.

SOURCE: https://assistant-ui.com/docs/legacy/styled/Markdown

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-markdown
yarn add @assistant-ui/react-markdown
```

--------------------------------

TITLE: Next.js Route Initialization (SidebarContent)
DESCRIPTION: Initializes the Next.js framework with routing information for the SidebarContent component. This includes a list of JavaScript chunks required for its functionality.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"30:I[25322,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],\"SidebarCollapseTrigger\"]\n"])
```

--------------------------------

TITLE: Declare and Initialize Client in TypeScript
DESCRIPTION: Demonstrates the declaration and initialization of a 'client' variable using TypeScript. It showcases type annotations and the usage of a 'createClient' function. This snippet is useful for setting up client-side configurations in a web application.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const client: Client = createClient: Client = > Client<DefaultValues, DefaultValues>(unknown<DefaultValues>)
```

--------------------------------

TITLE: Close TooltipIconButton tag
DESCRIPTION: Represents the closing tag for the TooltipIconButton component, indicating the end of its structure in the UI code.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"hiki-dark\":\"#94E2D5\"},\"children\":\" \u003c/\"}], [ \"$\", \"span\", null, { \"style\": { \"--shiki-light\": \"#EA76CB\", \"--shiki-dark\": \"#F5C2E7\" }, \"children\": \"TooltipIconButton\" }, { \"style\": { \"--shiki-light\": \"#179299\", \"--shiki-dark\": \"#94E2D5\" }, \"children\": \"\u003e\" } ] ] }])
```

--------------------------------

TITLE: Integrate Assistant UI with Chat Runtime (ThreadList/Thread)
DESCRIPTION: This React component sets up the Assistant UI runtime using the '/api/chat' endpoint and renders the ThreadList and Thread components. It manages the chat interface's state and data flow.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: react
CODE:
```
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";

const MyApp = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};

```

--------------------------------

TITLE: Import cn utility from '@/lib/utils'
DESCRIPTION: Imports the 'cn' utility function, likely used for class name manipulation and conditional styling in the React components.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { cn } from "@/lib/utils"

```

--------------------------------

TITLE: AssistantRuntime Description
DESCRIPTION: The AssistantRuntime is the main entry point for the application's runtime functionalities. It initializes and manages the core components.

SOURCE: https://assistant-ui.com/docs/api-reference/runtimes/AssistantRuntime

LANGUAGE: markdown
CODE:
```
The AssistantRuntime is the root runtime of the application.
```

--------------------------------

TITLE: Node.js Worker Thread Environment Variable Handling
DESCRIPTION: Details how process.env is managed in Node.js Worker Threads. Each worker gets a copy of the parent's process.env, and modifications are local to the thread. This prevents cross-thread interference but limits global environment variable updates.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
console.log(process.env.test);
```

--------------------------------

TITLE: Install @assistant-ui/react-markdown NPM Package
DESCRIPTION: Installs the `@assistant-ui/react-markdown` package using npm, which is necessary for enabling markdown support in your assistant UI.

SOURCE: https://assistant-ui.com/docs/legacy/styled/Markdown

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-markdown
```

--------------------------------

TITLE: Define AssistantRuntimeProvider Component
DESCRIPTION: Defines the AssistantRuntimeProvider component using React. It specifies its props and likely provides a runtime context for assistant functionalities.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const AssistantRuntimeProvider: React.NamedExoticComponent<AssistantRuntimeProvider.Props>
```

--------------------------------

TITLE: Asynchronous POST Request
DESCRIPTION: This snippet defines an asynchronous function that likely performs a POST request. The `POST` keyword suggests an API call, possibly to an LLM endpoint.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
async function POST
```

--------------------------------

TITLE: Import useLangGraphRuntime Hook (React)
DESCRIPTION: Imports the `useLangGraphRuntime` hook from the `@assistant-ui/react` package. This hook is essential for integrating LangGraph capabilities into your React application.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import { useLangGraphRuntime } from "@assistant-ui/react";
```

--------------------------------

TITLE: Migration Examples Link
DESCRIPTION: Provides a link to the 'Migration Examples' section of the documentation. The link is associated with an SVG icon for visual reference.

SOURCE: https://assistant-ui.com/docs/migrations/v0-12

LANGUAGE: html
CODE:
```
<h4 class="flex scroll-m-28 flex-row items-center gap-2" id="migration-examples">
  <a data-card="" href="#migration-examples" class="peer">
    Migration Examples
  </a>
  <svg ref="$undefined" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100" aria-label="Link to section">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
</h4>
```

--------------------------------

TITLE: Import Thread Component
DESCRIPTION: Imports the Thread component from the assistant-ui library. This component is likely used for displaying conversational threads.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
import Thread from "@/components/assistant-ui";
```

--------------------------------

TITLE: Render React Component with Props (JavaScript)
DESCRIPTION: This snippet demonstrates rendering a React component (likely named 'h3') with various props and class names. It uses JSX syntax and highlights the structure for passing props and children.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
h3({
  className: "line",
  children: [
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#1E66F5",
        "--shiki-light-font-style": "italic",
        "--shiki-dark": "#89B4FA",
        "--shiki-dark-font-style": "italic"
      },
      "children": " h3"
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#179299",
        "--shiki-dark": "#94E2D5"
      },
      "children": ":"
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#7C7F93",
        "--shiki-dark": "#9399B2"
      },
      "children": " ({"
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#E64553",
        "--shiki-light-font-style": "italic",
        "--shiki-dark": "#EBA0AC",
        "--shiki-dark-font-style": "italic"
      },
      "children": " className"
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#7C7F93",
        "--shiki-dark": "#9399B2"
      },
      "children": ","
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#179299",
        "--shiki-dark": "#94E2D5"
      },
      "children": " ..."
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#E64553",
        "--shiki-light-font-style": "italic",
        "--shiki-dark": "#EBA0AC",
        "--shiki-dark-font-style": "italic"
      },
      "children": "props"
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#7C7F93",
        "--shiki-dark": "#9399B2"
      },
      "children": " })"
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#8839EF",
        "--shiki-dark": "#CBA6F7"
      },
      "children": " =>"
    }],
    ["$", "span", null, {
      "style": {
        "--shiki-light": "#4C4F69",
        "--shiki-dark": "#CDD6F4"
      },
      "children": " ("
    }]
  ]
}
)
```

--------------------------------

TITLE: Initial MCP Server Startup
DESCRIPTION: Information regarding the initial startup of the MCP server in both IDEs, noting that it may take a minute to download necessary packages from npm.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: plaintext
CODE:
```
In both IDEs it may take a minute for the MCP server to start the first time as it needs to download the package from npm.
```

--------------------------------

TITLE: Handle Request Logic in JavaScript
DESCRIPTION: This snippet demonstrates the core logic for handling incoming requests, likely within a web server or API endpoint. It includes checks for HTTP methods and processes request parameters.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"18a:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"(\"}]\n")
self.__next_f.push([1,"18b:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":[\"$\",\"$Lb7\",null,{\"className\":\"twoslash-hover\",\"children\":[[\"$\",\"$Lb8\",null,{\"className\":\"nd-copy-ignore\",\"children\":[\"$\",\"div\",null,{\"className\":\"twoslash shiki fd-codeblock prose-no-margin\",\"children\":[\"$\",\"code\",null,{\"className\":\"twoslash-popup-code\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"req\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\":\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" NextRequest\"}]}]}]}]}],\"$\",\"$Lb9\",null,{\"children\":\"req\"}]}]}]\n")
self.__next_f.push([1,"18c:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}]\n18d:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\" \\\"DELETE\\\"\"}]\n18e:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"(\"}]\n18f:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]\n190:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#CDD6F4\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" id\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"?:\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\" string\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]}]}\n"]
self.__next_f.push([1,"191:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#CDD6F4\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" type\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\" \\\"\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#A6E3A1\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\"system\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\"\\\"\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]}]}\n"]
self.__next_f.push([1,"192:[\"$\",
```

--------------------------------

TITLE: Best Practices for Tools
DESCRIPTION: This section likely provides guidance and recommendations on how to effectively design, implement, and use tools within the assistant-ui framework.

SOURCE: https://assistant-ui.com/docs/guides/Tools

LANGUAGE: markdown
CODE:
```
Best Practices
```

--------------------------------

TITLE: Closing TooltipIconButton Tag
DESCRIPTION: Illustrates the closing tag for the TooltipIconButton component, signifying the end of a button that displays a tooltip on hover.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
</TooltipIconButton>
```

--------------------------------

TITLE: Set Environment Variable in JavaScript
DESCRIPTION: Shows how to set an environment variable using `env.TEST = 1;`. This is useful for dynamically configuring application behavior during runtime.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
env.TEST = 1;
```

--------------------------------

TITLE: Define memoized Markdown components in JavaScript
DESCRIPTION: Defines and memoizes markdown components. This is a common pattern for optimizing component rendering in React applications.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const defaultComponents = memoizeMarkdownComponents({
});
```

--------------------------------

TITLE: Import React and Icons from lucide-react
DESCRIPTION: This snippet demonstrates importing various icons from the 'lucide-react' library, along with a React component. It's a common pattern for UI development where icons are frequently used.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { ArrowDownIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon, PencilIcon, RefreshCwIcon, SendHorizontalIcon } from "lucide-react"
import React from "react"

// ... rest of the component code
```

--------------------------------

TITLE: Server-side Usage Example
DESCRIPTION: Demonstrates how to use the functionality on the server-side, such as within an API route. This snippet highlights specific styling and theming configurations for a code block, likely for rendering in a UI.

SOURCE: https://assistant-ui.com/docs/guides/Tools

LANGUAGE: javascript
CODE:
```
// Server-side usage (e.g. in your API route)
```

--------------------------------

TITLE: Create a Next.js Project
DESCRIPTION: This command initializes a new Next.js project using create-next-app. It's the first step in setting up the environment for integrating assistant-ui and the AI SDK.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/use-chat

LANGUAGE: bash
CODE:
```
npx create-next-app@latest my-app
cd my-app
```

--------------------------------

TITLE: Accessing Environment Variables in Node.js (JavaScript)
DESCRIPTION: Shows how to import the 'process' module in Node.js to access environment variables. It specifically demonstrates how to retrieve the value of `process.env.foo`.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import { env } from 'node:process'

// Accessing environment variables
console.log(env.foo)
```

--------------------------------

TITLE: Context API Guide
DESCRIPTION: Guide on using the Context API for managing state in Assistant UI.

SOURCE: https://context7_llms

LANGUAGE: APIDOC
CODE:
```
## GET /docs/guides/context-api

### Description
Guide on using the Context API for managing state in Assistant UI.

### Method
GET

### Endpoint
/docs/guides/context-api
```

--------------------------------

TITLE: Add Postinstall Script to package.json
DESCRIPTION: Adds a `postinstall` script to your `package.json` file. This script automatically runs after package installation, ensuring that the necessary patches are applied to the Zustand library.

SOURCE: https://assistant-ui.com/docs/react-compatibility

LANGUAGE: json
CODE:
```
{
  // ... other package.json contents
  "scripts": {
    "postinstall": "patch-package"
  }
  // ...
}
```

--------------------------------

TITLE: HTML for 'aui-thread-welcome-message' div
DESCRIPTION: This snippet defines a div element with the class 'aui-thread-welcome-message', including the text content 'How can I help you today?'. This likely represents a message display area within the UI.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> &lt;</span><span style="--shiki-light: #1E66F5; --shiki-dark: #89B4FA;">div</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> className</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;">=</span><span style="--shiki-light: #40A02B; --shiki-dark: #A6E3A1;">"aui-thread-welcome-message"</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;">&gt;</span> How can I help you today?</span>
```

--------------------------------

TITLE: Register Tools with Model Configuration
DESCRIPTION: This snippet demonstrates how to register tools with the model's configuration. It involves returning a runtime object, highlighting the setup process for LLM tools.

SOURCE: https://assistant-ui.com/docs/guides/Tools

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"112:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\" return\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" runtime\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179
```

--------------------------------

TITLE: Specify LLM Model
DESCRIPTION: This code segment shows how to specify a particular LLM model for use, in this case, 'cohere' with the 'command-r-plus' variant. This is crucial for selecting the appropriate AI for a task.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
model: cohere("command-r-plus")
```

--------------------------------

TITLE: Render Blockquote Component in JavaScript
DESCRIPTION: This snippet demonstrates the rendering of a blockquote component within the Assistant UI. It includes the necessary props and class names for styling, specifically 'aui-md-blockquote'.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"289:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" )\"}],{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}}]]}\
"])
```

--------------------------------

TITLE: Install Syntax Highlighter with Shadcn UI
DESCRIPTION: Installs the syntax highlighter component using the Shadcn UI CLI and adds the 'react-syntax-highlighter' dependency. This command fetches the necessary component files and updates your project dependencies.

SOURCE: https://assistant-ui.com/docs/ui/SyntaxHighlighting

LANGUAGE: bash
CODE:
```
npx shadcn@latest add https://r.assistant-ui.com/syntax-highlighter
```

--------------------------------

TITLE: TypeScript interface for thread_id
DESCRIPTION: Defines the `thread_id` property as a string, commonly used for thread identification. This is part of a larger destructured assignment.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const { thread_id }: { thread_id: string }
```

--------------------------------

TITLE: Export Function Declaration (TypeScript)
DESCRIPTION: Shows the export declaration for a function in TypeScript. It indicates that a function is made available for use in other modules.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
export function 
```

--------------------------------

TITLE: JavaScript Error Handling
DESCRIPTION: This snippet demonstrates how errors are reported and handled within the project. It specifies the 'error' type and its associated message.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"13f:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":[\"$\",\"$Lb7\",null,{\"className\":\"twoslash-hover\",\"children\":[[\"$\",\"$Lb8\",null,{\"className\":\"nd-copy-ignore\",\"children\":[\"$\",\"div\",null,{\"className\":\"twoslash shiki fd-codeblock prose-no-margin\",\"children\":[\"$\",\"code\",null,{\"className\":\"twoslash-popup-code\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"error\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\":\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" any\"}]}]}]}]}],\"$\",\"$Lb9\",null,{\"children\":\"error\"}]]})self.\__next_f.push([1,"140:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\".\"}]\n141:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" \"}]\n"])
```

--------------------------------

TITLE: Set AWS Credentials and Region
DESCRIPTION: Configures AWS access key ID, secret access key, and region for AWS services. These are necessary for AWS SDK interactions.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: env
CODE:
```
AWS_ACCESS_KEY_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_REGION="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

--------------------------------

TITLE: JavaScript: Initialize Response with NextResponse
DESCRIPTION: This code illustrates the initialization of a response object using `NextResponse`. It includes setting up the response with `ResponseInit` and specifies the type as `NextResponse`, likely for server-side rendering or API routes.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "136:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"}"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#E64553\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#EBA0AC\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" init\"}],[{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"}], [{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#F9E2AF\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" ResponseInit\"}], [{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\")\"}], [{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"}], [{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#F9E2AF\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" NextResponse\"}], [{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#04A5E5\",\"--shiki-dark\":\"#89DCEB\"},\"children\":\"<\"}], [{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"{\"}]]}]\n"
])
```

--------------------------------

TITLE: Install AI SDK v5 and @assistant-ui/react
DESCRIPTION: Commands to install the necessary AI SDK and Assistant UI React package using npm. These are the core dependencies for the chat functionality.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/use-chat

LANGUAGE: bash
CODE:
```
npm install ai
npm install @assistant-ui/react
```

--------------------------------

TITLE: TooltipPrimitive Components in JavaScript
DESCRIPTION: This snippet showcases the structure for 'TooltipPrimitive.Portal' and 'TooltipPrimitive.Content' components, likely used within a React or similar UI framework. It defines the basic JSX structure for these elements.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
    1,
    "ba:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" <\"}]}},
    {\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"TooltipPrimitive.Portal\"}
    ]}]},
    "bb:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" <\"}]}},
    {\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"TooltipPrimitive.Content\"}
    ]}]},
    "bc:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-dark\":\"#F9E2AF\"},\"children\":\" ref\"}]},
    {\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"=\"}]},
    {\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"{\"}
    ]}]},
    "bd:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\"
```

--------------------------------

TITLE: Import Icons from Lucide React
DESCRIPTION: Imports 'CheckIcon' and 'CopyIcon' from the 'lucide-react' library. These icons are likely used for UI elements requiring checkmark or copy functionality.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { CheckIcon, CopyIcon } from "lucide-react";
```

--------------------------------

TITLE: Link to GitHub Source Code
DESCRIPTION: A direct link to the Assistant Runtime documentation file on GitHub, allowing users to view the source code and contribute. This link facilitates code inspection and collaboration.

SOURCE: https://assistant-ui.com/docs/api-reference/runtimes/AssistantRuntime

LANGUAGE: markdown
CODE:
```
https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/api-reference/runtimes/AssistantRuntime.mdx
```

--------------------------------

TITLE: FeedbackAdapter Usage
DESCRIPTION: Illustrates the inclusion of the FeedbackAdapter, indicating its role in managing user feedback within the Assistant UI. The code snippet shows its typical declaration.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
feedback?: FeedbackAdapter;
```

--------------------------------

TITLE: Web Request API Extension
DESCRIPTION: Explains that NextRequest extends the standard Web Request API, providing additional convenience methods for developers. It references MDN for the base Request API.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: markdown
CODE:
```
This class extends the Web API Request with additional convenience methods.
Read more: Next.js Docs: `NextRequest`
```

--------------------------------

TITLE: Button Component Function (TypeScript)
DESCRIPTION: This snippet demonstrates the structure of a Button component function in TypeScript. It takes props such as variant, size, and className, and renders the button with appropriate styling.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
function Button({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<typeof Slot> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  const Comp = Slot;
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

--------------------------------

TITLE: Close React Element (JavaScript)
DESCRIPTION: This snippet shows the closing part of a React component or element, indicated by a closing parenthesis and a comma.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
) "

```

--------------------------------

TITLE: Render Lucide Cloud Icon
DESCRIPTION: Renders the Lucide Cloud icon, used for 'Dashboard' links. The SVG defines a path that draws a cloud shape.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
["$","svg",null,{
  "ref": "$undefined",
  "xmlns": "http://www.w3.org/2000/svg",
  "width": 24,
  "height": 24,
  "viewBox": "0 0 24 24",
  "fill": "none",
  "stroke": "currentColor",
  "strokeWidth": 2,
  "strokeLinecap": "round",
  "strokeLinejoin": "round",
  "className": "lucide lucide-cloud",
  "aria-hidden": "true",
  "children": [
    ["$","path", "p7xjir", {"d": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}],
    "$undefined"
  ]
}]
```

--------------------------------

TITLE: TypeScript: Optional String Parameter
DESCRIPTION: Defines an optional string parameter, likely used for configuration or specific message attributes. The '?' denotes its optional nature.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
?: string;
```

--------------------------------

TITLE: Close TooltipIconButton Tag
DESCRIPTION: This snippet shows the closing tag for a TooltipIconButton component, indicating its proper encapsulation within the JSX structure.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
self.__next_f.push([
  1,
  "{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"TooltipIconButton\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003e\"}]]}]
```

--------------------------------

TITLE: Setting process.env.test to null
DESCRIPTION: Illustrates setting an environment variable 'test' to null. This assignment is subject to the implicit string conversion behavior mentioned in the deprecation notice.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
env.test = null;
```

--------------------------------

TITLE: AI SDK v4 Example Adaptation for v5
DESCRIPTION: Guidance on adapting existing AI SDK v4 examples for v5. It suggests using the `@assistant-ui/react-data-stream` package as a reference for patterns when migrating from v4, while noting the shift to v5 integration.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/v4-legacy

LANGUAGE: javascript
CODE:
```
For a working example with AI SDK v4, you can adapt the patterns from our AI SDK examples using the @assistant-ui/react-data-stream package instead of the v5 integration.
```

--------------------------------

TITLE: Import Cohere SDK and Stream Text Utilities
DESCRIPTION: Imports the Cohere client and necessary utility functions like `convertToModelMessages` and `streamText` from the '@ai-sdk/cohere' and 'ai' packages respectively. These are essential for interacting with Cohere's language models.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { cohere } from "@ai-sdk/cohere";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export { cohere, convertToModelMessages, streamText };

```

--------------------------------

TITLE: Close BranchPickerPrimitive Components
DESCRIPTION: This snippet demonstrates the closing tags for the TooltipIconButton and BranchPickerPrimitive.Previous components, indicating the end of their respective JSX structures.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
["$","span",null,{"className":"line","children":[["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" </"}]},{"style":{"--shiki-light":"#EA76CB","--shiki-dark":"#F5C2E7"},"children":"TooltipIconButton"},{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" >"}]}]
```

LANGUAGE: jsx
CODE:
```
["$","span",null,{"className":"line","children":[["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" </"}]},{"style":{"--shiki-light":"#EA76CB","--shiki-dark":"#F5C2E7"},"children":"BranchPickerPrimitive.Previous"},{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" >"}]}]
```

--------------------------------

TITLE: Import Button Component from UI Library
DESCRIPTION: Imports the `Button` component from a local UI library. This snippet is part of a larger import statement for UI elements.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import Button from "@/components/ui/button";
```

--------------------------------

TITLE: Install Mastra Packages
DESCRIPTION: Installs the core Mastra library, memory module, and the OpenAI provider package for the AI SDK. This command is run using npm.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/full-stack-integration

LANGUAGE: bash
CODE:
```
npm install @mastra/core@latest @mastra/memory@latest @ai-sdk/openai
```

--------------------------------

TITLE: Import Tooltip Components from UI Library
DESCRIPTION: Imports `Tooltip`, `TooltipContent`, and `TooltipTrigger` components from a local UI library located at '@components/ui/tooltip'. These components are likely used for creating interactive tooltips.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import Tooltip, { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
```

--------------------------------

TITLE: JavaScript Request/Response Handling
DESCRIPTION: This snippet demonstrates handling of requests and responses, likely within a web application context. It shows type definitions for RequestInit and Promise, and the structure for interacting with a Response object.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
RequestInit: Promise<Response>
```

--------------------------------

TITLE: Generative UI Guide
DESCRIPTION: Guide on creating generative UI elements with Assistant UI tools.

SOURCE: https://context7_llms

LANGUAGE: APIDOC
CODE:
```
## GET /docs/guides/ToolUI

### Description
Guide on creating generative UI elements with Assistant UI tools.

### Method
GET

### Endpoint
/docs/guides/ToolUI
```

--------------------------------

TITLE: Create Mastra Server Project with CLI
DESCRIPTION: Initiates the creation of a new Mastra server project using the Mastra CLI. This command triggers an interactive wizard that guides the user through project naming and configuration. Follow the prompts to complete the setup.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/separate-server-integration

LANGUAGE: bash
CODE:
```
npx create-mastra@latest
```

--------------------------------

TITLE: Example Component Usage: Form (JavaScript)
DESCRIPTION: Provides an example of how to use a form component within a React-like JavaScript application. It demonstrates rendering a basic HTML form structure and includes a comment suggesting its intended use.

SOURCE: https://assistant-ui.com/docs/copilots/model-context

LANGUAGE: javascript
CODE:
```
// Use in your component
function Form() {
  return (
    <div>
      <form>
      </form>
    </div>
  );
}
```

--------------------------------

TITLE: Execute npm command with arguments
DESCRIPTION: Demonstrates how to execute an npm command with specific arguments, including package installation flags. This is useful for setting up project dependencies or running scripts.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: bash
CODE:
```
npx @assistant-ui/mcp-docs-server
args: "-y"
```

--------------------------------

TITLE: Shiki Code Highlighting Example
DESCRIPTION: Demonstrates code highlighting using Shiki with Catppuccin themes (latte and mocha). It includes inline styles for theme customization and semantic highlighting for 'registry'.

SOURCE: https://assistant-ui.com/docs/copilots/assistant-frame

LANGUAGE: jsx
CODE:
```
self.__next_f.push([1,"4f:[\"$\",\"$L85\",null,{\"className\":\"shiki shiki-themes catppuccin-latte catppuccin-mocha\",\"style\":{\"--shiki-light\":\"#4c4f69\",\"--shiki-dark\":\"#cdd6f4\",\"--shiki-light-bg\":\"#eff1f5\",\"--shiki-dark-bg\":\"#1e1e2e\"},\"tabIndex\":\"0\",\"icon\":\"$11a\",\"children\":[\"$\",\"$L87\",null,{\"className\":\"max-h-[400px]\",\"children\":[\"$\",\"code\",null,{\"children\":[[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"registry\"}],\"$L11b\",\"$L11c\",\"$L11d\",\"$L11e\" ]}],\"\\n\",\"$L11f\",\"\\n\",\"$L120\",\"\\n\",\"$L121\",\"\\n\",\"$L122\",\"\\n\",\"$L123\",\"\\n\",\"$L124\",\"\\n\",\"$L125\",\"\\n\",\"$L126\",\"\\n\",\"$L127\",\"\\n\",\"$L128\" ]}]}]}]\n"])
```

--------------------------------

TITLE: WebSpeechSynthesisAdapter Example
DESCRIPTION: This snippet demonstrates the usage of the 'WebSpeechSynthesisAdapter'. It's presented as a code example within a larger context, indicating its role in speech synthesis functionality.

SOURCE: https://assistant-ui.com/docs/guides/Speech

LANGUAGE: javascript
CODE:
```
import { WebSpeechSynthesisAdapter } from "@react-three/drei";
```

--------------------------------

TITLE: CSS Class Import
DESCRIPTION: Imports pre-compiled CSS files for Assistant UI components, enabling styling without a direct dependency on Tailwind CSS. Includes imports for base styles and markdown-specific styles.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import "@assistant-ui/styles/index.css";
import "@assistant-ui/styles/markdown.css";
```

--------------------------------

TITLE: Render H1 component with className in React
DESCRIPTION: Demonstrates rendering an H1 component in React, passing a className prop for styling. It utilizes a shorthand for className for brevity.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
h1: ({ className, ...props }) => (
  <h1 className={cn("aui-md-h1", className)}
    {...props}
  />
),
```

--------------------------------

TITLE: UI Component Rendering Example
DESCRIPTION: Illustrates the process of defining a tool UI using the `makeAssistantToolUI` function, where it's used to specify the UI for the PriceSnapshotTool. The code snippet focuses on the structure and content of the tool's definition.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-2

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"54:[\"$\",\"$L3b\",null,{\"className\":\"shiki shiki-themes catppuccin-latte catppuccin-mocha\",\"style\":{\"--shiki-light\":\"#4c4f69\",\"--shiki-dark\":\"#cdd6f4\",\"--shiki-light-bg\":\"#eff1f5\",\"--shiki-dark-bg\":\"#1e1e2e\"},\"tabIndex\":\"0\",\"title\":\"@/components/tools/price-snapshot/PriceSnapshotTool.tsx\",\"icon\":\"$78\",\"children\":[\"$\",\"$L3d\",null,{\"className\":\"max-h-[400px]\",\"children\":[\"$\",\"code\",null,{\"children\":[[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\"type\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#F9E2AF\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" PriceSnapshotToolArgs \"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"=\"}{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" {\"}]]},{\"\\n\"},[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#CDD6F4\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" ticker\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\" string\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]]},{\"\\n\"},[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"};\"}]}],{\"\\n\"},[\"$\",\"span\",null,{\"className\":\"line\"}],{\"\\n\"},[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\"type\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#F9E2AF\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" PriceSnapshotToolResult \"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"=\"}{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" {\"}]]},{\"\\n\"},[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#CDD6F4\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" snapshot\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" {\"}]]},{\"\\n\"},[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#CDD6F4\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" price\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"},\"$L79\",\"$L7a\"}]}],{\"\\n\"},\"$L7b\",{\"\\n\"},\"$L7c\",{\"\\n\"},\"$L7d\",{\"\\n\"},\"$L7e\",{\"\\n\"},\"$L7f\"}]}]})self.__next_f.push([1,"55:[\"$\",\"p\",null,{\"children\":[\"Then, we use \",[{\"$\",\"code\",null,{\"children\":\"makeAssistantToolUI\"}],\" to define the tool UI:\"}]\n80:Tb41,["])
```

--------------------------------

TITLE: Parameter Documentation for Search and Replace
DESCRIPTION: Documents parameters for a search and replace functionality. It specifies `@param` for `searchValue` (an object for searching/replacing) and `replaceValue` (the replacement text).

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
@param searchValue An object that supports searching for and replacing matches within a string.
@param replaceValue The replacement text.
```

--------------------------------

TITLE: Handling Partial Message Events
DESCRIPTION: This code snippet demonstrates how to handle partial message events, specifically checking for 'messages/partial' and adding messages to an accumulator.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
if (event.event === "messages/partial") accumulator.addMessages(event.data);
```

--------------------------------

TITLE: TypeScript Function to Get CORS Headers
DESCRIPTION: Defines a TypeScript function `getCorsHeaders` that returns an object containing standard CORS headers. This is useful for setting up API endpoints or serverless functions that need to allow cross-origin requests. The function explicitly sets headers for 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', and 'Access-Control-Allow-Headers'.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Methods": string;
    "Access-Control-Allow-Headers": string;
  };
}
```

--------------------------------

TITLE: Import React ComponentPropsWithoutRef and forwardRef
DESCRIPTION: Imports `ComponentPropsWithoutRef` and `forwardRef` from the 'react' library. These are commonly used for defining props for React components and handling refs, respectively.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { ComponentPropsWithoutRef, forwardRef } from "react";
```

--------------------------------

TITLE: Tools Guide
DESCRIPTION: Guide on utilizing and defining tools within Assistant UI.

SOURCE: https://context7_llms

LANGUAGE: APIDOC
CODE:
```
## GET /docs/guides/Tools

### Description
Guide on utilizing and defining tools within Assistant UI.

### Method
GET

### Endpoint
/docs/guides/Tools
```

--------------------------------

TITLE: Define AttachmentAdapter Type in TypeScript
DESCRIPTION: Defines the structure for AttachmentAdapter, used for handling attachments. This snippet indicates a mapping or definition for how attachments are processed.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
attachments?: { [key: string]: AttachmentAdapter };
```

--------------------------------

TITLE: Create Next.js Project
DESCRIPTION: Command to create a new Next.js project using npm. This is the initial step for setting up the application.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/use-chat

LANGUAGE: bash
CODE:
```
npx create-next-app@latest
```

--------------------------------

TITLE: TypeScript Function Signature for onSwitchToThread
DESCRIPTION: Represents a TypeScript function signature for an event handler named 'onSwitchToThread'. It indicates the function takes no arguments.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
onSwitchToThread: () => void;
```

--------------------------------

TITLE: Importing React component
DESCRIPTION: This snippet shows a basic import of a React component, likely for use within the UI. It's a fundamental part of building React applications.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { FC } from "react"

```

--------------------------------

TITLE: Next.js layout component loading
DESCRIPTION: Indicates the loading of a specific layout component within the Next.js application. This could be the main layout or a nested layout component.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
1, "2b:I[25322,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"]"
])"

```

--------------------------------

TITLE: TypeScript Function Signature for onSwitchToNewThread
DESCRIPTION: Represents a TypeScript function signature for an event handler named 'onSwitchToNewThread'. It indicates the function takes no arguments.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
onSwitchToNewThread: () => void;
```

--------------------------------

TITLE: Next.js Theme Toggle Component Loading
DESCRIPTION: Details the loading of the JavaScript chunk for the 'ThemeToggle' component. This component is likely responsible for handling theme switching within the application.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
1, "29:I[20578,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],\"ThemeToggle\"]\n"
])"

```

--------------------------------

TITLE: TypeScript Type Definition for useRef
DESCRIPTION: Defines the type for a React useRef hook, specifying its generic type parameter and potential return values.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
type useRef<T> = { __ref: T };
```

--------------------------------

TITLE: TypeScript: Define 'artifact' property type
DESCRIPTION: This TypeScript snippet defines the type for an 'artifact' property, which can be of any type, likely for storing diverse data.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
artifact: any;
```

--------------------------------

TITLE: TypeScript: Define 'name' property type
DESCRIPTION: This TypeScript snippet defines the type for a 'name' property as a string, commonly used for identifiers or labels.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
name: string;
```

--------------------------------

TITLE: POST Request Method and URL
DESCRIPTION: Defines the HTTP method as POST and specifies the target URL for the request. This is a common starting point for making API calls.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: javascript
CODE:
```
POST \"https://llm.datasphere.com/v1/chat/completions\"
```

--------------------------------

TITLE: TypeScript: Define tool_call_id type
DESCRIPTION: This TypeScript snippet defines the type for a 'tool_call_id' which is likely used to identify specific calls within a tool.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
tool_call_id: string;
```

--------------------------------

TITLE: TypeScript: Define LangChainMessage Type
DESCRIPTION: Defines the structure for a LangChainMessage, which includes a type and content. This is a fundamental type for representing messages in a LangChain-based application.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
messages: LangChainMessage[];
```

--------------------------------

TITLE: MCP SDK Installation Command
DESCRIPTION: This snippet shows the npm command to install the MCP SDK. It is essential for integrating with MCP servers using AI SDK v5.

SOURCE: https://assistant-ui.com/docs/guides/Tools

LANGUAGE: bash
CODE:
```
npm install @modelcontextprotocol/sdk
```

--------------------------------

TITLE: BranchPickerPrimitive Usage Example
DESCRIPTION: This snippet shows a basic implementation of the BranchPickerPrimitive component, likely within a larger application context. It highlights the component's integration and initial setup.

SOURCE: https://assistant-ui.com/docs/api-reference/primitives/BranchPicker

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "55:I[75607,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"1550\",\"static/chunks/1550-04da82d2480730d0.js\",\"7870\",\"static/chunks/app/docs/%5B%5B...slug%5D%5D/page-5c10b87452d6fdd8.js\"],
  "Pre"
])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "56:I[50265,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\"],
  "Pre"
])
```

--------------------------------

TITLE: Using URLSearchParams for URL Query Parameters
DESCRIPTION: Demonstrates the creation and usage of URLSearchParams to manage query parameters within a URL. This is useful for parsing and constructing URL query strings.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const searchParams: URLSearchParams = new URLSearchParams(
  // Constructor arguments, e.g., a URL string or an object
);
```

--------------------------------

TITLE: ActionBarPrimitive.Copy Component
DESCRIPTION: Demonstrates the usage of ActionBarPrimitive.Copy, a component likely used for triggering a copy action within an action bar. It might support customization via 'asChild'.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
<ActionBarPrimitive.Copy asChild>
</ActionBarPrimitive.Copy>
```

--------------------------------

TITLE: Delete Environment Variable in JavaScript
DESCRIPTION: Illustrates the deletion of an environment variable using `delete env.TEST;`. This is important for cleaning up or modifying environment configurations.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
delete env.TEST;
```

--------------------------------

TITLE: Render ThreadWelcome Component in JavaScript
DESCRIPTION: This snippet defines the structure for rendering a 'ThreadWelcome' component. It includes specific styling for light and dark modes and specifies the content to be displayed, likely a welcome message or a header for the thread.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "e8:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \u003c\"}]},\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"ThreadWelcome\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" /\u003e\"}]}]}}])
```

--------------------------------

TITLE: Message Accumulator (TypeScript/JavaScript)
DESCRIPTION: Shows how to use `LangGraphMessageAccumulator` to append messages from the server. It demonstrates initializing the accumulator and adding new message chunks received from an event.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
import {
  LangGraphMessageAccumulator,
  appendLangChainChunk,
} from "@assistant-ui/react-langgraph";

const accumulator = new LangGraphMessageAccumulator({
  appendMessage: appendLangChainChunk,
});

// Add new chunks from the server
if (event.event === "messages/partial") accumulator.addMessages(event.data);
```

--------------------------------

TITLE: Next.js layout definition with CSS
DESCRIPTION: Defines the main layout structure for the Next.js application, including the loading of a stylesheet for global styling. It specifies the root layout component and its children.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
1, "9:I[20578,[\"$\",\"$1\",\"c\",{\"children\":[null,[[\"$\",\"$L24\",null,{\"children\":\"$L25\"}],\"$\",\"meta\",null,{\"name\":\"next-size-adjust\",\"content\":\"\"}],\"$\",\"$L26\",null,{\"children\":[\"$\",\"div\",null,{\"hidden\":true,\"children\":[\"$\",\"$27\",null,{\"fallback\":null,\"children\":\"$L28\"}]}]}]}]])"
]
```

--------------------------------

TITLE: Assistant UI Tooltip Component (React)
DESCRIPTION: Provides Tooltip functionality using Radix UI's Tooltip primitives. Includes Provider, Root, Trigger, and Content components for creating accessible tooltips with customizable positioning and styling.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
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

TITLE: TypeScript/React: Composer Input Component Configuration
DESCRIPTION: This snippet shows the configuration for a ComposerPrimitive.Input component in TypeScript/React. It includes setting the className for styling and potentially other props for input behavior.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
self.__next_f.push([1,"183:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" <\"}]},\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#EA76CB\",\"--shiki-dark\":\"#F5C2E7\"},\"children\":\"ComposerPrimitive.Input\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-dark\":\"#F9E2AF\"},\"children\":\" className\"},{\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"=\"}]},\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\"\\\"aui-edit-composer-input\\\"\"}]},\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" /\u003e\"}]}]}])
```

--------------------------------

TITLE: Run Mastra Development Server
DESCRIPTION: This snippet demonstrates the command to start the Mastra development server. Ensure the 'chefAgent' is correctly configured before running this command.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/separate-server-integration

LANGUAGE: bash
CODE:
```
npx mastra dev
```

--------------------------------

TITLE: Render Lucide Projector Icon
DESCRIPTION: Renders the Lucide Projector icon, suitable for 'Showcase' links. This SVG component defines paths and circles to create the projector visual.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
["$","svg",null,{
  "ref": "$undefined",
  "xmlns": "http://www.w3.org/2000/svg",
  "width": 24,
  "height": 24,
  "viewBox": "0 0 24 24",
  "fill": "none",
  "stroke": "currentColor",
  "strokeWidth": 2,
  "strokeLinecap": "round",
  "strokeLinejoin": "round",
  "className": "lucide lucide-projector",
  "aria-hidden": "true",
  "children": [
    ["$","path", "1yys58", {"d": "M5 7 3 5"}],
    ["$","path", "1ptz9u", {"d": "M9 6V3"}],
    ["$","path", "1w3vmq", {"d": "m13 7 2-2"}],
    ["$","circle", "1mma13", {"cx": "9", "cy": "13", "r": "3"}],
    ["$","path", "2frwzc", {"d": "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"}],
    ["$","path", "dnq2od", {"d": "M16 16h2"}],
    "$undefined"
  ]
}]
```

--------------------------------

TITLE: Import React components and functionalities
DESCRIPTION: This snippet shows the import statements for React components and functionalities used within the project. It specifically imports 'FC' from 'react' and 'ThreadListItemPrimitive'.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "1df:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" </\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#1E66F5\",\"--shiki-dark\":\"#89B4FA\"},\"children\":\"svg\"},\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\">\"}]]}]\n1e0:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" )\"},\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]]}\n1e1:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"};\"}]}]\n1e3:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\" type\"}]\n1e4:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" {\"}]}]\n1e5:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" FC \"}]\n1e6:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\"}\"}]\n1e7:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\" from\"}]\n1e8:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\" \\\"react\\\"\"}]\n1e9:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]\n1ea:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\"import\"},\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\" {\"}]]}\n1eb:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" ThreadListItemPrimitive\"},\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}]]}\n1ec:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" \"}]\n1ed:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#DF8E1D\",\"--shiki-dark\":\"#F9E2AF\"},\"children\":\" width\"}]
```

--------------------------------

TITLE: Setting up the Clerk Auth Provider
DESCRIPTION: Step-by-step guide to configure Clerk as an authentication provider for Assistant UI, including JWT template and Auth Rules setup.

SOURCE: https://assistant-ui.com/docs/cloud/authorization

LANGUAGE: APIDOC
CODE:
```
## Setting up the Clerk Auth Provider

First, go to the Clerk dashboard and under "Configure" tab, "JWT Templates" section, create a new template. Choose a blank template and name it "assistant-ui".

As the "Claims" field, enter the following:

```json
{
  "aud": "assistant-ui"
}
```

**Note:** The aud claim ensures that the JWT is only valid for the assistant-ui API.

You can leave everything else as default. Take note of the "Issuer" and "JWKS Endpoint" fields.

Then, In the assistant-cloud dashboard, navigate to the "Auth Rules" tab and create a new rule. Choose "Clerk" and enter the Issuer and JWKS Endpoint from the previous step. As the "Audience" field, enter "assistant-ui".
```

--------------------------------

TITLE: Install Required Packages Step
DESCRIPTION: This snippet describes a step in a UI component, likely a 'steps' or 'wizard' component, for installing necessary packages. It includes a heading and an anchor link.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/v4-legacy

LANGUAGE: jsx
CODE:
```
<div className="fd-step">
  <h3 className="flex scroll-m-28 flex-row items-center gap-2" id="install-the-required-packages">
    <a data-card="" href="#install-the-required-packages" className="peer">
      Install the required packages
    </a>
    <svg ... /> {/* SVG icon for link */}
  </h3>
</div>
```

--------------------------------

TITLE: Button Variants Definition (TypeScript)
DESCRIPTION: Defines the available variants and sizes for the Button component using TypeScript. This code is likely part of a UI library or framework.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
export type ButtonSize = "default" | "icon" | "sm" | "lg";
```

--------------------------------

TITLE: Configure Button Component Props (React/JSX)
DESCRIPTION: This snippet demonstrates how to configure various props for a Button component, including variant, size, className, and ref. It shows the structure for passing string literals, object references, and dynamic class names.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
variant="ghost"
size="icon"
{
  cn
}(
  "aui-button-icon",
  className
)
ref={
  ref
}
```

--------------------------------

TITLE: Render MessagePrimitive.Root with Styling
DESCRIPTION: Renders the `MessagePrimitive.Root` component with a dynamic `className` attribute. The `className` is set to 'aui-user-message-root', indicating a specific CSS class for styling user messages.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
<MessagePrimitive.Root className="aui-user-message-root">

```

--------------------------------

TITLE: TypeScript: Syntax Highlighting Example
DESCRIPTION: This snippet demonstrates TypeScript syntax highlighting, likely from a UI component. It shows variable declarations and structure using Shiki syntax highlighter and Catppuccin themes. The code defines constants and styling properties for different themes.

SOURCE: https://assistant-ui.com/docs/migrations/v0-8

LANGUAGE: typescript
CODE:
```
const content = [
  ["$", "span", null, {
    "className": "line",
    "children": [
      ["$", "span", null, {
        "style": {
          "--shiki-light": "#8839EF",
          "--shiki-dark": "#CBA6F7"
        },
        "children": "return"
      }],
      ["$", "span", null, {
        "style": {
          "--shiki-light": "#7C7F93",
          "--shiki-dark": "#9399B2"
        },
        "children": " {"
      }],
      ["$", "span", null, {
        "style": {
          "--shiki-light": "#4C4F69",
          "--shiki-dark": "#CDD6F4"
        },
        "children": " content"
      }],
      ["$", "span", null, {
        "style": {
          "--shiki-light": "#179299",
          "--shiki-dark": "#94E2D5"
        },
        "children": ":"
      }],
      ["$", "span", null, {
        "style": {
          "--shiki-light": "#4C4F69",
          "--shiki-dark": "#CDD6F4"
        },
        "children": " ["
      }],
      ["$", "span", null, {
        "style": {
          "--shiki-light": "#7C7F93",
          "--shiki-dark": "#9399B2"
        },
        "children": "{"
      }],
      ["$", "span", null, {
        "style": {
          "--shiki-light": "#4C4F69",
          "--shiki-dark": "#CDD6F4"
        },
        "children": " type"
      }],
      ["$", "span", null, {
        "style": {
          "--shiki-light": "#179299",
          "--shiki-dark": "#94E2D5"
        },
        "children": ":"
      }],
      "$L84",
      "$L85",
      "$L86",
      "$L87",
      "$L88",
      "$L89",
      "$L8a",
      "$L8b",
      "$L8c",
      "$L8d",
      "$L8e",
      "$L8f",
      "$L90",
      "$L91",
      "$L92",
      "$L93",
      "$L94"
    ]
  }
]
];
```

--------------------------------

TITLE: Next.js API Route for PUT Request
DESCRIPTION: Defines an API route in Next.js to handle PUT requests. It demonstrates how to access the request object and potentially return a response.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
export const PUT = async (req: NextRequest, res: NextResponse) => {
  // Your PUT request handling logic here
  return NextResponse.json({ message: "PUT request received" });
};
```

--------------------------------

TITLE: TypeScript: useRef Hook Signature
DESCRIPTION: Defines the TypeScript signature for the useRef hook, including its generic type parameter for the referenced value and its initialization.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
function useRef<T>(initialValue: T | (() => T)): React.RefObject<T>;
function useRef<T = undefined>(): React.RefObject<T | undefined>;
// The returned ref object has a single mutable property .current
```

--------------------------------

TITLE: Stream text with Fireworks AI
DESCRIPTION: This snippet demonstrates how to stream text responses using the Fireworks AI model. It requires the 'ai' SDK and converts messages to the model's format.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { fireworks } from "@ai-sdk/fireworks";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: fireworks("accounts/fireworks/models/firefunction-v2"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
```

--------------------------------

TITLE: Import OpenAI and StreamText from AI SDKs (JavaScript)
DESCRIPTION: Imports the createOpenAI function from the '@ai-sdk/openai' package and convertToModelMessages, streamText from the 'ai' package. These are essential for interacting with OpenAI models and streaming responses.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

```

--------------------------------

TITLE: HTML for closing 'p' tag
DESCRIPTION: This snippet represents the closing HTML tag for a paragraph element ('</p>'). It includes styling properties, suggesting potential theme-dependent visual cues.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> &lt;/</span><span style="--shiki-light: #1E66F5; --shiki-dark: #89B4FA;">p</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;">&gt;</span>
```

--------------------------------

TITLE: Assistant Message Component with Actions (React)
DESCRIPTION: Renders a message from the assistant, including its content (which supports Markdown via `MarkdownText`), action bar, and a branch picker. The `AssistantActionBar` component provides assistant-specific actions like copy and refresh.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="aui-assistant-message-root">
      <div className="aui-assistant-message-content">
        <MessagePrimitive.Parts components={{ Text: MarkdownText }} />
      </div>

      <AssistantActionBar />

      <BranchPicker className="aui-assistant-branch-picker" />
    </MessagePrimitive.Root>
  );
};
```

--------------------------------

TITLE: Configure LangGraph API URL
DESCRIPTION: Defines the NEXT_PUBLIC_LANGGRAPH_API_URL environment variable, which is essential for the client to connect to the LangGraph API. This variable specifies the base URL for all API requests.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: bash
CODE:
```
NEXT_PUBLIC_LANGGRAPH_API_URL=/api
```

--------------------------------

TITLE: NextRequest Class Documentation (Next.js)
DESCRIPTION: This snippet details the NextRequest class, which extends the Web Request API. It provides additional convenience methods specific to Next.js. Links to MDN and Next.js documentation are included.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
class NextRequest extends Request {
  // ... additional methods
}
```

--------------------------------

TITLE: Syntax Highlighting Example
DESCRIPTION: Demonstrates the basic structure for syntax highlighting using a highlighter component. It includes comments for other elements and closing brackets.

SOURCE: https://assistant-ui.com/docs/ui/SyntaxHighlighting

LANGUAGE: javascript
CODE:
```
SyntaxHighlighter: "

h1: /* ... */",
// ...other elements...
}
```

--------------------------------

TITLE: Request Initialization with Options - TypeScript
DESCRIPTION: Illustrates how to declare and initialize a `RequestInit` type in TypeScript for configuring network requests. This is commonly used with the `fetch` API to specify various parameters like headers, method, and body.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const options: RequestInit = {
  // ... request options
};
```

--------------------------------

TITLE: Format UI text with specific styles
DESCRIPTION: This snippet demonstrates how to format UI text elements, likely within a UI framework or library. It applies specific inline styles based on light and dark themes, indicated by CSS variables like --shiki-light and --shiki-dark.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "2c0:[...", /* ... */ "children\": \"|\"}]]);\n
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "2c1:[...", /* ... */ "children\": \";\"}]]);\n
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "2c2:[...", /* ... */ "className\": \"line\"}]]);\n
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "2c3:[...", /* ... */ "children\": \"\"}\"]]);\n
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "2c4:[...", /* ... */ "children\": \" HTMLButtonElement\"}"]]);\n
```

--------------------------------

TITLE: Load Application Layout (JavaScript)
DESCRIPTION: This snippet details the loading process for the main application layout file in a Next.js project. It includes the specific JavaScript chunk file responsible for the 'app/docs/layout' structure, essential for the overall page rendering and component assembly.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "14:I[25322,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"s
```

--------------------------------

TITLE: JavaScript: Implement clipboard writeText functionality
DESCRIPTION: Demonstrates how to use the `navigator.clipboard.writeText` API in JavaScript to copy text to the clipboard. It includes a check for the existence of the `value` and handles the asynchronous nature of the operation.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
if (!value) return;
navigator.clipboard.writeText(value).then(() => {}, () => {})
```

--------------------------------

TITLE: Install Attachment UI Components
DESCRIPTION: This command installs the necessary attachment UI components for your project using shadcn. The components will be added to the specified path, allowing for customization to match your application's design system.

SOURCE: https://assistant-ui.com/docs/guides/Attachments

LANGUAGE: bash
CODE:
```
npx shadcn@latest add "https://r.assistant-ui.com/attachment"
```

--------------------------------

TITLE: Load Next.js Code Chunks for Pre Component
DESCRIPTION: This snippet illustrates the Next.js code chunk loading mechanism for the Pre component, detailing the essential static JavaScript files required for its operation.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "3991\", \"static/chunks/a481b260-4ea16b2cb2d5964d.js\", \"7857\", \"static/chunks/7857-031040a915662d8a.js\", \"3230\", \"static/chunks/3230-0e52275e3939333e.js\", \"5560\", \"static/chunks/5560-c132b61017d185dd.js\", \"7484\", \"static/chunks/7484-92989dddc8aa5297.js\", \"5817\", \"static/chunks/5817-085a6b2739e98564.js\", \"243\", \"static/chunks/243-b70d19e16f061ae9.js\", \"1679\", \"static/chunks/1679-7f1ffad4356b88e0.js\", \"265\", \"static/chunks/265-5221c29d87acf641.js\", \"6082\", \"static/chunks/6082-7122824aafe075fd.js\", \"3341\", \"static/chunks/3341-6e6fba5f79b3758a.js\", \"2283\", \"static/chunks/2283-5108a0ecf2479a0c.js\", \"6249\", \"static/chunks/6249-ff0f18c5b1527af2.js\", \"8444\", \"static/chunks/8444-4438f8aa38c60a35.js\", \"3595\", \"static/chunks/3595-efc91f45d0b7420d.js\", \"2032\", \"static/chunks/2032-3f5992acfba397be.js\", \"9926\", \"static/chunks/9926-881e1fc7fffbe717.js\", \"5967\", \"static/chunks/5967-89e5ea0ae819b9fd.js\", \"6957\", \"static/chunks/6957-e573b2b026755259.js\", \"8198\", \"static/chunks/8198-e69520b749b413e4.js\", \"9745\", \"static/chunks/9745-fd94a343788c6195.js\", \"8993\", \"static/chunks/8993-37889e39b7f04e7c.js\", \"1550\", \"static/chunks/1550-04da82d2480730d0.js\", \"7870\", \"static/chunks/app/docs/%5B%5B...slug%5D%5D/page-5c10b87452d6fdd8.js\"], \"Pre\"\]\n
```

--------------------------------

TITLE: LaTeX Guide
DESCRIPTION: Guide on integrating and rendering LaTeX expressions in Assistant UI.

SOURCE: https://context7_llms

LANGUAGE: APIDOC
CODE:
```
## GET /docs/guides/Latex

### Description
Guide on integrating and rendering LaTeX expressions in Assistant UI.

### Method
GET

### Endpoint
/docs/guides/Latex
```

--------------------------------

TITLE: Confirmation of Project Setup
DESCRIPTION: A confirmation message indicating that the Mastra server project is ready.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/separate-server-integration

LANGUAGE: text
CODE:
```
You now have a basic Mastra server project ready.
```

--------------------------------

TITLE: Documenting ReactNode with @see and @example
DESCRIPTION: This snippet shows how to use JSDoc-style tags like `@see` and `@example` within comments to provide additional documentation, links, and usage examples for `ReactNode` in a React-TypeScript project.

SOURCE: https://assistant-ui.com/docs/runtimes/langserve

LANGUAGE: typescript
CODE:
```
self.__next_f.push([1,"186:[\"$\",\"div\",null,{\"className\":\"prose twoslash-popup-docs twoslash-popup-docs-tags\",\"children\":[[\"$\",\"span\",null,{\"className\":\"twoslash-popup-docs-tag\",\"children\":[[\"$\",\"span\",null,{\"className\":\"twoslash-popup-docs-tag-name\",\"children\":\"@see\"}],[\"$\",\"span\",null,{\"className\":\"twoslash-popup-docs-tag-value\",\"children\":[[\"$\",\"$Le\",null,{\"href\":\"https://react-typescript-cheatsheet.netlify.app/docs/react-types/reactnode/\",\"children\":\"https://react-typescript-cheatsheet.netlify.app/docs/react-types/reactnode/\"}],\" React TypeScript Cheatsheet\"}]}],[\"$\",\"span\",null,{\"className\":\"twoslash-popup-docs-tag\",\"children\":[[\"$\",\"span\",null,{\"className\":\"twoslash-popup-docs-tag-name\",\"children\":\"@example\"}],[\"$\",\"span\",null,{\"className\":\"twoslash-popup-docs-tag-value\",\"children\"
```

--------------------------------

TITLE: Create Mastra Directories and Files
DESCRIPTION: Demonstrates the terminal commands to create the Mastra project structure. Uses `mkdir` to create directories and `touch` to create files.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/full-stack-integration

LANGUAGE: bash
CODE:
```
mkdir -p mastra/agents
touch mastra/agents/chefAgent.ts
touch mastra/index.ts
```

--------------------------------

TITLE: Navigation Link: Showcase
DESCRIPTION: Defines a navigation link for 'Showcase' with a projector icon. This snippet is used to link to a showcase or examples page, including its icon and display text.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: javascript
CODE:
```
["$","$L2b","1",{"href":"/showcase","icon":["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-projector","aria-hidden":"true","children":[[["$","path","1yys58",{"d":"M5 7 3 5"}],["$","path","1ptz9u",{"d":"M9 6V3"}],["$","path","1w3vmq",{"d":"m13 7 2-2"}],["$","circle","1mma13",{"cx":9,"cy":13,"r":3}],["$","path","2frwzc",{"d":"M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"}],["$","path","dnq2od",{"d":"M16 16h2"}],"$undefined"]}]},"external":"$undefined","className":"","children":"Showcase"}]
```

--------------------------------

TITLE: ActionBarPrimitive.Reload Component
DESCRIPTION: Illustrates the ActionBarPrimitive.Reload component, likely used to trigger a reload action in an action bar. It supports 'asChild' for potential composition.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
<ActionBarPrimitive.Reload asChild>
</ActionBarPrimitive.Reload>
```

--------------------------------

TITLE: Add 'aui-thread-welcome-suggestion' Class
DESCRIPTION: This snippet illustrates adding a class name 'aui-thread-welcome-suggestion' to an element. This is common in web development for styling or targeting specific UI components.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<span className="aui-thread-welcome-suggestion"></span>
```

--------------------------------

TITLE: Import Ollama Provider and Stream Text
DESCRIPTION: This snippet demonstrates importing necessary functions from the 'ollama-ai-provider' and 'ai' modules. It specifically imports 'ollama' and 'convertToModelMessages', 'streamText' for chat functionalities.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { ollama } from "ollama-ai-provider";
import { convertToModelMessages, streamText } from "ai";
```

--------------------------------

TITLE: JavaScript: Fetch JSON data from request
DESCRIPTION: This JavaScript snippet demonstrates how to fetch JSON data from a request object. It likely involves making an asynchronous call and processing the response.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const messages = await req.json();
```

--------------------------------

TITLE: Next.js Layout Initialization
DESCRIPTION: Initializes the Next.js application layout, specifying dependencies and associated JavaScript chunks. This code is crucial for the structure and rendering of the application's pages.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"18:[\"$\",\"$L29\",null,{\"className\":\"p-0 ms-1.5\",\"mo
```

--------------------------------

TITLE: Render ThreadListItem in ThreadListItems
DESCRIPTION: This snippet shows how `ThreadListItems` returns a `ThreadListPrimitive.Items` component, passing a configuration object that maps 'ThreadListItem' to the actual `ThreadListItem` component. This is a common pattern for abstracting item rendering in UI lists.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
return <ThreadListPrimitive.Items components={
    { ThreadListItem }
  } />;
```

--------------------------------

TITLE: Wrap App with AssistantRuntimeProvider
DESCRIPTION: Example of setting up the AssistantRuntimeProvider in the application's layout file. This provides the chat runtime context to the entire application.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/use-chat

LANGUAGE: typescript
CODE:
```
import { AssistantRuntimeProvider } from '@assistant-ui/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AssistantRuntimeProvider endpoint="/api/chat">
          {children}
        </AssistantRuntimeProvider>
      </body>
    </html>
  );
}
```

--------------------------------

TITLE: TypeScript: Stream function signature
DESCRIPTION: This TypeScript snippet shows a function signature for 'stream', indicating a method for handling data streams, possibly asynchronous.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
stream
```

--------------------------------

TITLE: HTML Structure for ThreadWelcomeSuggestions
DESCRIPTION: This snippet defines the HTML structure for a 'ThreadWelcomeSuggestions' component. It includes a span element with specific styling, indicating it's a themable UI component.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> &lt;</span><span style="--shiki-light: #EA76CB; --shiki-dark: #F5C2E7;">ThreadWelcomeSuggestions</span>
```

--------------------------------

TITLE: Initialize Custom Highlighter with Shiki
DESCRIPTION: This code snippet demonstrates the initialization of a custom highlighter using Shiki's `createHighlighterCore`. It shows how to dynamically import themes and languages, which is crucial for on-demand loading in client-side applications.

SOURCE: https://assistant-ui.com/docs/ui/SyntaxHighlighting

LANGUAGE: javascript
CODE:
```
const customHighlighter = await createHighlighterCore({
  themes: [
    import('@shikijs/themes/nord')
  ],
  langs: [
    import('@shikijs/langs/javascript')
  ]
})
```

--------------------------------

TITLE: Environment Variable Case Sensitivity Note
DESCRIPTION: A note indicating that environment variables are case-insensitive on Windows operating systems, which is a crucial detail for cross-platform compatibility.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: text
CODE:
```
On Windows operating systems, environment variables are case-insensitive.
```

--------------------------------

TITLE: Thread Welcome Suggestions Component (React)
DESCRIPTION: Displays a list of suggested prompts for the user to initiate a conversation. It uses a custom `ThreadPrimitive.Suggestion` component, which likely handles the display and interaction logic for each suggestion. The `autoSend` prop suggests that clicking a suggestion might automatically send the prompt.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
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

TITLE: Handle LLM Client Default Values in TypeScript
DESCRIPTION: Demonstrates accessing and utilizing default values for an LLM client in TypeScript. It illustrates how to retrieve default configurations and potentially override them.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const client: Client = DefaultValues;
const client = createClient();

client.DefaultValues();
client.DefaultValues();
```

--------------------------------

TITLE: Install AI SDK v5 and assistant-ui packages
DESCRIPTION: This command installs the necessary packages for integrating Vercel AI SDK v5 with assistant-ui in a React project. It includes the core assistant-ui React components, the AI SDK React adapter, the AI SDK itself, and the OpenAI provider.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/use-chat

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react @assistant-ui/react-ai-sdk ai @ai-sdk/openai
```

--------------------------------

TITLE: Load Next.js Chunks for App Docs Slug Page
DESCRIPTION: Loads JavaScript chunks for dynamic routes within '/docs' in a Next.js application, specifically for the '[...slug]' route. This handles loading code for nested documentation pages.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "f:I[88198,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"1550\",\"static/chunks/1550-04da82d2480730d0.js\",\"7870\",\"static/chunks/app/docs/[[...slug]]/page-5c10b87452d6fdd8.js\"],"Image"]\n
```

--------------------------------

TITLE: GitHub Link for Documentation
DESCRIPTION: Provides a direct link to the source documentation file on GitHub. This allows users to view the original content and potentially contribute to its improvement.

SOURCE: https://assistant-ui.com/docs/copilots/use-assistant-instructions

LANGUAGE: html
CODE:
```
<a href="https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/copilots/use-assistant-instructions.mdx" target="_blank" rel="noreferrer noopener" class="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [\u0026_svg]:pointer-events-none [\u0026_svg:not([class*='size-'])]:size-4 shrink-0 [\u0026_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-1.5 text-xs">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen size-3" aria-hidden="true">
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
  </svg>
  Edit on GitHub
</a>
```

--------------------------------

TITLE: TypeScript Import Statement for MyAssistant
DESCRIPTION: This snippet demonstrates how to import a custom 'MyAssistant' component in TypeScript. It highlights the use of aliasing for the component and its associated types.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
import MyAssistant from "MyAssistant";
```

--------------------------------

TITLE: HTML for closing 'div' tag
DESCRIPTION: This snippet shows the closing HTML tag for a div element ('</div>'). Similar to other snippets, it incorporates styling properties for potential theming.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<span style="--shiki-light: #179299; --shiki-dark: #94E2D5;"> &lt;/</span><span style="--shiki-light: #1E66F5; --shiki-dark: #89B4FA;">div</span><span style="--shiki-light: #179299; --shiki-dark: #94E2D5;">&gt;</span>
```

--------------------------------

TITLE: Import Thread in TypeScript
DESCRIPTION: This snippet shows how to import the `Thread` component in TypeScript. This import is essential for using threading functionalities within the Assistant UI.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
import Thread from "/Thread"
```

--------------------------------

TITLE: Convert Messages to Model Format
DESCRIPTION: This snippet shows how to convert a generic message array into a format compatible with a specific LLM model. It highlights the function call and expected input.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"37d:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" messages\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#1E66F5\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#89B4FA\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\" convertToModelMessages\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"(messages)\"}]],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}]}]}])...
```

--------------------------------

TITLE: TypeScript function onSwitchToNewThread signature
DESCRIPTION: Defines the signature for the `onSwitchToNewThread` function, which returns a void Promise. It is marked as deprecated and suggests using `useCloudThreadListRuntime` instead.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
onSwitchToNewThread(): Promise<void> | void
```

--------------------------------

TITLE: Load SearchToggle Component (JavaScript)
DESCRIPTION: This snippet appears to be part of a Next.js application's client-side rendering process, specifically handling the loading and initialization of the 'SearchToggle' component. It includes references to various JavaScript chunk files required for its operation.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "11:I[25322,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],"SearchToggle"\]\n"])
```

--------------------------------

TITLE: Next.js App Routing and Component Loading (JavaScript)
DESCRIPTION: This JavaScript code demonstrates Next.js's `__next_f.push` function, which is used for managing dynamic imports and loading application chunks. It details the loading of various static chunks and specific page components like `layout` and `page` for dynamic routes, as well as the `Navbar` and `Image` components.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"f:I[65052,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],\"Navbar\"])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"e:I[65052,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"1550\",\"static/chunks/1550-04da82d2480730d0.js\",\"7870\",\"static/chunks/app/docs/%5B%5B...slug%5D%5D/page-5c10b87452d6fdd8.js\"],\"default\"])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"f:I[88198,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"1550\",\"static/chunks/1550-04da82d2480730d0.js\",\"7870\",\"static/chunks/app/docs/%5B%5B...slug%5D%5D/page-5c10b87452d6fdd8.js\"],\"Image\"])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"10:I[83821,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chun
```

--------------------------------

TITLE: Accessing Node.js Environment Variables
DESCRIPTION: Demonstrates how to access environment variables in Node.js through the `process.env` object. This object contains key-value pairs representing the user's environment.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
console.log(process.env);
```

--------------------------------

TITLE: Create Client with Default Values in TypeScript
DESCRIPTION: This snippet shows how to create a client instance, likely for interacting with an LLM API. It includes handling of default values and type annotations, common in modern JavaScript/TypeScript development.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const client: Client<DefaultValues, DefaultValues> = createClient();
```

--------------------------------

TITLE: MCP Server Configuration Example
DESCRIPTION: This snippet demonstrates the structure for configuring MCP servers within the Assistant UI. It defines key-value pairs for server names and their associated identifiers.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: json
CODE:
```
{
  "mcpServers": {
    "assistant-ui": {
      "command": "{ \
    }"
    }
  }
}
```

--------------------------------

TITLE: Best Practices for LLM Tool Development
DESCRIPTION: This section details recommended practices for creating robust and user-friendly tools for LLM-powered assistants. It emphasizes clear descriptions, validation, error handling, and security measures.

SOURCE: https://assistant-ui.com/docs/guides/Tools

LANGUAGE: markdown
CODE:
```
## Best Practices

*   **Clear Descriptions**: Write descriptive tool descriptions that help the LLM understand when to use each tool
*   **Parameter Validation**: Use Zod schemas to ensure type safety and provide clear parameter descriptions
*   **Error Handling**: Always handle potential errors gracefully with user-friendly messages
*   **Loading States**: Provide visual feedback during tool execution
*   **Security**: Validate permissions and sanitize inputs, especially for destructive operations
*   **Performance**: Use abort signals for cancellable operations and implement timeouts
*   **Testing**: Test tools in isolation and with the full assistant flow
```

--------------------------------

TITLE: JavaScript: Define copyToClipboard function
DESCRIPTION: Defines an asynchronous JavaScript function `copyToClipboard` that takes a string value and optionally returns a string. It includes type annotations for the value and return type.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const copyToClipboard = (value: string): string => { /* ... */ }
```

--------------------------------

TITLE: Parent Component Setup (React)
DESCRIPTION: This snippet demonstrates the basic structure of a parent component, likely in a React application. It includes theme settings and the rendering of a code block, potentially for syntax highlighting.

SOURCE: https://assistant-ui.com/docs/copilots/assistant-frame

LANGUAGE: jsx
CODE:
```
self.__next_f.push([1,"41:[\"$\",\"$L85\",null,{\"className\":\"shiki shiki-themes catppuccin-latte catppuccin-mocha\",\"style\":{\"--shiki-light\":\"#4c4f69\",\"--shiki-dark\":\"#cdd6f4\",\"--shiki-light-bg\":\"#eff1f5\",\"--shiki-dark-bg\":\"#1e1e2e\"},\"tabIndex\":\"0\",\"icon\":\"$a8\",\"children\":[\"$\",\"$L87\",null,{\"className\":\"max-h-[400px]\",\"children\":[\"$\",,
"code",null,{\"children\":[[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-light-font-style\":\"italic\",\"--shiki-dark\":\"#9399B2\",\"--shiki-dark-font-style\":\"italic\"},\"children\":\"// parent.tsx\"}]}],\"\\n\",\"$La9\",\"\\n\",\"$Laa\",\"\\n\",\"$Lab\",\"\\n\",\"$Lac\",\"\\n\",\"$Lad\",\"\\n\",\"$Lae\",\"\\n\",\"$Laf\",\"\\n\",\"$Lb0\",\"\\n\",\"$Lb1\",\"\\n\",\"$Lb2\",\"\\n\",\"$Lb3\",\"\\n\",\"$Lb4\",\"\\n\",\"$Lb5\",\"\\n\",\"$Lb6\",\"\\n\",\"$Lb7\",\"\\n\",\"$Lb8\",\"\\n\",\"$Lb9\",\"\\n\",\"$Lba\",\"\\n\",\"$Lbb\",\"\\n\",\"$Lbc\",\"\\n\",\"$Lbd\",\"\\n\",\"$Lbe\",\"\\n\",\"$Lbf\"]}]}]\n"])
```

--------------------------------

TITLE: React: Render BranchPicker component
DESCRIPTION: This snippet shows how to render the BranchPicker component in React. It includes setting a className prop for styling, indicating its usage within a UI framework.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
<
  span
  className="line"
  style={{ "--shiki-light": "#179299", "--shiki-dark": "#94E2D5" }}
>
  <span
    style={{ "--shiki-light": "#179299", "--shiki-dark": "#94E2D5" }}
  >
     < 
  </span>
  <span
    style={{ "--shiki-light": "#EA76CB", "--shiki-dark": "#F5C2E7" }}
  >
    BranchPicker
  </span>
  <span
    style={{ "--shiki-light": "#179299", "--shiki-dark": "#94E2D5" }}
  >
    className
  </span>
  <span
    style={{ "--shiki-light": "#179299", "--shiki-dark": "#94E2D5" }}
  >
    =
  </span>
  <span
    style={{ "--shiki-light": "#40A02B", "--shiki-dark": "#A6E3A1" }}
  >
    "aui-assistant-branch-picker"
  </span>
  <span
    style={{ "--shiki-light": "#179299", "--shiki-dark": "#94E2D5" }}
  >
     />
  </span>
</span>
```

--------------------------------

TITLE: Install shadcn/ui and add Card and Button components
DESCRIPTION: This command installs the latest version of shadcn/ui and adds the Card and Button components, which are essential for building the TransactionConfirmationPending UI.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-3

LANGUAGE: bash
CODE:
```
npx shadcn@latest add card
npx shadcn@latest add button
```

--------------------------------

TITLE: Define React Viewport Component
DESCRIPTION: This snippet shows the definition of a React component for a 'Viewport' within the UI. It uses a primitive component and specifies its class name for styling.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
<ThreadPrimitive.Viewport />
```

--------------------------------

TITLE: TypeScript: Accessing Response Headers
DESCRIPTION: Demonstrates how to access the headers from an HTTP response object in TypeScript. It shows accessing the 'headers' property of a Response object.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const res: Response;
res.headers
```

--------------------------------

TITLE: Install Assistant UI React Data Stream with npm
DESCRIPTION: This snippet shows the command to install the @assistant-ui/react-data-stream package using npm. Ensure you have Node.js and npm installed on your system.

SOURCE: https://assistant-ui.com/docs/runtimes/data-stream

LANGUAGE: bash
CODE:
```
npm install @assistant-ui/react-data-stream
```

--------------------------------

TITLE: JavaScript: Stream text from a model
DESCRIPTION: This JavaScript code snippet shows how to stream text from a specified model. It defines a constant 'result' and assigns it the output of a 'streamText' function.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
const result = streamText(
```

--------------------------------

TITLE: Next.js Sidebar Viewport Component Loading
DESCRIPTION: Details the loading of the JavaScript chunk for the 'SidebarViewport' component. This component likely manages the viewport and content rendering for a sidebar navigation.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
1, "2a:I[25322,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],\"SidebarViewport\"]\n"
])"

```

--------------------------------

TITLE: JavaScript: URLSearchParams toString() Method
DESCRIPTION: Demonstrates the usage of the `toString()` method of the `URLSearchParams` object in JavaScript. This method converts the search parameters into a URL-encoded string.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
const searchParams = new URLSearchParams();
searchParams.toString()
```

--------------------------------

TITLE: HTML Metadata Setup in Next.js
DESCRIPTION: This snippet shows the basic HTML metadata configuration for a Next.js page, including character set and viewport settings. This is essential for SEO and proper rendering across devices.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/introduction

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"25:[[\"$\",\"meta\",\"0\",{\"charSet\":\"utf-8\"}],["$\",\"meta\",\"1\",{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"}]]\n21:null\n"])
```

--------------------------------

TITLE: Next.js Layout Component Loading (General)
DESCRIPTION: This snippet indicates the loading of general layout components for a Next.js application, specifically referencing the 'app/docs/layout' file. It lists all the necessary JavaScript chunks required to render this layout, demonstrating code splitting practices.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"2b:I[25322,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\"\])
```

--------------------------------

TITLE: JavaScript String Replace Method
DESCRIPTION: Demonstrates the use of the JavaScript `replace` method for strings. This method is used to substitute a part of the string with another string.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
String.replace("searchValue")
```

--------------------------------

TITLE: Tailwind CSS Configuration for assistant-ui
DESCRIPTION: Configures Tailwind CSS by integrating assistant-ui's Tailwind plugin, enabling custom styling and components. This example shows the basic setup.

SOURCE: https://assistant-ui.com/docs/legacy/styled/Markdown

LANGUAGE: javascript
CODE:
```
{
  plugins: [
    require("tailwindcss-animate"),
    require("@assistant-ui/react-ui/tailwindcss")
  ]
}
```

--------------------------------

TITLE: Handling HTTP Methods (DELETE) in JavaScript
DESCRIPTION: This snippet specifically illustrates the handling of the 'DELETE' HTTP method. It's a common pattern in RESTful APIs for removing resources.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"18c:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}]\n18d:[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#40A02B\",\"--shiki-dark\":\"#A6E3A1\"},\"children\":\" \\\"DELETE\\\"\"}]\n
```

--------------------------------

TITLE: Create Langchain Client
DESCRIPTION: This code defines a function to create a Langchain client. It demonstrates type casting for 'DefaultValues' and handles potential unknown types, setting up the client for interaction.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
const createClient = (...args: DefaultValues): Client = > {
  return Client(...args, DefaultValues);
};
```

--------------------------------

TITLE: Code Theme and Display Configuration
DESCRIPTION: Configures the display of code snippets with specific themes ('catppuccin-latte', 'catppuccin-mocha') and color variables for light and dark modes. It also sets a maximum height for the code display area.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
<div class="shiki shiki-themes catppuccin-latte catppuccin-mocha" style="--shiki-light:#4c4f69; --shiki-dark:#cdd6f4; --shiki-light-bg:#eff1f5; --shiki-dark-bg:#1e1e2e" tabindex="0" title="/app/api/chat/route.ts" icon="$34d"><div class="max-h-[400px]"></div></div>
```

--------------------------------

TITLE: Instantiate Client with Default Values (JavaScript)
DESCRIPTION: This JavaScript code demonstrates how to instantiate a 'Client' object, potentially for making API calls or interacting with a service. It shows the use of 'new Client' and passing 'DefaultValues' as arguments, with a placeholder for 'unknown' configuration.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
return new Client(
  DefaultValues,
  unknown
);
```

--------------------------------

TITLE: Render 'aui-md-a' component with className
DESCRIPTION: This snippet demonstrates the rendering of a component identified as 'aui-md-a'. It shows how the className prop is passed as a string literal to the component, likely for styling purposes.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":"="}],["$","span",null,{"style":{"--shiki-light":"#7C7F93","--shiki-dark":"#9399B2"},"children":"{\"}"},["$","span",null,{"style":{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#89B4FA","--shiki-dark-font-style":"italic"},"children":"cn"}],["$","span",null,{"style":{"--shiki-light":"#4C4F69","--shiki-dark":"#CDD6F4"},"children":"("}],["$","span",null,{"style":{"--shiki-light":"#40A02B","--shiki-dark":"#A6E3A1"},"children":"\\\"aui-md-a\\\""}],["$","span",null,{"style":{"--shiki-light":"#7C7F93","--shiki-dark":"#9399B2"},"children":","}],["$","span",null,{"style":{"--shiki-light":"#4C4F69","--shiki-dark":"#CDD6F4"},"children":" className)"}],["$","span",null,{"style":{"--shiki-light":"#7C7F93","--shiki-dark":"#9399B2"},"children":"}"}],["$","span",null,{"style":{"--shiki-light":"#7C7F93","--shiki-dark":"#9399B2"},"children":" {"}],["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":"..."}],["$","span",null,{"style":{"--shiki-light":"#4C4F69","--shiki-dark":"#CDD6F4"},"children":"props"}],["$","span",null,{"style":{"--shiki-light":"#7C7F93","--shiki-dark":"#9399B2"},"children":"}"}],["$","span",null,{"style":{"--shiki-light":"#179299","--shiki-dark":"#94E2D5"},"children":" />"}]
```

--------------------------------

TITLE: React Component Rendering Example
DESCRIPTION: Illustrates a basic React component structure, showing how to render a 'div' element. This snippet is often a starting point for more complex UI components.

SOURCE: https://assistant-ui.com/docs/ui/ToolGroup

LANGUAGE: typescript
CODE:
```
div
```

--------------------------------

TITLE: Defining Markdown Component Types
DESCRIPTION: Defines TypeScript types for markdown components and a utility function for memoizing markdown component configurations. These are crucial for dynamic component rendering and optimization.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import {
  CodeHeaderProps,
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents,
} from "@assistant-ui/react-markdown";
```

--------------------------------

TITLE: Set Up Cloud Runtime with AssistantCloud Instance (JavaScript)
DESCRIPTION: Demonstrates creating a client-side AssistantCloud instance for integrating with an AI SDK runtime. This snippet highlights the necessary 'use client' directive and the instantiation of the AssistantCloud.

SOURCE: https://assistant-ui.com/docs/cloud/persistence/ai-sdk

LANGUAGE: javascript
CODE:
```
"use client";

```

--------------------------------

TITLE: MarkdownText Component with GFM and Copy Functionality (React)
DESCRIPTION: The MarkdownText component renders markdown content with GitHub Flavored Markdown (GFM) support, enhanced by the 'remark-gfm' plugin. It includes a custom code block component with a copy-to-clipboard feature, utilizing React hooks and utility functions for state management and styling. Dependencies include React, '@assistant-ui/react-markdown', 'remark-gfm', and 'lucide-react'.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
"use client";

import "@assistant-ui/react-markdown/styles/dot.css";

import {
  CodeHeaderProps,
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents as memoizeMarkdownComponents,
  useIsMarkdownCodeBlock,
} from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import { FC, memo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/lib/utils";

const MarkdownTextImpl = () => {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm]}
      className="aui-md"
      components={defaultComponents}
    />
  );
};

export const MarkdownText = memo(MarkdownTextImpl);

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const onCopy = () => {
    if (!code || isCopied) return;
    copyToClipboard(code);
  };

  return (
    <div className="aui-code-header-root">
      <span className="aui-code-header-language">{language}</span>
      <TooltipIconButton tooltip="Copy" onClick={onCopy}>
        {!isCopied && <CopyIcon />}
        {isCopied && <CheckIcon />}
      </TooltipIconButton>
    </div>
  );
};

const useCopyToClipboard = ({ 
  copiedDuration = 3000,
}: { 
  copiedDuration?: number;
} = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
```

--------------------------------

TITLE: Navigation Link with Examples Icon (React/JSX)
DESCRIPTION: Defines a navigation link for 'Examples' using a Lucide 'sparkles' SVG icon. This snippet is part of a navigation menu, providing a link to example functionalities within the application. It includes the href, icon, and the text 'Examples'.

SOURCE: https://assistant-ui.com/docs/api-reference/primitives/ActionBar

LANGUAGE: jsx
CODE:
```
{
  "href": "/examples",
  "icon": [
    "$",
    "svg",
    null,
    {
      "ref": "$undefined",
      "xmlns": "http://www.w3.org/2000/svg",
      "width": 24,
      "height": 24,
      "viewBox": "0 0 24 24",
      "fill": "none",
      "stroke": "currentColor",
      "strokeWidth": 2,
      "strokeLinecap": "round",
      "strokeLinejoin": "round",
      "className": "lucide lucide-sparkles",
      "aria-hidden": "true",
      "children": [
        ["$", "path", "1s2grr", {"d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],
        ["$", "path", "1rf3ol", {"d": "M20 2v4"}],
        ["$", "path", "gwowj6", {"d": "M22 4h-4"}],
        ["$", "circle", "6kqj1y", {"cx": "4", "cy": "20", "r": "2"}],
        "$undefined"
      ]
    }
  ],
  "external": "$undefined",
  "className": "",
  "children": "Examples"
}
```

--------------------------------

TITLE: Navigation and Layout Structure
DESCRIPTION: Defines the main layout structure for the application, including sidebar and navigation heights, and dynamically renders content based on screen size.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: javascript
CODE:
```
["$","$L12",null,{
  "className": "xl:[--fd-toc-width:286px] md:[--fd-sidebar-width:268px] lg:[--fd-sidebar-width:286px] [--fd-nav-height:56px] md:[--fd-nav-height:0px]",
  "children": [
    ["$","$L13",null,{
      "defaultOpenLevel": 0,
      "prefetch": "$undefined",
      "Mobile": [
        ["$","$L14",null,{
          "children": [
            ["$","$L15",null,{
              "as": "$16",
              "children": [
                ["$","div",null,{
                  "className": "flex text-fd-muted-foreground items-center justify-end empty:hidden",
                  "children": [
                    [
                      ["$","$L17", "0", {
                        "item": {
                          "type": "icon",
                          "text": "Discord",
                          "url": "https://discord.gg/S9dwgCNEFs",
                          "icon": [
                            ["$","svg",null,{
                              "xmlns": "http://www.w3.org/2000/svg",
                              "viewBox": "0 0 127.14 96.36",
                              "className": "size-4",
                              "children": [
                                ["$","path",null,{
                                  "fill": "currentColor",
                                  "d": "M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                                )]
                              ]
                            }
                            ],
                            "external": true,
                            "className": "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none hover:bg-fd-accent hover:text-fd-accent-foreground [\u0026_svg]:size-4.5 p-2",
                            "aria-label": "$undefined",
                            "children": "$7:props:children:1:props:children:0:props:Mobile:props:children:0:props:children:0:props:children:0:0:props:item:icon"
                          }
                        ]
                      }
                    ],
                    [
                      ["$","$L17", "1", {
                        "item": {
                          "type": "icon",
                          "url": "https://github.com/assistant-ui/assistant-ui",
                          "text": "Github",
                          "label": "GitHub",
                          "icon": [
                            ["$","svg",null,{
                              "role": "img",
                              "viewBox": "0 0 24 24",
                              "fill": "currentColor",
                              "children": [
                                ["$","path",null,{
                                  "d": "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"
                                )]
                              ]
                            }
                            ],
                            "external": true,
                            "className": "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none hover:bg-fd-accent hover:text-fd-accent-foreground [\u0026_svg]:size-4.5 p-2 me-auto",
                            "aria-label": "GitHub",
                            "children": "$7:props:children:1:props:children:0:props:Mobile:props:children:0:props:children:0:props:children:0:1:props:item:icon"
                          }
                        ]
                      }
                    ]
                  ],
                  "null",
                  "$L18",
                  "$L19"
                ]
              ],
              "false",
              "$undefined"
            ]
          ]
        }
      ],
      "$L1a",
      "$L1b"
    }]
  ],
  "Content": "$L1c"
}
],[
  "$L1d",
  "$L1e"
]]
```

--------------------------------

TITLE: LangChain Python Setup Instructions
DESCRIPTION: This snippet outlines the setup instructions for LangChain integration in Python. It details setting environment variables like HELICONE_API_KEY and OPENAI_API_KEY, and configuring ChatOpenAI.

SOURCE: https://assistant-ui.com/docs/runtimes/helicone

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"52:[\"$\",\"ol\",null,{\"children\":[\"\\n\",[\"$\",\"li\",null,{\"children\":[\"\\n\",[\"$\",\"p\",null,{\"children\":[\"$\",\"strong\",null,{\"children\":\"Set Environment Variables:\"}]},"\\n",[\"$\",\"ul\",null,{\"children\":[\"\\n\",[\"$\",\"li\",null,{\"children\":[\"$\",\"code\",null,{\"children\":\"HELICONE_API_KEY\"}]}],\"\\n\",[\"$\",\"li\",null,{\"children\":[\"$\",\"code\",null,{\"children\":\"OPENAI_API_KEY\"}]}],\"\\n\"},"\\n"],"\\n\",[\"$\",\"li\",null,{\"children\":[\"\\n\",[\"$\",\"p\",null,{\"children\":[\"$\",\"strong\",null,{\"children\":\"Configure ChatOpenAI:\"}]},"\\n"]]}]}]])
```

--------------------------------

TITLE: Render Markdown with Syntax Highlighting (TypeScript)
DESCRIPTION: This snippet demonstrates the 'markdown-text.tsx' component used for rendering markdown content. It utilizes syntax highlighting with the Catppuccin theme, supporting both light and dark modes. The component is designed to display code blocks with appropriate styling.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
"use client"

// This is a placeholder for the actual code that would be rendered.
// The provided input seems to be a representation of React server components or similar.
// The actual code for rendering markdown with syntax highlighting would typically involve:
// 1. Importing a markdown parsing library (e.g., 'react-markdown', 'marked').
// 2. Importing a syntax highlighting library (e.g., 'shiki', 'react-syntax-highlighter').
// 3. A component that takes markdown string as input and returns JSX.

// Example structure (conceptual):
/*
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownTextProps {
  content: string;
}

const MarkdownText: React.FC<MarkdownTextProps> = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = (className || '').match(/language-(?<code>\S+)/)
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={dracula} // Or your theme
              language={match[1]}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    />
  );
};

export default MarkdownText;
*/

```

--------------------------------

TITLE: Close Span Tag
DESCRIPTION: This snippet shows a standard HTML closing tag for a 'span' element. This is a fundamental part of structuring content in web pages.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: html
CODE:
```
</span>
```

--------------------------------

TITLE: Import Utility Function 'cn'
DESCRIPTION: Imports the 'cn' utility function from a local '@/lib/utils' path. This function is commonly used for conditionally joining class names in UI development.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { cn } from "@/lib/utils";
```

--------------------------------

TITLE: Define TooltipTrigger in JavaScript
DESCRIPTION: This snippet defines the TooltipTrigger component, also using React's forwardRef. It showcases the assignment of TooltipPrimitive.Trigger to a const variable.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "b4:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[ [\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#8839EF\",\"--shiki-dark\":\"#CBA6F7\"},\"children\":\"const\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#FE640B\",\"--shiki-dark\":\"#FAB387\"},\"children\":\" TooltipTrigger\"},[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\" =\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" TooltipPrimitive\"},[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\".\"}],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\"Trigger\"},[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\"\u003c\"}]],[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\";\"}]]}]})]

```

--------------------------------

TITLE: Initialize AssistantRuntimeProvider in TypeScript
DESCRIPTION: This snippet demonstrates the initialization of an AssistantRuntimeProvider, likely a core component for runtime operations within the assistant UI. It shows a type declaration and assignment, common in TypeScript for defining and using provider patterns.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
type AssistantRuntimeProvider = any;
const provider: AssistantRuntimeProvider = /*unresolved*/ undefined;
```

--------------------------------

TITLE: Register Model Context Provider
DESCRIPTION: Example of registering a model context provider. This is typically used when more than just tools need to be configured for the LLM.

SOURCE: https://assistant-ui.com/docs/guides/Tools

LANGUAGE: javascript
CODE:
```
registerModelContextProvider
```

--------------------------------

TITLE: Integrate Assistant UI with Chat Runtime (AssistantModal)
DESCRIPTION: This React component sets up the Assistant UI runtime and renders the AssistantModal component. It's designed for a more compact chat interface, often used in overlays or sidebars.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: react
CODE:
```
// run `npx shadcn@latest add "https://r.assistant-ui.com/assistant-modal"`

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

const MyApp = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantModal />
    </AssistantRuntimeProvider>
  );
};

```

--------------------------------

TITLE: Memoized Markdown Components
DESCRIPTION: Defines default React components for rendering markdown elements (headings, paragraphs, lists, etc.) with predefined CSS class names. It uses memoization for performance optimization.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
const defaultComponents = memoizeMarkdownComponents({
  h1: ({ className, ...props }) => (
    <h1 className={cn("aui-md-h1", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("aui-md-h2", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("aui-md-h3", className)} {...props} />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn("aui-md-h4", className)} {...props} />
  ),
  h5: ({ className, ...props }) => (
    <h5 className={cn("aui-md-h5", className)} {...props} />
  ),
  h6: ({ className, ...props }) => (
    <h6 className={cn("aui-md-h6", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("aui-md-p", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a className={cn("aui-md-a", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn("aui-md-blockquote", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("aui-md-ul", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("aui-md-ol", className)} {...props} />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("aui-md-hr", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <table className={cn("aui-md-table", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th className={cn("aui-md-th", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("aui-md-td", className)} {...props} />
  ),
  tr: ({ className, ...props }) => (
    <tr className={cn("aui-md-tr", className)} {...props} />
  ),
  sup: ({ className, ...props }) => (
    <sup className={cn("aui-md-sup", className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre className={cn("aui-md-pre", className)} {...props} />
  ),
  code: function Code({ className, ...props }) {
    const isCodeBlock = useIsMarkdownCodeBlock();
    return (
      <code
        className={cn(!isCodeBlock && "aui-md-inline-code", className)}
        {...props}
      />
    );
  },
  CodeHeader,
});
```

--------------------------------

TITLE: Install Dependencies and Add Postinstall Script (npm/yarn)
DESCRIPTION: Installs necessary packages (use-sync-external-store, patch-package) and configures the postinstall script in package.json to automatically apply patches.

SOURCE: https://assistant-ui.com/docs/react-compatibility

LANGUAGE: bash
CODE:
```
npm install use-sync-external-store patch-package
yarn add use-sync-external-store patch-package
```

LANGUAGE: json
CODE:
```
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

--------------------------------

TITLE: Copy to Clipboard Utility
DESCRIPTION: A React hook that provides a function to copy text to the clipboard and a state variable to track the copied status. It utilizes the browser's Clipboard API.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
const copyToClipboard = (value: string) => {
  if (!value) return;

  navigator.clipboard.writeText(value).then(() => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), copiedDuration);
  });
};

return { isCopied, copyToClipboard };
};
```

--------------------------------

TITLE: Import AWS Bedrock and AI SDK for Chat
DESCRIPTION: Imports necessary functions for interacting with Amazon Bedrock and the AI SDK. It includes 'bedrock' for AWS integration and 'convertToModelMessages', 'streamText' for handling chat message conversion and streaming responses.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
import { bedrock } from "@ai-sdk/amazon-bedrock"
import { convertToModelMessages, streamText } from "ai"
;
```

--------------------------------

TITLE: When to Use Core Runtimes
DESCRIPTION: Outlines scenarios for using core runtimes directly, emphasizing custom backend development, the need for features beyond integration offerings, and the desire for complete implementation control.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: text
CODE:
```
Use a core runtime when:
You have a custom backend
You need features not exposed by the integration
You want full control over the implementation
```

--------------------------------

TITLE: SVG Path for a Simple Line
DESCRIPTION: Defines an SVG path element representing a simple vertical line. This is likely used as a separator or part of an icon.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
["$","path","fh3hqa",{"d": "M9 3v18"}]
```

--------------------------------

TITLE: TypeScript NodeJS Process Handling
DESCRIPTION: This TypeScript snippet illustrates how to access and interact with the NodeJS process object. It shows the usage of `process.NodeJS.Process` for type safety and accessing process-related properties.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
var process: NodeJS.Process
```

--------------------------------

TITLE: Next.js App Runtime Definition
DESCRIPTION: This snippet appears to be part of the Next.js runtime initialization, likely defining how application components and their dependencies are loaded. It references several JavaScript chunks.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-1

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "d:I[5571,[\"7857\", \"static/chunks/7857-031040a915662d8a.js\", \"3230\", \"static/chunks/3230-0e52275e3939333e.js\", \"5560\", \"static/chunks/5560-c132b61017d185dd.js\", \"7484\", \"static/chunks/7484-92989dddc8aa5297.js\", \"5817\", \"static/chunks/5817-085a6b2739e98564.js\", \"243\", \"static/chunks/243-b70d19e16f061ae9.js\", \"1679\", \"static/chunks/1679-7"

```

--------------------------------

TITLE: Next.js Client-Side Bootstrapping (JavaScript)
DESCRIPTION: This snippet shows the client-side bootstrapping process for a Next.js application, specifically related to script loading and component rendering. It includes references to various JavaScript chunks and a specific page file, indicating the application's build and execution setup.

SOURCE: https://assistant-ui.com/docs/api-reference/runtimes/MessageRuntime

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "33:I[14016,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"1550\",\"static/chunks/1550-04da82d2480730d0.js\",\"7870\",\"static/chunks/app/docs/%5B%5B...slug%5D%5D/page-5c10b87452d6fdd8.js\"],\"TOCProvider\"]\n"
])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "34:I[57991,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"stati"
])
```

--------------------------------

TITLE: Frontend Implementation with Backend Token Fetch (React)
DESCRIPTION: Frontend code example for Assistant UI, demonstrating how to initialize the chat runtime by fetching an authentication token from a backend API route. It uses `useChatRuntime` and a custom `cloud` instance.

SOURCE: https://assistant-ui.com/docs/cloud/authorization

LANGUAGE: typescript
CODE:
```
const cloud = new AssistantCloud({
  baseUrl: process.env["NEXT_PUBLIC_ASSISTANT_BASE_URL"]!,
  authToken: () =>
    fetch("/api/assistant-ui-token", { method: "POST" }).then((r) =>
      r.json().then((data) => data.token)
    ),
});

const runtime = useChatRuntime({
  api: "/api/chat",
  cloud,
});
```

--------------------------------

TITLE: Load PageBreadcrumb Component - JavaScript
DESCRIPTION: This snippet illustrates the process of dynamically loading the 'PageBreadcrumb' component and its associated JavaScript dependencies. It details the specific chunk files required, common in Next.js applications for optimizing performance through code splitting.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"3a:I[83247,[\"3991\",\"static/chunks/a481b260-4ea16b2cb2d5964d.js\",\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"6249\",\"static/chunks/6249-ff0f18c5b1527af2.js\",\"8444\",\"static/chunks/8444-4438f8aa38c60a35.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"1550\",\"static/chunks/1550-04da82d2480730d0.js\",\"7870\",\"static/chunks/app/docs/%5B%5B...slug%5D%5D/page-5c10b8
```

--------------------------------

TITLE: NextResponse Class Documentation (Next.js)
DESCRIPTION: This snippet details the NextResponse class, which extends the Web Response API. It offers extra convenience methods for Next.js applications. Includes links to relevant web and Next.js documentation.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
class NextResponse extends Response {
  // ... additional methods
}
```

--------------------------------

TITLE: Use Assistant UI in Your React App
DESCRIPTION: This React code snippet shows how to integrate and use the Assistant UI component within your application. It requires setting up the `ChatAssistant` component with necessary props.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import React from 'react';
import { ChatAssistant } from '@assistant-ui/react';

function MyApp() {
  const handleMessageSubmit = async (messages) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    const data = await response.json();
    return data;
  };

  return (
    <ChatAssistant
      apiEndpoint="/api/chat"
      chatHistory={[]}
      onMessageSubmit={handleMessageSubmit}
    />
  );
}

export default MyApp;
```

--------------------------------

TITLE: Vercel AI SDK with Streaming
DESCRIPTION: Describes the implementation pattern using the Vercel AI SDK for streaming capabilities within the Assistant UI. This enables real-time, incremental updates to the user interface as data is generated, enhancing the user experience for dynamic content.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: text
CODE:
```
Vercel AI SDK with Streaming
```

--------------------------------

TITLE: Setting up Page Metadata
DESCRIPTION: This snippet demonstrates how to configure the metadata for a web page, including character set, viewport settings, and favicons. This is typically found in Next.js applications.

SOURCE: https://assistant-ui.com/docs/api-reference/integrations/react-data-stream

LANGUAGE: javascript
CODE:
```
{
  charSet: "utf-8"
}
{
  name: "viewport",
  content: "width=device-width, initial-scale=1"
}
```

--------------------------------

TITLE: Use MyAssistant Component in Page (TypeScript/React)
DESCRIPTION: Demonstrates how to use the `MyAssistant` component within a Next.js page. It imports the `MyAssistant` component and renders it inside a main element with a full viewport height.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

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

TITLE: VSCode: Enable and Start MCP Server
DESCRIPTION: Instructions for enabling and starting the MCP server within VSCode. This involves accessing VSCode settings, searching for 'MCP', enabling the 'Chat > MCP' option, and starting the server via the 'mcp.json' file.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: plaintext
CODE:
```
Open VSCode settings by pressing Cmd/Ctrl + ,
Search for "MCP" in the settings search bar
Enable the "Chat > MCP" option by checking the checkbox
Open GitHub Copilot Chat and switch to "Agent" mode (MCP only works in Agent mode)
Open the "mcp.json" file and click the "start" button that appears in the editor
Once started, you can click the tools button in the Copilot pane to see available tools
```

--------------------------------

TITLE: TypeScript: Define onSwitchToNewThread function signature
DESCRIPTION: Defines the TypeScript function signature for `onSwitchToNewThread`. It takes no arguments and returns a Promise of void, indicating an asynchronous operation.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: TypeScript
CODE:
```
onSwitchToNewThread(): Promise<void>;
```

--------------------------------

TITLE: Define LangChainMessage Type
DESCRIPTION: This snippet defines the TypeScript type for a LangChainMessage, specifying its structure and properties. It's used to represent messages within the LangChain framework.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
type LangChainMessage

```

--------------------------------

TITLE: MessagePrimitive Root Component Example Usage
DESCRIPTION: An example demonstrating the usage of the MessagePrimitive.Root component, showing how to nest MessagePrimitive.Content within it.

SOURCE: https://assistant-ui.com/docs/ui/Markdown

LANGUAGE: jsx
CODE:
```
<MessagePrimitive.Root>
  <MessagePrimitive.Content />
</MessagePrimitive.Root>
```

--------------------------------

TITLE: Next.js Framework Initialization
DESCRIPTION: This snippet shows the initialization process for the Next.js framework, indicated by the `self.__next_f.push` calls. These calls likely register components or functionalities used by the framework to manage client-side rendering and routing.

SOURCE: https://assistant-ui.com/docs/api-reference/context-providers/AssistantRuntimeProvider

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"3c:Tb41,"])
```

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"\u003csvg viewBox=\"0 0 24 24\"\u003e\u003cpath d=\"M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98.45 1.017.812 2.01 1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z\" fill=\"currentColor\" /\u003e\u003c/svg\u003e"])
```

--------------------------------

TITLE: useAssistantInstructions
DESCRIPTION: Hook for using assistant instructions.

SOURCE: https://context7_llms

LANGUAGE: APIDOC
CODE:
```
## GET /docs/copilots/use-assistant-instructions

### Description
Hook for using assistant instructions.

### Method
GET

### Endpoint
/docs/copilots/use-assistant-instructions
```

--------------------------------

TITLE: Importing UI Primitives from '@assistant-ui/react'
DESCRIPTION: This snippet shows the import statements for several primitive UI components from the '@assistant-ui/react' library. These primitives likely serve as the building blocks for more complex UI elements within the assistant-ui project.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
import { ActionBarPrimitive } from "@assistant-ui/react";
import { BranchPickerPrimitive } from "@assistant-ui/react";
import { ComposerPrimitive } from "@assistant-ui/react";
import { MessagePrimitive } from "@assistant-ui/react";
import { ThreadPrimitive } from "@assistant-ui/react";
```

--------------------------------

TITLE: Create Price Snapshot Tool UI with makeAssistantToolUI (TypeScript)
DESCRIPTION: Uses the `makeAssistantToolUI` function from `@assistant-ui/react` to create a UI component for the 'price_snapshot' tool. This example shows how to render the tool's arguments.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph/tutorial/part-2

LANGUAGE: typescript
CODE:
```
"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";

export const PriceSnapshotTool = makeAssistantToolUI<PriceSnapshotToolArgs, string>({
  toolName: "price_snapshot",
  render: function PriceSnapshotUI({ args, result }) {
    return (
      <div className="mb-4 flex flex-col items-center">
        <pre className="whitespace-pre-wrap break-all text-center">
          price_snapshot({JSON.stringify(args)})
        </pre>
      </div>
    );
  },
});
```

--------------------------------

TITLE: JavaScript/TypeScript: Return new NextResponse
DESCRIPTION: Demonstrates returning a new NextResponse instance, a common pattern for API routes in Next.js. It specifies the type signature for the body and initialization options.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
return new NextResponse<unknown>(body?: unknown, init?: ResponseInit): NextResponse
```

--------------------------------

TITLE: Define LangChainMessage array
DESCRIPTION: This snippet defines an array of LangChainMessage objects, commonly used for storing conversational messages in an AI assistant. It specifies the structure for each message.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
messages: LangChainMessage[]
```

--------------------------------

TITLE: Next.js App Layout Chunk Loading
DESCRIPTION: This snippet demonstrates Next.js's internal management of application layout chunks. It lists various JavaScript files that are loaded for the '/docs/layout' route, indicating a system for managing dependencies and optimizing load times.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1,"2f:I[25322,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"\]\n
```

--------------------------------

TITLE: Define messages property as LangChainMessage in TypeScript
DESCRIPTION: This snippet defines a 'messages' property, specifying its type as 'LangChainMessage'. This is common in projects integrating with LangChain for message processing.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
{
  "style": {
    "--shiki-light": "#4C4F69",
    "--shiki-dark": "#CDD6F4"
  },
  "children": "messages"
}
{
  "style": {
    "--shiki-light": "#179299",
    "--shiki-dark": "#94E2D5"
  },
  "children": ":"
}
{
  "style": {
    "--shiki-light": "#4C4F69",
    "--shiki-dark": "#CDD6F4"
  },
  "children": "LangChainMessage"
}
```

--------------------------------

TITLE: Vercel AI SDK Integration with useChatRuntime
DESCRIPTION: Demonstrates integrating the Vercel AI SDK using the `useChatRuntime` hook from `@assistant-ui/react-ai-sdk`. This setup is ideal for projects already utilizing the Vercel AI SDK for a quick and seamless integration.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: javascript
CODE:
```
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export function MyAssistant() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
}
```

--------------------------------

TITLE: Importing and Using Environment Variables in Node.js
DESCRIPTION: Demonstrates how to import the 'node:process' module to access environment variables and log a specific variable ('test') to the console. This code snippet illustrates best practices for environment variable management in Node.js applications.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
import { env } from 'node:process';

env.test = null;
console.log(env.test);
// => 'null'
```

--------------------------------

TITLE: Export Max Duration Configuration
DESCRIPTION: Defines and exports a constant 'maxDuration' which likely sets a time limit for AI operations. This is a common pattern for managing resource usage.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: typescript
CODE:
```
export const maxDuration = 
```

--------------------------------

TITLE: Initialize Assistant UI with assistant-ui CLI
DESCRIPTION: This snippet shows how to initialize Assistant UI in a new or existing project using the assistant-ui CLI. It installs dependencies and sets up a default chat API route.

SOURCE: https://assistant-ui.com/docs/runtimes/mastra/full-stack-integration

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest create
```

LANGUAGE: bash
CODE:
```
npx assistant-ui@latest init
```

--------------------------------

TITLE: Define TooltipIconButton Component (JavaScript)
DESCRIPTION: Illustrates the usage of a TooltipIconButton component, likely for interactive elements that display a tooltip on hover. This snippet shows its className and variant props.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
(
    <TooltipIconButton
      className=\"aui-thread-list-item-archive\"
      variant=\"ghost\"
      tooltip=\"Archive"
    />
  )
```

--------------------------------

TITLE: Render TooltipIconButton in React
DESCRIPTION: This snippet illustrates the usage of a TooltipIconButton component in React, likely for displaying an icon with a tooltip. It includes conditional styling and sets a 'tooltip' prop.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
["$","span",null,{"style":{"--shiki-light":"#EA76CB","--shiki-dark":"#F5C2E7"},"children":"TooltipIconButton"}]
```

--------------------------------

TITLE: TypeScript ThreadsClient DefaultValues
DESCRIPTION: This snippet defines default values for the ThreadsClient in TypeScript. It illustrates how default values are handled and provides context for the ThreadsClient's functionality.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
threads: ThreadsClient
// DefaultValues

// The client for interacting with threads.

threads.DefaultValues
```

--------------------------------

TITLE: Navigation Link: Pricing
DESCRIPTION: Defines a navigation link for the 'Pricing' page, typically associated with service costs. This snippet is a placeholder for the pricing information link.

SOURCE: https://assistant-ui.com/docs/runtimes/pick-a-runtime

LANGUAGE: javascript
CODE:
```
["$","$L2b","4",{"href":"/pricing","icon":["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}
```

--------------------------------

TITLE: TypeScript Type Definition: LangChainMessage
DESCRIPTION: Defines the `LangChainMessage` type, representing a single message within a LangChain conversation. It seems to include a 'role' and 'content' property.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
type LangChainMessage = {
  role: string;
  content: string;
}
```

--------------------------------

TITLE: React Component with Props (JSX)
DESCRIPTION: This snippet shows a React component definition using JSX syntax. It illustrates how to pass properties to a component, including className and children. The code suggests a functional component structure.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: jsx
CODE:
```
(
  <th
    className="aui-md-th"
    {...props}
  />
)
```

--------------------------------

TITLE: TypeScript apiUrl Declaration
DESCRIPTION: Declares a property 'apiUrl' within a client configuration object. It specifies that 'apiUrl' is an optional string, indicating it might not always be provided.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
apiUrl?: string | undefined;
```

--------------------------------

TITLE: Displaying Thread State Function Documentation (TypeScript)
DESCRIPTION: This snippet shows how to display documentation for a TypeScript function that retrieves the state of a thread. It includes parameter and return value descriptions using JSDoc-style tags.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
/**
 * Get state for a thread.
 * @param threadId ID of the thread.
 * @returns Thread state.
 */
getState(threadId: string): ThreadState;
```

--------------------------------

TITLE: Next.js layout structure with external stylesheet
DESCRIPTION: Defines a layout structure within a Next.js application, including the linking of an external stylesheet. This structure likely represents a specific page or section of the application.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
1, "9:I[20578,[\"$\",\"$1\",\"c\",{\"children\":[null,[[\"$\",\"link\",\"0\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/2b659d964a98973e.css\",\"precedence\":\"next\",\"crossOrigin\":\"$undefined\",\"nonce\":\"$undefined\"}]],[\"$\",\"$L20\",null,{\"children\":[\"$L21\",[\"$\",\"$L22\",null,{\"promise\":\"$@23\"}]}]}]}]])"
])"

```

--------------------------------

TITLE: Configure API Key and Base URL for Fireworks AI
DESCRIPTION: This snippet demonstrates how to set environment variables for the Fireworks AI API key and base URL. It ensures the application can authenticate and connect to the correct service endpoint.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
baseURL: "https://api.fireworks.ai/inference/v1"
```

--------------------------------

TITLE: Load Next.js Chunks for App Docs Layout (Image Component)
DESCRIPTION: Loads JavaScript chunks for the '/docs/layout' route, specifically including code for the 'Image' component. This is likely part of the Next.js image optimization or rendering pipeline for the documentation pages.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([1, "10:I[83821,[\"7857\",\"static/chunks/7857-031040a915662d8a.js\",\"3230\",\"static/chunks/3230-0e52275e3939333e.js\",\"5560\",\"static/chunks/5560-c132b61017d185dd.js\",\"7484\",\"static/chunks/7484-92989dddc8aa5297.js\",\"5817\",\"static/chunks/5817-085a6b2739e98564.js\",\"243\",\"static/chunks/243-b70d19e16f061ae9.js\",\"1679\",\"static/chunks/1679-7f1ffad4356b88e0.js\",\"265\",\"static/chunks/265-5221c29d87acf641.js\",\"6082\",\"static/chunks/6082-7122824aafe075fd.js\",\"3341\",\"static/chunks/3341-6e6fba5f79b3758a.js\",\"2283\",\"static/chunks/2283-5108a0ecf2479a0c.js\",\"164\",\"static/chunks/164-a90ac22f28e41b1e.js\",\"3595\",\"static/chunks/3595-efc91f45d0b7420d.js\",\"2032\",\"static/chunks/2032-3f5992acfba397be.js\",\"9926\",\"static/chunks/9926-881e1fc7fffbe717.js\",\"5967\",\"static/chunks/5967-89e5ea0ae819b9fd.js\",\"6957\",\"static/chunks/6957-e573b2b026755259.js\",\"8198\",\"static/chunks/8198-e69520b749b413e4.js\",\"9745\",\"static/chunks/9745-fd94a343788c6195.js\",\"8993\",\"static/chunks/8993-37889e39b7f04e7c.js\",\"8109\",\"static/chunks/8109-d29bf8836e4c7950.js\",\"4499\",\"static/chunks/app/docs/layout-3ecfa0d28ea5f272.js\"],"Image"]\n
```

--------------------------------

TITLE: Install assistant-ui MCP Server using Claude Code CLI
DESCRIPTION: Install the MCP server for the assistant-ui project. You can add it to your current project or globally for all projects.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: bash
CODE:
```
# Add to current project only
claude mcp add assistant-ui -- npx -y @assistant-ui/mcp-docs-server

# Or add globally for all projects
claude mcp add --scope user assistant-ui -- npx -y @assistant-ui/mcp-docs-server
```

--------------------------------

TITLE: makeAssistantToolUI Usage Example
DESCRIPTION: This snippet demonstrates how to use the `makeAssistantToolUI` utility to register a tool UI component. It's a common pattern for integrating custom UI elements with the Assistant.

SOURCE: https://assistant-ui.com/docs/copilots/make-assistant-tool-ui

LANGUAGE: javascript
CODE:
```
makeAssistantToolUI();

```

--------------------------------

TITLE: Install Assistant UI Docs Server Dependencies
DESCRIPTION: This command installs the necessary dependencies for the Assistant UI documentation server. It uses npm to install the package '@assistant-ui/mcp-docs-server' with the '-y' flag for automatic confirmation.

SOURCE: https://assistant-ui.com/docs/mcp-docs-server

LANGUAGE: bash
CODE:
```
npm install -y @assistant-ui/mcp-docs-server
```

--------------------------------

TITLE: NextResponse: Set Headers in Next.js
DESCRIPTION: This snippet illustrates how to set custom headers on a response using the NextResponse object in Next.js. It demonstrates setting the 'Content-Type' header.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: typescript
CODE:
```
new NextResponse(null, {
  headers: {
    'Content-Type': 'application/json'
  }
})
```

--------------------------------

TITLE: Access Environment Variable in JavaScript
DESCRIPTION: Demonstrates how to access an environment variable named 'TEST' using `process.env.TEST` and log its value to the console. This is a common pattern in Node.js applications for configuration.

SOURCE: https://assistant-ui.com/docs/runtimes/langgraph

LANGUAGE: javascript
CODE:
```
console.log(env.TEST);
```

--------------------------------

TITLE: Render UserMessage Component in JavaScript
DESCRIPTION: This snippet details the structure for rendering a 'UserMessage' component. It includes specific styling for different text elements and defines the component's name and its properties, likely for displaying user-generated messages in a chat.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "ec:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" UserMessage\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" UserMessage\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}]}]}}])
```

--------------------------------

TITLE: Install AI SDK v5 and @assistant-ui/react
DESCRIPTION: Installs the AI SDK v5 and the Assistant UI React library. These are essential for integrating AI functionalities into your React application.

SOURCE: https://assistant-ui.com/docs/runtimes/ai-sdk/use-chat

LANGUAGE: bash
CODE:
```
npm install ai @assistant-ui/react
# or
yarn add ai @assistant-ui/react
```

--------------------------------

TITLE: Set Assistant Instructions (React)
DESCRIPTION: Demonstrates how to set system instructions for an assistant using the `useAssistantInstructions` hook from the `@assistant-ui/react` library. It also shows how to make a component's content visible as system context using `makeAssistantVisible`.

SOURCE: https://assistant-ui.com/docs/copilots/model-context

LANGUAGE: javascript
CODE:
```
import {
  useAssistantInstructions,
  makeAssistantVisible,
} from "@assistant-ui/react";

// Via useAssistantInstructions
useAssistantInstructions("You are a helpful assistant...");

// Via makeAssistantVisible
const ReadableComponent = makeAssistantVisible(MyComponent);
// Automatically provides component HTML as system context
```

--------------------------------

TITLE: Render AssistantMessage Component in JavaScript
DESCRIPTION: This snippet defines the structure for an 'AssistantMessage' component. It includes styling for different text elements and specifies the component's name and its associated properties, indicating its role in displaying AI-generated responses.

SOURCE: https://assistant-ui.com/docs/getting-started

LANGUAGE: javascript
CODE:
```
self.__next_f.push([
  1,
  "ee:[\"$\",\"span\",null,{\"className\":\"line\",\"children\":[[\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" AssistantMessage\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#179299\",\"--shiki-dark\":\"#94E2D5\"},\"children\":\":\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#4C4F69\",\"--shiki-dark\":\"#CDD6F4\"},\"children\":\" AssistantMessage\"}],\"$\",\"span\",null,{\"style\":{\"--shiki-light\":\"#7C7F93\",\"--shiki-dark\":\"#9399B2\"},\"children\":\",\"}]}]}}])
```