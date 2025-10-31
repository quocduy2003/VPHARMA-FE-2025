import { PricingPageData } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function transformPricingData(response: any): PricingPageData {
  const { data } = response;
  const pricingPlans = data?.pricing_plans;
  const featureCategories = data?.feature_categories;

  return {
    pricingPlans: pricingPlans?.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      billingCycle: plan.billingCycle,
      trialNote: plan.trialNote,
      audienceNote: plan.audienceNote,
      isFeature: plan.isFeature,
    })),
    featureCategories: featureCategories?.map((category: any) => ({
      title: category.title,
      features: category.features.map((feature: any) => ({
        id: feature.id,
        name: feature.name,
        PlanValues: feature.PlanValue.reduce(
          (acc: Record<string, any>, planValue: any) => {
            const planId = planValue.pricing_plan.id;
            acc[planId] = {
              value: planValue.value,
              isActive: planValue.isActive,
            };
            return acc;
          },
          {}
        ),
      })),
    })),
  };
}
