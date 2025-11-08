import { createImageUrl } from "@/lib/utils/imageUtils";
import { FooterData } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformFooterData(response: any): FooterData {
  const { data } = response;
  return {
    description: data?.description || "",
    logo: {
      url: createImageUrl(data?.logo?.url),
      alt: data?.logo?.alternativeText || "Vpharma-AMIT",
    },
    socials:
      data?.socials?.map((socialLink: any) => ({
        id: socialLink?.id,
        title: socialLink?.title,
        link: socialLink?.link,
        target: socialLink?.target,
      })) || [],
    footerMenu:
      data?.footerMenu?.map((menuItem: any) => ({
        title: menuItem?.title,
        menus:
          menuItem?.menus?.map((menu: any) => ({
            id: menu?.id,
            title: menu?.title,
            link: menu?.link,
            target: menu?.target,
          })) || [],
      })) || [],
    phone: {
      title: data?.phone?.title,
      link: data?.phone?.link,
      target: data?.phone?.target,
    },
    email: {
      title: data?.email?.title,
      link: data?.email?.link,
      target: data?.email?.target,
    },
    location: {
      title: data?.location?.title,
      link: data?.location?.link,
      target: data?.location?.target,
    },
  };
}
