import { site } from "./site";
import { localePath, type Dictionary, type Locale } from "@/i18n";

export function organizationJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: `${site.url}${localePath(locale)}`,
    description: dict.footer.tagline,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.headOffice.street,
      addressLocality: site.headOffice.city,
      postalCode: site.headOffice.postalCode,
      addressCountry: site.headOffice.countryCode,
    },
    telephone: site.headOffice.phone,
    areaServed: ["GR", "VN", "TR"],
    availableLanguage: ["en", "tr", "vi"],
    knowsLanguage: ["en", "tr", "vi"],
    serviceType: Object.values(dict.services.items).map((s) => s.name),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${localePath(locale, item.path)}`,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
