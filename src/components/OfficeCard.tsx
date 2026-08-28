import type { Office } from "@/lib/site";

/**
 * Thẻ văn phòng: địa chỉ, số điện thoại và một bản đồ nhỏ bấm vào là mở
 * trang chỉ đường Google Maps ở tab mới.
 *
 * Bản đồ vẽ bằng SVG chứ không nhúng ảnh bản đồ thật: Google Static Maps
 * đòi khoá API và tính tiền theo lượt hiện, còn tải ảnh từ máy chủ tiles
 * của OpenStreetMap thì vi phạm điều khoản dùng của họ. Đây là nút bấm dẫn
 * sang bản đồ thật, nên vẽ theo lối đồ hoạ đường nét cho khớp phần còn lại
 * của web, và ghi rõ tên thành phố để không ai hiểu nhầm là bản đồ thật.
 */
export function OfficeCard({
  office,
  directionsLabel,
  tone = "light",
}: {
  office: Office;
  directionsLabel: string;
  /** "light" cho nền tối, "dark" cho nền sáng. */
  tone?: "light" | "dark";
}) {
  const href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    office.mapQuery,
  )}`;

  const muted = tone === "light" ? "text-on-deep-2/65" : "text-ink/65";
  const strong = tone === "light" ? "text-on-deep" : "text-ink";
  const line = tone === "light" ? "border-white/12" : "border-ink/12";

  return (
    <div className={`flex gap-4 border-t ${line} pt-5`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${directionsLabel} — ${office.cityLabel}`}
        className="group relative block h-[68px] w-[68px] shrink-0 overflow-hidden rounded-lg border border-gold-500/30 bg-deep-3 transition-colors hover:border-gold-400"
      >
        <MiniMap />
        <span className="absolute inset-x-0 bottom-0 bg-black/45 py-[3px] text-center text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-gold-300">
          {office.mapBadge}
        </span>
      </a>

      <div className="min-w-0">
        <p className={`text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-500`}>
          {office.label}
        </p>
        <address className={`mt-1.5 not-italic text-[0.8125rem] leading-6 ${muted}`}>
          {office.street}, {office.city} {office.postalCode}, {office.country}
        </address>
        <a
          href={`tel:${office.phoneHref}`}
          className={`mt-1 inline-block text-[0.8125rem] font-medium ${strong} transition-colors hover:text-gold-400`}
        >
          {office.phone}
        </a>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 block text-[0.6875rem] uppercase tracking-[0.14em] text-gold-500 transition-colors hover:text-gold-400"
        >
          {directionsLabel} ↗
        </a>
      </div>
    </div>
  );
}

/** Đồ hoạ đường nét gợi hình bản đồ, kèm ghim vàng ở giữa. */
function MiniMap() {
  return (
    <svg viewBox="0 0 68 68" className="h-full w-full" aria-hidden="true">
      <rect width="68" height="68" fill="#0b2135" />
      {/* ô phố */}
      <g stroke="#C8A44D" strokeOpacity="0.16" strokeWidth="1">
        {[12, 26, 42, 56].map((v) => (
          <line key={`h${v}`} x1="0" y1={v} x2="68" y2={v} />
        ))}
        {[10, 24, 44, 58].map((v) => (
          <line key={`v${v}`} x1={v} y1="0" x2={v} y2="68" />
        ))}
      </g>
      {/* trục đường lớn */}
      <path d="M0 44 L24 44 L34 30 L68 30" stroke="#C8A44D" strokeOpacity="0.4" strokeWidth="2.2" fill="none" />
      {/* mảng nước */}
      <path d="M0 58 Q18 52 34 58 T68 56 L68 68 L0 68 Z" fill="#1F4A72" fillOpacity="0.55" />
      {/* ghim */}
      <g transform="translate(34 26)">
        <path
          d="M0 14 C0 14 7 6.5 7 1.8 A7 7 0 1 0 -7 1.8 C-7 6.5 0 14 0 14 Z"
          fill="#e6d1a0"
          stroke="#8d6f2c"
          strokeWidth="1"
        />
        <circle cx="0" cy="1.4" r="2.6" fill="#0b2135" />
      </g>
    </svg>
  );
}
