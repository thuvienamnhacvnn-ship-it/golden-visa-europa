import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Section, SectionHeading, Eyebrow, Rule, ButtonLink, TextLink } from "@/components/ui";
import { Artwork, serviceArtSrc, cityArtSrc, crestSrc } from "@/components/Artwork";
import { HeroOrnament, MeanderRule, Seal } from "@/components/Ornament";
import { HeroVideo } from "@/components/HeroMedia";
import { Words } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, localePath, serviceSlugs, type Locale } from "@/i18n";
import { site } from "@/lib/site";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.home;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-deep-2 text-on-deep">
        <HeroOrnament className="pointer-events-none absolute inset-y-0 right-0 h-full w-full opacity-70 lg:w-[58%]" />
        {/* Lớp video WebM nền trong suốt — chỉ hiện khi đã có tệp trong public/video/ */}
        <HeroVideo className="opacity-90 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-2 via-deep-2/85 to-transparent lg:to-deep-2/10" />

        <Container className="relative">
          <div className="flex min-h-[calc(100svh-5rem)] max-w-2xl flex-col justify-center py-24 lg:py-32">
            <Eyebrow tone="light">{t.hero.eyebrow}</Eyebrow>
            <Rule className="rule-grow mt-5 w-16" />

            <h1 className="mt-8 text-[2.6rem] leading-[1.08] sm:text-[3.6rem] lg:text-[4.25rem]">
              <Words text={t.hero.title} />
              <br />
              <span className="text-gold-400">
                <Words text={t.hero.titleAccent} delay={260} />
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-[1.0625rem] leading-[1.85] text-on-deep-2/85">
              {t.hero.lead}
            </p>

            <div className="mt-11 flex flex-wrap gap-4">
              <ButtonLink href={localePath(locale, "contact")} variant="light">
                {t.hero.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={localePath(locale, "what-is-golden-visa")} variant="ghost">
                {t.hero.ctaSecondary}
              </ButtonLink>
            </div>

            <p className="mt-12 text-[0.6875rem] uppercase tracking-[0.22em] text-on-deep-2/45">
              {t.hero.note}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Dải số liệu ──────────────────────────────────────── */}
      <section className="border-b border-ink/10 bg-surface-2">
        <Container>
          <dl className="grid grid-cols-2 gap-px bg-deep/10 lg:grid-cols-4">
            {t.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="h-full bg-surface-2 px-6 py-10 text-center lg:px-8 lg:py-14">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-serif text-[2.75rem] leading-none text-gold-600 lg:text-[3.25rem]">
                      {stat.value}
                    </span>
                    <span className="mt-4 block text-[0.8125rem] leading-6 text-ink/65">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <p className="py-6 text-center text-xs leading-6 text-ink/45">{t.statsNote}</p>
        </Container>
      </section>

      {/* ── Golden Visa là gì ────────────────────────────────── */}
      <Section tone="base">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={t.whatIs.eyebrow} title={t.whatIs.title} />
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.85] text-ink/80">
                {t.whatIs.body}
              </p>
              <div className="mt-9">
                <TextLink href={localePath(locale, "what-is-golden-visa")}>
                  {t.whatIs.cta}
                </TextLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {dict.whatIs.advantages.slice(0, 6).map((adv) => (
                  <li key={adv} className="flex items-start gap-4 py-4">
                    <span className="mt-2.5 block h-1 w-4 shrink-0 bg-gold-500" aria-hidden="true" />
                    <span className="text-[0.9375rem] leading-7 text-ink/85">{adv}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-ink/45">
                +{dict.whatIs.advantages.length - 6} — {dict.whatIs.advantagesTitle}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Sáu dịch vụ ──────────────────────────────────────── */}
      <Section tone="raised">
        <Container>
          <SectionHeading
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            lead={t.services.lead}
          />

          <ul className="mt-16 grid gap-px border border-ink/10 bg-deep/10 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSlugs.map((slug, i) => {
              const service = dict.services.items[slug];
              return (
                <Reveal as="li" key={slug} delay={(i % 3) * 90} className="bg-surface-3">
                  <Link
                    href={localePath(locale, `services/${slug}`)}
                    className="lift group flex h-full flex-col transition-colors hover:bg-surface"
                  >
                    <Artwork
                      src={serviceArtSrc(slug)}
                      alt={service.name}
                      ratio="4 / 3"
                      className="border-0 border-b border-ink/10"
                    />
                    <span className="mt-8 px-8 font-serif text-sm text-gold-600 lg:px-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 px-8 text-[1.375rem] leading-snug lg:px-10">{service.name}</h3>
                    <p className="mt-4 flex-1 px-8 text-[0.9375rem] leading-7 text-ink/70 lg:px-10">
                      {service.tagline}
                    </p>
                    <span className="mb-8 mt-7 inline-flex items-center gap-2 px-8 text-[0.8125rem] font-medium text-gold-600 lg:mb-10 lg:px-10">
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

      {/* ── Quy trình ────────────────────────────────────────── */}
      <Section tone="deep">
        <Container>
          <SectionHeading
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            lead={t.process.lead}
            tone="light"
          />

          <ol className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
            {t.process.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 90}>
                <div className="border-t border-gold-500/35 pt-6">
                  <span className="font-serif text-[1.75rem] text-gold-500">{step.n}</span>
                  <h3 className="mt-4 text-[1.1875rem] leading-snug text-on-deep">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-7 text-on-deep-2/70">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Người sáng lập ───────────────────────────────────── */}
      <Section tone="alt">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
            <Reveal>
              <Artwork
                src={crestSrc}
                alt={t.founder.title}
                ratio="4 / 5"
                className="bg-deep"
              />
            </Reveal>

            <Reveal delay={120}>
              <Eyebrow>{t.founder.eyebrow}</Eyebrow>
              <Rule className="mt-4 mb-6" />
              <blockquote className="font-serif text-[1.625rem] leading-[1.45] text-ink sm:text-[2rem]">
                “{t.founder.quote}”
              </blockquote>
              <div className="mt-8">
                <p className="font-serif text-lg text-ink">{t.founder.title}</p>
                <p className="mt-1 text-sm text-gold-600">{t.founder.role}</p>
              </div>
              <p className="mt-6 max-w-xl text-[0.9375rem] leading-[1.85] text-ink/75">
                {t.founder.body}
              </p>
              <div className="mt-8">
                <TextLink href={localePath(locale, "about")}>{t.founder.cta}</TextLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Vì sao chọn chúng tôi ────────────────────────────── */}
      <Section tone="raised">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} />
              <p className="mt-6 text-[1.0625rem] leading-[1.85] text-ink/80">
                {t.whyUs.body}
              </p>
              <div className="mt-9">
                <TextLink href={localePath(locale, "why-us")}>{dict.common.learnMore}</TextLink>
              </div>
            </Reveal>

            <ul className="grid gap-px bg-deep/10 sm:grid-cols-2">
              {t.whyUs.points.map((point, i) => (
                <Reveal as="li" key={point.title} delay={i * 80} className="bg-surface-3">
                  <div className="h-full p-7">
                    <Seal className="h-7 w-7 text-gold-600" />
                    <h3 className="mt-5 text-[1.0625rem] leading-snug">{point.title}</h3>
                    <p className="mt-3 text-[0.875rem] leading-7 text-ink/70">{point.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Văn phòng ────────────────────────────────────────── */}
      <Section tone="base">
        <Container>
          <SectionHeading
            eyebrow={dict.offices.eyebrow}
            title={dict.offices.title}
            lead={dict.offices.lead}
          />

          <ul className="mt-14 grid gap-px border border-ink/10 bg-deep/10 sm:grid-cols-2 lg:grid-cols-4">
            {dict.offices.items.map((office, i) => (
              <Reveal as="li" key={office.city} delay={i * 80} className="bg-surface">
                <div className="flex h-full flex-col">
                  <Artwork
                    src={cityArtSrc(office.city)}
                    alt={`${office.city}, ${office.country}`}
                    ratio="4 / 3"
                    className="border-0 border-b border-ink/10"
                  />
                  <div className="flex flex-1 flex-col p-8">
                  <h3 className="text-[1.25rem]">{office.city}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold-600">
                    {office.country}
                  </p>
                  <p className="mt-5 flex-1 text-[0.875rem] leading-7 text-ink/70">
                    {office.confirmed ? office.address : dict.offices.pendingLabel}
                  </p>
                  <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-6 text-ink/50">
                    {office.role}
                  </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10">
            <TextLink href={localePath(locale, "offices")}>{dict.offices.title}</TextLink>
          </div>
        </Container>
      </Section>

      {/* ── Dải CTA ──────────────────────────────────────────── */}
      <section className="bg-deep py-20 text-on-deep md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <MeanderRule className="mx-auto h-5 w-40 text-gold-500/50" />
            <h2 className="mt-8 text-[2rem] leading-tight sm:text-[2.6rem]">{t.ctaBand.title}</h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.8] text-on-deep-2/80">{t.ctaBand.body}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink href={localePath(locale, "contact")} variant="light">
                {t.ctaBand.button}
              </ButtonLink>
              <a
                href={`tel:${site.headOffice.phoneHref}`}
                className="inline-flex items-center justify-center gap-2 border border-on-deep/30 px-7 py-3.5 text-sm font-medium tracking-wide transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                {site.headOffice.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
