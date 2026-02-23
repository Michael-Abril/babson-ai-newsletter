# AI Pulse Multi-Agent Orchestration System

## How to Run with Claude Code

In your terminal with Claude Code, use this command structure:

```bash
claude "Run the AI Pulse multi-agent newsletter pipeline for this week"
```

Claude Code will automatically orchestrate sub-agents when you give it complex tasks.

## The Agent Pipeline

### 1. RESEARCH AGENT
**Prompt to trigger:** "Act as the Research Agent. Search for the 25 most significant AI news stories from the past 7 days. Focus on: product launches, funding rounds, major announcements, tools useful for entrepreneurs. Return a structured list with headlines, summaries, source URLs, and publication dates."

### 2. CURATION AGENT  
**Prompt to trigger:** "Act as the Curation Agent. Review these stories and score each 1-10 on: (a) entrepreneur relevance, (b) actionability for college students, (c) uniqueness/surprise factor. Select the top 5 stories. Explain your reasoning."

### 3. WRITER AGENT
**Prompt to trigger:** "Act as Mikey Abril writing The AI Pulse. You're a college student who genuinely knows AI better than most. You're casual, direct, and have real opinions. Write like you're explaining something cool to a friend over coffee. Draft the full newsletter using these curated stories."

### 4. EDITOR AGENT (Critical for Quality)
**Prompt to trigger:** "Act as the Editor Agent. Your job is to eliminate ALL traces of AI-generated writing. Review this draft and:
- Kill all em dashes, replace with commas or periods
- Remove: meticulous, strategically, leverage, landscape, paradigm, cutting-edge, game-changing, harness, delve, robust, synergy, ecosystem, transformative, unprecedented
- Ensure contractions are used (don't, can't, won't, it's)
- Vary sentence length dramatically (some 3-5 words, others longer)
- Add personality: 'Look,', 'Real talk', 'Ok so'
- Make it sound like texts from a smart friend, not a blog"

### 5. BABSON CONTEXT AGENT
**Prompt to trigger:** "Act as the Babson Context Agent. Review this newsletter and enhance all entrepreneur connections. Reference specific Babson programs, FME concepts, or real scenarios Babson students face. Make every 'class connection' feel directly relevant to someone building a startup at Babson."

### 6. QA AGENT (Final Gate)
**Prompt to trigger:** "Act as the QA Agent. Score this newsletter 1-100 on:
- Authenticity (does it sound like a real college student?)
- Actionability (can readers DO something this week?)
- Engagement (would you forward this to a friend?)
- Babson-relevance (is this tailored to entrepreneurs?)
If score < 85, identify specific fixes needed. If >= 85, approve for send."

## Full Autonomous Pipeline Command

Copy this into Claude Code for a fully autonomous run:

```
Run the complete AI Pulse newsletter pipeline:

1. RESEARCH: Search for the 25 most significant AI news stories from the past 7 days (product launches, funding, tools for entrepreneurs)

2. CURATE: Score each story on entrepreneur relevance and actionability. Pick the top 5.

3. WRITE: Draft the full newsletter as Mikey Abril - casual, opinionated, like texting a smart friend

4. EDIT: Eliminate ALL AI-sounding language. Kill em dashes. Force contractions. Vary sentence length. Add personality.

5. CONTEXTUALIZE: Add Babson-specific references and make every tip directly relevant to student entrepreneurs

6. QA: Score 1-100 on authenticity, actionability, engagement, Babson-relevance. Only approve if >= 85.

7. OUTPUT: Save the final JSON to output/newsletter-YYYY-MM-DD.json

Start now and work through each step autonomously.
```

## Quality Criteria Checklist

Before any newsletter sends, verify:

- [ ] No em dashes anywhere
- [ ] Zero banned words (meticulous, leverage, paradigm, etc.)
- [ ] Every sentence uses contractions where possible
- [ ] Sentence length varies (mix of 3-word punchy + longer)
- [ ] At least 3 specific tool names mentioned
- [ ] All URLs verified working
- [ ] Babson/entrepreneur angle in every section
- [ ] Would Mikey actually say this? (gut check)
