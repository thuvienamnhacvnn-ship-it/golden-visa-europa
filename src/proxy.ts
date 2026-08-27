import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

/** Địa chỉ .vercel.app đưa về đây, để chỉ một tên miền lên công cụ tìm kiếm. */
const CANONICAL_HOST = "golden-visa-europa.com";

/**
 * Hai việc:
 *  1. Đưa truy cập qua địa chỉ .vercel.app của bản chính thức về tên miền
 *     thật bằng 301. Không đụng bản xem thử (tên có đuôi ngẫu nhiên) để còn
 *     kiểm tra được trước khi phát hành.
 *  2. Mọi URL đều phải có tiền tố ngôn ngữ. Thiếu thì chuyển 307 sang TIẾNG
 *     ANH — cố ý không đoán theo Accept-Language, khách hàng muốn ai vào
 *     cũng thấy bản tiếng Anh trước rồi tự chọn ngôn ngữ ở header.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const host = request.headers.get("host") ?? "";
  if (host === "golden-visa-europa.vercel.app" || host === "golden-visa.vercel.app") {
    const canonical = request.nextUrl.clone();
    canonical.host = CANONICAL_HOST;
    canonical.protocol = "https";
    canonical.port = "";
    return NextResponse.redirect(canonical, 301);
  }

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
