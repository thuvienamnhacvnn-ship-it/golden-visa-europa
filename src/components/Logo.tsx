export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const ink = tone === "light" ? "#FAF9F6" : "#0E2A47";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="38.5" height="38.5" stroke="#C8A44D" strokeWidth="1.1" />
        <path
          d="M20 8.5l3.1 7.8L31 17.6l-5.8 5.4 1.5 8.1L20 27.3l-6.7 3.8 1.5-8.1L9 17.6l7.9-1.3z"
          fill="#C8A44D"
          fillOpacity="0.9"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-serif text-[1.0625rem] tracking-[0.02em]"
          style={{ color: ink }}
        >
          N. KAKKOS
        </span>
        <span className="mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.28em] text-gold-600">
          Estate
        </span>
      </span>
    </span>
  );
}
