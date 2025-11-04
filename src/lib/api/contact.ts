import { fetchAPI } from "@/lib/dataService";
import { ContactPageData } from "@/types";
import { transformContactPageData } from "@/lib/transformers/contact";

import qs from "qs";
async function getContactPageData(): Promise<ContactPageData> {
  const query = qs.stringify(
    {
      populate: {
        contactForm: true,
        contactInformation: {
          populate: {
            email: true,
            phone: true,
            address: true,
            socials: true,
          },
        },
        supportSoftware: {
          populate: {
            cardSupportSoftware: {
              populate: {
                icon: true,
                ctaButton: true,
              },
            },
          },
        },
        faqSection: {
          populate: {
            questions: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const data = await fetchAPI(`contact-page?${query}`);
  return transformContactPageData(data);
}

export const contactData = await getContactPageData();
