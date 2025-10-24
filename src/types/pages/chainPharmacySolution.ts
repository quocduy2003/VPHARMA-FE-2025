import { CtaButton, RichTextBlock, StrapiImage } from "@/types";
// ---------- Section Types ----------
interface Content {
  title: string;
  description: string;
}
interface HeroSection {
  eyebrow: string;
  title: string;
  description: string;
  ctaButtons: CtaButton[];
  image: string;
  alt: string;
}

export interface ContentCard  {
  title: string;
  descriptionBlocks: RichTextBlock[];
  image: string;
  alt: string;
}

interface PharmacyChainChallengesSection {
  title: string;
  description: string;
  challengeCards: ContentCard [];
}

interface FeatureBenefitsSection {
  title: string;
  description: string;
  contents: Content[];
  image: string;
  alt: string;
}
interface OperationsStandardizationSection {
  eyebrow: string;
  title: string;
  contents: ContentCard [];
  ctaButton: CtaButton;
}

export interface ChainPharmacyData {
  heroSection: HeroSection;
  pharmacyChainChallengesSection: PharmacyChainChallengesSection;
  featureBenefitsSection: FeatureBenefitsSection;
  operationsStandardizationSection: OperationsStandardizationSection;
}

// Types for other sections can be added here as needed
export interface ChallengeCardProp {
  challengeCard: ContentCard;
}


export interface FeatureCardProps {
  features: ContentCard[];
  direction?: "left" | "right";
  animation?: boolean;
}
