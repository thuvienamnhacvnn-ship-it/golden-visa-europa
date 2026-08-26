"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { localePath, type Dictionary, type Locale } from "@/i18n";

type Turn = { role: "user" | "assistant"; content: string };
export type AssistantStrings = Dictionary["assistant"];

export function Assistant({
  locale,
  t,
  contactLabel,
}: {
  locale: Locale;
  t: AssistantStrings;
  contactLabel: string;
}) {
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
      {/* Nút mở */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t.close : t.open}
        className="fixed bottom-6 left-5 z-50 flex items-center gap-2.5 rounded-full bg-gold-500 py-3 pl-3.5 pr-5 text-deep-2 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 sm:left-8"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          {open ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-2.9-.4L4 21l1.4-4a8.2 8.2 0 0 1-1.4-4.6 8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 8 7.5Z" strokeLinejoin="round" />
              <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <span className="text-[0.8125rem] font-semibold tracking-wide">{t.open}</span>
        {/* chấm 24/7 nhấp nháy nhẹ */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-deep-2/40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-deep-2/70" />
        </span>
      </button>

      {/* Khung chat */}
      <div
        role="dialog"
        aria-label={t.title}
        aria-hidden={!open}
        className={`fixed bottom-24 left-4 z-50 flex w-[min(26rem,calc(100vw-2rem))] flex-col border border-ink/15 bg-surface shadow-2xl transition-all duration-300 sm:left-8 ${
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
