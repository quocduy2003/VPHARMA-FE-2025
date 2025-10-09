import { CtaButton } from "@/types/common";
import { FeatureGrid, FeatureTab, IndependentPharmacyData } from "@/types";
import { IndependentPharmacyApiResponse } from "@/types";
const createImageUrl = (apiUrl: string, relativeUrl: string | null): string => {
  if (!relativeUrl) return "/placeholder.png"; // Ảnh mặc định nếu không có
  return `${apiUrl}${relativeUrl}`;
};

export function transformPageData(
  response: any,
  apiUrl: string
): IndependentPharmacyData {
  const { data } = response;

  const heroSection = data?.heroSection?.hero;
  console.log("heroSection", heroSection);
  const featureSection = data?.featureSection;
  // const benefitSection = data?.featureBenefitsSection;
  // const showcaseSection = data?.featureShowcaseSection;
  // const solutionSection = data?.solutionSection;
  // const testimonialSection = data?.testimonialSection;
  // const commitmentSection = data?.CommitmentSection;
  // const ctaSection = data?.CTASection;

  return {
    heroSection: {
      mainTitle: heroSection?.title ?? "Tiêu đề mặc định",
      mainDescription: heroSection?.description ?? "",
      ctaButtons:
        heroSection?.ctaButtons?.map((btn: CtaButton) => ({
          title: btn.title,
          link: btn.link,
        })) ?? [],
    },

    featureSection: {
      title: featureSection?.title ?? "Tính năng",
      description: featureSection?.description ?? "",
      gridItems:
        featureSection?.featureGrid?.map((item: FeatureGrid) => ({
          title: item.title ?? "",
          description: item.description ?? "",
        })) ?? [],
      tabs:
        featureSection?.tabs?.map((tab: FeatureTab) => ({
          label: tab.label ?? "",
          title: tab.title ?? "",
          description: tab.description ?? "",
          image: {
            url: createImageUrl(apiUrl, tab.image?.url),
            alt: tab.image?.alt ?? "",
            caption: tab.image?.caption ?? "",
          },
        })) ?? [],
    },
    // benefits: {
    //   title: benefitSection?.title ?? 'Lợi ích',
    //   description: benefitSection?.description ?? '',
    //   contents: benefitSection?.contents?.map(item => ({
    //     title: item.title ?? '',
    //     description: item.description ?? '',
    //     image: {
    //       url: createImageUrl(apiUrl, item.image?.url),
    //       alternativeText: item.alt ?? '',
    //     },
    //   })) ?? [],
    //   ctaButton: {
    //     title: benefitSection?.ctaButton?.title ?? 'Tìm hiểu thêm',
    //     link: benefitSection?.ctaButton?.link ?? '#',
    //   },
    // },
    // showcase: {
    //   title: showcaseSection?.title ?? '',
    //   description: showcaseSection?.description ?? '',
    //   image: {
    //     url: createImageUrl(apiUrl, showcaseSection?.image?.image?.url),
    //     alternativeText: showcaseSection?.image?.alt ?? '',
    //   },
    //   ctaButton: {
    //     title: showcaseSection?.ctaButton?.title ?? 'Xem chi tiết',
    //     link: showcaseSection?.ctaButton?.link ?? '#',
    //   },
    // },
    // solutions: {
    //   title: solutionSection?.title ?? 'Giải pháp',
    //   description: solutionSection?.description ?? '',
    //   cards: solutionSection?.solutionCard?.map(card => ({
    //     title: card.title ?? '',
    //     description: card.description ?? '',
    //     image: {
    //       url: createImageUrl(apiUrl, card.image?.image?.url),
    //       alternativeText: card.image?.alt ?? '',
    //     },
    //   })) ?? [],
    // },
    // testimonials: {
    //   title: testimonialSection?.title ?? 'Đánh giá từ khách hàng',
    //   testimonialIds: testimonialSection?.testimonials?.map(t => t.id) ?? [],
    // },
    // commitment: {
    //   title: commitmentSection?.title ?? 'Cam kết của chúng tôi',
    //   description: commitmentSection?.desription ?? '', // Giữ nguyên typo nếu API có
    //   contents: commitmentSection?.contents?.map(item => ({
    //     title: item.title ?? '',
    //     description: item.description ?? '',
    //     image: {
    //       url: createImageUrl(apiUrl, item.image?.url),
    //       alternativeText: item.alt ?? '',
    //     },
    //   })) ?? [],
    // },
    // finalCTA: {
    //   title: ctaSection?.title ?? 'Bắt đầu ngay hôm nay',
    //   description: ctaSection?.description ?? '',
    //   ctaButton: {
    //     title: ctaSection?.ctaButton?.title ?? 'Liên hệ',
    //     link: ctaSection?.ctaButton?.link ?? '#',
    //   },
    // },
  };
}
