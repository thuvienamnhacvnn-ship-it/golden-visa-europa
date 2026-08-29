/**
 * Ba biểu tượng cho ba mức đầu tư, vẽ theo lối nét vàng như phần còn lại
 * của web. Dùng currentColor để đổi màu theo trạng thái rê chuột của thẻ.
 *
 * Tra theo THỨ TỰ chứ không theo số tiền: con số viết khác nhau ở từng ngôn
 * ngữ ("€ 250,000" và "250.000 €"), tra theo chuỗi là hỏng ngay ở bản tiếng
 * Anh. Thứ tự ba mức cố định 250 → 400 → 800 trong cả năm từ điển.
 */
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Mức 250.000 € — chuyển đổi công năng và trùng tu công trình di sản. */
function IconRestore({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" {...common}>
      {/* Mặt tiền công trình cổ: bậc, hàng cột, diềm mái */}
      <path d="M7 31h20" />
      <path d="M9 31V17M14 31V17M19 31V17M24 31V17" />
      <path d="M6 17h22l-11-7-11 7z" />
      <path d="M7.5 14.5h19" strokeOpacity="0.5" />
      {/* Mũi tên vòng: dấu hiệu chuyển đổi công năng / trùng tu */}
      <path d="M27 27a6 6 0 1 0 3-5.2" />
      <path d="M30 18v4h-4" />
    </svg>
  );
}

/** Mức 400.000 € — mọi khu vực còn lại của Hy Lạp. */
function IconRegion({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" {...common}>
      {/* Tấm bản đồ gấp ba nếp */}
      <path d="M5 12.5 14 9l12 4 9-3.5v21L26 34l-12-4-9 3.5v-21z" />
      <path d="M14 9v21M26 13v21" strokeOpacity="0.5" />
      {/* Ghim vị trí */}
      <path d="M20 26c0 0 4.5-5 4.5-8.2a4.5 4.5 0 1 0-9 0C15.5 21 20 26 20 26z" />
      <circle cx="20" cy="17.6" r="1.7" />
    </svg>
  );
}

/** Mức 800.000 € — vùng nhu cầu cao: Athens và các đảo lớn. */
function IconPrime({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" {...common}>
      {/* Đường chân trời đô thị */}
      <path d="M5 31h30" />
      <path d="M8 31V21h6v10" />
      <path d="M17 31V13h7v18" />
      <path d="M27 31V18h5v13" />
      <path d="M10 24h2M10 27h2M19 17h3M19 21h3M19 25h3M29 22h1.5M29 26h1.5" strokeOpacity="0.5" />
      {/* Ngôi sao: dấu hiệu vùng đắt giá nhất */}
      <path d="M20.5 5.5l1.5 3.4 3.7.4-2.7 2.5.7 3.6-3.2-1.8-3.2 1.8.7-3.6-2.7-2.5 3.7-.4z" />
    </svg>
  );
}

const ICONS = [IconRestore, IconRegion, IconPrime];

export function TierIcon({ index, className = "" }: { index: number; className?: string }) {
  const Icon = ICONS[index] ?? IconRegion;
  return <Icon className={className} />;
}
