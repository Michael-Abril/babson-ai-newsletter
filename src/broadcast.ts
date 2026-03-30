/**
 * Broadcast newsletter to Resend audience
 * Usage: npx tsx src/broadcast.ts
 */

import "dotenv/config";
import { readFileSync } from "fs";
import { Resend } from "resend";

const dateStr = new Date().toISOString().split("T")[0];
const htmlPath = `output/newsletter-${dateStr}.html`;
const jsonPath = `output/newsletter-${dateStr}.json`;

const html = readFileSync(htmlPath, "utf-8");
const content = JSON.parse(readFileSync(jsonPath, "utf-8"));

const fromEmail = process.env.FROM_EMAIL;
const resendKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;

if (!fromEmail || !resendKey || !audienceId) {
  console.error("Missing required env vars: FROM_EMAIL, RESEND_API_KEY, RESEND_AUDIENCE_ID");
  process.exit(1);
}

const resend = new Resend(resendKey);

async function main() {
  const subjectLine = `The AI Pulse | ${content.subjectLine}`;

  console.log(`Broadcasting to audience: ${audienceId}`);
  console.log(`Subject: ${subjectLine}`);
  console.log(`From: ${fromEmail}`);

  const result = await resend.broadcasts.create({
    audienceId: audienceId,
    from: fromEmail,
    subject: subjectLine,
    html: html,
  });

  if (result.error) {
    console.error("Error creating broadcast:", result.error);
    process.exit(1);
  }

  console.log(`\nBroadcast created! ID: ${result.data?.id}`);

  // Send the broadcast
  if (result.data?.id) {
    const sendResult = await resend.broadcasts.send(result.data.id);
    if (sendResult.error) {
      console.error("Error sending broadcast:", sendResult.error);
      process.exit(1);
    }
    console.log(`Broadcast sent successfully!`);
  }
}

main();
