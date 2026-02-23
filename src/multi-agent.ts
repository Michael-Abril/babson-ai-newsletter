/**
 * Multi-Agent Newsletter Generator Entry Point
 *
 * Usage:
 *   npm run multi-agent:preview  - Generate and preview locally
 *   npm run multi-agent:send     - Generate and send to audience
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { runMultiAgentPipeline } from "./agents/orchestrator.js";
import { buildEmail } from "./build-email.js";
import type { NewsletterContent } from "./types.js";

interface EditionEntry {
  issueNumber: number;
  date: string;
  subjectLine: string;
  qaScore: number;
}

/**
 * Update editions/index.json with new edition entry
 */
function updateEditionsIndex(entry: EditionEntry): void {
  const indexPath = "editions/index.json";
  let editions: EditionEntry[] = [];

  if (existsSync(indexPath)) {
    try {
      editions = JSON.parse(readFileSync(indexPath, "utf-8"));
    } catch {
      editions = [];
    }
  }

  // Check if this issue already exists (update it) or add new
  const existingIndex = editions.findIndex((e) => e.issueNumber === entry.issueNumber);
  if (existingIndex >= 0) {
    editions[existingIndex] = entry;
  } else {
    editions.push(entry);
  }

  // Sort by issue number descending (newest first)
  editions.sort((a, b) => b.issueNumber - a.issueNumber);

  writeFileSync(indexPath, JSON.stringify(editions, null, 2));
}

/**
 * Generate LinkedIn post from newsletter content
 * Voice: casual, direct, like texting a friend who asked "what's new in AI?"
 */
function generateLinkedInPost(content: NewsletterContent, issueNumber: number): string {
  const lines: string[] = [];

  // Lead with the big story, no fluff
  lines.push(content.bigStory.headline);
  lines.push("");
  lines.push("Here's what actually matters this week:");
  lines.push("");

  // Three quick hits, no numbering, just dashes
  for (const item of content.threeThings.slice(0, 3)) {
    lines.push(`- ${item.headline}`);
  }

  lines.push("");
  lines.push(`Plus: ${content.founderFramework.title}`);
  lines.push("");
  lines.push("Full breakdown in The AI Pulse (link in comments)");
  lines.push("");
  lines.push("#AI #Startups #Babson");

  return lines.join("\n");
}

async function main() {
  const mode = process.env.MODE || "preview";
  console.log(`\nMode: ${mode.toUpperCase()}`);
  console.log(`Date: ${new Date().toISOString()}\n`);

  try {
    // Run the multi-agent pipeline
    const { content, qaScore } = await runMultiAgentPipeline();

    // Build the email HTML
    const { html, subjectLine, issueNumber, issueDate } = await buildEmail(content);

    // Update editions index
    updateEditionsIndex({
      issueNumber,
      date: new Date().toISOString().split("T")[0],
      subjectLine: content.subjectLine,
      qaScore,
    });
    console.log(`Edition #${issueNumber} tracked`);

    // Ensure output directory exists
    if (!existsSync("output")) {
      mkdirSync("output", { recursive: true });
    }

    // Save outputs
    const dateStr = new Date().toISOString().split("T")[0];
    
    // Save JSON content
    const jsonPath = `output/newsletter-${dateStr}.json`;
    writeFileSync(jsonPath, JSON.stringify(content, null, 2));
    console.log(`\nJSON saved: ${jsonPath}`);

    // Save HTML
    const htmlPath = `output/newsletter-${dateStr}.html`;
    writeFileSync(htmlPath, html);
    console.log(`HTML saved: ${htmlPath}`);

    // Generate and save LinkedIn post
    const linkedInPost = generateLinkedInPost(content, issueNumber);
    const linkedInPath = `output/linkedin-${dateStr}.md`;
    writeFileSync(linkedInPath, linkedInPost);
    console.log(`LinkedIn saved: ${linkedInPath}`);

    // Preview info
    console.log(`\nSubject: ${subjectLine}`);
    console.log(`Issue #${issueNumber} | ${issueDate}`);

    if (mode === "preview") {
      console.log(`\nPreview complete. Open ${htmlPath} in your browser.`);
    } else if (mode === "test") {
      // Import and send test email
      const { sendTestEmail } = await import("./send-email.js");
      const testEmail = process.env.TEST_EMAIL;
      if (!testEmail) {
        throw new Error("TEST_EMAIL environment variable required for test mode");
      }
      await sendTestEmail(testEmail, subjectLine, html);
      console.log(`\nTest email sent to ${testEmail}`);
    } else if (mode === "send") {
      // Import and broadcast
      const { broadcastToAudience } = await import("./send-email.js");
      const audienceId = process.env.RESEND_AUDIENCE_ID;
      if (!audienceId) {
        throw new Error("RESEND_AUDIENCE_ID environment variable required for send mode");
      }
      await broadcastToAudience(audienceId, subjectLine, html);
      console.log(`\nNewsletter broadcast to audience.`);
    }

  } catch (error) {
    console.error("\nPipeline failed:", error);
    process.exit(1);
  }
}

main();
