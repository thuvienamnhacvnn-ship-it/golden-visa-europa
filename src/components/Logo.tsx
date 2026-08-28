/**
 * Logo NIBELC — bản vector khách gửi (golden_logo.svg).
 *
 * tone="light": bản chữ trắng, dùng trên nền tối (banner, chân trang).
 * tone="auto":  bản chữ xanh gốc ở giao diện sáng, bản trắng ở giao diện tối.
 *
 * Không chọn ảnh bằng JavaScript theo giao diện: header dựng sẵn trên máy chủ,
 * làm vậy sẽ nháy sai logo một nhịp trước khi React gắn vào.
 *
 * Dùng <img> chứ không nội tuyến SVG: hai bản sáng/tối cùng nằm trong trang,
 * nội tuyến thì id của dải màu trùng nhau và bản sau đè màu bản trước.
 */
const DARK = "/art/logo-nibelc.svg";
const LIGHT = "/art/logo-nibelc-light.svg";

/** Tỉ lệ gốc 1201×376 ≈ 3,2:1. */
const W = 1201;
const H = 376;
/** Logo có cả dòng tagline nhỏ nên phải để cao hơn logo cũ mới đọc được. */
const SIZE = "h-9 w-auto lg:h-11";

export function Logo({
  className = "",
  tone = "auto",
}: {
  className?: string;
  tone?: "auto" | "light";
}) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {tone === "auto" && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={DARK}
          alt="NIBELC GROUP"
          width={W}
          height={H}
          className={`${SIZE} block dark:hidden`}
          loading="eager"
          decoding="async"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LIGHT}
        alt={tone === "auto" ? "" : "NIBELC GROUP"}
        aria-hidden={tone === "auto" || undefined}
        width={W}
        height={H}
        className={`${SIZE} ${tone === "auto" ? "hidden dark:block" : "block"}`}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
