"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { localePath, type Dictionary, type Locale } from "@/i18n";

type FormStrings = Dictionary["contact"]["form"];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  locale,
  f,
  privacyLabel,
}: {
  locale: Locale;
  f: FormStrings;
  privacyLabel: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Bẫy bot: người thật không bao giờ điền ô này
    if ((data.get("company") as string)?.trim()) return;

    const next: Record<string, string> = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name) next.name = f.required;
    if (!email) next.email = f.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = f.invalidEmail;
    if (!message) next.message = f.required;
    if (!data.get("consent")) next.consent = f.consentRequired;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: data.get("phone"),
          country: data.get("country"),
          interest: data.get("interest"),
          budget: data.get("budget"),
          message,
          locale,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gold-500/40 bg-surface-2 p-8 sm:p-10">
        <svg
          className="h-9 w-9 text-gold-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m8 12.5 2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="mt-5 text-2xl">{f.successTitle}</h3>
        <p className="mt-3 text-[0.9375rem] leading-7 text-ink/75">{f.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={f.name} name="name" required error={errors.name} autoComplete="name" />
        <Field
          label={f.email}
          name="email"
          type="email"
          required
          error={errors.email}
          autoComplete="email"
        />
        <Field label={f.phone} name="phone" type="tel" autoComplete="tel" />
        <Field label={f.country} name="country" autoComplete="country-name" />
        <Select label={f.interest} name="interest" options={f.interestOptions} />
        <Select label={f.budget} name="budget" options={f.budgetOptions} />
      </div>

      <Field label={f.message} name="message" textarea required error={errors.message} />

      {/* honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink/80">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 shrink-0 accent-[#0E2A47]"
          />
          <span>
            {f.consent}{" "}
            <Link
              href={localePath(locale, "legal/privacy")}
              className="text-gold-600 underline underline-offset-4"
            >
              {privacyLabel}
            </Link>
          </span>
        </label>
        {errors.consent ? <ErrorText>{errors.consent}</ErrorText> : null}
      </div>

      {status === "error" ? (
        <div className="border-l-2 border-red-700 bg-red-50 px-5 py-4">
          <p className="text-sm font-medium text-red-900">{f.errorTitle}</p>
          <p className="mt-1 text-sm text-red-800/80">{f.errorBody}</p>
        </div>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center bg-deep px-8 py-4 text-sm font-medium tracking-wide text-on-deep transition-colors hover:bg-deep-3 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? f.sending : f.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  textarea,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const cls =
    "w-full border border-ink/20 bg-surface-3 px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-gold-500";
  return (
    <label className={textarea ? "block" : "block"}>
      <span className="eyebrow block text-ink/50">
        {label}
        {required ? <span className="text-gold-600"> *</span> : null}
      </span>
      <span className="mt-2 block">
        {textarea ? (
          <textarea name={name} rows={6} className={`${cls} resize-y`} />
        ) : (
          <input type={type} name={name} autoComplete={autoComplete} className={cls} />
        )}
      </span>
      {error ? <ErrorText>{error}</ErrorText> : null}
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="eyebrow block text-ink/50">{label}</span>
      <span className="mt-2 block">
        <select
          name={name}
          defaultValue={options[0]}
          className="w-full appearance-none border border-ink/20 bg-surface-3 px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors focus:border-gold-500"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <span className="mt-1.5 block text-xs text-red-700">{children}</span>;
}
