/**
 * Multi-Agent Types for The AI Pulse
 */

export interface ResearchedStory {
  headline: string;
  summary: string;
  sourceUrl: string;
  publishedDate: string;
  category: "product_launch" | "funding" | "research" | "tool" | "announcement";
}

export interface CuratedStory extends ResearchedStory {
  entrepreneurScore: number; // 1-10
  actionabilityScore: number; // 1-10
  uniquenessScore: number; // 1-10
  totalScore: number;
  curatorNotes: string;
}

export interface AgentResult<T> {
  agentName: string;
  success: boolean;
  data: T;
  reasoning: string;
  timestamp: string;
}

export interface QAScore {
  authenticity: number; // 1-100
  actionability: number; // 1-100
  engagement: number; // 1-100
  babsonRelevance: number; // 1-100
  overall: number;
  approved: boolean;
  fixes?: string[];
}

export interface PipelineState {
  currentStep: number;
  totalSteps: number;
  stepName: string;
  researchResults?: AgentResult<ResearchedStory[]>;
  curationResults?: AgentResult<CuratedStory[]>;
  draftContent?: AgentResult<string>;
  editedContent?: AgentResult<string>;
  contextualizedContent?: AgentResult<string>;
  qaResults?: AgentResult<QAScore>;
  finalNewsletter?: string;
}
