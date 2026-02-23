/**
 * Professional HTML email template for The AI Pulse newsletter.
 *
 * Design Principles:
 * - Editorial elegance (NYT, The Hustle, Morning Brew inspired)
 * - Typography-driven hierarchy
 * - Generous white space
 * - Subtle brand accent
 * - Mobile-first (16px base, touch-friendly)
 */

import type { NewsletterContent, Tool } from "./types.js";

// ─── Design Tokens ─────────────────────────────────────────────────────────
const BRAND = {
  green: "#006644",
  greenLight: "#e8f5e9",
  greenDark: "#004d33",
};

const COLORS = {
  white: "#FFFFFF",
  bg: "#f7f7f7",
  dark: "#111111",
  text: "#333333",
  textMuted: "#666666",
  textLight: "#999999",
  border: "#e5e5e5",
  borderLight: "#f0f0f0",
  accent: BRAND.green,
  accentBg: "#f0f7f4",
  promptBg: "#fafafa",
};

const FONTS = {
  serif: `'Georgia', 'Times New Roman', serif`,
  sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  mono: `'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace`,
};

// ─── Helper: Section Label ─────────────────────────────────────────────────
const sectionLabel = (text: string) => `
  <p style="
    font-family: ${FONTS.sans};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${COLORS.textMuted};
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid ${BRAND.green};
    display: inline-block;
  ">${text}</p>
`;

// ─── Helper: Divider ───────────────────────────────────────────────────────
const divider = (padding = "32px") => `
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: ${padding} 0 0 0;">
        <div style="height: 1px; background: linear-gradient(to right, ${COLORS.border}, ${COLORS.borderLight});"></div>
      </td>
    </tr>
  </table>
`;

// ─── Helper: CTA Button ────────────────────────────────────────────────────
const ctaButton = (text: string, url: string, primary = true) => `
  <a href="${url}" target="_blank" style="
    display: inline-block;
    font-family: ${FONTS.sans};
    font-size: 14px;
    font-weight: 600;
    padding: 12px 28px;
    border-radius: 6px;
    text-decoration: none;
    ${primary
      ? `background-color: ${BRAND.green}; color: ${COLORS.white};`
      : `background-color: ${COLORS.white}; color: ${BRAND.green}; border: 2px solid ${BRAND.green};`
    }
  ">${text}</a>
`;

// ─── Helper: Prompt Box ────────────────────────────────────────────────────
const promptBox = (prompt: string) => `
  <div style="
    background-color: ${COLORS.promptBg};
    border-left: 3px solid ${BRAND.green};
    border-radius: 0 8px 8px 0;
    padding: 14px 16px;
    margin: 12px 0 16px 0;
  ">
    <p style="
      font-family: ${FONTS.sans};
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: ${BRAND.green};
      margin: 0 0 8px 0;
    ">Copy this prompt</p>
    <p style="
      font-family: ${FONTS.mono};
      font-size: 13px;
      color: ${COLORS.dark};
      line-height: 1.55;
      margin: 0;
      white-space: pre-wrap;
    ">${prompt}</p>
  </div>
`;

// ─── Main Template ─────────────────────────────────────────────────────────
export function buildHTML(
  content: NewsletterContent,
  featuredTool: Tool,
  otherTools: Tool[],
  issueNumber: number,
  issueDate: string
): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>The AI Pulse | Issue #${issueNumber}</title>
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
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 0 16px !important; }
      .content-padding { padding: 24px 20px !important; }
      .mobile-full { width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.bg}; font-family: ${FONTS.sans}; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  <!-- Preheader (hidden preview text) -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${content.bigStory.headline} + free AI tools for Babson entrepreneurs
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Email wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${COLORS.bg};">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Main container -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="container" style="max-width: 600px; width: 100%;">

          <!-- ═══════════════════════════════════════════════════════════════
               HEADER
               ═══════════════════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 0 0 24px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 3px solid ${BRAND.green};">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <h1 style="font-family: ${FONTS.serif}; font-size: 28px; font-weight: 700; color: ${COLORS.dark}; margin: 0; letter-spacing: -0.5px;">The AI Pulse</h1>
                          <p style="font-family: ${FONTS.sans}; font-size: 13px; color: ${COLORS.textMuted}; margin: 4px 0 0 0;">AI for Entrepreneurs by Mikey Abril</p>
                        </td>
                        <td align="right" valign="top">
                          <p style="font-family: ${FONTS.sans}; font-size: 12px; color: ${COLORS.textLight}; margin: 0;">Issue #${issueNumber}</p>
                          <p style="font-family: ${FONTS.sans}; font-size: 12px; color: ${COLORS.textLight}; margin: 2px 0 0 0;">${issueDate}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════════════════════════════════════════════════════════
               BODY
               ═══════════════════════════════════════════════════════════════ -->
          <tr>
            <td style="background-color: ${COLORS.white}; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">

              <!-- WEEK THEME + BIG STORY -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 36px 36px 0 36px;">
                    <p style="
                      font-family: ${FONTS.sans};
                      font-size: 12px;
                      font-weight: 700;
                      letter-spacing: 1.5px;
                      text-transform: uppercase;
                      color: ${BRAND.green};
                      margin: 0 0 20px 0;
                    ">${content.weekTopic}</p>

                    <h2 style="
                      font-family: ${FONTS.serif};
                      font-size: 26px;
                      font-weight: 700;
                      color: ${COLORS.dark};
                      line-height: 1.3;
                      margin: 0 0 16px 0;
                      letter-spacing: -0.3px;
                    ">${content.bigStory.headline}</h2>

                    <p style="
                      font-family: ${FONTS.sans};
                      font-size: 16px;
                      color: ${COLORS.text};
                      line-height: 1.7;
                      margin: 0 0 16px 0;
                    ">${content.bigStory.summary}</p>

                    <a href="${content.bigStory.sourceUrl}" target="_blank" style="
                      font-family: ${FONTS.sans};
                      color: ${BRAND.green};
                      font-size: 14px;
                      font-weight: 600;
                      text-decoration: none;
                    ">Read the full story &rarr;</a>
                  </td>
                </tr>
              </table>

              <!-- BABSON CONNECTION -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 28px 36px 0 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="
                      background-color: ${COLORS.accentBg};
                      border-radius: 8px;
                    ">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="
                            font-family: ${FONTS.sans};
                            font-size: 11px;
                            font-weight: 700;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                            color: ${BRAND.green};
                            margin: 0 0 8px 0;
                          ">Babson Connection</p>
                          <p style="
                            font-family: ${FONTS.sans};
                            font-size: 15px;
                            color: ${COLORS.text};
                            line-height: 1.65;
                            margin: 0;
                          ">${content.classConnection}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${divider()}

              <!-- THIS WEEK IN AI -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 32px 36px 0 36px;">
                    ${sectionLabel("This Week in AI")}
                  </td>
                </tr>
              </table>

              ${content.threeThings.map((item, i) => `
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: ${i === 0 ? '0' : '20px'} 36px ${i < content.threeThings.length - 1 ? '0' : '0'} 36px;">
                    <a href="${item.sourceUrl}" target="_blank" style="
                      font-family: ${FONTS.serif};
                      color: ${COLORS.dark};
                      text-decoration: none;
                      font-size: 18px;
                      font-weight: 700;
                      line-height: 1.4;
                    ">${item.headline}</a>
                    <p style="
                      font-family: ${FONTS.sans};
                      color: ${COLORS.text};
                      font-size: 15px;
                      line-height: 1.65;
                      margin: 8px 0 0 0;
                    ">${item.summary}</p>
                    <p style="
                      font-family: ${FONTS.sans};
                      color: ${BRAND.green};
                      font-size: 14px;
                      font-weight: 600;
                      line-height: 1.5;
                      margin: 8px 0 0 0;
                    ">&rarr; ${item.takeaway}</p>
                    ${i < content.threeThings.length - 1 ? `
                    <div style="height: 1px; background-color: ${COLORS.border}; margin-top: 24px;"></div>` : ''}
                  </td>
                </tr>
              </table>`).join('')}

              ${divider()}

              <!-- FOUNDER'S EDGE -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 32px 36px 0 36px;">
                    ${sectionLabel("Founder's Edge")}

                    <h3 style="
                      font-family: ${FONTS.serif};
                      color: ${COLORS.dark};
                      font-size: 22px;
                      font-weight: 700;
                      line-height: 1.35;
                      margin: 0 0 12px 0;
                    ">${content.founderFramework.title}</h3>

                    <p style="
                      font-family: ${FONTS.sans};
                      color: ${COLORS.text};
                      font-size: 15px;
                      line-height: 1.65;
                      margin: 0 0 24px 0;
                    ">${content.founderFramework.intro}</p>

                    ${content.founderFramework.steps.map((step, i) => `
                    <div style="margin-bottom: 20px;">
                      <p style="
                        font-family: ${FONTS.sans};
                        color: ${COLORS.dark};
                        font-size: 15px;
                        font-weight: 700;
                        margin: 0 0 6px 0;
                      ">
                        <span style="
                          display: inline-block;
                          width: 24px;
                          height: 24px;
                          background-color: ${BRAND.green};
                          color: ${COLORS.white};
                          font-size: 13px;
                          font-weight: 700;
                          text-align: center;
                          line-height: 24px;
                          border-radius: 50%;
                          margin-right: 10px;
                        ">${i + 1}</span>
                        ${step.title}
                        ${step.tool ? `<a href="${step.toolUrl || '#'}" target="_blank" style="color: ${BRAND.green}; text-decoration: none; font-weight: 600;"> [${step.tool}]</a>` : ''}
                      </p>
                      <p style="
                        font-family: ${FONTS.sans};
                        color: ${COLORS.text};
                        font-size: 15px;
                        line-height: 1.6;
                        margin: 0 0 0 34px;
                      ">${step.description}</p>
                      ${step.prompt ? `<div style="margin-left: 34px;">${promptBox(step.prompt)}</div>` : ''}
                    </div>`).join('')}

                    <p style="
                      font-family: ${FONTS.sans};
                      color: ${BRAND.green};
                      font-size: 15px;
                      font-weight: 700;
                      margin: 8px 0 0 0;
                      padding: 16px;
                      background-color: ${COLORS.accentBg};
                      border-radius: 8px;
                    ">${content.founderFramework.bottomLine}</p>
                  </td>
                </tr>
              </table>

              ${divider()}

              <!-- FREE TOOLS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 32px 36px 0 36px;">
                    ${sectionLabel("Free for Babson Students")}

                    <!-- Featured Tool Card -->
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="
                      background-color: ${COLORS.white};
                      border: 2px solid ${BRAND.green};
                      border-radius: 12px;
                    ">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="
                            font-family: ${FONTS.sans};
                            font-size: 10px;
                            font-weight: 700;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                            color: ${BRAND.green};
                            margin: 0 0 8px 0;
                          ">This Week's Featured Tool</p>

                          <h4 style="
                            font-family: ${FONTS.serif};
                            color: ${COLORS.dark};
                            font-size: 20px;
                            font-weight: 700;
                            margin: 0 0 6px 0;
                          ">${featuredTool.name}</h4>

                          <p style="
                            font-family: ${FONTS.sans};
                            color: ${COLORS.textMuted};
                            font-size: 13px;
                            margin: 0 0 12px 0;
                          ">${featuredTool.duration} &bull; ${featuredTool.value} &bull; ${featuredTool.category}</p>

                          <p style="
                            font-family: ${FONTS.sans};
                            color: ${COLORS.text};
                            font-size: 15px;
                            line-height: 1.6;
                            margin: 0 0 14px 0;
                          ">${featuredTool.description}</p>

                          <p style="
                            font-family: ${FONTS.sans};
                            color: ${COLORS.text};
                            font-size: 14px;
                            line-height: 1.6;
                            margin: 0 0 18px 0;
                          "><strong style="color: ${COLORS.dark};">How to claim:</strong> ${featuredTool.claimSteps}</p>

                          ${ctaButton(`Get ${featuredTool.name} Free`, featuredTool.url)}
                        </td>
                      </tr>
                    </table>

                    ${otherTools.length > 0 ? `
                    <p style="
                      font-family: ${FONTS.sans};
                      font-size: 12px;
                      font-weight: 700;
                      letter-spacing: 1px;
                      text-transform: uppercase;
                      color: ${COLORS.textMuted};
                      margin: 28px 0 12px 0;
                    ">Also Free Right Now</p>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${otherTools.map((tool, i) => `
                      <tr>
                        <td style="padding: 12px 0; ${i < otherTools.length - 1 ? `border-bottom: 1px solid ${COLORS.border};` : ''}">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td>
                                <p style="font-family: ${FONTS.sans}; color: ${COLORS.dark}; font-size: 15px; font-weight: 600; margin: 0;">${tool.name}</p>
                                <p style="font-family: ${FONTS.sans}; color: ${COLORS.textMuted}; font-size: 13px; margin: 3px 0 0 0;">${tool.duration} &bull; ${tool.value}</p>
                              </td>
                              <td align="right" valign="middle" style="white-space: nowrap;">
                                <a href="${tool.url}" target="_blank" style="
                                  font-family: ${FONTS.sans};
                                  color: ${BRAND.green};
                                  font-size: 14px;
                                  font-weight: 600;
                                  text-decoration: none;
                                  padding: 8px 16px;
                                  border: 1px solid ${BRAND.green};
                                  border-radius: 6px;
                                ">Claim</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>`).join('')}
                    </table>` : ''}
                  </td>
                </tr>
              </table>

              ${divider()}

              <!-- AI IN YOUR BUSINESS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 32px 36px 0 36px;">
                    ${sectionLabel("AI in Your Business")}

                    <h3 style="
                      font-family: ${FONTS.serif};
                      color: ${COLORS.dark};
                      font-size: 20px;
                      font-weight: 700;
                      line-height: 1.35;
                      margin: 0 0 20px 0;
                    ">${content.aiInBusiness.title}</h3>

                    ${content.aiInBusiness.workflows.map((wf, i) => `
                    <div style="margin-bottom: ${i < content.aiInBusiness.workflows.length - 1 ? '24px' : '0'}; padding-bottom: ${i < content.aiInBusiness.workflows.length - 1 ? '24px' : '0'}; ${i < content.aiInBusiness.workflows.length - 1 ? `border-bottom: 1px solid ${COLORS.border};` : ''}">
                      <p style="
                        font-family: ${FONTS.sans};
                        color: ${COLORS.dark};
                        font-size: 16px;
                        font-weight: 700;
                        margin: 0 0 6px 0;
                      ">${wf.title}${wf.tool ? ` <a href="${wf.toolUrl || '#'}" target="_blank" style="color: ${BRAND.green}; text-decoration: none;">[${wf.tool}]</a>` : ''}</p>
                      <p style="
                        font-family: ${FONTS.sans};
                        color: ${COLORS.text};
                        font-size: 15px;
                        line-height: 1.6;
                        margin: 0;
                      ">${wf.description}</p>
                      ${wf.prompt ? promptBox(wf.prompt) : ''}
                    </div>`).join('')}
                  </td>
                </tr>
              </table>

              ${divider()}

              <!-- QUICK HITS -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 32px 36px 0 36px;">
                    ${sectionLabel("Quick Hits")}

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${content.quickHits.map((hit, i) => `
                      <tr>
                        <td style="padding: 8px 0; font-family: ${FONTS.sans}; color: ${COLORS.text}; font-size: 15px; line-height: 1.6;">
                          <span style="color: ${BRAND.green}; font-weight: 700;">&bull;</span>&ensp;${hit}
                        </td>
                      </tr>`).join('')}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- NEXT WEEK -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 32px 36px 28px 36px;">
                    ${sectionLabel("Next Week")}
                    <p style="
                      font-family: ${FONTS.sans};
                      color: ${COLORS.text};
                      font-size: 15px;
                      line-height: 1.6;
                      margin: 0;
                    ">${content.nextWeek}</p>
                  </td>
                </tr>
              </table>

              <!-- ENGAGEMENT CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 0 36px 36px 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="
                      background: linear-gradient(135deg, ${COLORS.accentBg} 0%, #f5f9f7 100%);
                      border-radius: 12px;
                    ">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="
                            font-family: ${FONTS.sans};
                            color: ${COLORS.dark};
                            font-size: 16px;
                            font-weight: 700;
                            margin: 0 0 8px 0;
                          ">What'd you think of this issue?</p>
                          <p style="
                            font-family: ${FONTS.sans};
                            color: ${COLORS.text};
                            font-size: 14px;
                            line-height: 1.6;
                            margin: 0 0 14px 0;
                          ">Reply to this email with your thoughts, questions, or AI tools you want us to cover.</p>
                          <p style="
                            font-family: ${FONTS.sans};
                            font-size: 14px;
                            color: ${COLORS.textMuted};
                            margin: 0;
                          ">Know someone who'd love this? <a href="mailto:?subject=Check out The AI Pulse&body=I thought you'd like this AI newsletter for Babson entrepreneurs: https://theaipulse.substack.com" style="color: ${BRAND.green}; text-decoration: none; font-weight: 600;">Forward it to them &rarr;</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${content.founderSpotlight?.enabled ? `
              <!-- FOUNDER SPOTLIGHT -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 0 36px;"><div style="height: 1px; background-color: ${COLORS.border};"></div></td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding: 32px 36px 36px 36px;">
                    ${sectionLabel("Founder Spotlight")}

                    <h4 style="
                      font-family: ${FONTS.serif};
                      color: ${COLORS.dark};
                      font-size: 20px;
                      font-weight: 700;
                      margin: 0 0 10px 0;
                    ">${content.founderSpotlight.startupName}</h4>

                    <p style="
                      font-family: ${FONTS.sans};
                      color: ${COLORS.text};
                      font-size: 15px;
                      line-height: 1.6;
                      margin: 0 0 18px 0;
                    ">${content.founderSpotlight.oneLinePitch}</p>

                    ${ctaButton(content.founderSpotlight.ctaText, content.founderSpotlight.ctaUrl)}
                  </td>
                </tr>
              </table>` : ''}

            </td>
          </tr>

          <!-- ═══════════════════════════════════════════════════════════════
               FOOTER
               ═══════════════════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 32px 0 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="
                      font-family: ${FONTS.serif};
                      font-size: 18px;
                      font-weight: 700;
                      color: ${COLORS.dark};
                      margin: 0 0 4px 0;
                    ">The AI Pulse</p>
                    <p style="
                      font-family: ${FONTS.sans};
                      font-size: 13px;
                      color: ${COLORS.textMuted};
                      margin: 0 0 16px 0;
                    ">AI for Entrepreneurs by Mikey Abril</p>

                    <p style="
                      font-family: ${FONTS.sans};
                      font-size: 12px;
                      color: ${COLORS.textLight};
                      line-height: 1.6;
                      margin: 0 0 12px 0;
                    ">
                      Researched with AI. Curated by humans.<br>
                      Babson College, 231 Forest Street, Babson Park, MA 02457
                    </p>

                    <p style="
                      font-family: ${FONTS.sans};
                      font-size: 12px;
                      color: ${COLORS.textLight};
                      margin: 0;
                    ">
                      <a href="{{unsubscribe_url}}" target="_blank" style="color: ${COLORS.textLight}; text-decoration: underline;">Unsubscribe</a>
                      &nbsp;&bull;&nbsp;
                      <a href="https://theaipulse.substack.com/privacy" target="_blank" style="color: ${COLORS.textLight}; text-decoration: underline;">Privacy</a>
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

// Re-export as default for compatibility
export default { buildHTML };
