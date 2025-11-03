import { PricingPageData } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function transformPricingData(response: any): PricingPageData {
  const { data } = response || {};
  const pricingPlans = data?.pricing_plans;
  const featureCategories = data?.feature_categories;

  return {
    title: data?.title || "",
    description: data?.description || "",
    pricingPlans:
      pricingPlans?.map((plan: any) => ({
        id: plan?.id,
        name: plan?.name || "",
        price: plan?.price || 0,
        billingCycle: plan?.billingCycle || "",
        trialNote: plan?.trialNote || "",
        audienceNote: plan?.audienceNote || "",
        isFeature: plan?.isFeature || false,
      })) || [],
    featureCategories:
      featureCategories?.map((category: any) => ({
        title: category?.title || "",
        features:
          category?.features?.map((feature: any) => ({
            id: feature?.id,
            name: feature?.name || "",
            PlanValues:
              feature?.PlanValue?.reduce(
                (acc: Record<string, any>, planValue: any) => {
                  const planId = planValue?.pricing_plan?.id;
                  if (planId) {
                    acc[planId] = {
                      value: planValue?.value,
                      isActive: planValue?.isActive || false,
                    };
                  }
                  return acc;
                },
                {}
              ) || {},
          })) || [],
      })) || [],
    faqSection: {
      title: data?.faqSection?.title || "Câu hỏi thường gặp",
      faqItems:
        data?.faqSection?.questions?.map((faq: any) => ({
          question: faq?.question || "",
          answer: faq?.answer || [],
        })) || [],
    },
    ctaSection: {
      title: data?.ctaSection?.title || "",
      description: data?.ctaSection?.description || "",
      ctaButton: {
        title: data?.ctaSection?.ctaButton?.title || "",
        link: data?.ctaSection?.ctaButton?.link || "",
      },
    },
  };
}
