/**
 * Babson-branded HTML email template for The AI Pulse.
 * Babson Green palette. Inline CSS for email client compatibility.
 */

import type { NewsletterContent, Tool } from "./types.js";

// ─── Babson Green palette ──────────────────────────────────────────
const GREEN = "#006644";
const GREEN_LIGHT = "#E8F5EE";
const ACCENT = "#EEAF00";
const ACCENT_LIGHT = "#FFF8E7";
const BG = "#EEF2F0";
const WHITE = "#FFFFFF";
const DARK = "#1A2E1A";
const TEXT = "#4A5568";
const TEXT_LIGHT = "#6B7280";
const BORDER = "#E2E8E0";
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;

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
<body style="margin: 0; padding: 0; background-color: ${BG}; font-family: ${FONT};">

  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; color: ${BG};">
    ${content.bigStory.headline} — plus free AI tools and founder frameworks.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${BG};">
    <tr>
      <td align="center" style="padding: 24px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" width="620" style="max-width: 620px; width: 100%;">

          <!-- ══════ HEADER ══════ -->
          <tr>
            <td style="background-color: ${GREEN}; border-radius: 10px 10px 0 0; padding: 0;">
              <!-- Top bar -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 16px 28px 0 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <p style="color: rgba(255,255,255,0.7); font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">Babson College</p>
                        </td>
                        <td align="right">
                          <span style="display: inline-block; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.85); font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.8px;">Issue #${issueNumber}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Title -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 28px 6px 28px;">
                    <h1 style="color: ${WHITE}; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">The AI Pulse</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 28px;">
                    <p style="color: rgba(255,255,255,0.75); font-size: 14px; margin: 0;">AI for Entrepreneurs — Weekly Briefing</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 18px 28px 0 28px;">
                    <div style="height: 1px; background: rgba(255,255,255,0.2);"></div>
                  </td>
                </tr>
              </table>

              <!-- This week topic -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 16px 28px 24px 28px;">
                    <p style="color: rgba(255,255,255,0.6); font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 6px 0;">This week</p>
                    <p style="color: ${WHITE}; font-size: 18px; font-weight: 600; margin: 0;">${content.weekTopic}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══════ BODY ══════ -->
          <tr>
            <td style="background-color: ${WHITE}; padding: 0;">

              <!-- LEAD STORY -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 28px 28px 20px 28px;">
                    <p style="color: ${ACCENT}; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 10px 0;">📡 Lead Story</p>
                    <h2 style="color: ${DARK}; font-size: 21px; font-weight: 700; line-height: 1.35; margin: 0 0 12px 0;">${content.bigStory.headline}</h2>
                    <p style="color: ${TEXT}; font-size: 14px; line-height: 1.65; margin: 0 0 10px 0;">${content.bigStory.summary}</p>
                    <a href="${content.bigStory.sourceUrl}" target="_blank" style="color: ${GREEN}; font-size: 13px; font-weight: 500; text-decoration: none;">Read the full story →</a>
                  </td>
                </tr>
              </table>

              <!-- CLASS CONNECTION -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 0 28px 24px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${GREEN_LIGHT}; border-radius: 6px; border-left: 3px solid ${GREEN};">
                      <tr>
                        <td style="padding: 16px 18px;">
                          <p style="color: ${GREEN}; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 8px 0;">📚 Connecting to Babson</p>
                          <p style="color: ${DARK}; font-size: 13.5px; line-height: 1.6; margin: 0;">${content.classConnection}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- DIVIDER -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 0 28px;"><div style="height: 1px; background-color: ${BORDER};"></div></td></tr>
              </table>

              <!-- THIS WEEK IN AI — 3 Stories -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 28px 8px 28px;">
                    <p style="color: ${DARK}; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">This Week in AI</p>
                  </td>
                </tr>
              </table>

              ${content.threeThings
                .map(
                  (item, i) => `
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: ${i === 0 ? "16px" : "0"} 28px ${i < content.threeThings.length - 1 ? "16px" : "24px"} 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: ${i < content.threeThings.length - 1 ? "16px" : "0"};${i < content.threeThings.length - 1 ? ` border-bottom: 1px solid ${BORDER};` : ""}">
                          <a href="${item.sourceUrl}" target="_blank" style="color: ${DARK}; text-decoration: none; font-size: 15px; font-weight: 600; line-height: 1.4;">${item.headline}</a>
                          <p style="color: ${TEXT}; font-size: 13.5px; line-height: 1.6; margin: 6px 0 6px 0;">${item.summary}</p>
                          <p style="color: ${GREEN}; font-size: 12.5px; font-weight: 500; margin: 0;">Why entrepreneurs should care → ${item.takeaway}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>`
                )
                .join("")}

              <!-- DIVIDER -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 0 28px;"><div style="height: 1px; background-color: ${BORDER};"></div></td></tr>
              </table>

              <!-- FOUNDER'S EDGE -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${GREEN}; border-radius: 8px;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="color: ${ACCENT}; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 6px 0;">🚀 Founder's Edge</p>
                          <p style="color: ${WHITE}; font-size: 17px; font-weight: 600; margin: 0 0 14px 0; line-height: 1.35;">${content.founderFramework.title}</p>
                          <p style="color: rgba(255,255,255,0.8); font-size: 13.5px; line-height: 1.65; margin: 0 0 14px 0;">${content.founderFramework.intro}</p>
                          ${content.founderFramework.steps
                            .map(
                              (step, i) => `
                          <p style="color: ${WHITE}; font-size: 13px; font-weight: 600; margin: 0 0 5px 0;">${i + 1}. ${step.title}</p>
                          <p style="color: rgba(255,255,255,0.8); font-size: 13px; line-height: 1.6; margin: 0 0 12px 0;">${step.description}</p>`
                            )
                            .join("")}
                          <p style="color: ${ACCENT}; font-size: 13px; font-weight: 600; margin: 12px 0 0 0;">${content.founderFramework.bottomLine}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- FREE STUDENT AI TOOLS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 0 28px 24px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 2px solid ${GREEN}; border-radius: 8px; overflow: hidden;">

                      <!-- Section header -->
                      <tr>
                        <td style="background-color: ${GREEN}; padding: 12px 20px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td>
                                <p style="color: ${WHITE}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">🎓 Free for Babson Students</p>
                              </td>
                              <td align="right">
                                <span style="color: rgba(255,255,255,0.7); font-size: 11px; font-weight: 600;">Use your .edu email</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Featured tool -->
                      <tr>
                        <td style="background-color: ${WHITE}; padding: 20px;">
                          <p style="color: ${DARK}; font-size: 17px; font-weight: 700; margin: 0 0 4px 0;">${featuredTool.name} — ${featuredTool.duration}</p>
                          <p style="color: ${GREEN}; font-size: 13px; font-weight: 600; margin: 0 0 10px 0;">${featuredTool.value} · ${featuredTool.category}</p>
                          <p style="color: ${TEXT}; font-size: 13.5px; line-height: 1.6; margin: 0 0 12px 0;">${featuredTool.description}</p>
                          <p style="color: ${DARK}; font-size: 13px; font-weight: 600; margin: 0 0 4px 0;">How to claim:</p>
                          <p style="color: ${TEXT}; font-size: 13px; line-height: 1.6; margin: 0 0 14px 0;">${featuredTool.claimSteps}</p>
                          <a href="${featuredTool.url}" target="_blank" style="display: inline-block; background-color: ${GREEN}; color: ${WHITE}; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Claim ${featuredTool.name} Free →</a>
                        </td>
                      </tr>

                      <!-- Other tools -->
                      <tr>
                        <td style="background-color: ${GREEN_LIGHT}; padding: 16px 20px; border-top: 1px solid ${BORDER};">
                          <p style="color: ${DARK}; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 12px 0;">Also free for students right now:</p>
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                            ${otherTools
                              .map(
                                (tool, i) => `
                            <tr>
                              <td style="padding: 8px 0;${i < otherTools.length - 1 ? ` border-bottom: 1px solid ${BORDER};` : ""}">
                                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td>
                                      <p style="color: ${DARK}; font-size: 13px; font-weight: 600; margin: 0;">${tool.name}</p>
                                      <p style="color: ${TEXT}; font-size: 12px; margin: 2px 0 0 0;">${tool.duration} (${tool.value})</p>
                                    </td>
                                    <td align="right" valign="top" style="white-space: nowrap; padding-left: 12px;">
                                      <a href="${tool.url}" target="_blank" style="color: ${GREEN}; font-size: 12px; font-weight: 600; text-decoration: none;">Claim →</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>`
                              )
                              .join("")}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- AI IN YOUR BUSINESS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 0 28px 24px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid ${ACCENT}; background-color: ${ACCENT_LIGHT}; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px 22px;">
                          <p style="color: ${ACCENT}; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 8px 0;">💼 AI in Your Business</p>
                          <p style="color: ${DARK}; font-size: 15px; font-weight: 600; margin: 0 0 10px 0; line-height: 1.35;">${content.aiInBusiness.title}</p>
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                            ${content.aiInBusiness.workflows
                              .map(
                                (wf, i) => `
                            <tr>
                              <td style="padding: 8px 0;${i < content.aiInBusiness.workflows.length - 1 ? ` border-bottom: 1px solid #FAE6D8;` : ""}">
                                <p style="color: ${DARK}; font-size: 13px; font-weight: 600; margin: 0 0 4px 0;">${wf.title}</p>
                                <p style="color: ${TEXT}; font-size: 13px; line-height: 1.55; margin: 0;">${wf.description}</p>
                              </td>
                            </tr>`
                              )
                              .join("")}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- DIVIDER -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 0 28px;"><div style="height: 1px; background-color: ${BORDER};"></div></td></tr>
              </table>

              <!-- QUICK HITS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 24px 28px 20px 28px;">
                    <p style="color: ${DARK}; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 14px 0;">⚡ Quick Hits</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${content.quickHits
                        .map(
                          (hit) => `
                      <tr>
                        <td style="padding: 6px 0; color: ${TEXT}; font-size: 13px; line-height: 1.55;">
                          <span style="color: ${GREEN}; font-weight: 700;">→</span>&nbsp; ${hit}
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
                  <td style="padding: 0 28px 28px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${GREEN_LIGHT}; border-radius: 6px;">
                      <tr>
                        <td style="padding: 16px 18px;">
                          <p style="color: ${GREEN}; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 6px 0;">👀 Next Week</p>
                          <p style="color: ${DARK}; font-size: 13.5px; line-height: 1.55; margin: 0;">${content.nextWeek}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ══════ FOOTER ══════ -->
          <tr>
            <td style="background-color: ${GREEN}; border-radius: 0 0 10px 10px; padding: 24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="color: ${WHITE}; font-size: 13px; font-weight: 600; margin: 0 0 2px 0;">The AI Pulse</p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 12px 0;">AI for Entrepreneurs · Babson College</p>
                    <div style="height: 1px; background: rgba(255,255,255,0.15); margin: 0 0 12px 0;"></div>
                    <p style="color: rgba(255,255,255,0.5); font-size: 11px; line-height: 1.5; margin: 0;">Built by Babson students for Babson students.</p>
                    <p style="color: rgba(255,255,255,0.5); font-size: 11px; line-height: 1.5; margin: 4px 0 0 0;">Researched with AI. Curated by humans.</p>
                    <p style="margin: 12px 0 0 0;">
                      <a href="{{unsubscribe_url}}" target="_blank" style="font-size: 11px; color: rgba(255,255,255,0.4); text-decoration: underline;">Unsubscribe</a>
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
