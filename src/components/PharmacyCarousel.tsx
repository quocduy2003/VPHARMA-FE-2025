"use client";

// 1. Import thêm useCallback
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
  const cardsPerView = 4;
  const cardWidth = 300;
  const cardGap = 32;
  const step = cardWidth + cardGap;
  const transitionDuration = 700;
  const autoplayDelay = 2500; // 3 giây

  // --- Kiểm tra và khởi tạo cards ---
  const safeCards = Array.isArray(cards) ? cards : [];

  // --- Nhân bản cards ---
  const clonedCardsStart = safeCards.slice(0, cardsPerView);
  const clonedCardsEnd = safeCards.slice(-cardsPerView);
  const displayCards = [...clonedCardsEnd, ...safeCards, ...clonedCardsStart];

  // --- Cập nhật State ---
  const [currentIndex, setCurrentIndex] = useState(cardsPerView);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // 2. Thêm state để tạm dừng khi hover
  const [isHovering, setIsHovering] = useState(false);

  // --- 3. Bọc logic cuộn bằng useCallback ---
  const handleNextPharmacy = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);

    if (newIndex === cardsPerView + safeCards.length) {
      setTimeout(() => {
        setIsJumping(true);
        setCurrentIndex(cardsPerView);
      }, transitionDuration);
    }

    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [
    isAnimating,
    currentIndex,
    safeCards.length,
    cardsPerView,
    transitionDuration,
  ]);

  const handlePrevPharmacy = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);

    if (newIndex === cardsPerView - 1) {
      setTimeout(() => {
        setIsJumping(true);
        setCurrentIndex(cardsPerView + safeCards.length - 1);
      }, transitionDuration);
    }

    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [
    isAnimating,
    currentIndex,
    safeCards.length,
    cardsPerView,
    transitionDuration,
  ]);

  // --- useEffect để bật lại animation (giữ nguyên) ---
  useEffect(() => {
    if (isJumping) {
      requestAnimationFrame(() => {
        setIsJumping(false);
      });
    }
  }, [isJumping]);

  // --- 4. Thêm useEffect cho Autoplay ---
  useEffect(() => {
    // Chỉ chạy khi không hover và không đang chuyển động
    if (isHovering || isAnimating) return;

    // Tạo một interval
    const timer = setInterval(() => {
      handleNextPharmacy();
    }, autoplayDelay); // Tự cuộn sau mỗi 3 giây

    // Xóa interval khi component unmount hoặc khi state thay đổi
    return () => {
      clearInterval(timer);
    };
  }, [isHovering, isAnimating, handleNextPharmacy, autoplayDelay]);

  // Return early if no cards - AFTER all hooks
  if (safeCards.length === 0) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={handlePrevPharmacy}
        className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-3xl font-bold"
        aria-label="Previous"
        disabled={isAnimating}
      >
        <FiArrowLeft className="h-6 w-6" />
      </button>
      {/* Carousel container */}
      <div
        className="w-full max-w-[1296px] overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="flex gap-8"
          style={{
            width: `${displayCards.length * step}px`,
            transform: `translateX(-${currentIndex * step}px)`,
            transition: isJumping
              ? "none"
              : `transform ${transitionDuration}ms ease-in-out`,
          }}
        >
          {/* Map qua mảng displayCards (giữ nguyên) */}
          {displayCards.map((card, idx) => (
            <div
              key={idx}
              className="min-w-[300px] max-w-[300px] flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition hover:shadow-xl min-h-[350px] max-h-[420px] overflow-auto"
            >
              <div className="p-7">
                <h3 className="mb-2 text-black font-semibold">{card.name}</h3>
                <p className=" text-sub1 text-black">{card.address}</p>
                <div className="flex flex-col items-center rounded-lg py-7 px-4">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={310}
                    height={210}
                    className="h-[160px] w-[full] object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNextPharmacy}
        className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-3xl font-bold"
        aria-label="Next"
        disabled={isAnimating}
      >
        <FiArrowRight className="h-6 w-6" />
      </button>
    </div>
  );
}
