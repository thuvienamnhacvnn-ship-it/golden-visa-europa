import { existsSync } from "node:fs";
import path from "node:path";
import type { ServiceSlug } from "@/i18n";

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

const cityPhoto: Record<string, string> = {
  athens: "tp-athens.jpg", atina: "tp-athens.jpg",
  thessaloniki: "tp-thessaloniki.jpg", selanik: "tp-thessaloniki.jpg",
  vietnam: "tp-vietnam.jpg", "việt nam": "tp-vietnam.jpg",
  turkiye: "tp-tho-nhi-ky.jpg", "türkiye": "tp-tho-nhi-ky.jpg",
  "thổ nhĩ kỳ": "tp-tho-nhi-ky.jpg",
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

const cityArt: Record<string, string> = {
  athens: "/art/office-athens.svg",
  atina: "/art/office-athens.svg",
  thessaloniki: "/art/office-thessaloniki.svg",
  selanik: "/art/office-thessaloniki.svg",
  vietnam: "/art/office-vietnam.svg",
  "việt nam": "/art/office-vietnam.svg",
  turkiye: "/art/office-turkiye.svg",
  "türkiye": "/art/office-turkiye.svg",
  "thổ nhĩ kỳ": "/art/office-turkiye.svg",
};

export function serviceArtSrc(slug: ServiceSlug) {
  return real(servicePhoto[slug], serviceArt[slug]);
}

/** Tên thành phố khác nhau theo ngôn ngữ nên tra bằng bản đã chuẩn hoá. */
export function cityArtSrc(city: string) {
  const key = city.trim().toLowerCase();
  return real(cityPhoto[key] ?? "", cityArt[key] ?? "/art/office-athens.svg");
}

export const crestSrc = "/art/crest.svg";

export function Artwork({
  src,
  alt,
  ratio = "4 / 3",
  className = "",
  priority = false,
  fit = "cover",
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  /** "contain" cho bản vẽ kỹ thuật: cắt mất một mẩu là mất thông tin. */
  fit?: "cover" | "contain";
}) {
  return (
    <div
      className={`media zoom-wrap relative bg-deep-2 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
      />
    </div>
  );
}
