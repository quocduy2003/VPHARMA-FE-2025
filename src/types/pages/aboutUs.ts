import { Testimonial, CTASection } from "@/types";

interface SectionHeading {
  eyebrow: string;
  title: string;
  description: string;
}
interface StoryItem {
  title: string;
  description: string;
}
interface cardItem {
  title: string;
  description: string;
  alt: string;
  image: string;
}

interface FounderItem {
  name: string;
  role: string;
  photo: string;
  alt: string;
}

interface StorySection extends SectionHeading {
  __component: "about.story-section";
  items: StoryItem[];
}
interface ValuesSection {
  __component: "about.values-section";
  eyebrow: string;
  title: string;
  cards: cardItem[];
}

interface CTASectionAboutUs extends CTASection {
  __component: "solution.cta-section";
}

interface FounderSection extends SectionHeading {
  __component: "about.founder-section";
  founders: FounderItem[];
}

export type BlockItems =
  | StorySection
  | ValuesSection
  | CTASectionAboutUs
  | FounderSection;

export interface AboutUsData extends SectionHeading {
  blocks: BlockItems[];
}
