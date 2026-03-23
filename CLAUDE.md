# The AI Pulse - Newsletter Automation

## Quick Start (Weekly Workflow)

Every Friday, run this to generate and send the newsletter:

```bash
# 1. Generate newsletter (preview mode)
npm run multi-agent:preview

# 2. Review the output
# Open output/newsletter-YYYY-MM-DD.html in browser

# 3. Send test email to yourself
npm run multi-agent:test

# 4. After approval, broadcast to everyone
npm run multi-agent:send
```

## Project Overview

**The AI Pulse** is an automated weekly AI newsletter for Babson College entrepreneurs, created by Mikey Abril.

### Key Features
- 6-agent AI pipeline for content generation
- 12-week rotating themes for "AI in Your Business" section
- Auto-rotation of featured tools (no repeats)
- Resend email delivery with audience management
- GitHub Actions for scheduled automation (Fridays 10AM EST)

## Directory Structure

```
babson-ai-newsletter/
├── src/
│   ├── agents/
│   │   ├── orchestrator.ts    # 6-agent pipeline (Research → QA)
│   │   └── types.ts           # TypeScript interfaces
│   ├── multi-agent.ts         # Main entry point
│   ├── build-email.ts         # HTML generation from content
│   ├── send-email.ts          # Resend API integration
│   ├── template.ts            # Email HTML template (basic)
│   ├── template-pro.ts        # Professional email template
│   └── types.ts               # Newsletter content types
├── config/
│   ├── tools.json             # 50+ free AI tools database
│   ├── weekly-themes.json     # 12-week theme rotation
│   └── settings.json          # Brand colors, schedule
├── editions/
│   ├── index.json             # Edition history & tracking
│   ├── issue-1.json/html      # Archived editions
│   ├── issue-2.json/html
│   ├── issue-3.json/html
│   └── issue-4.json/html
├── output/                    # Generated files (gitignored)
└── .github/workflows/
    └── newsletter.yml         # GitHub Actions automation
```

## The 6-Agent Pipeline

1. **Research Agent** - Searches web for latest AI news (past 7 days)
2. **Curation Agent** - Scores & selects top 5 stories for entrepreneurs
3. **Writer Agent** - Drafts newsletter in Mikey's voice
4. **Editor Agent** - Removes AI-sounding language
5. **Babson Context Agent** - Adds Babson-specific relevance
6. **QA Agent** - Final quality gate (must score 80+/100)

## Theme Rotation

Themes rotate every issue (12-week cycle):

| Week | Theme |
|------|-------|
| 1 | AI Fundamentals |
| 2 | Market Research & Validation |
| 3 | Building Your MVP |
| 4 | Branding & Visual Identity |
| 5 | Pitching & Fundraising |
| 6 | Sales & Outreach |
| 7 | Content Creation |
| 8 | Social Media & Marketing |
| 9 | Productivity & Operations |
| 10 | Customer Service & Support |
| 11 | Data & Analytics |
| 12 | Automation & Scale |

Issue #5 = Week 5 (Pitching & Fundraising), Issue #13 = Week 1 (cycles back)

## Environment Variables

Required in `.env` (local) or GitHub Secrets (production):

```env
ANTHROPIC_API_KEY=sk-ant-...     # Claude API
RESEND_API_KEY=re_...            # Resend email API
FROM_EMAIL=The AI Pulse <email>  # Verified sender
TEST_EMAIL=you@babson.edu        # For test sends
RESEND_AUDIENCE_ID=...           # Subscriber list ID
MODE=preview                     # preview|test|send
```

## NPM Scripts

```bash
# Main pipeline
npm run multi-agent:preview   # Generate without sending
npm run multi-agent:test      # Generate + send to TEST_EMAIL
npm run multi-agent:send      # Generate + broadcast to audience

# Utilities
npm run validate:links        # Check all URLs in content
npm run audit                 # Run content audit
npm run build                 # TypeScript check
npm run preflight             # Links + build check

# Manual issue sends (archived editions)
npm run issue4:test           # Send Issue #4 to test email
npm run issue4:send           # Broadcast Issue #4
```

## Troubleshooting

### Rate Limiting (429 errors)
The pipeline includes 3-second delays between agents. If you still hit limits:
- Wait 5-10 minutes and retry
- The pipeline auto-retries up to 5 times per agent

### QA Score < 80
If QA fails, the pipeline auto-runs the Editor Agent again (up to 2 retries).
If still failing, content is returned as "best effort" - review manually.

### Missing Content
Check that:
1. `ANTHROPIC_API_KEY` is valid
2. Web search is working (Research Agent)
3. `config/tools.json` exists and is valid JSON

### Email Not Sending
1. Verify `RESEND_API_KEY` is valid
2. Check `FROM_EMAIL` domain is verified in Resend
3. Ensure `RESEND_AUDIENCE_ID` matches your audience

## Issue #5 - Akash Theme (Special Edition)

Next issue features **Akash Network** (Mikey is a Student Ambassador):

**Manual items needed:**
- [ ] Akash $100 free credits signup link
- [ ] Demo video of deploying on Akash
- [ ] Cost comparison vs AWS/GCP
- [ ] Personal testimonial

**Content focus:**
- DePin infrastructure for AI
- Cheaper than traditional cloud (80% savings)
- Maximum data security & privacy
- Vibe coding apps on decentralized compute

## Adding New Tools

Edit `config/tools.json`:

```json
{
  "name": "Tool Name",
  "value": "$X free credits",
  "duration": "Always free",
  "description": "What it does...",
  "claimSteps": "How to claim...",
  "url": "https://...",
  "category": "coding|design|etc",
  "weeklyTheme": "Building Your MVP"
}
```

## Content Types (TypeScript)

```typescript
interface NewsletterContent {
  subjectLine: string;           // Email subject (curiosity-gap)
  weekTopic: string;             // 3-6 word theme
  bigStory: {                    // Main headline
    headline: string;
    summary: string;
    sourceUrl: string;
  };
  classConnection: string;       // Babson relevance
  threeThings: NewsItem[];       // 3 quick news items
  founderFramework: {            // Step-by-step framework
    title: string;
    intro: string;
    steps: FrameworkStep[];      // With copy-paste prompts
    bottomLine: string;
  };
  aiInBusiness: {                // 3 workflows
    title: string;
    workflows: BusinessWorkflow[];
  };
  quickHits: string[];           // 4 one-liner updates
  nextWeek: string;              // Teaser for next issue
}
```

## GitHub Actions

Automated weekly send: **Fridays 10:00 AM EST** (3:00 PM UTC)

To trigger manually:
1. Go to Actions tab in GitHub
2. Select "The AI Pulse | Weekly Newsletter"
3. Click "Run workflow"
4. Choose mode: `preview`, `test`, or `send`

## Architecture Decisions

1. **Why 6 agents?** Each has a focused role - better quality than one mega-prompt
2. **Why theme rotation?** Variable content keeps readers engaged (research-backed)
3. **Why Resend?** Best deliverability for newsletters, simple API
4. **Why not OpenAI?** Claude better at following voice/style instructions
5. **Why delays between agents?** Avoid rate limits without complex queuing

## Contact

Built by Mikey Abril (mabril1@babson.edu)
Student Ambassador: Akash Network
