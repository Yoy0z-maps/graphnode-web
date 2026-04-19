import process from "node:process";

const CATEGORY_META = {
  general: { color: 0x2b89f8, label: "일반" },
  bug: { color: 0xe03131, label: "버그 리포트" },
  feature: { color: 0x2f9e44, label: "기능 제안" },
  improvement: { color: 0xf08c00, label: "개선 사항" },
  other: { color: 0x6c757d, label: "기타" },
} as const;

const DISCORD_FIELD_VALUE_LIMIT = 1024;
const DISCORD_MESSAGE_LIMIT = 3000;

type FeedbackCategory = keyof typeof CATEGORY_META;

type FeedbackRequestBody = {
  category?: unknown;
  email?: unknown;
  content?: unknown;
  name?: unknown;
  title?: unknown;
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

function chunkText(value: string, chunkSize: number) {
  const chunks: string[] = [];

  for (let index = 0; index < value.length; index += chunkSize) {
    chunks.push(value.slice(index, index + chunkSize));
  }

  return chunks;
}

function normalizeCategory(value: string): FeedbackCategory {
  if (value in CATEGORY_META) {
    return value as FeedbackCategory;
  }

  return "other";
}

function buildDiscordPayload(body: FeedbackRequestBody) {
  const category = normalizeCategory(asTrimmedString(body.category));
  const name = asTrimmedString(body.name) || "익명";
  const email = asTrimmedString(body.email) || "비공개";
  const title = asTrimmedString(body.title);
  const content = asTrimmedString(body.content);
  const categoryMeta = CATEGORY_META[category];

  if (!title || !content) {
    return null;
  }

  const contentChunks = chunkText(
    truncate(content, DISCORD_MESSAGE_LIMIT),
    DISCORD_FIELD_VALUE_LIMIT,
  );

  return {
    allowed_mentions: { parse: [] },
    embeds: [
      {
        author: {
          name: "GraphNode Feedback",
        },
        color: categoryMeta.color,
        fields: [
          {
            inline: false,
            name: "제목",
            value: truncate(title, DISCORD_FIELD_VALUE_LIMIT),
          },
          {
            inline: false,
            name: "카테고리",
            value: categoryMeta.label,
          },
          ...contentChunks.map((chunk, index) => ({
            inline: false,
            name: index === 0 ? "내용" : "내용 (계속)",
            value: chunk,
          })),
          {
            inline: true,
            name: "이름",
            value: truncate(name, DISCORD_FIELD_VALUE_LIMIT),
          },
          {
            inline: true,
            name: "이메일",
            value: truncate(email, DISCORD_FIELD_VALUE_LIMIT),
          },
        ],
        footer: {
          text: "GraphNode Feedback",
        },
        timestamp: new Date().toISOString(),
        title: "새로운 GraphNode 피드백",
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
