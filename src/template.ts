/**
 * HTML email template for The AI Pulse newsletter.
 * Clean editorial design — text-forward, minimal color, typography-driven.
 */

import type { NewsletterContent, Tool } from "./types.js";

// ─── Palette ─────────────────────────────────────────────────────────
const GREEN = "#006644";
const WHITE = "#FFFFFF";
const DARK = "#1a1a1a";
const TEXT = "#3d3d3d";
const TEXT_MID = "#6b6b6b";
const RULE = "#e0e0e0";
const BG = "#f4f4f4";
const FONT = `'Georgia', 'Times New Roman', Times, serif`;
const SANS = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;

export function buildHTML(
  content: NewsletterContent,
  featuredTool: Tool,
  otherTools: Tool[],
  issueNumber: number,
  issueDate: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The AI Pulse — Issue #${issueNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${BG}; font-family: ${SANS}; -webkit-text-size-adjust: 100%;">

  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; color: ${BG};">
    ${content.bigStory.headline} — plus free AI tools and founder frameworks.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${BG};">
    <tr>
      <td align="center" style="padding: 20px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">

          <!-- ══════ HEADER ══════ -->
          <tr>
            <td style="padding: 0 0 20px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="font-family: ${SANS}; font-size: 22px; font-weight: 700; color: ${DARK}; margin: 0; letter-spacing: -0.3px;">The AI Pulse</p>
                  </td>
                  <td align="right" valign="bottom">
                    <p style="font-family: ${SANS}; font-size: 12px; color: ${TEXT_MID}; margin: 0;">Issue #${issueNumber}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 2px;">
                    <p style="font-family: ${SANS}; font-size: 12px; color: ${TEXT_MID}; margin: 0;">Babson College · AI for Entrepreneurs</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══════ BODY ══════ -->
          <tr>
            <td style="background-color: ${WHITE}; border-radius: 4px;">

              <!-- WEEK TOPIC + LEAD STORY -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 32px 32px 0 32px;">
                    <p style="font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: ${GREEN}; margin: 0 0 16px 0;">${content.weekTopic}</p>
                    <h1 style="font-family: ${FONT}; font-size: 24px; font-weight: 700; color: ${DARK}; line-height: 1.3; margin: 0 0 12px 0;">${content.bigStory.headline}</h1>
                    <p style="font-family: ${SANS}; font-size: 15px; color: ${TEXT}; line-height: 1.65; margin: 0 0 12px 0;">${content.bigStory.summary}</p>
                    <a href="${content.bigStory.sourceUrl}" target="_blank" style="font-family: ${SANS}; color: ${GREEN}; font-size: 14px; font-weight: 500; text-decoration: none;">Read more &#8594;</a>
                  </td>
                </tr>
              </table>

              <!-- CLASS CONNECTION -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 32px 0 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="border-left: 2px solid ${GREEN}; padding: 2px 0 2px 16px;">
                          <p style="font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: ${TEXT_MID}; margin: 0 0 6px 0;">Babson Connection</p>
                          <p style="font-family: ${SANS}; font-size: 14px; color: ${TEXT}; line-height: 1.6; margin: 0; font-style: italic;">${content.classConnection}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- DIVIDER -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 28px 32px 0 32px;"><div style="height: 1px; background-color: ${RULE};"></div></td></tr>
              </table>

              <!-- THIS WEEK IN AI -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 32px 0 32px;">
                    <p style="font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: ${TEXT_MID}; margin: 0 0 18px 0;">This Week in AI</p>
                  </td>
                </tr>
              </table>

              ${content.threeThings
                .map(
                  (item, i) => `
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 0 32px ${i < content.threeThings.length - 1 ? "20px" : "0"} 32px;">
                    <a href="${item.sourceUrl}" target="_blank" style="font-family: ${FONT}; color: ${DARK}; text-decoration: none; font-size: 17px; font-weight: 700; line-height: 1.35;">${item.headline}</a>
                    <p style="font-family: ${SANS}; color: ${TEXT}; font-size: 14px; line-height: 1.6; margin: 6px 0 0 0;">${item.summary} ${item.takeaway}</p>${i < content.threeThings.length - 1 ? `
                    <div style="height: 1px; background-color: ${RULE}; margin-top: 20px;"></div>` : ""}
                  </td>
                </tr>
              </table>`
                )
                .join("")}

              <!-- DIVIDER -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 28px 32px 0 32px;"><div style="height: 1px; background-color: ${RULE};"></div></td></tr>
              </table>

              <!-- FOUNDER'S EDGE -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 32px 0 32px;">
                    <p style="font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: ${TEXT_MID}; margin: 0 0 12px 0;">Founder's Edge</p>
                    <p style="font-family: ${FONT}; color: ${DARK}; font-size: 19px; font-weight: 700; line-height: 1.35; margin: 0 0 10px 0;">${content.founderFramework.title}</p>
                    <p style="font-family: ${SANS}; color: ${TEXT}; font-size: 14px; line-height: 1.65; margin: 0 0 16px 0;">${content.founderFramework.intro}</p>
                    ${content.founderFramework.steps
                      .map(
                        (step, i) => `
                    <p style="font-family: ${SANS}; color: ${DARK}; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">${i + 1}. ${step.title}</p>
                    <p style="font-family: ${SANS}; color: ${TEXT}; font-size: 14px; line-height: 1.6; margin: 0 0 14px 0;">${step.description}</p>`
                      )
                      .join("")}
                    <p style="font-family: ${SANS}; color: ${GREEN}; font-size: 14px; font-weight: 600; margin: 4px 0 0 0;">${content.founderFramework.bottomLine}</p>
                  </td>
                </tr>
              </table>

              <!-- DIVIDER -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 28px 32px 0 32px;"><div style="height: 1px; background-color: ${RULE};"></div></td></tr>
              </table>

              <!-- FREE STUDENT AI TOOLS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 32px 0 32px;">
                    <p style="font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: ${TEXT_MID}; margin: 0 0 16px 0;">Free for Babson Students</p>

                    <!-- Featured tool -->
                    <p style="font-family: ${FONT}; color: ${DARK}; font-size: 17px; font-weight: 700; margin: 0 0 4px 0;">${featuredTool.name}</p>
                    <p style="font-family: ${SANS}; color: ${TEXT_MID}; font-size: 13px; margin: 0 0 8px 0;">${featuredTool.duration} &middot; ${featuredTool.value} &middot; ${featuredTool.category}</p>
                    <p style="font-family: ${SANS}; color: ${TEXT}; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">${featuredTool.description}</p>
                    <p style="font-family: ${SANS}; color: ${TEXT}; font-size: 13px; line-height: 1.6; margin: 0 0 14px 0;"><strong style="color: ${DARK};">How to claim:</strong> ${featuredTool.claimSteps}</p>
                    <a href="${featuredTool.url}" target="_blank" style="display: inline-block; font-family: ${SANS}; background-color: ${GREEN}; color: ${WHITE}; font-size: 13px; font-weight: 600; padding: 10px 22px; border-radius: 4px; text-decoration: none;">Get ${featuredTool.name} Free &#8594;</a>

                    <!-- Other tools -->
                    ${otherTools.length > 0 ? `
                    <p style="font-family: ${SANS}; font-size: 12px; font-weight: 600; color: ${TEXT_MID}; text-transform: uppercase; letter-spacing: 0.8px; margin: 24px 0 10px 0;">Also free right now</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${otherTools
                        .map(
                          (tool, i) => `
                      <tr>
                        <td style="padding: 8px 0;${i < otherTools.length - 1 ? ` border-bottom: 1px solid ${RULE};` : ""}">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td>
                                <p style="font-family: ${SANS}; color: ${DARK}; font-size: 14px; font-weight: 600; margin: 0;">${tool.name}</p>
                                <p style="font-family: ${SANS}; color: ${TEXT_MID}; font-size: 12px; margin: 2px 0 0 0;">${tool.duration} &middot; ${tool.value}</p>
                              </td>
                              <td align="right" valign="middle" style="white-space: nowrap; padding-left: 12px;">
                                <a href="${tool.url}" target="_blank" style="font-family: ${SANS}; color: ${GREEN}; font-size: 13px; font-weight: 500; text-decoration: none;">Claim &#8594;</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>`
                        )
                        .join("")}
                    </table>` : ""}
                  </td>
                </tr>
              </table>

              <!-- DIVIDER -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 28px 32px 0 32px;"><div style="height: 1px; background-color: ${RULE};"></div></td></tr>
              </table>

              <!-- AI IN YOUR BUSINESS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 32px 0 32px;">
                    <p style="font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: ${TEXT_MID}; margin: 0 0 12px 0;">AI in Your Business</p>
                    <p style="font-family: ${FONT}; color: ${DARK}; font-size: 17px; font-weight: 700; margin: 0 0 14px 0; line-height: 1.35;">${content.aiInBusiness.title}</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${content.aiInBusiness.workflows
                        .map(
                          (wf, i) => `
                      <tr>
                        <td style="padding: 8px 0;${i < content.aiInBusiness.workflows.length - 1 ? ` border-bottom: 1px solid ${RULE};` : ""}">
                          <p style="font-family: ${SANS}; color: ${DARK}; font-size: 14px; font-weight: 600; margin: 0 0 3px 0;">${wf.title}</p>
                          <p style="font-family: ${SANS}; color: ${TEXT}; font-size: 14px; line-height: 1.6; margin: 0;">${wf.description}</p>
                        </td>
                      </tr>`
                        )
                        .join("")}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- DIVIDER -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 28px 32px 0 32px;"><div style="height: 1px; background-color: ${RULE};"></div></td></tr>
              </table>

              <!-- QUICK HITS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 32px 0 32px;">
                    <p style="font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: ${TEXT_MID}; margin: 0 0 14px 0;">Quick Hits</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${content.quickHits
                        .map(
                          (hit) => `
                      <tr>
                        <td style="padding: 5px 0; font-family: ${SANS}; color: ${TEXT}; font-size: 14px; line-height: 1.6;">
                          &ndash;&ensp;${hit}
                        </td>
                      </tr>`
                        )
                        .join("")}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- NEXT WEEK -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 28px 32px 32px 32px;">
                    <p style="font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: ${TEXT_MID}; margin: 0 0 6px 0;">Next Week</p>
                    <p style="font-family: ${SANS}; color: ${TEXT}; font-size: 14px; line-height: 1.55; margin: 0;">${content.nextWeek}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ══════ FOOTER ══════ -->
          <tr>
            <td style="padding: 24px 0 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="font-family: ${SANS}; font-size: 12px; color: ${TEXT_MID}; margin: 0;">The AI Pulse &middot; Babson College</p>
                    <p style="font-family: ${SANS}; font-size: 11px; color: #999; margin: 8px 0 0 0;">
                      <a href="{{unsubscribe_url}}" target="_blank" style="color: #999; text-decoration: underline;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
