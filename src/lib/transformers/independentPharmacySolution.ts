import { CtaButton } from "@/types/common";
import { IndependentPharmacyData } from "@/types";
import { createImageUrl } from "@/lib/utils/imageUtils";
/* eslint-disable @typescript-eslint/no-explicit-any */

export function transformIndependentPharmacyData(
  response: any,
): IndependentPharmacyData {
  const { data } = response;

  const heroSection = data?.heroSection?.hero;
  const featureSection = data?.featureSection;
  const benefitSection = data?.featureBenefitsSection;
  const featureShowcaseSection = data?.featureShowcaseSection;
  const solutionSection = data?.independentSolutionSection;
  const commitmentSection = data?.commitmentSection;
  const testimonialSection = data?.testimonialSection;
  const ctaSection = data?.ctaSection;
  const faqSection = data?.faqSection;

  return {
    heroSection: {
      mainTitle: heroSection?.title ?? "Tiêu đề mặc định",
      mainDescription: heroSection?.description ?? "",
      ctaButtons:
        heroSection?.ctaButtons?.map((btn: CtaButton) => ({
          title: btn.title,
          link: btn.link,
        })) ?? [],
      image: {
        url: createImageUrl(heroSection?.image?.image?.url),
        alt: heroSection?.image?.alt ?? "",
        caption: heroSection?.image?.caption ?? "",
      },
    },
    featureSection: {
      title: featureSection?.title ?? "Tính năng",
      description: featureSection?.description ?? "",
      gridItems:
        featureSection?.featureGrid?.map((item: any) => ({
          title: item.title ?? "",
          description: item.description ?? "",
        })) ?? [],
      tabs:
        featureSection?.tabs?.map((tab: any) => ({
          id: tab.id,
          label: tab.label ?? "",
          title: tab.title ?? "",
          description: tab.description ?? "",
          image: {
            url: createImageUrl(tab.image?.image?.url ?? null),
            alt: tab.image?.alt ?? "",
            caption: tab.image?.caption ?? "",
          },
        })) ?? [],
    },
    featureBenefitsSection: {
      title: benefitSection?.title ?? "Lợi ích",
      description: benefitSection?.description ?? "",
      contents:
        benefitSection?.contents?.map((item: any) => ({
          title: item.title ?? "",
          description: item.description ?? "",
          alt: item.alt ?? "V-pharma Benefit Image",
          image: {
            url: createImageUrl(item.image?.url),
          },
        })) ?? [],
      ctaButton: {
        title: benefitSection?.ctaButton?.title ?? "Tìm hiểu thêm",
        link: benefitSection?.ctaButton?.link ?? "#",
      },
    },
    featureShowcaseSection: {
      title: featureShowcaseSection?.title ?? "",
      description: featureShowcaseSection?.description ?? "",
      ctaButton: {
        title: featureShowcaseSection?.ctaButton?.title ?? "Xem chi tiết",
        link: featureShowcaseSection?.ctaButton?.link ?? "#",
      },
      alt: featureShowcaseSection?.alt ?? "V-pharma Showcase Image",
      images:
        featureShowcaseSection?.images?.map((image: any) => ({
          url: createImageUrl(image?.image?.url),
          alt: image?.alt ?? "V-pharma Showcase Image",
        })) ?? [],
    },
    solutionSection: {
      title: solutionSection?.title ?? "Giải pháp",
      description:
        solutionSection?.description ??
        "Giải pháp của chúng tôi bao gồm các tính năng sau:",
      solutionCard:
        solutionSection?.independentSolutionCards?.map((card: any) => ({
          title: card.title ?? "",
          description: card.description ?? "",
          alt: card.alt ?? "V-pharma Solution Image",
          ctaButton: {
            title: card.ctaButton?.title ?? "Tìm hiểu thêm",
            link: card.ctaButton?.link ?? "#",
          },
          image: {
            url: createImageUrl(card.image?.url),
          },
        })) ?? [],
    },

    commitmentSection: {
      title: commitmentSection?.title ?? "Cam kết của chúng tôi!!!",
      description: commitmentSection?.description ?? "",
      image: {
        url: createImageUrl(commitmentSection?.image?.url),
      },
      alt: commitmentSection?.alt ?? "",
      contents:
        commitmentSection?.contents?.map((item: any) => ({
          title: item.title ?? "",
          description: item.description ?? "",
        })) ?? [],
    },
    testimonialSection: {
      title: testimonialSection?.title ?? "Khách hàng nói về chúng tôi",
      testimonials:
        testimonialSection?.testimonials?.map((item: any) => ({
          id: item.id,
          authorName: item.authorName ?? "",
          authorLocation: item.authorLocation ?? "",
          quote: item.quote ?? "",
          avatar: {
            url: createImageUrl(item.avatar?.url),
            alt: item.avatar?.alternativeText ?? "Avatar",
          },
        })) ?? [],
    },

    ctaSection: {
      title: ctaSection?.title ?? "Sẵn sàng số hóa nhà thuốc của bạn?",
      description: ctaSection?.description ?? "",
      ctaButton: {
        title: ctaSection?.ctaButton?.title ?? "Liên hệ",
        link: ctaSection?.ctaButton?.link ?? "#",
      },
    },

    faqSection: {
      title: faqSection?.title ?? "Câu hỏi thường gặp",
      faqItems:
        faqSection?.questions?.map((item: any) => ({
          question: item.question ?? "",
          answer: item.answer ?? "",
        })) ?? [],
    },
  };
}
