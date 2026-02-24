/**
 * Send newsletter to all contacts individually
 * Works with test domain (onboarding@resend.dev)
 */
import "dotenv/config";
import { readFileSync } from "fs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID!;

// Load Issue #1
const html = readFileSync("editions/issue-1.html", "utf-8");
const content = JSON.parse(readFileSync("editions/issue-1.json", "utf-8"));
const subject = `The AI Pulse #1 | ${content.subjectLine}`;
const from = process.env.FROM_EMAIL || "The AI Pulse <onboarding@resend.dev>";

async function sendToAll() {
  console.log("Fetching contacts from audience...");

  const { data: contacts, error } = await resend.contacts.list({ audienceId });

  if (error) {
    console.error("Failed to fetch contacts:", error);
    process.exit(1);
  }

  const activeContacts = contacts?.data?.filter((c) => !c.unsubscribed) || [];
  console.log(`\nSending to ${activeContacts.length} contacts`);
  console.log(`Subject: ${subject}`);
  console.log(`From: ${from}\n`);

  let sent = 0;
  let failed = 0;

  for (const contact of activeContacts) {
    const { error: sendError } = await resend.emails.send({
      from,
      to: contact.email,
      subject,
      html,
    });

    if (sendError) {
      console.error(`FAILED: ${contact.email} - ${JSON.stringify(sendError)}`);
      failed++;
    } else {
      console.log(`Sent: ${contact.email}`);
      sent++;
    }

    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(`\n=============================`);
  console.log(`COMPLETE: ${sent} sent, ${failed} failed`);
  console.log(`=============================`);
}

sendToAll();
