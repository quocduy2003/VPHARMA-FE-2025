// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { BlogCard } from "@/types";

// interface RelatedPostsCarouselProps {
//   posts: BlogCard[];
//   visibleCount?: number; // số lượng item hiển thị desktop
// }

// export default function RelatedPostsCarousel({
//   posts,
//   visibleCount = 3,
// }: RelatedPostsCarouselProps) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const total = posts.length;
//   const gap = 24; // px
//   const duration = 400; // animation ms

//   // Clone để loop
//   const clonedStart = posts.slice(0, visibleCount);
//   const clonedEnd = posts.slice(-visibleCount);
//   const carouselPosts = [...clonedEnd, ...posts, ...clonedStart];

//   const [curr, setCurr] = useState(visibleCount);
//   const [animating, setAnimating] = useState(false);
//   const [isJumping, setIsJumping] = useState(false);
//   const [cardWidth, setCardWidth] = useState(0);

//   // Tính lại cardWidth khi resize
//   useEffect(() => {
//     const calc = () => {
//       if (!containerRef.current) return;
//       const containerWidth = containerRef.current.clientWidth;

//       let count = visibleCount;

//       // Mobile → chỉ 1 item
//       if (containerWidth < 640) count = 1;

//       // tablet → 2 item
//       if (containerWidth >= 640 && containerWidth < 1024)
//         count = Math.min(2, visibleCount);

//       // công thức: (containerWidth - gaps) / count
//       const newWidth = (containerWidth - gap * (count - 1)) / count;
//       setCardWidth(newWidth);
//     };

//     calc();
//     window.addEventListener("resize", calc);
//     return () => window.removeEventListener("resize", calc);
//   }, [visibleCount, gap]);

//   const handleNext = () => {
//     if (animating) return;
//     setAnimating(true);
//     setCurr((i) => i + 1);
//   };

//   const handlePrev = () => {
//     if (animating) return;
//     setAnimating(true);
//     setCurr((i) => i - 1);
//   };

//   // xử lý loop nhảy về giữa
//   useEffect(() => {
//     if (!animating) return;
//     const timer = setTimeout(() => {
//       setAnimating(false);
//       if (curr === carouselPosts.length - visibleCount) {
//         setIsJumping(true);
//         setCurr(visibleCount);
//       }
//       if (curr === 0) {
//         setIsJumping(true);
//         setCurr(total);
//       }
//     }, duration);

//     return () => clearTimeout(timer);
//   }, [curr, animating, visibleCount, carouselPosts.length, total]);

//   useEffect(() => {
//     if (isJumping) {
//       requestAnimationFrame(() => setIsJumping(false));
//     }
//   }, [isJumping]);

//   const trackWidth =
//     carouselPosts.length * cardWidth + (carouselPosts.length - 1) * gap;

//   return (
//     <div className="container overflow-hidden">
//       <h2 className="font-bold mb-4 flex items-center gap-2">
//         <span>📰</span> BÀI VIẾT LIÊN QUAN
//       </h2>

//       <div ref={containerRef} className="overflow-hidden relative w-full">
//         <div
//           className="flex"
//           style={{
//             gap: `${gap}px`,
//             width: `${trackWidth}px`,
//             transform: `translateX(-${curr * (cardWidth + gap)}px)`,
//             transition: isJumping
//               ? "none"
//               : `transform ${duration}ms cubic-bezier(.83,.05,.15,1.03)`,
//           }}
//         >
//           {carouselPosts.map((post, idx) => (
//             <Link
//               key={idx}
//               href={`/blog/${post.category.slug}/${post.slug}`}
//               className="group overflow-hidden rounded-xl bg-white shadow-lg hover:bg-gray-50 flex-shrink-0"
//               style={{ width: `${cardWidth}px` }}
//             >
//               <div className="w-full h-56 relative">
//                 <Image
//                   src={post.coverImage.url}
//                   alt={post.alt || post.title}
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
//                 />
//               </div>

//               <div className="flex flex-col flex-1 p-6">
//                 <p className="mb-1 text-sm font-semibold text-blue-700 flex items-center gap-2">
//                   {post.category.name}
//                   <span className="ml-4 text-xs text-gray-400">
//                     {new Date(post.createdAt).toLocaleDateString("vi-VN")}
//                   </span>
//                 </p>
//                 <h3 className="font-bold text-lg text-black group-hover:text-blue-700 line-clamp-2 mt-1">
//                   {post.title}
//                 </h3>
//                 <p className="mt-2 text-gray-500 line-clamp-2 text-sm">
//                   {post.description}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Prev */}
//         <button
//           className=" absolute left-0 top-1/2 -translate-y-1/2
//       bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center
//       hover:bg-gray-100 z-20"
//           onClick={handlePrev}
//           disabled={animating}
//         >
//           &lt;
//         </button>

//         {/* Next */}
//         <button
//           className=" absolute right-0 top-1/2 -translate-y-1/2
//       bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center
//       hover:bg-gray-100 z-20"
//           onClick={handleNext}
//           disabled={animating}
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// }


// //  import Link from "next/link";
// // import Image from "next/image";
// //

// // export function BlogPostLine({ post }: { post: BlogCard }) {
// //   return (
// //     <Link
// //       href={`/blog/${post.category.slug}/${post.slug}`}
// //       className="group flex gap-4 items-start p-2 rounded-lg hover:bg-gray-50 transition"
// //     >
// //       {/* Ảnh nhỏ nằm bên trái */}
// //       <div className="w-32 h-20 rounded overflow-hidden flex-shrink-0">
// //         <Image
// //           src={post.coverImage.url}
// //           alt={post.alt || post.title}
// //           width={160}
// //           height={100}
// //           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
// //         />
// //       </div>

// //       {/* Nội dung bên phải */}
// //       <div className="flex flex-col flex-1">
// //         <p className="mb-1 text-body2 font-semibold capitalize text-primary">
// //           {post.category.name}
// //           <span className="ml-4 text-body2 font-normal text-colordescription">
// //             {post.createdAt
// //               ? new Date(post.createdAt).toLocaleDateString("vi-VN", {
// //                   day: "2-digit",
// //                   month: "2-digit",
// //                   year: "numeric",
// //                 })
// //               : ""}
// //           </span>
// //         </p>

// //         <h3 className="text-sub1 text-black group-hover:text-primary line-clamp-1">
// //           {post.title}
// //         </h3>

// //         <p className="text-body2 text-colordescription line-clamp-1">
// //           {post.description}
// //         </p>
// //       </div>
// //     </Link>
// //   );
// // }


// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import { BlogCard } from "@/types";

// interface RelatedPostsCarouselProps {
//   posts: BlogCard[];
// }

// export default function RelatedPostsCarousel({
//   posts,
// }: RelatedPostsCarouselProps) {
//   // --- CONFIG: Cố định chiều rộng card ---
//   // Blog thường nhiều chữ hơn thuốc nên để rộng hơn 1 chút (290px so với 260px)
//   const FIXED_CARD_WIDTH = 290;

//   const [config, setConfig] = useState({
//     cardsPerView: 1,
//     cardWidth: FIXED_CARD_WIDTH,
//     cardGap: 24,
//   });

//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [isJumping, setIsJumping] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);

//   const containerRef = useRef<HTMLDivElement>(null);

//   // --- 1. LOGIC TÍNH TOÁN RESPONSIVE (Giống PharmacyCarousel) ---
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       let newPerView = 1;
//       let newGap = 24;

//       // Logic: Tính toán số lượng card dựa trên độ rộng màn hình
//       if (width < 640) {
//         newPerView = 1; // Mobile
//         newGap = 20;
//       } else if (width < 1024) {
//         newPerView = 2; // Tablet
//         newGap = 24;
//       } else if (width < 1350) {
//         newPerView = 3; // Laptop nhỏ
//         newGap = 24;
//       } else {
//         newPerView = 4; // Desktop lớn
//         newGap = 32;
//       }

//       setConfig({
//         cardsPerView: newPerView,
//         cardWidth: FIXED_CARD_WIDTH,
//         cardGap: newGap,
//       });

//       // Reset index về vị trí an toàn khi resize để tránh lỗi hiển thị
//       setCurrentIndex(newPerView);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const { cardsPerView, cardWidth, cardGap } = config;
//   const step = cardWidth + cardGap;
//   const transitionDuration = 700; // Tốc độ trượt (ms)
//   const autoplayDelay = 3000; // Tự động chạy sau 3s

//   const safePosts = Array.isArray(posts) ? posts : [];

//   // --- 2. CLONE POSTS ĐỂ TẠO HIỆU ỨNG LOOP ---
//   const clonedCardsStart = safePosts.slice(0, cardsPerView);
//   const clonedCardsEnd = safePosts.slice(-cardsPerView);
//   const displayPosts = [...clonedCardsEnd, ...safePosts, ...clonedCardsStart];

//   // --- 3. LOGIC NAVIGATION (Next/Prev) ---
//   const handleNext = useCallback(() => {
//     if (isAnimating) return;
//     setIsAnimating(true);

//     setCurrentIndex((prev) => {
//       const newIndex = prev + 1;
//       // Nếu đi quá giới hạn cuối -> nhảy về đầu (hiệu ứng vô tận)
//       if (newIndex === cardsPerView + safePosts.length) {
//         setTimeout(() => {
//           setIsJumping(true);
//           setCurrentIndex(cardsPerView);
//         }, transitionDuration);
//       }
//       return newIndex;
//     });

//     setTimeout(() => setIsAnimating(false), transitionDuration);
//   }, [isAnimating, cardsPerView, safePosts.length, transitionDuration]);

//   const handlePrev = useCallback(() => {
//     if (isAnimating) return;
//     setIsAnimating(true);

//     setCurrentIndex((prev) => {
//       const newIndex = prev - 1;
//       // Nếu đi quá giới hạn đầu -> nhảy về cuối
//       if (newIndex === cardsPerView - 1) {
//         setTimeout(() => {
//           setIsJumping(true);
//           setCurrentIndex(cardsPerView + safePosts.length - 1);
//         }, transitionDuration);
//       }
//       return newIndex;
//     });

//     setTimeout(() => setIsAnimating(false), transitionDuration);
//   }, [isAnimating, cardsPerView, safePosts.length, transitionDuration]);

//   // Reset trạng thái jumping sau khi render
//   useEffect(() => {
//     if (isJumping) {
//       requestAnimationFrame(() => setIsJumping(false));
//     }
//   }, [isJumping]);

//   // Autoplay
//   useEffect(() => {
//     if (isHovering || isAnimating) return;
//     const timer = setInterval(handleNext, autoplayDelay);
//     return () => clearInterval(timer);
//   }, [isHovering, isAnimating, handleNext, autoplayDelay]);

//   if (safePosts.length === 0) return null;

//   // Tính toán chiều rộng container để căn giữa
//   const containerMaxWidth =
//     cardsPerView * cardWidth + (cardsPerView - 1) * cardGap;

//   return (
//     <div className="container py-8 relative flex flex-col items-center justify-center w-full">
//       {/* Tiêu đề section (Giữ lại từ component cũ) */}
//       <div className="w-full max-w-[1296px] mx-auto mb-6 px-4 xl:px-0">
//         <h2 className="font-bold text-2xl flex items-center gap-2">
//           <span>📰</span> BÀI VIẾT LIÊN QUAN
//         </h2>
//       </div>

//       {/* Nút PREV: Căn vị trí absolute dựa theo containerMaxWidth */}
//       <button
//         onClick={handlePrev}
//         style={{ left: `calc(50% - ${containerMaxWidth / 2}px - 60px)` }}
//         className="hidden lg:flex absolute z-10 h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-2xl font-bold shadow-md"
//         aria-label="Previous"
//         disabled={isAnimating}
//       >
//         <FiArrowLeft className="h-5 w-5" />
//       </button>

//       {/* Carousel Wrapper: Căn giữa chính xác */}
//       <div
//         ref={containerRef}
//         className="overflow-hidden mx-auto py-8 -my-8"
//         style={{
//           maxWidth: `${containerMaxWidth}px`,
//           width: "100%",
//         }}
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//         onTouchStart={() => setIsHovering(true)}
//         onTouchEnd={() => setIsHovering(false)}
//       >
//         <div
//           className="flex"
//           style={{
//             gap: `${cardGap}px`,
//             width: `${displayPosts.length * step}px`,
//             transform: `translateX(-${currentIndex * step}px)`,
//             transition: isJumping
//               ? "none"
//               : `transform ${transitionDuration}ms ease-in-out`,
//           }}
//         >
//           {displayPosts.map((post, idx) => (
//             <Link
//               key={idx}
//               href={`/blog/${post.category.slug}/${post.slug}`}
//               className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 flex-shrink-0"
//               style={{
//                 width: `${cardWidth}px`,
//                 minWidth: `${cardWidth}px`,
//                 height: "auto", // Cho phép chiều cao tự động
//               }}
//             >
//               {/* --- NỘI DUNG CARD (GIỮ NGUYÊN) --- */}
//               <div className="w-full h-48 relative overflow-hidden">
//                 <Image
//                   src={post.coverImage.url}
//                   alt={post.alt || post.title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//               </div>

//               <div className="flex flex-col flex-1 p-5">
//                 <p className="mb-2 text-xs font-semibold text-blue-700 flex items-center gap-2 uppercase tracking-wider">
//                   {post.category.name}
//                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                   <span className="text-gray-400 font-normal normal-case">
//                     {new Date(post.createdAt).toLocaleDateString("vi-VN")}
//                   </span>
//                 </p>
//                 <h3 className="font-bold text-lg text-black group-hover:text-blue-700 line-clamp-2 mb-2 min-h-[3.5rem]">
//                   {post.title}
//                 </h3>
//                 <p className="text-gray-500 line-clamp-2 text-sm">
//                   {post.description}
//                 </p>
//               </div>
//               {/* --- HẾT NỘI DUNG CARD --- */}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Nút NEXT */}
//       <button
//         onClick={handleNext}
//         style={{ right: `calc(50% - ${containerMaxWidth / 2}px - 60px)` }}
//         className="hidden lg:flex absolute z-10 h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-2xl font-bold shadow-md"
//         aria-label="Next"
//         disabled={isAnimating}
//       >
//         <FiArrowRight className="h-5 w-5" />
//       </button>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BlogCard } from "@/types";

interface RelatedPostsCarouselProps {
  posts: BlogCard[];
}

export default function RelatedPostsCarousel({
  posts,
}: RelatedPostsCarouselProps) {
  // --- CONFIG ---
  const FIXED_CARD_WIDTH = 290;

  const [config, setConfig] = useState({
    cardsPerView: 1,
    cardWidth: FIXED_CARD_WIDTH,
    cardGap: 24,
  });

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 1. RESPONSIVE ---
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newPerView = 1;
      let newGap = 24;

      if (width < 640) {
        newPerView = 1;
        newGap = 20;
      } else if (width < 1024) {
        newPerView = 2;
        newGap = 24;
      } else if (width < 1350) {
        newPerView = 3;
        newGap = 24;
      } else {
        newPerView = 4;
        newGap = 32;
      }

      setConfig({
        cardsPerView: newPerView,
        cardWidth: FIXED_CARD_WIDTH,
        cardGap: newGap,
      });
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

  const safePosts = Array.isArray(posts) ? posts : [];
  const clonedCardsStart = safePosts.slice(0, cardsPerView);
  const clonedCardsEnd = safePosts.slice(-cardsPerView);
  const displayPosts = [...clonedCardsEnd, ...safePosts, ...clonedCardsStart];

  // --- 2. NAVIGATION LOGIC ---
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex === cardsPerView + safePosts.length) {
        setTimeout(() => {
          setIsJumping(true);
          setCurrentIndex(cardsPerView);
        }, transitionDuration);
      }
      return newIndex;
    });

    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [isAnimating, cardsPerView, safePosts.length, transitionDuration]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex === cardsPerView - 1) {
        setTimeout(() => {
          setIsJumping(true);
          setCurrentIndex(cardsPerView + safePosts.length - 1);
        }, transitionDuration);
      }
      return newIndex;
    });

    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [isAnimating, cardsPerView, safePosts.length, transitionDuration]);

  useEffect(() => {
    if (isJumping) {
      requestAnimationFrame(() => setIsJumping(false));
    }
  }, [isJumping]);

  // --- 3. AUTOPLAY ---
  useEffect(() => {
    if (isPaused || isAnimating) return;
    const timer = setInterval(handleNext, autoplayDelay);
    return () => clearInterval(timer);
  }, [isPaused, isAnimating, handleNext, autoplayDelay]);

  // --- 4. TOUCH & SWIPE ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;

    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const handleMouseEnter = () => {
     setIsPaused(true);
     if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };
  
  const handleMouseLeave = () => setIsPaused(false);

  if (safePosts.length === 0) return null;

  // Tính toán chiều rộng container
  const containerMaxWidth =
    cardsPerView * cardWidth + (cardsPerView - 1) * cardGap;

  return (
    <div className="container py-8 pb-12 w-full">
      
      <div className="w-full max-w-[1296px] mx-auto mb-6 px-4 xl:px-0">
        <h2 className="font-bold text-2xl flex items-center gap-2">
          <span>📰</span> BÀI VIẾT LIÊN QUAN
        </h2>
      </div>

      {/* THAY ĐỔI LỚN Ở ĐÂY: 
        Tạo một thẻ Wrapper (relative) bao quanh cả Nút và Slider.
        Set maxWidth cho thẻ Wrapper này.
      */}
      <div 
        className="relative mx-auto group"
        style={{
          maxWidth: `${containerMaxWidth}px`,
          width: "100%",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* Nút PREV - Nằm đè lên bên trái (absolute left-0) */}
        <button
          onClick={handlePrev}
          // Thay đổi class: flex (luôn hiện), left-[-20px] hoặc left-2 tùy style (ở đây để left-2 cho nằm trong phạm vi như hình)
          // Thêm z-20 để nổi lên trên card
          className="absolute left-2 z-20 top-1/2 -translate-y-1/2 flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg border border-gray-100 transition hover:bg-blue-50 backdrop-blur-sm"
          aria-label="Previous"
          disabled={isAnimating}
        >
          <FiArrowLeft className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
        </button>

        {/* --- SLIDER CONTAINER --- */}
        <div
          ref={containerRef}
          className="overflow-hidden py-8 -my-8 w-full"
          style={{ touchAction: "pan-y pinch-zoom" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-stretch"
            style={{
              gap: `${cardGap}px`,
              width: `${displayPosts.length * step}px`,
              transform: `translateX(-${currentIndex * step}px)`,
              transition: isJumping
                ? "none"
                : `transform ${transitionDuration}ms ease-in-out`,
            }}
          >
            {displayPosts.map((post, idx) => (
              <Link
                key={idx}
                href={`/blog/${post.category.slug}/${post.slug}`}
                className="group/card flex flex-col h-full overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 flex-shrink-0 relative select-none"
                style={{
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                }}
                onDragStart={(e) => e.preventDefault()}
              >
                <div className="w-full h-48 relative overflow-hidden flex-shrink-0">
                  <Image
                    src={post.coverImage.url}
                    alt={post.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    style={{ pointerEvents: "none" }}
                  />
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <p className="mb-2 text-xs font-semibold text-blue-700 flex items-center gap-2 uppercase tracking-wider">
                    {post.category.name}
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-gray-400 font-normal normal-case">
                      {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </p>
                  <h3 className="font-bold text-lg text-black group-hover/card:text-blue-700 line-clamp-2 mb-2 min-h-[3.5rem]">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 line-clamp-2 text-sm mt-auto">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Nút NEXT - Nằm đè lên bên phải (absolute right-0) */}
        <button
          onClick={handleNext}
          // absolute right-2 để nằm sát mép phải bên trong
          className="absolute right-2 z-20 top-1/2 -translate-y-1/2 flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg border border-gray-100 transition hover:bg-blue-50 backdrop-blur-sm"
          aria-label="Next"
          disabled={isAnimating}
        >
          <FiArrowRight className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
        </button>

      </div>
    </div>
  );
}