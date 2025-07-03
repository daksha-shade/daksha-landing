Who writes code, or does other technical work on your product? Was any of it done by a non-founder? Please explain.
I, Shaswat Raj, am the sole person writing all the code and handling the technical work for Daksha. This includes the full-stack development (frontend, backend, and infrastructure), AI integration, and system architecture.

No part of the product has been outsourced or built by a non-founder. Everything — from the MVP to the live website and AI workflows — has been developed by me. I'm currently looking for a cofounder with complementary skills in AI research or growth, but all current technical progress is founder-built.
Are you looking for a cofounder?
Yes
Founder Video
Company
Company name
Daksha
Describe what your company does in 50 characters or less.
Your journaling, agentic life companion & MindOS
Company URL, if any
https://daksha.live
Demo Video
None uploaded
Please provide a link to the product, if any.
https://mvp.daksha.live
Unanswered
What is your company going to make? Please describe your product and what it does or will do.
Daksha is a journaling-first, emotionally intelligent AI companion that evolves into a personal OS (MindOS). It begins by helping users reflect and plan their lives, then grows into a proactive agent that understands their goals, habits, and values—ultimately becoming their second brain and personal AI assistant. Unlike mental health chatbots, Daksha is built as a Jarvis-like AI for personal growth, productivity, and life management. It's the future of HUMAN-AI relationship.

Daksha is an intelligent journaling app that evolves into your sacred agentic AI companion. It starts by helping users reflect deeply through contextual and emotionally intelligent journaling. Over time, Daksha builds a personalized understanding of the user to offer mental clarity, self-growth insights, task planning, and emotional support — all integrated into a single, evolving personal AI.

Daksha is a personal AI journaling companion that evolves into a fully personalized life assistant. It starts as a smart diary app, using text and voice entries to learn about the user’s goals, mood, and relationships. Over time Daksha actively connects to the user’s digital world (calendar, photos, notes, messaging) and intervenes like a “Jarvis” for your mind. For example, it can remind you of past insights, suggest tasks aligned with your mood, or autonomously draft responses (tweets, emails) in your voice. In short, it synthesizes your emotional context and digital data to help you think, feel, and act with more clarity.

In Daksha, I'm also planning to offer unlimited storage for videos, photos, and other content, integrated with AI capabilities. So that we will be able to replace apps like photos, drive, notion, calendar, notes and even chatgpt (for specific usecases only) from people life creating an all-in-one ecosystem, and create a complete clutch scene.
Where do you live now, and where would the company be based after YC?
Ranchi, India / Mountain View, USA
Explain your decision regarding location.
We’re currently based in Ranchi, India where we’ve built the MVP and tested it with early users. Post-YC, we plan to move to the Bay Area to immerse in the YC ecosystem, access top-tier AI talent, and be closer to global investors and potential partners.

Progress
How far along are you?
We have built a working prototype of the Daksha journaling interface and core AI features. The app can accept text/voice entries, store them in a graph database, and perform basic summarization and reminders. We are integrating with calendar and note-taking APIs (Google Calendar, Notion) for a private alpha test. (Product Hunt launch and public beta planned in 2–3 months.)

How long have each of you been working on this? How much of that has been full-time? Please explain.
I conceived and began prototyping Daksha about 12 months ago. The first 6 months I developed it part-time alongside work; the last 6 months have been full-time dedicated development.
What tech stack are you using, or planning to use, to build this product? Include AI models and AI coding tools you use.
Daksha is built with a modern AI-first, privacy-conscious stack:

Frontend: Next.js 15 (App Router) + Tailwind CSS for a sleek journaling interface.

Backend: Node.js (Edge Functions) with Vercel and optional serverless APIs on Cloudflare Workers for lightweight, scalable infrastructure.

Database: Planetscale (MySQL) + Redis (session/memory cache). We're also exploring graph databases (like Neo4j or LangGraph) for long-term memory and emotion pattern modeling.

Auth & Sync: Clerk.dev + OAuth for connecting third-party tools like Google Calendar, Notion, and messaging apps.

AI/LLM Stack:

OpenAI GPT-4o for journaling summaries, contextual dialogue, and weekly insight generation.

Anthropic Claude 3 Sonnet for emotionally nuanced analysis.

Whisper (OpenAI) for voice-to-text journaling.

LangChain + LlamaIndex to build a long-term memory engine (our personal knowledge graph).

Fine-tuned small models (like Mistral or Phi-3) for fast local execution of personal AI tasks.

Privacy/Offline-first vision: We plan to allow local model inference on-device (i.e., Mistral 7B via WebGPU/WebAssembly) for private users who opt out of cloud processing.

Tooling: We use Supabase for prototyping DBs, Posthog for analytics, and GPT/Claude-based coding copilots for faster iteration. All code is versioned and tested via GitHub Actions and deployed via Cloudflare Worker.
Are people using your product?
Yes
How many active users or customers do you have? How many are paying? Who is paying you the most, and how much do they pay you?
We have 320+ early signups, with 100+ actively testing Daksha across journaling, memory, and reflection modules.

In a closed pilot, 15 early adopters contributed $3–$5 each to access the prototype. This was not structured revenue, but part of an experiment to gauge early willingness to pay and prioritize committed testers.

No one is currently on a recurring plan. With v2 launching soon, we plan to introduce structured pricing tiers and convert early testers into paid subscribers.
Do you have revenue?
no
If you are applying with the same idea as a previous batch, did anything change? If you applied with a different idea, why did you pivot and what did you learn from the last idea?
Yes. Previously, Daksha had a mental health framing, focused on being an emotional wellness journaling app.

We pivoted after user interviews and competitive analysis showed that mental health is a sensitive, heavily regulated domain – and that many users actually wanted agency, not therapy. They didn’t want to be “treated”; they wanted a tool that remembered them and helped them act on their thoughts.

So, we reframed Daksha as a Journaling-first MindOS – a personal assistant that grows with you, like Jarvis. It still helps with emotional clarity, but it’s now focused on productivity, personal knowledge management, and proactive life assistance, not mental health.

This pivot helped us clarify our roadmap and build a product that people can adopt every day, without stigma or hesitation.

If you have already participated or committed to participate in an incubator, "accelerator" or "pre-accelerator" program, please tell us about it.
No. Daksha has not participated in any incubator or accelerator program so far.

Idea
Why did you pick this idea to work on? Do you have domain expertise in this area? How do you know people need what you're making?
I’ve always journaled to find clarity in chaotic times. As an indie hacker and builder, I realized that most journaling apps are either superficial or isolated from productivity and growth. At the same time, AI companions are either too robotic or too focused on general productivity.

Daksha emerged from the desire to combine inner reflection with external agency — to create a sacred space where emotional intelligence and AI intersect.

We’ve spoken with dozens of users who struggle with burnout, emotional turbulence, or lack of clarity. Our early testers have told us that Daksha helped them feel “heard,” “seen,” and even "understood by AI." That insight gave us the conviction to go all in.

I've journaled for years, and found no tool that truly connects reflection with meaningful action. AI chatbots lacked depth. Daksha was born from solving my own problem. 30+ testers have shared how they now journal more consistently, with clarity and purpose. We've collected 100+ feedback entries guiding our product roadmap.

I became passionate about the intersection of mental health and AI through my background in computer science and psychology. Personally, I found traditional journaling incredibly helpful during stressful periods, but I noticed it lacked actionable insights. Research also shows that self-reflection tools work better when they adapt to the individual. I knew many friends and colleagues struggle with decision fatigue and emotional overwhelm. By building Daksha, I combine my technical skills (NLP, machine learning) with a genuine understanding of this need. Early user interviews confirm that people want a more intelligent companion (beyond static apps) to help organize their thoughts and feelings.
Who are your competitors? What do you understand about your business that they don't?
Current tools are fragmented: some use generic note apps (Notion, Day One) for journaling, others use mental health chatbots (Replika, Wysa) or simply Google Calendar and reminders. None tie together emotional context with automation across platforms. Daksha’s novelty is deep personal memory + agentic AI. It doesn’t just log your entries; it remembers your emotional patterns and actively does things on your behalf. For instance, if you say “remind me to call my mom” in a journal entry, Daksha can schedule it in your calendar. No existing product offers this combination of emotional intelligence, contextual memory, and proactive action.

Key competitors include journaling apps like Day One or Penzu, mental health bots like Replika or Calamity (Meta’s recent launch), and even generic assistants (Siri, ChatGPT). However, each of those misses critical elements: journaling apps lack AI actions, Replika doesn’t integrate with your apps or do tasks, and ChatGPT forgets your past. Our edge is specialization: Daksha builds a personal, persistent memory graph of your life and feelings, which these others don’t. In the future, large AI platforms (Google, Meta) could add similar features, but we believe user trust and the emotional focus of our design are strong differentiators. After some growth, I'm also planning to do research and development in the hardware field to give daksha - different skins.
How do or will you make money? How much could you make?
We plan a freemium model: basic journaling and simple AI queries are free, while advanced integrations and agent actions (syncing calendars, posting to social, generating video content, etc.) are in a Premium tier (~$10–$15/month). We’ll also license Daksha’s “emotional AI” as a white-label platform to enterprises and wellness programs. Given that the global mental &, even a niche product like Daksha could capture $50–100M of revenue if it meets user needs. For example, if just 1% of 20M target users paid $120/year, that’s $24M annually. We’re conservatively aiming for ~$10–20M ARR by year 5.

Daksha targets individuals concerned with self-improvement and emotional health. We’ll use content marketing (blog posts, podcasts on wellness and AI), SEO for journaling/self-care topics, and partnerships with therapists or coaching programs who recommend the tool to clients. Viral growth can come from sharing insights: e.g. users love seeing personalized week-in-review reports or quote cards generated by Daksha, which encourages them to share on social media. We’ll also pilot with online communities (meditation and productivity forums) to get initial feedback. There’s no chicken-and-egg problem – each new feature directly benefits users, so we grow one user at a time.
Which category best applies to your company?
Wellness
If you had any other ideas you considered applying with, please list them. One may be something we've been waiting for. Often when we fund people it's to do something they list here and not in the main application.
In early brainstorming we considered a passive mood tracker and a collaborative journaling network. Ultimately, we focused on the personal AI assistant vision for Daksha. (We believe a strong focus on one idea is better than splitting efforts.)
Equity
Have you formed ANY legal entity yet?
no
If you have not formed the company yet, describe the planned equity ownership breakdown among the founders, employees and any other proposed stockholders. If there are multiple founders, be sure to give the proposed equity ownership of each founder and founder title (e.g. CEO). (This question is as much for you as us.)
No (pre-company stage), We have not formed a legal entity yet.
Current equity breakdown: Shaswat Raj (Founder & CEO) – 100% (currently solo founder)

As I actively search for a cofounder (especially someone strong in AI or growth), equity will be split fairly based on contribution and commitment. Future employee equity pool: 10–15% planned at incorporation.
We plan to incorporate as a Delaware C Corporation before issuing stock.
Have you taken any investment yet?
no
Are you currently fundraising?
no
Curious
What convinced you to apply to Y Combinator? Did someone encourage you to apply? Have you been to any YC events?
I’ve followed YC since school and always admired its community and bold vision. I’ve seen how startups like Replit, DoNotPay, and Linear evolved through YC.

This time, I felt a deep pull to apply — Daksha felt like the right idea at the right moment. Some founders and friends encouraged me, and I joined YC Launch events online. I believe YC can help me build Daksha into something truly world-changing.
We’ve always admired Y Combinator for its track record of backing founders who are building the future – especially in AI and personal computing. Projects like Replit, Mem, Humane, and even early Dropbox showed us it’s possible to build radically new interfaces for how humans interact with software.

After watching many founder interviews and reading blog posts (like Fluently's application breakdown), we felt YC understood the scale and depth of what we want to build.

We've attended YC AMAs, watched alumni demo days, and follow Hacker News closely. YC seems to be the only place that takes agentic, AI-first, and deeply personal product visions seriously – which is exactly where Daksha lives.



How did you hear about Y Combinator?
Initially through Paul Graham’s essays, then via Hacker News, and later from the success stories of startups like Notion, Replit, and Perplexity. Over time, we realized YC wasn’t just a funding program – it was a mindset and ecosystem that matched our ambition.
