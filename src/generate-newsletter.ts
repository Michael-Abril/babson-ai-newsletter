import Anthropic from "@anthropic-ai/sdk";
import type { NewsletterContent } from "./types.js";

const client = new Anthropic();

export async function generateNewsletter(): Promise<NewsletterContent> {
  const today = new Date().toISOString().split("T")[0];

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16000,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 15 } as any],
    messages: [
      {
        role: "user",
        content: `You are a newsletter editor for "The AI Pulse," a weekly AI newsletter for Babson College entrepreneurship students. Today is ${today}.

Search the web for the most important AI news, product launches, funding rounds, and developments from THE PAST 7 DAYS ONLY. Focus on stories relevant to entrepreneurs and startup founders.

After researching, return a single JSON object (no markdown fencing, just raw JSON) matching this exact structure:

{
  "subjectLine": "short compelling hook under 50 chars",
  "bigStory": {
    "headline": "main AI story headline",
    "summary": "2-3 sentence summary of what happened",
    "founderAngle": "2-3 sentences on why Babson entrepreneurs should care — be specific and actionable",
    "sourceUrl": "real URL to the source article"
  },
  "threeThings": [
    {
      "headline": "story headline",
      "summary": "1-2 sentence summary",
      "takeaway": "one specific actionable insight for entrepreneurs",
      "sourceUrl": "real URL"
    },
    { "headline": "...", "summary": "...", "takeaway": "...", "sourceUrl": "..." },
    { "headline": "...", "summary": "...", "takeaway": "...", "sourceUrl": "..." }
  ],
  "tutorial": {
    "title": "actionable tutorial title (e.g. 'Validate Your Startup Idea in 10 Minutes with AI')",
    "intro": "1-2 sentences framing why this matters for entrepreneurs",
    "steps": ["step 1 with specific instructions", "step 2...", "step 3...", "step 4 (optional)", "step 5 (optional)"]
  },
  "founderFramework": {
    "title": "framework title (e.g. 'The AI-Powered Customer Discovery Sprint')",
    "intro": "1-2 sentences introducing the framework",
    "steps": [
      { "title": "step name", "description": "2-3 sentences with specific how-to" },
      { "title": "step name", "description": "..." },
      { "title": "step name", "description": "..." }
    ],
    "bottomLine": "one sentence quantifying the cost/time savings"
  },
  "quickHits": [
    "Company/Product — one line news item",
    "Company/Product — one line news item",
    "Company/Product — one line news item",
    "Company/Product — one line news item"
  ]
}

RULES:
- Every URL must be real (from your web search results)
- Write in a smart, direct, conversational tone — like a sharp friend, not a professor
- Frame everything through an entrepreneurship lens
- Tutorial steps must be copy-paste actionable
- No filler phrases like "In today's rapidly evolving landscape"
- No generic advice — be specific and practical
- Return ONLY the JSON object, nothing else`,
      },
    ],
  });

  // Extract text from the response
  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  // Parse the JSON — strip any accidental markdown fencing
  let jsonStr = textBlock.text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(jsonStr) as NewsletterContent;
}
