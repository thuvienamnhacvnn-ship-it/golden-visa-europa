"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "gv-theme";

/**
 * Đặt trong <head> để chạy TRƯỚC khi trang vẽ — nếu không sẽ nháy một nhịp.
 *
 * MẶC ĐỊNH LUÔN LÀ SÁNG. Cố ý không đọc cài đặt hệ điều hành: thiết kế của site
 * là bản sáng, người dùng Windows để chế độ tối mà mở web ra thấy toàn màu tối
 * sẽ tưởng vào nhầm trang. Chỉ chuyển tối khi tự bấm nút.
 */
export const themeInitScript = `(function(){try{
var t=localStorage.getItem("${KEY}");
document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");
}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    setTheme(current);
    setReady(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* trình duyệt chặn lưu trữ — vẫn đổi được cho phiên này */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === "dark"}
      title={label}
      className="gold-icon relative flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/35 transition-colors hover:border-gold-400"
    >
      {/* Hai biểu tượng chồng nhau, đổi bằng xoay + mờ dần */}
      <span
        className={`absolute transition-all duration-300 ${
          ready && theme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          ready && theme === "dark" ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
