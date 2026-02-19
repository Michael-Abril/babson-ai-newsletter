import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { buildHTML } from "./template.js";
import type { NewsletterContent, Tool } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const toolsPath = join(__dirname, "..", "config", "tools.json");

function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function buildEmail(content: NewsletterContent): { html: string; subject: string } {
  const tools: Tool[] = JSON.parse(readFileSync(toolsPath, "utf-8"));

  const weekNumber = getISOWeekNumber(new Date());
  const featuredIndex = (weekNumber - 1) % tools.length;
  const featuredTool = tools[featuredIndex];
  const otherTools = tools.filter((_, i) => i !== featuredIndex).slice(0, 4);

  const issueNumber = weekNumber;
  const issueDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const html = buildHTML(content, featuredTool, otherTools, issueNumber, issueDate);
  const subject = `The AI Pulse — ${content.subjectLine}`;

  return { html, subject };
}
