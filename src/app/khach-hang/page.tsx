"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import PharmacyCarousel from "@/components/PharmacyCarousel";
import CTASection from "@/components/CTA";
import { customerData, getBlogsByCategorySlug } from "@/lib/api";
import { Card, CustBlogPost } from "@/types";
import { transformCustomerBlogData } from "@/lib/transformers/customer";

function ChallengeStackedCards({ challengeCards }: { challengeCards: Card[] }) {
  const [active, setActive] = useState(0);
  const isScrolling = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0) {
        setActive((a) => (a + 1) % challengeCards.length);
      } else {
        setActive((a) => (a - 1 + challengeCards.length) % challengeCards.length);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 400);
    };

    node.addEventListener("wheel", wheelHandler, { passive: false });
    return () => node.removeEventListener("wheel", wheelHandler);
  }, [active, challengeCards.length]);

  const stackCards = [];
  for (let i = 0; i < 3; i++) {
    const idx = (active + i) % challengeCards.length;
    stackCards.push({ ...challengeCards[idx], stackIndex: i });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div
        ref={cardRef}
        className="flex justify-center w-full max-w-2xl h-[500px] items-center cursor-pointer select-none relative"
        tabIndex={0}
      >
        {stackCards
          .slice()
          .reverse()
          .map((item, reverseIdx) => {
            const stackIdx = stackCards.length - 1 - reverseIdx;
            const isActive = stackIdx === 2;

            const scale = isActive ? 1 : stackIdx === 1 ? 1.1 : 0.9;
            const translateY = isActive ? 0 : stackIdx === 1 ? 35 : 60;
            const opacity = isActive ? 1 : 0.6;
            const zIndex = 10 + stackIdx;

            return (
              <motion.div
                key={`${active}-${stackIdx}`}
                initial={{ scale: 0.85, opacity: 0, y: 100 }}
                animate={{ scale, opacity, y: translateY }}
                transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                className="absolute left-0 right-0 mx-auto bg-white shadow-2xl rounded-2xl flex flex-col items-center overflow-hidden"
                style={{
                  width: isActive ? 840 : 800,
                  height: isActive ? 400 : 360,
                  zIndex,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <img
                  src={item.image}
                  className="w-20 h-20 rounded-full object-cover mb-6 mt-12"
                  alt={item.name}
                />
                <div className="font-bold text-2xl mb-2">{item.name}</div>
                <div className="text-lg text-gray-500 mb-4">{item.address}</div>
                <div className="text-center text-lg text-gray-800 italic px-8">
                  {item.quote}
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}

function BlogSection({ slug }: { slug: string }) {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<CustBlogPost[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    async function fetchData() {
      const response = await getBlogsByCategorySlug(slug, page, pageSize);
      setBlogs(transformCustomerBlogData(response));
      setPageCount(response.meta.pagination.pageCount);
    }
    fetchData();
  }, [slug, page]);

  return (
    <section className="py-10 bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto w-full px-4 sm:px-6 md:px-8 max-w-6xl overflow-x-clip">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 justify-center">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 mx-auto w-full max-w-[360px] min-w-[220px]"
            >
              <div className="relative w-full h-44 sm:h-48 md:h-56 xl:h-64 rounded-t-xl overflow-hidden">
                <Image
                  src={blog.coverImage.url}
                  alt={blog.title || "Blog Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-gray-800">
                  {blog.title}
                </h3>
                <button className="text-blue-600 font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all">
                  Đọc thêm <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-6 gap-x-4">
          <button
            className="text-primary h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ←
          </button>
          <span>
            {page}/{pageCount}
          </span>
          <button
            className="text-primary h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            aria-label="Next page"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default function KhachHang() {
  const { challengeSection, brandReviewSection, custBlogSection, ctaSection } = customerData;

  return (
    <div className="py-10">
      <section className="h-screen bg-blue-100 py-20 text-center">
        <div className="container mx-auto max-w-6xl ">
          <p className="mb-2 text-h6 font-bold uppercase tracking-wide text-primary">
            {customerData.eyebrow}
          </p>
          <h1 className="text-black">{customerData.mainTitle}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-h6">{customerData.mainDescription}</p>
        </div>
      </section>

      <section className="py-20">
        <FadeInOnScroll>
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-black">{challengeSection.title}</h2>
            <p className="text-h6 mx-auto max-w-3xl text-center">{challengeSection.description}</p>
            <ChallengeStackedCards challengeCards={challengeSection.cards} />
          </div>
        </FadeInOnScroll>
      </section>

      <FadeInOnScroll>
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-6xl text-center">
              <p className="mb-2 text-h6 font-bold uppercase tracking-wide text-primary">{brandReviewSection.eyebrow}</p>
              <h2 className="mb-4 text-black">{brandReviewSection.title}</h2>
            </div>
            <PharmacyCarousel cards={brandReviewSection.reviewCards} />
          </div>
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <section className="bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-black">{custBlogSection.title}</h2>
              <p className="text-h6 mx-auto max-w-3xl">{custBlogSection.description}</p>
            </div>
            <BlogSection slug={custBlogSection.blog_category.slug} />
          </div>
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <CTASection ctaSection={ctaSection} />
      </FadeInOnScroll>
    </div>
  );
}
