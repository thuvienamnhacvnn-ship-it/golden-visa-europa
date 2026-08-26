import Link from "next/link";
import { Container } from "@/components/ui";
import { en } from "@/i18n/en";

// not-found không nhận params nên dùng bản tiếng Anh; middleware đã bảo đảm
// mọi URL hợp lệ đều có tiền tố ngôn ngữ.
export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-serif text-[4rem] leading-none text-gold-500">404</span>
        <h1 className="mt-6 text-[2rem] leading-tight sm:text-[2.5rem]">{en.notFound.title}</h1>
        <p className="mt-4 max-w-md text-[1rem] leading-7 text-ink/70">{en.notFound.body}</p>
        <Link
          href="/en"
          className="mt-10 inline-flex bg-deep px-7 py-3.5 text-sm font-medium tracking-wide text-on-deep transition-colors hover:bg-deep-3"
        >
          {en.notFound.cta}
        </Link>
      </div>
    </Container>
  );
}
