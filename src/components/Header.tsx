"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { locales, localePath, type Locale } from "@/i18n";
import { site } from "@/lib/site";

export type HeaderStrings = {
  nav: { whatIs: string; services: string; about: string; whyUs: string; offices: string };
  bookConsultation: string;
  language: string;
  menu: string;
  close: string;
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
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-navy-900/10 bg-cream-50/95 backdrop-blur-sm"
          : "border-b border-transparent bg-cream-50"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href={localePath(locale)} aria-label={site.name}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.8125rem] font-medium tracking-wide transition-colors ${
                isActive(item.href)
                  ? "text-gold-600"
                  : "text-navy-900/75 hover:text-navy-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LangSwitch locale={locale} swapLocale={swapLocale} label={t.language} />
          <Link
            href={localePath(locale, "contact")}
            className="bg-navy-900 px-6 py-3 text-[0.8125rem] font-medium tracking-wide text-cream-50 transition-colors hover:bg-navy-700"
          >
            {t.bookConsultation}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center border border-navy-900/15 lg:hidden"
          aria-expanded={open}
          aria-label={open ? t.close : t.menu}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-navy-900 transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-navy-900 transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-navy-900 transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-navy-900/10 bg-cream-50 lg:hidden">
          <nav className="mx-auto max-w-[1200px] px-5 py-6 sm:px-8" aria-label="Mobile">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-navy-900/8">
                  <Link
                    href={item.href}
                    className={`block py-4 font-serif text-xl ${
                      isActive(item.href) ? "text-gold-600" : "text-navy-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={localePath(locale, "contact")}
              className="mt-6 block bg-navy-900 px-6 py-4 text-center text-sm font-medium text-cream-50"
            >
              {t.bookConsultation}
            </Link>

            <div className="mt-6 flex items-center gap-3">
              <span className="eyebrow text-navy-900/40">{t.language}</span>
              <div className="flex gap-2">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={swapLocale(l)}
                    hrefLang={l}
                    className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest ${
                      l === locale
                        ? "border-gold-500 text-gold-600"
                        : "border-navy-900/15 text-navy-900/60"
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
}: {
  locale: Locale;
  swapLocale: (l: Locale) => string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 ? <span className="px-1 text-navy-900/20">/</span> : null}
          <Link
            href={swapLocale(l)}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`text-[0.6875rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
              l === locale ? "text-gold-600" : "text-navy-900/45 hover:text-navy-900"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
