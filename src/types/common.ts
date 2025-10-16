export interface StrapiResponse {
  data: unknown; // Sẽ được ghi đè bởi kiểu cụ thể
  meta: {
    pagination?: any;
  };
}

export interface StrapiFile {
  url: string;
  name?: string;
  mime?: string;
  size?: number;
  alternativeText?: string;
  caption?: string;
}

//
export interface StrapiImage {
  url: string;
  alt?: string;
  caption?: string;
  image?: StrapiFile;
}
export interface CtaButton {
  title: string;
  link: string | null;
}
export interface RichTextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  color?: string; // thêm để dễ custom màu chữ sau này
}

export interface RichTextLink {
  type: "link";
  url: string;
  children: RichTextChild[];
  newTab?: boolean;
}

export interface RichTextListItem {
  type: "list-item";
  children: RichTextChild[];
}

export type RichTextChild = RichTextNode | RichTextLink | RichTextListItem;

export interface RichTextListItem {
  type: "list-item";
  children: RichTextChild[];
}

export interface RichTextBlock {
  type: "paragraph" | "heading" | "list" | "quote" | "code";
  children: RichTextChild[];

  level?: number; // heading level: h1-h6
  format?: "ordered" | "unordered"; // list type
  alignment?: "left" | "center" | "right" | "justify"; // canh lề
}
