"use client";

import { useEffect, useRef } from "react";

/**
 * Xe tuần lộc của ông già Noel bay lượn NỀN SAU chữ và núi đá, chỉ trong khu hero: nhỏ, ở xa, lượn trên vùng trời,
 * thỉnh thoảng bay sâu vào chân trời mất hút rồi quay lại. Vẽ bằng three.js trong tệp dùng chung /noel/santa-pet.js
 * (hàm window.santaAmbient.hero). Canvas được chèn ngay chỗ thành phần này đứng, nên nằm DƯỚI nội dung phía sau nó.
 */
export function HeroSleigh() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const m = marker.current;
    const host = m?.parentElement;
    if (!m || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop: (() => void) | null = null;
    let tries = 0;
    let timer = 0;
    let alive = true;
    const go = () => {
      const api = (window as unknown as { santaAmbient?: { hero: (h: HTMLElement, o?: { before?: Element | null }) => Promise<() => void> } }).santaAmbient;
      if (api) {
        api.hero(host, { before: m }).then((s) => {
          if (alive) stop = s;
          else s();
        });
      } else if (++tries < 40) {
        timer = window.setTimeout(go, 400);
      }
    };
    go();
    return () => {
      alive = false;
      window.clearTimeout(timer);
      stop?.();
    };
  }, []);

  return <span ref={marker} hidden aria-hidden="true" />;
}
