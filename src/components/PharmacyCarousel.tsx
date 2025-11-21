"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  // --- CONFIG: Cố định cardWidth = 260px theo yêu cầu ---
  const FIXED_CARD_WIDTH = 260;

  const [config, setConfig] = useState({
    cardsPerView: 1, // Mặc định an toàn là 1
    cardWidth: FIXED_CARD_WIDTH,
    cardGap: 24, // Gap mặc định
  });

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. LOGIC TÍNH TOÁN SỐ LƯỢNG CARD & CĂN GIỮA ---
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newPerView = 1;
      let newGap = 24;

      // Logic: Tính xem bao nhiêu card 260px nhét vừa màn hình này
      if (width < 640) {
        newPerView = 1; // Mobile: Luôn 1 card
        newGap = 20;
      } else if (width < 900) {
        newPerView = 2; // Tablet nhỏ: 2 cards
        newGap = 24;
      } else if (width < 1200) {
        newPerView = 3; // Tablet lớn / Laptop nhỏ: 3 cards
        newGap = 24;
      } else {
        newPerView = 4; // Desktop lớn: 4 cards
        newGap = 32;
      }

      setConfig({
        cardsPerView: newPerView,
        cardWidth: FIXED_CARD_WIDTH,
        cardGap: newGap,
      });

      // Reset index về vị trí an toàn khi resize
      setCurrentIndex(newPerView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { cardsPerView, cardWidth, cardGap } = config;
  const step = cardWidth + cardGap;
  const transitionDuration = 700;
  const autoplayDelay = 3000;

  const safeCards = Array.isArray(cards) ? cards : [];
  
  // Clone cards
  const clonedCardsStart = safeCards.slice(0, cardsPerView);
  const clonedCardsEnd = safeCards.slice(-cardsPerView);
  const displayCards = [...clonedCardsEnd, ...safeCards, ...clonedCardsStart];

  // --- Logic Navigation ---
  const handleNextPharmacy = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex === cardsPerView + safeCards.length) {
        setTimeout(() => {
          setIsJumping(true);
          setCurrentIndex(cardsPerView);
        }, transitionDuration);
      }
      return newIndex;
    });

    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [isAnimating, cardsPerView, safeCards.length, transitionDuration]);

  const handlePrevPharmacy = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex === cardsPerView - 1) {
        setTimeout(() => {
          setIsJumping(true);
          setCurrentIndex(cardsPerView + safeCards.length - 1);
        }, transitionDuration);
      }
      return newIndex;
    });

    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [isAnimating, cardsPerView, safeCards.length, transitionDuration]);

  useEffect(() => {
    if (isJumping) {
      requestAnimationFrame(() => setIsJumping(false));
    }
  }, [isJumping]);

  useEffect(() => {
    if (isHovering || isAnimating) return;
    const timer = setInterval(handleNextPharmacy, autoplayDelay);
    return () => clearInterval(timer);
  }, [isHovering, isAnimating, handleNextPharmacy, autoplayDelay]);

  if (safeCards.length === 0) return null;

  // Tính toán chiều rộng chính xác của container để căn giữa
  // Công thức: (Số card * chiều rộng card) + (Tổng gap giữa các card)
  const containerMaxWidth = (cardsPerView * cardWidth) + ((cardsPerView - 1) * cardGap);

  return (
    <div className="container py-8 relative flex flex-col items-center justify-center w-full">
      
      {/* Nút PREV: Ẩn trên mobile/tablet, hiện trên desktop */}
      <button
        onClick={handlePrevPharmacy}
        // Dùng style left calc để luôn nằm bên trái container chính xác
        style={{ left: `calc(50% - ${containerMaxWidth / 2}px - 60px)` }} 
        className="hidden lg:flex absolute z-10 h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-2xl font-bold shadow-md"
        aria-label="Previous"
        disabled={isAnimating}
      >
        <FiArrowLeft className="h-5 w-5" />
      </button>

      {/* Carousel Wrapper: Căn giữa chính xác */}
      <div
        ref={containerRef}
        className="overflow-hidden mx-auto" // mx-auto là chìa khóa để căn giữa
        style={{
            maxWidth: `${containerMaxWidth}px`, // Set cứng max-width để khớp với nội dung bên trong
            width: "100%"
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)} 
        onTouchEnd={() => setIsHovering(false)}
      >
        <div
          className="flex"
          style={{
            gap: `${cardGap}px`, // Dùng gap của flexbox để khoảng cách đều nhau
            // Tổng chiều rộng track: đảm bảo đủ chỗ cho tất cả card
            width: `${displayCards.length * step}px`, 
            transform: `translateX(-${currentIndex * step}px)`,
            transition: isJumping
              ? "none"
              : `transform ${transitionDuration}ms ease-in-out`,
          }}
        >
          {displayCards.map((card, idx) => (
            <div
              key={idx}
              style={{ 
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px` // Đảm bảo không bị co lại
              }}
              className="flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition hover:shadow-xl min-h-[340px] overflow-hidden flex flex-col"
            >
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="mb-2 text-black font-semibold truncate text-base">{card.name}</h3>
                <p className="text-sub1 text-black text-sm line-clamp-2">{card.address}</p>
                
                <div className="flex flex-col items-center justify-center py-4 mt-auto">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={240} 
                    height={160}
                    className="h-[140px] w-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nút NEXT */}
      <button
        onClick={handleNextPharmacy}
        // Dùng style right calc để luôn nằm bên phải container chính xác
        style={{ right: `calc(50% - ${containerMaxWidth / 2}px - 60px)` }}
        className="hidden lg:flex absolute z-10 h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-2xl font-bold shadow-md"
        aria-label="Next"
        disabled={isAnimating}
      >
        <FiArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}