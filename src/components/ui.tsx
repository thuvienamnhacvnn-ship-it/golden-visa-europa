import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  tone = "cream",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "white" | "navy" | "cream-alt";
  id?: string;
}) {
  const tones = {
    cream: "bg-cream-50 text-navy-900",
    "cream-alt": "bg-cream-100 text-navy-900",
    white: "bg-white text-navy-900",
    navy: "bg-navy-900 text-cream-50",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "light";
}) {
  return (
    <p className={`eyebrow ${tone === "gold" ? "text-gold-600" : "text-gold-400"}`}>
      {children}
    </p>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`rule-gold ${className}`} aria-hidden="true" />;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <Eyebrow tone={tone === "light" ? "light" : "gold"}>{eyebrow}</Eyebrow> : null}
      <Rule className={`mt-4 mb-6 ${centered ? "mx-auto" : ""}`} />
      <Tag
        className={`text-[2rem] leading-[1.15] sm:text-[2.6rem] lg:text-[3.1rem] ${
          tone === "light" ? "text-cream-50" : "text-navy-900"
        }`}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={`mt-5 text-[1.0625rem] leading-[1.8] ${
            tone === "light" ? "text-navy-100" : "text-navy-800/80"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "light";
  className?: string;
};

export function ButtonLink({ href, children, variant = "solid", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-200";
  const variants = {
    solid: "bg-navy-900 text-cream-50 hover:bg-navy-700",
    outline: "border border-navy-900/25 text-navy-900 hover:border-gold-500 hover:text-gold-600",
    light: "bg-gold-500 text-navy-950 hover:bg-gold-400",
    ghost: "border border-cream-50/30 text-cream-50 hover:border-gold-400 hover:text-gold-400",
  } as const;

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** Mũi tên nhỏ dùng trong link "tìm hiểu thêm" */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M1 7h11M8 3l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${
        tone === "light" ? "text-gold-400 hover:text-gold-100" : "text-gold-600 hover:text-navy-900"
      }`}
    >
      {children}
      <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/** Khung giữ chỗ cho ảnh khách hàng chưa gửi — nói rõ thay vì dùng ảnh stock. */
export function PlaceholderFrame({
  label,
  ratio = "4 / 5",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center border border-dashed border-navy-900/20 bg-cream-100 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="px-6 text-center">
        <svg
          className="mx-auto h-8 w-8 text-navy-900/25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="m3 17 5-5 4 4 3-3 6 6" />
        </svg>
        <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.18em] text-navy-900/40">
          {label}
        </p>
      </div>
    </div>
  );
}

/** Đầu trang con: nền navy, tiêu đề lớn, breadcrumb tuỳ chọn. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-cream-50 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 79px, #C8A44D 79px 80px)",
        }}
      />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow tone="light">{eyebrow}</Eyebrow> : null}
          <Rule className="mt-4 mb-7" />
          <h1 className="text-[2.4rem] leading-[1.1] sm:text-[3.1rem] lg:text-[3.5rem]">{title}</h1>
          {lead ? (
            <p className="mt-6 text-[1.0625rem] leading-[1.85] text-navy-100/80">{lead}</p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
