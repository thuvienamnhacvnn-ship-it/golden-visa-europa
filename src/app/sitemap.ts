import type { MetadataRoute } from "next";
import { locales, localePath, serviceSlugs } from "@/i18n";
import { site } from "@/lib/site";

const staticPaths = [
  "",
  "what-is-golden-visa",
  "services",
  "about",
  "why-us",
  "offices",
  "contact",
  "legal/privacy",
  "legal/terms",
  "legal/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...serviceSlugs.map((s) => `services/${s}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}${localePath(locale, path)}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}${localePath(l, path)}`]),
        ),
      },
    })),
  );
}
