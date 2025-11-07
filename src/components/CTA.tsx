
"use client";

import Link from "next/link";
// 1. Import type CTASection từ file chung (common.ts)
import type { CTASection as CTASectionType } from "@/types"; // Giả định path là @/types

export default function CTASection({
  ctaSection,
}: {
  ctaSection: CTASectionType;
}) {
  return (
    <section className="container mx-auto py-15 text-center">
      <div className=" rounded-2xl bg-ink p-5">
        <h2 className="mt-10 mx-auto max-w-6xl font-bold text-white mb-5">{ctaSection.title}</h2>
        <p className="mx-auto text-h6 mb-10 max-w-4xl text-white">
          {ctaSection.description}
        </p>
        <Link href={ctaSection.ctaButton.link || "/dang-ky"} passHref>
          <button className="mt-5 mx-auto max-w-3xl rounded-full text-sub2 bg-primary mb-5 px-6 py-3 font-bold text-white hover:opacity-90">
            {ctaSection.ctaButton.title}
          </button>
        </Link>
      </div>
    </section>
  );
}