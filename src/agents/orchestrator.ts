/**
 * Multi-Agent Orchestrator for The AI Pulse Newsletter
 * 
 * This orchestrates 6 specialized agents in sequence:
 * 1. Research Agent - Finds AI news
 * 2. Curation Agent - Scores and selects stories
 * 3. Writer Agent - Drafts in Mikey's voice
 * 4. Editor Agent - Kills AI-sounding language
 * 5. Babson Context Agent - Adds entrepreneur relevance
 * 6. QA Agent - Final quality gate
 */

import Anthropic from "@anthropic-ai/sdk";
import type { NewsletterContent } from "../types.js";
import type { ResearchedStory, CuratedStory, QAScore, PipelineState, AgentResult } from "./types.js";

const client = new Anthropic();

// Banned words that scream "AI wrote this"
const BANNED_WORDS = [
  "meticulous", "meticulously", "strategically", "commendable", "innovative",
  "leverage", "landscape", "paradigm", "revolutionize", "cutting-edge",
  "game-changing", "harness", "delve", "tapestry", "multifaceted", "utilize",
  "robust", "synergy", "ecosystem", "transformative", "unprecedented", "navigate",
  "in today's rapidly", "it's important to note", "in conclusion", "furthermore",
  "moreover", "hence", "thus", "therefore", "consequently", "subsequently"
];

async function runAgent<T>(
  agentName: string,
  systemPrompt: string,
  userPrompt: string,
  useWebSearch: boolean = false
): Promise<AgentResult<T>> {
  console.log(`\nRunning ${agentName}...`);
  
  const tools: Anthropic.Tool[] = useWebSearch 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? [{ type: "web_search_20250305", name: "web_search", max_uses: 20 } as any]
    : [];

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16000,
    system: systemPrompt,
    tools,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlocks = response.content.filter((block) => block.type === "text");
  const textBlock = textBlocks[textBlocks.length - 1];
  if (textBlock?.type !== "text") {
    throw new Error(`${agentName}: No text response`);
  }

  // Extract JSON from response
  let jsonStr = textBlock.text.trim();
  if (jsonStr.includes("```")) {
    const fenced = jsonStr.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (fenced) jsonStr = fenced[1].trim();
  }
  if (!jsonStr.startsWith("{") && !jsonStr.startsWith("[")) {
    const start = jsonStr.indexOf("{") !== -1 ? jsonStr.indexOf("{") : jsonStr.indexOf("[");
    const endBrace = jsonStr.lastIndexOf("}");
    const endBracket = jsonStr.lastIndexOf("]");
    const end = Math.max(endBrace, endBracket);
    if (start !== -1 && end !== -1) {
      jsonStr = jsonStr.slice(start, end + 1);
    }
  }

  const parsed = JSON.parse(jsonStr);
  console.log(`${agentName} complete`);
  
  return {
    agentName,
    success: true,
    data: parsed as T,
    reasoning: textBlock.text.slice(0, 500),
    timestamp: new Date().toISOString(),
  };
}

// ============================================================================
// AGENT 1: RESEARCH AGENT
// ============================================================================
async function researchAgent(): Promise<AgentResult<ResearchedStory[]>> {
  const today = new Date().toISOString().split("T")[0];
  
  return runAgent<ResearchedStory[]>(
    "Research Agent",
    `You are the Research Agent for The AI Pulse newsletter. Your job is to find the most significant AI news from the past 7 days.

Focus on:
- Product launches and updates (new AI tools, features)
- Funding rounds (AI startups raising money)
- Major announcements from big players (OpenAI, Anthropic, Google, Meta, Microsoft)
- Tools useful for entrepreneurs and students
- Research breakthroughs with practical applications

You must return ONLY a JSON array of stories. Each story needs:
- headline: Clear, factual headline
- summary: 2-3 sentence summary of what happened
- sourceUrl: Real URL to the source (must be valid)
- publishedDate: When it was published (YYYY-MM-DD)
- category: One of "product_launch", "funding", "research", "tool", "announcement"`,
    
    `Today is ${today}. Search the web for the 25 most significant AI news stories from the PAST 7 DAYS ONLY.

Search for:
1. "AI news this week" + today's date
2. "AI product launch" + this week
3. "AI funding round" + this week
4. "OpenAI announcement" + this week
5. "Anthropic Claude" + this week
6. "AI tools for business" + this week

Return a JSON array of the top 25 stories you find. Each must have: headline, summary, sourceUrl, publishedDate, category.

Return ONLY the JSON array, no other text.`,
    true // Use web search
  );
}

// ============================================================================
// AGENT 2: CURATION AGENT
// ============================================================================
async function curationAgent(stories: ResearchedStory[]): Promise<AgentResult<CuratedStory[]>> {
  return runAgent<CuratedStory[]>(
    "Curation Agent",
    `You are the Curation Agent for The AI Pulse, a newsletter for Babson College entrepreneurs.

Your job is to score and rank stories based on:
1. Entrepreneur relevance (1-10): How useful is this for someone starting a business?
2. Actionability (1-10): Can a college student actually DO something with this info this week?
3. Uniqueness (1-10): Is this surprising or different from typical AI news?

You're filtering for Babson students who want to use AI to build startups. They don't care about abstract research. They care about tools they can use NOW.

Return the TOP 5 stories only, with scores and curator notes explaining your choices.`,
    
    `Here are ${stories.length} AI stories from this week:

${JSON.stringify(stories, null, 2)}

Score each story on:
- entrepreneurScore (1-10): How relevant for startup founders?
- actionabilityScore (1-10): Can students use this THIS WEEK?
- uniquenessScore (1-10): Is this surprising/novel?

Calculate totalScore = (entrepreneurScore * 2) + actionabilityScore + uniquenessScore

Return a JSON array of the TOP 5 stories (highest totalScore), including all original fields plus:
- entrepreneurScore
- actionabilityScore
- uniquenessScore
- totalScore
- curatorNotes (1-2 sentences on why you picked it)

Return ONLY the JSON array.`
  );
}

// ============================================================================
// AGENT 3: WRITER AGENT
// ============================================================================
async function writerAgent(stories: CuratedStory[]): Promise<AgentResult<NewsletterContent>> {
  const today = new Date().toISOString().split("T")[0];

  return runAgent<NewsletterContent>(
    "Writer Agent",
    `You are Mikey Abril writing "The AI Pulse" newsletter. You're a college student at Babson who genuinely knows AI better than most people in the industry.

YOUR VOICE:
- Casual and direct, like explaining something to a friend over coffee
- You have real opinions. You say "this is huge" or "honestly kind of overhyped"
- You use contractions always: don't, can't, won't, it's, that's
- You start sentences with "And", "But", "So", "Look,", "Ok so", "Real talk"
- You vary sentence length. Some 3-5 words. Others longer.
- You talk TO the reader with "you" and "your"
- You're NOT a LinkedIn thought leader. You're that friend who always knows about stuff first.

CRITICAL: THE PROMPTS ARE THE MOST IMPORTANT PART
- Every framework step MUST include a copy-paste prompt
- Every workflow MUST include a copy-paste prompt
- Prompts should be specific and actionable, not generic
- Use placeholders like [YOUR IDEA], [COMPANY NAME], [COMPETITOR]
- Students should be able to paste the prompt directly into Claude/ChatGPT and get useful output

NEVER USE these words: meticulous, strategically, leverage, landscape, paradigm, revolutionize, cutting-edge, game-changing, harness, delve, robust, synergy, ecosystem, transformative, unprecedented, navigate

NEVER USE em dashes. Use commas, periods, or colons instead.`,
    
    `Today is ${today}. Write a complete newsletter using these curated stories:

${JSON.stringify(stories, null, 2)}

Return a JSON object with this EXACT structure:
{
  "subjectLine": "curiosity-gap hook, max 50 chars, front-load interesting part",
  "weekTopic": "3-6 word theme (e.g. 'AI Agents Are Getting Wild')",
  "bigStory": {
    "headline": "main story headline, conversational",
    "summary": "2-3 sentences. What happened and why it matters. Have an opinion.",
    "sourceUrl": "real URL from the story"
  },
  "classConnection": "2-4 sentences connecting to entrepreneurship. Talk directly to reader.",
  "threeThings": [
    {
      "headline": "punchy headline",
      "summary": "1-2 sentences, get to point fast",
      "takeaway": "one specific thing an entrepreneur can DO",
      "sourceUrl": "real URL"
    },
    { same structure },
    { same structure }
  ],
  "founderFramework": {
    "title": "actionable title (e.g. 'Validate your startup idea this weekend')",
    "intro": "1-2 sentences on why this matters",
    "steps": [
      {
        "title": "step name",
        "description": "1-2 sentences explaining what to do",
        "tool": "tool name (Claude, Perplexity, etc)",
        "toolUrl": "https://link-to-tool.com",
        "prompt": "THE EXACT PROMPT to copy-paste into the tool. Be specific. Include placeholders like [YOUR IDEA] or [COMPETITOR NAME]. This is the most important part."
      },
      { same structure with different prompt },
      { same structure with different prompt }
    ],
    "bottomLine": "one sentence on time/money saved"
  },
  "aiInBusiness": {
    "title": "title for 3 workflows",
    "workflows": [
      {
        "title": "workflow name",
        "description": "1-2 sentences on the problem this solves",
        "tool": "tool name",
        "toolUrl": "https://link-to-tool.com",
        "prompt": "THE EXACT PROMPT to copy-paste. Be specific and actionable."
      },
      { same structure },
      { same structure }
    ]
  },
  "quickHits": [
    "Company: one punchy line",
    "Company: one punchy line",
    "Company: one punchy line",
    "Company: one punchy line"
  ],
  "nextWeek": "1-2 sentences teasing next week with real curiosity"
}

Return ONLY the JSON object.`
  );
}

// ============================================================================
// AGENT 4: EDITOR AGENT
// ============================================================================
async function editorAgent(content: NewsletterContent): Promise<AgentResult<NewsletterContent>> {
  return runAgent<NewsletterContent>(
    "Editor Agent",
    `You are the Editor Agent. Your ONLY job is to eliminate all traces of AI-generated writing.

KILL LIST (remove or replace ALL of these):
- Em dashes (—) → use comma, period, or colon
- ${BANNED_WORDS.join(", ")}
- Any phrase starting with "In today's rapidly" or "It's important to note"
- Passive voice where active is better
- Corporate-speak and buzzwords
- Overly long sentences without variety

ENFORCE:
- Contractions everywhere (don't, can't, won't, it's, that's, we're)
- Sentence variety (some 3-5 words, others longer)
- Personality markers: "Look,", "Real talk", "Ok so", "And", "But", "So"
- Direct address to reader with "you" and "your"
- Opinions: "this is huge", "honestly kind of overhyped", "worth paying attention to"

The goal: make it sound like a smart college student texting their friend, not a corporate blog.`,
    
    `Edit this newsletter content to eliminate ALL AI-sounding language:

${JSON.stringify(content, null, 2)}

Go through EVERY field and:
1. Replace em dashes with commas/periods/colons
2. Remove or replace banned words
3. Add contractions where missing
4. Vary sentence length
5. Add personality where it feels flat
6. Make opinions sharper

Return the EDITED JSON object with the same structure. Return ONLY the JSON.`
  );
}

// ============================================================================
// AGENT 5: BABSON CONTEXT AGENT
// ============================================================================
async function babsonContextAgent(content: NewsletterContent): Promise<AgentResult<NewsletterContent>> {
  return runAgent<NewsletterContent>(
    "Babson Context Agent",
    `You are the Babson Context Agent. You make the newsletter specifically relevant to Babson College entrepreneurs.

Babson context you can reference:
- FME (Foundations of Management and Entrepreneurship) - first-year startup experience
- B-Lab and accelerator programs
- Blank Center for Entrepreneurship
- "Entrepreneurial Thought & Action" methodology
- Real scenarios: pitching to investors, customer discovery, MVP building
- Student startup culture and competitions

Your job is to enhance the "classConnection" sections and entrepreneur angles to feel SPECIFICALLY relevant to Babson students, not generic "entrepreneur" advice.`,
    
    `Enhance this newsletter with Babson-specific context:

${JSON.stringify(content, null, 2)}

Focus on:
1. Making "classConnection" reference real Babson scenarios
2. Ensuring "founderFramework" feels like advice for student startups
3. Adding Babson entrepreneur context where natural

Keep the same JSON structure. Return ONLY the JSON.`
  );
}

// ============================================================================
// AGENT 6: QA AGENT
// ============================================================================
async function qaAgent(content: NewsletterContent): Promise<AgentResult<QAScore>> {
  return runAgent<QAScore>(
    "QA Agent",
    `You are the QA Agent. You're the final quality gate before the newsletter sends.

Score the newsletter 1-100 on:
1. Authenticity: Does it sound like a real college student wrote this? (no AI tells)
2. Actionability: Can readers DO something specific this week?
3. Engagement: Would you forward this to a friend?
4. Babson Relevance: Is this tailored to Babson entrepreneurs specifically?

Calculate overall = (authenticity + actionability + engagement + babsonRelevance) / 4

If overall >= 85: approved = true
If overall < 85: approved = false, list specific fixes needed

Be STRICT. The goal is world-class quality.`,
    
    `Review this newsletter for quality:

${JSON.stringify(content, null, 2)}

Check for:
- Any em dashes remaining (instant fail)
- Any banned AI words: ${BANNED_WORDS.slice(0, 10).join(", ")}...
- Lack of contractions
- Generic entrepreneur advice (should be Babson-specific)
- Flat/boring voice without opinions

Return a JSON object:
{
  "authenticity": 1-100,
  "actionability": 1-100,
  "engagement": 1-100,
  "babsonRelevance": 1-100,
  "overall": average of above,
  "approved": true if overall >= 85,
  "fixes": ["specific fix 1", "fix 2"] if not approved
}

Return ONLY the JSON.`
  );
}

// ============================================================================
// MAIN ORCHESTRATOR
// ============================================================================
export interface PipelineResult {
  content: NewsletterContent;
  qaScore: number;
}

export async function runMultiAgentPipeline(maxRetries: number = 2): Promise<PipelineResult> {
  console.log("\n" + "=".repeat(60));
  console.log("THE AI PULSE - MULTI-AGENT PIPELINE");
  console.log("=".repeat(60));

  const state: PipelineState = {
    currentStep: 0,
    totalSteps: 6,
    stepName: "Starting",
  };

  // Step 1: Research
  state.currentStep = 1;
  state.stepName = "Research";
  console.log(`\nStep ${state.currentStep}/${state.totalSteps}: ${state.stepName}`);
  state.researchResults = await researchAgent();
  console.log(`   Found ${state.researchResults.data.length} stories`);

  // Step 2: Curation
  state.currentStep = 2;
  state.stepName = "Curation";
  console.log(`\nStep ${state.currentStep}/${state.totalSteps}: ${state.stepName}`);
  state.curationResults = await curationAgent(state.researchResults.data);
  console.log(`   Selected top ${state.curationResults.data.length} stories`);

  // Step 3: Writing
  state.currentStep = 3;
  state.stepName = "Writing";
  console.log(`\nStep ${state.currentStep}/${state.totalSteps}: ${state.stepName}`);
  const draftResult = await writerAgent(state.curationResults.data);
  let content = draftResult.data;

  // Step 4: Editing
  state.currentStep = 4;
  state.stepName = "Editing";
  console.log(`\nStep ${state.currentStep}/${state.totalSteps}: ${state.stepName}`);
  const editResult = await editorAgent(content);
  content = editResult.data;

  // Step 5: Babson Context
  state.currentStep = 5;
  state.stepName = "Babson Context";
  console.log(`\nStep ${state.currentStep}/${state.totalSteps}: ${state.stepName}`);
  const contextResult = await babsonContextAgent(content);
  content = contextResult.data;

  // Step 6: QA (with retry loop)
  state.currentStep = 6;
  state.stepName = "Quality Assurance";
  
  let attempts = 0;
  while (attempts < maxRetries) {
    console.log(`\nStep ${state.currentStep}/${state.totalSteps}: ${state.stepName} (attempt ${attempts + 1})`);
    const qaResult = await qaAgent(content);
    
    console.log(`\nQA Scores:`);
    console.log(`   Authenticity:     ${qaResult.data.authenticity}/100`);
    console.log(`   Actionability:    ${qaResult.data.actionability}/100`);
    console.log(`   Engagement:       ${qaResult.data.engagement}/100`);
    console.log(`   Babson Relevance: ${qaResult.data.babsonRelevance}/100`);
    console.log(`   -------------------------`);
    console.log(`   OVERALL:          ${qaResult.data.overall}/100`);
    console.log(`   APPROVED:         ${qaResult.data.approved ? "YES" : "NO"}`);

    if (qaResult.data.approved) {
      console.log("\n" + "=".repeat(60));
      console.log("PIPELINE COMPLETE - Newsletter approved");
      console.log("=".repeat(60));
      return { content, qaScore: qaResult.data.overall };
    }

    // If not approved, run through editor again with specific fixes
    if (qaResult.data.fixes && qaResult.data.fixes.length > 0) {
      console.log(`\nFixes needed: ${qaResult.data.fixes.join(", ")}`);
      console.log("   Running editor again...");
      const reEditResult = await editorAgent(content);
      content = reEditResult.data;
    }
    
    attempts++;
  }

  // Return whatever we have after max retries
  console.log("\nMax retries reached. Returning best effort.");
  return { content, qaScore: 0 };
}

// Export individual agents for testing/manual use
export {
  researchAgent,
  curationAgent,
  writerAgent,
  editorAgent,
  babsonContextAgent,
  qaAgent,
};
