"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { localePath, locales, type Dictionary, type Locale } from "@/i18n";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { Sparks, BookIcon } from "./Sparks";
import { site } from "@/lib/site";

type Turn = { role: "user" | "assistant"; content: string };
export type AssistantStrings = Dictionary["assistant"];

export type NavStrings = {
  home: string;
  properties: string;
  whatIs: string;
  services: string;
  offices: string;
  about: string;
  whyUs: string;
  contact: string;
  more: string;
  close: string;
  book: string;
  language: string;
  theme: string;
};

export function Assistant({
  locale,
  t,
  contactLabel,
  nav,
}: {
  locale: Locale;
  t: AssistantStrings;
  contactLabel: string;
  nav: NavStrings;
}) {
  const [sheet, setSheet] = useState(false);
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Luôn cuộn xuống tin mới nhất
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Esc để đóng
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;

    const next: Turn[] = [...turns, { role: "user", content: q }];
    setTurns(next);
    setDraft("");
    setBusy(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, locale }),
      });

      if (!res.ok || !res.body) throw new Error(String(res.status));

      // Đọc theo dòng chảy để chữ hiện dần, không phải chờ trọn câu
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setTurns([...next, { role: "assistant", content: "" }]);

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setTurns([...next, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) setTurns([...next, { role: "assistant", content: t.noAnswer }]);
    } catch {
      setTurns([...next, { role: "assistant", content: t.errorMsg }]);
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(draft);
  };

  return (
    <>
      {/* Thanh biểu tượng dọc, cố định bên trái: trợ lý · WhatsApp · Facebook · hotline */}
      <div className="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {/* Trợ lý — cuốn sách trong đường tròn */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t.close : t.open}
          title={t.open}
          className="gold-box group relative flex h-12 w-12 items-center justify-center rounded-full sm:h-[52px] sm:w-[52px]"
        >
          <Sparks count={7} seed={3} />
          <span className="gold-icon relative z-10">
            {open ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <BookIcon className="h-7 w-7" />
            )}
          </span>
          <span className="absolute right-1.5 top-1.5 z-10 flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
          </span>
          <RailLabel>{t.open}</RailLabel>
        </button>

        <RailLink
          href={`https://wa.me/${site.whatsapp.replace(/[^d]/g, "")}`}
          label="WhatsApp"
          external
        >
          <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.9 9.9 0 0 0 4.88 1.25h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.88 9.88 0 0 0 12.04 2Zm0 18.14h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.4c0-4.56 3.71-8.27 8.27-8.27 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.85c0 4.56-3.71 8.26-8.27 8.26Zm4.53-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
          </svg>
        </RailLink>

        {site.social.find((s) => s.id === "facebook")?.url ? (
          <RailLink
            href={site.social.find((s) => s.id === "facebook")!.url}
            label="Facebook"
            external
          >
            <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14 8.5h2.2V5.6c-.4-.05-1.7-.17-3.2-.17-3.2 0-5.3 1.95-5.3 5.53V13H5v3.3h2.7V24h3.3v-7.7h2.7l.4-3.3h-3.1v-2.4c0-.95.26-1.6 1.6-1.6Z" />
            </svg>
          </RailLink>
        ) : null}

        <RailLink href={`tel:${site.headOffice.phoneHref}`} label={site.headOffice.phone}>
          <svg className="h-[21px] w-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M6.5 3h2l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L15 12l4 1.5v2a2.5 2.5 0 0 1-2.7 2.5A15.5 15.5 0 0 1 4 5.7 2.5 2.5 0 0 1 6.5 3Z" strokeLinejoin="round" />
          </svg>
        </RailLink>
      </div>

      {/* ── Thanh menu dưới đáy, chỉ trên mobile — kiểu ứng dụng ── */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-gold-500/30 bg-surface/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label={nav.more}
      >
        <div className="line-shimmer absolute inset-x-0 top-0" aria-hidden="true" />
        <ul className="relative grid grid-cols-5 items-end">
          <TabItem href={localePath(locale)} label={nav.home}>
            <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
          </TabItem>
          <TabItem href={localePath(locale, "what-is-golden-visa")} label={nav.whatIs}>
            <path d="M4.5 5.5h15v13h-15z" />
            <path d="M8 9.5h8M8 13h5" />
          </TabItem>

          {/* Nút to ở giữa: mở trợ lý */}
          <li className="flex justify-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t.close : t.open}
              className="gold-box relative -mt-7 flex h-16 w-16 items-center justify-center rounded-full bg-surface shadow-[0_10px_28px_-12px_rgba(200,164,77,0.6)]"
            >
              <Sparks count={8} seed={11} />
              <span className="gold-icon relative z-10">
                {open ? (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                ) : (
                  <BookIcon className="h-9 w-9" />
                )}
              </span>
              <span className="absolute right-2 top-2 z-10 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
            </button>
          </li>

          <TabItem href={localePath(locale, "services")} label={nav.services}>
            <path d="M4 7h16M4 12h16M4 17h10" />
          </TabItem>

          <li>
            <button
              type="button"
              onClick={() => setSheet(true)}
              className="flex w-full flex-col items-center gap-1 px-1 pb-2 pt-2.5"
              aria-haspopup="dialog"
            >
              <svg className="gold-icon h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M5 7h14M5 12h14M5 17h14" />
              </svg>
              <span className="text-[0.5625rem] font-medium leading-tight text-ink/70">{nav.more}</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Bảng menu đầy đủ, trượt lên từ đáy */}
      <div
        role="dialog"
        aria-label={nav.more}
        aria-hidden={!sheet}
        className={`fixed inset-0 z-[60] lg:hidden ${sheet ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label={nav.close}
          onClick={() => setSheet(false)}
          className={`absolute inset-0 bg-deep-2/70 backdrop-blur-sm transition-opacity duration-300 ${sheet ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 rounded-t-[26px] border-t border-gold-500/35 bg-surface px-6 pb-8 pt-3 transition-transform duration-300 ${sheet ? "translate-y-0" : "translate-y-full"}`}
          style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-ink/20" />
          <ul className="grid grid-cols-2 gap-2.5">
            {[
              { href: localePath(locale, "about"), label: nav.about },
              { href: localePath(locale, "why-us"), label: nav.whyUs },
              { href: localePath(locale, "properties"), label: nav.properties },
              { href: localePath(locale, "offices"), label: nav.offices },
              { href: localePath(locale, "contact"), label: nav.contact },
            ].map((l, i, arr) => (
              // Lẻ mục: cho mục cuối chiếm cả hàng thay vì trơ ra một nửa
              <li key={l.href} className={i === arr.length - 1 && arr.length % 2 === 1 ? "col-span-2" : ""}>
                <Link
                  href={l.href}
                  onClick={() => setSheet(false)}
                  className="card card-sweep block px-4 py-3.5 text-center text-[0.875rem] font-medium text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={localePath(locale, "contact")}
            onClick={() => setSheet(false)}
            className="btn mt-4 flex items-center justify-center bg-deep px-6 py-3.5 text-[0.875rem] font-medium text-on-deep"
          >
            {nav.book}
          </Link>

          {/* Đổi ngôn ngữ và sáng/tối — hai thứ này trước nằm trong hamburger */}
          <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={nav.language}>
              {locales.map((l) => (
                <Link
                  key={l}
                  href={localePath(l, pathname.split("/").slice(2).join("/"))}
                  hrefLang={l}
                  onClick={() => setSheet(false)}
                  aria-current={l === locale ? "true" : undefined}
                  className={`rounded-full border px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${
                    l === locale
                      ? "border-gold-500 text-gold-600"
                      : "border-ink/15 text-ink/50"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>
            <ThemeToggle label={nav.theme} />
          </div>
        </div>
      </div>

      {/* Khung chat */}
      <div
        role="dialog"
        aria-label={t.title}
        aria-hidden={!open}
        className={`card fixed bottom-24 left-3 right-3 z-[55] flex flex-col shadow-2xl transition-all duration-300 lg:bottom-8 lg:left-[6.5rem] lg:right-auto lg:w-[26rem] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ maxHeight: "min(34rem, calc(100vh - 8rem))" }}
      >
        <header className="flex items-start justify-between gap-3 border-b border-ink/12 bg-deep px-5 py-4 text-on-deep">
          <div>
            <p className="font-serif text-[1.0625rem] leading-tight">{t.title}</p>
            <p className="mt-1 flex items-center gap-2 text-[0.6875rem] text-on-deep-2/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
              {t.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            className="-mr-1 -mt-1 p-1 text-on-deep-2/60 transition-colors hover:text-gold-400"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div ref={logRef} className="flex-1 overflow-y-auto px-5 py-5">
          <Bubble side="bot">{t.greeting}</Bubble>

          {turns.map((m, i) => (
            <Bubble key={i} side={m.role === "user" ? "me" : "bot"}>
              {m.content}
            </Bubble>
          ))}

          {busy && turns[turns.length - 1]?.role === "user" ? (
            <Bubble side="bot">
              <span className="inline-flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40"
                    style={{ animationDelay: `${d * 140}ms` }}
                  />
                ))}
              </span>
            </Bubble>
          ) : null}

          {turns.length === 0 ? (
            <ul className="mt-4 flex flex-col gap-2">
              {t.suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => void ask(s)}
                    className="w-full border border-ink/15 px-3.5 py-2.5 text-left text-[0.8125rem] leading-6 text-ink/75 transition-colors hover:border-gold-500 hover:text-gold-600"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <form onSubmit={onSubmit} className="border-t border-ink/12 px-4 py-3">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t.placeholder}
              maxLength={1200}
              className="min-w-0 flex-1 border border-ink/20 bg-surface-3 px-3.5 py-2.5 text-[0.875rem] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold-500"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label={t.send}
              className="shrink-0 bg-deep px-4 text-on-deep transition-colors hover:bg-deep-3 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
              </svg>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[0.625rem] leading-4 text-ink/40">{t.disclaimer}</p>
            <Link
              href={localePath(locale, "contact")}
              className="shrink-0 text-[0.6875rem] font-medium text-gold-600 underline-sweep"
              title={contactLabel}
            >
              {t.humanCta}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

/** Nhãn hiện ra khi rê chuột, nằm bên phải biểu tượng. */
/** Một mục trên thanh menu dưới đáy. */
function TabItem({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="flex flex-col items-center gap-1 px-1 pb-2 pt-2.5">
        <svg
          className="gold-icon h-[22px] w-[22px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {children}
        </svg>
        <span className="text-[0.5625rem] font-medium leading-tight text-ink/70">{label}</span>
      </Link>
    </li>
  );
}

function RailLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-full border border-gold-500/40 bg-deep/95 px-3 py-1.5 text-[0.6875rem] font-medium text-gold-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block">
      {children}
    </span>
  );
}

function RailLink({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="gold-box group relative flex h-12 w-12 items-center justify-center rounded-full sm:h-[52px] sm:w-[52px]"
    >
      <span className="gold-icon relative z-10">{children}</span>
      <RailLabel>{label}</RailLabel>
    </a>
  );
}

function Bubble({ side, children }: { side: "me" | "bot"; children: React.ReactNode }) {
  const me = side === "me";
  return (
    <div className={`mb-3 flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap px-4 py-2.5 text-[0.875rem] leading-[1.65] ${
          me
            ? "bg-deep text-on-deep"
            : "border border-ink/12 bg-surface-3 text-ink/85"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
