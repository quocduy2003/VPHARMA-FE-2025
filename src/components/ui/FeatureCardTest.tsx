// "use client";

// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { ChainFeatureCardProps } from "@/types";
// import { RichTextRenderer } from "./RichTextRenderer";
// import { FiClipboard, FiTrendingUp, FiActivity, FiDatabase } from "react-icons/fi";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.2) {
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     if (!ref.current) return;
//     const observer = new window.IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       { threshold }
//     );
//     observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [ref, threshold]);

//   return inView;
// }

// const DURATION = 7000; // ms
// const RESUME_DELAY = 5000; // ms (Delay 5s trước khi chạy lại)
// const ICON_SIZE = 36; // px
// const NODE_GAP = 20; // px
// const NODE_HEIGHT = ICON_SIZE + NODE_GAP;

// export default function FeatureCardTest({
//   features,
//   direction = "right",
//   theme = "light",
//   animation = false,
// }: ChainFeatureCardProps) {
//   const safeFeatures = Array.isArray(features) ? features : [];
//   const [activeIndex, setActiveIndex] = useState<number>(0);
//   const [progress, setProgress] = useState<number>(0);
//   const [hasPlayed, setHasPlayed] = useState(false);
//   const [isPaused, setIsPaused] = useState(false); 
//   const isLeft = direction === "left";
//   const timerRef = useRef<any>(null);
//   const progressRef = useRef<any>(null);
//   const resumeTimerRef = useRef<any>(null);
//   const sectionRef = useRef<any>(null);

//   const inView = useInView(sectionRef);

//   useEffect(() => {
//     if (animation && inView && !hasPlayed) setHasPlayed(true);
//   }, [animation, inView, hasPlayed]);

//   // Tăng dần progress mỗi 20ms theo DURATION
//   useEffect(() => {
//     // Luôn dọn dẹp timer resume nếu effect này chạy lại
//     clearTimeout(resumeTimerRef.current);
//     if (animation && hasPlayed && !isPaused) {
//       setProgress(0);
//       progressRef.current = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(progressRef.current);
//             return 100;
//           }
//           return prev + (20 / DURATION) * 100;
//         });
//       }, 20);

//       timerRef.current = setTimeout(() => {
//         clearInterval(progressRef.current);
//         setProgress(0);
//         setActiveIndex((prev) => (prev + 1) % safeFeatures.length);
//       }, DURATION);
//     }

//     // Dọn dẹp timer khi component unmount hoặc khi state thay đổi
//     return () => {
//       clearTimeout(timerRef.current);
//       clearInterval(progressRef.current);
//     };
//     // Thêm isPaused vào dependency array
//   }, [activeIndex, safeFeatures.length, animation, hasPlayed, isPaused]);

//   // Thêm effect dọn dẹp riêng cho resumeTimer khi unmount
//   useEffect(() => {
//     return () => {
//       clearTimeout(resumeTimerRef.current);
//     };
//   }, []);

//   // TẠM DỪNG KHI HOVER
//   const handleMouseEnter = (index: number) => {
//     if (!animation) return; // Không làm gì nếu animation tắt

//     // Xóa các timer đang chạy để dừng hệ thống
//     clearTimeout(resumeTimerRef.current);
//     clearTimeout(timerRef.current);
//     clearInterval(progressRef.current);

//     // Set trạng thái Paused = true
//     setIsPaused(true);
//     setActiveIndex(index);// Nhảy ngay đến mục người dùng chọn
//     setProgress(0); 
//   };

//   // TỰ ĐỘNG CHẠY LẠI KHI RỜI CHUỘT
//   const handleMouseLeave = () => {
//     if (!animation) return;

//     // Thiết lập timer chờ (Delay) trước khi chạy lại 
//     resumeTimerRef.current = setTimeout(() => {
//       setIsPaused(false); // Bỏ Pause -> useEffect sẽ tự kích hoạt lại animation
//     }, RESUME_DELAY); //Đặt RESUME_DELAY 5s. Sau 5s, tắt cờ pause để animation chạy lại
//   };

//   const ICONS = [
//     <FiClipboard  key="1" className="h-5 w-5" />,
//     <FiTrendingUp key="2" className="h-5 w-5" />,
//     <FiActivity key="3" className="h-5 w-5" />,
//     <FiDatabase key="4" className="h-5 w-5" />,
//   ];

//   // Return early if no features - AFTER all hooks
//   if (safeFeatures.length === 0) {
//     return null;
//   }

//   return (
//     <div ref={sectionRef} className={`grid items-center gap-8 lg:grid-cols-2 `} >
//       <div
//         className={`${isLeft ? "lg:order-2" : "lg:order-1"
//           } flex justify-center relative`}
//       >
//         <div className="relative w-full max-w-[600px] h-[550px] rounded-2xl overflow-hidden shadow-lg">
//           {safeFeatures.map((item, idx) => (
//             <Image
//               key={idx}
//               src={item.image}
//               alt={item.title}
//               width={600}
//               height={550}
//               className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
//                                 w-full h-full rounded-xl object-cover transition-opacity duration-500
//                                 ${activeIndex === idx
//                   ? "opacity-100 z-10"
//                   : "opacity-0 z-0"
//                 }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Cột mô tả + timeline từng đoạn */}
//       <div className={`${isLeft ? "lg:order-1" : "lg:order-2"} flex justify-center relative`}>
//         <ul
//           className="relative flex flex-col ml-[36px] "
//           onMouseLeave={handleMouseLeave}
//         >
//           {safeFeatures.map((item, index) => (
//             <li
//               key={index}
//               className="relative flex "
//               style={{ minHeight: NODE_HEIGHT }}
//               onMouseEnter={() => handleMouseEnter(index)}
//             >
//               {/* Icon + timeline */}
//               <div
//                 className="relative flex flex-col items-center mr-5"
//                 style={{ width: ICON_SIZE }}
//               >
//                 {/* Icon */}
//                 <span
//                   className={`flex items-center justify-center h-9 w-9 rounded-full border-2 transition-all duration-300 
//                       ${activeIndex === index
//                       ? "bg-success text-white border-success shadow-lg"
//                       : theme === "dark"
//                         ? "bg-[#0b7457] text-white/90 border-success/40"
//                         : "bg-emerald-100 text-success/50 border-emerald-200"
//                     }`}
//                 >
//                   {ICONS[index] || ICONS[0]}
//                 </span>

//                 {/* Timeline segment (nằm ngay dưới icon) */}
//                 {safeFeatures.length > 1 && index < safeFeatures.length - 1 && (
//                   <div
//                     className="absolute left-1/2 top-[36px] -translate-x-1/2 z-0 h-full"
//                     style={{
//                       width: "4px",
//                       background: "#e5e7eb",
//                       borderRadius: "4px",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {/* TRẠNG THÁI ĐANG CHẠY: Render thanh progress động */}
//                     {(activeIndex === index && hasPlayed && !isPaused) && (
//                       <div
//                         className="absolute left-0 top-0 w-full bg-success"
//                         style={{
//                           height: `${progress}%`,
//                           transition: "height 20ms linear",
//                         }}
//                       />
//                     )}

//                     {/* [TRẠNG THÁI ĐÃ XONG: Render thanh full màu xanh */}
//                     {(activeIndex > index) && (
//                       <div
//                         className="absolute left-0 top-0 w-full"
//                         style={{
//                           height: "100%",
//                           background: "#16a34a", // Dùng màu success
//                         }}
//                       />
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Nội dung */}
//               <div className="flex-1 pl-2 transition-all duration-300">
//                 <h3
//                   className={`mb-2 font-bold text-sub2 md:text-sub1 lg:text-h6 transition-all duration-300 ${theme === "dark"
//                     ? activeIndex === index
//                       ? "text-white"
//                       : "text-white/50"
//                     : activeIndex === index
//                       ? "text-primary"
//                       : "text-black/60"
//                     }`}
//                 >
//                   {item.title}
//                 </h3>
//                 <RichTextRenderer
//                   content={item.descriptionBlocks}
//                   className={`leading-relaxed text-sm md:text-body2 lg:text-sub2 transition-all duration-300 mx-auto max-w-xl
//                     ${theme === "dark"
//                       ? activeIndex === index
//                         ? "text-white"
//                         : "text-white/50"
//                       : activeIndex === index
//                         ? "text-black"
//                         : "text-colordescription/60"
//                     }`}
//                 />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChainFeatureCardProps } from "@/types";
import { RichTextRenderer } from "./RichTextRenderer";
import {
  FiClipboard,
  FiTrendingUp,
  FiActivity,
  FiDatabase,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

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
const RESUME_DELAY = 5000; // ms
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

  // Refs
  const timerRef = useRef<any>(null);
  const progressRef = useRef<any>(null);
  const resumeTimerRef = useRef<any>(null);
  const sectionRef = useRef<any>(null);

  // Mobile Swipe State
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const inView = useInView(sectionRef);

  useEffect(() => {
    if (animation && inView && !hasPlayed) setHasPlayed(true);
  }, [animation, inView, hasPlayed]);

  // --- LOGIC TIMELINE (GIỮ NGUYÊN) ---
  useEffect(() => {
    clearTimeout(resumeTimerRef.current);
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

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [activeIndex, safeFeatures.length, animation, hasPlayed, isPaused]);

  useEffect(() => {
    return () => {
      clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Handler cho Desktop (Timeline)
  const handleMouseEnter = (index: number) => {
    if (!animation) return;
    clearTimeout(resumeTimerRef.current);
    clearTimeout(timerRef.current);
    clearInterval(progressRef.current);
    setIsPaused(true);
    setActiveIndex(index);
    setProgress(0);
  };

  const handleMouseLeave = () => {
    if (!animation) return;
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  // Handler cho Mobile (Swipe)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // Pause timeline khi vuốt mobile
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % safeFeatures.length);
    }
    if (isRightSwipe) {
      setActiveIndex((prev) => (prev === 0 ? safeFeatures.length - 1 : prev - 1));
    }
  };

  const ICONS = [
    <FiClipboard key="1" className="h-5 w-5" />,
    <FiTrendingUp key="2" className="h-5 w-5" />,
    <FiActivity key="3" className="h-5 w-5" />,
    <FiDatabase key="4" className="h-5 w-5" />,
  ];

  if (safeFeatures.length === 0) return null;

  const currentFeature = safeFeatures[activeIndex];

  // Helper function để lấy URL ảnh an toàn (Fix lỗi TypeScript without Any)
  const getImageUrl = (image: string | { url: string } | any) => {
    return (image as { url: string })?.url || (image as string);
  };

  return (
    <div ref={sectionRef}>
      {/* ========================================
        1. MOBILE & TABLET VIEW (< 1280px)
        ========================================
      */}
      <div
        className="block lg:hidden relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 touch-pan-y max-w-2xl mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* IMAGE AREA */}
        <div className="relative h-[250px] md:h-[450px] w-full bg-gray-100 group">
          <Image
            // FIX 1: Ép kiểu an toàn cho Image
            src={getImageUrl(currentFeature.image)}
            alt={currentFeature.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

          {/* Counter */}
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-sm z-30 select-none">
            {activeIndex + 1} / {safeFeatures.length}
          </div>

          {/* Navigation Arrows */}
          <button
            // FIX 2: Thêm aria-label
            aria-label="Previous feature"
            onClick={(e) => { e.stopPropagation(); setIsPaused(true); setActiveIndex((prev) => (prev === 0 ? safeFeatures.length - 1 : prev - 1)); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full shadow-lg bg-white/70 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/20"
          >
            <FiChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-primary" />
          </button>
          
          <button
             // FIX 2: Thêm aria-label
            aria-label="Next feature"
            onClick={(e) => { e.stopPropagation(); setIsPaused(true); setActiveIndex((prev) => (prev + 1) % safeFeatures.length); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full shadow-lg bg-white/70 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/20"
          >
            <FiChevronRight className="w-5 h-5 md:w-7 md:h-7 text-primary" />
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="p-4 md:p-8">
          <div className="mb-2 md:mb-6">
            <h3 className="text-sub2 md:text-sub1 lg:text-h6 mb-2 text-primary font-bold">
              {currentFeature.title}
            </h3>
          </div>
          <div className="text-body2 md:text-sub2 text-gray-700 min-h-[100px]">
            <RichTextRenderer content={currentFeature.descriptionBlocks} />
          </div>
        </div>
      </div>

      {/* ========================================
        2. DESKTOP VIEW (>= 1280px)
        ========================================
      */}
      <div className="hidden lg:grid items-center gap-8 lg:grid-cols-2">
        <div
          className={`${isLeft ? "lg:order-2" : "lg:order-1"
            } flex justify-center relative`}
        >
          <div className="relative w-full max-w-[600px] h-[550px] rounded-2xl overflow-hidden shadow-lg">
            {safeFeatures.map((item, idx) => (
              <Image
                key={idx}
                // FIX 1: Ép kiểu an toàn cho Image (áp dụng cả desktop)
                src={getImageUrl(item.image)}
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

                  {/* Timeline segment */}
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
                      {/* TRẠNG THÁI ĐANG CHẠY */}
                      {(activeIndex === index && hasPlayed && !isPaused) && (
                        <div
                          className="absolute left-0 top-0 w-full bg-success"
                          style={{
                            height: `${progress}%`,
                            transition: "height 20ms linear",
                          }}
                        />
                      )}

                      {/* TRẠNG THÁI ĐÃ XONG */}
                      {(activeIndex > index) && (
                        <div
                          className="absolute left-0 top-0 w-full"
                          style={{
                            height: "100%",
                            background: "#16a34a", 
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Nội dung */}
                <div className="flex-1 pl-2 transition-all duration-300">
                  <h3
                    className={`mb-2 font-bold text-sub2 md:text-sub1 lg:text-h6 transition-all duration-300 ${theme === "dark"
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
                    className={`leading-relaxed text-sm md:text-body2 lg:text-sub2 transition-all duration-300 mx-auto max-w-xl
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
    </div>
  );
}