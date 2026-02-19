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
  "weekTopic": "a 3-6 word theme for this week's AI landscape (e.g. 'The Generative AI Revolution')",
  "bigStory": {
    "headline": "main AI story headline",
    "summary": "2-3 sentence summary of what happened",
    "sourceUrl": "real URL to the source article"
  },
  "classConnection": "2-4 sentences connecting this week's big AI story to entrepreneurship and what Babson students are learning — think competitive strategy, business models, market timing, disruption patterns",
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
  "founderFramework": {
    "title": "actionable framework title (e.g. 'Validate your business idea this weekend using AI')",
    "intro": "1-2 sentences framing why this matters — be direct",
    "steps": [
      { "title": "step name", "description": "2-3 sentences with specific how-to using AI tools" },
      { "title": "step name", "description": "..." },
      { "title": "step name", "description": "..." }
    ],
    "bottomLine": "one sentence quantifying the cost/time savings (e.g. 'Total cost: ~$70. Total time: one weekend. Traditional approach: 6-8 weeks and $5,000+')"
  },
  "aiInBusiness": {
    "title": "a title for 3 practical AI workflows (e.g. '3 AI workflows every Babson founder should be running')",
    "workflows": [
      { "title": "workflow name", "description": "2-3 sentences explaining exactly how to do this with specific AI tools" },
      { "title": "workflow name", "description": "..." },
      { "title": "workflow name", "description": "..." }
    ]
  },
  "quickHits": [
    "Company/Product — one line news item",
    "Company/Product — one line news item",
    "Company/Product — one line news item",
    "Company/Product — one line news item"
  ],
  "nextWeek": "1-2 sentences teasing what's coming in next week's newsletter — what AI trends to watch"
}

RULES:
- Every URL must be real (from your web search results)
- Write in a smart, direct, conversational tone — like a sharp friend, not a professor
- Frame everything through an entrepreneurship and startup lens
- No filler phrases like "In today's rapidly evolving landscape"
- No generic advice — be specific and practical
- The founderFramework and aiInBusiness sections should give students things they can actually DO this week
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
