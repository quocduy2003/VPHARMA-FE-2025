import { fetchAPI } from "../dataService";
import qs from "qs";
import { HeaderData } from "@/types";
import {
  transformHeaderData,
  transformHeaderSolutionData,
} from "@/lib/transformers/header";

async function getHeaderData(): Promise<HeaderData> {
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
  const endpoint = `header?${query}`;
  const response = await fetchAPI(endpoint);
  return transformHeaderData(response);
}

async function getHeaderSolutionData() {
  const query = qs.stringify(
    {
      populate: {
        menus: true,
      },
    },
    { encodeValuesOnly: true }
  );
  const endpoint = `header-solution?${query}`;
  const response = await fetchAPI(endpoint);
  return transformHeaderSolutionData(response);
}

export const headerData = await getHeaderData();
export const headerSolutionData = await getHeaderSolutionData();
