/**
 * template.ts — Babson-branded HTML email template builder for The AI Pulse.
 *
 * Generates fully inline-CSS HTML emails compatible with Gmail, Outlook,
 * Apple Mail, and mobile clients. Targets < 102KB to avoid Gmail clipping.
 */

import type { NewsletterContent, Tool } from "./types.js";

// ─── Brand constants ───────────────────────────────────────────────
const BABSON_GREEN = "#006644";
const OFF_WHITE = "#F5F5F0";
const DARK_CHARCOAL = "#2D2D2D";
const MEDIUM_GRAY = "#6B7280";
const LIGHT_BORDER = "#E5E5E0";
const MANGO_PUNCH = "#EEAF00";
const WARM_GOLD_BG = "#FFF8E7";
const WHITE = "#FFFFFF";
const FONT_STACK = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;

// ─── Helpers ───────────────────────────────────────────────────────
function sectionLabel(emoji: string, text: string): string {
  return `
    <tr><td style="padding: 0 0 12px 0;">
      <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${BABSON_GREEN};">
        ${emoji} ${text}
      </span>
    </td></tr>`;
}

function divider(): string {
  return `<tr><td style="padding: 24px 0;"><hr style="border: none; border-top: 1px solid ${LIGHT_BORDER}; margin: 0;" /></td></tr>`;
}

function ctaButton(text: string, url: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 16px 0;">
      <tr>
        <td style="background-color: ${BABSON_GREEN}; border-radius: 6px; padding: 12px 28px;">
          <a href="${url}" target="_blank" style="color: ${WHITE}; text-decoration: none; font-size: 15px; font-weight: 600; font-family: ${FONT_STACK};">${text}</a>
        </td>
      </tr>
    </table>`;
}

// ─── Main template builder ─────────────────────────────────────────
export function buildHTML(
  content: NewsletterContent,
  featuredTool: Tool,
  otherTools: Tool[],
  issueNumber: number,
  issueDate: string
): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>The AI Pulse — Issue #${issueNumber}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td { font-family: ${FONT_STACK}; }
    body { margin: 0; padding: 0; background-color: ${OFF_WHITE}; }
    a { color: ${BABSON_GREEN}; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .section-padding { padding: 20px 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${OFF_WHITE}; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <!-- Preheader (hidden preview text) -->
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: ${OFF_WHITE};">
    ${content.bigStory.headline} — plus free AI tools, a 5-minute tutorial, and more.
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${OFF_WHITE};">
    <tr>
      <td align="center" style="padding: 24px 8px;">

        <!-- Email container (600px max) -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="email-container" style="max-width: 600px; width: 100%; background-color: ${WHITE}; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">

          <!-- ════════ HEADER ════════ -->
          <tr>
            <td style="background-color: ${BABSON_GREEN}; padding: 32px 32px 28px 32px; text-align: center;">
              <h1 style="margin: 0 0 4px 0; font-size: 28px; font-weight: 700; color: ${WHITE}; letter-spacing: 0.5px;">The AI Pulse</h1>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.85); font-weight: 400;">AI for Entrepreneurs — Babson College</p>
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">Issue #${issueNumber} · ${issueDate}</p>
            </td>
          </tr>

          <!-- ════════ BIG STORY ════════ -->
          <tr>
            <td class="section-padding" style="padding: 28px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${sectionLabel("📡", "THIS WEEK'S BIGGEST AI STORY")}
                <tr>
                  <td style="background-color: ${OFF_WHITE}; border-left: 3px solid ${BABSON_GREEN}; border-radius: 0 6px 6px 0; padding: 20px 24px;">
                    <h2 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700; color: ${DARK_CHARCOAL}; line-height: 1.3;">${content.bigStory.headline}</h2>
                    <p style="margin: 0 0 14px 0; font-size: 15px; color: ${DARK_CHARCOAL}; line-height: 1.65;">${content.bigStory.summary}</p>
                    <p style="margin: 0 0 10px 0; font-size: 15px; font-weight: 600; color: ${BABSON_GREEN}; line-height: 1.5;">Why Babson Founders Should Care</p>
                    <p style="margin: 0 0 14px 0; font-size: 15px; color: ${DARK_CHARCOAL}; line-height: 1.65;">${content.bigStory.founderAngle}</p>
                    <a href="${content.bigStory.sourceUrl}" target="_blank" style="font-size: 13px; color: ${BABSON_GREEN}; text-decoration: underline;">Read the full story →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ════════ 3 THINGS TO KNOW ════════ -->
          <tr>
            <td class="section-padding" style="padding: 28px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${sectionLabel("📰", "3 THINGS TO KNOW")}
                ${content.threeThings
                  .map(
                    (item, i) => `
                <tr>
                  <td style="padding: ${i > 0 ? "16px" : "0"} 0 ${i < 2 ? "16px" : "0"} 0;${i < 2 ? ` border-bottom: 1px solid ${LIGHT_BORDER};` : ""}">
                    <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700; line-height: 1.3;">
                      <a href="${item.sourceUrl}" target="_blank" style="color: ${DARK_CHARCOAL}; text-decoration: none;">${item.headline}</a>
                    </h3>
                    <p style="margin: 0 0 8px 0; font-size: 15px; color: ${DARK_CHARCOAL}; line-height: 1.6;">${item.summary}</p>
                    <p style="margin: 0; font-size: 14px; color: ${BABSON_GREEN}; font-weight: 600;">Entrepreneur's takeaway → ${item.takeaway}</p>
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          ${divider()}

          <!-- ════════ FREE TOOL OF THE WEEK ════════ -->
          <tr>
            <td class="section-padding" style="padding: 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${sectionLabel("🎓", "FREE FOR BABSON STUDENTS")}
                <tr>
                  <td style="border: 2px solid ${BABSON_GREEN}; border-radius: 8px; padding: 24px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${MANGO_PUNCH};">TOOL OF THE WEEK</p>
                    <h3 style="margin: 0 0 4px 0; font-size: 20px; font-weight: 700; color: ${DARK_CHARCOAL};">${featuredTool.name}</h3>
                    <p style="margin: 0 0 14px 0; font-size: 14px; color: ${MANGO_PUNCH}; font-weight: 600;">${featuredTool.value} — ${featuredTool.duration}</p>
                    <p style="margin: 0 0 12px 0; font-size: 15px; color: ${DARK_CHARCOAL}; line-height: 1.65;">${featuredTool.description}</p>
                    <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: ${MEDIUM_GRAY};">How to claim:</p>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: ${DARK_CHARCOAL}; line-height: 1.6;">${featuredTool.claimSteps}</p>
                    ${ctaButton("Claim Free Access →", featuredTool.url)}
                  </td>
                </tr>

                <!-- Other tools list -->
                <tr>
                  <td style="padding: 16px 0 0 0;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: ${MEDIUM_GRAY}; text-transform: uppercase; letter-spacing: 1px;">More free tools:</p>
                    ${otherTools
                      .map(
                        (tool) => `
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 8px;">
                      <tr>
                        <td style="font-size: 14px; color: ${DARK_CHARCOAL}; padding: 6px 0;">
                          <strong>${tool.name}</strong> <span style="color: ${MEDIUM_GRAY};">(${tool.value})</span>
                        </td>
                        <td align="right" style="padding: 6px 0;">
                          <a href="${tool.url}" target="_blank" style="font-size: 13px; color: ${BABSON_GREEN}; font-weight: 600; text-decoration: none;">Claim →</a>
                        </td>
                      </tr>
                    </table>`
                      )
                      .join("")}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${divider()}

          <!-- ════════ QUICK WIN TUTORIAL ════════ -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${BABSON_GREEN};">
                <tr>
                  <td class="section-padding" style="padding: 28px 32px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${MANGO_PUNCH};">⚡ QUICK WIN — TRY THIS IN 5 MINUTES</p>
                    <h3 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 700; color: ${WHITE}; line-height: 1.3;">${content.tutorial.title}</h3>
                    <p style="margin: 0 0 18px 0; font-size: 15px; color: rgba(255,255,255,0.9); line-height: 1.65;">${content.tutorial.intro}</p>
                    ${content.tutorial.steps
                      .map(
                        (step, i) => `
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 12px;">
                      <tr>
                        <td width="28" valign="top" style="font-size: 15px; font-weight: 700; color: ${MANGO_PUNCH}; padding-top: 1px;">${i + 1}.</td>
                        <td style="font-size: 15px; color: rgba(255,255,255,0.92); line-height: 1.6;">${step}</td>
                      </tr>
                    </table>`
                      )
                      .join("")}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ════════ FOUNDER'S FRAMEWORK ════════ -->
          <tr>
            <td class="section-padding" style="padding: 28px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${sectionLabel("🚀", "FOUNDER'S EDGE")}
                <tr>
                  <td style="background-color: ${WARM_GOLD_BG}; border-radius: 8px; padding: 24px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: ${DARK_CHARCOAL}; line-height: 1.3;">${content.founderFramework.title}</h3>
                    <p style="margin: 0 0 18px 0; font-size: 15px; color: ${DARK_CHARCOAL}; line-height: 1.65;">${content.founderFramework.intro}</p>
                    ${content.founderFramework.steps
                      .map(
                        (step) => `
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 14px;">
                      <tr>
                        <td style="border-left: 3px solid ${MANGO_PUNCH}; padding-left: 14px;">
                          <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: ${DARK_CHARCOAL};">${step.title}</p>
                          <p style="margin: 0; font-size: 14px; color: ${DARK_CHARCOAL}; line-height: 1.6;">${step.description}</p>
                        </td>
                      </tr>
                    </table>`
                      )
                      .join("")}
                    <p style="margin: 14px 0 0 0; font-size: 14px; font-weight: 600; color: ${BABSON_GREEN}; line-height: 1.5;">💡 ${content.founderFramework.bottomLine}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${divider()}

          <!-- ════════ QUICK HITS ════════ -->
          <tr>
            <td class="section-padding" style="padding: 0 32px 28px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${sectionLabel("⚡", "QUICK HITS")}
                ${content.quickHits
                  .map(
                    (hit) => `
                <tr>
                  <td style="padding: 5px 0; font-size: 14px; color: ${DARK_CHARCOAL}; line-height: 1.6;">
                    → ${hit}
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          <!-- ════════ FOOTER ════════ -->
          <tr>
            <td style="background-color: ${BABSON_GREEN}; padding: 28px 32px; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: ${WHITE};">The AI Pulse</p>
              <p style="margin: 0 0 8px 0; font-size: 13px; color: rgba(255,255,255,0.8);">AI for Entrepreneurs — Babson College</p>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: rgba(255,255,255,0.6);">Built by Babson students for Babson students.</p>
              <p style="margin: 0 0 16px 0; font-size: 12px; color: rgba(255,255,255,0.6);">Researched with AI. Curated by humans.</p>
              <p style="margin: 0;">
                <a href="{{unsubscribe_url}}" target="_blank" style="font-size: 12px; color: rgba(255,255,255,0.5); text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Email container -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}
