/** Nhúng JSON-LD. Dữ liệu do chính site sinh ra, không phải input người dùng. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
