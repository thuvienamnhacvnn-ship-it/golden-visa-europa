import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, Eyebrow, Rule, ButtonLink } from "@/components/ui";
import { Artwork } from "@/components/Artwork";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { properties, gallery } from "@/lib/properties";

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
    title: dict.properties.title,
    description: dict.properties.lead,
    alternates: {
      canonical: localePath(lang, "properties"),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, "properties")])),
    },
  };
}

export default async function PropertiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.properties;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/* ── Giới thiệu chung + cam kết: dùng chung cho cả bốn căn ── */}
      <Section tone="base">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>{t.introTitle}</Eyebrow>
              <Rule className="mt-4 mb-6" />
              <p className="text-[1.0625rem] leading-8 text-ink/75">{t.intro}</p>
            </div>
            <div className="card card-sweep p-8">
              <h2 className="text-[1.125rem]">{t.commitTitle}</h2>
              <ul className="mt-5 space-y-3">
                {t.commitments.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-[0.9375rem] leading-7 text-ink/75"
                  >
                    <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Bốn hồ sơ căn hộ ── */}
      <Section tone="alt">
        <Container>
          <ul className="flex flex-col gap-20">
            {properties.map((prop, i) => {
              const item = t.items[prop.id];
              return (
                <Reveal as="li" key={prop.id} delay={(i % 2) * 80}>
                  <article className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
                    {/* Sơ đồ mặt bằng — bản vẽ nét, nền trắng để đọc được chữ */}
                    <div>
                      <Artwork
                        src={prop.plan}
                        alt={`${item.name} — ${t.planTitle}`}
                        ratio="3 / 4"
                        fit="contain"
                        priority={i === 0}
                        className="w-full !bg-white p-3 shadow-[0_24px_60px_-40px_rgba(7,27,48,0.5)]"
                      />
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ink/45">
                        {t.planTitle}
                      </p>
                    </div>

                    <div>
                      <Eyebrow>{prop.area}</Eyebrow>
                      <h2 className="display mt-4 text-[2rem] text-ink">{item.name}</h2>
                      <Rule className="mt-5 mb-6" />

                      <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-y border-ink/10 py-6 text-[0.875rem] sm:grid-cols-3">
                        <div>
                          <dt className="text-ink/50">{t.priceLabel}</dt>
                          <dd className="display mt-1 text-[1.375rem] text-ink">{prop.price}</dd>
                        </div>
                        <div>
                          <dt className="text-ink/50">{t.rentLabel}</dt>
                          <dd className="mt-1 font-medium text-ink">{prop.rent}</dd>
                        </div>
                        <div>
                          <dt className="text-ink/50">{t.typeLabel}</dt>
                          <dd className="mt-1 font-medium text-ink">{t.typeValue}</dd>
                        </div>
                        <div>
                          <dt className="text-ink/50">{t.bedsLabel}</dt>
                          <dd className="mt-1 font-medium text-ink">{prop.beds}</dd>
                        </div>
                        <div>
                          <dt className="text-ink/50">{t.bathsLabel}</dt>
                          <dd className="mt-1 font-medium text-ink">{prop.baths}</dd>
                        </div>
                        <div>
                          <dt className="text-ink/50">{t.sizeLabel}</dt>
                          <dd className="mt-1 italic text-ink/45">{prop.size ?? t.sizePending}</dd>
                        </div>
                      </dl>

                      <h3 className="mt-8 text-[1rem]">{t.layoutTitle}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-8 text-ink/70">{item.layout}</p>

                      <p className="mt-6 text-[0.875rem] text-ink/60">
                        <span className="text-ink/45">{t.capacityLabel}: </span>
                        <span className="font-medium text-ink">{item.capacity}</span>
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* ── Phối cảnh nội thất dùng chung ── */}
      <Section tone="raised">
        <Container>
          <Eyebrow>{t.galleryTitle}</Eyebrow>
          <Rule className="mt-4 mb-8" />
          {/* 8 ảnh: 2/4 cột nên không bao giờ lẻ hàng */}
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {gallery.map((g, i) => (
              <Reveal as="li" key={g.key} delay={(i % 4) * 70}>
                <Artwork
                  src={g.src}
                  alt={`${t.galleryTitle} — ${i + 1}`}
                  ratio="4 / 5"
                  className="w-full zoom-wrap"
                />
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-6 text-ink/50">{t.galleryNote}</p>
        </Container>
      </Section>

      {/* ── Điều kiện pháp lý phải nói rõ trước khi khách cân nhắc ── */}
      <Section tone="deep">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Eyebrow tone="light">{t.eligibilityTitle}</Eyebrow>
            <Rule className="mt-4 mb-8" />
            <ul className="space-y-6">
              {t.eligibility.map((e, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="display mt-0.5 shrink-0 text-[1.125rem] text-gold-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9375rem] leading-8 text-on-deep-2">{e}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-on-deep-2/70">
              {t.note}
            </p>
            <div className="mt-10">
              <ButtonLink href={localePath(locale, "contact")} variant="light">
                {t.cta}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd(locale, [{ name: t.title, path: "properties" }])}
      />
    </>
  );
}
