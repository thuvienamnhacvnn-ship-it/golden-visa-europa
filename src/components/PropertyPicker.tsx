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
 * Nền TỐI là bắt buộc chứ không phải lựa chọn thẩm mỹ: sơ đồ mặt bằng là
 * bản vẽ nét đen trên giấy trắng, đặt trên nền sáng thì tờ giấy tan vào
 * nền và không còn thấy đâu là mép bản vẽ. Trên nền navy, tờ giấy nổi hẳn lên.
 *
 * Không tách bốn trang riêng: bốn căn dùng chung một bộ ảnh phối cảnh và
 * chỉ khác nhau ở sơ đồ mặt bằng cùng vài dòng thông số.
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
              className={`rounded-xl border p-4 text-left transition-all lg:p-5 ${
                on
                  ? "border-gold-500/70 bg-white/[0.07] shadow-[0_20px_44px_-26px_rgba(0,0,0,0.8)]"
                  : "border-white/10 hover:border-gold-500/45 hover:bg-white/[0.04]"
              }`}
            >
              <span
                className={`eyebrow block text-[0.625rem] ${
                  on ? "text-gold-400" : "text-on-deep-2/60"
                }`}
              >
                {t.items[p.id].name}
              </span>
              <span
                className={`display mt-2 block text-[1.25rem] lg:text-[1.5rem] ${
                  on ? "text-gold-300" : "text-on-deep/70"
                }`}
              >
                {p.price}
              </span>
              <span className="mt-2 block text-[0.75rem] text-on-deep-2/60">
                {p.beds} · {p.baths} · {t.items[p.id].capacity}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chi tiết căn đang chọn. key ép React dựng lại để hiệu ứng chạy mỗi lần đổi căn. */}
      <div key={prop.id} className="fade-swap mt-12">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1fr] lg:gap-16">
          {/* Sơ đồ: tờ giấy trắng có viền vàng mảnh, nổi trên nền navy */}
          <figure className="m-0">
            {/* Không ép tỉ lệ cố định: bản vẽ bốn căn cao thấp khác nhau,
                ép khung thì hoặc cắt mất mép hoặc chừa lề trắng thừa.
                Giới hạn chiều cao để cột này cân với cột thông số bên phải. */}
            <div className="flex items-center justify-center rounded-2xl border border-gold-500/25 bg-white p-4 shadow-[0_36px_80px_-40px_rgba(0,0,0,0.85)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prop.plan}
                alt={`${item.name} — ${t.planTitle}`}
                className="max-h-[34rem] w-auto max-w-full rounded-lg"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-gold-400/80">
              {t.planTitle} · {item.name}
            </figcaption>
          </figure>

          <div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-b border-white/12 pb-8 text-[0.875rem] sm:grid-cols-3">
              <Cell label={t.priceLabel}>
                <span className="display text-[1.625rem] text-gold-300">{prop.price}</span>
              </Cell>
              <Cell label={t.rentLabel}>{prop.rent}</Cell>
              <Cell label={t.typeLabel}>{t.typeValue}</Cell>
              <Cell label={t.bedsLabel}>{prop.beds}</Cell>
              <Cell label={t.bathsLabel}>{prop.baths}</Cell>
              <Cell label={t.sizeLabel}>
                <span className="italic text-on-deep-2/55">{prop.size ?? t.sizePending}</span>
              </Cell>
            </dl>

            <h3 className="mt-9 text-[1.0625rem] text-on-deep">{t.layoutTitle}</h3>
            <p className="mt-4 text-[0.9375rem] leading-8 text-on-deep-2/85">{item.layout}</p>

            <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/12 px-4 py-2 text-[0.8125rem]">
              <span className="text-on-deep-2/60">{t.capacityLabel}</span>
              <span className="font-medium text-gold-300">{item.capacity}</span>
            </p>
          </div>
        </div>

        {/* Phối cảnh nội thất: hàng ngang cả chiều rộng, 4 cột nên không lẻ hàng */}
        <div className="mt-14 border-t border-white/12 pt-10">
          <h3 className="eyebrow text-gold-400">{t.galleryTitle}</h3>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {gallery.map((g, i) => (
              <li key={g.key}>
                <Artwork
                  src={g.src}
                  alt={`${t.galleryTitle} — ${i + 1}`}
                  ratio="4 / 3"
                  className="zoom-wrap w-full ring-1 ring-white/10"
                />
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-6 text-on-deep-2/55">{t.galleryNote}</p>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-on-deep-2/55">{label}</dt>
      <dd className="mt-1.5 font-medium text-on-deep">{children}</dd>
    </div>
  );
}
