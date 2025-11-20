"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/types";

interface RelatedPostsCarouselProps {
  posts: BlogCard[];
  visibleCount?: number; // số lượng item hiển thị desktop
}

export default function RelatedPostsCarousel({
  posts,
  visibleCount = 3,
}: RelatedPostsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const total = posts.length;
  const gap = 24; // px
  const duration = 400; // animation ms

  // Clone để loop
  const clonedStart = posts.slice(0, visibleCount);
  const clonedEnd = posts.slice(-visibleCount);
  const carouselPosts = [...clonedEnd, ...posts, ...clonedStart];

  const [curr, setCurr] = useState(visibleCount);
  const [animating, setAnimating] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  // Tính lại cardWidth khi resize
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;

      let count = visibleCount;

      // Mobile → chỉ 1 item
      if (containerWidth < 640) count = 1;

      // tablet → 2 item
      if (containerWidth >= 640 && containerWidth < 1024)
        count = Math.min(2, visibleCount);

      // công thức: (containerWidth - gaps) / count
      const newWidth = (containerWidth - gap * (count - 1)) / count;
      setCardWidth(newWidth);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [visibleCount, gap]);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setCurr((i) => i + 1);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurr((i) => i - 1);
  };

  // xử lý loop nhảy về giữa
  useEffect(() => {
    if (!animating) return;
    const timer = setTimeout(() => {
      setAnimating(false);
      if (curr === carouselPosts.length - visibleCount) {
        setIsJumping(true);
        setCurr(visibleCount);
      }
      if (curr === 0) {
        setIsJumping(true);
        setCurr(total);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [curr, animating, visibleCount, carouselPosts.length, total]);

  useEffect(() => {
    if (isJumping) {
      requestAnimationFrame(() => setIsJumping(false));
    }
  }, [isJumping]);

  const trackWidth =
    carouselPosts.length * cardWidth + (carouselPosts.length - 1) * gap;

  return (
    <div className="container overflow-hidden">
      <h2 className="font-bold mb-4 flex items-center gap-2">
        <span>📰</span> BÀI VIẾT LIÊN QUAN
      </h2>

      <div ref={containerRef} className="overflow-hidden relative w-full">
        <div
          className="flex"
          style={{
            gap: `${gap}px`,
            width: `${trackWidth}px`,
            transform: `translateX(-${curr * (cardWidth + gap)}px)`,
            transition: isJumping
              ? "none"
              : `transform ${duration}ms cubic-bezier(.83,.05,.15,1.03)`,
          }}
        >
          {carouselPosts.map((post, idx) => (
            <Link
              key={idx}
              href={`/blog/${post.category.slug}/${post.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-lg hover:bg-gray-50 flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              <div className="w-full h-56 relative">
                <Image
                  src={post.coverImage.url}
                  alt={post.alt || post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
                />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <p className="mb-1 text-sm font-semibold text-blue-700 flex items-center gap-2">
                  {post.category.name}
                  <span className="ml-4 text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </p>
                <h3 className="font-bold text-lg text-black group-hover:text-blue-700 line-clamp-2 mt-1">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-500 line-clamp-2 text-sm">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Prev */}
        <button
          className=" absolute left-0 top-1/2 -translate-y-1/2
      bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center
      hover:bg-gray-100 z-20"
          onClick={handlePrev}
          disabled={animating}
        >
          &lt;
        </button>

        {/* Next */}
        <button
          className=" absolute right-0 top-1/2 -translate-y-1/2
      bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center
      hover:bg-gray-100 z-20"
          onClick={handleNext}
          disabled={animating}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}


//  import Link from "next/link";
// import Image from "next/image";
//

// export function BlogPostLine({ post }: { post: BlogCard }) {
//   return (
//     <Link
//       href={`/blog/${post.category.slug}/${post.slug}`}
//       className="group flex gap-4 items-start p-2 rounded-lg hover:bg-gray-50 transition"
//     >
//       {/* Ảnh nhỏ nằm bên trái */}
//       <div className="w-32 h-20 rounded overflow-hidden flex-shrink-0">
//         <Image
//           src={post.coverImage.url}
//           alt={post.alt || post.title}
//           width={160}
//           height={100}
//           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//       </div>

//       {/* Nội dung bên phải */}
//       <div className="flex flex-col flex-1">
//         <p className="mb-1 text-body2 font-semibold capitalize text-primary">
//           {post.category.name}
//           <span className="ml-4 text-body2 font-normal text-colordescription">
//             {post.createdAt
//               ? new Date(post.createdAt).toLocaleDateString("vi-VN", {
//                   day: "2-digit",
//                   month: "2-digit",
//                   year: "numeric",
//                 })
//               : ""}
//           </span>
//         </p>

//         <h3 className="text-sub1 text-black group-hover:text-primary line-clamp-1">
//           {post.title}
//         </h3>

//         <p className="text-body2 text-colordescription line-clamp-1">
//           {post.description}
//         </p>
//       </div>
//     </Link>
//   );
// }
