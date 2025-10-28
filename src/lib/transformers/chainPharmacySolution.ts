import { createImageUrl } from "@/lib/utils/imageUtils";
import { ChainPharmacyData } from "@/types/";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformChainPharmacyData(
  response: any,
): ChainPharmacyData {
  const data = response?.data;
  const heroSection = data?.heroPharmacyChain;
  const pharmacyChainChallengesSection = data?.pharmacyChainChallengesSection;
  const featureBenefitsSection = data?.featureBenefitsSection;
  const operationsStandardizationSection = data?.operationsStandardization;
  const customerExperienceSection = data?.customerExperienceSection;
  return {
    heroSection: {
      eyebrow: heroSection?.eyebrow || "V-Pharma Chain Pharmacy Solution",
      title: heroSection?.title || " Kiểm soát chuỗi nhà thuốc của bạn một cách dễ dàng",
      description: heroSection?.description || "",
      ctaButtons: heroSection?.ctaButtons?.map((btn: any) => ({
        title: btn?.title || "",
        link: btn?.link || null,
      })) || [],
      alt: heroSection?.image?.alternativeText || "Hero Image",
      image: createImageUrl( heroSection?.image.url),
    },
    pharmacyChainChallengesSection: {
      title: pharmacyChainChallengesSection?.title || "Những thách thức mà chuỗi nhà thuốc đang đối mặt",
      description: pharmacyChainChallengesSection?.description || "",
      challengeCards: pharmacyChainChallengesSection?.challengeCards?.map((card: any) => ({
        title: card?.title || "title",
        descriptionBlocks: card?.description  || [],
        alt: card?.image?.alternativeText || "Challenge Card Image",
        image: createImageUrl( card?.image.url),
      })) || [],
    },
    featureBenefitsSection: {
      title: featureBenefitsSection?.title || "Tính năng và lợi ích",
      description: featureBenefitsSection?.description || "",
      contents: featureBenefitsSection?.contents?.map((content: any) => ({
        title: content?.title || "",
        description: content?.description || "",
      })) || [],
      alt: featureBenefitsSection?.image?.alternativeText || "Feature Benefits Image",
      image: createImageUrl( featureBenefitsSection?.image.url),
    },
    operationsStandardizationSection: {
      eyebrow: operationsStandardizationSection?.eyebrow || "Tiêu chuẩn hóa vận hành",
      title: operationsStandardizationSection?.title || "Đồng bộ quy trình vận hành cho chuỗi nhà thuốc",
      contents: operationsStandardizationSection?.contents?.map((content: any) => ({
        title: content?.title || "title",
        descriptionBlocks: content?.description  || [],
        alt: content?.image?.alternativeText || "Operation Standardization Image",
        image: createImageUrl( content?.image.url),
      })) || [],
      ctaButton: {
        title: operationsStandardizationSection?.ctaButton?.title || "",
        link: operationsStandardizationSection?.ctaButton?.link || null,
      }
    },
    customerExperienceSection: {
      eyebrow: customerExperienceSection.eyebrow || "Trải nghiệm khách hàng <<<<<<",
      title: customerExperienceSection.title || "Nâng cao trải nghiệm khách hàng",
      cards: customerExperienceSection.cards?.map((card: any) => ({
        title: card?.title || "",
        description: card?.description || "",
        alt: card?.image?.alternativeText || "Customer Experience Card Image",
        image: createImageUrl( card?.image.url),
      })) || [],
      ctaButton: {
        title: customerExperienceSection.ctaButton?.title || "",
        link: customerExperienceSection.ctaButton?.link || null,
      }
    },
    featureOverview: {
      eyebrow: data?.featureOverview?.eyebrow || "TỔNG QUAN TÍNH NĂNG",
      title: data?.featureOverview?.title || "Tổng quan tính năng",
      contentCards: data?.featureOverview?.contentCards?.map((content: any) => ({
        title: content?.title || "",
        description: content?.description || "",
      })) || [],
      ctaButton: {
        title: data?.featureOverview?.ctaButton?.title || "",
        link: data?.featureOverview?.ctaButton?.link || null,
      }
    },
  };
}
