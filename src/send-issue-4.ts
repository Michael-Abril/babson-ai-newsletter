import "dotenv/config";
import { readFileSync, existsSync } from "fs";
import { sendToRecipient, sendBroadcast } from "./send-email.js";

const mode = process.env.MODE || "preview";

async function main() {
  console.log(`Sending Issue #4 in ${mode} mode...`);

  // Load generated content
  const htmlPath = "editions/issue-4.html";
  const jsonPath = "editions/issue-4.json";

  if (!existsSync(htmlPath) || !existsSync(jsonPath)) {
    throw new Error("Issue #4 files not found in editions/");
  }

  const html = readFileSync(htmlPath, "utf-8");
  const content = JSON.parse(readFileSync(jsonPath, "utf-8"));
  const subject = `The AI Pulse | ${content.subjectLine}`;

  console.log(`Subject: ${content.subjectLine}`);
  console.log(`Week Topic: ${content.weekTopic}`);
  console.log(`HTML size: ${(Buffer.byteLength(html) / 1024).toFixed(1)}KB`);

  switch (mode) {
    case "preview": {
      console.log(`Preview mode - no email sent.`);
      console.log(`Open editions/issue-4.html in browser to view.`);
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
