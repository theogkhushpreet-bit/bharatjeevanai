# 🇮🇳 Bharat Jeevan AI
### Made by GMSSS Nanyola, Ambala

Bharat Jeevan AI is a student-built citizen and family intelligence prototype for the Viksit Bharat 2047 vision.

**Profile → Analyze → Match → Track → Alert → Act**

## What is included
- Polished responsive Bharat Jeevan interface
- GMSSS Nanyola school identity and public school image
- Persistent browser demo profile
- Bharat AI Copilot
- OpenAI Responses API integration
- AI + live web research mode
- Clickable source cards from web research
- Local/offline intelligence fallback
- Secure server-side API-key architecture
- Vercel and Render deployment configuration

## Run locally
```bash
npm install
```

Create `.env` from `.env.example` and set:
```text
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-6-astra
PORT=8787
```

Then:
```bash
npm start
```

Open `http://localhost:8787`.

## AI + Web
**Ask AI** sends the question and the structured family profile to the secure backend. The model can use web search when appropriate.

**Search Web** explicitly requires the Responses API web-search tool and displays the sources returned by the model. This follows the current OpenAI Responses API web-search integration.

Never put `OPENAI_API_KEY` in `index.html` or commit `.env` to GitHub.

## Deploy with Render
1. Push this repository to GitHub.
2. Create a Render Web Service from the repository.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add `OPENAI_API_KEY` as a secret environment variable.
6. Deploy.

## Deploy with Vercel
Import the GitHub repository into Vercel and add `OPENAI_API_KEY` in Project Settings → Environment Variables. The included `vercel.json` routes requests through the Node backend.

## GitHub Pages note
GitHub Pages can host the static frontend, but it cannot safely run the OpenAI backend or protect an API key. Use Render or Vercel for the full AI + Web version.

## Safety and scope
This is a prototype/student project. Government scheme eligibility must be verified against official sources. The health module is organizational/educational and is not a diagnostic or prescribing system.
