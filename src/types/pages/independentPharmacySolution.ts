import { CtaButton, RichTextBlock, StrapiImage, CTASection, Testimonial } from "@/types";
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
    description: RichTextBlock[];
    image: StrapiImage;
    alt: string;
  }[];
  ctaButton: CtaButton;
}

interface FeatureShowcaseSection {
  title: string;
  description: string;
  ctaButton: CtaButton;
  alt: string;
  images: StrapiImage[];
}

interface SolutionCard {
  title: string;
  description: string;
  ctaButton: CtaButton;
  image: StrapiImage;
}

interface SolutionSection {
  title: string;
  description: string;
  solutionCard: SolutionCard[];
}

interface TestimonialSection {
  title: string;
  testimonials: Testimonial[];
}

interface CommitmentContent {
  title: string;
  description: string;
}

interface CommitmentSection {
  title: string;
  description?: string; // có thể bị typo "desription" trong dữ liệu
  alt?: string;
  image: StrapiImage;
  contents: CommitmentContent[];
}



interface FAQItem {
  question: string;
  answer: string
}
interface FAQSection {
  title: string;
  faqItems: FAQItem[];
}

// ---------- Root ----------
export interface IndependentPharmacyData {
  heroSection: HeroSection;

  featureSection: FeatureSection;

  featureBenefitsSection: FeatureBenefitsSection;

  featureShowcaseSection: FeatureShowcaseSection;

  solutionSection: SolutionSection;

  commitmentSection: CommitmentSection;

  testimonialSection: TestimonialSection;

  ctaSection: CTASection;

  faqSection: FAQSection;
}
