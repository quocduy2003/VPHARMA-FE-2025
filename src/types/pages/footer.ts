export interface FooterData {
  description: string;
  logo: {
    url: string;
    alt: string;
  };
  socials: SocialLink[];
  footerMenu: FooterMenuItem[];
  phone: SocialLink;
  email: SocialLink;
  location: SocialLink;
}

export type FooterMenuItem = {
  title: string;
  menus: {
    id: number;
    title: string;
    link: string;
    target: "_self" | "_blank" | null;
  }[];
};
export interface SocialLink {
  title: string;
  link: string;
  target: "_self" | "_blank" | null;
}
