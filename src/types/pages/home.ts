import { CtaButton, Testimonial, BlogCategory } from "@/types";

interface Hero {
  eyebrow: string;
  title: string;
  ctaButton: CtaButton;
}

interface CardItem {
  title: string;
  alt: string;
  image: string;
  ctaButton: CtaButton;
}

interface SolutionSection {
  title: string;
  description: string;
  solutionCards: CardItem[];
  ctaButton: CtaButton;
}
interface FeatureCard {
  title: string;
  description: string;
  alt: string;
  image: string;
}

interface FeatureSection {
  title: string;
  description: string;
  featureCards: FeatureCard[];
}
interface Content {
  title: string;
  description: string;
}
interface ExperienceSection {
  eyebrow: string;
  title: string;
  alt: string;
  image: string;
  contents: Content[];
}
interface TestimonialSection {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
}

export interface FeatureCardProps {
  features: FeatureCard[];
  direction?: "left" | "right";
  animation?: boolean;
}
interface BlogSection{
  title:string;
  ctaButton:CtaButton;
  blogCategories: BlogCategory[];
}

export interface HomePageData extends Hero {
  solutionSection: SolutionSection;
  featureSection: FeatureSection;
  experienceSection: ExperienceSection;
  testimonialSection: TestimonialSection;
  blogSection: BlogSection;
}


// Types for other sections can be added here as needed
export interface FeatureCardHomeProps {
  features: FeatureCard[];
  direction?: "left" | "right";
  variant?: "light" | "dark";
}