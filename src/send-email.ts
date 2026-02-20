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
