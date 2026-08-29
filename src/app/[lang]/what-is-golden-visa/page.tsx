import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, ButtonLink, Rule, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Sparks } from "@/components/Sparks";
import { TierIcon } from "@/components/TierIcons";
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

  const faq = t.faq.items.map((item) => ({ question: item.q, answer: item.a }));

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/* Giới thiệu */}
      <Section tone="base">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
            <Reveal>
              <div className="prose-lux max-w-2xl text-[1.0625rem] text-ink/85">
                {t.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card p-8">
                <Eyebrow>{t.eligibilityTitle}</Eyebrow>
                <Rule className="mt-4 mb-6" />
                <ul className="flex flex-col gap-4">
                  {t.eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2.5 block h-1 w-3 shrink-0 bg-gold-500"
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] leading-7 text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 12 lợi ích */}
      <Section tone="deep">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="light">{t.eyebrow}</Eyebrow>
            <Rule className="mt-4 mb-6" />
            <h2 className="text-[2rem] leading-tight text-on-deep sm:text-[2.6rem]">
              {t.advantagesTitle}
            </h2>
          </div>

          <ul className="mt-14 grid gap-x-12 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
            {t.advantages.map((advantage, i) => (
              <Reveal as="li" key={advantage} delay={(i % 3) * 70} className="gold-hand">
                <div className="flex items-start gap-5 border-b border-on-deep/12 py-5">
                  <span className="gold-hand__num font-serif text-sm text-gold-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="gold-hand__text text-[0.9375rem] leading-7 text-on-deep-2/85">
                    {advantage}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Mức đầu tư — số liệu có căn cứ pháp lý và ngày kiểm chứng */}
      <Section tone="alt" id="muc-dau-tu">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <Rule className="mt-4 mb-6" />
            <h2 className="text-[2rem] leading-tight sm:text-[2.5rem]">{t.thresholds.title}</h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.85] text-ink/80">
              {t.thresholds.body}
            </p>
          </div>

          <ul className="mt-16 grid gap-5 lg:grid-cols-3">
            {t.thresholds.tiers.map((tier, i) => (
              <Reveal as="li" key={tier.amount} delay={i * 90}>
                {/* Bỏ card-hover: lớp đó cũng nhấc thẻ lên, chồng với hiệu ứng
                    của .tier-gold thành nhấc hai lần. */}
                {/* Căn giữa cả cụm: chữ có lề đều hai bên, ba thẻ nhìn cân
                    nhau dù độ dài phần ghi chú chênh nhau khá nhiều. */}
                <div className="card tier-gold flex h-full flex-col items-center p-9 text-center lg:p-10">
                  <span className="relative z-10">
                    <Sparks count={9} seed={i * 7 + 3} />
                  </span>

                  <span className="tier-gold__badge relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/45 text-gold-600">
                    <TierIcon index={i} className="h-8 w-8" />
                  </span>

                  <span className="tier-gold__amount display relative z-10 mt-6 text-[2.4rem] leading-none text-gold-600 lg:text-[2.6rem]">
                    {tier.amount}
                  </span>

                  <span
                    className="tier-gold__rule relative z-10 mt-5 block h-px w-12 bg-gold-500/45"
                    aria-hidden="true"
                  />

                  <p className="tier-gold__where relative z-10 mt-5 font-medium leading-7 text-ink">
                    {tier.where}
                  </p>
                  {/* Giới hạn bề ngang đoạn ghi chú cho dòng chữ đều nhau,
                      không để một dòng dài kéo sát mép thẻ. */}
                  <p className="tier-gold__note relative z-10 mt-3 max-w-[30ch] text-ink/70">
                    {tier.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full border-l-2 border-l-gold-500 p-8">
                <h3 className="text-[1.25rem] leading-snug">{t.thresholds.sizeTitle}</h3>
                <p className="mt-4 text-[0.9375rem] leading-7 text-ink/80">
                  {t.thresholds.sizeBody}
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card h-full border-l-2 border-l-gold-500 p-8">
                <h3 className="text-[1.25rem] leading-snug">{t.thresholds.startupTitle}</h3>
                <p className="mt-4 text-[0.9375rem] leading-7 text-ink/80">
                  {t.thresholds.startupBody}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs leading-6 text-ink/55">{t.thresholds.sourceNote}</p>
              <p className="mt-1 text-xs font-medium text-gold-600">{t.thresholds.verified}</p>
            </div>
            <ButtonLink href={localePath(locale, "contact")} variant="solid" className="shrink-0">
              {t.thresholds.cta}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Thẻ cho quyền gì và không cho quyền gì */}
      <Section tone="raised">
        <Container>
          <SectionHeading eyebrow={t.eyebrow} title={t.rules.title} lead={t.rules.lead} />
          {/* 5 mục — để hàng ngang chứ không xếp lưới 2 cột, tránh mục thứ 5 lẻ loi */}
          <ul className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
            {t.rules.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 3) * 70}>
                <div className="grid gap-3 py-7 md:grid-cols-[0.42fr_1fr] md:gap-10">
                  <h3 className="flex items-start gap-3 text-[1.1875rem] leading-snug">
                    <span className="mt-1 font-serif text-sm text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-7 text-ink/75">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Hỏi đáp */}
      <Section tone="base">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow={t.eyebrow} title={t.faq.title} align="center" />
            <div className="mt-14 border-t border-ink/10">
              {t.faq.items.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <div className="text-[0.9375rem] leading-[1.85] text-ink/75">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Miễn trừ */}
      <section className="bg-surface pb-20">
        <Container>
          <p className="mx-auto max-w-3xl border-t border-ink/10 pt-8 text-xs leading-6 text-ink/50">
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
