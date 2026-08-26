import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Seal } from "@/components/Ornament";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
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
    title: dict.whyUs.title,
    description: dict.whyUs.lead,
    alternates: {
      canonical: localePath(lang, "why-us"),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, "why-us")])),
    },
  };
}

export default async function WhyUsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.whyUs;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <Section tone="base">
        <Container>
          <Reveal>
            <div className="prose-lux mx-auto max-w-3xl text-[1.0625rem] text-ink/85">
              {t.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.points.map((point, i) => (
              <Reveal as="li" key={point.title} delay={(i % 3) * 80}>
                <div className="card card-hover h-full p-8 lg:p-10">
                  <Seal className="h-8 w-8 text-gold-600" />
                  <h2 className="mt-6 text-[1.25rem] leading-snug">{point.title}</h2>
                  <p className="mt-4 text-[0.9375rem] leading-7 text-ink/70">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-16 text-center">
            <ButtonLink href={localePath(locale, "contact")} variant="solid">
              {dict.common.bookConsultation}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.title, path: "why-us" }])} />
    </>
  );
}
