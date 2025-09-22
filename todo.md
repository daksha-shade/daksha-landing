<!-- 
journal page

 -->

daksha apps

notes
planner
connect apps
keep
calender



<!-- dashboard - show memories from memories vaulte - connected (google photos) and create showcase for that like google photos does for us - and show some plans from the planner like today you have a meeting shedules - this is the todo for your today - have you completed - get the most important tasks from goals app and show on desktop dashboard the percentage so that users can brainstorm and which thing to do - create a thougts apps where users can store there thoughts and ideas -->

<!-- also add two things in the dashboard - one a thought of the day and a quote of the day - and a suggestion of the day - like you should do this today (like let's write a poem today and publish on vani) or you should do that today - like a personal assistant -->


create an app import that will import your other apps data to daksha (photos, calender, forms and others)








in setting add that people can add there custom context about them (that will be prioretised over other journal context) - in a context file - like my name is shaswat raj and i am a software engineer and i am 20 years old - so that daksha can priortise that context over other context

also in the settings add option to add connect other partner that can share.... and parental control



---

<!-- in the context add feature like on /context people can go and create context files (use tiptap editor and also sync it with db ) use qdrant to to save the vector embedding and I have used https://www.assistant-ui.com/llms.txt fetch the docs for it 
and create the context file and save it in the db and vector db and also save it supabase postgres db see the .env.local for qdrant api key and url and all and use the same to save the vector embedding and use openai embedding model to create the vector embedding and save it in qdrant and also save the context file in supabase db - in /chat we must able to fetch the context from the context file and use it as a priorety context over other context so that it can be used in the chat page to answer the questions search for online docs for creating the agents .



QDRANT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.d7RqqOYKS51Djxghd0CjAbx0Wlx_t0BUYlgzCeYMhJE
QDRANT_URL=https://2edc2f9e-eba3-4ac4-99b1-e34ea5a8b816.us-east-1-1.aws.cloud.qdrant.io:6333

shaswatraj@Sh daksha-landing % curl \
    -X GET 'https://2edc2f9e-eba3-4ac4-99b1-e34ea5a8b816.us-east-1-1.aws.cloud.qdrant.io:6333' \
    --header 'api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.d7RqqOYKS51Djxghd0CjAbx0Wlx_t0BUYlgzCeYMhJE'
{"title":"qdrant - vector search engine","version":"1.15.4","commit":"20db14f87c861f3958ad50382cf0b69396e40c10"}%                     
shaswatraj@Sh daksha-landing % curl \
    -X GET 'https://2edc2f9e-eba3-4ac4-99b1-e34ea5a8b816.us-east-1-1.aws.cloud.qdrant.io:6333' \
    --header 'api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.5G1J3g47EI_AiGv7HNmKKIk2yiGGudrmsOxdb1tJ6xI'
{"title":"qdrant - vector search engine","version":"1.15.4","commit":"20db14f87c861f3958ad50382cf0b69396e40c10"}%                     
shaswatraj@Sh daksha-landing % 
also use drizzle orm and also sync the db using api and DATABASE_URL="postgresql://postgres:Prince@4#@db.acljdqliyrtpyhfdzdws.supabase.co:5432/postgres"
 and make everything work




in drizzle also sync it with the stackauth user and also create other tables like context file table and all and also create the vector embedding table and all
 -->
---

https://www.assistant-ui.com/docs/cloud/persistence/ai-sdk

fetch this and create db schema to keep the chat history and also keep the embedding of chat history so that we can search ac it....

---


---


<!-- in /journal page every data is hardcoded we have used openai-api drizzle postgres with pgvector - and platjs for texteditor in /journal/text 
keep thr ui same and create the backend of the application and also fetch the users in the db and seed the sample jounals with all the features that can be added to the db schema about jounalling the features that we may use in the feature as the purpose of the website 
connect the frontend to the be and also keep the vector embedding of the jounal - use r2 endpoints see  the .env.local file and /upload and also add the audio and video recording and uploading feature use openai api key tts and stt features
dont make any mistakes keep ui consistant and working  -->


---

Add semantic search in /jornals make the audio uploading transcribing and also add the text editor and also add the audio and video recording and uploading feature use openai api key tts and stt features

---

<!-- https://context7.com/yoopta-editor/yoopta-editor port to yoopta editor from platjs

--- -->


use https://context7.com/llmstxt/assistant-ui_llms_txt mcp or fetch https://context7.com/llmstxt/assistant-ui_llms_txt/llms.txt?tokens=100000  and gather info about assistant ui 

and create the agents and all the features that are there in the assistant ui - like file upload and all and also create the context file feature in /context page and also create the vector embedding of the context file and save it in qdrant and also save it in supabase db - use drizzle orm to create the db schema and all - use openai embedding model to create the vector embedding and save it in qdrant and also save the context file in supabase db - in /chat we must able to fetch the context from the context file and use it as a priorety context over other context so that it can be used in the chat page to answer the questions search for online docs for creating the agents .


---


<!-- Make this page work and connected to backend use cloud flare R2 to store the audio files in http://localhost:3000/journal/audio and do the same for video page. All the transcribing features and speech to text text to speak features. Use the open API key for all these things. -->


----

fix all tsc errors and delete all unused codes and components and files


---


remove all the tools from /chat and assistant-ui and git commit then use context7 and search about assistant-ui and mem0 and integrate it to /chat with pgvector - you'r free to modify db schema and also save the chat-data and history make it persistant save it too db (search docs online if yournt sure  about assistant-ui.com and mem0 ) - and also read the docs of assistant-ui so that if it fetches the memory layer of chats or jourrnals. or contexts it will show the text also its a little glitch so I would say you to always read and go with the docs

