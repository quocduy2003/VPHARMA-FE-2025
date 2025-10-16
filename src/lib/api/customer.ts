import { fetchAPI } from "../dataService";
import { CustomerData } from "@/types/pages/customer";
import qs from "qs";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

// async function getCustomerData(queryPath: string): Promise<CustomerData> {
//   const endpoint = `customer?${queryPath}`;
//   const response = await fetchAPI(endpoint);
//   const apiUrl = API_URL || "";
//   return "transformCustomerData(response, apiUrl)";
// }