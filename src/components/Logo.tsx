/**
 * Logo NIBELC — ảnh thật bóc từ tài liệu khách gửi.
 *
 * tone="light": luôn dùng bản trắng (nền tối, ví dụ banner và chân trang).
 * tone="auto":  bản navy ở giao diện sáng, bản trắng ở giao diện tối.
 *
 * Không chọn ảnh bằng JavaScript theo giao diện: header dựng sẵn trên máy chủ,
 * làm vậy sẽ nháy sai logo một nhịp trước khi React gắn vào.
 */
const LIGHT = "/photos/logo-nibelc-light.png";
const DARK = "/photos/logo-nibelc-dark.png";
const SIZE = "h-9 w-auto lg:h-10";

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
          width={640}
          height={202}
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
        width={640}
        height={202}
        className={`${SIZE} ${tone === "auto" ? "hidden dark:block" : "block"}`}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
