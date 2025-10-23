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

  };
}
