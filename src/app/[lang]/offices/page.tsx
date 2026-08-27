import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, Eyebrow, Rule } from "@/components/ui";
import { Artwork } from "@/components/Artwork";
import { cityArtSrc } from "@/lib/art";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

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
    title: dict.offices.title,
    description: dict.offices.lead,
    alternates: {
      canonical: localePath(lang, "offices"),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, "offices")])),
    },
  };
}

export default async function OfficesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.offices;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <Section tone="base">
        <Container>
          <ul className="flex flex-col gap-16">
            {t.items.map((office, i) => (
              <Reveal as="li" key={office.city} delay={(i % 2) * 80}>
                <div className="grid gap-10 md:grid-cols-[0.55fr_1fr] md:gap-14">
                  <Artwork
                    src={cityArtSrc(office.city)}
                    alt={`${office.city}, ${office.country}`}
                    ratio="4 / 3"
                    className="w-full shadow-[0_24px_60px_-40px_rgba(7,27,48,0.5)]"
                  />

                  <div>
                    <Eyebrow>{office.country}</Eyebrow>
                    <Rule className="mt-4 mb-5" />
                    <h2 className="text-[1.875rem] leading-tight sm:text-[2.25rem]">
                      {office.city}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-ink/60">{office.role}</p>

                    {office.confirmed ? (
                      <div className="mt-8">
                        <address className="not-italic text-[0.9375rem] leading-8 text-ink/85">
                          {office.address}
                        </address>
                        {office.phone ? (
                          <a
                            href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
                            className="mt-3 inline-block text-[0.9375rem] text-gold-600 transition-colors hover:text-ink"
                          >
                            {office.phone}
                          </a>
                        ) : null}
                      </div>
                    ) : (
                      <div className="mt-8 rounded-[14px] border border-dashed border-ink/25 bg-surface-2 p-6">
                        <p className="eyebrow text-ink/45">{t.pendingLabel}</p>
                        <p className="mt-3 text-[0.875rem] leading-7 text-ink/70">
                          {t.pendingNote}
                        </p>
                        <a
                          href={`tel:${site.headOffice.phoneHref}`}
                          className="mt-4 inline-block text-[0.9375rem] text-gold-600 transition-colors hover:text-ink"
                        >
                          {site.headOffice.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.title, path: "offices" }])} />
    </>
  );
}
