import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  const { data, error } = await resend.audiences.list();

  if (error) {
    console.error("Error:", JSON.stringify(error));
    process.exit(1);
  }

  if (!data?.data?.length) {
    console.log("No audiences found. Create one at https://resend.com/audiences");
    return;
  }

  console.log("\nYour Resend Audiences:\n");
  for (const audience of data.data) {
    console.log(`  Name: ${audience.name}`);
    console.log(`  ID:   ${audience.id}`);
    console.log("");
  }

  console.log("Copy the ID above and add it to your .env file as:");
  console.log("RESEND_AUDIENCE_ID=<the id>");
}

main();
