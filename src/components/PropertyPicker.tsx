"use client";

import { useState } from "react";
import { Artwork } from "./Artwork";
import { properties, gallery } from "@/lib/properties";

type Item = { name: string; capacity: string; layout: string };

export type PropertyStrings = {
  priceLabel: string;
  rentLabel: string;
  bedsLabel: string;
  bathsLabel: string;
  sizeLabel: string;
  sizePending: string;
  typeLabel: string;
  typeValue: string;
  capacityLabel: string;
  planTitle: string;
  layoutTitle: string;
  galleryTitle: string;
  galleryNote: string;
  items: Record<string, Item>;
};

/**
 * Bốn căn hộ trong MỘT khung, chọn căn bằng hàng thẻ ở trên.
 *
 * Bản trước xếp bốn hồ sơ nối đuôi nhau nên trang dài lê thê mà vẫn
 * không so sánh được căn nào với căn nào. Ở đây hàng thẻ vừa là nút chọn
 * vừa là bảng so sánh giá, còn phần chi tiết chỉ đổi nội dung tại chỗ.
 *
 * Không dùng bốn trang riêng: bốn căn dùng chung một bộ ảnh phối cảnh và
 * chỉ khác nhau ở sơ đồ mặt bằng với vài dòng thông số.
 */
export function PropertyPicker({ t }: { t: PropertyStrings }) {
  const [active, setActive] = useState(0);
  const prop = properties[active];
  const item = t.items[prop.id];

  return (
    <div>
      {/* Hàng thẻ chọn — cũng là bảng so giá bốn căn */}
      <div
        role="tablist"
        aria-label={t.galleryTitle}
        className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
      >
        {properties.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`group rounded-xl border p-4 text-left transition-all lg:p-5 ${
                on
                  ? "border-gold-500/70 bg-gold-500/[0.07] shadow-[0_18px_40px_-28px_rgba(7,27,48,0.55)]"
                  : "border-ink/10 hover:border-gold-500/40 hover:bg-ink/[0.03]"
              }`}
            >
              <span
                className={`eyebrow block text-[0.625rem] ${on ? "text-gold-600" : "text-ink/40"}`}
              >
                {t.items[p.id].name}
              </span>
              <span
                className={`display mt-2 block text-[1.25rem] lg:text-[1.5rem] ${
                  on ? "text-ink" : "text-ink/70"
                }`}
              >
                {p.price}
              </span>
              <span className="mt-2 block text-[0.75rem] text-ink/50">
                {p.beds} · {p.baths} · {t.items[p.id].capacity}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chi tiết căn đang chọn. key ép React dựng lại để hiệu ứng chạy mỗi lần đổi căn. */}
      <div key={prop.id} className="fade-swap mt-10 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-14">
        <div>
          <Artwork
            src={prop.plan}
            alt={`${item.name} — ${t.planTitle}`}
            ratio="3 / 4"
            fit="contain"
            priority
            className="w-full !bg-white p-3 shadow-[0_24px_60px_-40px_rgba(7,27,48,0.5)]"
          />
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ink/45">{t.planTitle}</p>
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-b border-ink/10 pb-7 text-[0.875rem] sm:grid-cols-3">
            <Cell label={t.priceLabel}>
              <span className="display text-[1.5rem] text-ink">{prop.price}</span>
            </Cell>
            <Cell label={t.rentLabel}>{prop.rent}</Cell>
            <Cell label={t.typeLabel}>{t.typeValue}</Cell>
            <Cell label={t.bedsLabel}>{prop.beds}</Cell>
            <Cell label={t.bathsLabel}>{prop.baths}</Cell>
            <Cell label={t.sizeLabel}>
              <span className="italic text-ink/45">{prop.size ?? t.sizePending}</span>
            </Cell>
          </dl>

          <h3 className="mt-8 text-[1rem]">{t.layoutTitle}</h3>
          <p className="mt-3 text-[0.9375rem] leading-8 text-ink/70">{item.layout}</p>

          <p className="mt-6 text-[0.875rem]">
            <span className="text-ink/45">{t.capacityLabel}: </span>
            <span className="font-medium text-ink">{item.capacity}</span>
          </p>

          {/* Ảnh phối cảnh nằm ngay cạnh, không phải cuộn xuống mục riêng */}
          <h3 className="mt-10 text-[1rem]">{t.galleryTitle}</h3>
          <ul className="mt-4 grid grid-cols-4 gap-2.5">
            {gallery.map((g, i) => (
              <li key={g.key}>
                <Artwork
                  src={g.src}
                  alt={`${t.galleryTitle} — ${i + 1}`}
                  ratio="1 / 1"
                  className="w-full zoom-wrap"
                />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-6 text-ink/50">{t.galleryNote}</p>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-ink/50">{label}</dt>
      <dd className="mt-1 font-medium text-ink">{children}</dd>
    </div>
  );
}
