"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { localePath, type Locale } from "@/i18n";

const KEY = "gv-cookie-choice";

/**
 * GDPR: mặc định KHÔNG đặt cookie tuỳ chọn.
 * Lựa chọn chỉ nằm trong localStorage của chính người xem.
 */
export type CookieStrings = {
  title: string;
  body: string;
  accept: string;
  decline: string;
  link: string;
};

export function CookieBanner({ locale, t }: { locale: Locale; t: CookieStrings }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      // Trình duyệt chặn lưu trữ — không hiện banner, cũng không đặt cookie nào.
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* bỏ qua */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-navy-900/10 bg-cream-50 shadow-[0_-8px_30px_rgba(14,42,71,0.08)]"
      role="dialog"
      aria-label={t.title}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p className="max-w-2xl text-sm leading-6 text-navy-800/80">
          {t.body}{" "}
          <Link
            href={localePath(locale, "legal/privacy")}
            className="text-gold-600 underline underline-offset-4"
          >
            {t.link}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="border border-navy-900/25 px-5 py-2.5 text-xs font-medium tracking-wide text-navy-900 transition-colors hover:border-navy-900"
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="bg-navy-900 px-5 py-2.5 text-xs font-medium tracking-wide text-cream-50 transition-colors hover:bg-navy-700"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
