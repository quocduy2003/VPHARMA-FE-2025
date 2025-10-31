import { fetchAPI } from "@/lib/dataService";
import qs from "qs";
import { HomePageData } from "@/types";
import { transformHomePageData } from "@/lib/transformers/home";

const query = qs.stringify(
  {
    populate: {
      ctaButton: true,
      solutionSection: {
        populate: {
          solutionCards: {
            populate: {
              ctaButton: true,
              image: true,
            },
          },
        },
      },
      featureSection: {
        populate: {
          featureCards: {
            populate: {
              image: true,
            },
          },
        },
      },
      experienceSection: {
        populate: {
          contents: true,
          image: true,
        },
      },
      testimonialSection: {
        populate: {
          testimonials: {
            populate: {
              avatar: true,
            },
          },
        },
      },
      blogSection: {
        populate: {
          ctaButton: true,
          blog_categories: {
            populate: "*",
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

async function getHomePageData(queryPath: string): Promise<HomePageData> {
  const endpoint = `homepage?${queryPath}`;
  const response = await fetchAPI(endpoint);
  return transformHomePageData(response);
}

export const homePageData = await getHomePageData(query);
