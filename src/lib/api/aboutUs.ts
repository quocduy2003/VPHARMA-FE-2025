import { fetchAPI } from "@/lib/dataService";
import { transformAboutUsData } from "@/lib/transformers/aboutUs";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          // Story Section
          "about.story-section": {
            populate: {
              items: true,
            },
          },
          // Value Section
          "about.values-section": {
            populate: {
              cards: {
                populate: ["image"],
              },
            },
          },
          // CTA Section
          "solution.cta-section": {
            populate: {
              ctaButton: true,
            },
          },
          // Founder Section
          "about.founder-section": {
            populate: {
              founders: {
                populate: {
                  photo: true,
                }
              },
            },
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

async function getAboutUsData() {
  const res = await fetchAPI(`about?${query}`);
  return transformAboutUsData(res);
}

export const aboutUsData = await getAboutUsData();
