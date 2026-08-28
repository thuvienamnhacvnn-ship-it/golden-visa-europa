import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, Eyebrow, Rule, ButtonLink, Words } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { latviaSources, latviaPhotos } from "@/lib/latvia";

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
  const alt = t.photoAlt;

  return (
    <>
      {/* ── Banner: ảnh toàn cảnh Riga bóc từ tài liệu khách ── */}
      <section className="grain relative overflow-hidden bg-deep text-on-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={latviaPhotos.panorama}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Phủ tối từ trái để chữ luôn đọc được trên mọi vùng ảnh */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,16,32,0.92) 0%, rgba(4,16,32,0.80) 34%, rgba(4,16,32,0.46) 62%, rgba(4,16,32,0.18) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          aria-hidden="true"
          style={{ background: "linear-gradient(180deg, transparent, var(--surface))" }}
        />

        <Container className="relative">
          <div className="max-w-3xl pb-28 pt-36 md:pb-36 md:pt-44">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold-400/35 px-3.5 py-1.5 text-gold-400">
              <span className="inline-block h-1 w-1 rounded-full bg-current" />
              {t.eyebrow}
            </span>
            <h1 className="display mt-7 text-[2.4rem] leading-[1.06] sm:text-[3.2rem] lg:text-[3.8rem]">
              <Words text={t.title} />
            </h1>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.85] text-on-deep-2/85">
              {t.lead}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Đất nước: chữ bên trái, hai ảnh xếp so le bên phải ── */}
      <Section tone="base">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow>{t.countryTitle}</Eyebrow>
              <Rule className="mt-4 mb-8" />
              <ul className="flex flex-col gap-4">
                {t.country.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-4 text-[0.9375rem] leading-8 text-ink/75"
                  >
                    <span
                      className="mt-3.5 block h-1 w-4 shrink-0 bg-gold-500"
                      aria-hidden="true"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hai ảnh lệch nhau theo chiều dọc cho đỡ cứng; ẩn ảnh nhỏ ở khổ hẹp */}
            <Reveal delay={100}>
              <div className="flex gap-4 sm:gap-5">
                <figure className="zoom-wrap media m-0 flex-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={latviaPhotos.flag}
                    alt={alt[0]}
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "3 / 4" }}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <figure className="zoom-wrap media m-0 hidden flex-1 self-end sm:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={latviaPhotos.roofs}
                    alt={alt[2]}
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "3 / 4" }}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Quyền lợi trên nền ảnh mái nhà phố cổ ── */}
      <section className="relative overflow-hidden bg-deep py-20 text-on-deep md:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={latviaPhotos.sunset}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-deep/88" aria-hidden="true" />
        <Container className="relative">
          <Eyebrow tone="light">{t.benefitTitle}</Eyebrow>
          <Rule className="mt-4 mb-12" />
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            {[
              { title: t.residencyTitle, items: t.residency },
              { title: t.investTitle, items: t.invest },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 90}>
                <h2 className="text-[1.25rem] text-gold-400">{col.title}</h2>
                <ul className="mt-6 flex flex-col gap-3.5 border-t border-white/15 pt-6">
                  {col.items.map((x) => (
                    <li
                      key={x}
                      className="flex items-start gap-3.5 text-[0.9375rem] leading-7 text-on-deep-2/90"
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
      </section>

      {/* ── Điều kiện tham gia: 3 thẻ, thẻ giữa làm nổi ── */}
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

            {/* Mức đầu tư là thứ khách tìm trước nhất — làm nổi hơn hai thẻ kia */}
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

      {/* ── Chi phí: bảng bên trái, ảnh kiến trúc bên phải ── */}
      <Section tone="alt">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.costTitle}</Eyebrow>
            <Rule className="mt-4" />
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
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

              <ul className="mt-8 flex flex-col gap-3">
                {t.costNotes.map((n) => (
                  <li key={n} className="text-[0.8125rem] leading-7 text-ink/60">
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={100}>
              <figure className="zoom-wrap media m-0 h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={latviaPhotos.modern}
                  alt={alt[3]}
                  className="h-full w-full object-cover"
                  style={{ aspectRatio: "3 / 4" }}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Quy trình: 6 bước, 3 cột × 2 hàng nên hàng nào cũng kín ── */}
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

      {/* ── Dải ảnh Riga lúc hoàng hôn, cắt ngang trước phần pháp lý ── */}
      <section className="relative h-[16rem] overflow-hidden md:h-[22rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={latviaPhotos.skyline}
          alt={alt[4]}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, var(--surface) 0%, transparent 22%, transparent 74%, var(--deep) 100%)",
          }}
        />
      </section>

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
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
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
