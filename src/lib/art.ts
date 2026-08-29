import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import type { ServiceSlug } from "@/i18n";

/**
 * Chọn nguồn ảnh. TÁCH RIÊNG khỏi components/Artwork.tsx vì phần này đọc đĩa
 * bằng node:fs; để chung thì component client nào import Artwork cũng kéo
 * theo node:fs vào bundle trình duyệt và Turbopack gãy khi đóng gói.
 */
/** Có ảnh thật trong public/photos thì dùng, chưa có thì dùng tranh SVG. */
function real(file: string, fallback: string): string {
  try {
    if (existsSync(path.join(process.cwd(), "public", "photos", file))) {
      return `/photos/${file}`;
    }
  } catch {
    /* bỏ qua */
  }
  return fallback;
}

const servicePhoto: Record<ServiceSlug, string> = {
  "golden-visa-acquisition": "dv-the-vang.jpg",
  "bank-account-acquisition": "dv-ngan-hang.jpg",
  "real-estate-advisory": "dv-tu-van-bds.jpg",
  "real-estate-research": "dv-nghien-cuu-bds.jpg",
  renovation: "dv-cai-tao.jpg",
  "property-management": "dv-quan-ly-bds.jpg",
};

/**
 * Ảnh và tranh minh hoạ văn phòng tra bằng MÃ CỐ ĐỊNH, không bằng tên thành
 * phố. Tên thành phố đổi theo ngôn ngữ ("Athens" / "Αθήνα" / "Atēnas") nên
 * dùng làm khoá thì mọi ngôn ngữ ngoài tiếng Anh đều tra trượt.
 */
export type OfficeSlug =
  | "athens"
  | "thessaloniki"
  | "budapest"
  | "germany"
  | "hanoi"
  | "turkiye";

const cityPhoto: Record<OfficeSlug, string> = {
  athens: "tp-athens.jpg",
  thessaloniki: "tp-thessaloniki.jpg",
  budapest: "tp-budapest.jpg",
  germany: "tp-duc.jpg",
  // Hà Nội dùng lại ảnh Việt Nam đã có; chưa có ảnh riêng thì rơi về tranh vẽ.
  hanoi: "tp-vietnam.jpg",
  turkiye: "tp-tho-nhi-ky.jpg",
};

/**
 * Tranh minh hoạ gốc, sinh bằng `node scripts/make-art.mjs`.
 * Là SVG nên không cần next/image: nhẹ, sắc ở mọi mật độ điểm ảnh.
 */

const serviceArt: Record<ServiceSlug, string> = {
  "golden-visa-acquisition": "/art/service-golden-visa-acquisition.svg",
  "bank-account-acquisition": "/art/service-bank-account-acquisition.svg",
  "real-estate-advisory": "/art/service-real-estate-advisory.svg",
  "real-estate-research": "/art/service-real-estate-research.svg",
  renovation: "/art/service-renovation.svg",
  "property-management": "/art/service-property-management.svg",
};

const cityArt: Record<OfficeSlug, string> = {
  athens: "/art/office-athens.svg",
  thessaloniki: "/art/office-thessaloniki.svg",
  budapest: "/art/office-budapest.svg",
  germany: "/art/office-germany.svg",
  hanoi: "/art/office-vietnam.svg",
  turkiye: "/art/office-turkiye.svg",
};

export function serviceArtSrc(slug: ServiceSlug) {
  return real(servicePhoto[slug], serviceArt[slug]);
}

export function cityArtSrc(slug: OfficeSlug) {
  return real(cityPhoto[slug], cityArt[slug]);
}

export const crestSrc = "/art/crest.svg";
