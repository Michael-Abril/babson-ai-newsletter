# The AI Pulse — Babson College Automated AI Newsletter

## Complete Project Specification for Claude Code

---

## PROJECT OVERVIEW

Build a fully automated, open-source weekly AI newsletter for Babson College students. The newsletter is called **"The AI Pulse"** and is sent every Sunday afternoon to Babson students via email. It uses the Claude API with web search to find current AI news from that specific week, generates newsletter content focused on entrepreneurial AI use cases, and delivers it via Resend.

**Key Principle**: This must look and feel like an official Babson communication — professional, on-brand, and polished. It should NOT look AI-generated, skeletal, or like a generic tech newsletter. Students and faculty have specifically requested a design that feels personalized and institutional.

---

## BABSON COLLEGE OFFICIAL BRAND COLORS

Source: https://www.babson.edu/college-marketing/babson-college-brand-guidelines/color-palette/

### Primary Color (MUST dominate all communications)
- **Babson Green**: `#006644` (PMS 3425) — This is THE Babson color. Must appear prominently.

### Secondary Palette
- **Courtyard Green**: `#597C31` (PMS 576)
- **Sherwood Green**: `#9EB28F` (PMS 7494) — great for light backgrounds/accents
- **Alfresco Blue**: `#567B8A` (PMS 5415) — steel blue, good for secondary elements
- **Bright Gold**: `#DDD055` (PMS 611) — accent/highlight color
- **Mango Punch**: `#EEAF00` (PMS 7409) — warm accent, good for CTAs
- **Ocre**: `#AD9001` (PMS 457) — darker gold, good for text accents

### Neutral Colors (for body text, backgrounds, dividers)
- **White**: `#FFFFFF`
- **Off-White/Light Gray**: `#F5F5F0` (warm white for backgrounds)
- **Dark Charcoal**: `#2D2D2D` (body text)
- **Medium Gray**: `#6B7280` (secondary text)
- **Light Border**: `#E5E5E0` (dividers, borders)

### Usage Rules
- Babson Green (`#006644`) should be the dominant color — header, footer, key CTAs, section labels
- Use white/off-white backgrounds for readability
- Gold (`#EEAF00`) works well for highlight accents, badges, "new" indicators
- Alfresco Blue (`#567B8A`) for secondary information, links
- Keep the overall feel: clean, professional, institutional — NOT startup-y or crypto-bro
- WCAG 2.0 AA compliance required (4.5:1 contrast ratio for text)

---

## EMAIL CONFIGURATION

### Sender / Recipient Setup
- **FROM**: Sent from a Babson .edu email address (the student running this newsletter)
- **TO**: Other Babson students, all with @babson.edu email addresses
- **Email Service**: Resend (resend.com) — free tier supports 100 emails/day
- **Domain**: For the pilot, use Resend's testing domain (`onboarding@resend.dev`). When scaling, verify a custom domain or work with Babson IT for a proper sending address.
- **Send Time**: Every Sunday at 2:00 PM EST (18:00 UTC) via GitHub Actions cron
- **Subject Line Format**: "The AI Pulse — [compelling hook about this week's content]" (keep under 50 chars)

### Deliverability
- Include `List-Unsubscribe` header
- Include plain-text alternative alongside HTML
- Keep HTML under 102KB to prevent Gmail clipping
- No link shorteners
- 60:40 text-to-image ratio

---

## NEWSLETTER CONTENT STRUCTURE

The newsletter has an equal split between 4 content pillars: **News, Tools, Tutorials, and Founder Frameworks**. Target read time: **5-7 minutes**.

### Section 1: Header
- Babson Green background (`#006644`)
- "The AI Pulse" in white, bold
- Subtitle: "AI for Entrepreneurs — Babson College"
- Issue number and date (e.g., "Issue #7 · February 23, 2026")
- Clean, minimal — looks like official Babson email header

### Section 2: The Big Story (News Pillar)
- Label: "📡 THIS WEEK'S BIGGEST AI STORY"
- One major AI story from the past 7 days
- 2-3 sentence summary
- **"Why Babson Founders Should Care"** — 2-3 sentences connecting to entrepreneurship
- Source link
- Light background card with subtle left border in Babson Green

### Section 3: 3 Things to Know This Week (News Pillar)
- Label: "📰 3 THINGS TO KNOW"
- Three AI news items, each with:
  - Headline (linked to source)
  - 1-2 sentence summary
  - Bold one-liner: "Entrepreneur's takeaway → [actionable insight]"
- Compact layout, separated by light dividers

### Section 4: Free AI Tool of the Week (Tools Pillar)
- Label: "🎓 FREE FOR BABSON STUDENTS"
- Babson Green bordered card with prominent CTA
- Featured tool with:
  - Tool name + value (e.g., "Cursor Pro — $240/year, FREE for students")
  - What it does (2-3 sentences, plain language)
  - Why entrepreneurs specifically should use it
  - Step-by-step claim instructions (specific to .edu email)
  - Big CTA button in Babson Green: "Claim Free Access →"
- Below: 3-4 other free tools listed compactly with "Claim →" links
- **Rotate featured tool each week from this master list:**

#### Free Student AI Tools Database
```json
[
  {
    "name": "Cursor Pro",
    "value": "$240/year",
    "duration": "1 year free",
    "description": "AI-powered code editor. Describe what you want in plain English and it writes the code. Reads your entire project, debugs errors, generates features. This is what vibe coding runs on — students at Stanford, MIT, and Harvard use it to build startups without traditional dev teams.",
    "claimSteps": "Download from cursor.com → Sign up with your @babson.edu email → Settings → Subscription → Student Plan → Verify → Instant activation.",
    "url": "https://cursor.com/students",
    "category": "coding"
  },
  {
    "name": "Google Gemini AI Pro",
    "value": "$240/year",
    "duration": "1 year free",
    "description": "Google's most advanced AI plus 2TB Google Drive storage. Advanced reasoning, code generation, real-time web browsing, and deep integration with the Google ecosystem. Sign up by April 30, 2026.",
    "claimSteps": "Go to gemini.google/students → Verify student status through SheerID with your personal Gmail → Subscribe through Google Play Store → Instant access.",
    "url": "https://gemini.google/students/",
    "category": "general AI"
  },
  {
    "name": "Perplexity Pro",
    "value": "$200/year",
    "duration": "1 year free",
    "description": "AI-powered research engine that replaces hours of Googling. Direct answers with real citations from trusted sources. Multi-model access including GPT and Claude. No credit card required.",
    "claimSteps": "Go to perplexity.ai → Click Upgrade → Select 'Educate' plan → Sign in with your .edu email → Verify → No credit card required.",
    "url": "https://perplexity.ai",
    "category": "research"
  },
  {
    "name": "GitHub Copilot",
    "value": "$100/year",
    "duration": "Free while enrolled",
    "description": "AI pair programmer that suggests code as you type. Works inside VS Code, JetBrains, and other editors. Also unlocks dozens of other free developer tools through the Student Developer Pack.",
    "claimSteps": "Go to education.github.com/pack → Click 'Get your Pack' → Sign in with GitHub → Select Student → Upload proof of enrollment → Instant access.",
    "url": "https://education.github.com/pack",
    "category": "coding"
  },
  {
    "name": "ChatGPT Plus",
    "value": "$200/year",
    "duration": "Free months + 20% ongoing discount",
    "description": "OpenAI's premium tier with full GPT access, faster responses, image generation, advanced data analysis, and file uploads. The 20% student discount continues after the free trial.",
    "claimSteps": "Go to chatgpt.com/students → Sign up with your .edu email → Verify through SheerID → Free months activate automatically.",
    "url": "https://chatgpt.com/students",
    "category": "general AI"
  },
  {
    "name": "NotebookLM",
    "value": "Free for everyone",
    "duration": "Always free",
    "description": "Upload your lecture notes, PDFs, and YouTube transcripts. AI becomes an expert on YOUR materials. Creates study guides, podcast-style audio summaries, and practice quizzes from your actual class content.",
    "claimSteps": "Go to notebooklm.google.com → Sign in with any Google account → Upload your materials → Start asking questions.",
    "url": "https://notebooklm.google.com",
    "category": "studying"
  },
  {
    "name": "Microsoft 365 Education + Copilot",
    "value": "$100/year",
    "duration": "Free while enrolled",
    "description": "Full Microsoft Office suite plus Copilot AI features in Word, Excel, PowerPoint, and Outlook. AI-powered writing assistance, data analysis, and presentation generation.",
    "claimSteps": "Check if Babson provides this through your school account. If not, go to microsoft.com/education → Verify with your .edu email.",
    "url": "https://www.microsoft.com/en-us/education",
    "category": "productivity"
  },
  {
    "name": "Canva for Education",
    "value": "$130/year",
    "duration": "Free while enrolled",
    "description": "Full Canva Pro with Magic Studio AI. Turn bullet points into full presentation decks in seconds. AI image generation, background removal, and brand kit management.",
    "claimSteps": "Go to canva.com/education → Verify your student status → Full Pro access activated.",
    "url": "https://www.canva.com/education/",
    "category": "design"
  }
]
```

### Section 5: AI Tutorial / Quick Win (Tutorials Pillar)
- Label: "⚡ QUICK WIN — TRY THIS IN 5 MINUTES"
- Dark section (Babson Green `#006644` background, white text) to visually break up the email
- One specific, actionable AI workflow or prompt technique
- 3-5 numbered steps, copy-paste ready
- Framed for entrepreneurs: "Use this for your startup/venture/class project"
- Example topics: customer discovery with AI, competitive analysis prompts, financial modeling, pitch deck generation, market sizing, cold outreach personalization

### Section 6: Founder's Framework (Founder Frameworks Pillar)
- Label: "🚀 FOUNDER'S EDGE"
- Warm background card (use light gold tint `#FFF8E7` or similar)
- One substantial, actionable framework entrepreneurs can use
- Title + 1-2 sentence intro
- 3 concrete steps with explanations
- Bottom line with cost/time savings quantified
- Topics rotate: validation frameworks, GTM strategy, customer acquisition, pricing, competitive moats, fundraising prep, team building, product-market fit

### Section 7: Quick Hits
- Label: "⚡ QUICK HITS"
- 4-5 rapid one-line AI news items
- Each starts with company/product name
- Arrow bullet format: "→ [news item]"

### Section 8: Footer
- Babson Green background matching header
- "The AI Pulse"
- "AI for Entrepreneurs — Babson College"
- "Built by Babson students for Babson students."
- "Researched with AI. Curated by humans."
- Unsubscribe link (required for email compliance)

---

## DESIGN SPECIFICATIONS

### Overall Email Design
- **Max width**: 600px (email standard)
- **Layout**: Single column, mobile-first
- **Background**: White (`#FFFFFF`) body, warm off-white (`#F5F5F0`) outer wrapper
- **Body text**: 15-16px, `#2D2D2D`, line-height 1.65
- **Headlines**: 20-24px, `#006644` or `#2D2D2D`, font-weight 700
- **Font stack**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Section spacing**: 24-32px between major sections
- **Border radius**: 6-8px on cards
- **Dividers**: 1px `#E5E5E0` between sections

### Visual Identity — What Makes It Feel "Babson"
1. **Babson Green header and footer** — creates institutional bookends
2. **Clean white content area** — professional, not cluttered
3. **Gold accents** (`#EEAF00`) for highlights, badges, and special callouts
4. **Subtle green left-borders** on key cards/callouts (3px solid `#006644`)
5. **No gradients, no neon, no dark theme** in the body — keep it clean and institutional
6. **Section labels**: Small caps, letter-spacing 1.5px, Babson Green or gold
7. **CTA buttons**: Babson Green background, white text, 6px border-radius

### What to AVOID
- Dark/navy theme (we already tried this, feedback was "too AI-generated")
- Startup-y gradients or tech-bro aesthetics
- Too many colors competing
- Skeleton/wireframe look
- Over-formatted bullet point dumps
- Generic AI newsletter templates
- Emojis in body text (only in section labels)

---

## TECHNICAL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions (Cron: Sunday 2 PM EST)          │
│                                                              │
│  1. TRIGGER ──────────────────────────────────────────────── │
│     │  Cron schedule OR manual workflow_dispatch              │
│     ▼                                                        │
│  2. GENERATE CONTENT ────────────────────────────────────── │
│     │  Claude API (claude-sonnet-4-20250514)                 │
│     │  + web_search_20250305 tool enabled                    │
│     │  Searches for AI news from past 7 days                 │
│     │  Returns structured JSON matching section schema       │
│     ▼                                                        │
│  3. ASSEMBLE NEWSLETTER ─────────────────────────────────── │
│     │  JSON content + free tools rotation + HTML template    │
│     │  Renders final email HTML (inline CSS, <102KB)         │
│     ▼                                                        │
│  4. DELIVER ─────────────────────────────────────────────── │
│     │  Resend API sends to student email list                │
│     │  Saves HTML preview as GitHub Actions artifact         │
│     ▼                                                        │
│  5. ARCHIVE ─────────────────────────────────────────────── │
│     │  Commits generated HTML to archive/ directory          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack
- **Language**: TypeScript (Node.js 20+)
- **AI**: Anthropic Claude API (`@anthropic-ai/sdk`) with `web_search_20250305` tool
- **Email Delivery**: Resend (`resend` npm package)
- **Automation**: GitHub Actions (cron schedule)
- **Email Template**: Inline CSS HTML (compatible with all email clients including Outlook)
- **Runtime**: `tsx` for running TypeScript directly

### Project Structure
```
the-ai-pulse/
├── .github/
│   └── workflows/
│       └── newsletter.yml          # Cron: Sunday 2PM EST + manual trigger
├── src/
│   ├── index.ts                    # Entry point — preview / test / send modes
│   ├── generate-newsletter.ts      # Claude API + web search content generation
│   ├── build-email.ts              # Assembles JSON + tools into final HTML
│   ├── send-email.ts               # Resend API delivery
│   └── template.ts                 # HTML email template builder (Babson branded)
├── config/
│   ├── tools.json                  # Free student AI tools database
│   └── settings.json               # Newsletter config (name, sender, schedule)
├── archive/                        # Auto-committed past issues
├── .env.example                    # Environment variable template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Environment Variables (GitHub Secrets)
```
ANTHROPIC_API_KEY=sk-ant-xxxxx        # Claude API key (console.anthropic.com)
RESEND_API_KEY=re_xxxxx               # Resend API key (resend.com)
FROM_EMAIL=The AI Pulse <your-name@babson.edu>   # Sender (or onboarding@resend.dev for testing)
TEST_EMAIL=your-name@babson.edu       # For test sends
STUDENT_EMAILS=["s1@babson.edu","s2@babson.edu"]  # JSON array of recipients
```

### Three Run Modes
1. **`preview`** — Generates HTML, saves to `output/` folder. No email sent. For review.
2. **`test`** — Generates + sends to `TEST_EMAIL` only. For verifying email rendering.
3. **`send`** — Generates + sends to all `STUDENT_EMAILS`. Production mode.

### GitHub Actions Workflow
```yaml
on:
  schedule:
    - cron: '0 18 * * 0'   # Sunday 6 PM UTC = 2 PM EST (optimized for weekend reading)
  workflow_dispatch:
    inputs:
      mode:
        description: 'Run mode'
        required: true
        default: 'preview'
        type: choice
        options: [preview, test, send]
```

### Claude API Prompt Strategy
The generation prompt should:
1. Instruct Claude to search the web for AI news from **the past 7 days only**
2. Frame everything through an **entrepreneurship lens** ("why should a founder care?")
3. Generate content for each section matching the JSON schema
4. Include real source URLs for every story
5. Write in a tone that is: smart, direct, conversational, zero-hype, like a knowledgeable friend who reads everything
6. Generate practical tutorials that are copy-paste actionable
7. Create founder frameworks that are specific (not generic "think about your customers" advice)

The prompt should NOT:
- Use old or stale news
- Fabricate URLs or sources
- Generate generic AI hype content
- Use academic or overly formal tone
- Produce list-heavy, bullet-point-dump content

### Tool Rotation Logic
Each week, rotate the featured tool from the `tools.json` list:
```typescript
const weekNumber = getISOWeekNumber(new Date());
const featuredIndex = (weekNumber - 1) % tools.length;
const featured = tools[featuredIndex];
const others = tools.filter((_, i) => i !== featuredIndex).slice(0, 4);
```

---

## CONTENT GUIDELINES

### Tone & Voice
- **Smart but not academic** — write like a sharp friend who reads everything, not a professor
- **Direct** — no filler, no "In today's rapidly evolving landscape..."
- **Entrepreneur-focused** — every piece of content answers "so what do I DO with this?"
- **Conversational** — contractions, natural phrasing, occasional humor
- **Confident** — state opinions, make recommendations, take positions
- **Babson-aware** — reference entrepreneurship, ventures, startups, building things

### What Makes This Different from Other AI Newsletters
1. **Every story has an entrepreneur's takeaway** — not just "here's what happened" but "here's what you should do about it"
2. **Free tools section** — $700+ in free AI tools most students don't know about
3. **Copy-paste tutorials** — actual prompts and workflows, not theory
4. **Founder frameworks** — real business frameworks adapted for AI, not generic advice
5. **Babson branding** — feels like it belongs, not like some random internet newsletter

### Content That Should NEVER Appear
- AI doomer content without actionable context
- Overly technical ML/research content (save that for arxiv)
- Generic productivity tips ("use AI to write emails faster!")
- Anything that reads like it was generated by a basic ChatGPT prompt
- Promotional content for paid tools without genuine value
- Clickbait headlines

---

## SCALING PATH

### Phase 1: Pilot (Current)
- One class (~30 students)
- Manual email list
- Resend free tier
- Feedback collection via simple reply

### Phase 2: AI Generator Program
- Expand to Babson's AI Generator cohort
- 100-200 students
- Still Resend free tier (100/day)
- Add simple web archive page

### Phase 3: All of Babson
- ~3,500 undergrads + grad students
- Upgrade to Resend paid ($20/mo) or SendGrid
- Work with Babson IT for official sending domain
- SPF/DKIM/DMARC on babson subdomain
- Add subscriber management (Listmonk or similar)
- Potential Canvas LMS integration

---

## IMMEDIATE NEXT STEPS FOR CLAUDE CODE

1. Initialize the project with `package.json`, `tsconfig.json`, `.gitignore`
2. Install dependencies: `@anthropic-ai/sdk`, `resend`, `tsx`, `typescript`, `@types/node`
3. Create `config/tools.json` with the free student tools database above
4. Create `config/settings.json` with newsletter metadata
5. Build `src/template.ts` — the Babson-branded HTML email template
6. Build `src/generate-newsletter.ts` — Claude API with web search
7. Build `src/build-email.ts` — assembles content + tools into template
8. Build `src/send-email.ts` — Resend delivery
9. Build `src/index.ts` — orchestrator with 3 modes
10. Create `.github/workflows/newsletter.yml` — automation
11. Create `.env.example` with all required vars documented
12. Write `README.md` with setup instructions
13. Test with `MODE=preview` to generate and review HTML output

---

*This spec is the single source of truth for the project. Everything Claude Code needs is in this document.*
