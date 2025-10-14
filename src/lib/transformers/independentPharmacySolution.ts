  import { CtaButton } from "@/types/common";
  import { IndependentPharmacyData } from "@/types";
  import { createImageUrl } from "@/lib/utils/imageUtils";


  export function transformIndependentPharmacyData(
    response: any,
    apiUrl: string
  ): IndependentPharmacyData {
    const { data } = response;

    const heroSection = data?.heroSection?.hero;
    const featureSection = data?.featureSection;
    const benefitSection = data?.featureBenefitsSection;
    const featureShowcaseSection = data?.featureShowcaseSection;
      console.log("benefitSection", featureShowcaseSection);
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
        image: {
          url: createImageUrl(apiUrl, heroSection?.image?.image?.url),
          alt: heroSection?.image?.alt ?? "",
          caption: heroSection?.image?.caption ?? "",
        },
      },
      featureSection: {
        title: featureSection?.title ?? "Tính năng",
        description: featureSection?.description ?? "",
        gridItems:
          featureSection?.featureGrid?.map((item: any) => ({
            title: item.title ?? "",
            description: item.description ?? "",
          })) ?? [],
        tabs:
          featureSection?.tabs?.map((tab: any) => ({
            id: tab.id,
            label: tab.label ?? "",
            title: tab.title ?? "",
            description: tab.description ?? "",
            image: {
              url: createImageUrl(apiUrl, tab.image?.image?.url ?? null),
              alt: tab.image?.alt ?? "",
              caption: tab.image?.caption ?? "",
            },
          })) ?? [],
      },
    featureBenefitsSection: {
      title: benefitSection?.title ?? "Lợi ích",
      description: benefitSection?.description ?? "",
      contents:
        benefitSection?.contents?.map((item: any) => ({
          title: item.title ?? "",
          description: item.description ?? "",
          image: {
            url: createImageUrl(apiUrl, item.image?.url),
            alt: item.alt ?? "",
          },
        })) ?? [],
      ctaButton: {
        title: benefitSection?.ctaButton?.title ?? "Tìm hiểu thêm",
        link: benefitSection?.ctaButton?.link ?? "#",
      },
    },
    featureShowcaseSection: {
      title: featureShowcaseSection?.title ?? "",
      description: featureShowcaseSection?.description ?? "",
      ctaButton: {
        title: featureShowcaseSection?.ctaButton?.title ?? "Xem chi tiết",
        link: featureShowcaseSection?.ctaButton?.link ?? "#",
      },
      images:
        featureShowcaseSection?.images?.map((image: any) => ({
          url: createImageUrl(apiUrl, image?.image?.url),
          alt: image?.alt ?? "",
        })) ?? [],
    },
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
