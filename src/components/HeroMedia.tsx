import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Lớp video WebM nền trong suốt đặt đè lên banner.
 *
 * Khách sẽ gửi video, tôi tách nền rồi xuất VP9 có kênh alpha vào
 * `public/video/`. Chưa có tệp thì component này không vẽ gì cả —
 * banner vẫn đầy đủ, không thủng lỗ.
 *
 * Xuất video đúng chuẩn (giữ nền trong suốt):
 *   ffmpeg -i nguon.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 30 \
 *          -an -auto-alt-ref 0 public/video/hero-overlay.webm
 * Bắt buộc -auto-alt-ref 0, thiếu nó là mất kênh alpha.
 */

const videoDir = path.join(process.cwd(), "public", "video");

export function hasHeroVideo(name: string): boolean {
  try {
    return existsSync(path.join(videoDir, name));
  } catch {
    return false;
  }
}

export function HeroVideo({
  name = "hero-overlay.webm",
  className = "",
  poster,
}: {
  name?: string;
  className?: string;
  poster?: string;
}) {
  if (!hasHeroVideo(name)) return null;

  return (
    <video
      className={`pointer-events-none absolute inset-0 h-full w-full object-contain ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={`/video/${name}`} type="video/webm" />
    </video>
  );
}
