const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

import { fetchAPI } from "@/lib/dataService";
import { ChainPharmacyData } from "@/types";
import { combinePopulate } from "@/lib/dataService";
import { transformChainPharmacyData } from "@/lib/transformers/chainPharmacySolution";


async function getChainPharmacyData(queryPath: string): Promise<ChainPharmacyData> { 
    const endpoint = `chain-pharmacy-solution?${queryPath}`;
    const response = await fetchAPI(endpoint);
    const apiUrl = API_URL || ""; 
    return transformChainPharmacyData(response, apiUrl);
}

const chainPharmacyPaths = [
    //heroSection
    ['heroPharmacyChain', ''],
]


function getChainPharmacyPopulateQuery(): string {
    return combinePopulate(chainPharmacyPaths);
}
export const chainPharmacyData = await getChainPharmacyData(
    getChainPharmacyPopulateQuery()
);