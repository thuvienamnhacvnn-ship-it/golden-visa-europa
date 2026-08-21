/**
 * Thông tin công ty. Những trường đánh dấu TODO là dữ liệu khách hàng
 * chưa cung cấp — không được bịa, phải xin trước khi phát hành.
 */
export const site = {
  name: "N. Kakkos Estate",
  legalName: "N. Kakkos Estate",
  // TODO(khách hàng): tên miền thật
  url: "https://kakkosestate.com",
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
} as const;

export const officeCityKeys = ["athens", "thessaloniki", "vietnam", "turkiye"] as const;
