import { createImageUrl } from "@/lib/utils/imageUtils";
import { HomePageData } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function transformHomePageData(response: any): HomePageData {
  const { data } = response;
  const solutionSection = data?.solutionSection;
  const featureSection = data?.featureSection;
  const experienceSection = data?.experienceSection;
  const testimonialSection = data?.testimonialSection;
  const blogSection = data?.blogSection;
  return {
    eyebrow: data?.eyebrow || "Chuyển đổi số - Xu hướng tất yếu của ngành dược",
    title:
      data?.title || "Giải pháp quản lý nhà thuốc toàn diện cho kỷ nguyên số",
    ctaButton: {
      title: data?.ctaButton?.title || "Tìm hiểu thêm",
      link: data?.ctaButton?.link || "#",
    },
    solutionSection: {
      title:
        solutionSection?.title ||
        "Giải pháp toàn diện cho mọi quy mô nhà thuốc",
      description:
        solutionSection?.description ||
        "Từ nhà thuốc độc lập đến chuỗi nhà thuốc lớn, VPharma cung cấp giải pháp quản lý tối ưu giúp bạn nâng cao hiệu quả vận hành và tăng trưởng bền vững.",
      solutionCards:
        solutionSection?.solutionCards?.map((card: any) => ({
          title: card.title || "",
          alt: card.alt || "",
          image: createImageUrl(card.image || ""),
          ctaButton: {
            title: card?.ctaButton?.title || "Tìm hiểu thêm",
            link: card?.ctaButton?.link || "#",
          },
        })) || [],
      ctaButton: {
        title: solutionSection?.ctaButton?.title || "Tìm hiểu thêm",
        link: solutionSection?.ctaButton?.link || "#",
      },
    },
    featureSection: {
      title: featureSection?.title || "Tính năng nổi bật của VPharma",
      description:
        featureSection?.description ||
        "Khám phá các tính năng ưu việt của VPharma giúp bạn quản lý nhà thuốc hiệu quả, từ quản lý tồn kho, bán hàng đến chăm sóc khách hàng.",
      featureCards:
        featureSection?.featureCards?.map((card: any) => ({
          title: card.title || "",
          description: card.description || "",
          alt: card.alt || "",
          image: createImageUrl(card.image || ""),
        })) || [],
    },
    experienceSection: {
      eyebrow: experienceSection?.eyebrow || "Kinh nghiệm và chuyên môn",
      title:
        experienceSection?.title ||
        "Hơn 10 năm đồng hành cùng hàng trăm nhà thuốc trên toàn quốc",
      alt: experienceSection?.alt || "",
      image: createImageUrl(data?.experienceSection?.image || ""),
      contents:
        experienceSection?.contents?.map((content: any) => ({
          title: content.title || "",
          description: content.description || "",
        })) || [],
    },
    testimonialSection: {
      eyebrow: testimonialSection?.eyebrow || "Khách hàng nói về chúng tôi",
      title: testimonialSection?.title || "Lời chứng thực từ khách hàng",
      testimonials: Array.isArray(testimonialSection?.testimonials)
        ? testimonialSection.testimonials.map((testimonial: any) => ({
            id: testimonial.id,
            authorName: testimonial.authorName ?? "",
            authorLocation: testimonial.authorLocation ?? "",
            quote: testimonial.quote ?? "",
            avatar: {
              url: createImageUrl(testimonial.avatar?.url),
              alt: testimonial.avatar?.alternativeText ?? "Avatar",
            },
          }))
        : [],
    },
    blogSection: {
      title: blogSection?.title || "Cập nhật tin tức và kiến thức ngành dược",
      ctaButton: {
        title: blogSection?.ctaButton?.title || "Xem tất cả bài viết",
        link: blogSection?.ctaButton?.link || "#",
      },
      blogCategories: blogSection?.blog_categories?.map((category: any) => ({
        name: category?.name || "Danh mục",
        slug: category?.slug || "danh-muc",
      })) || [],  
    },
  };
}
