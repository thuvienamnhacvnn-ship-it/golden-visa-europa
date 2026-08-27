import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, Eyebrow, Rule } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
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
    title: dict.contact.title,
    description: dict.contact.lead,
    alternates: {
      canonical: localePath(lang, "contact"),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l, "contact")])),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.contact;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <Section tone="base">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.6fr] lg:gap-20">
            <Reveal>
              <ContactForm
                locale={locale}
                f={t.form}
                privacyLabel={dict.legal.privacy.title}
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="card p-8">
                <Eyebrow>{t.directTitle}</Eyebrow>
                <Rule className="mt-4 mb-6" />

                <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
                  {t.headOffice}
                </p>
                <address className="mt-3 not-italic text-[0.9375rem] leading-8 text-ink/85">
                  {site.name}
                  <br />
                  {site.headOffice.street}
                  <br />
                  {site.headOffice.city} {site.headOffice.postalCode}
                  <br />
                  {site.headOffice.country}
                </address>

                {/* Ba đầu mối: Nikolaos (Athens), Tony và Stella (NIBELC) */}
                <ul className="mt-6 flex flex-col divide-y divide-ink/10 border-t border-ink/10">
                  {site.contacts.map((c) => (
                    <li key={c.href} className="py-4">
                      <p className="text-[0.9375rem] font-medium text-ink">{c.name}</p>
                      <p className="mt-0.5 text-xs text-ink/55">{c.role}</p>
                      <a
                        href={`tel:${c.href}`}
                        className="mt-2 inline-block text-[1.0625rem] font-medium text-gold-600 transition-colors hover:text-ink"
                      >
                        {c.phone}
                      </a>
                      <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-ink/40">
                        {c.channels.join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-ink/10 pt-6">
                  <p className="text-[0.875rem] leading-7 text-ink/70">{t.hours}</p>
                  <p className="mt-2 text-[0.875rem] leading-7 text-ink/70">
                    {t.responseNote}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.title, path: "contact" }])} />
    </>
  );
}
