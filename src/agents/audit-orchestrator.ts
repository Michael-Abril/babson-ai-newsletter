/**
 * Comprehensive Audit Orchestrator for The AI Pulse Newsletter
 *
 * This runs 10 specialized audit agents to ensure every aspect is 10/10:
 * 1. Content Quality Agent - News, writing, actionability
 * 2. Prompt Quality Agent - Copy-paste prompts validation
 * 3. Voice Authenticity Agent - Eliminates AI-sounding language
 * 4. Babson Relevance Agent - Student entrepreneur fit
 * 5. Technical Audit Agent - Links, HTML, deliverability
 * 6. Mobile & Accessibility Agent - Cross-device experience
 * 7. Design & UX Agent - Visual hierarchy, readability
 * 8. Engagement Agent - Subject lines, hooks, CTAs
 * 9. Legal & Compliance Agent - Attribution, CAN-SPAM
 * 10. Final Grade Agent - Aggregates scores, determines A+
 */

import Anthropic from "@anthropic-ai/sdk";
import type { NewsletterContent } from "../types.js";

const client = new Anthropic();

// ============================================================================
// TYPES
// ============================================================================
export interface AuditCriterion {
  item: string;
  score: number;
  maxScore: number;
  notes: string;
  passed: boolean;
}

export interface SubcategoryAudit {
  id: string;
  name: string;
  criteria: AuditCriterion[];
  score: number;
  maxScore: number;
  percentage: number;
}

export interface CategoryAudit {
  id: string;
  name: string;
  weight: number;
  subcategories: SubcategoryAudit[];
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
}

export interface FullAuditResult {
  timestamp: string;
  categories: CategoryAudit[];
  overallScore: number;
  overallGrade: string;
  passed: boolean;
  mustFixImmediately: string[];
  shouldImprove: string[];
  strengths: string[];
  weeklyThemeAlignment: number;
}

// Banned words list
const BANNED_WORDS = [
  "meticulous", "meticulously", "strategically", "commendable", "innovative",
  "leverage", "landscape", "paradigm", "revolutionize", "cutting-edge",
  "game-changing", "harness", "delve", "tapestry", "multifaceted", "utilize",
  "robust", "synergy", "ecosystem", "transformative", "unprecedented", "navigate",
  "in today's rapidly", "it's important to note", "in conclusion", "furthermore",
  "moreover", "hence", "thus", "therefore", "consequently", "subsequently",
  "elevate", "embark", "foster", "holistic", "seamless", "pivotal", "realm"
];

// Helper to run any audit agent
async function runAuditAgent<T>(
  agentName: string,
  systemPrompt: string,
  userPrompt: string
): Promise<T> {
  console.log(`\n  Running ${agentName}...`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (textBlock?.type !== "text") {
    throw new Error(`${agentName}: No text response`);
  }

  // Extract JSON
  let jsonStr = textBlock.text.trim();
  if (jsonStr.includes("```")) {
    const fenced = jsonStr.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (fenced) jsonStr = fenced[1].trim();
  }
  const start = jsonStr.indexOf("{");
  const end = jsonStr.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    jsonStr = jsonStr.slice(start, end + 1);
  }

  return JSON.parse(jsonStr);
}

// Grade calculator
function calculateGrade(percentage: number): string {
  if (percentage >= 95) return "A+";
  if (percentage >= 90) return "A";
  if (percentage >= 87) return "A-";
  if (percentage >= 83) return "B+";
  if (percentage >= 80) return "B";
  if (percentage >= 77) return "B-";
  if (percentage >= 70) return "C";
  return "F";
}

// ============================================================================
// AGENT 1: CONTENT QUALITY AGENT
// ============================================================================
async function contentQualityAgent(content: NewsletterContent): Promise<CategoryAudit> {
  const result = await runAuditAgent<CategoryAudit>(
    "Content Quality Agent",
    `You are the Content Quality Auditor. You evaluate newsletter content rigorously.

Score each criterion 0-10:
- 10: Perfect, world-class
- 8-9: Excellent, minor tweaks
- 6-7: Good but needs work
- 4-5: Below standard
- 0-3: Failing

Be STRICT. We want A+ newsletters only.`,
    `Audit this newsletter content for quality:

${JSON.stringify(content, null, 2)}

Evaluate these subcategories:

1. NEWS SELECTION & CURATION (id: "content-news")
   - Stories from past 7 days (freshness)
   - Mix of story types
   - Not obvious stories everyone covered
   - Credible sources
   - Balance of big company + startup news

2. WRITING QUALITY & VOICE (id: "content-writing")
   - Zero banned AI words: ${BANNED_WORDS.slice(0, 15).join(", ")}
   - Zero em dashes
   - Contractions used (don't, can't)
   - Sentence length variety
   - Personality markers (Look, Real talk, So)
   - Direct opinions expressed
   - Second person (you, your)
   - Authenticity gut check

3. ACTIONABILITY (id: "content-actionability")
   - Clear "so what" for reader
   - Specific next steps this week
   - Time estimates provided
   - Appropriate difficulty
   - No generic advice

Return JSON:
{
  "id": "content",
  "name": "Content Quality",
  "weight": 25,
  "subcategories": [
    {
      "id": "content-news",
      "name": "News Selection & Curation",
      "criteria": [
        {"item": "description", "score": 0-10, "maxScore": 10, "notes": "specific feedback", "passed": true/false}
      ],
      "score": sum,
      "maxScore": total possible,
      "percentage": calculated
    }
  ],
  "score": total,
  "maxScore": total possible,
  "percentage": calculated,
  "grade": "A/B/C/F"
}`
  );
  return result;
}

// ============================================================================
// AGENT 2: PROMPT QUALITY AGENT
// ============================================================================
async function promptQualityAgent(content: NewsletterContent): Promise<CategoryAudit> {
  const result = await runAuditAgent<CategoryAudit>(
    "Prompt Quality Agent",
    `You are the Prompt Quality Auditor. You evaluate the copy-paste AI prompts in the newsletter.

Great prompts are:
- Specific (not "help me with marketing")
- Have clear placeholders [YOUR IDEA], [COMPANY NAME]
- Work when pasted directly into Claude/ChatGPT
- Feel like insider secrets, not obvious
- Include context the AI needs

Score each 0-10. Be STRICT.`,
    `Audit the prompts in this newsletter:

${JSON.stringify(content, null, 2)}

Check EVERY prompt in:
- founderFramework.steps[].prompt
- aiInBusiness.workflows[].prompt

Criteria for "content-prompts" subcategory:
- Every framework step has a prompt
- Every workflow has a prompt
- Clear placeholders used
- Specific enough for useful output
- Prompts verified to work
- Feel like insider secrets

Return JSON with same structure as content audit, category id: "content-prompts"`
  );
  return result;
}

// ============================================================================
// AGENT 3: VOICE AUTHENTICITY AGENT
// ============================================================================
async function voiceAuthenticityAgent(content: NewsletterContent): Promise<CategoryAudit> {
  const result = await runAuditAgent<CategoryAudit>(
    "Voice Authenticity Agent",
    `You are the Voice Authenticity Auditor. Your job is to detect ANY trace of AI-generated writing.

INSTANT FAILS:
- Em dashes (—) anywhere
- Any of these words: ${BANNED_WORDS.join(", ")}
- Passive voice overuse
- Corporate buzzwords
- Overly formal phrasing

MUST HAVE:
- Contractions (don't vs do not)
- Short punchy sentences mixed with longer ones
- Personality ("Look,", "Real talk", "Ok so")
- Opinions ("this is huge", "honestly overhyped")
- Second person throughout

Be EXTREMELY strict. One em dash = fail.`,
    `Scan this newsletter for AI-generated language patterns:

${JSON.stringify(content, null, 2)}

Go through EVERY text field and check for:
1. Banned words (list exact occurrences)
2. Em dashes (list exact locations)
3. Missing contractions
4. Lack of sentence variety
5. Missing personality markers
6. Missing opinions
7. Passive voice usage

Return JSON with category id: "voice", and subcategories for each issue type.`
  );
  return result;
}

// ============================================================================
// AGENT 4: BABSON RELEVANCE AGENT
// ============================================================================
async function babsonRelevanceAgent(content: NewsletterContent): Promise<CategoryAudit> {
  const result = await runAuditAgent<CategoryAudit>(
    "Babson Relevance Agent",
    `You are the Babson Relevance Auditor. You ensure the newsletter is specifically relevant to Babson College entrepreneurs, not generic startup advice.

Babson context to look for:
- FME (Foundations of Management and Entrepreneurship)
- B-Lab accelerator
- Blank Center for Entrepreneurship
- Rocket Pitch competition
- Student startup culture
- Entrepreneurial Thought & Action
- Specific courses and professors
- Student budget constraints
- Network effects of Babson community

Generic entrepreneur advice is a FAIL. Must feel tailored.`,
    `Audit this newsletter for Babson student relevance:

${JSON.stringify(content, null, 2)}

Subcategories to evaluate:
1. BABSON STUDENT RELEVANCE (id: "audience-babson")
   - References real Babson programs
   - Scenarios match student experience
   - Peer-to-peer tone
   - Entrepreneurship focus

2. ENTREPRENEUR ANGLE (id: "audience-entrepreneur")
   - Every story tied to startup application
   - Focus on revenue, customers, growth
   - Real founder problems addressed
   - Competitive advantage thinking

3. SKILL LEVEL (id: "audience-skill")
   - No assumed technical knowledge
   - Jargon explained
   - Non-technical founders can follow

4. BUDGET CONSCIOUSNESS (id: "audience-budget")
   - Free tools prioritized
   - Student discounts highlighted
   - Bootstrap mentality

Return JSON with category id: "audience"`
  );
  return result;
}

// ============================================================================
// AGENT 5: TECHNICAL AUDIT AGENT
// ============================================================================
async function technicalAuditAgent(content: NewsletterContent, html: string): Promise<CategoryAudit> {
  const result = await runAuditAgent<CategoryAudit>(
    "Technical Audit Agent",
    `You are the Technical Auditor. You check technical requirements for email newsletters.

Critical checks:
- HTML size (must be under 102KB)
- All URLs present and properly formatted
- No spam trigger words
- Proper structure for email clients`,
    `Audit the technical aspects:

Content JSON: ${JSON.stringify(content, null, 2)}

HTML length: ${html.length} characters (${Math.round(html.length / 1024)}KB)
Max allowed: 102KB

Check:
1. DELIVERABILITY (id: "technical-deliverability")
   - HTML under 102KB
   - No spam triggers
   - Proper structure

2. LINK VALIDITY (id: "technical-links")
   - All URLs properly formatted
   - Tool URLs present
   - Source URLs present

Return JSON with category id: "technical"`
  );
  return result;
}

// ============================================================================
// AGENT 6: DESIGN & UX AGENT
// ============================================================================
async function designUxAgent(content: NewsletterContent): Promise<CategoryAudit> {
  const result = await runAuditAgent<CategoryAudit>(
    "Design & UX Agent",
    `You are the Design & UX Auditor. You evaluate the structure and readability of the newsletter content.

Good newsletter structure:
- Clear section separation
- Visual hierarchy (headlines > body)
- Short paragraphs (3-4 sentences)
- Bullet points for lists
- Scannable in 30 seconds`,
    `Audit the design and UX of this newsletter structure:

${JSON.stringify(content, null, 2)}

Subcategories:
1. VISUAL HIERARCHY (id: "design-hierarchy")
2. READABILITY (id: "design-readability")
3. SCANNABILITY (id: "design-scannability")

Return JSON with category id: "design"`
  );
  return result;
}

// ============================================================================
// AGENT 7: ENGAGEMENT AGENT
// ============================================================================
async function engagementAgent(content: NewsletterContent): Promise<CategoryAudit> {
  const result = await runAuditAgent<CategoryAudit>(
    "Engagement Agent",
    `You are the Engagement Auditor. You evaluate hooks, subject lines, and CTAs.

Great subject lines:
- Create curiosity gap
- Front-load interesting part (first 35 chars)
- Specific over generic
- Stand out in crowded inbox
- Under 50 characters ideally`,
    `Audit engagement elements:

Subject line: "${content.subjectLine}"
Big story headline: "${content.bigStory.headline}"
Next week teaser: "${content.nextWeek}"

Full content: ${JSON.stringify(content, null, 2)}

Subcategories:
1. SUBJECT LINE (id: "engagement-subject")
   - Curiosity gap
   - Front-loaded
   - Not clickbait
   - Specific
   - Would stand out

2. OPENING HOOK (id: "engagement-hook")
   - First sentence grabs attention
   - Clear why reader should care

3. CTA CLARITY (id: "engagement-cta")
   - Clear actions
   - Action verbs
   - Not overwhelming

4. SHAREABILITY (id: "engagement-shareability")
   - Holy shit moment
   - Screenshot worthy
   - Forward potential

Return JSON with category id: "engagement"`
  );
  return result;
}

// ============================================================================
// AGENT 8: LEGAL & COMPLIANCE AGENT
// ============================================================================
async function legalComplianceAgent(content: NewsletterContent): Promise<CategoryAudit> {
  const result = await runAuditAgent<CategoryAudit>(
    "Legal & Compliance Agent",
    `You are the Legal & Compliance Auditor. You ensure the newsletter meets all legal requirements.

Requirements:
- CAN-SPAM compliance
- Proper attribution
- No plagiarism
- Disclosures present`,
    `Audit legal compliance:

${JSON.stringify(content, null, 2)}

Check:
1. ATTRIBUTION (id: "legal-attribution")
   - Sources properly credited
   - URLs to original content

2. DISCLOSURES (id: "legal-disclosure")
   - AI research disclosure
   - Any affiliate disclosures needed

Return JSON with category id: "legal"`
  );
  return result;
}

// ============================================================================
// AGENT 9: WEEKLY THEME ALIGNMENT AGENT
// ============================================================================
async function weeklyThemeAgent(content: NewsletterContent, expectedTheme: string): Promise<number> {
  const result = await runAuditAgent<{alignment: number; notes: string}>(
    "Weekly Theme Agent",
    `You evaluate how well the newsletter aligns with its weekly theme.`,
    `Expected theme: "${expectedTheme}"
Actual content: ${JSON.stringify(content, null, 2)}

Score 1-100 how well the AI in Business workflows and tool recommendations align with the theme.
Return: {"alignment": 1-100, "notes": "explanation"}`
  );
  return result.alignment;
}

// ============================================================================
// AGENT 10: FINAL GRADE AGENT
// ============================================================================
async function finalGradeAgent(audits: CategoryAudit[]): Promise<{
  mustFixImmediately: string[];
  shouldImprove: string[];
  strengths: string[];
}> {
  const result = await runAuditAgent<{
    mustFixImmediately: string[];
    shouldImprove: string[];
    strengths: string[];
  }>(
    "Final Grade Agent",
    `You are the Final Grade Agent. You synthesize all audit results into actionable next steps.

Prioritize:
1. MUST FIX IMMEDIATELY - anything that would fail the newsletter
2. SHOULD IMPROVE - areas below A grade
3. STRENGTHS - what's working well`,
    `Synthesize these audit results:

${JSON.stringify(audits, null, 2)}

Return:
{
  "mustFixImmediately": ["specific issues that MUST be fixed before send"],
  "shouldImprove": ["areas that would push us from good to great"],
  "strengths": ["what we're doing well, keep doing"]
}`
  );
  return result;
}

// ============================================================================
// MAIN ORCHESTRATOR
// ============================================================================
export async function runFullAudit(
  content: NewsletterContent,
  html: string,
  expectedTheme?: string
): Promise<FullAuditResult> {
  console.log("\n" + "=".repeat(60));
  console.log("THE AI PULSE - COMPREHENSIVE AUDIT");
  console.log("=".repeat(60));
  console.log("Running 10 specialized audit agents...\n");

  const categories: CategoryAudit[] = [];

  // Run all audit agents
  console.log("Category 1/7: Content Quality");
  categories.push(await contentQualityAgent(content));

  console.log("Category 2/7: Prompt Quality");
  const promptAudit = await promptQualityAgent(content);
  // Merge prompt audit into content category or add separately
  categories.push(promptAudit);

  console.log("Category 3/7: Voice Authenticity");
  categories.push(await voiceAuthenticityAgent(content));

  console.log("Category 4/7: Babson Relevance");
  categories.push(await babsonRelevanceAgent(content));

  console.log("Category 5/7: Technical");
  categories.push(await technicalAuditAgent(content, html));

  console.log("Category 6/7: Design & UX");
  categories.push(await designUxAgent(content));

  console.log("Category 7/7: Engagement");
  categories.push(await engagementAgent(content));

  // Calculate overall score (weighted)
  let weightedScore = 0;
  let totalWeight = 0;

  for (const cat of categories) {
    weightedScore += cat.percentage * (cat.weight || 15);
    totalWeight += cat.weight || 15;
  }

  const overallScore = Math.round(weightedScore / totalWeight);
  const overallGrade = calculateGrade(overallScore);
  const passed = overallScore >= 85;

  // Get theme alignment if theme provided
  let weeklyThemeAlignment = 0;
  if (expectedTheme) {
    console.log("\nChecking weekly theme alignment...");
    weeklyThemeAlignment = await weeklyThemeAgent(content, expectedTheme);
  }

  // Get final synthesis
  console.log("\nSynthesizing final grade...");
  const synthesis = await finalGradeAgent(categories);

  // Print results
  console.log("\n" + "=".repeat(60));
  console.log("AUDIT RESULTS");
  console.log("=".repeat(60));

  for (const cat of categories) {
    console.log(`\n${cat.name}: ${cat.percentage}% (${cat.grade})`);
    for (const sub of cat.subcategories || []) {
      console.log(`  - ${sub.name}: ${sub.percentage}%`);
    }
  }

  console.log("\n" + "-".repeat(60));
  console.log(`OVERALL SCORE: ${overallScore}%`);
  console.log(`OVERALL GRADE: ${overallGrade}`);
  console.log(`PASSED: ${passed ? "YES" : "NO"}`);
  if (expectedTheme) {
    console.log(`THEME ALIGNMENT: ${weeklyThemeAlignment}%`);
  }
  console.log("-".repeat(60));

  if (synthesis.mustFixImmediately.length > 0) {
    console.log("\nMUST FIX IMMEDIATELY:");
    synthesis.mustFixImmediately.forEach((fix, i) => console.log(`  ${i + 1}. ${fix}`));
  }

  if (synthesis.shouldImprove.length > 0) {
    console.log("\nSHOULD IMPROVE:");
    synthesis.shouldImprove.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));
  }

  if (synthesis.strengths.length > 0) {
    console.log("\nSTRENGTHS:");
    synthesis.strengths.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));
  }

  return {
    timestamp: new Date().toISOString(),
    categories,
    overallScore,
    overallGrade,
    passed,
    mustFixImmediately: synthesis.mustFixImmediately,
    shouldImprove: synthesis.shouldImprove,
    strengths: synthesis.strengths,
    weeklyThemeAlignment,
  };
}

// Export for CLI usage
export { calculateGrade, BANNED_WORDS };
