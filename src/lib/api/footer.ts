import { fetchAPI } from "@/lib/dataService";
import { transformFooterData } from "@/lib/transformers/footer";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      logo: true,
      socials: true,
      footerMenu: {
        populate: {
          menus: true,
        },
      },
      phone: true,
      email: true,
      location: true,
    },
  },
  { encodeValuesOnly: true }
);

async function getFooterData() {
  const res = await fetchAPI(`footer?${query}`);
  return transformFooterData(res);
}
export const footerData = await getFooterData();
