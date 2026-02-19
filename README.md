# The AI Pulse

Automated weekly AI newsletter for Babson College students. Searches for the latest AI news, frames it through an entrepreneurship lens, and delivers it via email every Sunday.

## How It Works

1. AI searches the web for this week's top AI news
2. Content is assembled into a Babson-branded HTML email
3. **Resend** delivers it to the student email list
4. **GitHub Actions** runs this automatically every Sunday at 2PM EST

## Quick Setup

```bash
# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Required API Keys

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) |
| `RESEND_API_KEY` | [resend.com](https://resend.com/) |

### Run Modes

```bash
# Preview — generates HTML, saves to output/ folder
npm run preview

# Test — sends to your TEST_EMAIL only
npm run test-send

# Send — sends to all students in config/recipients.txt
npm run send
```

## Managing the Email List

Add student emails to `config/recipients.txt` — one per line:

```
student1@babson.edu
student2@babson.edu
student3@babson.edu
```

Lines starting with `#` are comments. Make the repo **private** before adding student emails.

## GitHub Actions (Automated)

The newsletter runs automatically every Sunday at 2PM EST via GitHub Actions.

Add these as **repository secrets** (Settings → Secrets):
- `ANTHROPIC_API_KEY`
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `TEST_EMAIL`

You can also trigger manually from the Actions tab with a mode selector.

## Project Structure

```
├── src/
│   ├── index.ts                 # Entry point (preview/test/send modes)
│   ├── generate-newsletter.ts   # AI-powered content generation + web search
│   ├── build-email.ts           # Assembles content into HTML
│   ├── send-email.ts            # Resend delivery
│   ├── template.ts              # Babson-branded HTML template
│   └── types.ts                 # TypeScript interfaces
├── config/
│   ├── tools.json               # Free student AI tools database
│   ├── recipients.txt           # Student email list
│   └── settings.json            # Newsletter settings + brand colors
├── .github/workflows/
│   └── newsletter.yml           # Sunday cron + manual trigger
├── archive/                     # Past issues (auto-committed)
└── output/                      # Preview HTML (gitignored)
```
