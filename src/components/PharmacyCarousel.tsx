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
  // --- Các hằng số giữ nguyên ---
  const cardsPerView = 3;
  const cardWidth = 350; // px
  const cardGap = 32; // 8 * 4px = 32px do dùng mx-4
  const step = cardWidth + cardGap;
  const transitionDuration = 700; // Lấy từ className 'duration-700'
  const autoplayDelay = 2500; // 3 giây

  // --- Nhân bản cards ---
  const clonedCardsStart = cards.slice(0, cardsPerView);
  const clonedCardsEnd = cards.slice(-cardsPerView);
  const displayCards = [...clonedCardsEnd, ...cards, ...clonedCardsStart];

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

    if (newIndex === cardsPerView + cards.length) {
      setTimeout(() => {
        setIsJumping(true);
        setCurrentIndex(cardsPerView);
      }, transitionDuration);
    }

    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [
    isAnimating,
    currentIndex,
    cards.length,
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
        setCurrentIndex(cardsPerView + cards.length - 1);
      }, transitionDuration);
    }

    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [
    isAnimating,
    currentIndex,
    cards.length,
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
        className="w-full max-w-6xl overflow-hidden"
        // 5. Thêm sự kiện hover để tạm dừng/tiếp tục autoplay
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="flex"
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
