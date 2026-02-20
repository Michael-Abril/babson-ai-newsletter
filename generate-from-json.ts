import { writeFileSync, mkdirSync } from "fs";
import { buildEmail } from "./src/build-email.js";
import type { NewsletterContent } from "./src/types.js";

const content: NewsletterContent = {
  subjectLine: "OpenAI just raised $100B and that's not even the wildest part",
  weekTopic: "The Money Is Ridiculous Right Now",
  bigStory: {
    headline: "OpenAI is closing a $100 billion funding round. Yes, billion with a B.",
    summary: "OpenAI is about to finalize the largest private funding round in history. We're talking $100+ billion, valuing the company at over $850 billion. That's more than most countries' GDP. But here's what actually matters for you: this money is going straight into building out AI infrastructure, which means cheaper, faster, better tools hitting the market in the next 6 months. The AI arms race isn't slowing down. It's accelerating.",
    sourceUrl: "https://www.bloomberg.com/news/articles/2026-02-19/openai-funding-on-track-to-top-100-billion-with-latest-round"
  },
  classConnection: "When a company raises $100 billion, it creates a massive downstream effect. Every startup building on top of OpenAI's API gets better tools. Every competitor has to move faster. If you're building something right now, the tools you'll have access to in 3 months will be dramatically better than today. So don't over-invest in custom infrastructure. Build on top of the platforms and ride the wave.",
  threeThings: [
    {
      headline: "China's Seedance 2.0 has Hollywood actually scared",
      summary: "ByteDance dropped Seedance 2.0, a video generation model that's producing near film-quality output. Hollywood studios are calling emergency meetings. The US-China AI race just got a whole new dimension.",
      takeaway: "If you're building anything video-related, keep an eye on this. Video generation costs are about to crater, and that's a massive opportunity for content-heavy startups.",
      sourceUrl: "https://www.cnn.com/2026/02/20/china/china-ai-seedance-intl-hnk-dst"
    },
    {
      headline: "Grok 4.20 uses four AI agents that argue with each other",
      summary: "xAI's new Grok model doesn't use one AI. It uses four specialized agents that debate before giving you an answer. One coordinates, one fact-checks, one codes, one handles creative stuff. Early testing shows hallucinations dropped 47-65%.",
      takeaway: "Multi-agent architectures are the future. If you're building an AI product, think about how you could split tasks across specialized models instead of relying on one do-everything model.",
      sourceUrl: "https://www.crescendo.ai/news/latest-ai-news-and-updates"
    },
    {
      headline: "ElevenLabs just became an $11 billion company",
      summary: "The voice AI company raised $500 million at an $11 billion valuation. That's wild for a company that basically does one thing really well: make AI voices sound human. Sequoia led the round.",
      takeaway: "This proves you don't need to build a general-purpose AI to win big. Find one specific thing, do it better than everyone else, and scale. That's the ElevenLabs playbook.",
      sourceUrl: "https://techcrunch.com/2026/02/17/here-are-the-17-us-based-ai-companies-that-have-raised-100m-or-more-in-2026/"
    }
  ],
  founderFramework: {
    title: "How to validate your AI startup idea this weekend for under $50",
    intro: "You don't need to build anything to know if your idea works. Here's the exact process I'd use to go from 'I have an idea' to 'people will pay for this' in 48 hours.",
    steps: [
      {
        title: "Find 20 people with the problem",
        description: "Use Claude or ChatGPT to generate a list of online communities where your target customer hangs out. Reddit, Discord servers, LinkedIn groups, Twitter circles. Then post a simple question: 'What's your biggest frustration with [problem area]?' Don't pitch anything. Just listen."
      },
      {
        title: "Build a landing page in 30 minutes",
        description: "Open Cursor, describe your product in one sentence, and have it generate a landing page. Or use Carrd ($19/year) if you want even faster. Add a waitlist signup form with Tally (free). Your goal: 50 words max explaining what it does and an email capture."
      },
      {
        title: "Run a $30 ad test",
        description: "Put $15 on a Reddit ad and $15 on a Meta ad targeting your exact audience. Send traffic to your landing page. If you get above 10% signup rate, you've got something real. If it's under 3%, you need to rethink the pitch or the problem."
      }
    ],
    bottomLine: "Total cost: $30-50. Total time: one weekend. Building a full product before validating? That's how you waste a semester."
  },
  aiInBusiness: {
    title: "3 AI workflows that'll save you hours this week",
    workflows: [
      {
        title: "Competitive research on autopilot",
        description: "Open Perplexity Pro (free for students). Type: 'Analyze the top 5 competitors in [your industry] and create a comparison table of features, pricing, and weaknesses.' You'll get a sourced competitive analysis in 30 seconds that would take 3-4 hours manually."
      },
      {
        title: "Turn lecture recordings into study weapons",
        description: "Upload your lecture recording to NotebookLM (free). It'll generate a complete study guide, flashcards, and even a podcast-style audio summary you can listen to while walking to class. Then ask it specific questions about the material."
      },
      {
        title: "Draft investor emails that actually get responses",
        description: "Paste a VC's recent LinkedIn posts or tweets into Claude. Ask it to draft a cold email that references their specific interests and connects to your startup. Personalized outreach at scale. Your response rate will 3x compared to generic templates."
      }
    ]
  },
  quickHits: [
    "Meta x NVIDIA: Multi-year partnership for AI infrastructure. Meta's spending nearly $700B on AI this year. The compute race is insane.",
    "Google Gemini 3.1 Pro: Scored 77.1% on ARC-AGI-2, more than double the previous version. Rolling out everywhere.",
    "OpenAI Frontier: New enterprise platform for building and managing AI agents. Even lets you manage non-OpenAI agents.",
    "Runway: Raised $315M at a $5.3B valuation. Video AI keeps getting bigger money."
  ],
  nextWeek: "We're digging into how students are actually using AI agents to run side businesses while in school. I've got three Babson students who are doing it right now and their setups are genuinely impressive. You're going to want to steal their workflows."
};

const { html, subject } = buildEmail(content);

mkdirSync("output", { recursive: true });
const filename = `output/newsletter-${new Date().toISOString().split("T")[0]}.html`;
writeFileSync(filename, html);
console.log(`Subject: ${subject}`);
console.log(`HTML size: ${(Buffer.byteLength(html) / 1024).toFixed(1)}KB`);
console.log(`Saved to: ${filename}`);
