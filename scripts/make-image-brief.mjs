/**
 * Sinh file yêu cầu làm ảnh TỪ src/lib/media.ts.
 * Sửa sổ đăng ký là file này tự đổi theo — hai bên không bao giờ lệch nhau.
 *
 * Chạy: node scripts/make-image-brief.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src", "lib", "media.ts"), "utf8");

/* Không import trực tiếp được vì media.ts dùng node:fs và cú pháp TS.
   Cắt đúng khối object rồi cho JS tự đánh giá — nội dung chỉ là literal. */
const start = src.indexOf("export const slots = {") + "export const slots = ".length;
const end = src.indexOf("} satisfies Record") + 1;
const literal = src.slice(start, end);

// `A` là hằng đường dẫn khai báo phía trên khối slots trong media.ts — lấy theo
const A = (src.match(/const A = "([^"]+)"/) || [])[1] ?? "/art";
const slots = new Function("A", `"use strict"; return (${literal});`)(A);

const entries = Object.entries(slots).map(([id, s]) => ({ id, ...s }));

const GROUPS = {
  banner: "A. Băng ngang đầu trang — RỘNG và THẤP",
  service: "B. Sáu dịch vụ",
  office: "C. Bốn văn phòng",
  people: "D. ẢNH NGƯỜI — KHÔNG dùng AI",
};

const ai = entries.filter((e) => !e.mustBeReal);
const real = entries.filter((e) => e.mustBeReal);

let out = `# Yêu cầu ảnh — website Golden Visa (N. Kakkos Estate)

> File này **sinh tự động** từ \`src/lib/media.ts\`. Đừng sửa tay — sửa sổ đăng ký rồi chạy
> \`node scripts/make-image-brief.mjs\`.

**${ai.length} ảnh làm bằng AI + ${real.length} ảnh phải là ảnh thật.**

Lưu ảnh **đúng tên tệp** vào \`C:\\Users\\admin\\golden-visa\\public\\photos\\\` rồi chạy \`npm run build\`.
Ảnh nào chưa có thì web tự dùng tranh SVG thay thế, không vỡ layout.

---

## Quy ước — dán vào cuối MỌI prompt

\`\`\`
editorial architectural photography, natural daylight, warm golden-hour light,
deep navy blue and warm antique gold palette, calm premium mood, muted contrast,
no text, no letters, no logos, no watermark, no signage, no recognisable faces,
sharp detail, shot on 35mm, photorealistic
\`\`\`

**Chủ thể để giữa khung, chừa lề rộng** — cùng một ảnh bị cắt theo nhiều tỉ lệ khác nhau.

**Riêng nhóm A (băng ngang):** chừa **một phần ba bên trái** thoáng và tối, vì chữ tiêu đề
nằm đè lên đó. Đây là lý do banner phải rộng và thấp chứ không phải ảnh vuông.

---
`;

for (const [key, heading] of Object.entries(GROUPS)) {
  const list = entries.filter((e) => e.group === key);
  if (!list.length) continue;

  out += `\n## ${heading}\n\n`;
  out += `| # | Tên tệp | Kích thước | Tỉ lệ | Tiêu đề |\n|---|---|---|---|---|\n`;
  list.forEach((e, i) => {
    out += `| ${i + 1} | \`${e.file}\` | ${e.w}×${e.h} | ${e.ratio.replace(/ /g, "")} | ${e.title} |\n`;
  });

  out += `\n<details>\n<summary><b>Prompt chi tiết từng ảnh</b></summary>\n\n`;
  for (const e of list) {
    out += `#### \`${e.file}\`\n`;
    out += `**${e.title}**\n\n`;
    out += `- Dùng ở: ${e.where}\n`;
    out += `- Kích thước: **${e.w}×${e.h}** (tỉ lệ ${e.ratio.replace(/ /g, "")})\n\n`;
    out += `> ${e.prompt}\n\n`;
  }
  out += `</details>\n`;
}

out += `
---

## Video WebM nền trong suốt (đè lên banner trang chủ)

Anh gửi video, tôi tách nền. Tệp đích: \`public/video/hero-overlay.webm\`

\`\`\`
ffmpeg -i nguon.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 30 -an -auto-alt-ref 0 hero-overlay.webm
\`\`\`

**Bắt buộc có \`-auto-alt-ref 0\`** — thiếu là mất kênh trong suốt, video ra nền đen.

Gợi ý: dài 6–12 giây, có điểm nối lặp mượt, và đặt nội dung ở **nửa phải khung hình**
vì nửa trái đã có chữ tiêu đề.

---

## Vì sao ${real.length} ảnh người không được dùng AI

Đây là người có thật, tên thật in dưới ảnh trên web công ty. Dùng khuôn mặt do AI bịa rồi
đề tên ông Kakkos là giả mạo — khách đầu tư hàng trăm nghìn euro mà phát hiện ra thì hỏng cả
thương hiệu, chưa kể rủi ro pháp lý. Chưa có ảnh thật thì giữ huy hiệu NK: vẫn sang, mà trung thực.

Kèm theo mỗi ảnh người: **tên đầy đủ + chức danh**.
`;

const dest = "E:\\Works\\itw\\Golden-anh-khach-gui\\YEU-CAU-ANH.md";
writeFileSync(dest, out, "utf8");
mkdirSync(join(root, "public", "photos"), { recursive: true });
writeFileSync(join(root, "public", "photos", "YEU-CAU-ANH.md"), out, "utf8");

console.log(`Đã sinh yêu cầu cho ${entries.length} ảnh (${ai.length} bằng AI + ${real.length} ảnh thật)`);
for (const [k, h] of Object.entries(GROUPS)) {
  const n = entries.filter((e) => e.group === k).length;
  if (n) console.log(`  ${h}: ${n}`);
}
console.log(`-> ${dest}`);
