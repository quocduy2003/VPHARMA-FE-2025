import { CtaButton, RichTextBlock, StrapiImage } from "@/types";
// ---------- Section Types ----------
export interface HeroSection {
  mainTitle: string;
  mainDescription: string;
  ctaButtons: CtaButton[];
  image: StrapiImage;
}

export interface FeatureGrid {
  title: string;
  description: string;
}

export interface FeatureTab {
  id: number;
  label: string;
  title: string;
  description: RichTextBlock[];
  image: StrapiImage;
}

export interface FeatureSection {
  title: string;
  description: string;
  gridItems: FeatureGrid[];
  tabs: FeatureTab[];
}

export interface FeatureBenefitsSection {
  title: string;
  description: string;
  contents: {
    title: string;
    description: string;
    image: StrapiImage;
    alt?: string;
  }[];
  ctaButton: CtaButton;
}

export interface FeatureShowcaseSection {
  title: string;
  description: string;
  ctaButton: CtaButton;
  image: ImageData;
}

export interface SolutionCard {
  title: string;
  description: string;
  image: ImageData;
}

export interface SolutionSection {
  title: string;
  description: string;
  solutionCard: SolutionCard[];
}

export interface TestimonialSection {
  title: string;
  testimonials: {
    id: number;
  }[];
}

export interface CommitmentContent {
  title: string;
  description: string;
  image: StrapiImage;
  alt?: string;
}

export interface CommitmentSection {
  title: string;
  description?: string; // có thể bị typo "desription" trong dữ liệu
  contents: CommitmentContent[];
}

export interface CTASection {
  title: string;
  description: string;
  ctaButton: CtaButton;
}

// ---------- Root ----------
export interface IndependentPharmacyData {
  heroSection: HeroSection;
  featureSection: FeatureSection;
  featureBenefitsSection: FeatureBenefitsSection;
//   featureShowcaseSection: FeatureShowcaseSection;
//   solutionSection: SolutionSection;
//   testimonialSection: TestimonialSection;
//   CommitmentSection: CommitmentSection;
//   CTASection: CTASection;
}
