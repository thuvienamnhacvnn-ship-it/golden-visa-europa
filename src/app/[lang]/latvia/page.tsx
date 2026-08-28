import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, Eyebrow, Rule, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { latviaSources } from "@/lib/latvia";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.latvia.title,
    description: dict.latvia.lead,
    alternates: {
      canonical: localePath(lang, "latvia"),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, "latvia")])),
    },
  };
}

export default async function LatviaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.latvia;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/* ── Tình hình hiện tại: đặt ngay đầu vì đây là điều khách cần biết trước ── */}
      <Section tone="base">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>{t.statusTitle}</Eyebrow>
              <Rule className="mt-4 mb-6" />
              <p className="text-xs uppercase tracking-[0.18em] text-gold-600">{t.verified}</p>
            </div>
            <p className="text-[1.0625rem] leading-8 text-ink/80">{t.statusBody}</p>
          </div>
        </Container>
      </Section>

      {/* ── Diễn biến theo mốc thời gian ── */}
      <Section tone="deep">
        <Container>
          <Eyebrow tone="light">{t.timelineTitle}</Eyebrow>
          <Rule className="mt-4 mb-12" />
          <ol className="flex flex-col gap-0">
            {t.timeline.map((step, i) => (
              <Reveal as="li" key={step.date} delay={(i % 4) * 70}>
                <div className="grid gap-3 border-t border-white/12 py-7 md:grid-cols-[10rem_1fr] md:gap-10">
                  <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-gold-400">
                    {step.date}
                  </p>
                  <div>
                    <h2 className="text-[1.125rem] leading-snug text-on-deep">{step.title}</h2>
                    <p className="mt-3 text-[0.9375rem] leading-8 text-on-deep-2/80">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Nghĩa gì với nhà đầu tư: 3 thẻ, 3 cột nên không lẻ hàng ── */}
      <Section tone="alt">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.meaningTitle}</Eyebrow>
            <Rule className="mt-4 mb-6" />
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {t.meaning.map((m, i) => (
              <Reveal as="li" key={m.title} delay={(i % 3) * 80}>
                <div className="card card-hover card-sweep h-full p-8">
                  <span className="display text-[1.125rem] text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-5 text-[1.125rem] leading-snug">{m.title}</h2>
                  <p className="mt-4 text-[0.9375rem] leading-7 text-ink/70">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Quan điểm + nguồn ── */}
      <Section tone="base">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <Eyebrow>{t.stanceTitle}</Eyebrow>
              <Rule className="mt-4 mb-6" />
              <p className="text-[1.0625rem] leading-8 text-ink/80">{t.stanceBody}</p>
              <div className="mt-9">
                <ButtonLink href={localePath(locale, "contact")} variant="solid">
                  {t.cta}
                </ButtonLink>
              </div>
            </div>

            <div>
              <h2 className="eyebrow text-gold-600">{t.sourcesTitle}</h2>
              <ul className="mt-6 flex flex-col gap-4 border-t border-ink/10 pt-6">
                {latviaSources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <span className="text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-gold-600">
                        {s.label} ↗
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-6 text-ink/55">
                        {s.note}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-ink/10 pt-6 text-xs leading-6 text-ink/50">
                {t.note}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.title, path: "latvia" }])} />
    </>
  );
}
