import process from "node:process";

const DISCORD_EMBED_COLOR = 0x2b89f8;

const CATEGORY_LABELS = {
  general: "일반",
  bug: "버그 리포트",
  feature: "기능 제안",
  improvement: "개선 사항",
  other: "기타",
} as const;

type FeedbackCategory = keyof typeof CATEGORY_LABELS;

type FeedbackRequestBody = {
  category?: unknown;
  email?: unknown;
  message?: unknown;
  name?: unknown;
  subject?: unknown;
};

type ApiResponseWriter = {
  json: (body: unknown) => void;
};

type ApiRequest = {
  body?: unknown;
  method?: string;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponseWriter;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseBody(body: unknown): FeedbackRequestBody | null {
  if (!body) {
    return null;
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body) as FeedbackRequestBody;
    } catch {
      return null;
    }
  }

  if (typeof body === "object") {
    return body as FeedbackRequestBody;
  }

  return null;
}

function truncate(value: string, limit: number) {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit - 3)}...`;
}

function normalizeCategory(value: string): FeedbackCategory {
  if (value in CATEGORY_LABELS) {
    return value as FeedbackCategory;
  }

  return "other";
}

function buildDiscordPayload(body: FeedbackRequestBody) {
  const category = normalizeCategory(asTrimmedString(body.category));
  const name = asTrimmedString(body.name) || "익명";
  const email = asTrimmedString(body.email) || "비공개";
  const subject = asTrimmedString(body.subject);
  const message = asTrimmedString(body.message);

  if (!subject || !message) {
    return null;
  }

  return {
    allowed_mentions: { parse: [] },
    content: "새로운 GraphNode 피드백이 도착했습니다.",
    embeds: [
      {
        color: DISCORD_EMBED_COLOR,
        description: truncate(message, 4000),
        fields: [
          {
            inline: true,
            name: "카테고리",
            value: CATEGORY_LABELS[category],
          },
          {
            inline: true,
            name: "이름",
            value: truncate(name, 1024),
          },
          {
            inline: true,
            name: "이메일",
            value: truncate(email, 1024),
          },
        ],
        footer: {
          text: "GraphNode Feedback",
        },
        timestamp: new Date().toISOString(),
        title: truncate(subject, 256),
      },
    ],
    username: "GraphNode Feedback",
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.DISCORD_FEEDBACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_FEEDBACK_WEBHOOK_URL is not configured.");
    return res.status(500).json({ error: "Webhook not configured" });
  }

  const body = parseBody(req.body);
  const discordPayload = body ? buildDiscordPayload(body) : null;

  if (!discordPayload) {
    return res.status(400).json({ error: "Invalid feedback payload" });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      body: JSON.stringify(discordPayload),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!webhookResponse.ok) {
      console.error(
        "Discord webhook request failed.",
        webhookResponse.status,
        await webhookResponse.text(),
      );
      return res.status(502).json({ error: "Failed to forward feedback" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Discord webhook request threw an error.", error);
    return res.status(502).json({ error: "Failed to forward feedback" });
  }
}
