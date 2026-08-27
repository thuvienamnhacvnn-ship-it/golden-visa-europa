/**
 * Bốn căn hộ — số liệu và ảnh bóc từ hồ sơ PDF khách gửi
 * (E:\Works\itw\pdf\Apt 1.pdf … Apt 4.pdf), bóc ngày 27/08/2026.
 *
 * Chữ trong PDF nằm trong font subset Identity-H; phải áp bảng ToUnicode
 * mới ra tiếng Việt, bóc thẳng luồng nội dung chỉ ra ký tự rác.
 *
 * Bốn hồ sơ dùng CHUNG một bộ ảnh phối cảnh nội thất (đã đối chiếu md5:
 * trùng nhau từng byte), chỉ SƠ ĐỒ MẶT BẰNG là riêng từng căn.
 *
 * CẢNH BÁO ĐÃ NÊU RÕ TRÊN TRANG (mục `eligibility` trong từ điển):
 *  - Diện tích trong hồ sơ gốc ghi "XXX m²" — CHƯA CÓ SỐ THẬT.
 *  - Peristeri thuộc Attica: mức chuẩn 800.000 €, nên giá 250–270k €
 *    KHÔNG tự động đủ điều kiện thẻ vàng.
 *  - Hồ sơ gốc quảng cáo homestay / lưu trú ngắn hạn — CẤM với BĐS thẻ
 *    vàng, đã lược khỏi phần mô tả bố cục.
 */
export type Property = {
  id: "apt-1" | "apt-2" | "apt-3" | "apt-4";
  photo: string;
  plan: string;
  area: string;
  price: string;
  rent: string;
  beds: number;
  baths: number;
  /** Hồ sơ gốc ghi "XXX m²" nên để trống cho tới khi khách xác nhận. */
  size: string | null;
};

/** Ảnh phối cảnh nội thất dùng chung cho cả bốn căn. */
export const gallery = [
  { src: "/photos/bds/phong-khach-ngu.jpg", key: "living" },
  { src: "/photos/bds/phong-khach.jpg", key: "lounge" },
  { src: "/photos/bds/giuong-tang.jpg", key: "bunks" },
  { src: "/photos/bds/bep-ban-an.jpg", key: "kitchen" },
  { src: "/photos/bds/goc-an-lam-viec.jpg", key: "nook" },
  { src: "/photos/bds/bep-chi-tiet.jpg", key: "counter" },
  { src: "/photos/bds/phong-tam.jpg", key: "bath" },
  { src: "/photos/bds/ke-tivi.jpg", key: "media" },
] as const;

export const properties: Property[] = [
  {
    id: "apt-1",
    photo: "/photos/bds/phong-khach-ngu.jpg",
    plan: "/photos/bds/so-do-can-1.jpg",
    area: "Peristeri, Athens",
    price: "270.000 €",
    rent: "650–900 €",
    beds: 1,
    baths: 2,
    size: null,
  },
  {
    id: "apt-2",
    photo: "/photos/bds/phong-khach.jpg",
    plan: "/photos/bds/so-do-can-2.jpg",
    area: "Peristeri, Athens",
    price: "250.000 €",
    rent: "650–900 €",
    beds: 1,
    baths: 2,
    size: null,
  },
  {
    id: "apt-3",
    photo: "/photos/bds/bep-ban-an.jpg",
    plan: "/photos/bds/so-do-can-3.jpg",
    area: "Peristeri, Athens",
    price: "270.000 €",
    rent: "650–900 €",
    beds: 2,
    baths: 2,
    size: null,
  },
  {
    id: "apt-4",
    photo: "/photos/bds/giuong-tang.jpg",
    plan: "/photos/bds/so-do-can-4.jpg",
    area: "Peristeri, Athens",
    price: "270.000 €",
    rent: "650–900 €",
    beds: 1,
    baths: 2,
    size: null,
  },
];
