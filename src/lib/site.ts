/**
 * Thông tin công ty. Những trường đánh dấu TODO là dữ liệu khách hàng
 * chưa cung cấp — không được bịa, phải xin trước khi phát hành.
 */
export const site = {
  name: "NIBELC GROUP",
  legalName: "NIBELC GROUP",
  shortName: "NIBELC",
  // Tên miền đang chạy trên Vercel. Đổi sang tên miền thật của khách khi có —
  // giá trị này chi phối canonical, hreflang, sitemap và JSON-LD.
  url: "https://golden-visa-europa.vercel.app",
  founded: "2014",

  // Địa chỉ trụ sở — lấy từ chữ ký email của khách, đã xác nhận.
  headOffice: {
    street: "Filippou 28",
    city: "Perea",
    postalCode: "57019",
    country: "Greece",
    countryCode: "GR",
    phone: "+49 152 0696 8888",
    phoneHref: "+4915206968888",
  },

  // TODO(khách hàng): email theo tên miền công ty.
  // KHÔNG dùng email cá nhân trong tài liệu gốc.
  email: "info@nibelc.com.vn",
  emailConfirmed: false,
  partnerSite: "www.nibelc.com.vn",

  /**
   * Ba đầu mối liên hệ, lấy từ tài liệu khách gửi (E:Worksitwpdf).
   * Nikolaos: chữ ký email gốc. Tony và Stella: trang LIÊN HỆ của hai
   * tài liệu tiếng Việt.
   */
  contacts: [
    {
      name: "Mr. Nikolaos T. Kakkos",
      role: "Đối tác tại Athens",
      phone: "+30 697 300 8000",
      href: "+306973008000",
      channels: ["Phone"],
    },
    {
      name: "Mr. Phan Tony",
      role: "NIBELC Group",
      phone: "+49 152 0696 8888",
      href: "+4915206968888",
      channels: ["WhatsApp", "Viber", "Zalo"],
    },
    {
      name: "Ms. Stella Nguyen",
      role: "NIBELC Group",
      phone: "+36 303 109 009",
      href: "+36303109009",
      channels: ["WhatsApp", "Viber", "Zalo"],
    },
  ] as {
    name: string;
    role: string;
    phone: string;
    href: string;
    channels: string[];
  }[],

  // TODO(khách hàng): số WhatsApp/Zalo chính thức cho từng thị trường.
  whatsapp: "+4915206968888",
  whatsappConfirmed: true,

  /**
   * Không còn là "người sáng lập": khách đã bỏ N. KAKKOS khỏi tên công ty,
   * nên ông xuất hiện với tư cách đối tác tại Athens, không phải sáng lập viên
   * của NIBELC GROUP. Đã bỏ khỏi dữ liệu có cấu trúc của tổ chức.
   */
  athensPartner: {
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
