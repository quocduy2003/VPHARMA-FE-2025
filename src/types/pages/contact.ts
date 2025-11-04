import { CtaButton, FAQSection } from "@/types";

interface Headline {
  title: string;
  description: string;
}
interface Social {
  platform: string;
  url: string;
}
interface ContactInformation extends Headline {
  email: Social;
  phone: Social;
  address: Social;
  socials: Social[];
}
interface cardSupportSoftware {
  title: string;
  description: string;
  alt: string;
  icon: string;
  ctaButton: CtaButton;
}
interface SupportSoftware {
  title: string;
  description: string;
  supportCards: cardSupportSoftware[];
}

export interface ContactPageData {
  headline: Headline;
  contactForm: Headline;
  contactInformation: ContactInformation;
  faqSection: FAQSection;
  supportSoftware: SupportSoftware;
}
