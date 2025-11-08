export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function generateTableOfContents(content: string): TocItem[] {
  if (!content) return [];

  const headings: TocItem[] = [];
  const regex = /<h([2-4])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<\/?[^>]+(>|$)/g, "").trim();
    headings.push({ id, text, level });
  }

  return headings;
}
