# The AI Pulse

**A weekly AI newsletter for Babson College students, built by Babson students.**

The AI Pulse delivers curated AI news, free student tools, and actionable entrepreneurship frameworks to Babson students every Sunday afternoon. Every story is framed through the lens of what founders and future business leaders should actually do about it.

---

## What Each Issue Includes

| Section | What It Covers |
|---|---|
| **The Big Story** | Deep dive into the week's most important AI development, with a direct connection to Babson coursework |
| **This Week in AI** | Three quick news items, each with a specific takeaway for entrepreneurs |
| **Founder's Edge** | A step-by-step AI-powered framework students can apply to their ventures immediately |
| **Free Student Tools** | Rotating spotlight on free AI tools available with a .edu email |
| **AI in Your Business** | Practical AI workflows for real student ventures |
| **Quick Hits** | Rapid-fire industry updates to stay current |

## How It Works

1. **Research** — AI searches the web for the week's most relevant AI developments
2. **Write** — Content is generated with a Babson entrepreneurship focus, connecting every story to what founders should do about it
3. **Design** — Content is assembled into a clean, branded HTML email
4. **Deliver** — The newsletter is sent to the student email list automatically

The entire pipeline runs every **Sunday at 2:00 PM EST** via GitHub Actions. No manual work is needed once configured. Issues can also be triggered on-demand from the Actions tab for previewing or testing.

## Free Student AI Tools

Each issue highlights free AI tools that Babson students can claim with their .edu email. The current database includes:

- **Cursor Pro** — AI code editor ($240/year value)
- **Google Gemini Pro** — Advanced AI + 2TB storage ($240/year value)
- **Perplexity Pro** — AI research engine ($200/year value)
- **GitHub Copilot** — AI pair programmer ($100/year value)
- **ChatGPT Plus** — GPT-4 access ($200/year value)
- **NotebookLM** — Google's AI research notebook (free)
- **Microsoft 365 Copilot** — AI across Office apps (free with .edu)
- **Canva Pro** — AI design tools (free with .edu)

A different tool is featured each week on a rotating basis.

## Security and Privacy

- All API keys and credentials are stored as encrypted GitHub Secrets — never in the codebase
- The student email list is managed through secure environment variables
- No student data is committed to the repository
- The repository should be set to **private** before adding any student email addresses

## Technology

| Component | Purpose |
|---|---|
| Anthropic Claude API | Content generation with real-time web search |
| Resend | Email delivery with unsubscribe compliance |
| GitHub Actions | Weekly automation on a cron schedule |
| TypeScript / Node.js | Application language and runtime |

---

<details>
<summary><strong>Developer Setup</strong></summary>

### Prerequisites

- Node.js 20+
- [Anthropic API key](https://console.anthropic.com/)
- [Resend API key](https://resend.com/)

### Install and Configure

```bash
npm install
cp .env.example .env
# Edit .env with your API keys
```

### Run Modes

```bash
npm run preview      # Generate HTML preview (no email sent)
npm run test-send    # Send to TEST_EMAIL only
npm run send         # Send to all recipients
```

### GitHub Actions Secrets

Add these in Settings > Secrets and variables > Actions:

| Secret | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key |
| `RESEND_API_KEY` | Resend email API key |
| `FROM_EMAIL` | Sender address (verified in Resend) |
| `TEST_EMAIL` | Recipient for test sends |

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
.github/workflows/
  newsletter.yml           Weekly cron schedule + manual trigger
```

</details>
