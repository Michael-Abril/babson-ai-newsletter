/**
 * Link Validation Utility for The AI Pulse
 *
 * Validates all URLs in the newsletter content and tools.json
 * Run with: npx ts-node src/validate-links.ts
 */

import fs from "fs";
import path from "path";
import type { Tool, NewsletterContent } from "./types.js";

interface LinkValidationResult {
  url: string;
  location: string;
  status: number | "error";
  valid: boolean;
  error?: string;
}

interface ValidationReport {
  timestamp: string;
  totalLinks: number;
  validLinks: number;
  invalidLinks: number;
  blockedByCrawlerProtection: number;
  results: LinkValidationResult[];
  passed: boolean;
}

// URLs to skip (placeholders, mailto, etc.)
const SKIP_PATTERNS = [
  /^mailto:/,
  /^#/,
  /\{\{.*\}\}/, // Template variables like {{unsubscribe_url}}
  /\[.*\]/, // Placeholders like [YOUR IDEA]
];

// Major AI/tech sites that block automated crawlers but work in browsers
const CRAWLER_BLOCKED_DOMAINS = [
  "claude.ai",
  "chatgpt.com",
  "perplexity.ai",
  "leonardo.ai",
  "gamma.app",
  "openai.com",
  "anthropic.com",
  "midjourney.com",
];

function shouldSkip(url: string): boolean {
  return SKIP_PATTERNS.some((pattern) => pattern.test(url));
}

function isTrustedDomainBlocking403(url: string, status: number | "error"): boolean {
  if (status !== 403) return false;
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return CRAWLER_BLOCKED_DOMAINS.some((domain) => hostname.includes(domain));
  } catch {
    return false;
  }
}

async function checkUrl(url: string): Promise<{ status: number | "error"; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AIPulse-LinkChecker/1.0)",
      },
    });

    clearTimeout(timeout);

    // Some sites block HEAD, try GET for non-200
    if (response.status === 405 || response.status === 403) {
      const getResponse = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AIPulse-LinkChecker/1.0)",
        },
      });
      return { status: getResponse.status };
    }

    return { status: response.status };
  } catch (err) {
    const error = err as Error;
    return { status: "error", error: error.message };
  }
}

function extractUrlsFromTools(tools: Tool[]): Array<{ url: string; location: string }> {
  return tools.map((tool) => ({
    url: tool.url,
    location: `tools.json > ${tool.name}`,
  }));
}

function extractUrlsFromContent(content: NewsletterContent): Array<{ url: string; location: string }> {
  const urls: Array<{ url: string; location: string }> = [];

  // Big story
  if (content.bigStory?.sourceUrl) {
    urls.push({ url: content.bigStory.sourceUrl, location: "bigStory.sourceUrl" });
  }

  // Three things
  content.threeThings?.forEach((item, i) => {
    if (item.sourceUrl) {
      urls.push({ url: item.sourceUrl, location: `threeThings[${i}].sourceUrl` });
    }
  });

  // Framework steps
  content.founderFramework?.steps?.forEach((step, i) => {
    if (step.toolUrl) {
      urls.push({ url: step.toolUrl, location: `founderFramework.steps[${i}].toolUrl` });
    }
  });

  // Workflows
  content.aiInBusiness?.workflows?.forEach((wf, i) => {
    if (wf.toolUrl) {
      urls.push({ url: wf.toolUrl, location: `aiInBusiness.workflows[${i}].toolUrl` });
    }
  });

  // Founder spotlight
  if (content.founderSpotlight?.ctaUrl) {
    urls.push({ url: content.founderSpotlight.ctaUrl, location: "founderSpotlight.ctaUrl" });
  }

  return urls;
}

export async function validateLinks(
  tools?: Tool[],
  content?: NewsletterContent
): Promise<ValidationReport> {
  const allUrls: Array<{ url: string; location: string }> = [];

  // Load tools if not provided
  if (!tools) {
    const toolsPath = path.join(process.cwd(), "config", "tools.json");
    if (fs.existsSync(toolsPath)) {
      tools = JSON.parse(fs.readFileSync(toolsPath, "utf-8"));
    }
  }

  if (tools) {
    allUrls.push(...extractUrlsFromTools(tools));
  }

  if (content) {
    allUrls.push(...extractUrlsFromContent(content));
  }

  // Filter and dedupe
  const uniqueUrls = new Map<string, string>();
  for (const { url, location } of allUrls) {
    if (url && !shouldSkip(url) && !uniqueUrls.has(url)) {
      uniqueUrls.set(url, location);
    }
  }

  console.log(`\nValidating ${uniqueUrls.size} unique URLs...\n`);

  const results: LinkValidationResult[] = [];

  for (const [url, location] of uniqueUrls) {
    process.stdout.write(`  Checking: ${url.slice(0, 50)}...`);
    const { status, error } = await checkUrl(url);
    const isDirectlyValid = typeof status === "number" && status >= 200 && status < 400;
    const isTrustedBlocked = isTrustedDomainBlocking403(url, status);
    const valid = isDirectlyValid || isTrustedBlocked;

    results.push({ url, location, status, valid, error });

    if (isDirectlyValid) {
      console.log(` ✓ ${status}`);
    } else if (isTrustedBlocked) {
      console.log(` ⚠ ${status} (trusted domain, blocks crawlers)`);
    } else {
      console.log(` ✗ ${status}${error ? ` (${error})` : ""}`);
    }

    // Rate limit
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const validLinks = results.filter((r) => r.valid).length;
  const blockedByCrawlerProtection = results.filter(
    (r) => r.valid && isTrustedDomainBlocking403(r.url, r.status)
  ).length;
  const invalidLinks = results.filter((r) => !r.valid).length;

  const report: ValidationReport = {
    timestamp: new Date().toISOString(),
    totalLinks: results.length,
    validLinks,
    invalidLinks,
    blockedByCrawlerProtection,
    results,
    passed: invalidLinks === 0,
  };

  // Print summary
  console.log("\n" + "=".repeat(50));
  console.log("LINK VALIDATION REPORT");
  console.log("=".repeat(50));
  console.log(`Total Links:   ${report.totalLinks}`);
  console.log(`Valid:         ${report.validLinks}`);
  if (blockedByCrawlerProtection > 0) {
    console.log(`  (${blockedByCrawlerProtection} blocked by crawler protection but trusted)`);
  }
  console.log(`Invalid:       ${report.invalidLinks}`);
  console.log(`Status:        ${report.passed ? "PASSED ✓" : "FAILED ✗"}`);

  if (invalidLinks > 0) {
    console.log("\nInvalid Links:");
    results
      .filter((r) => !r.valid)
      .forEach((r) => {
        console.log(`  - ${r.url}`);
        console.log(`    Location: ${r.location}`);
        console.log(`    Error: ${r.status}${r.error ? ` - ${r.error}` : ""}`);
      });
  }

  return report;
}

// CLI runner
if (process.argv[1]?.includes("validate-links")) {
  validateLinks()
    .then((report) => {
      process.exit(report.passed ? 0 : 1);
    })
    .catch((err) => {
      console.error("Validation error:", err);
      process.exit(1);
    });
}

export { extractUrlsFromContent, extractUrlsFromTools };
