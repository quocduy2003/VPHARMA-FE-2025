"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/types";

interface PharmacyCarouselProps {
  cards: Card[];
}

export default function PharmacyCarousel({ cards }: PharmacyCarouselProps) {
  const totalSlidesPharmacy = cards.length;
  const cardsPerView = 3;
  const cardWidth = 350; // px
  const cardGap = 32; // 8 * 4px = 32px do dùng mx-4
  const step = cardWidth + cardGap;
  const [indexPharmacy, setIndexPharmacy] = useState(0);

  const handlePrevPharmacy = () => {
    setIndexPharmacy((prev) =>
      prev === 0 ? totalSlidesPharmacy - cardsPerView : prev - 1
    );
  };

  const handleNextPharmacy = () => {
    setIndexPharmacy((prev) =>
      prev >= totalSlidesPharmacy - cardsPerView ? 0 : prev + 1
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Carousel container */}
      <div className="w-full max-w-6xl overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${indexPharmacy * step}px)`,
            width: `${cards.length * step}px`,
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="mx-4 min-w-[350px] max-w-[350px] flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition hover:shadow-xl"
              style={{ height: 350 }}
            >
              <div className="p-7">
                <h3 className="mb-2 text-black font-semibold">{card.name}</h3>
                <p className="mb-4 text-sub1 text-black">{card.address}</p>
                <div className="mt-3 flex flex-col items-center rounded-lg py-6 px-4">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={310}
                    height={110}
                    className="h-[110px] w-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="relative mx-auto mt-10 w-30">
        <button
          onClick={handlePrevPharmacy}
          className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100"
          aria-label="Previous"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNextPharmacy}
          className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100"
          aria-label="Next"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
