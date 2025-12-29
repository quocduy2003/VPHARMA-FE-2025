import { CustomerData } from "@/types/pages/customer";
import { createImageUrl } from "@/lib/utils/imageUtils";
import { Card, CustBlogPost } from "@/types/pages/customer";


/* eslint-disable @typescript-eslint/no-explicit-any */

export function transformCustomerData(response: any): CustomerData {
  const { data } = response;
  const challengeSection = data?.challengeSection;
  const brandReviewSection = data?.brandReviewSection;
  const custBlogSection = data?.custBlogSection;

  return {
    eyebrow:
      data?.eyebrow ||
      "Sự hài lòng của khách hàng là niềm tự hào của chúng tôi?",
    mainTitle:
      data?.title || "Hành trình thành công của hơn 500 chuỗi nhà thuốc Việt?",
    mainDescription:
      data?.description ||
      "Đồng hành với các nhà thuốc và chuỗi nhà thuốc nổi tiếng giúp bạn quản lý tập trung, tối ưu vận hành và tăng trưởng doanh thu bền vững.",

    challengeSection: {
      title: challengeSection?.title || "",
      description: challengeSection?.description || "",
      cards:
        challengeSection?.cards?.map((card: Card) => ({
          ...card,
          image: createImageUrl(card.image || ""),
        })) || [],
    },
    brandReviewSection: {
      eyebrow: brandReviewSection?.eyebrow || "",
      title: brandReviewSection?.title || "",
      reviewCards:
        brandReviewSection?.reviewCards?.map((card: Card) => ({
          ...card,
          image: createImageUrl(card.image || ""),
        })) || [],
    },
    custBlogSection: {
      title: custBlogSection?.title || "Những bài viết nổi bật",
      description:
        custBlogSection?.description || "Cập nhật xu hướng và kiến thức mới nhất về chuyển đổi số trong ngành dược.",
      blog_category: {
        name: custBlogSection?.blog_category?.name || "Tin tức",
        slug: custBlogSection?.blog_category?.slug || "tin-tuc",
      },
      buttonTitle: custBlogSection?.buttonTitle || "Xem thêm",
    },
    ctaSection: {
      title:
        data?.ctaSection?.title ||
        "Bắt đầu hành trình chuyển đổi số ngay hôm nay",
      description: data?.ctaSection?.description || "",
      ctaButton: {
        title: data?.ctaSection?.ctaButton?.title || "Tìm hiểu thêm",
        link: data?.ctaSection?.ctaButton?.link || "#",
      },
    },
  };
}

export function transformCustomerBlogData(response: any): CustBlogPost[] {
  const { data } = response;
  return (
    data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      coverImage: {
        url: createImageUrl(item.coverImage.url) || "",
        alt: item.title || "Blog Image",
      },
    })) || []
  );
}
