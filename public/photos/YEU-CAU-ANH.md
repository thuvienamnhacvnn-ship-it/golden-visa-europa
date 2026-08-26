# Yêu cầu ảnh — website Golden Visa (N. Kakkos Estate)

> File này **sinh tự động** từ `src/lib/media.ts`. Đừng sửa tay — sửa sổ đăng ký rồi chạy
> `node scripts/make-image-brief.mjs`.

**17 ảnh làm bằng AI + 5 ảnh phải là ảnh thật.**

Lưu ảnh **đúng tên tệp** vào `C:\Users\admin\golden-visa\public\photos\` rồi chạy `npm run build`.
Ảnh nào chưa có thì web tự dùng tranh SVG thay thế, không vỡ layout.

---

## Quy ước — dán vào cuối MỌI prompt

```
editorial architectural photography, natural daylight, warm golden-hour light,
deep navy blue and warm antique gold palette, calm premium mood, muted contrast,
no text, no letters, no logos, no watermark, no signage, no recognisable faces,
sharp detail, shot on 35mm, photorealistic
```

**Chủ thể để giữa khung, chừa lề rộng** — cùng một ảnh bị cắt theo nhiều tỉ lệ khác nhau.

**Riêng nhóm A (băng ngang):** chừa **một phần ba bên trái** thoáng và tối, vì chữ tiêu đề
nằm đè lên đó. Đây là lý do banner phải rộng và thấp chứ không phải ảnh vuông.

---

## A. Băng ngang đầu trang — RỘNG và THẤP

| # | Tên tệp | Kích thước | Tỉ lệ | Tiêu đề |
|---|---|---|---|---|
| 1 | `hero-trang-chu.jpg` | 2560×1280 | 2/1 | Athens nhìn từ trên cao lúc hoàng hôn |
| 2 | `banner-the-vang.jpg` | 2400×800 | 3/1 | Hộ chiếu và bản đồ Schengen trên bàn gỗ |
| 3 | `banner-dich-vu.jpg` | 2400×800 | 3/1 | Sảnh cột đá cổ điển Hy Lạp |
| 4 | `banner-ve-chung-toi.jpg` | 2400×800 | 3/1 | Bàn họp gỗ óc chó bên cửa sổ lớn |
| 5 | `banner-vi-sao-chon.jpg` | 2400×800 | 3/1 | Ban công nhìn ra biển Aegean |
| 6 | `banner-van-phong.jpg` | 2400×800 | 3/1 | Bản đồ thế giới khắc đồng |
| 7 | `banner-lien-he.jpg` | 2400×800 | 3/1 | Bàn làm việc bên cửa sổ, buổi sáng Athens |

<details>
<summary><b>Prompt chi tiết từng ảnh</b></summary>

#### `hero-trang-chu.jpg`
**Athens nhìn từ trên cao lúc hoàng hôn**

- Dùng ở: Nền toàn màn hình của trang chủ, chữ nằm đè bên trái
- Kích thước: **2560×1280** (tỉ lệ 2/1)

> Aerial view of Athens at golden hour, the Acropolis on its hill in the middle distance, white low-rise rooftops spreading out, Mediterranean sea on the horizon, warm amber sunlight raking across the city, deep blue evening sky. Leave the LEFT THIRD visually calm — headline text sits there.

#### `banner-the-vang.jpg`
**Hộ chiếu và bản đồ Schengen trên bàn gỗ**

- Dùng ở: Đầu trang /what-is-golden-visa
- Kích thước: **2400×800** (tỉ lệ 3/1)

> A passport and a folded map lying on a dark walnut desk, brass desk lamp at the edge, soft morning light from the left, shallow depth of field. Wide letterbox composition, subject slightly right of centre.

#### `banner-dich-vu.jpg`
**Sảnh cột đá cổ điển Hy Lạp**

- Dùng ở: Đầu trang /services và 6 trang dịch vụ con
- Kích thước: **2400×800** (tỉ lệ 3/1)

> Colonnade of a classical Greek stone building, long row of fluted columns receding, warm late-afternoon light striping the floor, no people. Wide letterbox composition.

#### `banner-ve-chung-toi.jpg`
**Bàn họp gỗ óc chó bên cửa sổ lớn**

- Dùng ở: Đầu trang /about
- Kích thước: **2400×800** (tỉ lệ 3/1)

> Empty walnut boardroom table beside tall windows, soft daylight, leather chairs, restrained and expensive, no people, no visible branding. Wide letterbox composition.

#### `banner-vi-sao-chon.jpg`
**Ban công nhìn ra biển Aegean**

- Dùng ở: Đầu trang /why-us
- Kích thước: **2400×800** (tỉ lệ 3/1)

> View from a stone terrace over the Aegean sea, white balustrade, olive tree at one edge, calm water, hazy warm horizon, no people. Wide letterbox composition.

#### `banner-van-phong.jpg`
**Bản đồ thế giới khắc đồng**

- Dùng ở: Đầu trang /offices
- Kích thước: **2400×800** (tỉ lệ 3/1)

> Engraved brass world map on a dark surface, four small polished markers placed on Greece, Vietnam and Türkiye, raking light picking out the engraving. Wide letterbox composition.

#### `banner-lien-he.jpg`
**Bàn làm việc bên cửa sổ, buổi sáng Athens**

- Dùng ở: Đầu trang /contact
- Kích thước: **2400×800** (tỉ lệ 3/1)

> A quiet desk by a window in an Athens apartment in the morning, notebook and fountain pen, cup of coffee, soft light, city rooftops blurred outside, no people. Wide letterbox composition.

</details>

## B. Sáu dịch vụ

| # | Tên tệp | Kích thước | Tỉ lệ | Tiêu đề |
|---|---|---|---|---|
| 1 | `dv-the-vang.jpg` | 1600×1200 | 4/3 | Bộ hồ sơ định cư trên bàn luật sư |
| 2 | `dv-ngan-hang.jpg` | 1600×1200 | 4/3 | Nội thất ngân hàng tư nhân châu Âu |
| 3 | `dv-tu-van-bds.jpg` | 1600×1200 | 4/3 | Bản vẽ mặt bằng và mô hình toà nhà |
| 4 | `dv-nghien-cuu-bds.jpg` | 1600×1200 | 4/3 | Bản đồ thành phố, kính lúp và ghim đánh dấu |
| 5 | `dv-cai-tao.jpg` | 1600×1200 | 4/3 | Căn hộ đang hoàn thiện, nắng qua cửa sổ lớn |
| 6 | `dv-quan-ly-bds.jpg` | 1600×1200 | 4/3 | Sảnh chung cư cao cấp |

<details>
<summary><b>Prompt chi tiết từng ảnh</b></summary>

#### `dv-the-vang.jpg`
**Bộ hồ sơ định cư trên bàn luật sư**

- Dùng ở: Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> A complete residency application file on a lawyer's desk: passport, folder of documents, reading glasses, fountain pen, warm desk light, no people, no readable text on documents.

#### `dv-ngan-hang.jpg`
**Nội thất ngân hàng tư nhân châu Âu**

- Dùng ở: Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> Interior of a classic European private bank: polished marble counter, brass fittings, tall arched windows, quiet and empty, warm daylight, no people, no logos.

#### `dv-tu-van-bds.jpg`
**Bản vẽ mặt bằng và mô hình toà nhà**

- Dùng ở: Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> Architectural floor plans spread on a table with a small white massing model of a building, scale ruler, soft overhead light, no people.

#### `dv-nghien-cuu-bds.jpg`
**Bản đồ thành phố, kính lúp và ghim đánh dấu**

- Dùng ở: Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> A large city map laid flat, a brass magnifier resting on it, a few small pins marking districts, warm side light, no people.

#### `dv-cai-tao.jpg`
**Căn hộ đang hoàn thiện, nắng qua cửa sổ lớn**

- Dùng ở: Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> A high-end apartment near the end of renovation: fresh plaster, new oak floor partly laid, tall window with strong daylight, a few tools set aside neatly, no people.

#### `dv-quan-ly-bds.jpg`
**Sảnh chung cư cao cấp**

- Dùng ở: Ô dịch vụ ở trang chủ, danh sách /services, đầu trang dịch vụ
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> Lobby of a high-end residential building: stone floor, concierge desk, tall plants, warm evening light through glass, no people, no signage.

</details>

## C. Bốn văn phòng

| # | Tên tệp | Kích thước | Tỉ lệ | Tiêu đề |
|---|---|---|---|---|
| 1 | `tp-athens.jpg` | 1600×1200 | 4/3 | Athens — Acropolis nhìn từ khu Kifisia |
| 2 | `tp-thessaloniki.jpg` | 1600×1200 | 4/3 | Thessaloniki — Tháp Trắng bên bờ biển |
| 3 | `tp-vietnam.jpg` | 1600×1200 | 4/3 | Việt Nam — skyline sông Sài Gòn lúc chạng vạng |
| 4 | `tp-tho-nhi-ky.jpg` | 1600×1200 | 4/3 | Istanbul — eo Bosphorus, mái vòm và minaret |

<details>
<summary><b>Prompt chi tiết từng ảnh</b></summary>

#### `tp-athens.jpg`
**Athens — Acropolis nhìn từ khu Kifisia**

- Dùng ở: Ô văn phòng ở trang chủ và trang /offices
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> Athens cityscape at golden hour with the Acropolis on the horizon, leafy northern suburb rooftops in the foreground, warm light, no people.

#### `tp-thessaloniki.jpg`
**Thessaloniki — Tháp Trắng bên bờ biển**

- Dùng ở: Ô văn phòng ở trang chủ và trang /offices
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> The White Tower of Thessaloniki seen from the waterfront promenade at dusk, calm sea, warm sky, no people in focus.

#### `tp-vietnam.jpg`
**Việt Nam — skyline sông Sài Gòn lúc chạng vạng**

- Dùng ở: Ô văn phòng ở trang chủ và trang /offices
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> Ho Chi Minh City skyline across the Saigon river at blue hour, tall towers lit warmly, river reflections, calm, no people.

#### `tp-tho-nhi-ky.jpg`
**Istanbul — eo Bosphorus, mái vòm và minaret**

- Dùng ở: Ô văn phòng ở trang chủ và trang /offices
- Kích thước: **1600×1200** (tỉ lệ 4/3)

> Istanbul at golden hour: domes and minarets above the Bosphorus, ferries on the water, warm haze, no people in focus.

</details>

## D. ẢNH NGƯỜI — KHÔNG dùng AI

| # | Tên tệp | Kích thước | Tỉ lệ | Tiêu đề |
|---|---|---|---|---|
| 1 | `ong-kakkos.jpg` | 1200×1500 | 4/5 | Chân dung ông Nikolaos T. Kakkos |
| 2 | `doi-ngu-01.jpg` | 900×1200 | 3/4 | Thành viên 1 — kèm tên và chức danh |
| 3 | `doi-ngu-02.jpg` | 900×1200 | 3/4 | Thành viên 2 — kèm tên và chức danh |
| 4 | `doi-ngu-03.jpg` | 900×1200 | 3/4 | Thành viên 3 — kèm tên và chức danh |
| 5 | `doi-ngu-04.jpg` | 900×1200 | 3/4 | Luật sư / công chứng viên — kèm tên và số thẻ hành nghề |

<details>
<summary><b>Prompt chi tiết từng ảnh</b></summary>

#### `ong-kakkos.jpg`
**Chân dung ông Nikolaos T. Kakkos**

- Dùng ở: Mục người sáng lập ở trang chủ và trang /about
- Kích thước: **1200×1500** (tỉ lệ 4/5)

> ẢNH THẬT. Chân dung doanh nhân, nền tối trung tính hoặc văn phòng, ánh sáng dịu, nhìn thẳng ống kính, trang phục công sở.

#### `doi-ngu-01.jpg`
**Thành viên 1 — kèm tên và chức danh**

- Dùng ở: Lưới đội ngũ ở trang /about
- Kích thước: **900×1200** (tỉ lệ 3/4)

> ẢNH THẬT. Chân dung nửa người, cùng phông nền và ánh sáng với các thành viên khác.

#### `doi-ngu-02.jpg`
**Thành viên 2 — kèm tên và chức danh**

- Dùng ở: Lưới đội ngũ ở trang /about
- Kích thước: **900×1200** (tỉ lệ 3/4)

> ẢNH THẬT. Chân dung nửa người, cùng phông nền và ánh sáng với các thành viên khác.

#### `doi-ngu-03.jpg`
**Thành viên 3 — kèm tên và chức danh**

- Dùng ở: Lưới đội ngũ ở trang /about
- Kích thước: **900×1200** (tỉ lệ 3/4)

> ẢNH THẬT. Chân dung nửa người, cùng phông nền và ánh sáng với các thành viên khác.

#### `doi-ngu-04.jpg`
**Luật sư / công chứng viên — kèm tên và số thẻ hành nghề**

- Dùng ở: Lưới đội ngũ ở trang /about
- Kích thước: **900×1200** (tỉ lệ 3/4)

> ẢNH THẬT. Chân dung nửa người, cùng phông nền và ánh sáng với các thành viên khác.

</details>

---

## Video WebM nền trong suốt (đè lên banner trang chủ)

Anh gửi video, tôi tách nền. Tệp đích: `public/video/hero-overlay.webm`

```
ffmpeg -i nguon.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 30 -an -auto-alt-ref 0 hero-overlay.webm
```

**Bắt buộc có `-auto-alt-ref 0`** — thiếu là mất kênh trong suốt, video ra nền đen.

Gợi ý: dài 6–12 giây, có điểm nối lặp mượt, và đặt nội dung ở **nửa phải khung hình**
vì nửa trái đã có chữ tiêu đề.

---

## Vì sao 5 ảnh người không được dùng AI

Đây là người có thật, tên thật in dưới ảnh trên web công ty. Dùng khuôn mặt do AI bịa rồi
đề tên ông Kakkos là giả mạo — khách đầu tư hàng trăm nghìn euro mà phát hiện ra thì hỏng cả
thương hiệu, chưa kể rủi ro pháp lý. Chưa có ảnh thật thì giữ huy hiệu NK: vẫn sang, mà trung thực.

Kèm theo mỗi ảnh người: **tên đầy đủ + chức danh**.
