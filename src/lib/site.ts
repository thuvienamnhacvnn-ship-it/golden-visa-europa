/**
 * Thông tin công ty. Những trường đánh dấu TODO là dữ liệu khách hàng
 * chưa cung cấp — không được bịa, phải xin trước khi phát hành.
 */
export type Office = {
  id: string;
  label: string;
  street: string;
  city: string;
  /** Thành phố lớn để khách dễ định vị: Kifisia thuộc Athens, Perea thuộc Thessaloniki. */
  cityLabel: string;
  /** Nhãn ngắn in trên bản đồ nhỏ — khung chỉ rộng 68px, tên dài bị cắt cụt. */
  mapBadge: string;
  postalCode: string;
  country: string;
  countryCode: string;
  phone: string;
  phoneHref: string;
  person: string;
  mapQuery: string;
};

export const site = {
  name: "NIBELC GROUP – N. KAKKOS ESTATE",
  legalName: "NIBELC GROUP – N. KAKKOS ESTATE",
  shortName: "NIBELC GROUP",
  // Tên miền đang chạy trên Vercel. Đổi sang tên miền thật của khách khi có —
  // giá trị này chi phối canonical, hreflang, sitemap và JSON-LD.
  /** Tên miền thật. Dùng cho canonical, sitemap và dữ liệu có cấu trúc —
      để địa chỉ .vercel.app ở đây là Google lập chỉ mục nhầm bản đó. */
  url: "https://golden-visa-europa.com",
  founded: "2014",

  /**
   * Hai văn phòng tại Hy Lạp, mỗi nơi một số điện thoại.
   * Athens: bóc nguyên văn từ chữ ký trong tài liệu khách gửi
   *   ("N.KAKKOS ESTATE / 1 PIGASOU STREET, KIFISIA 14564 GREECE /
   *   TEL: +306973008000").
   * Perea: trụ sở NIBELC, khách xác nhận trong trao đổi.
   *
   * `mapQuery` là chuỗi dùng cho liên kết chỉ đường Google Maps — viết
   * riêng chứ không ghép từ các trường bên trên, vì Google tìm trúng hơn
   * khi có tên thành phố lớn kèm theo.
   */
  offices: [
    {
      id: "athens",
      label: "N. Kakkos Estate",
      street: "1 Pigasou Street",
      city: "Kifisia",
      cityLabel: "Athens",
      mapBadge: "Athens",
      postalCode: "14564",
      country: "Greece",
      countryCode: "GR",
      phone: "+30 697 300 8000",
      phoneHref: "+306973008000",
      person: "Mr. Nikolaos T. Kakkos",
      mapQuery: "1 Pigasou Street, Kifisia 14564, Athens, Greece",
    },
    {
      id: "thessaloniki",
      label: "NIBELC Group",
      street: "Filippou 28",
      city: "Perea",
      cityLabel: "Thessaloniki",
      mapBadge: "Perea",
      postalCode: "57019",
      country: "Greece",
      countryCode: "GR",
      phone: "+49 152 0696 8888",
      phoneHref: "+4915206968888",
      person: "Mr. Tony Phan",
      mapQuery: "Filippou 28, Perea 57019, Thessaloniki, Greece",
    },
    {
      id: "budapest",
      label: "NIBELC Manpower Kft",
      street: "József krt. 45, 2em.6B",
      city: "Budapest",
      cityLabel: "Budapest",
      mapBadge: "Budapest",
      postalCode: "1085",
      country: "Hungary",
      countryCode: "HU",
      // Khách chưa gửi số cho ba văn phòng dưới đây — để trống, không lấy tạm
      // số của nơi khác.
      phone: "",
      phoneHref: "",
      person: "",
      mapQuery: "József körút 45, 1085 Budapest, Hungary",
    },
    {
      id: "germany",
      label: "NIBELC Germany GmbH",
      street: "Dietrichstraße 16",
      city: "Ahrensfelde",
      cityLabel: "Germany",
      mapBadge: "Berlin",
      postalCode: "16356",
      country: "Germany",
      countryCode: "DE",
      phone: "",
      phoneHref: "",
      person: "",
      mapQuery: "Dietrichstraße 16, 16356 Ahrensfelde, Germany",
    },
    {
      id: "hanoi",
      label: "Hanoi Office",
      street: "4th Floor, Rainbow Building, Lot B – CQ1",
      city: "Van Quan, Ha Dong",
      cityLabel: "Ha Noi",
      mapBadge: "Ha Noi",
      postalCode: "",
      country: "Viet Nam",
      countryCode: "VN",
      phone: "",
      phoneHref: "",
      person: "",
      mapQuery: "Rainbow Building, Van Quan, Ha Dong, Ha Noi, Vietnam",
    },
  ] as Office[],

  /**
   * Bí danh cho những chỗ chỉ hiện MỘT địa chỉ (trang liên hệ, nút gọi,
   * dữ liệu có cấu trúc). Trỏ vào văn phòng NIBELC ở Perea vì đó là pháp
   * nhân vận hành website. Footer và trang Văn phòng hiện đủ cả hai.
   */
  get headOffice(): Office {
    return this.offices[1];
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
      role: "Nhà sáng lập · N. Kakkos Estate, Athens",
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
   * Khách đã lấy lại "N. KAKKOS ESTATE" vào tên công ty, nên ông trở lại
   * đúng vai người sáng lập như tài liệu gốc ghi.
   */
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
    // Khách gửi link chia sẻ facebook.com/share/18t23whsGn/ — theo chuyển hướng
    // 302 thì nó về đúng địa chỉ này. Lưu địa chỉ gốc chứ không lưu link chia
    // sẻ: link chia sẻ kèm tham số theo dõi và có thể hết hạn.
    { id: "facebook", label: "Facebook", url: "https://www.facebook.com/GoldenVisaEU" },
    { id: "instagram", label: "Instagram", url: "" },
    { id: "linkedin", label: "LinkedIn", url: "" },
    { id: "youtube", label: "YouTube", url: "" },
    { id: "tiktok", label: "TikTok", url: "" },
    { id: "zalo", label: "Zalo", url: "" },
  ] as { id: string; label: string; url: string }[],
} as const;

export const officeCityKeys = [
  "athens",
  "thessaloniki",
  "budapest",
  "germany",
  "hanoi",
  "turkiye",
] as const;

/**
 * Ảnh chân dung đội ngũ. Tra theo TÊN vì tên riêng giữ nguyên ở cả năm ngôn
 * ngữ; ai chưa có ảnh thì trang tự để khung chờ, không cần sửa gì thêm.
 */
export const teamPhotos: Record<string, string> = {
  "Tony Phan": "/photos/team/tony-phan.jpg",
};

/**
 * Ảnh chụp chung ba người cho banner trang Về chúng tôi.
 * Bản NGANG: ảnh gốc là ảnh dọc 960×1280, để nguyên thì banner cao hơn một
 * màn hình và người xem không thấy gì ngoài mảng navy khi vừa mở trang.
 */
export const teamGroupPhoto = "/photos/team/doi-ngu-ngang.jpg";
