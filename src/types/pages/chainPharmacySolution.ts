import { CtaButton, RichTextBlock, CTASection, FAQSection } from "@/types";
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

export interface ContentCard {
  title: string;
  descriptionBlocks: RichTextBlock[];
  image: string;
  alt: string;
}

interface PharmacyChainChallengesSection {
  title: string;
  description: string;
  challengeCards: ContentCard[];
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
  contents: ContentCard[];
  ctaButton: CtaButton;
}
interface CustomerExperienceSection {
  eyebrow: string;
  title: string;
  cards: {
    title: string;
    description: string;
    image: string;
    alt: string;
  }[];
  ctaButton: CtaButton;
}
interface FeatureOverview {
  eyebrow: string;
  title: string;
  contentCards: Content[];
  ctaButton: CtaButton;
}

interface FeatureCarousel {
  eyebrow: string;
  title: string;
  description: string;
  featureImages: {
    alt: string;
    url: string;
  }[];
}

interface PharmaFeedback {
  title: string;
  description: string;
  cards: {
    name: string;
    address: string;
    alt: string;
    image: string;
  }[];
}

export interface ChainPharmacyData {
  heroSection: HeroSection;
  pharmacyChainChallengesSection: PharmacyChainChallengesSection;
  featureBenefitsSection: FeatureBenefitsSection;
  operationsStandardizationSection: OperationsStandardizationSection;
  customerExperienceSection: CustomerExperienceSection;
  featureOverview: FeatureOverview;
  featureCarousel: FeatureCarousel;
  operationsStandardizationBottomSection: OperationsStandardizationSection;
  pharmaFeedback: PharmaFeedback;
  ctaSection: CTASection;
  faqSection: FAQSection;
}

// Types for other sections can be added here as needed
export interface ChallengeCardProp {
  challengeCard: ContentCard;
}

export interface ChainFeatureCardProps {
  features: ContentCard[];
  direction?: "left" | "right";
  theme?: "light" | "dark";
  variant?: "light" | "dark";
  animation?: boolean;
}
