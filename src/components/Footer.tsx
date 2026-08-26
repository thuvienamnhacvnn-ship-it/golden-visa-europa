import Link from "next/link";
import { Logo } from "./Logo";
import { MeanderRule } from "./Ornament";
import { Social } from "./Social";
import { localePath, serviceSlugs, type Dictionary, type Locale } from "@/i18n";
import { site } from "@/lib/site";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = 2026;

  const companyLinks = [
    { href: localePath(locale, "about"), label: dict.nav.about },
    { href: localePath(locale, "why-us"), label: dict.nav.whyUs },
    { href: localePath(locale, "offices"), label: dict.nav.offices },
    { href: localePath(locale, "what-is-golden-visa"), label: dict.nav.whatIs },
  ];

  const legalLinks = [
    { href: localePath(locale, "legal/privacy"), label: dict.legal.privacy.title },
    { href: localePath(locale, "legal/terms"), label: dict.legal.terms.title },
    { href: localePath(locale, "legal/disclaimer"), label: dict.legal.disclaimer.title },
  ];

  return (
    <footer className="bg-deep-2 text-on-deep">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-7 text-on-deep-2/70">
              {dict.footer.tagline}
            </p>
            <Social tone="light" className="mt-7" />
            <MeanderRule className="mt-8 h-4 w-36 text-gold-500/40" />
          </div>

          <FooterCol title={dict.footer.company}>
            {companyLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={dict.footer.servicesCol}>
            {serviceSlugs.map((slug) => (
              <FooterLink key={slug} href={localePath(locale, `services/${slug}`)}>
                {dict.services.items[slug].name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={dict.footer.contactCol}>
            <li className="text-sm leading-7 text-on-deep-2/70">
              {site.headOffice.street}
              <br />
              {site.headOffice.city} {site.headOffice.postalCode}
              <br />
              {site.headOffice.country}
            </li>
            <li>
              <a
                href={`tel:${site.headOffice.phoneHref}`}
                className="text-sm text-on-deep-2/70 transition-colors hover:text-gold-400"
              >
                {site.headOffice.phone}
              </a>
            </li>
            <li className="pt-2">
              <Link
                href={localePath(locale, "contact")}
                className="inline-flex border border-on-deep/25 px-5 py-2.5 text-xs font-medium tracking-wide transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                {dict.common.getInTouch}
              </Link>
            </li>
          </FooterCol>
        </div>

        <div className="mt-14 border-t border-on-deep/10 pt-8">
          <p className="max-w-3xl text-xs leading-6 text-on-deep-2/45">
            {dict.footer.disclaimerShort}
          </p>
          <div className="mt-6 flex flex-col gap-4 text-xs text-on-deep-2/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. {dict.footer.rights}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-gold-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow font-sans text-gold-500">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-on-deep-2/70 transition-colors hover:text-gold-400"
      >
        {children}
      </Link>
    </li>
  );
}
