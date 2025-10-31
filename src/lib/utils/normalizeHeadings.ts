export function normalizeHeadings(content: string): string {
  if (!content) return "";

  // Đổi tất cả <h1> -> <h2> (kể cả có thuộc tính)
  let result = content
    .replace(/<h1(\b[^>]*)>/g, "<h2$1>")
    .replace(/<\/h1>/g, "</h2>");

  // Thêm id vào tất cả heading h2-h6 (giữ nguyên class, style,...)
  result = result.replace(
    /<h([2-6])([^>]*)>(.*?)<\/h\1>/g,
    (match, level, attrs, text) => {
      const id = text
        .toLowerCase()
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&[a-z]+;/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      // Nếu đã có id sẵn thì giữ nguyên
      if (attrs.includes("id=")) return match;

      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    }
  );

  return result;
}
