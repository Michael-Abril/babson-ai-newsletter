import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const broadcastId = process.argv[2] || "57cf99cd-06dc-48d9-8269-74de063aa6a0";

async function checkStatus() {
  console.log(`Checking broadcast ${broadcastId}...\n`);

  try {
    const { data, error } = await resend.broadcasts.get(broadcastId);

    if (error) {
      console.error("Error:", JSON.stringify(error, null, 2));
      return;
    }

    console.log("Broadcast Status:");
    console.log("  ID:", data?.id);
    console.log("  Name:", data?.name);
    console.log("  Status:", data?.status);
    console.log("  Audience ID:", data?.audience_id);
    console.log("  Created:", data?.created_at);
    console.log("  Scheduled:", data?.scheduled_at);
    console.log("  Sent:", data?.sent_at || "Not yet sent");
  } catch (e) {
    console.error("Exception:", e);
  }
}

checkStatus();
