/**
 * Trang trí Giáng sinh kiểu golden luxury, tiết chế: vài quả cầu vàng champagne treo bằng sợi chỉ vàng mảnh
 * ở mép trên bên phải hero, đung đưa rất chậm. Không màu sặc sỡ — chỉ vàng, ngà, xanh navy của nền.
 */
const BALLS = [
  { x: "69%", len: 40, d: 30, delay: "0s", dur: "7.5s" },
  { x: "75%", len: 96, d: 40, delay: "-2.4s", dur: "9s" },
  { x: "82%", len: 24, d: 24, delay: "-4.6s", dur: "8.2s" },
];

export function HeroOrnaments() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[80px] z-20 hidden h-72 md:block">
      <style>{`
        @keyframes orn-sway { 0%,100% { transform: rotate(-2.2deg) } 50% { transform: rotate(2.2deg) } }
        @media (prefers-reduced-motion: reduce) { .orn { animation: none !important } }
      `}</style>
      {BALLS.map((b, i) => (
        <div
          key={i}
          className="orn absolute top-0"
          style={{ left: b.x, transformOrigin: "50% 0", animation: `orn-sway ${b.dur} ease-in-out ${b.delay} infinite` }}
        >
          <svg width={b.d} height={b.len + b.d + 8} viewBox={`0 0 ${b.d} ${b.len + b.d + 8}`} style={{ overflow: "visible" }}>
            <defs>
              <radialGradient id={`orn-g${i}`} cx="35%" cy="30%" r="75%">
                <stop offset="0" stopColor="#fff3c4" />
                <stop offset="0.35" stopColor="#e4c36a" />
                <stop offset="0.75" stopColor="#a67c24" />
                <stop offset="1" stopColor="#5f4310" />
              </radialGradient>
            </defs>
            <line x1={b.d / 2} y1="0" x2={b.d / 2} y2={b.len} stroke="#c9a85c" strokeOpacity=".7" strokeWidth="0.8" />
            <rect x={b.d / 2 - 3.5} y={b.len - 1} width="7" height="5" rx="1.5" fill="#c9a85c" />
            <circle cx={b.d / 2} cy={b.len + 4 + b.d / 2} r={b.d / 2} fill={`url(#orn-g${i})`} />
            <ellipse cx={b.d / 2 - b.d * 0.17} cy={b.len + 4 + b.d * 0.34} rx={b.d * 0.12} ry={b.d * 0.07} fill="#fff" opacity=".7" />
            <circle cx={b.d / 2} cy={b.len + 4 + b.d / 2} r={b.d / 2 - 0.5} fill="none" stroke="#fff3c4" strokeOpacity=".25" />
          </svg>
        </div>
      ))}
    </div>
  );
}
