import { CtaButton, RichTextBlock, StrapiImage } from "@/types";
// ---------- Section Types ----------
interface HeroSection {
  mainTitle: string;
  mainDescription: string;
  ctaButtons: CtaButton[];
  image: StrapiImage;
}

interface FeatureGrid {
  title: string;
  description: string;
}

interface FeatureTab {
  id: number;
  label: string;
  title: string;
  description: RichTextBlock[];
  image: StrapiImage;
}

interface FeatureSection {
  title: string;
  description: string;
  gridItems: FeatureGrid[];
  tabs: FeatureTab[];
}

interface FeatureBenefitsSection {
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

interface FeatureShowcaseSection {
  title: string;
  description: string;
  ctaButton: CtaButton;
  images: StrapiImage[];
}

interface SolutionCard {
  title: string;
  description: string;
  image: ImageData;
}

interface SolutionSection {
  title: string;
  description: string;
  solutionCard: SolutionCard[];
}

interface TestimonialSection {
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

interface CommitmentSection {
  title: string;
  description?: string; // có thể bị typo "desription" trong dữ liệu
  contents: CommitmentContent[];
}

interface CTASection {
  title: string;
  description: string;
  ctaButton: CtaButton;
}

// ---------- Root ----------
export interface IndependentPharmacyData {
  heroSection: HeroSection;
  featureSection: FeatureSection;
  featureBenefitsSection: FeatureBenefitsSection;
  featureShowcaseSection: FeatureShowcaseSection;
//   solutionSection: SolutionSection;
//   testimonialSection: TestimonialSection;
//   CommitmentSection: CommitmentSection;
//   CTASection: CTASection;
}
