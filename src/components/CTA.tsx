"use client";

import Link from "next/link";
import type { CTASection as CTASectionType } from "@/types";
import { Button } from "@/components/ui/CTAButton";

export default function CTASection({
  ctaSection,
}: {
  ctaSection: CTASectionType;
}) {
  return (
    <section className="container mx-auto text-center px-4 md:px-0">
      <div className="rounded-2xl bg-ink px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 mx-auto">
        <h2 className="mt-2 mx-auto font-bold text-white mb-4 text-h5 md:text-h3 lg:text-h2 max-w-4xl">
          {ctaSection.title}
        </h2>
        <p className="mx-auto text-body2 md:text-sub1 lg:text-h6 text-white max-w-4xl mb-8 md:mb-10">
          {ctaSection.description}
        </p>
        
        {/* CẬP NHẬT: Wrapper căn giữa và Button full-width mobile */}
        <div className="flex items-center justify-center">
          <Button
            size="md"
            href={ctaSection.ctaButton.link || "/signup"}
            className="w-full md:w-auto shadow-lg"
          >
            {ctaSection.ctaButton.title}
          </Button>
        </div>
        
      </div>
    </section>
  );
}