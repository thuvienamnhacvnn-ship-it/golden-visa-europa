import Link from "next/link";
import { Logo } from "./Logo";
import { Social } from "./Social";
import { OfficeCard } from "./OfficeCard";
import { localePath, serviceSlugs, type Dictionary, type Locale } from "@/i18n";
import { site } from "@/lib/site";

/**
 * Footer gọn: một hàng bốn cột cân nhau, một dải liên hệ, một dòng chân trang.
 * Cột dịch vụ chỉ lấy 4 mục để bốn cột dài ngang nhau — lấy đủ 6 mục thì
 * cột đó dài gấp rưỡi các cột còn lại, nhìn lệch hẳn.
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = 2026;

  const cols = [
    {
      title: dict.footer.company,
      links: [
        { href: localePath(locale, "about"), label: dict.nav.about },
        { href: localePath(locale, "why-us"), label: dict.nav.whyUs },
        { href: localePath(locale, "properties"), label: dict.nav.properties },
        { href: localePath(locale, "contact"), label: dict.nav.contact },
      ],
    },
    {
      title: dict.footer.servicesCol,
      links: serviceSlugs.slice(0, 4).map((slug) => ({
        href: localePath(locale, `services/${slug}`),
        label: dict.services.items[slug].name,
      })),
    },
    {
      title: dict.footer.legalCol,
      links: [
        { href: localePath(locale, "what-is-golden-visa"), label: dict.nav.whatIs },
        { href: localePath(locale, "latvia"), label: dict.nav.latvia },
        { href: localePath(locale, "legal/privacy"), label: dict.legal.privacy.title },
        { href: localePath(locale, "legal/terms"), label: dict.legal.terms.title },
        { href: localePath(locale, "legal/disclaimer"), label: dict.legal.disclaimer.title },
      ],
    },
  ];

  return (
    <footer className="grain relative overflow-hidden bg-deep-2 text-on-deep">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-[26ch] text-[0.8125rem] leading-6 text-on-deep-2/60">
              {dict.footer.tagline}
            </p>
            <Social tone="light" className="mt-6" />
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow font-sans text-gold-500">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="underline-sweep text-[0.8125rem] leading-6 text-on-deep-2/65 transition-colors hover:text-gold-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Năm văn phòng, mỗi thẻ có bản đồ nhỏ bấm ra Google Maps.
            Ba cột ở khổ rộng: 5 mục chia 3 thì hàng cuối còn 2, nhìn được.
            Hai cột ở khổ vừa thì hàng cuối trơ một mục, nên cho mục cuối
            chiếm cả hàng đúng ở khoảng đó. */}
        <div className="mt-12 grid gap-6 border-t border-on-deep/10 pt-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {site.offices.map((o, i) => (
            <div
              key={o.id}
              className={
                i === site.offices.length - 1 && site.offices.length % 2 === 1
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }
            >
              <OfficeCard office={o} directionsLabel={dict.contact.directions} />
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-on-deep/10 pt-5">
          <Link
            href={localePath(locale, "contact")}
            className="btn inline-flex border border-gold-500/45 px-5 py-2 text-[0.75rem] font-medium text-gold-400 hover:border-gold-400 hover:bg-gold-500/10"
          >
            {dict.common.bookConsultation}
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-[0.6875rem] leading-5 text-on-deep-2/40 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <p>
            © {year} {site.legalName}. {dict.footer.rights}
          </p>
          <p className="max-w-2xl lg:text-right">{dict.footer.disclaimerShort}</p>
        </div>
      </div>
    </footer>
  );
}
