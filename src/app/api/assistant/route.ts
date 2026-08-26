import Anthropic from "@anthropic-ai/sdk";
import { isLocale, type Locale } from "@/i18n";
import { systemPrompt, offlineAnswer } from "@/lib/assistant-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_CHARS = 1200; // một câu hỏi dài hơn thế gần như chắc chắn là dán bừa
const MAX_TURNS = 12; // giữ hội thoại gọn, tránh chi phí phình ra

type Turn = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  let body: { messages?: Turn[]; locale?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const locale: Locale = isLocale(body.locale ?? "") ? (body.locale as Locale) : "en";

  const turns = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({ role: m.role, content: String(m.content ?? "").slice(0, MAX_CHARS) }))
    .filter((m) => m.content.trim())
    .slice(-MAX_TURNS);

  if (!turns.length || turns[turns.length - 1].role !== "user") {
    return Response.json({ error: "no_question" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Chưa cấu hình khoá API -> trả lời từ chính phần Hỏi đáp của website.
  if (!apiKey) {
    const answer = offlineAnswer(locale, turns[turns.length - 1].content);
    return new Response(answer, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Assistant-Mode": "offline" },
    });
  }

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: "claude-opus-5",
      max_tokens: 1500, // cố ý thấp: câu trả lời trong khung chat phải ngắn
      system: [
        {
          type: "text",
          text: systemPrompt(locale),
          // Tư liệu giống nhau ở mọi lượt -> cache lại, đỡ tiền và nhanh hơn
          cache_control: { type: "ephemeral" },
        },
      ],
      thinking: { type: "adaptive" },
      output_config: { effort: "low" }, // hỏi đáp ngắn, không cần suy nghĩ sâu
      messages: turns,
    });

    const encoder = new TextEncoder();
    const out = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          const final = await stream.finalMessage();
          if (final.stop_reason === "refusal") {
            controller.enqueue(encoder.encode("\n\n—"));
          }
        } catch (error) {
          console.error("[assistant] stream failed", error);
          controller.enqueue(encoder.encode(offlineAnswer(locale, turns[turns.length - 1].content)));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(out, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Assistant-Mode": "claude",
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("[assistant] ANTHROPIC_API_KEY sai hoặc hết hạn");
    } else if (error instanceof Anthropic.RateLimitError) {
      console.error("[assistant] bị giới hạn tần suất");
    } else {
      console.error("[assistant] loi", error);
    }
    const answer = offlineAnswer(locale, turns[turns.length - 1].content);
    return new Response(answer, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Assistant-Mode": "offline" },
    });
  }
}
