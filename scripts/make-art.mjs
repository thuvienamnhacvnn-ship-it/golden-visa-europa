/**
 * Sinh toàn bộ tranh minh hoạ của site ra public/art/*.svg
 *
 * Vì sao là SVG tự vẽ: PDF của khách chỉ chứa logo Gmail, fanpage thì bị tường
 * đăng nhập, và trên máy không có model sinh ảnh. Ảnh stock thì không được dùng.
 * Nên toàn bộ tranh ở đây là hình gốc, vẽ bằng code, cùng một hệ màu thương hiệu.
 *
 * Chạy lại:  node scripts/make-art.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "art");
mkdirSync(outDir, { recursive: true });

const C = {
  navy: "#0E2A47",
  navyDeep: "#071B30",
  navyMid: "#1F4A72",
  gold: "#C8A44D",
  goldLight: "#D9BD77",
  cream: "#FAF9F6",
  creamAlt: "#F3F1EA",
};

/** Khung chung: nền navy chuyển sắc + lưới mảnh + vầng sáng vàng. */
function frame(id, w, h, body, { ground = "navy" } = {}) {
  const bg = ground === "navy" ? C.navyDeep : C.creamAlt;
  const bg2 = ground === "navy" ? C.navyMid : C.cream;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>
    <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${bg2}"/>
      <stop offset="1" stop-color="${bg}"/>
    </linearGradient>
    <radialGradient id="${id}-sun" cx="0.72" cy="0.26" r="0.34">
      <stop offset="0" stop-color="${C.gold}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${C.gold}" stop-opacity="0"/>
    </radialGradient>
    <!-- userSpaceOnUse là bắt buộc: với objectBoundingBox, một nét thẳng đứng
         hay nằm ngang có bbox rộng/cao bằng 0 nên SVG bỏ không vẽ. -->
    <linearGradient id="${id}-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${h}">
      <stop offset="0" stop-color="${C.goldLight}" stop-opacity="1"/>
      <stop offset="1" stop-color="${C.gold}" stop-opacity="0.78"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${id}-sky)"/>
  <rect width="${w}" height="${h}" fill="url(#${id}-sun)"/>
  <g stroke="${C.gold}" stroke-opacity="0.10" stroke-width="1">
    ${Array.from({ length: Math.ceil(w / 48) }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="${h}"/>`).join("")}
  </g>
${body}
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="${C.gold}" stroke-opacity="0.35"/>
</svg>
`;
}

/** Mặt nước phản chiếu — dùng cho các thành phố ven biển. */
function water(y, w, h) {
  return `  <g stroke="${C.gold}" stroke-opacity="0.28" stroke-width="1.2" stroke-linecap="round">
    ${Array.from({ length: 14 }, (_, i) => {
      const yy = y + 10 + i * ((h - y - 10) / 14);
      const len = 40 + ((i * 67) % 160);
      const x = 30 + ((i * 137) % (w - 220));
      return `<line x1="${x}" y1="${yy.toFixed(1)}" x2="${x + len}" y2="${yy.toFixed(1)}"/>`;
    }).join("\n    ")}
  </g>`;
}

const stroke = (id) =>
  `fill="none" stroke="url(#${id}-line)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="square"`;

/* ── Thành phố: 4 văn phòng ───────────────────────────────────── */

function athens(id) {
  const W = 800, H = 600;
  const cols = Array.from({ length: 8 }, (_, i) => {
    const x = 236 + i * 42;
    return `<rect x="${x}" y="300" width="26" height="150"/>
      <line x1="${x + 8}" y1="310" x2="${x + 8}" y2="442"/>
      <line x1="${x + 17}" y1="310" x2="${x + 17}" y2="442"/>`;
  }).join("\n      ");

  return frame(id, W, H, `  <g ${stroke(id)}>
    <path d="M206 300 L400 214 L594 300 Z"/>
    <rect x="216" y="278" width="368" height="24"/>
    ${cols}
    <rect x="206" y="450" width="388" height="18"/>
    <rect x="188" y="468" width="424" height="14"/>
    <path d="M60 520 L740 520"/>
    <!-- Cây bách: hình dễ đọc hơn tán tròn, và đúng chất Địa Trung Hải -->
    <path d="M118 520 v-30"/>
    <path d="M118 490 c-22 0 -30 -26 -24 -58 c5 -27 16 -50 24 -62 c8 12 19 35 24 62 c6 32 -2 58 -24 58 Z"/>
    <path d="M118 400 v86" stroke-opacity="0.4"/>
    <path d="M672 520 v-26"/>
    <path d="M672 494 c-18 0 -25 -22 -20 -48 c4 -22 13 -41 20 -51 c7 10 16 29 20 51 c5 26 -2 48 -20 48 Z"/>
    <path d="M672 414 v72" stroke-opacity="0.4"/>
    <path d="M0 560 h800" stroke-opacity="0.5"/>
  </g>
  <g fill="${C.gold}" fill-opacity="0.5">
    <circle cx="576" cy="156" r="4"/><circle cx="642" cy="120" r="3"/><circle cx="700" cy="176" r="2.5"/>
  </g>`);
}

function thessaloniki(id) {
  const W = 800, H = 600;
  return frame(id, W, H, `  <g ${stroke(id)}>
    <rect x="330" y="188" width="140" height="252" rx="4"/>
    <rect x="316" y="170" width="168" height="22" rx="3"/>
    <path d="M330 240 h140 M330 300 h140 M330 360 h140" stroke-opacity="0.55"/>
    ${Array.from({ length: 4 }, (_, i) => `<rect x="${356 + i * 32}" y="${212}" width="14" height="20" rx="7"/>`).join("")}
    ${Array.from({ length: 4 }, (_, i) => `<rect x="${356 + i * 32}" y="${272}" width="14" height="20" rx="7"/>`).join("")}
    ${Array.from({ length: 4 }, (_, i) => `<rect x="${356 + i * 32}" y="${332}" width="14" height="20" rx="7"/>`).join("")}
    <rect x="352" y="152" width="96" height="20" rx="3"/>
    <path d="M400 152 v-28 M386 124 h28"/>
    <rect x="112" y="316" width="136" height="124"/>
    <path d="M112 316 h136 M112 352 h136 M112 396 h136" stroke-opacity="0.5"/>
    ${Array.from({length:4},(_,i)=>`<path d="M${128+i*32} 440 v-30 a10 10 0 0 1 20 0 v30"/>`).join("")}
    ${Array.from({length:4},(_,i)=>`<rect x="${128+i*32}" y="362" width="20" height="24" rx="10"/>`).join("")}
    <rect x="556" y="344" width="148" height="96"/>
    <path d="M556 344 h148 M556 388 h148" stroke-opacity="0.5"/>
    ${Array.from({length:4},(_,i)=>`<path d="M${572+i*34} 440 v-32 a11 11 0 0 1 22 0 v32"/>`).join("")}
    <path d="M60 440 h680"/>
  </g>
${water(452, W, H)}`);
}

function vietnam(id) {
  const W = 800, H = 600;
  // Kẻ tầng phải đủ đậm, bản trước mờ quá nên toà nhà thành hộp trơn.
  const block = ([x, y, w, h]) => {
    const floors = Array.from({ length: Math.floor((h - 26) / 24) }, (_, i) =>
      `<line x1="${x + 7}" y1="${y + 24 + i * 24}" x2="${x + w - 7}" y2="${y + 24 + i * 24}" stroke-opacity="0.6"/>`).join("");
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>${floors}`;
  };
  const skyline = [
    [92, 322, 74, 138], [174, 268, 58, 192], [242, 350, 66, 110],
    [590, 300, 62, 160], [660, 352, 56, 108], [724, 286, 62, 174],
  ].map(block).join("\n    ");

  return frame(id, W, H, `  <g ${stroke(id)}>
    ${skyline}

    <!-- Tháp chủ đạo: thân thon, sân đỗ trực thăng đua ra một bên -->
    <path d="M340 460 V200 l32 -32 h96 v292 z"/>
    <path d="M340 246 h128 M340 298 h128 M340 350 h128 M340 402 h128" stroke-opacity="0.6"/>
    <ellipse cx="524" cy="232" rx="48" ry="12"/>
    <path d="M476 232 h-8" stroke-opacity="0.8"/>
    <path d="M372 168 v-36"/>

    <!-- Tháp phụ mái vát -->
    <path d="M496 460 V306 l28 -32 v186 z"/>
    <path d="M496 348 h28 M496 398 h28" stroke-opacity="0.55"/>

    <path d="M40 460 h720"/>
  </g>

  <!-- Thuyền buồm: cột + hai cánh buồm tam giác, gọn và đọc được ngay -->
  <g ${stroke(id)}>
    <path d="M196 546 h164 l-22 26 h-120 z"/>
    <path d="M278 520 V408"/>
    <path d="M282 416 l58 104 h-58 z"/>
    <path d="M274 442 l-46 78 h46 z"/>
    <path d="M226 520 h128" stroke-opacity="0.55"/>
  </g>`);
}

function turkiye(id) {
  const W = 800, H = 600;
  // Thân tháp vẽ bằng rect chứ không phải 1 đường thẳng — bản trước
  // nét quá mảnh nên chỉ còn thấy chóp lơ lửng.
  const minaret = (x) =>
    `<rect x="${x - 9}" y="236" width="18" height="204"/>
     <path d="M${x - 15} 236 h30"/>
     <path d="M${x - 13} 224 h26 l-13 -34 z"/>
     <path d="M${x} 190 v-22"/>
     <path d="M${x - 9} 300 h18 M${x - 9} 356 h18" stroke-opacity="0.5"/>`;

  return frame(id, W, H, `  <g ${stroke(id)}>
    <path d="M300 340 a100 92 0 0 1 200 0"/>
    <path d="M300 340 h200 v100 h-200 z"/>
    <path d="M400 248 v-30 l-10 -18 h20 l-10 18"/>
    <path d="M338 316 a62 56 0 0 1 124 0" stroke-opacity="0.45"/>
    <path d="M348 372 a52 40 0 0 1 104 0 v68 h-104 z"/>
    ${minaret(268)}
    ${minaret(532)}
    <path d="M170 392 a58 52 0 0 1 116 0 v48 h-116 z" stroke-opacity="0.55"/>
    <path d="M514 400 a54 48 0 0 1 108 0 v40 h-108 z" stroke-opacity="0.55"/>
    <path d="M60 440 h680"/>
  </g>
${water(452, W, H)}`);
}

/* ── Sáu dịch vụ ──────────────────────────────────────────────── */

function svcGoldenVisa(id) {
  const W = 640, H = 480;
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const cx = 320 + Math.cos(a) * 104, cy = 250 + Math.sin(a) * 104;
    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5" fill="${C.gold}" fill-opacity="0.75" stroke="none"/>`;
  }).join("\n    ");

  return frame(id, W, H, `  <g ${stroke(id)}>
    <rect x="238" y="150" width="164" height="216" rx="8"/>
    <path d="M238 186 h164" stroke-opacity="0.5"/>
    <circle cx="320" cy="256" r="42"/>
    <path d="M278 256 h84 M320 214 a56 42 0 0 1 0 84 a56 42 0 0 1 0 -84" stroke-opacity="0.6"/>
    <path d="M272 330 h96 M272 348 h64" stroke-opacity="0.6"/>
    <rect x="392" y="286" width="96" height="72" rx="4" transform="rotate(-12 440 322)"/>
    <path d="M410 316 h60 M410 334 h40" stroke-opacity="0.55" transform="rotate(-12 440 322)"/>
  </g>
  <g>${stars}</g>`);
}

function svcBank(id) {
  const W = 640, H = 480;
  const cols = Array.from({ length: 5 }, (_, i) =>
    `<rect x="${216 + i * 44}" y="212" width="24" height="128"/><line x1="${224 + i * 44}" y1="222" x2="${224 + i * 44}" y2="330" stroke-opacity="0.5"/>`).join("");
  return frame(id, W, H, `  <g ${stroke(id)}>
    <path d="M188 212 L320 148 L452 212 Z"/>
    <rect x="196" y="192" width="248" height="20"/>
    ${cols}
    <rect x="188" y="340" width="264" height="16"/>
    <rect x="172" y="356" width="296" height="12"/>
    <rect x="118" y="370" width="152" height="92" rx="8"/>
    <path d="M118 398 h152" stroke-opacity="0.6"/>
    <rect x="136" y="412" width="26" height="20" rx="3" stroke-opacity="0.7"/>
    <path d="M136 446 h52 M200 446 h32" stroke-opacity="0.5"/>
    <circle cx="470" cy="418" r="38"/>
    <path d="M470 396 v44 M458 406 h20 a10 10 0 0 1 0 20 h-16 a10 10 0 0 0 0 20 h22" stroke-opacity="0.75"/>
  </g>`);
}

function svcAdvisory(id) {
  const W = 640, H = 480;
  const bars = [[190, 120], [246, 176], [302, 148], [358, 226], [414, 198], [470, 268]]
    .map(([x, h]) => `<rect x="${x}" y="${372 - h}" width="34" height="${h}"/>`).join("\n    ");
  return frame(id, W, H, `  <g ${stroke(id)}>
    ${bars}
    <path d="M150 372 h380 M150 372 V132"/>
    <path d="M172 300 L228 246 L284 268 L340 190 L396 214 L452 136" stroke="${C.goldLight}" stroke-opacity="0.9"/>
    ${[[172, 300], [228, 246], [284, 268], [340, 190], [396, 214], [452, 136]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${C.navyDeep}"/>`).join("\n    ")}
    <path d="M452 136 l26 -6 l-6 26" />
    <path d="M150 404 h380" stroke-opacity="0.4"/>
  </g>`);
}

function svcResearch(id) {
  const W = 640, H = 480;
  const grid = Array.from({ length: 7 }, (_, i) =>
    `<line x1="${140 + i * 60}" y1="120" x2="${140 + i * 60}" y2="380" stroke-opacity="0.28"/>`).join("") +
    Array.from({ length: 5 }, (_, i) =>
      `<line x1="140" y1="${120 + i * 65}" x2="500" y2="${120 + i * 65}" stroke-opacity="0.28"/>`).join("");
  const pin = (x, y) =>
    `<path d="M${x} ${y} c-16 -18 -24 -28 -24 -40 a24 24 0 0 1 48 0 c0 12 -8 22 -24 40 Z"/><circle cx="${x}" cy="${y - 42}" r="8"/>`;
  return frame(id, W, H, `  <g ${stroke(id)}>
    ${grid}
    <rect x="140" y="120" width="360" height="260"/>
    ${pin(230, 250)}
    ${pin(370, 200)}
    ${pin(430, 320)}
    <circle cx="404" cy="352" r="56" stroke="${C.goldLight}"/>
    <path d="M444 392 l44 44" stroke="${C.goldLight}" stroke-width="4"/>
  </g>`);
}

function svcRenovation(id) {
  const W = 640, H = 480;
  return frame(id, W, H, `  <g ${stroke(id)}>
    <path d="M164 260 L320 148 L476 260"/>
    <path d="M186 246 V392 h268 V246"/>
    <rect x="222" y="290" width="72" height="60"/>
    <path d="M258 290 v60 M222 320 h72" stroke-opacity="0.5"/>
    <rect x="352" y="290" width="66" height="102"/>
    <circle cx="404" cy="344" r="4" fill="${C.gold}" stroke="none"/>
    <path d="M140 392 h360"/>
    <!-- bay trát -->
    <path d="M498 212 l70 30 -15 32 -70 -30 z"/>
    <path d="M492 252 l-30 46 a13 13 0 0 0 22 14 l28 -46" stroke-opacity="0.75"/>
    <!-- con lăn sơn -->
    <rect x="86" y="184" width="74" height="30" rx="9"/>
    <path d="M96 184 v30 M110 184 v30 M136 184 v30 M150 184 v30" stroke-opacity="0.45"/>
    <path d="M123 214 v28 h-30 v58"/>
    <path d="M82 300 h22 v28 h-22 z"/>
  </g>
  <g stroke="${C.gold}" stroke-opacity="0.3" stroke-dasharray="6 8" stroke-width="1.4" fill="none">
    <path d="M186 246 h268"/>
  </g>`);
}

function svcManagement(id) {
  const W = 640, H = 480;
  const win = (bx, by, cols, rows) =>
    Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) =>
        `<rect x="${bx + 14 + c * 30}" y="${by + 18 + r * 34}" width="18" height="22"/>`).join("")).join("");
  return frame(id, W, H, `  <g ${stroke(id)}>
    <rect x="152" y="168" width="140" height="224"/>
    ${win(152, 168, 4, 5)}
    <rect x="308" y="228" width="118" height="164"/>
    ${win(308, 228, 3, 4)}
    <path d="M120 392 h420"/>
    <circle cx="486" cy="236" r="34"/>
    <circle cx="486" cy="236" r="13" fill="${C.navyDeep}"/>
    <path d="M486 270 v96"/>
    <path d="M486 320 h26 v18"/>
    <path d="M486 348 h20 v16"/>
  </g>
  <g stroke="${C.gold}" stroke-opacity="0.45" stroke-width="1.4" fill="none">
    <path d="M132 424 h376"/>
  </g>`);
}

/* ── Huy hiệu chữ lồng thay cho ảnh chân dung ─────────────────── */

function crest() {
  const W = 480, H = 600;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="cr-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.navyMid}"/><stop offset="1" stop-color="${C.navyDeep}"/>
    </linearGradient>
    <linearGradient id="cr-gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0" stop-color="${C.goldLight}"/><stop offset="1" stop-color="${C.gold}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#cr-bg)"/>
  <g stroke="${C.gold}" stroke-opacity="0.12">
    ${Array.from({ length: 10 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="${H}"/>`).join("")}
  </g>
  <g fill="none" stroke="url(#cr-gold)" stroke-width="1.6">
    <circle cx="240" cy="268" r="118"/>
    <circle cx="240" cy="268" r="98" stroke-opacity="0.45"/>
    <path d="M240 192 l11 27 l29 3 l-21 21 l6 29 l-25 -15 l-25 15 l6 -29 l-21 -21 l29 -3 z" stroke-opacity="0.85"/>
    <path d="M150 268 h-40 M330 268 h40"/>
  </g>
  <text x="240" y="322" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="54" letter-spacing="6" fill="url(#cr-gold)">NK</text>
  <text x="240" y="430" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="19" letter-spacing="7" fill="${C.cream}" fill-opacity="0.82">N. KAKKOS ESTATE</text>
  <text x="240" y="462" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="12" letter-spacing="5" fill="${C.gold}" fill-opacity="0.8">ATHENS · SINCE 2014</text>
  <g stroke="${C.gold}" stroke-opacity="0.55" stroke-width="1.3" fill="none">
    <path d="M138 522 h204"/>
    ${Array.from({ length: 6 }, (_, i) => {
      const x = 144 + i * 34;
      return `<path d="M${x} 522 v-22 h22 v14 h-13 v-7 h5"/>`;
    }).join("")}
  </g>
  <rect x="0.8" y="0.8" width="${W - 1.6}" height="${H - 1.6}" fill="none" stroke="${C.gold}" stroke-opacity="0.4"/>
</svg>
`;
}

/* ── Xuất ─────────────────────────────────────────────────────── */

const art = {
  "office-athens": athens("ath"),
  "office-thessaloniki": thessaloniki("thes"),
  "office-vietnam": vietnam("vn"),
  "office-turkiye": turkiye("tr"),
  "service-golden-visa-acquisition": svcGoldenVisa("sv1"),
  "service-bank-account-acquisition": svcBank("sv2"),
  "service-real-estate-advisory": svcAdvisory("sv3"),
  "service-real-estate-research": svcResearch("sv4"),
  "service-renovation": svcRenovation("sv5"),
  "service-property-management": svcManagement("sv6"),
  crest: crest(),
};

let total = 0;
for (const [name, svg] of Object.entries(art)) {
  const file = join(outDir, `${name}.svg`);
  writeFileSync(file, svg, "utf8");
  total += Buffer.byteLength(svg);
  console.log(`${name}.svg  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
console.log(`\n${Object.keys(art).length} tệp, tổng ${(total / 1024).toFixed(1)} KB → public/art/`);

/* ── Băng ngang đầu trang: rộng 3:1, thấp ─────────────────────── */

/**
 * Banner phải đọc được ở dải rất thấp, nên bố cục là:
 * đường chân trời + hoạ tiết lặp, KHÔNG phải một vật thể ở giữa.
 */
function banner(id, motif) {
  const W = 2400, H = 800;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.navyMid}"/><stop offset="1" stop-color="${C.navyDeep}"/>
    </linearGradient>
    <linearGradient id="${id}-ln" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0" stop-color="${C.goldLight}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${C.gold}" stop-opacity="0.6"/>
    </linearGradient>
    <radialGradient id="${id}-sun" cx="0.78" cy="0.3" r="0.5">
      <stop offset="0" stop-color="${C.gold}" stop-opacity="0.4"/>
      <stop offset="1" stop-color="${C.gold}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.navyDeep}" stop-opacity="0.92"/>
      <stop offset="0.55" stop-color="${C.navyDeep}" stop-opacity="0.25"/>
      <stop offset="1" stop-color="${C.navyDeep}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#${id}-bg)"/>
  <rect width="${W}" height="${H}" fill="url(#${id}-sun)"/>
  <g stroke="${C.gold}" stroke-opacity="0.09">
    ${Array.from({ length: Math.ceil(W / 60) }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${H}"/>`).join("")}
  </g>
${motif(id, W, H)}
  <rect width="${W}" height="${H}" fill="url(#${id}-fade)"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${C.gold}" stroke-opacity="0.3"/>
</svg>
`;
}

const bStroke = (id) =>
  `fill="none" stroke="url(#${id}-ln)" stroke-width="2" stroke-linejoin="round" stroke-linecap="square"`;

// Hàng cột chạy suốt chiều ngang
const motifColumns = (id, W, H) => `  <g ${bStroke(id)}>
    ${Array.from({ length: 14 }, (_, i) => {
      const x = 620 + i * 130;
      return `<rect x="${x}" y="300" width="54" height="330"/>
      <line x1="${x + 14}" y1="316" x2="${x + 14}" y2="614" stroke-opacity="0.5"/>
      <line x1="${x + 27}" y1="316" x2="${x + 27}" y2="614" stroke-opacity="0.5"/>
      <line x1="${x + 40}" y1="316" x2="${x + 40}" y2="614" stroke-opacity="0.5"/>
      <rect x="${x - 10}" y="282" width="74" height="18"/>`;
    }).join("\n    ")}
    <rect x="600" y="248" width="1800" height="30"/>
    <path d="M560 630 H2400"/>
    <path d="M520 668 H2400" stroke-opacity="0.45"/>
  </g>`;

// Đường chân trời thành phố + mặt nước
const motifSkyline = (id, W, H) => {
  const b = [];
  let x = 560;
  const hs = [180, 300, 240, 380, 210, 330, 270, 420, 240, 310, 190, 350, 260, 300];
  for (let i = 0; i < hs.length; i++) {
    const w = 90 + ((i * 37) % 70);
    b.push(`<rect x="${x}" y="${600 - hs[i]}" width="${w}" height="${hs[i]}"/>`);
    for (let r = 1; r * 34 < hs[i] - 20; r++)
      b.push(`<line x1="${x + 8}" y1="${600 - hs[i] + r * 34}" x2="${x + w - 8}" y2="${600 - hs[i] + r * 34}" stroke-opacity="0.35"/>`);
    x += w + 30;
  }
  return `  <g ${bStroke(id)}>
    ${b.join("\n    ")}
    <path d="M480 600 H2400"/>
  </g>
  <g stroke="${C.gold}" stroke-opacity="0.22" stroke-width="2" stroke-linecap="round">
    ${Array.from({ length: 16 }, (_, i) => {
      const y = 630 + i * 10;
      const len = 90 + ((i * 113) % 260);
      const sx = 520 + ((i * 191) % 1500);
      return `<line x1="${sx}" y1="${y}" x2="${sx + len}" y2="${y}"/>`;
    }).join("\n    ")}
  </g>`;
};

// Sóng biển + đường chân trời phẳng
const motifSea = (id, W, H) => `  <g ${bStroke(id)}>
    <path d="M420 470 H2400"/>
    <path d="M1720 470 a120 120 0 0 1 240 0" stroke-opacity="0.7"/>
    <path d="M1780 470 v-118 M1900 470 v-84" stroke-opacity="0.35"/>
  </g>
  <g stroke="${C.gold}" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round">
    ${Array.from({ length: 22 }, (_, i) => {
      const y = 508 + i * 13;
      const len = 110 + ((i * 149) % 320);
      const sx = 440 + ((i * 227) % 1600);
      return `<line x1="${sx}" y1="${y}" x2="${sx + len}" y2="${y}"/>`;
    }).join("\n    ")}
  </g>`;

// Diềm meander lặp suốt chiều ngang
const motifMeander = (id, W, H) => `  <g ${bStroke(id)}>
    <path d="M480 470 H2400"/>
    ${Array.from({ length: 26 }, (_, i) => {
      const x = 500 + i * 74;
      return `<path d="M${x} 470 v-52 h52 v34 h-31 v-17 h13"/>`;
    }).join("\n    ")}
    <path d="M480 560 H2400" stroke-opacity="0.4"/>
    <path d="M480 596 H2400" stroke-opacity="0.25"/>
  </g>`;

const banners = {
  "banner-hero": banner("bh", motifColumns),
  "banner-what-is": banner("bw", motifMeander),
  "banner-services": banner("bs", motifColumns),
  "banner-about": banner("ba", motifMeander),
  "banner-why-us": banner("by", motifSea),
  "banner-offices": banner("bo", motifSkyline),
  "banner-contact": banner("bc", motifSea),
};

let bTotal = 0;
for (const [name, svg] of Object.entries(banners)) {
  writeFileSync(join(outDir, `${name}.svg`), svg, "utf8");
  bTotal += Buffer.byteLength(svg);
  console.log(`${name}.svg  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
console.log(`+ ${Object.keys(banners).length} banner, ${(bTotal / 1024).toFixed(1)} KB`);
