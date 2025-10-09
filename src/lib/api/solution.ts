const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { fetchAPI } from "@/lib/dataService";
import { IndependentPharmacyData } from "@/types";
import { combinePopulate } from "@/lib/dataService";
import { transformPageData } from "@/lib/transformers/solution";

//
async function getIndependentPharmacyData(queryPath: string): Promise<IndependentPharmacyData> {
  const endpoint = `independent-pharmacy-solution?${queryPath}`;
  const response = await fetchAPI(endpoint);
  const apiUrl = API_URL || ''; // Đảm bảo API_URL không undefined
  return transformPageData(response, apiUrl); // Đảm bảo API_URL không undefined
}

const independentPharmacyPaths = [
  //heroSection
  ['heroSection', 'hero', 'ctaButtons'],

  //featureSection
  ['featureSection', 'featureGrid'],
  ['featureSection', 'tabs', 'image'],

  //http://localhost:1337/api/independent-pharmacy-solution?
  // populate[heroSection][populate][hero][populate][ctaButton]=*&
  // populate[featureSection][populate][featureGrid]=*&populate[featureSection][populate][tabs][populate]=*
]

function getIndependentPharmacyPopulateQuery(): string {
  return combinePopulate(independentPharmacyPaths);
}


export const independentPharmacyData = await getIndependentPharmacyData(
  getIndependentPharmacyPopulateQuery()
);


