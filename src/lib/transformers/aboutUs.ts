import { AboutUsData } from "@/types";
import { createImageUrl } from "@/lib/utils/imageUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function transformAboutUsData(response: any): AboutUsData {
  const { data } = response;

  return {
    eyebrow: data?.eyebrow || "Về chúng tôi",
    title: data?.title || "Câu chuyện và giá trị cốt lõi của VPharma",
    description:
      data?.description ||
      "Chúng tôi là một công ty dược phẩm hàng đầu tại Việt Nam.",
    blocks: data?.blocks
      ?.map((block: any) => {
        switch (block.__component) {
          case "about.story-section":
            return {
              __component: block.__component,
              eyebrow: block.eyebrow,
              title: block.title,
              description: block.description,
              items: block.items?.map((i: any) => ({
                title: i.title,
                description: i.description,
              })),
            };

          case "about.values-section":
            return {
              __component: block.__component,
              eyebrow: block.eyebrow,
              title: block.title,
              cards: block.cards?.map((c: any) => ({
                title: c.title,
                description: c.description,
                image: createImageUrl(c.image?.url),
                alt: c.alt,
              })),
            };

          case "solution.cta-section":
            return {
              __component: block.__component,
              title: block.title,
              description: block.description,
              ctaButton: {
                title: block.ctaButton?.title,
                link: block.ctaButton?.link,
              },
            };

          case "about.founder-section":
            return {
              __component: block.__component,
              eyebrow: block.eyebrow || "Đội Ngũ",
              title: block.title || "Đội Ngũ Chuyên Gia Của Chúng Tôi",
              description:
                block.description ||
                "Chúng tôi là sự kết hợp giữa các kỹ sư công nghệ đam mê và những chuyên gia am hiểu sâu sắc về ngành dược.",
              founders: block.founders?.map((f: any) => ({
                name: f.name,
                role: f.role,
                photo: createImageUrl(f.photo?.url),
                alt: f.alt,
              })),
            };

          default:
            return null;
        }
      })
      .filter(Boolean),
  };
}
