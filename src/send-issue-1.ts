/**
 * One-time script to send Issue #1 using the Feb 22 content
 * with the updated template (no privacy policy link)
 */
import "dotenv/config";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { buildHTML } from "./template.js";
import { sendBroadcast } from "./send-email.js";
import type { NewsletterContent, Tool } from "./types.js";

// Load the Feb 22 content (has the good prompts)
const content: NewsletterContent = JSON.parse(
  readFileSync("output/newsletter-2026-02-22.json", "utf-8")
);

// Load tools
const tools: Tool[] = JSON.parse(readFileSync("config/tools.json", "utf-8"));
const featuredTool = tools[0]; // Claude
const otherTools = tools.slice(1, 5);

// Issue #1 info
const issueNumber = 1;
const issueDate = "February 23, 2026";

// Build HTML with updated template
const html = buildHTML(content, featuredTool, otherTools, issueNumber, issueDate);

console.log("Issue #1 - The AI Pulse");
console.log(`Subject: ${content.subjectLine}`);
console.log(`HTML size: ${(Buffer.byteLength(html) / 1024).toFixed(1)}KB`);

// Save to editions folder
mkdirSync("editions", { recursive: true });
writeFileSync("editions/issue-1.json", JSON.stringify(content, null, 2));
writeFileSync("editions/issue-1.html", html);

// Update editions index
interface EditionEntry {
  issueNumber: number;
  date: string;
  subjectLine: string;
  sentAt: string;
}

const indexPath = "editions/index.json";
let editions: EditionEntry[] = [];
if (existsSync(indexPath)) {
  try {
    editions = JSON.parse(readFileSync(indexPath, "utf-8"));
  } catch {
    editions = [];
  }
}

const entry: EditionEntry = {
  issueNumber: 1,
  date: "2026-02-23",
  subjectLine: content.subjectLine,
  sentAt: new Date().toISOString(),
};

// Remove any existing issue #1 and add new
editions = editions.filter(e => e.issueNumber !== 1);
editions.push(entry);
editions.sort((a, b) => b.issueNumber - a.issueNumber);
writeFileSync(indexPath, JSON.stringify(editions, null, 2));

console.log("\nSaved to editions/issue-1.json and editions/issue-1.html");
console.log("Updated editions/index.json");

// Handle command line args
const args = process.argv.slice(2);
const subject = `The AI Pulse #1 | ${content.subjectLine}`;

if (args.includes("--test")) {
  const testEmail = process.env.TEST_EMAIL;
  if (!testEmail) {
    console.error("TEST_EMAIL not set in .env");
    process.exit(1);
  }
  console.log(`\nSending test to ${testEmail}...`);
  const { sendToRecipient } = await import("./send-email.js");
  await sendToRecipient(html, subject, testEmail);
  console.log("Test email sent!");
} else if (args.includes("--send")) {
  console.log("\nSending to full audience...");
  await sendBroadcast(html, subject);
  console.log("Broadcast sent!");
} else {
  console.log("\nCommands:");
  console.log("  npx tsx src/send-issue-1.ts --test  # Send test to your email");
  console.log("  npx tsx src/send-issue-1.ts --send  # Send to full audience");
}
