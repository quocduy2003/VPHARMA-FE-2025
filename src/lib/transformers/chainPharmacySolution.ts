import { createImageUrl } from "@/lib/utils/imageUtils";
import { ChainPharmacyData } from "@/types/";

export function transformChainPharmacyData(
  response: any,
  apiUrl: string
): ChainPharmacyData {
  const data = response?.data;
  const heroSection = data?.heroPharmacyChain;

  return {
    heroSection: {
      eyebrow: heroSection?.eyebrow || "",
      mainTitle: heroSection?.title || "",
      mainDescription: heroSection?.description || "",
      ctaButtons: heroSection?.ctaButtons || [],
      image: {
        url: createImageUrl( heroSection?.image?.image?.url),
        alt: heroSection?.image?.alt ?? "",
        caption: heroSection?.image?.caption ?? "",
      },
    },
  };
}
