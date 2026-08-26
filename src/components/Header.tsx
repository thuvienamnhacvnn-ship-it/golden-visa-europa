"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { locales, localePath, type Locale } from "@/i18n";
import { site } from "@/lib/site";

export type HeaderStrings = {
  nav: { whatIs: string; services: string; about: string; whyUs: string; offices: string };
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
          ? "border-b border-ink/10 bg-surface/92 shadow-[0_10px_30px_-24px_rgba(7,27,48,0.6)] backdrop-blur-md"
          : "border-b border-gold-500/20 bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href={localePath(locale)} aria-label={site.name}>
          <Logo tone={scrolled ? "dark" : "light"} />
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${scrolled ? "border-ink/15" : "border-gold-500/40"}`}
          aria-expanded={open}
          aria-label={open ? t.close : t.menu}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-deep transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-deep transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-deep transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink/10 bg-surface lg:hidden">
          <nav className="mx-auto max-w-[1200px] px-5 py-6 sm:px-8" aria-label="Mobile">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-ink/8">
                  <Link
                    href={item.href}
                    className={`block py-4 font-serif text-xl ${
                      isActive(item.href) ? "text-gold-600" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={localePath(locale, "contact")}
              className="mt-6 block bg-deep px-6 py-4 text-center text-sm font-medium text-on-deep"
            >
              {t.bookConsultation}
            </Link>

            <div className="mt-6 flex items-center gap-3">
              <ThemeToggle label={t.theme} />
              <span className="eyebrow text-ink/40">{t.language}</span>
              <div className="flex gap-2">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={swapLocale(l)}
                    hrefLang={l}
                    className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest ${
                      l === locale
                        ? "border-gold-500 text-gold-600"
                        : "border-ink/15 text-ink/60"
                    }`}
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      ) : null}
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
