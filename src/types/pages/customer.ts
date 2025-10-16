import { CtaButton, StrapiImage } from "../common";

interface HeroSection {
  eyebrow: string;
  mainTitle: string;
  mainDescription: string;
}

interface Card{
  name: string;
  address: string;
  image: StrapiImage;
  alt: string;
}

interface ChallengeSection {
  title: string;
  description: string;
  cards: Card[];
}

interface BrandReviewSection {
  title: string;
  description: string;
  reviewCards: Card[];
}

interface BlogCategory {
    name: string;
    slug: string;
    blogPosts:number;
}

interface CustChallengerSection   {
    title: string;
    description: string;
    blog_category: string;
}

export interface CustomerData extends HeroSection {
  challengeSection: ChallengeSection;
  brandReviewSection: BrandReviewSection;
}