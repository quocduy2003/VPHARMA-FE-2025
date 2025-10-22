// "use client";
// import type { CTASection } from "@/types";


// export default function CTASection({ ctaSection }: { ctaSection: CTASection }) {
//   return (
//     <section className="container mx-auto px-4 py-20">
//           <div className="rounded-2xl bg-ink p-12 text-center text-white">
//             <h2>{ctaSection.title}</h2>
//             <p className="mx-auto text-h6 mt-4 max-w-1xl text-white/80">
//               {ctaSection.description}
//             </p>
//             <button className="mt-8 text-sub1 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
//               {ctaSection.ctaButton.title}
//             </button>
//           </div>
//         </section>
//   );
// }
"use client";

import Link from "next/link";
// 1. Import type CTASection từ file chung (common.ts)
import type { CTASection as CTASectionType } from "@/types"; // Giả định path là @/types

// 2. Cập nhật props để sử dụng type đã import
export default function CTASection({
  ctaSection,
}: {
  ctaSection: CTASectionType;
}) {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="rounded-2xl bg-ink p-12 text-center text-white">
        {/* 3. Sử dụng dữ liệu từ prop ctaSection */}
        <h2 className="text-h3 font-bold">{ctaSection.title}</h2>
        <p className="mx-auto text-h6 mt-4 max-w-1xl text-white/80">
          {ctaSection.description}
        </p>

        {/* 4. Dùng Link của Next.js và bọc button bên trong */}
        <Link href={ctaSection.ctaButton.link || "#"} passHref>
          <button className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
            {ctaSection.ctaButton.title}
          </button>
        </Link>
      </div>
    </section>
  );
}