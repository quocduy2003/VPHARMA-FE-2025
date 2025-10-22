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
    },
  },
  { encodeValuesOnly: true }
);
async function getChainPharmacyData(queryPath: string) {
  const endpoint = `chain-pharmacy-solution?${queryPath}`;
  const response = await fetchAPI(endpoint);
  return transformChainPharmacyData(response);
}

export const chainPharmacyData = getChainPharmacyData(query);
