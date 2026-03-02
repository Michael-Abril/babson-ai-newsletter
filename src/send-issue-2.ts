import "dotenv/config";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { buildEmail, type ToolOverrides } from "./build-email.js";
import { sendToRecipient, sendBroadcast } from "./send-email.js";
import type { NewsletterContent } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mode = process.env.MODE || "preview";

// Tool overrides for Issue #2 - NotebookLM focus with study tools
const ISSUE_2_TOOL_OVERRIDES: ToolOverrides = {
  featuredToolName: "NotebookLM",
  otherToolNames: [
    "Perplexity Pro",      // Free for students - research
    "Khanmigo",            // Free - tutoring
    "QuillBot",            // Free - paraphrasing
    "Grammarly Premium",   // Free for students - writing
  ],
};

interface EditionEntry {
  issueNumber: number;
  date: string;
  subjectLine: string;
  sentAt: string;
}

function saveToEditions(content: object, html: string, issueNumber: number, subjectLine: string): void {
  mkdirSync("editions", { recursive: true });

  const dateStr = new Date().toISOString().split("T")[0];

  // Save HTML
  writeFileSync(`editions/issue-${issueNumber}.html`, html);

  // Update index
  const indexPath = "editions/index.json";
  let editions: EditionEntry[] = [];
  if (existsSync(indexPath)) {
    try {
      editions = JSON.parse(readFileSync(indexPath, "utf-8"));
    } catch {
      editions = [];
    }
  }

  // Add or update this issue
  const existingIndex = editions.findIndex((e) => e.issueNumber === issueNumber);
  const entry: EditionEntry = {
    issueNumber,
    date: dateStr,
    subjectLine,
    sentAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    editions[existingIndex] = entry;
  } else {
    editions.push(entry);
  }

  // Sort by issue number (newest first)
  editions.sort((a, b) => b.issueNumber - a.issueNumber);
  writeFileSync(indexPath, JSON.stringify(editions, null, 2));

  console.log(`Archived as Issue #${issueNumber} in editions/`);
}

async function main() {
  console.log(`Sending Issue #2 (NotebookLM Edition) in ${mode} mode...`);

  // Step 1: Load manually curated content from issue-2.json
  const contentPath = join(__dirname, "..", "editions", "issue-2.json");
  if (!existsSync(contentPath)) {
    throw new Error("editions/issue-2.json not found. Create it first.");
  }

  const content: NewsletterContent = JSON.parse(readFileSync(contentPath, "utf-8"));
  console.log(`Subject: ${content.subjectLine}`);
  console.log(`Week Topic: ${content.weekTopic}`);

  // Step 2: Build HTML email with NotebookLM + study tools featured
  const result = buildEmail(content, ISSUE_2_TOOL_OVERRIDES);
  // Override issue number to 2 since last week's send failed
  const issueNumber = 2;
  const { html: rawHtml, subject, issueDate } = result;
  // Replace the issue number in the HTML
  const html = rawHtml.replace(/Issue #\d+/g, `Issue #${issueNumber}`);
  console.log(`Issue #${issueNumber} | ${issueDate}`);
  console.log(`Featured Tool: NotebookLM`);
  console.log(`Other Tools: Perplexity Pro, Khanmigo, QuillBot, Grammarly Premium`);
  console.log(`HTML size: ${(Buffer.byteLength(html) / 1024).toFixed(1)}KB`);

  // Step 3: Act based on mode
  switch (mode) {
    case "preview": {
      mkdirSync("output", { recursive: true });
      const filename = `output/issue-2-notebooklm.html`;
      writeFileSync(filename, html);
      console.log(`Preview saved to ${filename}`);
      console.log(`Open in browser to review.`);
      break;
    }
    case "test": {
      const testEmail = process.env.TEST_EMAIL;
      if (!testEmail) throw new Error("TEST_EMAIL not set in .env");
      console.log(`Sending test to: ${testEmail}`);
      await sendToRecipient(html, subject, testEmail);
      console.log("Test email sent successfully!");
      break;
    }
    case "send": {
      // Archive the newsletter before sending
      saveToEditions(content, html, issueNumber, content.subjectLine);

      console.log("Broadcasting to full audience...");
      await sendBroadcast(html, subject);
      console.log("Newsletter broadcast sent to audience!");
      break;
    }
    default:
      throw new Error(`Unknown mode: ${mode}. Use preview, test, or send.`);
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
