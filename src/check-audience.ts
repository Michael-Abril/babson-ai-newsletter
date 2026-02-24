import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function checkAudience() {
  console.log("Checking audience...\n");

  try {
    // Check audience
    const { data: audience, error: audError } = await resend.audiences.get(
      "4274c8c3-5172-40f2-9f28-3cafa2c5a07b"
    );

    if (audError) {
      console.error("Audience error:", audError);
      return;
    }

    console.log("Audience:", audience?.name);
    console.log("ID:", audience?.id);
    console.log("Created:", audience?.created_at);

    // List contacts
    const { data: contacts, error: conError } = await resend.contacts.list({
      audienceId: "4274c8c3-5172-40f2-9f28-3cafa2c5a07b",
    });

    if (conError) {
      console.error("Contacts error:", conError);
      return;
    }

    console.log("\nContacts:", contacts?.data?.length || 0);
    if (contacts?.data) {
      contacts.data.forEach((c) => console.log("  -", c.email, c.unsubscribed ? "(unsubscribed)" : ""));
    }
  } catch (e) {
    console.error("Exception:", e);
  }
}

checkAudience();
