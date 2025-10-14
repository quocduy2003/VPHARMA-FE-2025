/**
 * Tạo URL đầy đủ cho hình ảnh từ Strapi hoặc API.
 * @param apiUrl URL gốc của API (ví dụ: https://example.com/api)
 * @param relativeUrl Đường dẫn tương đối của hình ảnh (ví dụ: /uploads/image.jpg)
 * @returns URL đầy đủ của hình ảnh
 */
export const createImageUrl = (apiUrl: string, relativeUrl: string | null): string => {
  if (!relativeUrl) return "/placeholder.png";

  const apiBase = apiUrl.replace(/\/api$/, "");
  const cleanedRelativeUrl = relativeUrl.startsWith("/")
    ? relativeUrl
    : `/${relativeUrl}`;

  return `${apiBase}${cleanedRelativeUrl}`;
};