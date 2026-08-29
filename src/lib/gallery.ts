/**
 * Ảnh hoạt động của NIBELC Group — họp với cơ quan ngoại giao, hội chợ ngành,
 * sự kiện công ty. Ảnh thật khách gửi, không dùng ảnh kho.
 *
 * Ghi kèm TỈ LỆ từng ảnh vì bộ ảnh trộn cả dọc lẫn ngang. Không cắt về một
 * khuôn chung: đây là ảnh chụp nhóm, cắt cứng là mất đầu người. Lưới xếp theo
 * cột dòng chảy nên mỗi ảnh giữ nguyên tỉ lệ của nó.
 */
export type GalleryShot = { src: string; ratio: number };

const RATIOS: Record<string, number> = {
  "hd-01": 0.562, "hd-02": 0.725, "hd-03": 1.333, "hd-04": 0.75,
  "hd-05": 1.78, "hd-06": 1.333, "hd-07": 1.333, "hd-08": 0.749,
  "hd-09": 1.78, "hd-10": 0.563, "hd-11": 0.75, "hd-12": 0.75,
  "hd-13": 1.333, "hd-14": 1.333, "hd-15": 1.777, "hd-16": 1.333,
  "hd-17": 0.563, "hd-18": 0.75, "hd-19": 0.734,
};

export const activityShots: GalleryShot[] = Object.entries(RATIOS).map(([id, ratio]) => ({
  src: `/photos/hoat-dong/${id}.jpg`,
  ratio,
}));
