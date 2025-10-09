

 
export interface StrapiResponse {
  data: any; // Sẽ được ghi đè bởi kiểu cụ thể
  meta: {
    pagination?: any;
  };
}

//
export interface StrapiImage {
  url: string
  alt: string
  caption?: string
}
export interface CtaButton {
  title: string;
  link?: string | null;
}
export interface RichTextNode {
  type: string;
  text: string;
}
