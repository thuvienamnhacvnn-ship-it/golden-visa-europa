/**
 * Chùm sao lấp lánh phủ lên một phần tử.
 * Vị trí tính bằng công thức tất định — dùng Math.random sẽ khiến máy chủ
 * và trình duyệt dựng khác nhau, React báo lỗi hydrate.
 */
export function Sparks({ count = 10, seed = 0 }: { count?: number; seed?: number }) {
  const stars = Array.from({ length: count }, (_, i) => {
    const n = i + seed;
    return {
      key: i,
      left: ((n * 41 + 7) % 100),
      top: ((n * 59 + 13) % 100),
      size: 6 + ((n * 11) % 9),
      delay: ((n * 83) % 1600) / 1000,
    };
  });

  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.key}
          className="spark"
          style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c.7 6.3 4.9 10.6 12 12-7.1 1.4-11.3 5.7-12 12-.7-6.3-4.9-10.6-12-12C7.1 10.6 11.3 6.3 12 0Z" />
          </svg>
        </span>
      ))}
    </span>
  );
}

/** Cuốn sách mở, nằm gọn trong đường tròn. */
export function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14.2" strokeWidth="1.1" />
      <path d="M16 11.4c-1.5-1.2-3.4-1.8-5.7-1.8-.7 0-1.3.05-1.8.15v11.5c.5-.1 1.1-.15 1.8-.15 2.3 0 4.2.6 5.7 1.8" />
      <path d="M16 11.4c1.5-1.2 3.4-1.8 5.7-1.8.7 0 1.3.05 1.8.15v11.5c-.5-.1-1.1-.15-1.8-.15-2.3 0-4.2.6-5.7 1.8" />
      <path d="M16 11.4v11.5" />
      <path d="M11 13.4h2.4M11 15.8h2.4M18.6 13.4H21M18.6 15.8H21" strokeWidth="1" opacity="0.65" />
    </svg>
  );
}
