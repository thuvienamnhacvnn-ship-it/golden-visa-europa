import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Section, PageHero } from "@/components/ui";
import { Artwork, serviceArtSrc } from "@/components/Artwork";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import {
  getDictionary,
  isLocale,
  localePath,
  locales,
  serviceSlugs,
  type Locale,
} from "@/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";

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
    title: dict.services.title,
    description: dict.services.lead,
    alternates: {
      canonical: localePath(lang, "services"),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, "services")])),
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        lead={dict.services.lead}
      />

      <Section tone="base">
        <Container>
          <ul className="flex flex-col">
            {serviceSlugs.map((slug, i) => {
              const service = dict.services.items[slug];
              return (
                <Reveal as="li" key={slug} delay={(i % 2) * 80}>
                  <Link
                    href={localePath(locale, `services/${slug}`)}
                    className="group grid gap-6 border-b border-ink/12 py-10 transition-colors hover:bg-surface-2 md:grid-cols-[200px_1fr_auto] md:items-center md:gap-10 md:px-4"
                  >
                    <Artwork
                      src={serviceArtSrc(slug)}
                      alt={service.name}
                      ratio="4 / 3"
                      className="w-full"
                    />

                    <span className="block">
                      <span className="block font-serif text-sm text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-2 block font-serif text-[1.625rem] leading-snug text-ink sm:text-[2rem]">
                        {service.name}
                      </span>
                      <span className="mt-3 block max-w-2xl text-[0.9375rem] leading-7 text-ink/70">
                        {service.tagline}
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-gold-600">
                      {dict.common.learnMore}
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M1 7h11M8 3l4 4-4 4" strokeLinecap="square" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd(locale, [{ name: dict.services.title, path: "services" }])}
      />
    </>
  );
}
