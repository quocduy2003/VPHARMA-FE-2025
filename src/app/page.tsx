// app/page.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { homePageData } from "@/lib/api/home";
import ReviewCarousel from "@/components/ReviewCarousel";
import Link from "next/link";

import { FiArrowRight } from "react-icons/fi";
import FeatureCard from "@/components/ui/FeatureCard";
import { Button } from "@/components/ui/CTAButton";
import { getBlogPosts } from "@/lib/api/blog";
import { BlogCard } from "@/types";
import {
  transformBlogListData,
} from "@/lib/transformers/blog";


export default function HomePage() {

  const {
    solutionSection,
    experienceSection,
    testimonialSection,
    featureSection,
    blogSection,
  } = homePageData;


  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [blogPosts, setBlogPosts] = useState<BlogCard[] | null>(null);
  const currentPage = 0;
  const pageSize = 3;
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const categorySlug = activeCategory === "Tất cả" ? "home" : activeCategory.toLowerCase().replace(/\s/g, "-");
        const response = await getBlogPosts(categorySlug, currentPage, pageSize);
        console.log('response', response);
        const transformedPosts = transformBlogListData(response);
        setBlogPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, [activeCategory]);

  return (
    <>
      <section
        id="hero"
        className="h-screen max-h-[1100px] bg-gradient-to-b from-blue-100 to-white overflow-y-clip"
      >
        <div className="container h-full w-full flex items-center justify-center flex-col text-center">
          <h6 className="capitalize text-primary mb-10">{homePageData.eyebrow}</h6>
          <h1 className="mx-auto max-w-5xl capitalize">{homePageData.title}</h1>
          <div className="flex items-center  justify-center ">
            <Button size="md" className="mt-5" href={homePageData.ctaButton.link || undefined} >
              {homePageData.ctaButton.title}
            </Button>
          </div>
        </div>
      </section>


      <section className="py-10">
        <div className="container bg-ink rounded-2xl p-10">
          <div className="text-center ">
            <h2 className=" text-white mb-5">
              {solutionSection.title}
            </h2>
            <p className="mb-15 text-h6 mx-auto max-w-2xl text-white/80">
              {solutionSection.description}
            </p>
          </div>

          <div className=" grid grid-cols-1 gap-10 md:grid-cols-3">
            {solutionSection.solutionCards.map((card, index) => (
              <article
                key={index}
                className="group relative rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40"
              >
                <h3 className="text-center mt-2 text-black">{card.title}</h3>

                <img
                  src={card.image}
                  alt={card.alt}
                  className="mx-auto my-4 h-70 w-auto object-cover"
                />

                <div className="flex justify-center mt-5">
                  <Link
                    href={card.ctaButton.link || "#"}
                    className="inline-flex items-center gap-2  px-4 py-2 text-sub1 font-bold text-primary"
                  >
                    {card.ctaButton.title}
                    <span className="text-sky-600">
                      <FiArrowRight className="font bold" />
                    </span>
                  </Link>
                </div>

                {/* Hiệu ứng glow bên dưới card */}
                <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-blue-100 to-transparent blur"></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="text-center">
          <p className="text-h6 mb-5 font-bold uppercase tracking-wide text-primary">
            {featureSection.title}
          </p>
          <h2 className="mb-15 text-black">{featureSection.description}</h2>
        </div>

        <div className="mt-10 space-y-16">
          <FeatureCard
            features={featureSection.featureCards}
            direction="right"
          />
        </div>

        {/* CTA */}
        <div className="mt-8 w-full text-center">
          <a
            href="/giai-phap/tong-quan"
            className="mt-10 group inline-flex items-center text-sub2 rounded-full bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/30 transition hover:opacity-90"
          >
            Khám phá giải pháp
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink">
        <div className="container mx-auto">
          {/* Eyebrow và title */}
          <div className="text-center">
            <p className="text-h6 mb-5 font-bold uppercase tracking-wide text-primary">
              {experienceSection.eyebrow}
            </p>
            <h2 className="mb-15 text-white">
              {experienceSection.title}
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-20 items-start max-w-5xl mx-auto">
            {/* Features bên trái */}
            <div>
              <ul className="space-y-8">
                {experienceSection.contents.map((item, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-4 rounded-xl p-5 transition-all duration-200
      bg-ink hover:bg-white hover:shadow-xl
      border border-transparent hover:border-sky-100
      max-w-3xl mx-auto "
                  >
                    <span
                      className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200 
          transition-all duration-200 group-hover:bg-emerald-200 group-hover:scale-105 aspect-square"
                      aria-label="Feature icon"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 md:h-5 md:w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 6v12M6 12h12" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-bold text-h6 text-white group-hover:text-black">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sub2 leading-6 text-white group-hover:text-colordescription">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

            </div>
            {/* Chart bên phải */}




            {/* Chỉnh lại cái này còn một ảnh */}





            <div className="relative min-h-[340px] flex items-center justify-center">
              {/* Nền lót phía sau (background block) */}
              <div
                className="absolute left-[55px] top-[55px] w-[300px] h-[230px] rounded-lg bg-white/30"
                style={{ zIndex: 1 }}
              ></div>
              {/* Card lớn phía trên */}
              <div
                className="absolute left-[110px] top-[0px] bg-white rounded-xl shadow-lg w-[295px] p-5"
                style={{ zIndex: 2 }}
              >
                {/* <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-800">
                    Total Balance
                  </span>
                  <span className="font-bold text-gray-900">$4,200</span>
                </div>
                <div className="font-medium text-green-500 mb-3">+14%</div> */}
                <img
                  src="/chart.png"
                  alt="Total Balance Chart"
                  className="w-full h-60 object-contain"
                />
              </div>
              {/* Card nhỏ ở dưới trái */}
              <div
                className="absolute left-[0px] bottom-[0px] bg-gray-500 rounded-xl shadow-lg w-[195px] p-5"
                style={{ zIndex: 3 }}
              >
                <img
                  src="/chart.png"
                  alt="Total Balance Mini Chart"
                  className="w-full h-20 object-contain"
                />
              </div>
            </div>
          </div>
          {/* CTA Button ngoài grid */}
          <div className="mt-10 w-full flex justify-center">
            <a
              href="/about-us"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-bold text-sky-700 border border-sky-200 shadow transition hover:bg-primary hover:text-white hover:border-transparent"
            >
              Tìm hiểu về V-Pharma
            </a>
          </div>
        </div>
      </section>

      {/* SECTION REVIEWS */}
      <ReviewCarousel sectionData={testimonialSection} />

      {/* <-- NEW SECTION 5: BLOG --> */}
      <section className="py-10 bg-white">
        <div className="container">
          {/* Header (Centered) */}
          <div className="text-center">
            <h2 className="mb-15 text-black">
              {blogSection.title}
            </h2>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              <button
                key="all"
                onClick={() => setActiveCategory("Tất cả")}
                className={`rounded-full px-4 py-2 text-sub2 font-semibold border border-gray transition-colors ${activeCategory === "Tất cả"
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-black hover:bg-slate-100"
                  }`}
              >
                Tất cả
              </button>
              {blogSection.blogCategories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.name)}
                  className={`rounded-full px-4 py-2 text-sub2 font-semibold border border-gray transition-colors ${activeCategory === category.name
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
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sub2 font-bold text-primary transition-colors hover:bg-sky-100"
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
