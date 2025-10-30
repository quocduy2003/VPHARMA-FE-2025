import { fetchAPI } from "@/lib/dataService";
import { ChainPharmacyData } from "@/types";

import { transformChainPharmacyData } from "@/lib/transformers/chainPharmacySolution";
import qs from "qs";
const query = qs.stringify(
  {
    populate: {
      heroPharmacyChain: {
        populate: {
          ctaButtons: true,
          image: true,
        },
      },
      pharmacyChainChallengesSection: {
        populate: {
          challengeCards: {
            populate: {
              image: true,
            },
          },
        },
      },
      featureBenefitsSection: {
        populate: {
          image: true,
          contents: true,
        },
      },
      operationsStandardization: {
        populate: {
          contents: {
            populate: {
              image: true,
            },
          },
          ctaButton: true,
        },
      },
      customerExperienceSection: {
        populate: {
          cards: {
            populate: {
              image: true,
            },
          },
          ctaButton: true,
        },
      },
      featureOverview: {
        populate: {
          ctaButton: true,
          contentCards: true,
        },
      },
      featureCarousel: {
        populate: {
          featureImages: true,
        },
      },
      operationsStandardizationBottom: {
        populate: {
          contents: {
            populate: {
              image: true,
            },
          },
          ctaButton: true,
        },
      },
      pharmaFeedback: {
        populate: {
          cards: {
            populate: {
              image: true,
            },
          },
        },
      },
      ctaSection: {
        populate: {
          ctaButton: true,
        },
      },
      faqSection: {
        populate: {
          questions: true,
        },
      },
    },
  },
  { encodeValuesOnly: true }
);
async function getChainPharmacyData(
  queryPath: string
): Promise<ChainPharmacyData> {
  const endpoint = `chain-pharmacy-solution?${queryPath}`;
  const response = await fetchAPI(endpoint);
  return transformChainPharmacyData(response);
}

export const chainPharmacyData = await getChainPharmacyData(query);
