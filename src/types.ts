export interface Tool {
  name: string;
  value: string;
  duration: string;
  description: string;
  claimSteps: string;
  url: string;
  category: string;
}

export interface NewsItem {
  headline: string;
  summary: string;
  takeaway: string;
  sourceUrl: string;
}

export interface FrameworkStep {
  title: string;
  description: string;
}

export interface BusinessWorkflow {
  title: string;
  description: string;
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
}
