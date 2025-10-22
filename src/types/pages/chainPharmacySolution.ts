import { CtaButton, RichTextBlock, StrapiImage } from "@/types";
// ---------- Section Types ----------

interface HeroSection {
  eyebrow: string;
  title: string;
  description: string;
  ctaButtons: CtaButton[];
  image: StrapiImage;
}

export interface ChainPharmacyData{
    heroSection: HeroSection;
}



