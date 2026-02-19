import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter(
  html: string,
  subject: string,
  recipients: string[]
): Promise<void> {
  const from = process.env.FROM_EMAIL || "The AI Pulse <onboarding@resend.dev>";

  for (const to of recipients) {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      headers: {
        "List-Unsubscribe": "<mailto:unsubscribe@babson.edu>",
      },
    });

    if (error) {
      console.error(`Failed to send to ${to}:`, error);
    } else {
      console.log(`Sent to ${to}`);
    }
  }
}
