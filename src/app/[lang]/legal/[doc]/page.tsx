import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
import { site } from "@/lib/site";

const docs = ["privacy", "terms", "disclaimer"] as const;
type Doc = (typeof docs)[number];

export function generateStaticParams() {
  return locales.flatMap((lang) => docs.map((doc) => ({ lang, doc })));
}

function isDoc(value: string): value is Doc {
  return (docs as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}): Promise<Metadata> {
  const { lang, doc } = await params;
  if (!isLocale(lang) || !isDoc(doc)) return {};
  const dict = getDictionary(lang);
  const content = dict.legal[doc];
  return {
    title: content.title,
    description: content.lead,
    robots: { index: true, follow: true },
    alternates: {
      canonical: localePath(lang, `legal/${doc}`),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, `legal/${doc}`)])),
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}) {
  const { lang, doc } = await params;
  if (!isLocale(lang) || !isDoc(doc)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const content = dict.legal[doc];

  return (
    <>
      <PageHero title={content.title} lead={content.lead} />

      <Section tone="cream">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-navy-900/40">
              {dict.legal.updated}: {site.legalUpdated}
            </p>

            <div className="mt-12 flex flex-col gap-12">
              {content.sections.map((section, i) => (
                <Reveal key={section.title} delay={(i % 3) * 70}>
                  <section>
                    <h2 className="text-[1.375rem] leading-snug sm:text-[1.625rem]">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-[1rem] leading-[1.85] text-navy-800/80">
                      {section.body}
                    </p>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
