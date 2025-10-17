/**
 * Tạo URL đầy đủ cho hình ảnh từ Strapi hoặc API.
 * @param apiUrl URL gốc của API (ví dụ: https://example.com/api)
 * @param relativeUrl Đường dẫn hoặc object hình ảnh từ Strapi
 * @returns URL đầy đủ của hình ảnh
 */
import { StrapiImage } from "@/types/common";
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const createImageUrl = (
  relativeUrl: string | null | StrapiImage
): string => {
  if (!relativeUrl) return "/placeholder.png";

  // Nếu relativeUrl là object kiểu StrapiImage
  const imageUrl =
    typeof relativeUrl === "string" ? relativeUrl : relativeUrl.url;

  if (!imageUrl) return "/placeholder.png";

  // Bỏ /api nếu có trong base URL
  const apiBase = API_URL ? API_URL.replace(/\/api$/, "") : "";

  // Đảm bảo đường dẫn luôn bắt đầu bằng /
  const cleanedRelativeUrl = imageUrl.startsWith("/")
    ? imageUrl
    : `/${imageUrl}`;

  return imageUrl.startsWith("http")
    ? imageUrl
    : `${apiBase}${cleanedRelativeUrl}`;
};
