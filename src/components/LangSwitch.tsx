"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { locales, localeNames, type Locale } from "@/i18n";

/**
 * Chọn ngôn ngữ dạng danh sách thả xuống.
 *
 * Trước đây liệt kê thẳng "EN / TR / VI" trên thanh header. Với năm ngôn ngữ
 * thì hàng đó dài ra và dính vào menu, nên gom lại thành một nút.
 */
export function LangSwitch({
  locale,
  swapLocale,
  label,
  tone = "dark",
}: {
  locale: Locale;
  swapLocale: (l: Locale) => string;
  label: string;
  /** "light" khi nằm trên nền tối (banner chưa cuộn). */
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const idle =
    tone === "light"
      ? "border-white/20 text-on-deep/80 hover:border-gold-400/60 hover:text-gold-400"
      : "border-ink/15 text-ink/70 hover:border-gold-500/60 hover:text-ink";

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`btn flex items-center gap-2 border px-3 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] transition-colors ${idle}`}
      >
        <GlobeIcon className="h-3.5 w-3.5" />
        {locale}
        <ChevronIcon className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11rem] overflow-hidden rounded-xl border border-ink/10 bg-surface py-1.5 shadow-[0_24px_50px_-24px_rgba(7,27,48,0.55)]"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <Link
                href={swapLocale(l)}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-4 px-4 py-2.5 text-[0.8125rem] transition-colors ${
                  l === locale
                    ? "bg-gold-500/10 font-medium text-gold-600"
                    : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {localeNames[l]}
                <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-ink/35">
                  {l}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
