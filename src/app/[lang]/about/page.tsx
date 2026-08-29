import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, PlaceholderFrame, Eyebrow, Rule, Words } from "@/components/ui";
import { Artwork } from "@/components/Artwork";
import { crestSrc } from "@/lib/art";
import { Reveal } from "@/components/Reveal";
import { Seal } from "@/components/Ornament";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { teamPhotos, teamGroupPhoto } from "@/lib/site";
import { activityShots } from "@/lib/gallery";

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
      {/* Banner: chữ bên trái, ảnh chụp chung ba người bên phải.
          PageHero rỗng dùng trước đây để lại một mảng navy trống hoác, không
          dính gì tới phần nội dung ngay bên dưới. Ảnh dọc 3/4 nên đặt thành
          cột riêng chứ không làm nền tràn — làm nền thì cắt mất mặt người. */}
      <section className="grain relative overflow-hidden bg-deep pb-16 pt-28 text-on-deep md:pb-20 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 79px, #C8A44D 79px 80px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(70% 120% at 78% 8%, color-mix(in srgb, #C8A44D 18%, transparent), transparent 62%)",
          }}
        />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold-400/35 px-3.5 py-1.5 text-gold-400">
                <span className="inline-block h-1 w-1 rounded-full bg-current" />
                {t.eyebrow}
              </span>
              <h1 className="display mt-7 text-[2.6rem] leading-[1.06] sm:text-[3.4rem] lg:text-[4rem]">
                <Words text={t.title} />
              </h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.85] text-on-deep-2/85">
                {t.lead}
              </p>
            </div>

            {/* KHÔNG bọc Reveal: khối này nằm ngay trên màn hình đầu tiên, bọc
                vào thì phải cuộn mới hiện và người xem mở trang ra chỉ thấy
                mảng navy trống. */}
            <div>
              <figure className="m-0">
                <div className="media zoom-wrap rounded-2xl border border-gold-500/30 shadow-[0_36px_80px_-40px_rgba(0,0,0,0.85)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={teamGroupPhoto}
                    alt={t.groupAlt}
                    className="w-full object-cover"
                    style={{ aspectRatio: "4 / 3" }}
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <figcaption className="mt-4 text-[0.75rem] leading-6 text-on-deep-2/60">
                  {t.groupAlt}
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="base">
        <Container>
          <Reveal>
            <div className="prose-lux max-w-3xl text-[1.0625rem] text-ink/85">
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
              {/* Đã có ảnh thật của ông Nikolaos nên dùng ảnh, không dùng huy
                  hiệu làm ảnh tạm nữa. Huy hiệu vẫn giữ ở public/art/crest.svg
                  cho những chỗ cần một hình đại diện thương hiệu. */}
              <Artwork
                src={teamPhotos[t.founder.name.split(",")[0].trim()] ?? crestSrc}
                alt={t.founder.name}
                ratio="4 / 5"
                className="bg-deep"
              />
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

          {/* Ảnh tràn hết bề ngang thẻ, chữ nằm trong phần đệm bên dưới. Để ảnh
              lọt thỏm giữa lớp đệm như bản trước thì nhìn như ảnh dán tạm.
              Ai chưa có ảnh thì tự rơi về khung chờ, không phải sửa gì thêm. */}
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.team.map((member, i) => (
              <Reveal as="li" key={member.name} delay={i * 80}>
                <article className="card card-hover card-sweep flex h-full flex-col overflow-hidden">
                  {teamPhotos[member.name] ? (
                    <figure className="zoom-wrap m-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={teamPhotos[member.name]}
                        alt={member.name}
                        className="w-full object-cover"
                        style={{ aspectRatio: "4 / 5" }}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  ) : (
                    // Không bọc thêm lớp đệm: bọc thì khung chờ nhỏ hơn ảnh
                    // thật, ba thẻ cao thấp lệch nhau.
                    <PlaceholderFrame label={dict.common.needsClientInput} ratio="4 / 5" />
                  )}

                  <div className="flex flex-1 flex-col p-7">
                    <p className="eyebrow text-gold-600">{member.role}</p>
                    <h3 className="mt-3 text-[1.25rem] leading-snug">{member.name}</h3>
                    <p className="mt-1 text-[0.8125rem] text-ink/50">{member.honorific}</p>
                    <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-ink/10 pt-4">
                      {member.credentials.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-3 text-[0.875rem] leading-6 text-ink/70"
                        >
                          <span
                            className="mt-2 block h-1 w-3 shrink-0 bg-gold-500"
                            aria-hidden="true"
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
          {/* Chỉ nhắc chờ ảnh khi còn người thiếu ảnh; hiện đủ cả ba nên ẩn. */}
          {t.team.some((m) => !teamPhotos[m.name]) ? (
            <p className="mt-6 text-xs leading-6 text-ink/45">{t.placeholderTeam}</p>
          ) : null}
        </Container>
      </Section>

      {/* Ảnh hoạt động: cột dòng chảy để mỗi ảnh giữ nguyên tỉ lệ.
          KHÔNG cắt về một khuôn chung — đây là ảnh chụp nhóm, cắt cứng là mất
          đầu người. break-inside-avoid để một ảnh không bị xẻ đôi sang cột sau. */}
      <Section tone="base">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.galleryTitle}</Eyebrow>
            <Rule className="mt-4 mb-6" />
            <p className="text-[1.0625rem] leading-[1.8] text-ink/80">{t.galleryLead}</p>
          </div>

          <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-5">
            {activityShots.map((shot, i) => (
              <figure key={shot.src} className="zoom-wrap media m-0 mb-4 break-inside-avoid lg:mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={`${t.galleryAlt} — ${i + 1}`}
                  className="w-full"
                  style={{ aspectRatio: String(shot.ratio) }}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
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
