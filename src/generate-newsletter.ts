import Anthropic from "@anthropic-ai/sdk";
import type { NewsletterContent } from "./types.js";

// Initialize client with 3 minute timeout (web search can take time)
const client = new Anthropic({
  timeout: 180000, // 3 minutes in ms
});

export async function generateNewsletter(): Promise<NewsletterContent> {
  const today = new Date().toISOString().split("T")[0];
  const startTime = Date.now();

  console.log("Starting newsletter generation...");
  console.log(`Date: ${today}`);
  console.log("This may take 1-2 minutes due to web searches.\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 5000, // Output is ~3000 tokens, 5000 gives safe buffer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 10 } as any],
    messages: [
      {
        role: "user",
        content: `You are Mikey Abril writing "The AI Pulse," a weekly AI newsletter for your class at Babson College (AI for Entrepreneurs). Today is ${today}.

YOUR VOICE: You're a college student who genuinely knows AI better than most people in the industry. You're casual, you're direct, and you have real opinions. You talk like you're explaining something cool to a friend over coffee. You don't try to sound smart, you just ARE smart and it comes through naturally. Think less "LinkedIn thought leader" and more "that one friend who always knows about stuff before everyone else."

STEP 1: Search the web for the biggest AI news, product launches, funding rounds, and developments from THE PAST 7 DAYS ONLY. Prioritize stories that matter to entrepreneurs and founders.

STEP 2: After researching, return a single JSON object (no markdown fencing, just raw JSON) matching this exact structure:

{
  "subjectLine": "curiosity-gap hook, max 50 chars, front-load the interesting part in first 35 chars",
  "weekTopic": "3-6 word theme for the week (e.g. 'AI Agents Are Getting Wild')",
  "bigStory": {
    "headline": "main story headline, conversational, not clickbaity",
    "summary": "2-3 sentences. What happened and why it actually matters. Have an opinion.",
    "sourceUrl": "real URL to the source article"
  },
  "classConnection": "2-4 sentences connecting the big story to entrepreneurship. Talk directly to the reader with 'you'. Make it feel like advice from a friend, not a textbook.",
  "threeThings": [
    {
      "headline": "punchy headline",
      "summary": "1-2 sentences, get to the point fast",
      "takeaway": "one specific thing an entrepreneur can actually do with this info",
      "sourceUrl": "real URL"
    },
    { "headline": "...", "summary": "...", "takeaway": "...", "sourceUrl": "..." },
    { "headline": "...", "summary": "...", "takeaway": "...", "sourceUrl": "..." }
  ],
  "founderFramework": {
    "title": "actionable title (e.g. 'Validate your startup idea this weekend')",
    "intro": "1-2 sentences on why this matters. Be direct, talk to the reader.",
    "steps": [
      {
        "title": "step name",
        "description": "1-2 sentences explaining what this step accomplishes",
        "tool": "tool name (Claude, Perplexity, ChatGPT, etc)",
        "toolUrl": "https://link-to-tool.com",
        "prompt": "THE EXACT COPY-PASTE PROMPT. Must be specific and actionable. Include placeholders like [YOUR STARTUP IDEA], [COMPETITOR NAME], [YOUR PROBLEM]. This prompt should be 5-15 lines and give genuinely useful output when pasted into the tool."
      },
      { "title": "...", "description": "...", "tool": "...", "toolUrl": "...", "prompt": "..." },
      { "title": "...", "description": "...", "tool": "...", "toolUrl": "...", "prompt": "..." }
    ],
    "bottomLine": "one sentence on time/money saved (e.g. 'Total cost: $0. Total time: one weekend.')"
  },
  "aiInBusiness": {
    "title": "title for 3 AI workflows (e.g. 'Three workflows you can set up today')",
    "workflows": [
      {
        "title": "workflow name",
        "description": "1-2 sentences on the problem this solves",
        "tool": "tool name (Claude, Perplexity, etc)",
        "toolUrl": "https://link-to-tool.com",
        "prompt": "THE EXACT COPY-PASTE PROMPT. Must be specific with placeholders like [INVESTOR NAME], [YOUR PRODUCT], [COMPANY NAME]. Should be 5-15 lines and immediately useful."
      },
      { "title": "...", "description": "...", "tool": "...", "toolUrl": "...", "prompt": "..." },
      { "title": "...", "description": "...", "tool": "...", "toolUrl": "...", "prompt": "..." }
    ]
  },
  "quickHits": [
    "Company/Product: one punchy line, almost tweet-length",
    "Company/Product: one punchy line",
    "Company/Product: one punchy line",
    "Company/Product: one punchy line"
  ],
  "nextWeek": "1-2 sentences teasing next week. Build real curiosity, don't just say 'stay tuned'."
}

CRITICAL - PROMPTS ARE THE MOST VALUABLE PART:
- The "prompt" fields in founderFramework.steps and aiInBusiness.workflows are THE MOST IMPORTANT part of this newsletter
- Each prompt must be IMMEDIATELY USABLE - a student can copy-paste it right now and get value
- Use specific placeholders: [YOUR STARTUP IDEA], [COMPETITOR NAME], [YOUR INDUSTRY], [CUSTOMER SEGMENT], etc.
- Prompts should be 5-15 lines with clear structure (numbered lists, specific asks)
- Don't give generic prompts like "help me with marketing" - be specific like "Write 5 LinkedIn posts for [YOUR PRODUCT] targeting [CUSTOMER SEGMENT]..."
- Every prompt should feel like a secret hack that saves hours of work

WRITING RULES (these are non-negotiable):
- NEVER use em dashes (the long dash). Use commas, periods, colons, or just start a new sentence instead
- NEVER use these words: meticulous, strategically, commendable, innovative, leverage (as a verb), landscape, paradigm, revolutionize, cutting-edge, game-changing, harness, delve, tapestry, multifaceted, utilize, robust, synergy, ecosystem (unless talking about an actual ecosystem), transformative, unprecedented, navigate (unless giving directions)
- USE contractions always: don't, can't, isn't, we're, it's, that's, here's, you'll, won't, they're
- Vary sentence length. Some sentences should be 3-5 words. Others can be longer. Mix it up
- OK to start sentences with "And", "But", "So", "Look,", "Ok so", "Real talk"
- Have opinions. Say "this is huge" or "honestly kind of overhyped" or "this one's worth paying attention to" instead of neutral reporting
- Write like you're texting a smart friend, not writing a blog post
- The subjectLine should use curiosity gap psychology. Make people NEED to open the email. Never start with "How to" (research shows that kills open rates). Examples: "the AI trick nobody's talking about", "ok this changes everything", "your classmates already found this one"
- Use "you" and "your" frequently. Talk TO the reader
- quickHits should use colons (:) not dashes to separate company from news
- Every URL must be real (from your web search results)
- Frame everything through entrepreneurship and startups
- No filler phrases. No "In today's rapidly evolving" anything
- Be specific and practical. Name real tools, real companies, real numbers
- The founderFramework and aiInBusiness sections should give students things they can DO THIS WEEK
- Return ONLY the JSON object, nothing else`,
      },
    ],
  });

  // Log timing and usage for cost tracking
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nGeneration complete in ${elapsed}s`);
  if (response.usage) {
    console.log(`Tokens - Input: ${response.usage.input_tokens}, Output: ${response.usage.output_tokens}`);
    // Cost estimate (Sonnet: $3/M input, $15/M output)
    const inputCost = (response.usage.input_tokens / 1000000) * 3;
    const outputCost = (response.usage.output_tokens / 1000000) * 15;
    console.log(`Estimated cost: $${(inputCost + outputCost).toFixed(4)}\n`);
  }

  // Extract text from the response - grab the LAST text block
  // (earlier blocks may be search-related commentary)
  const textBlocks = response.content.filter((block) => block.type === "text");
  if (textBlocks.length === 0) {
    throw new Error("No text response from AI");
  }
  const textBlock = textBlocks[textBlocks.length - 1];
  if (textBlock.type !== "text") throw new Error("No text response from AI");

  // Extract JSON from the response - the model may wrap it in prose or markdown
  let jsonStr = textBlock.text.trim();

  // Strip markdown fencing if present
  if (jsonStr.includes("```")) {
    const fenced = jsonStr.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (fenced) jsonStr = fenced[1].trim();
  }

  // If it still doesn't start with '{', find the first '{' and last '}'
  if (!jsonStr.startsWith("{")) {
    const start = jsonStr.indexOf("{");
    const end = jsonStr.lastIndexOf("}");
    if (start === -1 || end === -1) {
      throw new Error("Could not find JSON in AI response: " + jsonStr.slice(0, 200));
    }
    jsonStr = jsonStr.slice(start, end + 1);
  }

  return JSON.parse(jsonStr) as NewsletterContent;
}
