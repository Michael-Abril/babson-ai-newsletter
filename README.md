# The AI Pulse

**Babson College – AI for Entrepreneurs by Mikey Abril**

The AI Pulse is a fully automated weekly newsletter that teaches Babson College students how to use AI better than 99% of people. Every Friday morning, students get curated AI news, free tools worth $1,000+/year, and step-by-step frameworks they can apply to their ventures that same week.

This isn't another generic AI newsletter. Every story is filtered through the lens of entrepreneurship and written in plain language. No jargon, no fluff, no "in today's rapidly evolving landscape." Just practical AI knowledge that gives Babson students a real competitive edge.

## Why This Exists

Most people use AI as a fancy search engine. They open ChatGPT, ask a question, and close it. But AI can do so much more: validate business ideas in a weekend, automate 80% of market research, build MVPs without a dev team, and create investor-ready pitch decks in hours instead of weeks.

The AI Pulse exists to close that gap. Each issue breaks down exactly what's happening in AI and, more importantly, what Babson students should actually do about it.

## What Each Issue Includes

| Section | What You Get |
|---|---|
| **The Big Story** | The week's most important AI development, with a direct connection to what you're learning at Babson |
| **Babson Connection** | How the big story ties into entrepreneurship, competitive strategy, and what it means for your ventures |
| **This Week in AI** | Three quick news items with a specific takeaway for entrepreneurs |
| **Founder's Edge** | A step-by-step AI framework you can apply to your startup this week |
| **Free Student Tools** | Rotating spotlight on AI tools you get free with your .edu email (Cursor, Gemini, Perplexity, Copilot, ChatGPT+, and more) |
| **AI in Your Business** | Three practical AI workflows for real student ventures |
| **Quick Hits** | Rapid-fire industry updates to keep you current |

## Free AI Tools for Babson Students

Every issue highlights tools you can claim for free with your Babson email. The current database includes over **$1,300/year in free AI tools**:

| Tool | Value | What It Does |
|---|---|---|
| **Cursor Pro** | $240/yr | AI code editor that builds apps from plain English descriptions |
| **Google Gemini Pro** | $240/yr | Google's most advanced AI + 2TB storage |
| **Perplexity Pro** | $200/yr | AI research engine with real citations |
| **ChatGPT Plus** | $200/yr | Full GPT access, image gen, data analysis |
| **Canva Pro** | $130/yr | AI design tools, Magic Studio, presentation builder |
| **GitHub Copilot** | $100/yr | AI pair programmer for VS Code |
| **Microsoft 365 Copilot** | $100/yr | AI across Word, Excel, PowerPoint |
| **NotebookLM** | Free | Turn your lecture notes into AI-powered study tools |

## How It Works

The entire newsletter pipeline is automated end-to-end. No manual work needed once configured.

```
Every Friday at 10:00 AM EST:
  1. AI searches the web for the week's most relevant AI news
  2. Content is generated with Babson's entrepreneurship focus
  3. HTML email is assembled with clean, branded design
  4. Newsletter is sent to all enrolled students automatically
  5. Each edition is archived for the historical backlog
```

Issues can also be triggered manually from the GitHub Actions tab for previewing or testing before a send.

## Technology

| Component | Purpose |
|---|---|
| **Anthropic Claude API** | Content generation with real-time web search |
| **Resend** | Email delivery with unsubscribe compliance |
| **GitHub Actions** | Automated Friday morning delivery via cron |
| **TypeScript / Node.js** | Application runtime |

## Schedule

- **Day:** Every Friday
- **Time:** 10:00 AM EST
- **Automated:** Yes, via GitHub Actions cron schedule
- **Manual trigger:** Available from the Actions tab (preview, test, or send modes)

## Privacy and Security

- All API keys and credentials are stored as encrypted GitHub Secrets
- The student email list is stored in `config/students.csv` (excluded from version control via `.gitignore`)
- No student data is committed to the repository
- This repository is **private**

---

<details>
<summary><strong>Developer Setup</strong></summary>

### Prerequisites

- Node.js 20+
- [Anthropic API key](https://console.anthropic.com/)
- [Resend API key](https://resend.com/)
- Verified sender domain or email in Resend

### Install and Configure

```bash
npm install
cp .env.example .env
# Edit .env with your API keys
```

### Add Student Emails

Create `config/students.csv` with student emails (one per line, or CSV with email column):

```csv
email
student1@babson.edu
student2@babson.edu
```

Or use `config/recipients.txt` (one email per line, lines starting with `#` are comments).

### Run Modes

```bash
npm run preview      # Generate HTML preview (saved to output/)
npm run test-send    # Send to TEST_EMAIL only
npm run send         # Send to all recipients
```

### GitHub Actions Secrets

Add these in **Settings > Secrets and variables > Actions**:

| Secret | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key for content generation |
| `RESEND_API_KEY` | Resend API key for email delivery |
| `FROM_EMAIL` | Sender address, e.g. `The AI Pulse <mikey@babson.edu>` (must be verified in Resend) |
| `TEST_EMAIL` | Your email for test sends |

### Triggering a Workflow

From the GitHub Actions tab:
1. Click **"The AI Pulse | Weekly Newsletter"**
2. Click **"Run workflow"**
3. Select mode: `preview`, `test`, or `send`
4. Click **"Run workflow"**

The preview HTML is uploaded as a downloadable artifact after each run.

### Project Structure

```
src/
  index.ts                 Entry point (preview/test/send modes)
  generate-newsletter.ts   AI content generation with web search
  build-email.ts           Content assembly and tool rotation
  send-email.ts            Email delivery via Resend
  template.ts              HTML email template
  types.ts                 TypeScript interfaces
config/
  tools.json               Free student AI tools database
  settings.json            Newsletter branding and schedule
  recipients.txt           Student email list (one per line)
  students.csv             Student email CSV (gitignored)
editions/                  Archived past editions (by year/week)
.github/workflows/
  newsletter.yml           Cron schedule + manual trigger
```

</details>
