"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { locales, localePath, type Locale } from "@/i18n";
import { site } from "@/lib/site";

export type HeaderStrings = {
  nav: {
    whatIs: string;
    services: string;
    about: string;
    whyUs: string;
    properties: string;
    offices: string;
  };
  bookConsultation: string;
  language: string;
  menu: string;
  close: string;
  theme: string;
};

export function Header({ locale, t }: { locale: Locale; t: HeaderStrings }) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đóng menu khi chuyển trang
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = [
    { href: localePath(locale, "what-is-golden-visa"), label: t.nav.whatIs },
    { href: localePath(locale, "services"), label: t.nav.services },
    { href: localePath(locale, "about"), label: t.nav.about },
    { href: localePath(locale, "why-us"), label: t.nav.whyUs },
    { href: localePath(locale, "properties"), label: t.nav.properties },
    { href: localePath(locale, "offices"), label: t.nav.offices },
  ];

  // Đổi đoạn ngôn ngữ trong URL hiện tại, giữ nguyên phần còn lại
  const swapLocale = (next: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return localePath(next, rest);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/92 shadow-[0_10px_30px_-24px_rgba(7,27,48,0.6)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-center px-5 sm:px-8 lg:h-20 lg:justify-between lg:px-12">
        <Link href={localePath(locale)} aria-label={site.name}>
          <Logo tone={scrolled ? "auto" : "light"} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.8125rem] font-medium tracking-wide transition-colors ${
                isActive(item.href)
                  ? "text-gold-500"
                  : scrolled
                    ? "text-ink/75 hover:text-ink"
                    : "text-on-deep/85 hover:text-gold-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LangSwitch locale={locale} swapLocale={swapLocale} label={t.language} scrolled={scrolled} />
          <ThemeToggle label={t.theme} />
          <Link
            href={localePath(locale, "contact")}
            className={`btn px-6 py-3 text-[0.8125rem] font-medium tracking-wide ${
              scrolled
                ? "bg-deep text-on-deep shadow-[0_8px_22px_-12px_rgba(7,27,48,0.7)] hover:bg-deep-3"
                : "border border-gold-500/60 text-gold-400 hover:border-gold-400 hover:bg-gold-500/10"
            }`}
          >
            {t.bookConsultation}
          </Link>
        </div>

      </div>

      {/* Đường vàng dưới header, có vệt sáng chạy qua liên tục */}
      <div className="line-shimmer absolute inset-x-0 bottom-0" aria-hidden="true" />

    </header>
  );
}

function LangSwitch({
  locale,
  swapLocale,
  label,
  scrolled,
}: {
  locale: Locale;
  swapLocale: (l: Locale) => string;
  label: string;
  scrolled: boolean;
}) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 ? <span className={`px-1 ${scrolled ? "text-ink/20" : "text-on-deep/25"}`}>/</span> : null}
          <Link
            href={swapLocale(l)}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`text-[0.6875rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
              l === locale
                ? "text-gold-500"
                : scrolled
                  ? "text-ink/45 hover:text-ink"
                  : "text-on-deep/55 hover:text-gold-400"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
