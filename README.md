# Velora AI

Velora is an autonomous B2B research and proposal generation agent I built to solve a massive problem in sales: the ridiculous amount of time wasted on manual company research. 

Instead of spending hours digging through a prospect's website to figure out what they do and where their operational gaps are, Velora does it automatically. You give it a URL, and it leverages a 120-billion parameter reasoning model to scrape, analyze, and output a highly personalized, ready-to-send business proposal and cold email draft.

## Why I built this
I was tired of seeing sales teams send generic "insert company name here" pitches. I wanted to build something that actually reads a prospect's website, understands their specific industry, finds their actual decision-makers, and spots real automation opportunities—all without human intervention. 

This isn't just a wrapper. It uses a dynamic two-step agent architecture:
1. **The Analyst (GPT-120B):** Scrapes the target site and strictly identifies manual processes and operational weaknesses without any generic selling.
2. **The Engineer (Llama 3.3 70B):** Takes that raw analysis and drafts a hyper-personalized, technical proposal tailored specifically to the gaps found.

## Tech Stack
- Framework: Next.js 15 (App Router)
- UI: React, Tailwind CSS, Framer Motion (for those smooth glassmorphism effects)
- AI: Groq SDK (OpenAI & Llama models)
- Scraping: Firecrawl/ZenRows integration

## Running it locally

First, clone the repo and install dependencies:
```bash
npm install
```

You'll need to set up your environment variables. Create a `.env.local` file in the root and add your keys:
```env
FIRECRAWL_API_KEY="your_api_key_here"
GROQ_API_KEY="your_groq_key_here"
```

Then run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) and you're good to go.

---
Built by [Saad](http://maliksaad.bio.link/). Reach out to me on [LinkedIn](https://www.linkedin.com/in/muhammad-saad-95847b3b2/) or [GitHub](https://github.com/MALIKSAAD-dev) if you want to chat about AI architectures.
