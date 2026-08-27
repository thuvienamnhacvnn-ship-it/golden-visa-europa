import { en, type Dictionary, type ServiceSlug, serviceSlugs } from "./en";
import { el } from "./el";
import { lv } from "./lv";
import { tr } from "./tr";
import { vi } from "./vi";

// Thứ tự này quyết định thứ tự trong danh sách chọn ngôn ngữ ở header.
export const locales = ["en", "vi", "el", "lv", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Tên ngôn ngữ viết bằng chính ngôn ngữ đó — dùng cho danh sách chọn. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
  el: "Ελληνικά",
  lv: "Latviešu",
  tr: "Türkçe",
};

const dictionaries: Record<Locale, Dictionary> = { en, vi, el, lv, tr };

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
