import { createImageUrl } from "@/lib/utils/imageUtils";
import { ChainPharmacyData } from "@/types/";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformChainPharmacyData(response: any): ChainPharmacyData {
  const data = response?.data;
  const heroSection = data?.heroPharmacyChain;
  const pharmacyChainChallengesSection = data?.pharmacyChainChallengesSection;
  const featureBenefitsSection = data?.featureBenefitsSection;
  const operationsStandardizationSection = data?.operationsStandardization;
  const customerExperienceSection = data?.customerExperienceSection;
  const featureOverview = data?.featureOverview;
  const featureCarousel = data?.featureCarousel;
  const operationsStandardizationBottomSection =
    data?.operationsStandardizationBottom;
  const pharmaFeedback = data?.pharmaFeedback;
  const faqSection = data?.faqSection;
  const ctaSection = data?.ctaSection;

  return {
    heroSection: {
      eyebrow: heroSection?.eyebrow || "V-Pharma Chain Pharmacy Solution",
      title:
        heroSection?.title ||
        " Kiểm soát chuỗi nhà thuốc của bạn một cách dễ dàng",
      description: heroSection?.description || "",
      ctaButtons:
        heroSection?.ctaButtons?.map((btn: any) => ({
          title: btn?.title || "",
          link: btn?.link || null,
        })) || [],
      alt: heroSection?.image?.alternativeText || "Hero Image",
      image: createImageUrl(heroSection?.image?.url),
    },
    pharmacyChainChallengesSection: {
      title:
        pharmacyChainChallengesSection?.title ||
        "Những thách thức mà chuỗi nhà thuốc đang đối mặt",
      description: pharmacyChainChallengesSection?.description || "",
      challengeCards:
        pharmacyChainChallengesSection?.challengeCards?.map((card: any) => ({
          title: card?.title || "title",
          descriptionBlocks: card?.description || [],
          alt: card?.image?.alternativeText || "Challenge Card Image",
          image: createImageUrl(card?.image.url),
        })) || [],
    },
    featureBenefitsSection: {
      title: featureBenefitsSection?.title || "Tính năng và lợi ích",
      description: featureBenefitsSection?.description || "",
      contents:
        featureBenefitsSection?.contents?.map((content: any) => ({
          title: content?.title || "",
          description: content?.description || "",
        })) || [],
      alt:
        featureBenefitsSection?.image?.alternativeText ||
        "Feature Benefits Image",
      image: createImageUrl(featureBenefitsSection?.image?.url),
    },
    operationsStandardizationSection: {
      eyebrow:
        operationsStandardizationSection?.eyebrow || "Tiêu chuẩn hóa vận hành",
      title:
        operationsStandardizationSection?.title ||
        "Đồng bộ quy trình vận hành cho chuỗi nhà thuốc",
      contents:
        operationsStandardizationSection?.contents?.map((content: any) => ({
          title: content?.title || "title",
          descriptionBlocks: content?.description || [],
          alt:
            content?.image?.alternativeText ||
            "Operation Standardization Image",
          image: createImageUrl(content?.image?.url),
        })) || [],
      ctaButton: {
        title: operationsStandardizationSection?.ctaButton?.title || "",
        link: operationsStandardizationSection?.ctaButton?.link || null,
      },
    },
    customerExperienceSection: {
      eyebrow:
        customerExperienceSection.eyebrow || "Trải nghiệm khách hàng <<<<<<",
      title:
        customerExperienceSection.title || "Nâng cao trải nghiệm khách hàng",
      cards:
        customerExperienceSection.cards?.map((card: any) => ({
          title: card?.title || "",
          description: card?.description || "",
          alt: card?.image?.alternativeText || "Customer Experience Card Image",
          image: createImageUrl(card?.image.url),
        })) || [],
      ctaButton: {
        title: customerExperienceSection.ctaButton?.title || "",
        link: customerExperienceSection.ctaButton?.link || null,
      },
    },
    featureOverview: {
      eyebrow: featureOverview?.eyebrow || "TỔNG QUAN TÍNH NĂNG",
      title: featureOverview?.title || "Tổng quan tính năng",
      contentCards:
        featureOverview?.contentCards?.map((content: any) => ({
          title: content?.title || "",
          description: content?.description || "",
        })) || [],
      ctaButton: {
        title: featureOverview?.ctaButton?.title || "",
        link: featureOverview?.ctaButton?.link || null,
      },
    },
    featureCarousel: {
      eyebrow: featureCarousel?.eyebrow || "TÍNH NĂNG NỔI BẬT test",
      title: featureCarousel?.title || "Các tính năng nổi bật test",
      description: featureCarousel?.description || "",
      featureImages:
        featureCarousel?.featureImages?.map((featureImage: any) => ({
          alt: featureImage?.alternativeText || "Feature Carousel Image",
          url: createImageUrl(featureImage?.url),
        })) || [],
    },
    operationsStandardizationBottomSection: {
      eyebrow:
        operationsStandardizationBottomSection?.eyebrow ||
        "Tiêu chuẩn hóa vận hành",
      title:
        operationsStandardizationBottomSection?.title ||
        "Đồng bộ quy trình vận hành cho chuỗi nhà thuốc",
      contents:
        operationsStandardizationBottomSection?.contents?.map(
          (content: any) => ({
            title: content?.title || "title",
            descriptionBlocks: content?.description || [],
            alt:
              content?.image?.alternativeText ||
              "Operation Standardization Image",
            image: createImageUrl(content?.image?.url),
          })
        ) || [],
      ctaButton: {
        title: operationsStandardizationBottomSection?.ctaButton?.title || "",
        link: operationsStandardizationBottomSection?.ctaButton?.link || null,
      },
    },
    pharmaFeedback: {
      title: pharmaFeedback?.title || "Phản hồi từ chuỗi nhà thuốc",
      description: pharmaFeedback?.description || "",
      cards:
        pharmaFeedback?.cards?.map((card: any) => ({
          name: card?.name || "",
          address: card?.address || "",
          alt: card?.alt || "Pharma Feedback Card Image",
          image: createImageUrl(card?.image?.url),
        })) || [],
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
    faqSection: {
      title: faqSection?.title || "Câu hỏi thường gặp",
      faqItems:
        faqSection?.questions?.map((item: any) => ({
          question: item?.question || "",
          answer: item?.answer || "",
        })) || [],
    },
  };
}
