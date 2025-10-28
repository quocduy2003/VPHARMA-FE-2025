"use client";

import { useState, useEffect } from "react"; // 1. Import thêm useEffect
import Image from "next/image";
import { Card } from "@/types";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface PharmacyCarouselProps {
  cards: {
    name: string;
    address: string;
    image: string;
    quote?: string;
    alt: string;
  }[];
}

export default function PharmacyCarousel({ cards }: PharmacyCarouselProps) {
  // --- Các hằng số giữ nguyên ---
  const cardsPerView = 3;
  const cardWidth = 350; // px
  const cardGap = 32; // 8 * 4px = 32px do dùng mx-4
  const step = cardWidth + cardGap;
  const transitionDuration = 700; // Lấy từ className 'duration-700'

  // --- 2. Nhân bản cards để tạo hiệu ứng "cuộn tròn" ---
  const clonedCardsStart = cards.slice(0, cardsPerView);
  const clonedCardsEnd = cards.slice(-cardsPerView);
  const displayCards = [...clonedCardsEnd, ...cards, ...clonedCardsStart];

  // --- 3. Cập nhật State ---
  // Bắt đầu ở index = cardsPerView (tức là card "thật" đầu tiên)
  const [currentIndex, setCurrentIndex] = useState(cardsPerView);
  const [isJumping, setIsJumping] = useState(false); // State để quản lý việc "nhảy"
  const [isAnimating, setIsAnimating] = useState(false); // Ngăn spam click

  // --- 4. Cập nhật Logic cuộn ---
  const handlePrevPharmacy = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);

    // Khi cuộn về card "nhân bản" đầu tiên
    if (newIndex === cardsPerView - 1) {
      setTimeout(() => {
        setIsJumping(true); // Tắt animation
        // Nhảy về card "thật" cuối cùng
        setCurrentIndex(cardsPerView + cards.length - 1);
      }, transitionDuration);
    }

    setTimeout(() => setIsAnimating(false), transitionDuration);
  };

  const handleNextPharmacy = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);

    // Khi cuộn đến card "nhân bản" cuối cùng
    if (newIndex === cardsPerView + cards.length) {
      setTimeout(() => {
        setIsJumping(true); // Tắt animation
        // Nhảy về card "thật" đầu tiên
        setCurrentIndex(cardsPerView);
      }, transitionDuration);
    }

    setTimeout(() => setIsAnimating(false), transitionDuration);
  };

  // --- 5. Thêm useEffect để bật lại animation sau khi "nhảy" ---
  useEffect(() => {
    if (isJumping) {
      // Dùng requestAnimationFrame để đợi DOM cập nhật xong
      requestAnimationFrame(() => {
        setIsJumping(false);
      });
    }
  }, [isJumping]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Carousel container */}
      <div className="w-full max-w-6xl overflow-hidden">
        <div
          className="flex" // Bỏ 'transition-transform duration-700 ease-in-out'
          style={{
            width: `${displayCards.length * step}px`, // 6. Dùng độ dài mảng mới
            transform: `translateX(-${currentIndex * step}px)`,
            // 7. Quản lý transition bằng state
            transition: isJumping
              ? "none"
              : `transform ${transitionDuration}ms ease-in-out`,
          }}
        >
          {/* 8. Map qua mảng displayCards */}
          {displayCards.map((card, idx) => (
            <div
              key={idx} // key={idx} vẫn ổn vì mảng này không thay đổi
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
          className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-3xl font-bold"
          aria-label="Previous"
          disabled={isAnimating} // 9. Vô hiệu hóa khi đang cuộn
        >
          <FiArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNextPharmacy}
          className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-3xl font-bold"
          aria-label="Next"
          disabled={isAnimating} // 9. Vô hiệu hóa khi đang cuộn
        >
          <FiArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}