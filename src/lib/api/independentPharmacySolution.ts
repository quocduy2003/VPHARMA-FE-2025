const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
import { fetchAPI } from "@/lib/dataService";
import { IndependentPharmacyData } from "@/types";
import { transformIndependentPharmacyData } from "@/lib/transformers/independentPharmacySolution";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      // Hero Section
      heroSection: {
        populate: {
          hero: {
            populate: {
              ctaButtons: true,
              image: { populate: "*" },
            },
          },
        },
      },

      // Feature Section
      featureSection: {
        populate: {
          featureGrid: { populate: "*" },
          tabs: {
            populate: {
              image: { populate: "*" },
            },
          },
        },
      },

      // Feature Benefits Section
      featureBenefitsSection: {
        populate: {
          contents: { populate: "*" },
          ctaButton: true,
        },
      },

      // Feature Showcase Section
      featureShowcaseSection: {
        populate: {
          images: { populate: "*" },
          ctaButton: true,
        },
      },

      // Solution Section
      independentSolutionSection: {
        populate: {
          independentSolutionCards: {
            populate: {
              ctaButton: true,
              image: true,
            },
          },
        },
      },

      // Commitment Section
      commitmentSection: {
        populate: {
          image: { populate: "*" },
          contents: { populate: "*" },
        },
      },
      // Testimonial Section
      testimonialSection: {
        populate: {
          testimonials : {
            populate: {
              avatar: true,
            }

          },
        },
      },
      // CTA Section
      ctaSection: {
        populate: {
          ctaButton: { populate: "*"},
        },
      },
      // FAQ Section
      faqSection: {
        populate: {
          questions: true,
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

async function getIndependentPharmacyData(
  queryPath: string
): Promise<IndependentPharmacyData> {
  const endpoint = `independent-pharmacy-solution?${queryPath}`;
  const response = await fetchAPI(endpoint);
  return transformIndependentPharmacyData(response);
}

export const independentPharmacyData = await getIndependentPharmacyData(query);
