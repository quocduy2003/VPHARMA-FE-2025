import { PricingPageData } from "@/types";
import { fetchAPI } from "@/lib/dataService";
import { transformPricingData } from "@/lib/transformers/pricing";

import qs from "qs";

async function fetchPricingData(): Promise<PricingPageData> {
  const query = qs.stringify(
    {
      populate: {
        pricing_plans: "*",
        feature_categories: {
          populate: {
            features: {
              populate: {
                PlanValue: {
                  populate: {
                    pricing_plan: {
                      fields: ["id"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const response = await fetchAPI(`pricing?${query}`);
  return transformPricingData(response);
}

export const pricingPageData = await fetchPricingData();
