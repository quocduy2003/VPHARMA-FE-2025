import { HeaderData, HeaderSolutionData } from "@/types";
import { createImageUrl } from "@/lib/utils/imageUtils";
import { mainNavLinks, ctaButtons } from "@/data/header";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformHeaderData(response: any): HeaderData {
  const { data } = response;
  return {
    logo: {
      url: createImageUrl(data?.logo?.url),
      alt: data?.logo?.alt,
    },
    link: data?.link,
    menus:
      data?.menus?.map((menuItem: any) => ({
        id: menuItem?.id,
        title: menuItem?.title,
        link: menuItem?.link,
        level: menuItem?.level,
        target: menuItem?.target,
        children: menuItem?.children || [],
        parent: menuItem?.parent?.id || null,
      })) || mainNavLinks,
    ctaButtons:
      data?.ctaButtons?.map((ctaButton: any) => ({
        title: ctaButton?.title,
        link: ctaButton?.link,
      })) || ctaButtons,
  };
}

export function transformHeaderSolutionData(response: any): HeaderSolutionData {
  const { data } = response;
  return {
    title: data?.title || "",
    menus:
      data?.menus?.map((menuItem: any) => ({
        id: menuItem?.id,
        title: menuItem?.title,
        link: menuItem?.link,
      })) || [],
  };
}
