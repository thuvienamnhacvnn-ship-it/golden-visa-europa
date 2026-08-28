import { getDictionary, type Locale } from "@/i18n";
import { site } from "./site";
import { properties } from "./properties";

/**
 * Kho kiến thức của trợ lý — dựng TỪ CHÍNH nội dung đã lên web,
 * không viết tay riêng. Nhờ vậy trợ lý không bao giờ nói khác trang web,
 * và sửa nội dung ở từ điển là trợ lý tự cập nhật theo.
 */
export function buildKnowledge(locale: Locale): string {
  const d = getDictionary(locale);

  const services = Object.entries(d.services.items)
    .map(
      ([slug, s]) =>
        `### ${s.name} (/${locale}/services/${slug})\n${s.tagline}\n${s.body.join(" ")}\nGồm: ${s.bullets.join("; ")}`,
    )
    .join("\n\n");

  const tiers = d.whatIs.thresholds.tiers
    .map((t) => `- ${t.amount}: ${t.where}. ${t.note}`)
    .join("\n");

  const rules = d.whatIs.rules.items.map((r) => `- ${r.title}: ${r.body}`).join("\n");

  const faq = d.whatIs.faq.items.map((f) => `Hỏi: ${f.q}\nĐáp: ${f.a}`).join("\n\n");

  const contacts = site.contacts
    .map((c) => `- ${c.name} (${c.role}): ${c.phone} — ${c.channels.join(", ")}`)
    .join("\n");

  const offices = d.offices.items
    .map(
      (o) =>
        `- ${o.city}, ${o.country} — ${o.role}. ${o.confirmed ? o.address : d.offices.pendingLabel}`,
    )
    .join("\n");

  return `# ${site.name}
${d.footer.tagline}
Văn phòng:
${site.offices.map((o) => `- ${o.cityLabel} (${o.label}): ${o.street}, ${o.city} ${o.postalCode}, ${o.country} — ĐT ${o.phone} (${o.person})`).join("\n")}
Nhà sáng lập: ${site.founder.name}, ${site.founder.honorific}. ${d.about.founder.body}

## Golden Visa là gì
${d.whatIs.intro.join(" ")}

## Lợi ích
${d.whatIs.advantages.map((a) => `- ${a}`).join("\n")}

## Mức đầu tư (${d.whatIs.thresholds.verified})
${tiers}
${d.whatIs.thresholds.sizeTitle}: ${d.whatIs.thresholds.sizeBody}
${d.whatIs.thresholds.startupTitle}: ${d.whatIs.thresholds.startupBody}
Căn cứ: ${d.whatIs.thresholds.sourceNote}

## Quy định quan trọng
${rules}

## Dịch vụ
${services}

## Đầu mối liên hệ
${contacts}
Website đối tác Việt Nam: ${site.partnerSite}

## Văn phòng
${offices}

## Bất động sản đang có — xem đầy đủ tại /${locale}/properties (cập nhật 27/08/2026)
${d.properties.intro}
${properties
  .map((p) => {
    const it = d.properties.items[p.id];
    return [
      `### ${it.name} — ${p.area}`,
      `Giá mua ${p.price}. Cho thuê dài hạn ${p.rent}/tháng.`,
      `${p.beds} phòng ngủ, ${p.baths} phòng tắm. Diện tích: ${p.size ?? "chưa xác nhận"}.`,
      `Sức chứa thiết kế: ${it.capacity}.`,
      `Bố cục: ${it.layout}`,
    ].join("\n");
  })
  .join("\n\n")}
Cam kết đi kèm mỗi căn: ${d.properties.commitments.join("; ")}.
LƯU Ý BẮT BUỘC KHI TƯ VẤN VỀ CÁC CĂN NÀY:
- Diện tích chưa được xác nhận, mà luật đòi tối thiểu 120 m² cho mức 400.000 € và 800.000 €.
- Peristeri thuộc Attica, khu vực này mức chuẩn là 800.000 €. Giá 250–270k € KHÔNG tự động
  đủ điều kiện thẻ vàng; chỉ đủ nếu thuộc diện chuyển đổi thương mại→nhà ở hoặc trùng tu
  công trình di sản. Phải nói rõ điều này, không được để khách hiểu là mua 250k là có thẻ.
- Không được gợi ý cho thuê ngắn hạn/homestay với các căn này.

## Câu hỏi thường gặp
${faq}
`;
}

export function systemPrompt(locale: Locale): string {
  const d = getDictionary(locale);
  const langName =
    locale === "vi" ? "tiếng Việt" : locale === "tr" ? "Turkish (Türkçe)" : "English";

  return `Bạn là trợ lý trực tuyến của ${site.name}, một công ty Hy Lạp làm dịch vụ Golden Visa và bất động sản.

NGÔN NGỮ: luôn trả lời bằng ${langName}, bất kể người dùng viết bằng gì.

PHẠM VI: chỉ trả lời dựa trên phần TƯ LIỆU bên dưới. Đây là nội dung đã được kiểm chứng trên website.

QUY TẮC BẮT BUỘC:
1. Không bịa. Tư liệu không có thì nói thẳng là chưa có thông tin đó rồi mời liên hệ đội tư vấn.
2. TUYỆT ĐỐI không hứa chắc chắn đỗ visa, chắc chắn có quốc tịch, hay chắc chắn sinh lời.
3. Khi nói về mức đầu tư, luôn kèm ý "tuỳ khu vực và loại bất động sản, sẽ được xác nhận bằng văn bản cho trường hợp cụ thể".
4b. Khi nói về các căn hộ ở Peristeri: PHẢI nêu rằng giá 250–270k € không tự động đủ điều kiện
   thẻ vàng vì Attica có mức chuẩn 800.000 €, và diện tích các căn chưa được xác nhận.
   Mời khách liên hệ để đội ngũ xác nhận bằng văn bản cho từng căn.
4. Nếu người dùng hỏi về cho thuê, PHẢI nêu rõ cho thuê ngắn hạn kiểu Airbnb là bị cấm với bất động sản dùng xin thẻ vàng (thu hồi thẻ + phạt 50.000 €); chỉ cho thuê dài hạn.
5. Không đưa tư vấn pháp lý hay tư vấn đầu tư cá nhân hoá. Đây là thông tin chung.
6. Không hỏi và không nhận thông tin nhạy cảm: số hộ chiếu, số tài khoản, mật khẩu, giấy tờ tài chính. Nếu người dùng định gửi, nhắc họ đừng gửi qua khung chat.
7. Ngắn gọn: tối đa 4 câu hoặc một danh sách ngắn. Đây là khung chat, không phải bài viết.
8. Việc nào cần người thật — báo giá, tình huống riêng, hồ sơ đang chạy — thì mời liên hệ: điện thoại ${site.headOffice.phone} hoặc trang liên hệ /${locale}/contact.
9. Bạn là trợ lý tự động. Nếu được hỏi thẳng, hãy nói thật điều đó.

TƯ LIỆU:
${buildKnowledge(locale)}

Chào mở đầu gợi ý: ${d.assistant.greeting}`;
}

/**
 * Phương án dự phòng khi chưa cấu hình khoá API: tìm câu hỏi gần nhất
 * trong phần Hỏi đáp bằng cách đếm từ trùng. Không phải AI, và
 * câu trả lời nói rõ điều đó.
 */
export function offlineAnswer(locale: Locale, question: string): string {
  const d = getDictionary(locale);
  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      // Phải viết bằng mã unicode tường minh. Dán thẳng dấu thanh vào regex
      // thì nó không khớp, dấu bị dòng dưới đổi thành khoảng trắng và
      // "mức" vỡ thành "mu" + "c" — hỏng toàn bộ việc so khớp tiếng Việt.
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\u0111/g, "d")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);

  const qWords = norm(question);
  const q = new Set(qWords);
  if (!q.size) return d.assistant.noAnswer;

  const pool: { q: string; a: string }[] = [
    ...d.whatIs.faq.items.map((f) => ({ q: f.q, a: f.a })),
    ...d.whatIs.rules.items.map((r) => ({ q: r.title, a: r.body })),
    ...Object.values(d.services.items).map((s) => ({
      q: `${s.name} ${s.tagline}`,
      a: `${s.tagline} ${s.body[0]}`,
    })),
    // Bất động sản đang có — để chế độ dự phòng cũng trả lời được
    {
      q: `${d.properties.title} ${d.properties.eyebrow} can ho apartment Peristeri Athens gia mua cho thue phong ngu`,
      a: [
        ...properties.map(
          (p) =>
            `${d.properties.items[p.id].name} — ${p.area}: ${p.price}, cho thuê ${p.rent}/tháng, ${p.beds} phòng ngủ, ${p.baths} phòng tắm. ${d.properties.items[p.id].capacity}.`,
        ),
        "",
        d.properties.note,
      ].join("\n"),
    },
    {
      q: `${d.whatIs.thresholds.title} ${d.whatIs.thresholds.tiers.map((t) => t.where).join(" ")}`,
      a: `${d.whatIs.thresholds.tiers.map((t) => `${t.amount} — ${t.where}`).join("\n")}\n\n${d.whatIs.thresholds.sizeBody}`,
    },
  ];

  // Chấm theo TỈ LỆ PHỦ của câu hỏi, không theo điểm tuyệt đối — điểm tuyệt đối
  // thiên vị câu dài và làm câu ngắn không bao giờ đạt ngưỡng.
  let best = { matchQ: 0, cover: 0, a: "" };

  for (const item of pool) {
    const inQ = new Set(norm(item.q));
    const inA = new Set(norm(item.a));
    let matchQ = 0;
    let matchA = 0;
    for (const w of q) {
      if (inQ.has(w)) matchQ++;
      else if (inA.has(w)) matchA++;
    }
    // Trùng ở phần câu hỏi đáng tin gấp đôi trùng trong phần trả lời
    const cover = (matchQ * 2 + matchA) / (q.size * 2);
    if (cover > best.cover) best = { matchQ, cover, a: item.a };
  }

  // Thà nói không biết còn hơn trả lời lạc đề.
  if (best.matchQ >= 2 && best.cover >= 0.35) {
    return `${best.a}\n\n${d.assistant.offlineNote}`;
  }
  return d.assistant.noAnswer;
}
