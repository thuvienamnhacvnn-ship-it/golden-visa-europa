import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Mọi URL đều phải có tiền tố ngôn ngữ. Đường dẫn thiếu tiền tố sẽ được
 * chuyển hướng 307 sang ngôn ngữ hợp nhất theo Accept-Language.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
