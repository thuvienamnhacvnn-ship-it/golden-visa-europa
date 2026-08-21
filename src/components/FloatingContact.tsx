"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Nút gọi/WhatsApp nổi. Chỉ hiện sau khi cuộn qua màn hình đầu
 * để không đè lên hero.
 */
export function FloatingContact({ callLabel }: { callLabel: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-5 z-40 flex flex-col gap-3 transition-all duration-300 sm:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <a
        href={`https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-navy-900 text-cream-50 shadow-lg transition-colors hover:bg-navy-700"
        style={{ height: "3.25rem", width: "3.25rem" }}
        aria-label="WhatsApp"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.9 9.9 0 0 0 4.88 1.25h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.88 9.88 0 0 0 12.04 2Zm0 18.14h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.4c0-4.56 3.71-8.27 8.27-8.27 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.85c0 4.56-3.71 8.26-8.27 8.26Zm4.53-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
        </svg>
      </a>

      <a
        href={`tel:${site.headOffice.phoneHref}`}
        className="flex items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-lg transition-colors hover:bg-gold-400"
        style={{ height: "3.25rem", width: "3.25rem" }}
        aria-label={callLabel}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            d="M6.5 3h2l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L15 12l4 1.5v2a2.5 2.5 0 0 1-2.7 2.5A15.5 15.5 0 0 1 4 5.7 2.5 2.5 0 0 1 6.5 3Z"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
