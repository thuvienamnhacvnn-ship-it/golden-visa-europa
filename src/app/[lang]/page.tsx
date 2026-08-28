import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Section, SectionHeading, Eyebrow, Rule, ButtonLink, TextLink } from "@/components/ui";
import { Artwork } from "@/components/Artwork";
import { serviceArtSrc, cityArtSrc, crestSrc } from "@/lib/art";
import { MeanderRule, Seal } from "@/components/Ornament";
import { HeroVideo } from "@/components/HeroMedia";
import { pick } from "@/lib/media";
import { GoldTitle } from "@/components/GoldTitle";
import { Sparks } from "@/components/Sparks";
import { properties } from "@/lib/properties";
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
  const hero = pick("hero-home");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-deep-2 text-on-deep">
        {/* Ảnh bìa khách gửi — chữ in sẵn đã được xoá, chỉ còn phần hình */}
        {/* Dùng ảnh tĩnh. Video vẫn nằm ở public/video/banner.mp4 nếu cần bật lại. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
        {/* Lớp video WebM nền trong suốt — chỉ hiện khi đã có tệp trong public/video/ */}
        <HeroVideo className="opacity-90 mix-blend-screen" />
        {/* Tối dần từ trái để chữ vàng luôn đọc được */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,10,30,0.78) 0%, rgba(0,10,30,0.62) 26%, rgba(0,10,30,0.34) 46%, rgba(0,10,30,0.08) 64%, rgba(0,10,30,0) 78%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          aria-hidden="true"
          style={{ background: "linear-gradient(180deg, transparent, var(--surface))" }}
        />

        <Container className="relative">
          <div className="flex min-h-[100svh] max-w-2xl flex-col items-center justify-center pb-24 pt-28 text-center lg:items-start lg:pb-32 lg:pt-40 lg:text-left">
            <p className="gold-soft text-[0.85rem] font-semibold uppercase tracking-[0.32em] sm:text-[0.95rem]">
              {t.hero.eyebrow}
            </p>

            <h1 className="display mt-3.5 leading-[0.92]">
              {/* Dòng vàng lớn — nổi khối, rê chuột thì loé ánh sao */}
              <GoldTitle
                text={t.hero.titleAccent}
                className="tracking-[0.01em]"
              />
              <span className="mt-3 block text-[1.35rem] font-normal tracking-[0.04em] text-on-deep/85 sm:text-[1.8rem] lg:text-[2.05rem]">
                <Words text={t.hero.title} delay={200} />
              </span>
            </h1>

            <div className="gold-divider mt-6 w-full max-w-xs" aria-hidden="true">
              <span className="gold-divider__gem" />
            </div>

            {/* Điện thoại: mt-auto nuốt hết chỗ trống còn lại nên cụm nút và
                dòng ghi chú tụt hẳn xuống đáy banner, nằm ngay trên thanh menu.
                Từ breakpoint lg trở lên bỏ mt-auto để bố cục ngang giữ nguyên. */}
            <div className="mt-auto w-full lg:mt-0">
              {/* Hai nút nằm ngang và tự co theo chữ. flex-wrap để ngôn ngữ có
                  nhãn dài (Anh, Hy Lạp, Latvia) xuống dòng thay vì tràn ra
                  ngoài màn hình. */}
              <div className="flex w-full flex-wrap items-center justify-center gap-3 pt-10 sm:w-auto sm:gap-3.5 lg:justify-start lg:pt-7">
                <ButtonLink href={localePath(locale, "contact")} variant="light" size="sm">
                  {t.hero.ctaPrimary}
                </ButtonLink>
                <ButtonLink
                  href={localePath(locale, "what-is-golden-visa")}
                  variant="ghost"
                  size="sm"
                >
                  {t.hero.ctaSecondary}
                </ButtonLink>
              </div>

              <p className="mt-6 text-[0.625rem] uppercase tracking-[0.22em] text-on-deep-2/45 sm:mt-9">
                {t.hero.note}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Ba mức đầu tư: nối liền mạch từ hero, thay cho bảng số liệu cũ ── */}
      <section className="grain relative overflow-hidden bg-deep-2 pb-24 pt-4 text-on-deep md:pb-28">
        <Container className="relative">
          <div className="flex flex-col gap-4 border-t border-gold-500/20 pt-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold-400/35 px-3.5 py-1.5 text-gold-400">
                <span className="inline-block h-1 w-1 rounded-full bg-current" />
                {dict.whatIs.eyebrow}
              </span>
              <h2 className="display mt-6 text-[2rem] text-on-deep sm:text-[2.6rem]">
                {dict.whatIs.thresholds.title}
              </h2>
            </div>
            <TextLink href={localePath(locale, "what-is-golden-visa")} tone="light">
              {t.whatIs.cta}
            </TextLink>
          </div>

          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {dict.whatIs.thresholds.tiers.map((tier, i) => (
              <Reveal as="li" key={tier.amount} delay={i * 110}>
                <div className="gold-box relative h-full p-8 lg:p-9">
                  <Sparks count={7} seed={i * 5} />
                  <p className="gold-soft relative z-10 font-serif text-[2.4rem] leading-none lg:text-[2.9rem]">
                    {tier.amount}
                  </p>
                  <p className="relative z-10 mt-6 border-t border-gold-500/20 pt-5 text-[0.9375rem] font-medium leading-7 text-on-deep">
                    {tier.where}
                  </p>
                  <p className="relative z-10 mt-3 text-[0.8125rem] leading-6 text-on-deep-2/65">
                    {tier.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <p className="mt-10 max-w-3xl text-xs leading-6 text-on-deep-2/45">
            {dict.whatIs.thresholds.sourceNote}{" "}
            <span className="text-gold-400">{dict.whatIs.thresholds.verified}</span>
          </p>
        </Container>
      </section>

      {/* ── Golden Visa là gì ────────────────────────────────── */}
      <Section tone="base">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_0.92fr] lg:items-start lg:gap-24">
            <Reveal>
              <SectionHeading eyebrow={t.whatIs.eyebrow} title={t.whatIs.title} />
              <p className="mt-8 max-w-xl text-[1.125rem] leading-[1.85] text-ink/75">
                {t.whatIs.body}
              </p>
              <div className="mt-10">
                <TextLink href={localePath(locale, "what-is-golden-visa")}>
                  {t.whatIs.cta}
                </TextLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card card-sweep relative p-8 lg:p-10">
                <span
                  className="numeral pointer-events-none absolute -top-6 right-6 text-[6rem] lg:text-[7.5rem]"
                  aria-hidden="true"
                >
                  12
                </span>
                <h3 className="relative text-[1.25rem]">{dict.whatIs.advantagesTitle}</h3>
                <ul className="relative mt-7 flex flex-col gap-4">
                  {dict.whatIs.advantages.slice(0, 6).map((adv) => (
                    <li key={adv} className="flex items-start gap-3.5">
                      <span
                        className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] leading-7 text-ink/80">{adv}</span>
                    </li>
                  ))}
                </ul>
                <p className="relative mt-7 border-t border-ink/10 pt-5 text-xs text-ink/45">
                  +{dict.whatIs.advantages.length - 6}
                </p>
              </div>
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

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSlugs.map((slug, i) => {
              const service = dict.services.items[slug];
              return (
                <Reveal as="li" key={slug} delay={(i % 3) * 90}>
                  <Link
                    href={localePath(locale, `services/${slug}`)}
                    className="card card-hover card-sweep zoom-wrap group flex h-full flex-col"
                  >
                    <Artwork
                      src={serviceArtSrc(slug)}
                      alt={service.name}
                      ratio="4 / 3"
                      className="!rounded-none"
                    />
                    <div className="flex flex-1 flex-col p-7 lg:p-9">
                      <span className="font-serif text-sm text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 text-[1.3rem] leading-snug">{service.name}</h3>
                      <p className="mt-3.5 flex-1 text-[0.9375rem] leading-7 text-ink/65">
                        {service.tagline}
                      </p>
                      <span className="mt-7 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-gold-600">
                        {dict.common.learnMore}
                        <svg
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <path d="M1 7h11M8 3l4 4-4 4" strokeLinecap="square" />
                        </svg>
                      </span>
                    </div>
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

          <div className="relative mt-20">
            {/* Đường nối chạy suốt — thay cho 5 khối rời rạc */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-3.5 hidden h-px lg:block"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, #C8A44D 55%, transparent) 10%, color-mix(in srgb, #C8A44D 55%, transparent) 90%, transparent)",
              }}
            />
            <ol className="grid gap-x-8 gap-y-12 lg:grid-cols-5">
              {t.process.steps.map((step, i) => (
                <Reveal as="li" key={step.n} delay={i * 90}>
                  <span
                    className="relative z-10 mb-7 flex h-7 w-7 items-center justify-center rounded-full border border-gold-500/50 bg-deep text-[0.625rem] font-semibold text-gold-400"
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  <h3 className="text-[1.1875rem] leading-snug text-on-deep">{step.title}</h3>
                  <p className="mt-3 text-[0.875rem] leading-7 text-on-deep-2/65">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ── Người sáng lập ───────────────────────────────────── */}
      <Section tone="alt">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[0.68fr_1fr] lg:gap-24">
            <Reveal>
              <Artwork
                src={crestSrc}
                alt={t.founder.title}
                ratio="4 / 5"
                className="bg-deep shadow-[0_30px_70px_-40px_rgba(7,27,48,0.55)]"
              />
            </Reveal>

            <Reveal delay={120}>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-3.5 py-1.5 text-gold-600">
                <span className="inline-block h-1 w-1 rounded-full bg-current" />
                {t.founder.eyebrow}
              </span>
              <div className="mt-7" />
              <blockquote className="display text-[2rem] leading-[1.25] text-ink sm:text-[2.7rem]">
                <span className="gold-text">“</span>
                {t.founder.quote}
                <span className="gold-text">”</span>
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

            <ul className="grid gap-5 sm:grid-cols-2">
              {t.whyUs.points.map((point, i) => (
                <Reveal as="li" key={point.title} delay={i * 80}>
                  <div className="card card-hover card-sweep h-full p-7 lg:p-8">
                    <Seal className="gold-icon h-8 w-8" />
                    <h3 className="mt-6 text-[1.0625rem] leading-snug">{point.title}</h3>
                    <p className="mt-3 text-[0.875rem] leading-7 text-ink/65">{point.body}</p>
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

          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.offices.items.map((office, i) => (
              <Reveal as="li" key={office.slug} delay={i * 80}>
                <div className="card card-hover card-sweep zoom-wrap flex h-full flex-col">
                  <Artwork
                    src={cityArtSrc(office.slug)}
                    alt={`${office.city}, ${office.country}`}
                    ratio="4 / 3"
                    className="!rounded-none"
                  />
                  <div className="flex flex-1 flex-col p-7">
                  <h3 className="display text-[1.6rem]">{office.city}</h3>
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

      {/* ── Bất động sản: 4 căn thật từ hồ sơ khách gửi ── */}
      <Section tone="raised">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={dict.properties.eyebrow}
              title={dict.properties.title}
              lead={dict.properties.lead}
            />
            <ButtonLink href={localePath(locale, "properties")} variant="outline" className="shrink-0">
              {dict.properties.linkLabel}
            </ButtonLink>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((prop, i) => (
              <Reveal as="li" key={prop.id} delay={(i % 4) * 80}>
                <article className="card card-hover card-sweep zoom-wrap flex h-full flex-col">
                  <Artwork
                    src={prop.photo}
                    alt={dict.properties.items[prop.id].name}
                    ratio="4 / 3"
                    className="!rounded-none"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-gold-600">{dict.properties.items[prop.id].name}</p>
                    <p className="display mt-3 text-[1.75rem] text-ink">{prop.price}</p>
                    <dl className="mt-5 flex-1 space-y-2 border-t border-ink/10 pt-4 text-[0.8125rem] text-ink/70">
                      <div className="flex justify-between gap-3">
                        <dt>{dict.properties.rentLabel}</dt>
                        <dd className="font-medium text-ink">{prop.rent}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt>{dict.properties.bedsLabel}</dt>
                        <dd className="font-medium text-ink">{prop.beds}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt>{dict.properties.bathsLabel}</dt>
                        <dd className="font-medium text-ink">{prop.baths}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt>{dict.properties.sizeLabel}</dt>
                        <dd className="italic text-ink/45">
                          {prop.size ?? dict.properties.sizePending}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h3 className="text-[1.125rem]">{dict.properties.commitTitle}</h3>
              <ul className="mt-4 space-y-2.5">
                {dict.properties.commitments.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[0.9375rem] leading-7 text-ink/75">
                    <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs leading-6 text-ink/50">{dict.properties.note}</p>
          </div>
        </Container>
      </Section>

      {/* ── Hỏi đáp: dạng gấp mở, một cột nên không bao giờ lẻ hàng ── */}
      <Section tone="alt">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow={dict.whatIs.eyebrow}
              title={dict.whatIs.faq.title}
              align="center"
            />
            <div className="mt-12 border-t border-ink/10">
              {dict.whatIs.faq.items.slice(0, 5).map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <div className="text-[0.9375rem] leading-[1.85] text-ink/70">{item.a}</div>
                </details>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="max-w-xl text-xs leading-6 text-ink/45">{dict.whatIs.disclaimer}</p>
              <TextLink href={localePath(locale, "what-is-golden-visa")}>
                {dict.whatIs.rules.title}
              </TextLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Dải CTA ──────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-deep py-24 text-on-deep md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <MeanderRule className="mx-auto h-5 w-40 text-gold-500/50" />
            <h2 className="display mt-8 text-[2.4rem] sm:text-[3.2rem]">{t.ctaBand.title}</h2>
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
