import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = Record<string, unknown>;

const MAX_LEN = 4000;

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_LEN);
}

/**
 * Lưu yêu cầu liên hệ xuống data/enquiries.jsonl.
 * Nếu có cấu hình SMTP/webhook thì thêm ở đây — hiện chưa có
 * thông tin từ khách nên chỉ ghi file, không im lặng đánh mất dữ liệu.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const message = clean(body.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const record = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone: clean(body.phone),
    country: clean(body.country),
    interest: clean(body.interest),
    budget: clean(body.budget),
    message,
    locale: clean(body.locale) || "en",
  };

  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "enquiries.jsonl"), `${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    console.error("[enquiry] could not persist", error);
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (error) {
      // Đã lưu được xuống đĩa nên vẫn coi là thành công với người gửi.
      console.error("[enquiry] webhook failed", error);
    }
  }

  return NextResponse.json({ ok: true });
}
