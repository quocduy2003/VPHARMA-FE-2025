
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
    <section className="py-10">
      <div className="container rounded-2xl bg-ink text-center text-white">
        <h2 className="mb-8 font-bold">{ctaSection.title}</h2>
        <p className="mx-auto text-h6 mb-10 max-w-3xl text-white">
          {ctaSection.description}
        </p>
        <Link href={ctaSection.ctaButton.link || "/lien-he"} passHref>
          <button className="mt-8 mx-auto max-w-3xl rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
            {ctaSection.ctaButton.title}
          </button>
        </Link>
      </div>
    </section>
  );
}