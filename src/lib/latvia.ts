/**
 * Nguồn PHÁP LÝ cho trang Latvia — bổ sung cho hồ sơ chương trình của khách.
 * Số liệu mức đầu tư, chi phí và quy trình lấy từ tài liệu khách gửi
 * (CHƯƠNG TRÌNH VISA ĐẦU TƯ VÀ ĐỊNH CƯ LATVIA.pdf); mấy đường dẫn dưới đây
 * chỉ để chứng minh tình hình sửa luật nêu trong mục cuối trang.
 *
 * Để riêng ở đây chứ không nhân bản vào 5 từ điển: đường dẫn giống nhau ở
 * mọi ngôn ngữ, nhân bản thì sửa một chỗ phải nhớ sửa năm chỗ.
 *
 * Chỉ dùng nguồn chính thức của Latvia và hãng luật hành nghề tại Latvia.
 * Cố ý không dẫn trang của các công ty bán dịch vụ định cư: họ vẫn đang rao
 * mức "bất động sản 250.000 €" trong khi diện đó đang bị đề xuất bỏ.
 */
export const latviaSources = [
  {
    label: "Saeima — Quốc hội Latvia",
    note: "Xem xét Luật Nhập cư lần hai, 20/08/2026",
    url: "https://www.saeima.lv/aktualitates/saeimas-zinas/36099-saeima-reviews-the-immigration-law-for-the-second-time",
  },
  {
    label: "Phủ Tổng thống Latvia",
    note: "Trả Luật Nhập cư về Quốc hội xem xét lần hai, 19/06/2026",
    url: "https://www.president.lv/en/article/president-latvia-submits-immigration-law-saeima-second-review",
  },
  {
    label: "COBALT",
    note: "Hãng luật tại Latvia — phân tích Luật Nhập cư mới",
    url: "https://www.cobalt.legal/news-cases/new-immigration-law-latvia-employers-investors-temporary-residence-holders/",
  },
  {
    label: "PMLP",
    note: "Cục Công dân và Di trú Latvia",
    url: "https://www.pmlp.gov.lv/en/updated-information-amendments-immigration-law",
  },
] as const;
