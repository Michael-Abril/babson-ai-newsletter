import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { buildHTML } from "./template.js";
import type { NewsletterContent, Tool } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const toolsPath = join(__dirname, "..", "config", "tools.json");
const editionsIndexPath = join(__dirname, "..", "editions", "index.json");

interface EditionEntry {
  issueNumber: number;
  date: string;
  subjectLine: string;
  usedTools?: string[];
}

function getNextIssueNumber(): number {
  // Get next sequential issue number based on actual issues sent
  if (!existsSync(editionsIndexPath)) {
    return 1;
  }
  try {
    const editions: EditionEntry[] = JSON.parse(readFileSync(editionsIndexPath, "utf-8"));
    if (editions.length === 0) return 1;
    // Find the highest issue number and add 1
    const maxIssue = Math.max(...editions.map(e => e.issueNumber));
    return maxIssue + 1;
  } catch {
    return 1;
  }
}

function getUsedTools(): string[] {
  // Get all tools that have been used in previous issues
  if (!existsSync(editionsIndexPath)) {
    return [];
  }
  try {
    const editions: EditionEntry[] = JSON.parse(readFileSync(editionsIndexPath, "utf-8"));
    const usedTools: string[] = [];
    for (const edition of editions) {
      if (edition.usedTools) {
        usedTools.push(...edition.usedTools);
      }
    }
    return usedTools;
  } catch {
    return [];
  }
}

export interface ToolOverrides {
  featuredToolName?: string;  // Name of tool to feature (e.g., "NotebookLM")
  otherToolNames?: string[];  // Names of other tools to show (4 tools)
}

export function buildEmail(content: NewsletterContent, overrides?: ToolOverrides): {
  html: string;
  subject: string;
  subjectLine: string;
  issueNumber: number;
  issueDate: string;
  usedTools: string[];
} {
  const tools: Tool[] = JSON.parse(readFileSync(toolsPath, "utf-8"));

  let featuredTool: Tool;
  let otherTools: Tool[];

  const usedTools = getUsedTools();

  if (overrides?.featuredToolName) {
    // Use specified featured tool
    featuredTool = tools.find(t => t.name === overrides.featuredToolName) || tools[0];

    if (overrides.otherToolNames) {
      // Use specified other tools
      otherTools = overrides.otherToolNames
        .map(name => tools.find(t => t.name === name))
        .filter((t): t is Tool => t !== undefined)
        .slice(0, 4);
    } else {
      // Default other tools excluding featured
      otherTools = tools.filter(t => t.name !== overrides.featuredToolName).slice(0, 4);
    }
  } else {
    // Smart rotation: pick tools not used in recent issues
    const unusedTools = tools.filter(t => !usedTools.includes(t.name));
    const availableTools = unusedTools.length >= 5 ? unusedTools : tools;

    // Pick featured tool (first unused, or cycle back)
    featuredTool = availableTools[0];

    // Pick 4 other tools (different from featured)
    otherTools = availableTools
      .filter(t => t.name !== featuredTool.name)
      .slice(0, 4);
  }

  const issueNumber = getNextIssueNumber();
  const issueDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const html = buildHTML(content, featuredTool, otherTools, issueNumber, issueDate);
  const subjectLine = content.subjectLine;
  const subject = `The AI Pulse | ${subjectLine}`;

  // Track which tools were used this issue
  const usedToolsThisIssue = [featuredTool.name, ...otherTools.map(t => t.name)];

  return { html, subject, subjectLine, issueNumber, issueDate, usedTools: usedToolsThisIssue };
}
