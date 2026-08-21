import { en, type Dictionary, type ServiceSlug, serviceSlugs } from "./en";
import { tr } from "./tr";
import { vi } from "./vi";

export const locales = ["en", "tr", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en, tr, vi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Tiền tố mọi đường dẫn nội bộ bằng ngôn ngữ đang xem. */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

export type { Dictionary, ServiceSlug };
export { serviceSlugs };
