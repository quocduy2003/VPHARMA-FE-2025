import { CtaButton } from "@/types/common";

export type HeaderMenuItem = {
  id: number;
  title: string;
  link: string | null;
  level: number;
  target: "_self" | "_blank" | null;
  children: HeaderMenuItem[];
  parent?: { id: number } | null;
};

export interface HeaderData {
  logo: {
    url: string;
    alt: string;
  };
  link: string | null;
  menus: HeaderMenuItem[];
  ctaButtons: CtaButton[];
}


export interface HeaderSolutionData {
  title: string;
  menus: {
    id: number;
    title: string;
    link: string | null;
  };
}