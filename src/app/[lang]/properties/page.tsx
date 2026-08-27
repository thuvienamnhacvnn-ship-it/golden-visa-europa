import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, Eyebrow, Rule, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { PropertyPicker } from "@/components/PropertyPicker";

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

      {/* ── Bốn hồ sơ căn hộ: chọn bằng thẻ, chi tiết đổi tại chỗ ──
           Nền TỐI vì sơ đồ mặt bằng là bản vẽ trên giấy trắng: đặt trên
           nền sáng thì tờ giấy tan vào nền, không thấy mép bản vẽ. */}
      <Section tone="deep">
        <Container>
          <PropertyPicker t={t} />
        </Container>
      </Section>

      {/* ── Điều kiện pháp lý phải nói rõ trước khi khách cân nhắc ── */}
      <Section tone="alt">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Eyebrow>{t.eligibilityTitle}</Eyebrow>
            <Rule className="mt-4 mb-8" />
            <ul className="space-y-6">
              {t.eligibility.map((e, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="display mt-0.5 shrink-0 text-[1.125rem] text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9375rem] leading-8 text-ink/75">{e}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-ink/10 pt-6 text-xs leading-6 text-ink/55">
              {t.note}
            </p>
            <div className="mt-10">
              <ButtonLink href={localePath(locale, "contact")} variant="solid">
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
