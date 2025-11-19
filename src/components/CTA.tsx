
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
    <section className="container mx-auto py-10 md:py-16 px-4">
      {/* Container: Tăng padding cho Tablet/Desktop (md:p-12) để thoáng hơn */}
      <div className="rounded-2xl bg-ink p-6 md:p-12 lg:py-16 text-center shadow-xl">
        
        {/* Title: Responsive font size */}
        <h2 className="mx-auto max-w-5xl font-bold text-white mb-4 md:mb-6">
          {ctaSection.title}
        </h2>

        {/* Description: Màu trắng pha chút trong suốt để dịu mắt hơn, responsive size */}
        <p className="mx-auto mb-8 md:mb-10 max-w-2xl lg:max-w-4xl text-white/90 text-body2 md:text-sub1 lg:text-h6 leading-relaxed">
          {ctaSection.description}
        </p>

        {/* BUTTON RESPONSIVE */}
        <Link href={ctaSection.ctaButton.link || "/dang-ky"} passHref>
          <button className="
            /* 1. Layout & Sizing */
            w-full sm:w-auto               /* Mobile: Full chiều ngang. Tablet trở lên: Co theo nội dung */
            inline-flex items-center justify-center
            
            /* 2. Spacing (Padding) */
            px-6 py-3                    /* Mobile: Padding vừa vặn */
            md:px-8 md:py-3               /* Tablet/Desktop: Padding rộng hơn, nút to đẹp hơn */
            
            /* 3. Typography */
            text-body2 md:text-sub2        /* Mobile: chữ 16px. Tablet: chữ 18px */
            font-bold text-white
            
            /* 4. Style & Hệu ứng */
            bg-primary rounded-full
            transition-all duration-300    /* Chuyển động mượt */
            hover:brightness-110 hover:shadow-lg /* Hiệu ứng chuột (Desktop) */
            active:scale-95                /* Hiệu ứng nhấn lún xuống (Mobile touch feeling) */
          ">
            {ctaSection.ctaButton.title}
          </button>
        </Link>
      </div>
    </section>
  );
}