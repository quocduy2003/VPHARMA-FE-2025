import { CtaButton, RichTextBlock, StrapiImage } from "@/types";
// ---------- Section Types ----------

interface HeroSection {
  eyebrow: string;
  mainTitle: string;
  mainDescription: string;
  ctaButtons: CtaButton[];
  image: StrapiImage;
}

export interface ChainPharmacyData{
    heroSection: HeroSection;
}



