import "dotenv/config";
import { Resend } from "resend";
import { readFileSync } from "fs";

const resend = new Resend(process.env.RESEND_API_KEY);

const html = readFileSync("editions/issue-1.html", "utf-8");
const content = JSON.parse(readFileSync("editions/issue-1.json", "utf-8"));

console.log("=== Email Configuration ===");
console.log("FROM:", process.env.FROM_EMAIL);
console.log("TO:", process.env.TEST_EMAIL);
console.log("SUBJECT:", "The AI Pulse #1 | " + content.subjectLine);
console.log("");

async function send() {
  console.log("Sending...");

  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.TEST_EMAIL!,
    subject: "The AI Pulse #1 | " + content.subjectLine,
    html: html,
  });

  if (error) {
    console.error("ERROR:", JSON.stringify(error, null, 2));
  } else {
    console.log("SUCCESS!");
    console.log("Email ID:", data?.id);
  }
}

send();
