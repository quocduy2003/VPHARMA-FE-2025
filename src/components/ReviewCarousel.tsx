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
  const testimonials = Array.isArray(sectionData?.testimonials) ? sectionData.testimonials : [];
  const bestTestimonials = testimonials.slice(0, 16);

  useEffect(() => {
    if (bestTestimonials.length === 0) return;

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
  }, [repeat, bestTestimonials.length]);

  // Null check after hooks
  if (!sectionData || !sectionData.testimonials || sectionData.testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="container text-center">
        <p className=" text-h6 mb-5 font-bold  tracking-wide text-primary">
          Reviews
        </p>
        <h2 className=" text-black">
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
                  // SỬA: Xóa max-w-[320px] và style inline
                  // SỬA: Thêm class flex-basis responsive
                  className="flex flex-col rounded-lg bg-white p-6 text-left shadow-lg m-3 min-w-[300px] w-full flex-shrink-0 flex-[0_0_90%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%]"
                  // style={{ flex: "0 0 20%" }} // <--- XÓA DÒNG NÀY
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