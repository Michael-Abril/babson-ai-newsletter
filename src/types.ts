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

export interface NewsletterContent {
  subjectLine: string;
  bigStory: {
    headline: string;
    summary: string;
    founderAngle: string;
    sourceUrl: string;
  };
  threeThings: NewsItem[];
  tutorial: {
    title: string;
    intro: string;
    steps: string[];
  };
  founderFramework: {
    title: string;
    intro: string;
    steps: FrameworkStep[];
    bottomLine: string;
  };
  quickHits: string[];
}
