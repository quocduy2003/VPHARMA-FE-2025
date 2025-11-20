
// "use client";

// import Link from "next/link";
// // 1. Import type CTASection từ file chung (common.ts)
// import type { CTASection as CTASectionType } from "@/types"; // Giả định path là @/types

// export default function CTASection({
//   ctaSection,
// }: {
//   ctaSection: CTASectionType;
// }) {
//   return (
//     <section className=" container mx-auto py-15 text-center">
//       <div className=" rounded-2xl bg-ink p-5">
//         <h2 className="mt-10 mx-auto max-w-6xl font-bold text-white mb-5">{ctaSection.title}</h2>
//         <p className="mx-auto text-body2 md:text-sub1 lg:text-h6 mb-7 max-w-2xl text-white lg:max-w-4xl">
//           {ctaSection.description}
//         </p>
//         <Link href={ctaSection.ctaButton.link || "/dang-ky"} passHref>
//           <button className="mt-5 mx-auto max-w-3xl rounded-full text-sub2 bg-primary mb-5 px-6 py-3 font-bold text-white hover:opacity-90">
//             {ctaSection.ctaButton.title}
//           </button>
//         </Link>
        
//       </div>
//     </section>
//   );
// }
"use client";

import Link from "next/link";
import type { CTASection as CTASectionType } from "@/types";

export default function CTASection({
  ctaSection,
}: {
  ctaSection: CTASectionType;
}) {
  return (
    <section className="container mx-auto text-center">
      <div className="rounded-2xl bg-ink px-4 py-6 md:px-8 md:py-12 lg:px-12 lg:py-15 mx-auto">
        <h2 className="mt-6 mx-auto font-bold text-white mb-4 text-h6 md:text-h3 lg:text-h2 max-w-4xl">
          {ctaSection.title}
        </h2>
        <p className="mx-auto text-base md:text-lg lg:text-xl text-white max-w-4xl">
          {ctaSection.description}
        </p>

        {/* BUTTON RESPONSIVE */}
        <Link href={ctaSection.ctaButton.link || "/dang-ky"} passHref>
          <button className="mt-4 mx-auto w-full sm:w-auto rounded-full text-base md:text-lg bg-primary mb-4 px-6 py-3 font-bold text-white hover:opacity-90 transition-all">
            {ctaSection.ctaButton.title}
          </button>
        </Link>
      </div>
    </section>
  );
}
