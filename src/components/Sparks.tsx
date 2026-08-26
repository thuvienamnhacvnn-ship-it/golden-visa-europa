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

/** Biểu tượng cuốn sách đang mở. */
export function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 6.2C10.4 4.9 8.3 4.3 5.6 4.3c-.9 0-1.6.1-2.1.2v13.2c.5-.1 1.2-.2 2.1-.2 2.7 0 4.8.6 6.4 1.9" />
      <path d="M12 6.2c1.6-1.3 3.7-1.9 6.4-1.9.9 0 1.6.1 2.1.2v13.2c-.5-.1-1.2-.2-2.1-.2-2.7 0-4.8.6-6.4 1.9" />
      <path d="M12 6.2v13.2" />
      <path d="M6.2 8.6h2.6M6.2 11.4h2.6M15.2 8.6h2.6M15.2 11.4h2.6" strokeWidth="1.1" opacity="0.7" />
    </svg>
  );
}
