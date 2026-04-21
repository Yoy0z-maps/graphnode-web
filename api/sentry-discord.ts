import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import process from "node:process";

import { waitUntil } from "@vercel/functions";

const ALLOWED_RESOURCES = new Set(["event_alert", "metric_alert"]);
const DISCORD_TITLE_LIMIT = 256;
const DISCORD_DESCRIPTION_LIMIT = 4096;
const DISCORD_FIELD_LIMIT = 1024;

type SentryPayload = {
  action?: unknown;
  actor?: unknown;
  data?: unknown;
};

type SentryAlertDetails = {
  action: string;
  actor: string;
  environment: string;
  issueId: string;
  project: string;
  resource: string;
  rule: string;
  summary: string;
  title: string;
  url: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function firstNonEmpty(...values: string[]) {
  return values.find((value) => value.length > 0) ?? "";
}

function truncate(value: string, limit: number) {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit - 3)}...`;
}

function toHexBuffer(value: string) {
  if (!/^[\da-f]{64}$/i.test(value)) {
    return null;
  }

  return Buffer.from(value, "hex");
}

function verifySignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature) {
    return false;
  }

  const providedSignature = toHexBuffer(signature);

  if (!providedSignature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest();

  return crypto.timingSafeEqual(expectedSignature, providedSignature);
}

function extractDetails(resource: string, payload: SentryPayload): SentryAlertDetails {
  const data = asRecord(payload.data);
  const issue = asRecord(data?.issue);
  const event = asRecord(data?.event);
  const actor = asRecord(payload.actor);
  const metricAlert = asRecord(data?.metric_alert);
  const metadata = asRecord(issue?.metadata);
  const project =
    asRecord(issue?.project) ?? asRecord(data?.project) ?? asRecord(metricAlert?.project);

  return {
    action: firstNonEmpty(asString(payload.action), "triggered"),
    actor: firstNonEmpty(asString(actor?.name), asString(actor?.type)),
    environment: firstNonEmpty(
      asString(event?.environment),
      asString(data?.environment),
      asString(metricAlert?.environment),
    ),
    issueId: firstNonEmpty(
      asString(issue?.shortId),
      asString(issue?.id),
      asString(event?.eventID),
      asString(metricAlert?.id),
    ),
    project: firstNonEmpty(
      asString(project?.slug),
      asString(project?.name),
      asString(issue?.projectSlug),
      asString(metricAlert?.projectSlug),
    ),
    resource,
    rule: firstNonEmpty(
      asString(data?.triggered_rule),
      asString(data?.rule),
      asString(metricAlert?.name),
      asString(metricAlert?.title),
    ),
    summary: firstNonEmpty(
      asString(issue?.culprit),
      asString(metadata?.value),
      asString(event?.message),
      asString(metricAlert?.description),
    ),
    title: firstNonEmpty(
      asString(issue?.title),
      asString(event?.title),
      asString(metricAlert?.title),
      asString(metricAlert?.name),
      `${resource}:${firstNonEmpty(asString(payload.action), "triggered")}`,
    ),
    url: firstNonEmpty(
      asString(issue?.permalink),
      asString(issue?.webUrl),
      asString(event?.webUrl),
      asString(metricAlert?.webUrl),
    ),
  };
}

function buildDiscordPayload(details: SentryAlertDetails) {
  const action = details.action.toLowerCase();
  const isResolved = action.includes("resolve");
  const fields = [
    { inline: true, name: "프로젝트", value: details.project },
    { inline: true, name: "리소스", value: details.resource },
    { inline: true, name: "액션", value: details.action },
    { inline: true, name: "이슈", value: details.issueId },
    { inline: true, name: "환경", value: details.environment },
    { inline: true, name: "액터", value: details.actor },
    { inline: false, name: "규칙", value: details.rule },
  ]
    .filter((field) => field.value.length > 0)
    .map((field) => ({
      ...field,
      value: truncate(field.value, DISCORD_FIELD_LIMIT),
    }));

  return {
    allowed_mentions: { parse: [] },
    embeds: [
      {
        color: isResolved ? 0x2f9e44 : 0xe03131,
        description: details.summary
          ? truncate(details.summary, DISCORD_DESCRIPTION_LIMIT)
          : undefined,
        fields,
        footer: {
          text: `GraphNode Sentry • ${details.resource}`,
        },
        timestamp: new Date().toISOString(),
        title: truncate(details.title, DISCORD_TITLE_LIMIT),
        url: details.url || undefined,
      },
    ],
    username: "GraphNode Sentry",
  };
}

async function sendDiscordAlert(webhookUrl: string, details: SentryAlertDetails) {
  try {
    const response = await fetch(webhookUrl, {
      body: JSON.stringify(buildDiscordPayload(details)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) {
      console.error(
        "Discord webhook request failed.",
        response.status,
        await response.text(),
      );
    }
  } catch (error) {
    console.error("Discord webhook request threw an error.", error);
  }
}

export function GET() {
  const webhookUrl =
    process.env.DISCORD_WEBHOOK_URL ?? process.env.DISCORD_FRONT_SERVER_STATUS_WEBHOOK_URL;
  const secret =
    process.env.SENTRY_CLIENT_SECRET ?? process.env.SENTRY_CUSTOM_INTEGRATION_CLIENT_SECRET;

  return Response.json({
    configured: {
      discordWebhook: Boolean(webhookUrl),
      sentryClientSecret: Boolean(secret),
    },
    name: "sentry-discord",
    ok: true,
  });
}

export async function POST(request: Request) {
  const secret =
    process.env.SENTRY_CLIENT_SECRET ?? process.env.SENTRY_CUSTOM_INTEGRATION_CLIENT_SECRET;
  const webhookUrl =
    process.env.DISCORD_WEBHOOK_URL ?? process.env.DISCORD_FRONT_SERVER_STATUS_WEBHOOK_URL;

  if (!secret || !webhookUrl) {
    console.error("Sentry Discord webhook env vars are not configured.");
    return Response.json({ error: "Webhook env vars are not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("sentry-hook-signature");
  const resource = request.headers.get("sentry-hook-resource") ?? "unknown";

  if (!verifySignature(rawBody, signature, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (!ALLOWED_RESOURCES.has(resource)) {
    return Response.json({ ignored: true, resource }, { status: 200 });
  }

  let payload: SentryPayload;

  try {
    payload = JSON.parse(rawBody) as SentryPayload;
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  waitUntil(sendDiscordAlert(webhookUrl, extractDetails(resource, payload)));

  return Response.json({ ok: true }, { status: 200 });
}
