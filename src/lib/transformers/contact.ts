import { createImageUrl } from "@/lib/utils/imageUtils";
import { ContactPageData } from "@/types/";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformContactPageData(response: any): ContactPageData {
  const data = response?.data;
  return {
    headline: {
      title: data?.title || "Liên hệ với chúng tôi",
      description: data?.description || "",
    },
    contactForm: data?.contactForm ?? null,
    contactInformation: {
      title: data?.contactInformation?.title || "Thông tin liên hệ",
      description: data?.contactInformation?.description || "",
      email: data?.contactInformation?.email ?? "",
      phone: data?.contactInformation?.phone ?? "",
      address: data?.contactInformation?.address ?? "",
      socials: data?.contactInformation?.socials ?? [],
    },
    faqSection: {
      title: data?.faqSection?.title || "Câu hỏi thường gặp",
      faqItems:
        data?.faqSection?.questions?.map((faq: any) => ({
          question: faq?.question || "",
          answer: faq?.answer || [],
        })) || [],
    },

    supportSoftware: {
      title: data?.supportSoftware?.title || "Phần mềm hỗ trợ",
      description: data?.supportSoftware?.description || "",
      supportCards:
        data?.supportSoftware?.cardSupportSoftware?.map((card: any) => ({
          title: card?.title || "",
          description: card?.description || "",
          alt: card?.icon?.alternativeText || "",
          icon: createImageUrl(card?.icon?.url) || "",
          ctaButton: {
            title: card?.ctaButton?.title || "",
            link: card?.ctaButton?.link || null,
          },
        })) || [],
    },
  };
}
