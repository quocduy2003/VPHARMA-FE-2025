export interface StrapiResponse {
  data: any; // Sẽ được ghi đè bởi kiểu cụ thể
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
  alt: string;
  caption?: string;
  image?: StrapiFile;
}
export interface CtaButton {
  title: string;
  link?: string | null;
}

export interface RichTextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface RichTextLink {
  type: 'link';
  url: string;
  children: RichTextNode[];
  newTab?: boolean;
}


export type RichTextChild = RichTextNode | RichTextLink;


export interface RichTextBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'code';
  children: RichTextChild[];
  // Attributes specific to certain block types
  level?: number; // Used for headings (h1, h2, h3...)
  format?: 'ordered' | 'unordered'; // Used for lists (ul, ol)
}