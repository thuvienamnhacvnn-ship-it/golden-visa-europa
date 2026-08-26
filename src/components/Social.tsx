import { site } from "@/lib/site";

/** Chỉ vẽ kênh nào đã có link thật. Kênh chưa xác nhận thì bỏ qua. */
const ICONS: Record<string, React.ReactNode> = {
  facebook: <path d="M14 8.5h2.2V5.6c-.4-.05-1.7-.17-3.2-.17-3.2 0-5.3 1.95-5.3 5.53V13H5v3.3h2.7V24h3.3v-7.7h2.7l.4-3.3h-3.1v-2.4c0-.95.26-1.6 1.6-1.6Z" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="7" r="1.15" />
    </>
  ),
  linkedin: <path d="M6.4 8.8H3.6V20h2.8V8.8ZM5 4a1.7 1.7 0 1 0 0 3.4A1.7 1.7 0 0 0 5 4Zm5.4 4.8H7.7V20h2.7v-5.9c0-2.6 3.4-2.8 3.4 0V20h2.7v-6.8c0-4.4-4.9-4.2-6.1-2.1V8.8Z" />,
  youtube: <path d="M21.6 7.9a2.5 2.5 0 0 0-1.75-1.77C18.3 5.7 12 5.7 12 5.7s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.9C2 9.45 2 12 2 12s0 2.55.4 4.1a2.5 2.5 0 0 0 1.75 1.77C5.7 18.3 12 18.3 12 18.3s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77C22 14.55 22 12 22 12s0-2.55-.4-4.1ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z" />,
  tiktok: <path d="M16.6 3h-2.9v12.3a2.55 2.55 0 1 1-2-2.5V9.7a5.75 5.75 0 1 0 5.2 5.7V9.2a6.6 6.6 0 0 0 3.6 1.1V7.4a3.75 3.75 0 0 1-3.9-4.4Z" />,
  zalo: <path d="M12 3C6.9 3 2.8 6.5 2.8 10.9c0 2.5 1.4 4.8 3.5 6.3-.1.6-.6 2.1-.7 2.4 0 0-.1.2.1.3.1.1.3 0 .3 0 .4-.1 2.5-1.6 3.2-2.1.9.2 1.9.4 2.8.4 5.1 0 9.2-3.5 9.2-7.9S17.1 3 12 3Zm-4 9.9H6.3c-.2 0-.4-.2-.4-.4V8.9c0-.2.2-.4.4-.4s.4.2.4.4v3.2H8c.2 0 .4.2.4.4s-.2.4-.4.4Zm2.3-.4c0 .2-.2.4-.4.4s-.4-.2-.4-.4V9.7c0-.2.2-.4.4-.4s.4.2.4.4v2.8Zm4.1.4c-.2 0-.3-.1-.4-.2l-1.7-2.2v2c0 .2-.2.4-.4.4s-.4-.2-.4-.4V9.7c0-.2.1-.3.3-.4.2 0 .3 0 .4.2l1.8 2.2v-2c0-.2.2-.4.4-.4s.4.2.4.4v2.8c0 .2-.1.3-.3.4h-.1Zm3.6 0c-.2 0-.4-.2-.4-.4v-.2c-.3.4-.7.6-1.2.6-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8c.5 0 .9.2 1.2.6v-.2c0-.2.2-.4.4-.4s.4.2.4.4v2.8c0 .2-.2.4-.4.4Z" />,
};

export function Social({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const active = site.social.filter((s) => s.url);
  if (!active.length) return null;

  const color =
    tone === "light"
      ? "border-on-deep/20 text-on-deep-2/70 hover:border-gold-400 hover:text-gold-400"
      : "border-ink/15 text-ink/55 hover:border-gold-500 hover:text-gold-600";

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {active.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`flex h-10 w-10 items-center justify-center border transition-all duration-200 hover:-translate-y-0.5 ${color}`}
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {ICONS[s.id]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
