/**
 * Bất động sản tiêu biểu — số liệu lấy từ 4 hồ sơ PDF khách gửi
 * (E:\Works\itw\pdf\Apt 1-4.pdf), bóc ngày 26/08/2026.
 *
 * CẢNH BÁO ĐÃ GHI RÕ TRONG NỘI DUNG:
 *  - Diện tích trong hồ sơ gốc ghi "XXX m²" — CHƯA CÓ SỐ THẬT.
 *    Luật đòi tối thiểu 120 m² cho mức 400k/800k nên đây là thông tin bắt buộc.
 *  - Giá 250–270k € tại Peristeri (thuộc Attica) KHÔNG tự động đủ điều kiện
 *    thẻ vàng: Attica yêu cầu 800.000 €. Mức 250.000 € chỉ áp dụng cho
 *    chuyển đổi thương mại→nhà ở hoặc trùng tu công trình di sản.
 *  - Hồ sơ gốc quảng cáo "homestay / lưu trú ngắn hạn" — CẤM với BĐS thẻ vàng.
 *    Đã bỏ khỏi nội dung hiển thị.
 */
export type Property = {
  id: string;
  photo: string;
  code: string;
  area: string;
  price: string;
  rent: string;
  beds: number;
  baths: number;
  size: string | null;
};

export const properties: Property[] = [
  { id: "apt-1", photo: "/photos/bds-01.jpg", code: "Peristeri · Căn hộ 1",
    area: "Peristeri, Athens", price: "270.000 €", rent: "650–900 €",
    beds: 1, baths: 2, size: null },
  { id: "apt-2", photo: "/photos/bds-02.jpg", code: "Peristeri · Căn hộ 2",
    area: "Peristeri, Athens", price: "250.000 €", rent: "650–900 €",
    beds: 1, baths: 2, size: null },
  { id: "apt-3", photo: "/photos/bds-03.jpg", code: "Peristeri · Căn hộ 3",
    area: "Peristeri, Athens", price: "270.000 €", rent: "650–900 €",
    beds: 2, baths: 2, size: null },
  { id: "apt-4", photo: "/photos/bds-04.jpg", code: "Peristeri · Căn hộ 4",
    area: "Peristeri, Athens", price: "270.000 €", rent: "650–900 €",
    beds: 1, baths: 2, size: null },
];
