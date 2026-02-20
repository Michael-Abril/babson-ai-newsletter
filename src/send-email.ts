import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendToRecipient(
  html: string,
  subject: string,
  to: string
): Promise<void> {
  const from = process.env.FROM_EMAIL || "The AI Pulse <onboarding@resend.dev>";

  console.log(`Sending to ${to}...`);
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error(`RESEND ERROR for ${to}:`, JSON.stringify(error));
    throw new Error(`Failed to send to ${to}: ${JSON.stringify(error)}`);
  }

  console.log(`Sent to ${to} - id: ${data?.id}`);
}

export async function sendBroadcast(
  html: string,
  subject: string
): Promise<void> {
  const from = process.env.FROM_EMAIL || "The AI Pulse <onboarding@resend.dev>";
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    throw new Error("RESEND_AUDIENCE_ID not set. Add your Resend audience ID as a GitHub secret.");
  }

  console.log(`Creating broadcast to audience ${audienceId}...`);
  console.log(`From: ${from}`);
  console.log(`Subject: ${subject}`);

  const { data: broadcast, error: createError } = await resend.broadcasts.create({
    audienceId,
    from,
    subject,
    html,
    name: `The AI Pulse - ${new Date().toISOString().split("T")[0]}`,
  });

  if (createError) {
    console.error("BROADCAST CREATE ERROR:", JSON.stringify(createError));
    throw new Error(`Failed to create broadcast: ${JSON.stringify(createError)}`);
  }

  console.log(`Broadcast created - id: ${broadcast?.id}. Sending...`);

  const { error: sendError } = await resend.broadcasts.send(broadcast!.id);

  if (sendError) {
    console.error("BROADCAST SEND ERROR:", JSON.stringify(sendError));
    throw new Error(`Failed to send broadcast: ${JSON.stringify(sendError)}`);
  }

  console.log(`Broadcast sent successfully - id: ${broadcast?.id}`);
}
