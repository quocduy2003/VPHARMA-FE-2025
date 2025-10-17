"use client";
import type { CTASection } from "@/types";

export default function CTASection({ ctaSection }: { ctaSection: CTASection }) {
  return (
    <section className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-ink p-12 text-center text-white">
            <h2>{ctaSection.title}</h2>
            <p className="mx-auto text-h6 mt-4 max-w-1xl text-white/80">
              {ctaSection.description}
            </p>
            <button className="mt-8 text-sub1 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
              {ctaSection.ctaButton.title}
            </button>
          </div>
        </section>
  );
}
