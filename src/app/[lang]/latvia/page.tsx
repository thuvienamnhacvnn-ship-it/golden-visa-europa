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

      {/* ── Đất nước: 6 gạch đầu dòng, cột dòng chảy nên không lẻ hàng ── */}
      <Section tone="base">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>{t.countryTitle}</Eyebrow>
              <Rule className="mt-4" />
            </div>
            <ul className="flex flex-col gap-4">
              {t.country.map((c) => (
                <li key={c} className="flex items-start gap-4 text-[0.9375rem] leading-8 text-ink/75">
                  <span className="mt-3.5 block h-1 w-4 shrink-0 bg-gold-500" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Quyền lợi: hai cột cư trú / đầu tư ── */}
      <Section tone="deep">
        <Container>
          <Eyebrow tone="light">{t.benefitTitle}</Eyebrow>
          <Rule className="mt-4 mb-12" />
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            {[
              { title: t.residencyTitle, items: t.residency },
              { title: t.investTitle, items: t.invest },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 90}>
                <h2 className="text-[1.25rem] text-gold-400">{col.title}</h2>
                <ul className="mt-6 flex flex-col gap-3.5 border-t border-white/12 pt-6">
                  {col.items.map((x) => (
                    <li
                      key={x}
                      className="flex items-start gap-3.5 text-[0.9375rem] leading-7 text-on-deep-2/85"
                    >
                      <span
                        className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                        aria-hidden="true"
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Điều kiện tham gia ── */}
      <Section tone="base">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.condTitle}</Eyebrow>
            <Rule className="mt-4" />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Reveal>
              <div className="card h-full p-8">
                <h2 className="text-[1.0625rem]">{t.basicTitle}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {t.basic.map((x) => (
                    <li key={x} className="text-[0.875rem] leading-7 text-ink/70">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Mức đầu tư là điều khách tìm trước nhất — làm nổi hơn hai thẻ kia */}
            <Reveal delay={80}>
              <div className="card card-sweep h-full border-gold-500/40 bg-gold-500/[0.06] p-8">
                <h2 className="text-[1.0625rem] text-gold-700">{t.amountTitle}</h2>
                <ul className="mt-5 flex flex-col gap-4">
                  {t.amount.map((x) => (
                    <li key={x} className="text-[0.875rem] leading-7 text-ink/80">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="card h-full p-8">
                <h2 className="text-[1.0625rem]">{t.familyTitle}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {t.family.map((x) => (
                    <li key={x} className="text-[0.875rem] leading-7 text-ink/70">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Bảng chi phí ── */}
      <Section tone="alt">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.costTitle}</Eyebrow>
            <Rule className="mt-4" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Bảng cuộn ngang trong khung riêng để trang không trượt ngang trên điện thoại */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[26rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink/15">
                    <th className="eyebrow py-3 pr-4 text-ink/50">{t.costCols[0]}</th>
                    <th className="eyebrow py-3 pl-4 text-right text-ink/50">{t.costCols[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.costs.map((row) => (
                    <tr key={row.item} className="border-b border-ink/10">
                      <td className="py-4 pr-4 text-[0.9375rem] leading-7 text-ink/75">
                        {row.item}
                      </td>
                      <td className="py-4 pl-4 text-right text-[0.9375rem] font-medium text-ink">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b-2 border-gold-500/50">
                    <td className="py-5 pr-4 text-[0.9375rem] font-medium text-ink">
                      {t.costTotalLabel}
                    </td>
                    <td className="display py-5 pl-4 text-right text-[1.625rem] text-gold-700">
                      {t.costTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="flex flex-col gap-4 border-t border-ink/10 pt-6 lg:border-0 lg:pt-0">
              {t.costNotes.map((n) => (
                <li key={n} className="text-[0.8125rem] leading-7 text-ink/60">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Quy trình 6 bước: 3 cột × 2 hàng nên hàng nào cũng kín ── */}
      <Section tone="base">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.processTitle}</Eyebrow>
            <Rule className="mt-4" />
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={(i % 3) * 80}>
                <div className="card card-hover card-sweep h-full p-8">
                  <span className="display text-[1.125rem] text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-5 text-[1.0625rem] leading-snug">{step.title}</h2>
                  <p className="mt-4 text-[0.875rem] leading-7 text-ink/70">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Tình hình pháp lý + nguồn ── */}
      <Section tone="deep">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
            <div>
              <Eyebrow tone="light">{t.lawTitle}</Eyebrow>
              <Rule className="mt-4 mb-6" />
              <p className="text-[0.9375rem] leading-8 text-on-deep-2/85">{t.lawBody}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.16em] text-gold-400">{t.verified}</p>
              <div className="mt-9">
                <ButtonLink href={localePath(locale, "contact")} variant="light">
                  {t.cta}
                </ButtonLink>
              </div>
            </div>

            <div>
              <ul className="flex flex-col gap-4 border-t border-white/12 pt-6">
                {latviaSources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="group block">
                      <span className="text-[0.875rem] font-medium text-on-deep transition-colors group-hover:text-gold-400">
                        {s.label} ↗
                      </span>
                      <span className="mt-1 block text-[0.75rem] leading-6 text-on-deep-2/55">
                        {s.note}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/12 pt-6 text-xs leading-6 text-on-deep-2/55">
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
