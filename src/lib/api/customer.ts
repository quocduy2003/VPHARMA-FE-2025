import { fetchAPI } from "../dataService";
import { CustomerData } from "@/types/pages/customer";
import { transformCustomerData } from "@/lib/transformers/customer";
import { CustBlogPost } from "@/types";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      challengeSection: {
        populate: {
          challengeCards: { populate: "*" },
        },
      },
      brandReviewSection: {
        populate: {
          reviewCards: { populate: "*" },
        },
      },
      custBlogSection: {
        populate: {
          blog_category: { populate: "*" },
        },
      },
      ctaSection: {
        populate: {
          ctaButton: true,
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

async function getCustomerData(queryPath: string): Promise<CustomerData> {
  const endpoint = `customer-page?${queryPath}`;
  const response = await fetchAPI(endpoint);
  return transformCustomerData(response);
}

// Get blogs by category slug
export async function getBlogsByCategorySlug(
  slug: string,
  page: number = 1,
  pageSize: number = 4
): Promise<CustBlogPost> {
  const query = qs.stringify(
    {
      filters: {
        blog_category: {
          slug: {
            $eq: slug,
          },
        },
      },
      fields: ["title", "description", "slug"],
      populate: {
        coverImage: { fields: ["url", "alternativeText"] },
      },
      pagination: {
        page,
        pageSize,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const endpoint = `blog-posts?${query}`;
  const response = await fetchAPI(endpoint);
  return response;
}

export const customerData = await getCustomerData(query);
