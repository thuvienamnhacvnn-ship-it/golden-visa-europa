import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, ButtonLink, Rule, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

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
    title: dict.whatIs.title,
    description: dict.whatIs.lead,
    alternates: {
      canonical: localePath(lang, "what-is-golden-visa"),
      languages: Object.fromEntries(
        locales.map((l) => [l, localePath(l, "what-is-golden-visa")]),
      ),
    },
  };
}

export default async function WhatIsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.whatIs;

  const faq = [
    { question: t.title, answer: t.intro[0] },
    { question: t.thresholds.title, answer: t.thresholds.body },
    { question: t.eligibilityTitle, answer: t.eligibility.join("; ") },
  ];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/* Giới thiệu */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
            <Reveal>
              <div className="prose-lux max-w-2xl text-[1.0625rem] text-navy-800/85">
                {t.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="border border-navy-900/12 bg-white p-8">
                <Eyebrow>{t.eligibilityTitle}</Eyebrow>
                <Rule className="mt-4 mb-6" />
                <ul className="flex flex-col gap-4">
                  {t.eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2.5 block h-1 w-3 shrink-0 bg-gold-500"
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] leading-7 text-navy-800/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 12 lợi ích */}
      <Section tone="navy">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="light">{t.eyebrow}</Eyebrow>
            <Rule className="mt-4 mb-6" />
            <h2 className="text-[2rem] leading-tight text-cream-50 sm:text-[2.6rem]">
              {t.advantagesTitle}
            </h2>
          </div>

          <ul className="mt-14 grid gap-x-12 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
            {t.advantages.map((advantage, i) => (
              <Reveal as="li" key={advantage} delay={(i % 3) * 70}>
                <div className="flex items-start gap-5 border-b border-cream-50/12 py-5">
                  <span className="font-serif text-sm text-gold-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-7 text-navy-100/85">{advantage}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Mức đầu tư — cố ý không nêu con số cũ */}
      <Section tone="cream-alt">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl border-l-2 border-gold-500 bg-white p-9 sm:p-12">
              <Eyebrow>{t.thresholds.title}</Eyebrow>
              <p className="mt-6 text-[1.0625rem] leading-[1.85] text-navy-800/85">
                {t.thresholds.body}
              </p>
              <p className="mt-5 text-xs leading-6 text-navy-800/50">{t.thresholds.sourceNote}</p>
              <div className="mt-8">
                <ButtonLink href={localePath(locale, "contact")} variant="solid">
                  {t.thresholds.cta}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Miễn trừ */}
      <section className="bg-cream-50 pb-20">
        <Container>
          <p className="mx-auto max-w-3xl border-t border-navy-900/10 pt-8 text-xs leading-6 text-navy-800/50">
            {t.disclaimer}
          </p>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.whatIs, path: "what-is-golden-visa" },
        ])}
      />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
