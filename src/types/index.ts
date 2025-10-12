export * from "@/types/common";

export * from "@/types/pages/";

import { IndependentPharmacyData } from "@/types";
import { StrapiResponse } from "@/types";

export interface IndependentPharmacyApiResponse extends StrapiResponse {
  data: IndependentPharmacyData;
}
