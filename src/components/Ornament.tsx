/**
 * Hoạ tiết nền vẽ bằng SVG.
 * Khách chưa gửi ảnh thật, nên thay vì dùng ảnh stock hay phủ mờ,
 * nền hero là đồ hoạ đường nét: cột Hy Lạp cách điệu + lưới toạ độ.
 */

export function HeroOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 720 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C8A44D" stopOpacity="0.55" />
          <stop offset="0.65" stopColor="#C8A44D" stopOpacity="0.18" />
          <stop offset="1" stopColor="#C8A44D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-fade-soft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C8A44D" stopOpacity="0.28" />
          <stop offset="1" stopColor="#C8A44D" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.5" cy="0.32" r="0.6">
          <stop offset="0" stopColor="#1F4A72" stopOpacity="0.85" />
          <stop offset="1" stopColor="#071B30" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="720" height="900" fill="url(#hero-glow)" />

      {/* Lưới dọc mảnh */}
      <g stroke="url(#hero-fade-soft)" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={40 + i * 80} y1="0" x2={40 + i * 80} y2="900" />
        ))}
      </g>

      {/* Hàng cột cách điệu */}
      <g stroke="url(#hero-fade)" strokeWidth="1.25">
        {Array.from({ length: 5 }, (_, i) => {
          const x = 150 + i * 105;
          return (
            <g key={i}>
              {/* Thân cột với rãnh dọc */}
              <rect x={x} y={330} width="46" height="360" />
              <line x1={x + 11.5} y1={342} x2={x + 11.5} y2={678} />
              <line x1={x + 23} y1={342} x2={x + 23} y2={678} />
              <line x1={x + 34.5} y1={342} x2={x + 34.5} y2={678} />
              {/* Đầu cột */}
              <rect x={x - 8} y={314} width="62" height="16" />
              {/* Chân cột */}
              <rect x={x - 8} y={690} width="62" height="14" />
            </g>
          );
        })}
        {/* Dầm ngang */}
        <rect x="128" y="286" width="470" height="24" />
        <line x1="112" y1="704" x2="614" y2="704" />
      </g>

      {/* Diềm meander (hoạ tiết Hy Lạp) trên dầm */}
      <g stroke="#C8A44D" strokeOpacity="0.4" strokeWidth="1.5" fill="none">
        {Array.from({ length: 13 }, (_, i) => {
          const x = 140 + i * 36;
          return (
            <path
              key={i}
              d={`M${x} 258 h24 v-18 h-18 v12 h12 v-6`}
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          );
        })}
      </g>
    </svg>
  );
}

/** Diềm meander mảnh, dùng làm đường phân cách giữa các section. */
export function MeanderRule({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 20"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="square">
        {Array.from({ length: 10 }, (_, i) => {
          const x = i * 36;
          return <path key={i} d={`M${x} 16 h24 v-12 h-18 v8 h12 v-4`} />;
        })}
      </g>
    </svg>
  );
}

/** Con dấu tròn nhỏ dùng ở footer và trang about. */
export function Seal({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeOpacity="0.2" />
      <path
        d="M32 15l4.2 10.6L47 27.4l-7.9 7.4 2 11L32 40.6l-9.1 5.2 2-11-7.9-7.4 10.8-1.8z"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
