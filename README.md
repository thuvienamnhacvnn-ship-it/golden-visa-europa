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

- **Không nêu mức đầu tư tối thiểu bằng con số.** Ngưỡng Golden Visa Hy Lạp đã đổi từ 2024
  (3 mức theo vùng và loại BĐS). Trang `what-is-golden-visa` cố ý chỉ nói "tuỳ khu vực,
  chúng tôi xác nhận bằng văn bản". Muốn thêm số thì phải tra migration.gov.gr
  và ghi ngày cập nhật cạnh bảng.
- "Approval within 90 days" và "100% Free" là cam kết của khách — luôn đi kèm điều kiện
  *"as long as you meet the eligibility criteria"*, không tách rời.
- Không hứa chắc chắn đỗ visa / có quốc tịch / sinh lời. Trang Disclaimer nói rõ cả ba.
- GDPR: banner cookie mặc định **không** đặt cookie tuỳ chọn; lựa chọn chỉ nằm trong
  localStorage của người xem.
