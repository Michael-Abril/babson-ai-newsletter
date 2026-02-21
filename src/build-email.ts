import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { buildHTML } from "./template.js";
import type { NewsletterContent, Tool } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const toolsPath = join(__dirname, "..", "config", "tools.json");

// First issue launch: Week 8 of 2026 (Feb 21, 2026)
const LAUNCH_YEAR = 2026;
const LAUNCH_WEEK = 8;

function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getIssueNumber(date: Date): number {
  const currentYear = date.getFullYear();
  const currentWeek = getISOWeekNumber(date);
  // Calculate weeks since launch
  const weeksSinceLaunch = (currentYear - LAUNCH_YEAR) * 52 + (currentWeek - LAUNCH_WEEK);
  return weeksSinceLaunch + 1; // Issue 1 is week 0
}

export function buildEmail(content: NewsletterContent): { html: string; subject: string } {
  const tools: Tool[] = JSON.parse(readFileSync(toolsPath, "utf-8"));

  const weekNumber = getISOWeekNumber(new Date());
  const featuredIndex = (weekNumber - 1) % tools.length;
  const featuredTool = tools[featuredIndex];
  const otherTools = tools.filter((_, i) => i !== featuredIndex).slice(0, 4);

  const issueNumber = getIssueNumber(new Date());
  const issueDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const html = buildHTML(content, featuredTool, otherTools, issueNumber, issueDate);
  const subject = `The AI Pulse | ${content.subjectLine}`;

  return { html, subject };
}
