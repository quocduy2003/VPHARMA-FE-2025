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
    },
  },
  { encodeValuesOnly: true }
);
async function getChainPharmacyData(queryPath: string): Promise<ChainPharmacyData> {
  const endpoint = `chain-pharmacy-solution?${queryPath}`;
  const response = await fetchAPI(endpoint);
  return transformChainPharmacyData(response);
}

export const chainPharmacyData = await getChainPharmacyData(query);
