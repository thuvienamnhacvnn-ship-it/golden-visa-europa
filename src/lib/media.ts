import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Sổ đăng ký ảnh — nguồn sự thật duy nhất.
 *
 * Thả tệp đúng tên vào `public/photos/`, chạy lại build là ảnh tự lên web,
 * thay cho tranh SVG. Chưa có tệp thì giữ tranh vẽ, không vỡ layout.
 *
 * File hướng dẫn làm ảnh gửi khách được SINH RA từ chính danh sách này
 * (`node scripts/make-image-brief.mjs`) nên hai bên không bao giờ lệch nhau.
 */

export type Slot = {
  /** tên tệp cần đặt trong public/photos/ */
  file: string;
  /** tranh SVG dùng tạm khi chưa có ảnh thật */
  fallback: string;
  w: number;
  h: number;
  /** tỉ lệ dùng trong CSS */
  ratio: string;
  /** hiển thị ở đâu trên web */
  where: string;
  /** tiêu đề ngắn cho người làm ảnh */
  title: string;
  /** mô tả để đưa cho AI sinh ảnh */
  prompt: string;
  group: "banner" | "service" | "office" | "people" | "property" | "renovation" | "social";
  /** true = KHÔNG được dùng AI, phải ảnh thật */
  mustBeReal?: boolean;
};

const A = "/art";

export const slots = {
  /* ── Ảnh lớn trang chủ ─────────────────────────────────────── */
  "hero-home": {
    file: "hero-trang-chu.jpg",
    fallback: "",
    w: 2560,
    h: 1280,
    ratio: "2 / 1",
    where: "Nền toàn màn hình của trang chủ, chữ nằm đè bên trái",
    title: "Athens nhìn từ trên cao lúc hoàng hôn",
    prompt:
      "Aerial view of Athens at golden hour, the Acropolis on its hill in the middle distance, white low-rise rooftops spreading out, Mediterranean sea on the horizon, warm amber sunlight raking across the city, deep blue evening sky. Leave the LEFT THIRD visually calm — headline text sits there.",
    group: "banner",
  },

  /* ── Băng ngang đầu các trang con: rộng và thấp ────────────── */
  "banner-what-is": {
    file: "banner-the-vang.jpg",
    fallback: "",
    w: 2400,
    h: 800,
    ratio: "3 / 1",
    where: "Đầu trang /what-is-golden-visa",
    title: "Hộ chiếu và bản đồ Schengen trên bàn gỗ",
    prompt:
      "A passport and a folded map lying on a dark walnut desk, brass desk lamp at the edge, soft morning light from the left, shallow depth of field. Wide letterbox composition, subject slightly right of centre.",
    group: "banner",
  },
  "banner-services": {
    file: "banner-dich-vu.jpg",
    fallback: "",
    w: 2400,
    h: 800,
    ratio: "3 / 1",
    where: "Đầu trang /services và 6 trang dịch vụ con",
    title: "Sảnh cột đá cổ điển Hy Lạp",
    prompt:
      "Colonnade of a classical Greek stone building, long row of fluted columns receding, warm late-afternoon light striping the floor, no people. Wide letterbox composition.",
    group: "banner",
  },
  "banner-about": {
    file: "banner-ve-chung-toi.jpg",
    fallback: "",
    w: 2400,
    h: 800,
    ratio: "3 / 1",
    where: "Đầu trang /about",
    title: "Bàn họp gỗ óc chó bên cửa sổ lớn",
    prompt:
      "Empty walnut boardroom table beside tall windows, soft daylight, leather chairs, restrained and expensive, no people, no visible branding. Wide letterbox composition.",
    group: "banner",
  },
  "banner-why-us": {
    file: "banner-vi-sao-chon.jpg",
    fallback: "",
    w: 2400,
    h: 800,
    ratio: "3 / 1",
    where: "Đầu trang /why-us",
    title: "Ban công nhìn ra biển Aegean",
    prompt:
      "View from a stone terrace over the Aegean sea, white balustrade, olive tree at one edge, calm water, hazy warm horizon, no people. Wide letterbox composition.",
    group: "banner",
  },
  "banner-offices": {
    file: "banner-van-phong.jpg",
    fallback: "",
    w: 2400,
    h: 800,
    ratio: "3 / 1",
    where: "Đầu trang /offices",
    title: "Bản đồ thế giới khắc đồng",
    prompt:
      "Engraved brass world map on a dark surface, four small polished markers placed on Greece, Vietnam and Türkiye, raking light picking out the engraving. Wide letterbox composition.",
    group: "banner",
  },
  "banner-contact": {
    file: "banner-lien-he.jpg",
    fallback: "",
    w: 2400,
    h: 800,
    ratio: "3 / 1",
    where: "Đầu trang /contact",
    title: "Bàn làm việc bên cửa sổ, buổi sáng Athens",
    prompt:
      "A quiet desk by a window in an Athens apartment in the morning, notebook and fountain pen, cup of coffee, soft light, city rooftops blurred outside, no people. Wide letterbox composition.",
    group: "banner",
  },

  /* ── Sáu dịch vụ ───────────────────────────────────────────── */
  "service-golden-visa-acquisition": {
    file: "dv-the-vang.jpg",
    fallback: `${A}/service-golden-visa-acquisition.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ",
    title: "Bộ hồ sơ định cư trên bàn luật sư",
    prompt:
      "A complete residency application file on a lawyer's desk: passport, folder of documents, reading glasses, fountain pen, warm desk light, no people, no readable text on documents.",
    group: "service",
  },
  "service-bank-account-acquisition": {
    file: "dv-ngan-hang.jpg",
    fallback: `${A}/service-bank-account-acquisition.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ",
    title: "Nội thất ngân hàng tư nhân châu Âu",
    prompt:
      "Interior of a classic European private bank: polished marble counter, brass fittings, tall arched windows, quiet and empty, warm daylight, no people, no logos.",
    group: "service",
  },
  "service-real-estate-advisory": {
    file: "dv-tu-van-bds.jpg",
    fallback: `${A}/service-real-estate-advisory.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ",
    title: "Bản vẽ mặt bằng và mô hình toà nhà",
    prompt:
      "Architectural floor plans spread on a table with a small white massing model of a building, scale ruler, soft overhead light, no people.",
    group: "service",
  },
  "service-real-estate-research": {
    file: "dv-nghien-cuu-bds.jpg",
    fallback: `${A}/service-real-estate-research.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ",
    title: "Bản đồ thành phố, kính lúp và ghim đánh dấu",
    prompt:
      "A large city map laid flat, a brass magnifier resting on it, a few small pins marking districts, warm side light, no people.",
    group: "service",
  },
  "service-renovation": {
    file: "dv-cai-tao.jpg",
    fallback: `${A}/service-renovation.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ",
    title: "Căn hộ đang hoàn thiện, nắng qua cửa sổ lớn",
    prompt:
      "A high-end apartment near the end of renovation: fresh plaster, new oak floor partly laid, tall window with strong daylight, a few tools set aside neatly, no people.",
    group: "service",
  },
  "service-property-management": {
    file: "dv-quan-ly-bds.jpg",
    fallback: `${A}/service-property-management.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ",
    title: "Sảnh chung cư cao cấp",
    prompt:
      "Lobby of a high-end residential building: stone floor, concierge desk, tall plants, warm evening light through glass, no people, no signage.",
    group: "service",
  },

  /* ── Bốn văn phòng ─────────────────────────────────────────── */
  "office-athens": {
    file: "tp-athens.jpg",
    fallback: `${A}/office-athens.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô văn phòng ở trang chủ và trang /offices",
    title: "Athens — Acropolis nhìn từ khu Kifisia",
    prompt:
      "Athens cityscape at golden hour with the Acropolis on the horizon, leafy northern suburb rooftops in the foreground, warm light, no people.",
    group: "office",
  },
  "office-thessaloniki": {
    file: "tp-thessaloniki.jpg",
    fallback: `${A}/office-thessaloniki.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô văn phòng ở trang chủ và trang /offices",
    title: "Thessaloniki — Tháp Trắng bên bờ biển",
    prompt:
      "The White Tower of Thessaloniki seen from the waterfront promenade at dusk, calm sea, warm sky, no people in focus.",
    group: "office",
  },
  "office-vietnam": {
    file: "tp-vietnam.jpg",
    fallback: `${A}/office-vietnam.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô văn phòng ở trang chủ và trang /offices",
    title: "Việt Nam — skyline sông Sài Gòn lúc chạng vạng",
    prompt:
      "Ho Chi Minh City skyline across the Saigon river at blue hour, tall towers lit warmly, river reflections, calm, no people.",
    group: "office",
  },
  "office-turkiye": {
    file: "tp-tho-nhi-ky.jpg",
    fallback: `${A}/office-turkiye.svg`,
    w: 1600,
    h: 1200,
    ratio: "4 / 3",
    where: "Ô văn phòng ở trang chủ và trang /offices",
    title: "Istanbul — eo Bosphorus, mái vòm và minaret",
    prompt:
      "Istanbul at golden hour: domes and minarets above the Bosphorus, ferries on the water, warm haze, no people in focus.",
    group: "office",
  },

  /* ── Người: BẮT BUỘC ảnh thật ──────────────────────────────── */
  "portrait-founder": {
    file: "ong-kakkos.jpg",
    fallback: `${A}/crest.svg`,
    w: 1200,
    h: 1500,
    ratio: "4 / 5",
    where: "Mục người sáng lập ở trang chủ và trang /about",
    title: "Chân dung ông Nikolaos T. Kakkos, đối tác tại Athens",
    prompt:
      "ẢNH THẬT. Chân dung doanh nhân, nền tối trung tính hoặc văn phòng, ánh sáng dịu, nhìn thẳng ống kính, trang phục công sở.",
    group: "people",
    mustBeReal: true,
  },
  "team-1": {
    file: "doi-ngu-01.jpg",
    fallback: "",
    w: 900,
    h: 1200,
    ratio: "3 / 4",
    where: "Lưới đội ngũ ở trang /about",
    title: "Thành viên 1 — kèm tên và chức danh",
    prompt: "ẢNH THẬT. Chân dung nửa người, cùng phông nền và ánh sáng với các thành viên khác.",
    group: "people",
    mustBeReal: true,
  },
  "team-2": {
    file: "doi-ngu-02.jpg",
    fallback: "",
    w: 900,
    h: 1200,
    ratio: "3 / 4",
    where: "Lưới đội ngũ ở trang /about",
    title: "Thành viên 2 — kèm tên và chức danh",
    prompt: "ẢNH THẬT. Chân dung nửa người, cùng phông nền và ánh sáng với các thành viên khác.",
    group: "people",
    mustBeReal: true,
  },
  "team-3": {
    file: "doi-ngu-03.jpg",
    fallback: "",
    w: 900,
    h: 1200,
    ratio: "3 / 4",
    where: "Lưới đội ngũ ở trang /about",
    title: "Thành viên 3 — kèm tên và chức danh",
    prompt: "ẢNH THẬT. Chân dung nửa người, cùng phông nền và ánh sáng với các thành viên khác.",
    group: "people",
    mustBeReal: true,
  },
  "team-4": {
    file: "doi-ngu-04.jpg",
    fallback: "",
    w: 900,
    h: 1200,
    ratio: "3 / 4",
    where: "Lưới đội ngũ ở trang /about",
    title: "Luật sư / công chứng viên — kèm tên và số thẻ hành nghề",
    prompt: "ẢNH THẬT. Chân dung nửa người, cùng phông nền và ánh sáng với các thành viên khác.",
    group: "people",
    mustBeReal: true,
  },
} satisfies Record<string, Slot>;

export type SlotId = keyof typeof slots;

const photosDir = path.join(process.cwd(), "public", "photos");

/** Trả về ảnh thật nếu đã có tệp, không thì trả tranh SVG tạm. */
export function pick(id: SlotId): { src: string; isReal: boolean; ratio: string; alt: string } {
  const s = slots[id] as Slot;
  let real = false;
  try {
    real = Boolean(s.file) && existsSync(path.join(photosDir, s.file));
  } catch {
    real = false;
  }
  return {
    src: real ? `/photos/${s.file}` : s.fallback,
    isReal: real,
    ratio: s.ratio,
    alt: s.title,
  };
}

export function hasPhoto(id: SlotId): boolean {
  return pick(id).isReal;
}
