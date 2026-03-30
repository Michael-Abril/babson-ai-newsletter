/**
 * Send test email with existing HTML
 * Usage: npx tsx src/send-test.ts
 */

import "dotenv/config";
import { readFileSync } from "fs";
import { Resend } from "resend";

const dateStr = new Date().toISOString().split("T")[0];
const htmlPath = `output/newsletter-${dateStr}.html`;
const jsonPath = `output/newsletter-${dateStr}.json`;

const html = readFileSync(htmlPath, "utf-8");
const content = JSON.parse(readFileSync(jsonPath, "utf-8"));

const testEmail = process.env.TEST_EMAIL;
const fromEmail = process.env.FROM_EMAIL;
const resendKey = process.env.RESEND_API_KEY;

if (!testEmail || !fromEmail || !resendKey) {
  console.error("Missing required env vars: TEST_EMAIL, FROM_EMAIL, RESEND_API_KEY");
  process.exit(1);
}

const resend = new Resend(resendKey);

async function main() {
  const subjectLine = `The AI Pulse | ${content.subjectLine}`;

  console.log(`Sending test email to ${testEmail}...`);
  console.log(`Subject: ${subjectLine}`);

  const result = await resend.emails.send({
    from: fromEmail,
    to: testEmail,
    subject: subjectLine,
    html: html,
  });

  if (result.error) {
    console.error("Error sending email:", result.error);
    process.exit(1);
  }

  console.log(`Test email sent! ID: ${result.data?.id}`);
}

main();
