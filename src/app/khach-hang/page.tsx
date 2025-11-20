"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import PharmacyCarousel from "@/components/PharmacyCarousel";
import CTASection from "@/components/CTA";
import { customerData, getBlogsByCategorySlug } from "@/lib/api";
import { Card, CustBlogPost } from "@/types";
import { transformCustomerBlogData } from "@/lib/transformers/customer";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/CTAButton";

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

function ChallengeStackedCards({ challengeCards }: { challengeCards: Card[] }) {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // State mới: Kiểm soát việc tạm dừng do tương tác người dùng
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const isScrolling = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Ref mới: Lưu trữ ID của bộ đếm ngược 5s
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { width } = useWindowSize();
  const isDesktop = width >= 1280;

  // --- 1. HELPER: RESET TIMER 5S ---
  // Hàm này sẽ được gọi mỗi khi người dùng cuộn hoặc vuốt
  const resetInteractionTimer = () => {
    setIsUserInteracting(true); // Tạm dừng Auto Scroll ngay

    // Xóa timer cũ nếu người dùng liên tục cuộn
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    // Thiết lập timer mới: Sau 5s không làm gì thì cho chạy lại
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  // Cleanup timer khi component unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current)
        clearTimeout(interactionTimeoutRef.current);
    };
  }, []);

  // --- 2. AUTO SCROLL LOGIC ---
  useEffect(() => {
    // Auto scroll chỉ chạy khi: KHÔNG hover VÀ KHÔNG đang tương tác (trong 5s chờ)
    if (isHovered || isUserInteracting) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % challengeCards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, isUserInteracting, challengeCards.length]);

  // --- 3. WHEEL LOGIC (Desktop) ---
  useEffect(() => {
    const node = cardRef.current;
    if (!node || !isDesktop) return;

    const wheelHandler = (e: WheelEvent) => {
      // Chặn cuộn trang
      e.preventDefault();
      e.stopPropagation();

      // Kích hoạt logic tạm dừng 5s
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

  // --- 4. SWIPE LOGIC (Mobile/Tablet) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    setIsHovered(false);

    // Cũng áp dụng logic 5s cho thao tác vuốt tay
    resetInteractionTimer();

    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) setActive((a) => (a + 1) % challengeCards.length);
    else if (distance < -50)
      setActive((a) => (a - 1 + challengeCards.length) % challengeCards.length);

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // --- RENDER ---
  const stackCards = [];
  for (let i = 0; i < 3; i++) {
    const idx = (active + i) % challengeCards.length;
    stackCards.push({ ...challengeCards[idx], stackIndex: i });
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
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
  const [blogs, setBlogs] = useState<CustBlogPost[]>([]);
  const pageSize = 6;

  useEffect(() => {
    async function fetchData() {
      const response = await getBlogsByCategorySlug(slug, 1, pageSize);
      setBlogs(transformCustomerBlogData(response));
    }
    fetchData();
  }, [slug]);

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="relative w-full aspect-[16/9] rounded-t-xl overflow-hidden">
                <Image
                  fill
                  src={blog.coverImage.url}
                  alt={blog.title || "Blog Image"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-[length:var(--text-sub1)] mb-3 line-clamp-2 text-ink leading-[1.4]">
                  {blog.title}
                </h3>
                <div className="mt-auto pt-2">
                  <button className="text-primary text-[length:var(--text-body2)] font-bold flex items-center gap-2 group hover:underline decoration-primary underline-offset-4">
                    Đọc thêm{" "}
                    <span className="group-hover:translate-x-1 transition-transform">
                      <FiArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
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
      {/* HERO SECTION */}
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

            <p className=" mx-auto mb-10 max-w-lg text-body2 md:text-sub1 lg:text-h6 text-colordescription md:max-w-xl lg:max-w-2xl">
              {customerData.mainDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CHALLENGE SECTION */}
      <section className="">
        <FadeInOnScroll>
          <div className="container mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="mb-4 md:mb-6 text-black">
                {challengeSection.title}
              </h2>
              <p className="text-[length:var(--text-body2)] md:text-[length:var(--text-sub1)] text-gray-600 mx-auto max-w-3xl">
                {challengeSection.description}
              </p>
            </div>

            <ChallengeStackedCards challengeCards={challengeSection.cards} />
          </div>
        </FadeInOnScroll>
      </section>

      {/* BRAND REVIEW SECTION */}
      <FadeInOnScroll>
        <section className="bg-white">
          <div className="container mx-auto">
            <div className="mx-auto mb-10 md:mb-16 max-w-6xl text-center">
              <p className="mb-3 text-[length:var(--text-sub1)] font-bold capitalize tracking-wide text-primary">
                {brandReviewSection.eyebrow.toLowerCase()}
              </p>
              <h2 className="text-black">{brandReviewSection.title}</h2>
            </div>
            {/* Giả sử PharmacyCarousel đã handle responsive bên trong, nếu chưa hãy bọc div overflow-hidden */}
            <div className="w-full">
              <PharmacyCarousel cards={brandReviewSection.reviewCards} />
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* BLOG SECTION */}
      <FadeInOnScroll>
        <section className="bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="mb-4 text-black">{custBlogSection.title}</h2>
              <p className="text-[length:var(--text-body2)] md:text-[length:var(--text-sub1)] text-gray-600 mx-auto max-w-3xl">
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

      {/* CTA SECTION */}
      <section className="">
        <FadeInOnScroll>
          {/* CTASection thường đã có container bên trong, nếu không thì bọc thêm */}
          <CTASection ctaSection={ctaSection} />
        </FadeInOnScroll>
      </section>
    </>
  );
}
