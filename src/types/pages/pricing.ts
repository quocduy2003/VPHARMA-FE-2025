interface PricingPlan {
  id: number;
  name: string;
  price: string;
  billingCycle: string;
  trialNote: string;
  audienceNote: string;
  isFeature: boolean;
}
interface PlanValue {
  id: number;
  value: string | number | boolean | "coming_soon" | "unlimited" | null;
  isActive: boolean | null;
  pricing_plan: { id: number };
}

export interface Feature {
  id: number;
  name: string;
  PlanValues: PlanValue[];
}

interface FeatureCategory {
  title: string;
  features: Feature[];
}

export interface PricingPageData {
  pricingPlans: PricingPlan[];
  featureCategories: FeatureCategory[];
}
