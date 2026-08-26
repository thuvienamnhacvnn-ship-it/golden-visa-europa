import type { ServiceSlug } from "@/i18n";

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
  return serviceArt[slug];
}

/** Tên thành phố khác nhau theo ngôn ngữ nên tra bằng bản đã chuẩn hoá. */
export function cityArtSrc(city: string) {
  return cityArt[city.trim().toLowerCase()] ?? "/art/office-athens.svg";
}

export const crestSrc = "/art/crest.svg";

export function Artwork({
  src,
  alt,
  ratio = "4 / 3",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
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
        className="h-full w-full object-cover"
      />
    </div>
  );
}
