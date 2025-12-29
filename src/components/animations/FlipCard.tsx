
"use client";

import Image from "next/image";
import { ChallengeCardProp } from "@/types"; // Giả sử path này đúng
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { useState, useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";

// Thêm prop index để tính toán thời gian delay cho hiệu ứng "mồi"
interface FlipCardProps extends ChallengeCardProp {
  index?: number;
}

export default function FlipCard({ challengeCard, index = 0 }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Đảm bảo chỉ auto-flip 1 lần
  const cardRef = useRef<HTMLDivElement>(null);

  // Xử lý hiệu ứng "Mồi" (Auto Flip) trên Mobile/Tablet
  useEffect(() => {
    const handleAutoFlip = () => {
      // Chỉ chạy trên màn hình nhỏ hơn lg (1024px theo Tailwind config của bạn)
      if (window.innerWidth < 1280 && !hasAnimated) {
        // Dùng 1280px (lg) làm mốc
        // Tính delay dựa trên index: Card 1 chạy ngay, Card 2 đợi 200ms...
        const delayStart = index * 200;

        setTimeout(() => {
          setIsFlipped(true); // Lật ra sau

          // Giữ trong 1.5s - 2s để người dùng kịp nhìn thấy có chữ
          setTimeout(() => {
            setIsFlipped(false); // Úp lại
          }, 2000);
        }, delayStart);

        setHasAnimated(true);
      }
    };

    // Sử dụng Intersection Observer để chỉ chạy khi Card xuất hiện trong màn hình
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleAutoFlip();
          observer.disconnect(); // Chạy xong ngắt luôn cho nhẹ
        }
      },
      { threshold: 0.5 } // Khi thẻ hiện 50% diện tích thì bắt đầu
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index, hasAnimated]);

  // Hàm xử lý khi bấm vào thẻ (cho Mobile/Tablet)
  const handleClick = () => {
    // Trên desktop (hover) thì click không làm gì hoặc có thể link
    // Trên mobile thì toggle
    if (window.innerWidth < 1280) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      ref={cardRef}
      className="group h-[420px] cursor-pointer [perspective:1000px]"
      onClick={handleClick}
    >
      <div
        className={`
          relative h-full w-full transition-all duration-700 [transform-style:preserve-3d]
          ${/* Logic Desktop: Hover thì lật */ ""}
          lg:group-hover:[transform:rotateY(180deg)]
          
          ${/* Logic Mobile: Dùng class dựa trên state */ ""}
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* ==================== FRONT SIDE ==================== */}
        <div className="absolute inset-0 flex h-full w-full flex-col rounded-xl bg-white p-6 shadow-lg [backface-visibility:hidden]">
          <h3 className="mb-0 md:mb-5 text-center text-sub1 md:text-body3 lg:text-h6 font-bold text-black">
            {challengeCard.title}
          </h3>
          <div className="flex-grow flex flex-col items-center justify-center gap-4">
            {/* Container chứa hình và icon, dùng flex-col và gap-4 để tạo khoảng cách dọc */}

            <Image
              src={challengeCard.image}
              alt={challengeCard.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-xl"
            />

            {/* Icon chỉ dẫn mới cho Mobile/Tablet (< 1024px) */}
            <div className="min-[1280px]:hidden flex items-center gap-2 text-gray-500 animate-pulse">
              <RotateCcw size={24} strokeWidth={2} /> {/* Icon React mới */}
              <span className="text-sm font-medium">Chạm để lật</span>{" "}
              {/* Thêm text cho rõ nghĩa */}
            </div>
          </div>
        </div>

        {/* ==================== BACK SIDE ==================== */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-white shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
          {/* Thêm padding top/bottom một chút để scroll dễ hơn */}
          <div className="prose container max-w-none p-6">
            <RichTextRenderer content={challengeCard.descriptionBlocks} />
          </div>
        </div>
      </div>
    </div>
  );
}
