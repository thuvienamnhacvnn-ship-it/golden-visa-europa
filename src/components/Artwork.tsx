/** Khung ảnh dùng chung. Không đọc đĩa — nguồn ảnh do lib/art.ts chọn. */
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
