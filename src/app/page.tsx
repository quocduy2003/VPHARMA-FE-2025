"use client";

// --- SẮP XẾP IMPORTS ---

// React & Next.js Core
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Thư viện bên ngoài (Framer Motion)
import {
  motion,
  useMotionValue,
  useTransform,
  type Variants,
  AnimatePresence,
} from "framer-motion";

// Icons (react-icons)
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FaCapsules, FaPlus, FaDna, FaChartLine } from "react-icons/fa";
import { BsHexagon } from "react-icons/bs";
import {
  RiMicroscopeFill,
  RiStethoscopeFill,
  RiFileListFill,
} from "react-icons/ri";

// Components nội bộ
import ReviewCarousel from "@/components/ReviewCarousel";
import FeatureCard from "@/components/ui/FeatureCard";
import { Button } from "@/components/ui/CTAButton";

// API, Libs & Types
import { homePageData } from "@/lib/api/home";
import { getBlogPosts } from "@/lib/api/blog";
import { transformBlogListData } from "@/lib/transformers/blog";
import { BlogCard } from "@/types";
// --- KẾT THÚC SẮP XẾP IMPORTS ---

export default function HomePage() {
  // --- 1. Data & Destructuring ---
  const {
    solutionSection,
    experienceSection,
    testimonialSection,
    featureSection,
    blogSection,
  } = homePageData;

  // --- 2. State ---
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [blogPosts, setBlogPosts] = useState<BlogCard[] | null>(null);
  const [activeExperienceIndex, setActiveExperienceIndex] = useState<number>(0);
  const [trailIcons, setTrailIcons] = useState<
    { id: number; x: number; y: number; icon: React.ElementType }[]
  >([]);

  // --- 3. Refs ---
  const experienceIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const experienceResumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const trailIconRefs = useRef(0); // Dùng để tạo id duy nhất

  // --- 4. Constants & Motion Values ---
  const currentPage = 0;
  const pageSize = 3;
  const totalExperienceItems = experienceSection.contents.length;

  const clickableIcons = [
    FaCapsules,
    FaPlus,
    BsHexagon,
    FaDna,
    FaChartLine,
    RiMicroscopeFill,
    RiStethoscopeFill,
    RiFileListFill,
  ];

  // Motion values cho parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moveX_Large = useTransform(x, [0, 1], [-25, 25]);
  const moveY_Large = useTransform(y, [0, 1], [-25, 25]);
  const moveX_Small = useTransform(x, [0, 1], [-10, 10]);
  const moveY_Small = useTransform(y, [0, 1], [-10, 10]);

  // Animation variants
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  // --- 5. Handlers (Functions) ---
  const stopExperienceCycle = () => {
    if (experienceIntervalRef.current) {
      clearInterval(experienceIntervalRef.current);
      experienceIntervalRef.current = null;
    }
    if (experienceResumeTimerRef.current) {
      clearTimeout(experienceResumeTimerRef.current);
      experienceResumeTimerRef.current = null;
    }
  };

  const startExperienceCycle = () => {
    stopExperienceCycle();
    if (totalExperienceItems > 0) {
      experienceIntervalRef.current = setInterval(() => {
        setActiveExperienceIndex(
          (prevIndex) => (prevIndex + 1) % totalExperienceItems
        );
      }, 2000);
    }
  };

  const handleExperienceUserHover = (index: number) => {
    stopExperienceCycle();
    setActiveExperienceIndex(index);
  };

  const handleExperienceMouseLeaveList = () => {
    stopExperienceCycle();
    experienceResumeTimerRef.current = setTimeout(() => {
      startExperienceCycle();
    }, 5000); // 5 giây
  };

  // --- 6. Effects (useEffect) ---

  // --- ĐÃ XÓA useEffect BỊ TRÙNG LẶP Ở ĐÂY ---
  // (useEffect (dòng 72-87) bị thừa vì logic đã có ở dưới)

  // Effect: Fetch Blog Posts
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const categorySlug =
          activeCategory === "Tất cả"
            ? "home"
            : activeCategory.toLowerCase().replace(/\s/g, "-");
        console.log("Fetching posts for category:", categorySlug);
        const response = await getBlogPosts(
          categorySlug,
          currentPage,
          pageSize
        );
        console.log("response", response);
        const transformedPosts = transformBlogListData(response);
        setBlogPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, [activeCategory]);

  // Effect: Experience Section Carousel
  useEffect(() => {
    startExperienceCycle();
    return () => {
      stopExperienceCycle();
    };
  }, [startExperienceCycle, stopExperienceCycle, totalExperienceItems]);

  // Effect: Mouse Move (Parallax + Trail)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (heroRef.current) {
        // Cập nhật motion values cho parallax
        const rect = heroRef.current.getBoundingClientRect();
        const normalizedX = (event.clientX - rect.left) / rect.width;
        const normalizedY = (event.clientY - rect.top) / rect.height;
        x.set(normalizedX);
        y.set(normalizedY);

        // Tạo hiệu ứng trail
        const randomIcon =
          clickableIcons[Math.floor(Math.random() * clickableIcons.length)];
        trailIconRefs.current++; // Tăng ID

        setTrailIcons((prev) => {
          // 1. Tạo mảng mới
          const newTrail = [
            ...prev,
            {
              id: trailIconRefs.current,
              x: event.clientX,
              y: event.clientY,
              icon: randomIcon,
            },
          ];
          // 2. Giới hạn số lượng
          if (newTrail.length > 20) {
            return newTrail.slice(newTrail.length - 20);
          }
          // 3. Trả về mảng mới
          return newTrail;
        });
      }
    };

    const currentHeroRef = heroRef.current;
    currentHeroRef?.addEventListener("mousemove", handleMouseMove);

    return () => {
      currentHeroRef?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // --- SỬA: Đổi [x, y] thành [] để fix lỗi duplicate key ---

  // --- 7. JSX (Return) ---
  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[80vh] md:h-screen max-h-[1100px] bg-gradient-to-b from-blue-100 to-white overflow-hidden"
      >
        {/* 1. Viên thuốc xanh (float-bounce) */}
        <motion.div
          className="absolute top-[15%] left-[10%] text-blue-400/60 animate-float-bounce-slow"
          style={{ x: moveX_Large, y: moveY_Large }}
          transition={{ type: "spring", stiffness: 100, damping: 30 } as const}
        >
          <FaCapsules size={40} className="-rotate-45" />
        </motion.div>

        {/* 2. Lục giác ngọc (rotate-pulse) */}
        <motion.div
          className="absolute top-[70%] left-[20%] text-emerald-400/50 animate-rotate-pulse-medium"
          style={{ x: moveX_Small, y: moveY_Small }}
          transition={{ type: "spring", stiffness: 80, damping: 30 } as const}
        >
          <BsHexagon size={64} />
        </motion.div>

        {/* 3. Dấu cộng xanh (sway-fade) */}
        <motion.div
          className="absolute top-[20%] right-[15%] text-blue-400/60 animate-sway-fade-fast"
          style={{ x: moveX_Small, y: moveY_Large }}
          transition={{ type: "spring", stiffness: 90, damping: 30 } as const}
        >
          <FaPlus size={48} />
        </motion.div>

        {/* 4. Viên thuốc nhỏ ngọc (float-bounce) */}
        <motion.div
          className="absolute top-[60%] right-[10%] text-emerald-400/50 animate-float-bounce-fast"
          style={{ x: moveX_Large, y: moveY_Small }}
          transition={{ type: "spring", stiffness: 70, damping: 30 } as const}
        >
          <FaCapsules size={32} className="rotate-30" />
        </motion.div>

        {/* 5. DNA ngọc (rotate-pulse) */}
        <motion.div
          className="absolute top-[10%] right-[40%] text-emerald-400/50 animate-rotate-pulse-slow"
          style={{ x: moveX_Small, y: moveY_Small }}
          transition={{ type: "spring", stiffness: 85, damping: 30 } as const}
        >
          <FaDna size={36} />
        </motion.div>

        {/* 6. Biểu đồ xanh (sway-fade) */}
        <motion.div
          className="absolute top-[80%] left-[35%] text-blue-400/60 animate-sway-fade-medium"
          style={{ x: moveX_Large, y: moveY_Large }}
          transition={{ type: "spring", stiffness: 95, damping: 30 } as const}
        >
          <FaChartLine size={40} />
        </motion.div>

        {/* --- ICON MỚI: Kính hiển vi xanh (top-left) --- */}
        <motion.div
          className="absolute top-[5%] left-[30%] text-blue-300/60 animate-rotate-pulse-fast"
          style={{ x: moveX_Small, y: moveY_Large }}
          transition={{ type: "spring", stiffness: 110, damping: 30 } as const}
        >
          <RiMicroscopeFill size={30} className="-rotate-12" />
        </motion.div>

        {/* --- ICON MỚI: Ống nghe ngọc (bottom-right) --- */}
        <motion.div
          className="absolute bottom-[5%] right-[20%] text-emerald-300/50 animate-float-bounce-medium"
          style={{ x: moveX_Large, y: moveY_Small }}
          transition={{ type: "spring", stiffness: 75, damping: 30 } as const}
        >
          <RiStethoscopeFill size={45} className="rotate-45" />
        </motion.div>

        {/* --- ICON MỚI: Danh sách/Hồ sơ xanh (bottom-left) --- */}
        <motion.div
          className="absolute bottom-[15%] left-[15%] text-blue-300/60 animate-sway-fade-slow"
          style={{ x: moveX_Small, y: moveY_Large }}
          transition={{ type: "spring", stiffness: 90, damping: 30 } as const}
        >
          <RiFileListFill size={38} />
        </motion.div>

        {/* --- ICON MỚI: Dấu cộng nhỏ ngọc (top-right) --- */}
        <motion.div
          className="absolute top-[30%] right-[5%] text-emerald-300/50 animate-float-bounce-slow"
          style={{ x: moveX_Large, y: moveY_Small }}
          transition={{ type: "spring", stiffness: 80, damping: 30 } as const}
        >
          <FaPlus size={28} />
        </motion.div>

        {/* --- Hiệu ứng TRAIL của chuột --- */}
        <AnimatePresence>
          {trailIcons.map((icon) => {
            const IconComponent = icon.icon;
            return (
              <motion.div
                key={icon.id}
                className="absolute pointer-events-none" // Quan trọng
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1, 1.5] }}
                exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.5 } }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  left: icon.x,
                  top: icon.y,
                  x: "-50%", // Căn giữa icon
                  y: "-50%", // Căn giữa icon
                  filter: `blur(${Math.random() * 0.5}px)`,
                  zIndex: 5,
                }}
              >
                <IconComponent
                  size={16 + Math.random() * 10}
                  className={
                    Math.random() > 0.5
                      ? "text-blue-200/50"
                      : "text-emerald-200/50"
                  }
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Phần nội dung văn bản (z-index cao hơn) */}
        <div className="container h-full w-full flex items-center justify-center flex-col text-center relative z-20">
          <motion.h6
            className="capitalize text-primary mb-10"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {homePageData.eyebrow}
          </motion.h6>

          <motion.h1
            className="mx-auto max-w-6xl capitalize pb-3"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {homePageData.title}
          </motion.h1>

          <motion.div
            className="flex items-center justify-center "
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button size="md" href={homePageData.ctaButton.link || undefined}>
              {homePageData.ctaButton.title}
            </Button>
          </motion.div>
        </div>
      </section>

      {/*===== section 1 =====*/}
      <section className="mx-auto py-10">
        <div className="container bg-ink rounded-2xl p-10 mb-5">
          <div className="text-center ">
            <h2 className=" text-white mb-5">{solutionSection.title}</h2>
            <p className="text-h6 mx-auto max-w-2xl text-white hidden md:block">
              {solutionSection.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center mt-8 gap-10">
            {solutionSection.solutionCards.map((card, index) => (
              <article
                key={index}
                className="group relative rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40
                           w-full max-w-md md:w-auto md:max-w-none md:flex-1 md:basis-[45%] lg:flex-1 lg:basis-[30%]"
              >
                <h3 className="text-center mt-2 text-black">{card.title}</h3>

                <Image
                  src={card.image}
                  alt={card.alt}
                  width={640}
                  height={420}
                  className="mx-auto my-4 h-70 w-auto object-cover rounded-xl"
                />

                <div className="flex justify-center mt-5">
                  <Link
                    href={card.ctaButton.link || "#"}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sub1 font-bold text-primary"
                  >
                    {card.ctaButton.title}
                    <span className="text-sky-600">
                      <FiArrowRight className="font bold" />
                    </span>
                  </Link>
                </div>

                <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-blue-100 to-transparent blur"></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/*===== section 2 =====*/}
      <section className="container py-10">
        <div className="text-center">
          <p className="text-h6 mb-5 font-bold capitalize tracking-wide text-primary">
            {featureSection.title}
          </p>
          <h2 className="mb-15 text-black hidden md:block ">
            {featureSection.description}
          </h2>
        </div>

        <div className="mt-10 space-y-16">
          <FeatureCard
            features={featureSection.featureCards}
            direction="right"
          />
        </div>

        <div className="mt-15 w-full text-center">
          <a
            href="/giai-phap/tong-quan"
            className="group inline-flex items-center text-sub2 rounded-full bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/30 transition hover:opacity-90"
          >
            Khám phá giải pháp
          </a>
        </div>
      </section>

      {/*===== section 3 =====*/}
      <section className="relative overflow-hidden bg-ink">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-h6 mb-5 font-bold capitalize tracking-wide text-primary">
              {experienceSection.eyebrow}
            </p>
            <h2 className="mb-15 text-white hidden md:block ">
              {experienceSection.title}
            </h2>
          </div>
          <div className={`grid items-center lg:grid-cols-2 gap-8 md:gap-12`}>
            {/* Features bên trái */}
            <div className="flex justify-center ml-5">
              <ul
                className="space-y-7"
                onMouseLeave={handleExperienceMouseLeaveList}
              >
                {experienceSection.contents.map((item, i) => (
                  <li
                    key={i}
                    onMouseEnter={() => handleExperienceUserHover(i)}
                    className={`group flex items-start gap-5 rounded-xl p-5 transition-all duration-300
                      border max-w-3xl mx-auto
                      ${
                        activeExperienceIndex === i
                          ? "bg-white shadow-xl opacity-100" // Active
                          : "bg-ink border-transparent opacity-80 group-hover:bg-white group-hover:shadow-xl group-hover:border-sky-100 group-hover:opacity-100" // Inactive
                      }`}
                  >
                    <span
                      className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-full
                bg-emerald-100 text-success mr-1
                transition-all duration-300
                        ${
                          activeExperienceIndex === i
                            ? "bg-success text-white"
                            : "group-hover:bg-success group-hover:text-white"
                        }`}
                      aria-label="Feature icon"
                    >
                      <FiCheckCircle className="h-7 w-7" />
                    </span>
                    <div>
                      <h3
                        className={`font-bold text-h6 transition-colors duration-200
                          ${
                            activeExperienceIndex === i
                              ? "text-black"
                              : "text-white group-hover:text-black"
                          }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-1 text-sub2 leading-6 transition-colors duration-200
                          ${
                            activeExperienceIndex === i
                              ? "text-black"
                              : "text-white group-hover:text-black"
                          }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Hình ảnh (ẩn trên mobile/tablet) */}
            <div className="relative min-h-[340px] hidden lg:flex items-center justify-center">
              <div className="relative w-[405px] h-[340px]">
                <div
                  className="absolute left-[55px] top-[55px] w-[300px] h-[230px] rounded-lg bg-white/30"
                  style={{ zIndex: 1 }}
                ></div>
                <div
                  className="absolute left-[110px] top-[0px] bg-white rounded-xl shadow-lg w-[295px] p-5"
                  style={{ zIndex: 2 }}
                >
                  <Image
                    src="/chart.png"
                    alt="Total Balance Chart"
                    width={500}
                    height={240}
                    className="w-full h-60 object-contain"
                  />
                </div>
                <div
                  className="absolute left-[0px] bottom-[0px] bg-gray-500 rounded-xl shadow-lg w-[195px] p-5"
                  style={{ zIndex: 3 }}
                >
                  <Image
                    src="/chart.png"
                    alt="Total Balance Mini Chart"
                    width={500}
                    height={240}
                    className="w-full h-20 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* CTA Button ngoài grid */}
          <div className="mt-15 w-full flex justify-center">
            <a
              href="/about-us"
              className="text-sub2 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-primary shadow transition hover:bg-primary hover:text-white hover:border-transparent"
            >
              Tìm hiểu về V-Pharma
            </a>
          </div>
        </div>
      </section>

      {/*===== section 4 =====*/}
      <ReviewCarousel sectionData={testimonialSection} />

      {/*===== section 5 =====*/}
      <section className="py-10 bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-15 text-black ">{blogSection.title}</h2>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row ">
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              <button
                key="all"
                onClick={() => setActiveCategory("Tất cả")}
                className={`hover:-translate-y-1 rounded-full px-4 py-2 text-sub2 font-semibold border border-gray transition-colors ${
                  activeCategory === "Tất cả"
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Tất cả
              </button>
              {blogSection.blogCategories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`hover:-translate-y-1  rounded-full px-4 py-2 text-sub2 font-semibold border border-gray transition-colors ${
                    activeCategory === category.slug
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-black hover:bg-slate-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* View All Link */}
            <Link
              href="/blog/blog-home"
              className="hidden md:inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm lg:text-sub2 font-bold text-primary transition-colors hover:-translate-y-1"
            >
              {blogSection.ctaButton.title}
              <FiArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Post Grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts && blogPosts.length > 0 ? (
              blogPosts.map((post, index) => (
                <article
                  key={index}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <Link
                    href={`/blog/${post.category.slug}/${post.slug}`}
                    className="block overflow-hidden"
                  >
                    <Image
                      src={post.coverImage?.url || "/default-image.png"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary">
                          {post.category.name}
                        </span>
                        <span className="text-sm text-slate-500">·</span>
                        <span className="text-sm text-colordescription">
                          {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>

                      <h3 className="mt-3 text-sub2 font-bold text-colordescription transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-body2 text-colordescription">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <p>Không có bài viết nào.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
