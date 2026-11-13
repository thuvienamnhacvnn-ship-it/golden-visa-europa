"use client";

import { useEffect, useRef } from "react";

/**
 * Tuyết rơi phủ lên TOÀN BỘ hero (cả thẻ vàng, huy hiệu, chữ, nút) — canvas nằm trên cùng, không chặn chuột.
 *
 * Ba lớp chiều sâu, đúng như ống kính thật:
 *  - xa  : hạt nhỏ li ti, nét, rơi chậm
 *  - giữa: hạt vừa
 *  - gần : hạt TO, mờ nét (ngoài tiêu cự), hình dạng không tròn — gộp từ nhiều cụm tuyết lệch nhau, hạt thô như thật,
 *          rơi nhanh hơn và xoay chậm
 * Thêm vài hạt bụi vàng champagne lấp lánh quanh khu thẻ/huy hiệu, rất nhẹ (chất liệu chứ không phải ánh chói).
 * Tôn trọng prefers-reduced-motion (không vẽ), tạm dừng khi hero ra khỏi màn hình hoặc tab bị ẩn.
 */

type Flake = { x: number; y: number; r: number; vy: number; sway: number; f: number; ph: number; rot: number; vr: number; a: number; s: number; layer: 0 | 1 | 2 };
type Dust = { x: number; y: number; r: number; ph: number; f: number };

/** Một hạt tuyết dạng cụm: nhiều chấm mềm chồng lệch nhau, nhìn như bông tuyết thô bị nhoè. */
function makeSprite(size: number, blur: number, seed: number, clumps: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  let st = seed;
  const rnd = () => ((st = (st * 16807) % 2147483647) / 2147483647);
  g.filter = blur ? `blur(${blur}px)` : "none";
  const cx = size / 2;
  for (let i = 0; i < clumps; i++) {
    const ang = rnd() * Math.PI * 2;
    const d = (i === 0 ? 0 : rnd() * 0.26) * size;
    const x = cx + Math.cos(ang) * d * (0.8 + rnd() * 0.5);
    const y = cx + Math.sin(ang) * d * (0.6 + rnd() * 0.6);
    const r = size * (i === 0 ? 0.2 + rnd() * 0.07 : 0.08 + rnd() * 0.13);
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(255,252,246,0.95)");
    grad.addColorStop(0.55, "rgba(246,248,255,0.55)");
    grad.addColorStop(1, "rgba(235,242,255,0)");
    g.fillStyle = grad;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

export function HeroSnow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    if (!ctx || !host) return;

    // Sprite dựng sẵn: ít biến thể là đủ vì mỗi hạt có cỡ, góc xoay, độ mờ riêng.
    const far = [makeSprite(24, 0, 11, 2), makeSprite(24, 0, 23, 3)];
    const mid = [makeSprite(48, 0.6, 31, 4), makeSprite(48, 0.6, 47, 5), makeSprite(48, 0.8, 59, 4)];
    const near = [makeSprite(160, 2.5, 71, 9), makeSprite(160, 3, 83, 8), makeSprite(160, 2, 97, 10), makeSprite(160, 3.5, 113, 7), makeSprite(160, 2.5, 127, 9)];

    let W = 0, H = 0, dpr = 1, raf = 0, last = performance.now();
    let visible = true, alive = true;
    let flakes: Flake[] = [];
    let dust: Dust[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const k = W < 700 ? 0.5 : 1;
      flakes = [];
      const add = (n: number, layer: 0 | 1 | 2) => {
        for (let i = 0; i < n * k; i++) {
          const f: Flake =
            layer === 0
              ? { x: rand(0, W), y: rand(0, H), r: rand(0.8, 2.1), vy: rand(16, 30), sway: rand(3, 8), f: rand(0.4, 0.9), ph: rand(0, 6.3), rot: 0, vr: 0, a: rand(0.4, 0.8), s: Math.floor(rand(0, far.length)), layer }
              : layer === 1
                ? { x: rand(0, W), y: rand(0, H), r: rand(2.6, 6), vy: rand(42, 78), sway: rand(8, 20), f: rand(0.3, 0.7), ph: rand(0, 6.3), rot: rand(0, 6.3), vr: rand(-0.4, 0.4), a: rand(0.45, 0.8), s: Math.floor(rand(0, mid.length)), layer }
                : { x: rand(0, W), y: rand(0, H), r: rand(12, 32), vy: rand(120, 210), sway: rand(18, 46), f: rand(0.15, 0.4), ph: rand(0, 6.3), rot: rand(0, 6.3), vr: rand(-0.5, 0.5), a: rand(0.5, 0.85), s: Math.floor(rand(0, near.length)), layer };
          flakes.push(f);
        }
      };
      add(170, 0);
      add(100, 1);
      add(34, 2);
      // vài hạt bụi vàng quanh khu thẻ + huy hiệu (nửa phải hero)
      dust = Array.from({ length: Math.round(26 * k) }, () => ({ x: rand(W * 0.52, W * 0.96), y: rand(H * 0.3, H * 0.78), r: rand(0.8, 2.2), ph: rand(0, 6.3), f: rand(0.5, 1.4) }));
    };

    const resize = () => {
      W = host.clientWidth;
      H = host.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      build();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver((es) => (visible = es[es.length - 1].isIntersecting));
    io.observe(host);

    const frame = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      const t = now / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      for (const p of flakes) {
        p.y += p.vy * dt;
        p.x += Math.sin(t * p.f * 2 + p.ph) * p.sway * dt + (p.layer === 2 ? 14 : p.layer === 1 ? 6 : 2) * dt;
        p.rot += p.vr * dt;
        const m = p.r * 1.6;
        if (p.y > H + m) { p.y = -m; p.x = rand(-m, W + m); }
        if (p.x > W + m) p.x = -m;
        if (p.x < -m) p.x = W + m;
        const sp = p.layer === 0 ? far[p.s] : p.layer === 1 ? mid[p.s] : near[p.s];
        ctx.globalAlpha = p.a;
        if (p.layer === 0) {
          ctx.drawImage(sp, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.drawImage(sp, -p.r, -p.r, p.r * 2, p.r * 2);
          ctx.restore();
        }
      }
      // bụi vàng champagne nhấp nháy rất nhẹ
      for (const d of dust) {
        const tw = 0.5 + 0.5 * Math.sin(t * d.f * 2 + d.ph);
        const a = 0.12 + 0.55 * tw * tw;
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3);
        g.addColorStop(0, `rgba(255,236,176,${a})`);
        g.addColorStop(1, "rgba(255,226,150,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 h-full w-full" />;
}
