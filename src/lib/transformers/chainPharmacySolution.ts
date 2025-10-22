import { createImageUrl } from "@/lib/utils/imageUtils";
import { ChainPharmacyData } from "@/types/";

export function transformChainPharmacyData(
  response: any,
): ChainPharmacyData {
  const data = response?.data;
  const heroSection = data?.heroPharmacyChain;

  return {
    heroSection: {
      eyebrow: heroSection?.eyebrow || "",
      title: heroSection?.title || "",
      description: heroSection?.description || "",
      ctaButtons: heroSection?.ctaButtons || [],
      image: {
        url: createImageUrl( heroSection?.image?.image?.url),
        alt: heroSection?.image?.alt ?? "",
        caption: heroSection?.image?.caption ?? "",
      },
    },
  };
}
