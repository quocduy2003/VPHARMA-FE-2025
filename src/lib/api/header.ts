import { fetchAPI } from "../dataService";
import qs from "qs";
import { HeaderData } from "@/types";
import { transformHeaderData } from "@/lib/transformers/header";

const query = qs.stringify(
  {
    populate: {
      logo: true,
      menus: {
        populate: "*",
      },
      ctaButtons: true,
    },
  },
  { encodeValuesOnly: true }
);
async function getHeaderData(): Promise<HeaderData> {
  const endpoint = `header?${query}`;
  const response = await fetchAPI(endpoint);
  return transformHeaderData(response);
}

export const headerData = await getHeaderData();
