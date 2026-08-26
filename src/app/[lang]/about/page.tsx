import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, PlaceholderFrame, Eyebrow, Rule } from "@/components/ui";
import { Artwork, crestSrc } from "@/components/Artwork";
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
    title: dict.about.title,
    description: dict.about.lead,
    alternates: {
      canonical: localePath(lang, "about"),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, "about")])),
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.about;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <Section tone="base">
        <Container>
          <Reveal>
            <div className="prose-lux mx-auto max-w-3xl text-[1.0625rem] text-ink/85">
              {t.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Người sáng lập + CV */}
      <Section tone="raised">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
            <Reveal>
              <Artwork src={crestSrc} alt={t.founder.name} ratio="4 / 5" className="bg-deep" />
              <p className="mt-4 text-xs leading-6 text-ink/45">{t.portraitPending}</p>
            </Reveal>

            <Reveal delay={120}>
              <Eyebrow>{t.founder.role}</Eyebrow>
              <Rule className="mt-4 mb-6" />
              <h2 className="text-[2rem] leading-tight sm:text-[2.5rem]">{t.founder.name}</h2>
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.85] text-ink/85">
                {t.founder.body}
              </p>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {t.founder.credentials.map((credential) => (
                  <li key={credential} className="card p-6">
                    <Seal className="gold-icon h-6 w-6" />
                    <p className="mt-4 text-[0.875rem] leading-6 text-ink/80">{credential}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Đội ngũ */}
      <Section tone="alt">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <Rule className="mt-4 mb-6" />
            <h2 className="text-[2rem] leading-tight sm:text-[2.5rem]">{t.teamTitle}</h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.8] text-ink/80">{t.teamLead}</p>
          </div>

          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Reveal as="li" key={i} delay={i * 80}>
                <PlaceholderFrame label={dict.common.needsClientInput} ratio="3 / 4" />
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-6 text-ink/45">{t.placeholderTeam}</p>
        </Container>
      </Section>

      {/* Luật sư & công chứng */}
      <Section tone="deep">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow tone="light">{dict.nav.about}</Eyebrow>
              <Rule className="mx-auto mt-4 mb-7" />
              <h2 className="text-[1.875rem] leading-tight text-on-deep sm:text-[2.4rem]">
                {t.legalTitle}
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.85] text-on-deep-2/80">
                {t.legalBody}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.title, path: "about" }])} />
    </>
  );
}
