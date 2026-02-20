import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter(
  html: string,
  subject: string,
  recipients: string[]
): Promise<void> {
  // Resend free tier requires sending from onboarding@resend.dev
  const from = process.env.FROM_EMAIL || "The AI Pulse <onboarding@resend.dev>";

  console.log(`From: ${from}`);
  console.log(`Recipients: ${recipients.join(", ")}`);
  console.log(`Subject: ${subject}`);

  for (const to of recipients) {
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
}

export async function broadcastNewsletter(
  html: string,
  subject: string,
  audienceId: string
): Promise<void> {
  const from = process.env.FROM_EMAIL || "The AI Pulse <onboarding@resend.dev>";

  console.log(`From: ${from}`);
  console.log(`Audience ID: ${audienceId}`);
  console.log(`Subject: ${subject}`);

  // Step 1: Create the broadcast
  console.log("Creating broadcast...");
  const { data: broadcast, error: createError } = await resend.broadcasts.create({
    audienceId,
    from,
    subject,
    html,
  });

  if (createError) {
    console.error("RESEND BROADCAST CREATE ERROR:", JSON.stringify(createError));
    throw new Error(`Failed to create broadcast: ${JSON.stringify(createError)}`);
  }

  console.log(`Broadcast created - id: ${broadcast?.id}`);

  // Step 2: Send the broadcast
  console.log("Sending broadcast...");
  const { data: sendResult, error: sendError } = await resend.broadcasts.send(broadcast!.id);

  if (sendError) {
    console.error("RESEND BROADCAST SEND ERROR:", JSON.stringify(sendError));
    throw new Error(`Failed to send broadcast: ${JSON.stringify(sendError)}`);
  }

  console.log(`Broadcast sent successfully - id: ${sendResult?.id}`);
}
