"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import PharmacyCarousel from "@/components/PharmacyCarousel";
import CTASection from "@/components/CTA";
import { customerData, getBlogsByCategorySlug } from "@/lib/api";
import { Card, CustBlogPost } from "@/types";
import { transformCustomerBlogData } from "@/lib/transformers/customer";
import { Button } from "@/components/ui/CTAButton";

// --- 1. TYPE DEFINITION FIX ---
// Mở rộng interface để bao gồm cả 'createdAt' và 'category'
// Giúp TS hiểu đúng kiểu dữ liệu trả về từ API mà không cần dùng 'any'
interface ExtendedCustBlogPost extends CustBlogPost {
  createdAt?: string | Date;
  category?: {
    name: string;
    slug: string;
  };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

function StackedCards({ challengeCards }: { challengeCards: Card[] }) {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const isScrolling = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { width } = useWindowSize();
  const isDesktop = width >= 1280;

  const resetInteractionTimer = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current)
        clearTimeout(interactionTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isHovered || isUserInteracting) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % challengeCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, isUserInteracting, challengeCards.length]);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || !isDesktop) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resetInteractionTimer();

      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 20) return;

      isScrolling.current = true;

      if (e.deltaY > 0) {
        setActive((a) => (a + 1) % challengeCards.length);
      } else {
        setActive(
          (a) => (a - 1 + challengeCards.length) % challengeCards.length
        );
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    };

    node.addEventListener("wheel", wheelHandler, { passive: false });
    return () => node.removeEventListener("wheel", wheelHandler);
  }, [challengeCards.length, isDesktop]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    setIsHovered(false);
    resetInteractionTimer();

    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) setActive((a) => (a + 1) % challengeCards.length);
    else if (distance < -50)
      setActive((a) => (a - 1 + challengeCards.length) % challengeCards.length);

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const stackCards = [];
  for (let i = 0; i < 3; i++) {
    const idx = (active + i) % challengeCards.length;
    stackCards.push({ ...challengeCards[idx], stackIndex: i });
  }

  return (
    <div className="mx-auto w-full max-w-5xl ">
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex justify-center w-full h-[480px] md:h-[500px] items-center cursor-pointer select-none relative outline-none"
        tabIndex={0}
      >
        <AnimatePresence mode="popLayout">
          {stackCards
            .slice()
            .reverse()
            .map((item, reverseIdx) => {
              const stackIdx = stackCards.length - 1 - reverseIdx;
              const isActive = stackIdx === 2;

              let baseWidth = 840;
              if (width < 640) baseWidth = width - 32;
              else if (width < 1280) baseWidth = 600;
              else if (width < 1400) baseWidth = 700;

              const scale = isActive ? 1 : stackIdx === 1 ? 0.95 : 0.9;
              const translateY = isActive
                ? 0
                : stackIdx === 1
                ? width < 640
                  ? 20
                  : 30
                : width < 640
                ? 40
                : 60;
              const opacity = isActive ? 1 : stackIdx === 1 ? 0.7 : 0.4;
              const zIndex = 10 + stackIdx;

              return (
                <motion.div
                  key={`${item.name}-${active}`}
                  layout
                  initial={{ scale: 0.85, opacity: 0, y: 100 }}
                  animate={{ scale, opacity, y: translateY }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="absolute left-0 right-0 mx-auto bg-white shadow-2xl rounded-2xl flex flex-col items-center overflow-hidden border border-gray-100"
                  style={{
                    width: isActive
                      ? baseWidth
                      : baseWidth - (width < 640 ? 20 : 40),
                    height: isActive
                      ? width < 640
                        ? 400
                        : 400
                      : width < 640
                      ? 360
                      : 360,
                    maxWidth: "100%",
                    zIndex,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div
                    className={`flex flex-col items-center w-full h-full p-4 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={item.image}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-3 md:mb-5 mt-6 md:mt-10 border-4 border-white shadow-sm"
                      alt={item.name}
                      width={80}
                      height={80}
                    />
                    <p className="font-bold text-[length:var(--text-sub1)] md:text-[length:var(--text-h5)] mb-2 text-ink">
                      {item.name}
                    </p>
                    <p className="text-[length:var(--text-sm)] md:text-[length:var(--text-body2)] text-gray-500 mb-4">
                      {item.address}
                    </p>
                    <div className="text-center text-[length:var(--text-body2)] md:text-[length:var(--text-sub1)] text-gray-800 italic px-4 md:px-12 line-clamp-5 md:line-clamp-4">
                      {`"${item.quote}"`}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BlogSection({ slug }: { slug: string }) {
  const [blogs, setBlogs] = useState<ExtendedCustBlogPost[]>([]);
  const pageSize = 6;

  useEffect(() => {
    async function fetchData() {
      const response = await getBlogsByCategorySlug(slug, 1, pageSize);
      // Ép kiểu an toàn sang ExtendedCustBlogPost
      setBlogs(
        transformCustomerBlogData(response) as unknown as ExtendedCustBlogPost[]
      );
    }
    fetchData();
  }, [slug]);

  return (
    <section>
      <div className="">
        {/* Container Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10">
          {blogs.map((blog, index) => {
            return (
              <Link
                key={index}
                href={`/blog/${slug}/${blog.slug}`}
                // --- QUAN TRỌNG: RESPONSIVE LOGIC ---
                // Mặc định (Screen < 480px): flex-row (LIST VIEW - Ngang)
                // sm: (Screen >= 480px): flex-col (CARD VIEW - Dọc)
                className="group flex flex-row sm:flex-col gap-4 bg-white rounded-lg transition-all h-full sm:p-0 border border-transparent sm:border-gray-100 sm:hover:shadow-lg sm:rounded-xl"
              >
                {/* --- KHỐI HÌNH ẢNH --- */}
                {/* < 480px: w-32 cố định. >= 480px: full width */}
                <div className="relative shrink-0 overflow-hidden rounded-lg w-32 h-24 sm:w-full sm:h-48 sm:rounded-t-xl sm:rounded-b-none">
                  <Image
                    fill
                    src={blog.coverImage.url}
                    alt={blog.title || "Blog Image"}
                    sizes="(max-width: 480px) 128px, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* --- KHỐI NỘI DUNG --- */}
                <div className="flex flex-col flex-1 justify-center sm:p-4 sm:pt-2">
                  {/* Category & Date */}
                  <div className="mb-1 sm:mb-2 flex items-center flex-wrap text-xs sm:text-sm lg:text-body2 font-bold text-primary uppercase tracking-wider">
                    {/* TS Fix: Đã khai báo category trong interface nên không còn lỗi */}
                    {blog.category?.name || "Tin tức"}
                    <span className="mx-1 sm:mx-2 text-gray-300">•</span>
                    <span className="font-normal text-gray-500 text-xs sm:text-sm lg:text-body2 normal-case">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : new Date().toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <h3 className="mb-1 sm:mb-2 text-body2 sm:text-sub2 lg:text-body3 font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="hidden sm:line-clamp-2 text-sm sm:text-body2 lg:text-sub2 text-gray-500 text-ellipsis leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function KhachHang() {
  const { challengeSection, brandReviewSection, custBlogSection, ctaSection } =
    customerData;

  return (
    <>
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center ">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-[length:var(--text-sub1)] md:text-[length:var(--text-h6)] font-bold capitalize tracking-wide text-primary">
              {customerData.eyebrow.toLowerCase()}
            </p>
            <h1 className="mb-6 max-w-5xl mx-auto">{customerData.mainTitle}</h1>

            <p className=" mx-auto mb-10 max-w-lg text-sub2 md:text-sub1 lg:text-h6 text-colordescription md:max-w-xl lg:max-w-2xl">
              {customerData.mainDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="">
        <FadeInOnScroll>
          <div className="container mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="mb-4 md:mb-6 text-black">
                {challengeSection.title}
              </h2>
              <p className="text-body2 md:text-sub1 lg:text-h6 text-colordescription mx-auto max-w-3xl">
                {challengeSection.description}
              </p>
            </div>
            <StackedCards challengeCards={challengeSection.cards} />
          </div>
        </FadeInOnScroll>
      </section>

      <FadeInOnScroll>
        <section className="bg-white">
          <div className="container mx-auto">
            <div className="mx-auto  max-w-6xl text-center">
              <p className="mb-5 text-sub2 md:text-sub1 lg:text-h6 font-bold capitalize tracking-wide text-primary">
                {brandReviewSection.eyebrow.toLowerCase()}
              </p>
              <h2 className="text-black">{brandReviewSection.title}</h2>
            </div>
            <div className="w-full">
              <PharmacyCarousel cards={brandReviewSection.reviewCards} />
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <section className="bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="mb-4 text-black">{custBlogSection.title}</h2>
              <p className="text-body2 md:text-sub1 lg:text-h6 text-colordescription mx-auto max-w-3xl">
                {custBlogSection.description}
              </p>
            </div>

            <BlogSection slug={custBlogSection.blog_category.slug} />

            <div className="flex items-center justify-center ">
              <Button
                size="md"
                href={`/blog/blog-home?category=${custBlogSection.blog_category.slug}`}
              >
                {custBlogSection.buttonTitle}
              </Button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      <section className="">
        <FadeInOnScroll>
          <CTASection ctaSection={ctaSection} />
        </FadeInOnScroll>
      </section>
    </>
  );
}