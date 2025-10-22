"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { StrapiImage } from "@/types/common";

type Testimonial = {
  id: number;
  authorName: string;
  authorLocation: string;
  quote: string;
  avatar: StrapiImage;
};

interface TestimonialSection {
  eyebrow?: string;
  title: string;
  testimonials: Testimonial[];
}

interface Props {
  sectionData: TestimonialSection;
}

export default function ReviewCarousel({ sectionData }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const repeat = 2;

  // Lấy tối đa 16 testimonial
  const bestTestimonials = sectionData.testimonials.slice(0, 16);

  useEffect(() => {
    const track = trackRef.current;
    let animationFrame: number;
    let pos = 0;

    const move = () => {
      pos += 0.3;
      if (track) {
        const width = track.scrollWidth / repeat;
        if (pos >= width) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
        animationFrame = requestAnimationFrame(move);
      }
    };
    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [repeat]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2 text-sub2 font-bold uppercase tracking-wide text-primary">
          Reviews
        </p>
        <h2 className="text-h2 font-bold text-black mt-2 mb-8">
          {sectionData.title}
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{ willChange: "transform", transition: "none" }}
          >
            {[...Array(repeat)].flatMap((_, rIdx) =>
              bestTestimonials.map((review, idx) => (
                <div
                  key={`${rIdx}-${idx}`}
                  className="flex flex-col rounded-lg bg-white p-6 text-left shadow-lg m-3 min-w-[300px] max-w-[320px]"
                  style={{ flex: "0 0 20%" }}
                >
                  {review.avatar?.url && (
                    <Image
                      src={review.avatar.url}
                      alt={review.authorName}
                      className="w-12 h-12 rounded-full mb-3 object-cover"
                      loading="lazy"
                      width={48}
                      height={48}
                    />
                  )}
                  <h4 className="text-sub2 font-bold text-black">
                    {review.authorName}
                  </h4>
                  <p className="text-sub2 text-gray-600 italic">
                    {review.authorLocation}
                  </p>
                  <p className="text-body2 flex-grow italic mt-2">
                    “{review.quote}”
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
