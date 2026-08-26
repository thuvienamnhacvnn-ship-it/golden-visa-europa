import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Assistant } from "@/components/Assistant";
import { themeInitScript } from "@/components/ThemeToggle";
import { getDictionary, isLocale, locales, type Locale } from "@/i18n";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/jsonld";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

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
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${dict.footer.tagline}`,
      template: `%s — ${site.name}`,
    },
    description: dict.home.hero.lead,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang,
      title: `${site.name} — ${dict.footer.tagline}`,
      description: dict.home.hero.lead,
      url: `/${lang}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={dict.meta.htmlLang}
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Chạy trước khi trang vẽ, nếu không sẽ nháy trắng một nhịp rồi mới sang tối */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-deep focus:px-5 focus:py-3 focus:text-sm focus:text-on-deep"
        >
          {dict.common.skipToContent}
        </a>

        <Header
          locale={locale}
          t={{
            nav: dict.nav,
            bookConsultation: dict.common.bookConsultation,
            language: dict.common.language,
            menu: dict.common.menu,
            close: dict.common.close,
            theme: dict.common.theme,
          }}
        />
        {/* -mt-20 cho phần nội dung chui lên dưới header trong suốt.
            Trang nào cũng mở đầu bằng một mảng tối (hero hoặc PageHero)
            nên phần bị che luôn là nền tối, không lộ nền kem. */}
        <main id="main" className="-mt-20 flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />

        <Assistant
          locale={locale}
          t={dict.assistant}
          contactLabel={dict.common.getInTouch}
        />
        <CookieBanner locale={locale} t={{ ...dict.cookie, link: dict.legal.privacy.title }} />

        <script
          type="application/ld+json"
          // Dữ liệu do chính chúng ta tạo, không phải input người dùng.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale, dict)) }}
        />
      </body>
    </html>
  );
}
