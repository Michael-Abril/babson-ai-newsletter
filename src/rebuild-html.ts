/**
 * Rebuild HTML from existing JSON content
 * Usage: npx tsx src/rebuild-html.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { buildHTML } from "./template.js";
import type { NewsletterContent, Tool } from "./types.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dateStr = new Date().toISOString().split("T")[0];
const jsonPath = `output/newsletter-${dateStr}.json`;
const htmlPath = `output/newsletter-${dateStr}.html`;

// Get issue number from editions index
interface EditionEntry {
  issueNumber: number;
  date: string;
  usedTools?: string[];
}
const editionsPath = join(__dirname, "..", "editions", "index.json");
const editions: EditionEntry[] = JSON.parse(readFileSync(editionsPath, "utf-8"));
const todayEdition = editions.find(e => e.date === dateStr);
const issueNumber = todayEdition?.issueNumber || 5;

console.log(`Reading content from ${jsonPath}...`);
const content: NewsletterContent = JSON.parse(readFileSync(jsonPath, "utf-8"));

// Load tools
const toolsPath = join(__dirname, "..", "config", "tools.json");
const tools: Tool[] = JSON.parse(readFileSync(toolsPath, "utf-8"));

// Get the tools that were used for this issue
const usedToolNames = todayEdition?.usedTools || [];
const featuredTool = tools.find(t => t.name === usedToolNames[0]) || tools[0];
const otherTools = usedToolNames.slice(1, 5)
  .map(name => tools.find(t => t.name === name))
  .filter((t): t is Tool => t !== undefined);

const issueDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

console.log("Rebuilding HTML...");
const html = buildHTML(content, featuredTool, otherTools, issueNumber, issueDate);

writeFileSync(htmlPath, html);
console.log(`HTML rebuilt: ${htmlPath}`);
console.log(`Issue #${issueNumber} | ${issueDate}`);
