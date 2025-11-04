// src/components/CustomerCarousel.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel"; 
import Autoplay from "embla-carousel-autoplay";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"; 

type Card = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

type PropType = {
  cards: Card[];
};

export const FeatureCarousel: React.FC<PropType> = ({ cards }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: true, stopOnFocusIn: false })]
  );

  // 2. State để bật/tắt nút
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // 3. Hàm điều khiển
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // 4. Cập nhật trạng thái nút (disable) khi slide thay đổi
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    // Div cha, dùng `relative` để chứa các nút
    <div className="relative w-full max-w-6xl mx-auto">
      {/* 1. Viewport (khu vực hiển thị) - `overflow-hidden` là bắt buộc */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* 2. Container (thanh trượt) - `flex` */}
        <div className="flex -ml-4">
          {cards.map((card, idx) => (
            // 3. Slide (mỗi card)
            <div
              className="embla__slide flex-shrink-0 flex-grow-0 basis-full min-w-0 pl-4 md:basis-1/2 lg:basis-1/3"
              key={idx}
            >
              {/* Copy code card của bạn vào đây */}
              <div
                className="card-custom h-[400px] flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                // style={{ height: 400 }} // Đã dùng h-[400px]
              >
                <div className="p-7">
                  <h3 className="mb-2 text-sub1 text-black">{card.title}</h3>
                  <p className="mb-4 text-sub2 text-black">
                    {card.description}
                  </p>
                  <div className="mt-2 rounded-lg py-6 px-4 flex flex-col items-center">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={310}
                      height={110}
                      className="h-[110px] w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === NÚT ĐÃ DI CHUYỂN RA NGOÀI === */}

      {/* Arrow prev */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-blue-50 text-primary shadow-md hover:bg-blue-100 flex items-center justify-center transition disabled:opacity-30"
        aria-label="Previous"
        disabled={prevBtnDisabled}
      >
        <FiArrowLeft className="h-7 w-7" />
      </button>

      {/* Arrow next */}
      <button
        onClick={scrollNext}
        className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-blue-50 text-primary shadow-md hover:bg-blue-100 flex items-center justify-center transition disabled:opacity-30"
        aria-label="Next"
        disabled={nextBtnDisabled}
      >
        <FiArrowRight className="h-7 w-7" />
      </button>
    </div>
  );
};