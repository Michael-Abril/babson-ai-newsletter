import "dotenv/config";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { generateNewsletter } from "./generate-newsletter.js";
import { buildEmail } from "./build-email.js";
import { sendToRecipient, sendBroadcast } from "./send-email.js";

const mode = process.env.MODE || "preview";

interface EditionEntry {
  issueNumber: number;
  date: string;
  subjectLine: string;
  sentAt: string;
}

function saveToEditions(content: object, html: string, issueNumber: number, subjectLine: string): void {
  mkdirSync("editions", { recursive: true });

  const dateStr = new Date().toISOString().split("T")[0];

  // Save JSON content
  writeFileSync(`editions/issue-${issueNumber}.json`, JSON.stringify(content, null, 2));

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
  console.log(`Running in ${mode} mode...`);

  // Step 1: Generate content
  console.log("Generating newsletter content...");
  const content = await generateNewsletter();
  console.log(`Subject: ${content.subjectLine}`);

  // Step 2: Build HTML email
  const { html, subject, issueNumber, issueDate } = buildEmail(content);
  console.log(`Issue #${issueNumber} | ${issueDate}`);
  console.log(`HTML size: ${(Buffer.byteLength(html) / 1024).toFixed(1)}KB`);

  // Step 3: Act based on mode
  switch (mode) {
    case "preview": {
      mkdirSync("output", { recursive: true });
      const filename = `output/newsletter-${new Date().toISOString().split("T")[0]}.html`;
      writeFileSync(filename, html);
      console.log(`Preview saved to ${filename}`);
      break;
    }
    case "test": {
      const testEmail = process.env.TEST_EMAIL;
      if (!testEmail) throw new Error("TEST_EMAIL not set");
      await sendToRecipient(html, subject, testEmail);
      console.log("Test email sent.");
      break;
    }
    case "send": {
      // Archive the newsletter before sending
      saveToEditions(content, html, issueNumber, content.subjectLine);

      await sendBroadcast(html, subject);
      console.log("Newsletter broadcast sent to audience.");
      break;
    }
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
