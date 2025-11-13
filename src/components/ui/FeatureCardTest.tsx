"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChainFeatureCardProps } from "@/types";
import { RichTextRenderer } from "./RichTextRenderer";
import { FiClipboard, FiTrendingUp, FiActivity, FiDatabase } from "react-icons/fi";
/* eslint-disable @typescript-eslint/no-explicit-any */
function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.2) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

const DURATION = 7000; // ms
const RESUME_DELAY = 5000; // ms (Delay 5s trước khi chạy lại)
const ICON_SIZE = 36; // px
const NODE_GAP = 20; // px
const NODE_HEIGHT = ICON_SIZE + NODE_GAP;

export default function FeatureCardTest({
  features,
  direction = "right",
  theme = "light",
  animation = false,
}: ChainFeatureCardProps) {
  const safeFeatures = Array.isArray(features) ? features : [];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPaused, setIsPaused] = useState(false); 
  const isLeft = direction === "left";
  const timerRef = useRef<any>(null);
  const progressRef = useRef<any>(null);
  const resumeTimerRef = useRef<any>(null);
  const sectionRef = useRef<any>(null);

  const inView = useInView(sectionRef);

  useEffect(() => {
    if (animation && inView && !hasPlayed) setHasPlayed(true);
  }, [animation, inView, hasPlayed]);

  // Tăng dần progress mỗi 20ms theo DURATION
  useEffect(() => {
    // Luôn dọn dẹp timer resume nếu effect này chạy lại
    clearTimeout(resumeTimerRef.current);

    // Chỉ chạy animation khi: có animation, đã in-view, VÀ không bị pause
    if (animation && hasPlayed && !isPaused) {
      setProgress(0);
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressRef.current);
            return 100;
          }
          return prev + (20 / DURATION) * 100;
        });
      }, 20);

      timerRef.current = setTimeout(() => {
        clearInterval(progressRef.current);
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % safeFeatures.length);
      }, DURATION);
    }

    // Dọn dẹp timer khi component unmount hoặc khi state thay đổi
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressRef.current);
    };
    // Thêm isPaused vào dependency array
  }, [activeIndex, safeFeatures.length, animation, hasPlayed, isPaused]);

  // Thêm effect dọn dẹp riêng cho resumeTimer khi unmount
  useEffect(() => {
    return () => {
      clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // <-- HÀM XỬ LÝ HOVER MỚI -->
  const handleMouseEnter = (index: number) => {
    if (!animation) return; // Không làm gì nếu animation tắt

    // 1. Dọn dẹp tất cả timer đang chạy (cả timer 5s)
    clearTimeout(resumeTimerRef.current);
    clearTimeout(timerRef.current);
    clearInterval(progressRef.current);

    // 2. Tạm dừng animation và set active index
    setIsPaused(true);
    setActiveIndex(index);
    setProgress(0); // Reset progress
  };

  // <-- HÀM XỬ LÝ MOUSE LEAVE MỚI -->
  const handleMouseLeave = () => {
    if (!animation) return;

    // 3. Đặt timer 5s. Sau 5s, tắt cờ pause để animation chạy lại
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  const ICONS = [
    <FiClipboard  key="1" className="h-5 w-5" />,
    <FiTrendingUp key="2" className="h-5 w-5" />,
    <FiActivity key="3" className="h-5 w-5" />,
    <FiDatabase key="4" className="h-5 w-5" />,
  ];

  // Return early if no features - AFTER all hooks
  if (safeFeatures.length === 0) {
    return null;
  }

  return (
    <div ref={sectionRef} className={`grid items-center gap-8 lg:grid-cols-2 `} >
      <div
        className={`${isLeft ? "lg:order-2" : "lg:order-1"
          } flex justify-center relative`}
      >
        <div className="relative w-full max-w-[600px] h-[550px] rounded-2xl overflow-hidden shadow-lg">
          {safeFeatures.map((item, idx) => (
            <Image
              key={idx}
              src={item.image}
              alt={item.title}
              width={600}
              height={550}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                w-full h-full rounded-xl object-cover transition-opacity duration-500
                                ${activeIndex === idx
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Cột mô tả + timeline từng đoạn */}
      <div className={`${isLeft ? "lg:order-1" : "lg:order-2"} flex justify-center relative`}>
        <ul
          className="relative flex flex-col ml-[36px] "
          onMouseLeave={handleMouseLeave}
        >
          {safeFeatures.map((item, index) => (
            <li
              key={index}
              className="relative flex "
              style={{ minHeight: NODE_HEIGHT }}
              // <-- THÊM onMouseEnter VÀO LI -->
              onMouseEnter={() => handleMouseEnter(index)}
            >
              {/* Icon + timeline */}
              <div
                className="relative flex flex-col items-center mr-5"
                style={{ width: ICON_SIZE }}
              >
                {/* Icon */}
                <span
                  className={`flex items-center justify-center h-9 w-9 rounded-full border-2 transition-all duration-300 
                      ${activeIndex === index
                      ? "bg-success text-white border-success shadow-lg"
                      : theme === "dark"
                        ? "bg-[#0b7457] text-white/90 border-success/40"
                        : "bg-emerald-100 text-success/50 border-emerald-200"
                    }`}
                >
                  {ICONS[index] || ICONS[0]}
                </span>

                {/* Timeline segment (nằm ngay dưới icon) */}
                {safeFeatures.length > 1 && index < safeFeatures.length - 1 && (
                  <div
                    className="absolute left-1/2 top-[36px] -translate-x-1/2 z-0 h-full"
                    style={{
                      width: "4px",
                      background: "#e5e7eb",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    {/* 1. Thanh progress chạy khi autoplay (isPaused = false) */}
                    {(activeIndex === index && hasPlayed && !isPaused) && (
                      <div
                        className="absolute left-0 top-0 w-full bg-success"
                        style={{
                          height: `${progress}%`,
                          transition: "height 20ms linear",
                        }}
                      />
                    )}

                    {/* 2. Thanh progress đầy 100% KHI item đã được duyệt qua */}
                    {(activeIndex > index) && (
                      <div
                        className="absolute left-0 top-0 w-full"
                        style={{
                          height: "100%",
                          background: "#16a34a", // Dùng màu success
                        }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Nội dung */}
              <div className="flex-1 pl-2 transition-all duration-300">
                <h3
                  className={`mb-2 font-bold text-h6 transition-all duration-300 ${theme === "dark"
                    ? activeIndex === index
                      ? "text-white"
                      : "text-white/50"
                    : activeIndex === index
                      ? "text-primary"
                      : "text-black/60"
                    }`}
                >
                  {item.title}
                </h3>
                <RichTextRenderer
                  content={item.descriptionBlocks}
                  className={`leading-relaxed text-sub2 transition-all duration-300 mx-auto max-w-xl
                    ${theme === "dark"
                      ? activeIndex === index
                        ? "text-white"
                        : "text-white/50"
                      : activeIndex === index
                        ? "text-black"
                        : "text-colordescription/60"
                    }`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}