/**
 * Thông tin công ty. Những trường đánh dấu TODO là dữ liệu khách hàng
 * chưa cung cấp — không được bịa, phải xin trước khi phát hành.
 */
export const site = {
  name: "N. Kakkos Estate",
  legalName: "N. Kakkos Estate",
  // Tên miền đang chạy trên Vercel. Đổi sang tên miền thật của khách khi có —
  // giá trị này chi phối canonical, hreflang, sitemap và JSON-LD.
  url: "https://golden-visa-tau.vercel.app",
  founded: "2014",

  // Địa chỉ trụ sở — lấy từ chữ ký email của khách, đã xác nhận.
  headOffice: {
    street: "1 Pigasou Street",
    city: "Kifisia",
    postalCode: "14564",
    country: "Greece",
    countryCode: "GR",
    phone: "+30 697 300 8000",
    phoneHref: "+306973008000",
  },

  // TODO(khách hàng): email theo tên miền công ty.
  // KHÔNG dùng email cá nhân trong tài liệu gốc.
  email: "info@kakkosestate.com",
  emailConfirmed: false,

  // TODO(khách hàng): số WhatsApp/Zalo chính thức cho từng thị trường.
  whatsapp: "+306973008000",
  whatsappConfirmed: false,

  founder: {
    name: "Nikolaos T. Kakkos",
    honorific: "M.B.A., C.F.A.",
  },

  legalUpdated: "2026-08-21",

  /**
   * Kênh mạng xã hội.
   * Facebook là link THẬT do khách đưa. Các kênh còn lại đặt `url: ""`
   * cho tới khi khách xác nhận — link rỗng thì không hiện trên web,
   * cố ý không trỏ bừa vào trang của người khác.
   */
  social: [
    { id: "facebook", label: "Facebook", url: "https://www.facebook.com/GoldenVisaEU" },
    { id: "instagram", label: "Instagram", url: "" },
    { id: "linkedin", label: "LinkedIn", url: "" },
    { id: "youtube", label: "YouTube", url: "" },
    { id: "tiktok", label: "TikTok", url: "" },
    { id: "zalo", label: "Zalo", url: "" },
  ] as { id: string; label: string; url: string }[],
} as const;

export const officeCityKeys = ["athens", "thessaloniki", "vietnam", "turkiye"] as const;
