import { writeFileSync, mkdirSync } from "fs";
import { generateNewsletter } from "./generate-newsletter.js";
import { buildEmail } from "./build-email.js";
import { sendToRecipient, sendBroadcast } from "./send-email.js";

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
      await sendToRecipient(html, subject, testEmail);
      console.log("Test email sent.");
      break;
    }
    case "send": {
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
