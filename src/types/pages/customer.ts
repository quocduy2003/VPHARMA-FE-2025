import { CTASection } from "@/types";

interface HeroSection {
  eyebrow: string;
  mainTitle: string;
  mainDescription: string;
}

export interface Card {
  name: string;
  address: string;
  quote: string;
  image: string;
  alt: string;
}

interface ChallengeSection {
  title: string;
  description: string;
  cards: Card[];
}

interface BrandReviewSection {
  eyebrow: string;
  title: string;
  reviewCards: Card[];
}

interface blog_category {
  name: string;
  slug: string;
}

interface CustBlogSection {
  title: string;
  description: string;
  blog_category: blog_category;
}

export interface CustBlogPost {
  title: string;
  description: string;
  coverImage: {
    url: string;
    alt: string;
  };
  slug: string;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CustomerData extends HeroSection {
  challengeSection: ChallengeSection;
  brandReviewSection: BrandReviewSection;
  custBlogSection: CustBlogSection;
  ctaSection: CTASection;
}

export interface BlogSectionProps {
  slug: string;
  sectionTitle: string;
  sectionDesc: string;
}
