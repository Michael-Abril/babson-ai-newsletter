import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { generateNewsletter } from "./generate-newsletter.js";
import { buildEmail } from "./build-email.js";
import { sendNewsletter, broadcastNewsletter } from "./send-email.js";

function loadRecipients(): string[] {
  // Priority 1: CSV file (supports header row with "email" column)
  const csvPath = "config/students.csv";
  if (existsSync(csvPath)) {
    const lines = readFileSync(csvPath, "utf-8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    // Skip header row if it contains "email"
    const start = lines[0]?.toLowerCase().includes("email") ? 1 : 0;
    const emails = lines.slice(start).map((l) => {
      // Handle CSV: take the column that looks like an email
      const parts = l.split(",").map((p) => p.trim().replace(/"/g, ""));
      return parts.find((p) => p.includes("@")) || parts[0];
    }).filter((e) => e && e.includes("@"));
    if (emails.length > 0) return emails;
  }

  // Priority 2: Plain text file (one email per line)
  const txtPath = "config/recipients.txt";
  if (existsSync(txtPath)) {
    const lines = readFileSync(txtPath, "utf-8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    if (lines.length > 0) return lines;
  }

  // Priority 3: Environment variable
  const envEmails = process.env.STUDENT_EMAILS;
  if (envEmails) return JSON.parse(envEmails) as string[];
  return [];
}

const mode = process.env.MODE || "preview";

async function main() {
  console.log(`Running in ${mode} mode...`);

  // Step 1: Generate content
  console.log("Generating newsletter content...");
  const content = await generateNewsletter();
  console.log(`Subject: ${content.subjectLine}`);

  // Step 2: Build HTML email
  const { html, subject } = buildEmail(content);
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
      await sendNewsletter(html, subject, [testEmail]);
      console.log("Test email sent.");
      break;
    }
    case "send": {
      const emails = loadRecipients();
      if (emails.length === 0) throw new Error("No recipients found in config/recipients.txt or STUDENT_EMAILS");
      await sendNewsletter(html, subject, emails);
      console.log(`Sent to ${emails.length} students.`);
      break;
    }
    case "broadcast": {
      const audienceId = process.env.RESEND_AUDIENCE_ID;
      if (!audienceId) throw new Error("RESEND_AUDIENCE_ID not set. Find it at https://resend.com/audiences");
      await broadcastNewsletter(html, subject, audienceId);
      console.log("Broadcast sent to Resend audience.");
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
