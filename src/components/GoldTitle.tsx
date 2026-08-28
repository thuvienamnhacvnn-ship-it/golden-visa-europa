/**
 * Tiêu đề vàng nổi khối, rê chuột thì loé ánh sao.
 *
 * Vị trí các ngôi sao tính bằng công thức tất định (không dùng Math.random)
 * để máy chủ và trình duyệt dựng ra kết quả giống hệt nhau — random sẽ gây
 * lệch hydrate và React sẽ cảnh báo.
 */

const STAR_COUNT = 14;

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {/* Sao bốn cánh thon — dạng lấp lánh, không phải sao năm cánh */}
      <path d="M12 0c.7 6.3 4.9 10.6 12 12-7.1 1.4-11.3 5.7-12 12-.7-6.3-4.9-10.6-12-12C7.1 10.6 11.3 6.3 12 0Z" />
    </svg>
  );
}

/**
 * Cỡ chữ tính theo ĐỘ DÀI chữ, không đặt cứng.
 * "HY LẠP" 5 ký tự và "YUNANİSTAN – LETONYA" 18 ký tự mà dùng chung một cỡ
 * thì bản dài tràn khỏi cột. Chữ sans đậm rộng khoảng 0.62em mỗi ký tự.
 */
function sizeFor(text: string) {
  // Phải là \s. Bản trước viết /s/g nên nó xoá chữ cái "s" chứ không xoá
  // khoảng trắng — đếm sai độ dài với mọi tiêu đề có chữ s.
  const ch = text.replace(/\s/g, "").length;
  const max = ch <= 6 ? 6.65 : ch <= 8 ? 5.5 : ch <= 10 ? 4.6 : ch <= 14 ? 4.2 : 3.6;
  // Cỡ nhỏ nhất phải vừa màn hình hẹp nhất: điện thoại 390px, trừ lề còn ~350px.
  // Không tính theo max mà tính theo chỗ thực có, nếu không tiêu đề dài sẽ
  // xuống dòng và banner thành bốn hàng thay vì ba.
  const fitRem = 350 / (ch * 0.62) / 16;
  const min = Math.min(max * 0.55, fitRem).toFixed(2);
  const vw = (52 / Math.max(ch, 1)).toFixed(2);
  return `clamp(${min}rem, ${vw}vw, ${max}rem)`;
}

export function GoldTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    // Dãy tất định, trải đều nhưng không thành hàng lối
    const left = ((i * 37 + 11) % 100) + (i % 3) - 1;
    const top = ((i * 53 + 17) % 116) - 12;
    const size = 7 + ((i * 13) % 12);
    const delay = ((i * 97) % 900) / 1000;
    return { left, top, size, delay, key: i };
  });

  return (
    <span
      className={`gold-title ${className}`}
      style={{ fontSize: sizeFor(text) }}
      tabIndex={0}
    >
      {/* Ảnh mẫu dùng SANS đậm chứ không phải serif — đó là lý do bản trước
          nhìn không giống. font-sans + 900 + chữ hoa cho khớp. */}
      <span className="gold-3d relative z-10 font-sans font-black uppercase tracking-[-0.02em]">
        {text}
      </span>
      <span className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.key}
            className="spark"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
            }}
          >
            <Star size={s.size} />
          </span>
        ))}
      </span>
    </span>
  );
}
