# Golden Visa — N. Kakkos Estate

Website 3 ngôn ngữ (EN / TR / VI) cho dịch vụ thẻ vàng châu Âu, tư vấn và quản lý
bất động sản tại Hy Lạp.

Brief gốc: `E:\Works\itw\Golden.PDF` — prompt build: `E:\Works\itw\GoldenVisa-website-prompt.md`

## Chạy

```bash
npm run dev     # http://localhost:3015
npm run build   # sinh 52 trang tĩnh
npm run start   # chạy bản build, cổng 3015
```

Cổng 3015 chọn để không đụng các dự án khác trên máy (3000, 3002, 3005–3007, 3012, 3020).

## Cấu trúc

```
src/
  i18n/
    en.ts          bản chuẩn — mọi khoá phải có đủ trong tr.ts và vi.ts
    tr.ts vi.ts    bản dịch, kiểu ràng buộc theo Dictionary nên thiếu khoá là lỗi biên dịch
    index.ts       locales, getDictionary, localePath
  app/
    [lang]/        layout gốc (đặt <html lang>), 8 trang + 6 trang dịch vụ + 3 trang pháp lý
    api/enquiry/   nhận form liên hệ
  components/      Header, Footer, form, hoạ tiết SVG
  lib/site.ts      thông tin công ty — chỗ duy nhất chứa dữ liệu khách hàng
  middleware.ts    URL thiếu tiền tố ngôn ngữ → 307 sang ngôn ngữ hợp theo Accept-Language
```

## Thiết kế

Navy `#0E2A47` + kem `#FAF9F6` + vàng đồng `#C8A44D`. Playfair Display cho tiêu đề,
Inter cho nội dung (đã tải sẵn về `.next/static/media`, không gọi Google Fonts lúc chạy).

Vàng chỉ dùng cho đường kẻ, số liệu, icon và hover — không đổ nền vàng mảng lớn.

## Hình ảnh

Đã kiểm tra hai nguồn khách đưa: **PDF chỉ chứa đúng một ảnh là logo Gmail** (vì file là
bản in email), **fanpage Facebook thì bị tường đăng nhập** nên không lấy được ảnh/video nào.
Máy cũng không có model sinh ảnh (`~/photo-design` chỉ là công cụ *chỉnh* ảnh).

Nên toàn bộ tranh trên site là **hình gốc tự vẽ bằng code**:

```bash
node scripts/make-art.mjs      # ghi 11 tệp SVG vào public/art/ (~60 KB tất cả)
```

- 4 tranh thành phố cho 4 văn phòng: Athens (đền Parthenon + cây bách), Thessaloniki
  (Tháp Trắng + dãy nhà vòm ven biển), Việt Nam (skyline + thuyền buồm + nón lá),
  Thổ Nhĩ Kỳ (mái vòm + minaret).
- 6 tranh cho 6 dịch vụ: hộ chiếu + vòng sao EU, ngân hàng + thẻ, biểu đồ tăng trưởng,
  bản đồ + kính lúp, nhà + con lăn sơn và bay trát, toà nhà + chìa khoá.
- 1 huy hiệu chữ lồng **NK** dùng thay ảnh chân dung.

Bẫy đã gặp khi vẽ: gradient để mặc định `objectBoundingBox` thì **mọi nét thẳng đứng
hoặc nằm ngang đơn lẻ đều không được vẽ** (bbox rộng hoặc cao bằng 0) — mất thân chìa khoá,
thân minaret, đường chân đất. Phải dùng `gradientUnits="userSpaceOnUse"`.

Ảnh **người thật** thì vẫn để khung nét đứt "đang chờ khách hàng cung cấp": không bịa mặt
người có thật, không dùng ảnh stock, không phủ mờ.

## Theme sáng / tối

Token ngữ nghĩa trong `globals.css`: `surface / surface-2 / surface-3 / ink / line` cho mặt phẳng
nội dung, và `deep / deep-2 / deep-3 / on-deep / on-deep-2` cho các mảng tối cố định (hero, dải CTA,
footer) — mảng tối phải tối ở CẢ hai theme nên tách riêng, không dùng chung với `surface`.

Theme chọn theo `data-theme` trên `<html>`; chưa chọn thì theo hệ điều hành. Script trong `<head>`
(`themeInitScript`) chạy trước khi trang vẽ để không nháy trắng. Lựa chọn lưu ở localStorage.

**Đừng dùng lại `bg-cream-*`, `text-navy-*`** — chúng không lật theme.

## Ảnh và banner

Sổ đăng ký duy nhất: `src/lib/media.ts`. Thả tệp đúng tên vào `public/photos/` rồi build là ảnh
tự thay tranh SVG. File yêu cầu gửi khách **sinh ra từ chính sổ đó**:

```bash
node scripts/make-art.mjs         # 11 tranh + 7 banner SVG -> public/art/
node scripts/make-image-brief.mjs # -> E:WorksitwGolden-anh-khach-guiYEU-CAU-ANH.md
```

Banner là **3:1 (2400×800)** — rộng và thấp — và chừa 1/3 bên trái tối cho chữ tiêu đề.

Video WebM nền trong suốt đè lên hero: `public/video/hero-overlay.webm`. Chưa có tệp thì
component không vẽ gì. Xuất **bắt buộc** `-auto-alt-ref 0`, thiếu là mất kênh alpha.

## Trợ lý AI 24/7

`POST /api/assistant` — có `ANTHROPIC_API_KEY` thì gọi **claude-opus-5** (streaming, adaptive
thinking, effort low, prompt caching phần tư liệu). Không có khoá thì rơi về chế độ dự phòng:
khớp câu hỏi với mục Hỏi đáp theo tỉ lệ phủ, và **nói thẳng là không biết** khi không đủ khớp.

Tư liệu dựng TỪ CHÍNH từ điển (`src/lib/assistant-knowledge.ts`) nên trợ lý không bao giờ nói
khác website. System prompt cấm hứa đỗ visa, bắt buộc nêu lệnh cấm cho thuê ngắn hạn, và cấm
nhận thông tin nhạy cảm.

Bật AI thật: đặt `ANTHROPIC_API_KEY` trong `.env.local`.

**Bẫy đã gặp:** regex lọc dấu tiếng Việt phải viết bằng escape `̀-ͯ`, và cần thêm
`đ` → `d` vì NFD **không** tách chữ `đ` — thiếu nó thì "đầu" bị cắt còn "au" rồi bị loại.

## Form liên hệ

`POST /api/enquiry` ghi vào `data/enquiries.jsonl` (đã gitignore). Nếu đặt biến môi trường
`ENQUIRY_WEBHOOK_URL` thì gửi thêm sang webhook đó; webhook lỗi vẫn không mất dữ liệu
vì đã lưu xuống đĩa trước.

Chưa nối email vì khách chưa cung cấp SMTP và email theo tên miền.

## Còn chờ khách hàng (đang là placeholder trong `src/lib/site.ts` và trang About/Offices)

1. Tên miền + email theo tên miền (email cá nhân trong file gốc **không** đưa lên web).
2. Ảnh chân dung và CV chi tiết ông Kakkos + từng thành viên.
3. Địa chỉ chính xác 3 văn phòng Thessaloniki, Việt Nam, Thổ Nhĩ Kỳ (mới có Athens).
4. Thông tin luật sư / công chứng viên đã chốt.
5. Ảnh Before/After các dự án cải tạo, danh mục BĐS đang quản lý.
6. Số đăng ký kinh doanh / môi giới BĐS để hiển thị footer.
7. Testimonial khách thật kèm văn bản đồng ý.
8. Số WhatsApp / Zalo chính thức cho từng thị trường.

## Ràng buộc nội dung — đừng phá

- **Mức đầu tư đã có số, kiểm chứng 23/08/2026** — căn cứ Luật 5100/2024 (hiệu lực 05/04/2024)
  và Thông tư 1/2026 (22/04/2026): **800.000 €** (Attica, vùng Thessaloniki, Mykonos, Santorini,
  đảo trên 3.100 dân) · **400.000 €** (phần còn lại) · **250.000 €** (chỉ 2 trường hợp: chuyển đổi
  thương mại→nhà ở hoàn tất trước khi nộp, hoặc trùng tu công trình di sản xong trước lần gia hạn đầu).
  Kèm quy định **tối thiểu 120 m²** diện tích chính cho hai mức trên. Từ 2026 có thêm hướng
  đầu tư start-up từ 250.000 € qua nền tảng Elevate.
  Số nằm ở `whatIs.thresholds.tiers`, ngày kiểm chứng ở `whatIs.thresholds.verified` —
  **đổi số thì phải đổi luôn ngày đó.**
- **CẤM cho thuê ngắn hạn.** BĐS dùng xin thẻ vàng không được cho thuê kiểu Airbnb và không được
  cho thuê lại; vi phạm bị thu hồi thẻ + phạt 50.000 €. Đã sửa 3 chỗ trong nội dung từng quảng cáo
  ngược lại (mục lợi ích, dịch vụ cải tạo, dịch vụ quản lý). **Đừng thêm lại "short-term letting".**
- "Approval within 90 days" và "100% Free" là cam kết của khách — luôn đi kèm điều kiện
  *"as long as you meet the eligibility criteria"*, không tách rời.
- Không hứa chắc chắn đỗ visa / có quốc tịch / sinh lời. Trang Disclaimer nói rõ cả ba.
- GDPR: banner cookie mặc định **không** đặt cookie tuỳ chọn; lựa chọn chỉ nằm trong
  localStorage của người xem.
