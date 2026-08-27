import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Section, PageHero, ButtonLink, Eyebrow, Rule } from "@/components/ui";
import { Artwork } from "@/components/Artwork";
import { serviceArtSrc } from "@/lib/art";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import {
  getDictionary,
  isLocale,
  localePath,
  locales,
  serviceSlugs,
  type Locale,
  type ServiceSlug,
} from "@/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((lang) => serviceSlugs.map((slug) => ({ lang, slug })));
}

function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) return {};
  const dict = getDictionary(lang);
  const service = dict.services.items[slug];
  return {
    title: service.name,
    description: service.tagline,
    alternates: {
      canonical: localePath(lang, `services/${slug}`),
      languages: Object.fromEntries(
        locales.map((l) => [l, localePath(l, `services/${slug}`)]),
      ),
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const service = dict.services.items[slug];

  const index = serviceSlugs.indexOf(slug);
  const next = serviceSlugs[(index + 1) % serviceSlugs.length];
  const nextService = dict.services.items[next];

  return (
    <>
      <PageHero eyebrow={dict.services.title} title={service.name} lead={service.tagline}>
        <div className="mt-9">
          <Link
            href={localePath(locale, "services")}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-gold-400 transition-colors hover:text-gold-100"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M13 7H2M6 3 2 7l4 4" strokeLinecap="square" />
            </svg>
            {dict.common.backToServices}
          </Link>
        </div>
      </PageHero>

      <Section tone="base">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
            <Reveal>
              <Artwork
                src={serviceArtSrc(slug)}
                alt={service.name}
                ratio="16 / 9"
                className="mb-12 w-full"
                priority
              />
              <div className="prose-lux max-w-2xl text-[1.0625rem] text-ink/85">
                {service.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {service.note ? (
                <p className="mt-10 border-l-2 border-gold-500 py-2 pl-6 font-serif text-[1.25rem] leading-[1.6] text-ink">
                  {service.note}
                </p>
              ) : null}
            </Reveal>

            <Reveal delay={120}>
              <div className="card-deep p-8 text-on-deep">
                <Eyebrow tone="light">{service.highlight.label}</Eyebrow>
                <Rule className="mt-4 mb-5" />
                <p className="text-[0.9375rem] leading-7 text-on-deep-2/85">
                  {service.highlight.text}
                </p>
              </div>

              <div className="card mt-8 p-8">
                <p className="text-sm leading-7 text-ink/75">{dict.contact.lead}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href={localePath(locale, "contact")} variant="solid">
                    {dict.common.bookConsultation}
                  </ButtonLink>
                  <a
                    href={`tel:${site.headOffice.phoneHref}`}
                    className="inline-flex items-center justify-center border border-ink/25 px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors hover:border-gold-500 hover:text-gold-600"
                  >
                    {site.headOffice.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Danh sách hạng mục */}
      <Section tone="raised">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{dict.common.ourServices}</Eyebrow>
            <Rule className="mt-4 mb-6" />
            <h2 className="text-[1.75rem] leading-tight sm:text-[2.25rem]">{service.name}</h2>
          </div>

          {/* Cột dòng chảy chứ không phải lưới: số gạch đầu dòng của mỗi dịch vụ
              là 4–9, lưới 2 cột thì mục cuối trơ ra một mình. Cột dòng chảy tự
              chia đôi theo chiều cao nên hàng cuối luôn kín. */}
          <ul className="mt-12 sm:columns-2 sm:gap-x-12">
            {service.bullets.map((bullet, i) => (
              <Reveal as="li" key={bullet} delay={(i % 2) * 70} className="break-inside-avoid">
                <div className="flex items-start gap-4 border-b border-ink/10 py-5">
                  <span className="mt-2.5 block h-1 w-4 shrink-0 bg-gold-500" aria-hidden="true" />
                  <span className="text-[0.9375rem] leading-7 text-ink/80">{bullet}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Dịch vụ kế tiếp */}
      <section className="bg-surface-2 py-16">
        <Container>
          <Link
            href={localePath(locale, `services/${next}`)}
            className="group flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <span className="eyebrow text-ink/40">{dict.common.ourServices}</span>
            <span className="flex items-center gap-4 font-serif text-[1.5rem] text-ink transition-colors group-hover:text-gold-600 sm:text-[2rem]">
              {nextService.name}
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5"
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
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.services.title, path: "services" },
          { name: service.name, path: `services/${slug}` },
        ])}
      />
    </>
  );
}
