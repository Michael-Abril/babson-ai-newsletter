export interface Tool {
  name: string;
  value: string;
  duration: string;
  description: string;
  claimSteps: string;
  url: string;
  category: string;
  weeklyTheme?: string; // For grouping related tools by week
}

// 12-week rotation of themes for "AI in Your Business" section
export const WEEKLY_THEMES = [
  "AI Fundamentals",           // Week 1: Claude, ChatGPT, Gemini basics
  "Market Research & Validation", // Week 2: Perplexity, research tools
  "Building Your MVP",         // Week 3: Cursor, Replit, website builders
  "Branding & Visual Identity", // Week 4: Canva, Figma, image generators
  "Pitching & Fundraising",    // Week 5: Gamma, Tome, Bizplanr
  "Sales & Outreach",          // Week 6: CRMs, email tools, copywriting
  "Content Creation",          // Week 7: Writing, video, audio tools
  "Social Media & Marketing",  // Week 8: Buffer, CapCut, Pika
  "Productivity & Operations", // Week 9: Notion, meetings, scheduling
  "Customer Service & Support", // Week 10: Tidio, Crisp, chatbots
  "Data & Analytics",          // Week 11: Julius, FormulaBot, sheets
  "Automation & Scale",        // Week 12: Zapier, Make, n8n
] as const;

export type WeeklyTheme = typeof WEEKLY_THEMES[number];

export interface NewsItem {
  headline: string;
  summary: string;
  takeaway: string;
  sourceUrl: string;
}

export interface FrameworkStep {
  title: string;
  description: string;
  prompt?: string; // Copy-paste prompt for this step
  tool?: string; // Recommended tool (e.g., "Claude", "Perplexity")
  toolUrl?: string; // Direct link to the tool
}

export interface BusinessWorkflow {
  title: string;
  description: string;
  prompt?: string; // Exact prompt to copy
  tool?: string; // Tool name
  toolUrl?: string; // Direct link
}

export interface FounderSpotlight {
  enabled: boolean;
  startupName: string;
  oneLinePitch: string;
  ctaText: string;
  ctaUrl: string;
}

export interface NewsletterContent {
  subjectLine: string;
  weekTopic: string;
  bigStory: {
    headline: string;
    summary: string;
    sourceUrl: string;
  };
  classConnection: string;
  threeThings: NewsItem[];
  founderFramework: {
    title: string;
    intro: string;
    steps: FrameworkStep[];
    bottomLine: string;
  };
  aiInBusiness: {
    title: string;
    workflows: BusinessWorkflow[];
  };
  quickHits: string[];
  nextWeek: string;
  founderSpotlight?: FounderSpotlight;
}
