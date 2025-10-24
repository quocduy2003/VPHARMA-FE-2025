// app/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { homePageData } from "@/lib/api/home";
import ReviewCarousel from "@/components/ReviewCarousel";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import { FiArrowRight } from "react-icons/fi";
import FeatureCard from "@/components/ui/FeatureCard";

type Feature = {
  title: string;
  desc: string;
  icon?: string;
};

type Review = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
};

type Blog = {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  desc: string;
};

// Dữ liệu động mẫu
const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Chị Ngọc Anh",
    role: "Nhà thuốc số 2",
    avatar: "/avatar1.png",
    comment:
      "V-Pharma giúp tôi tối ưu hóa việc kiểm soát tồn kho và doanh thu hằng ngày rất hiệu quả.",
    rating: 5,
  },
  {
    id: 2,
    name: "Anh Minh Tâm",
    role: "Chuỗi thuốc Tâm An",
    avatar: "/avatar2.png",
    comment:
      "Từ khi áp dụng hệ thống, việc quản lý chi nhánh trở nên dễ dàng hơn rất nhiều.",
    rating: 5,
  },
  {
    id: 3,
    name: "Chị Hồng Nhung",
    role: "Nhà thuốc Nhung Phát",
    avatar: "/avatar3.png",
    comment:
      "Phần mềm thân thiện, đội ngũ hỗ trợ nhiệt tình, phản hồi nhanh chóng.",
    rating: 5,
  },
];

const BLOGS: Blog[] = [
  {
    id: 1,
    title:
      "Xây dựng quy trình chuẩn hóa cho các hoạt động bán lẻ sản phẩm chăm sóc sức khỏe",
    date: "29/04/2023",
    image: "/blog1.png",
    category: "Kinh nghiệm kinh doanh",
    desc: "Xây dựng quy trình chuẩn giúp các nhà thuốc vận hành đồng bộ, tiết kiệm chi phí và tối ưu doanh thu.",
  },
  {
    id: 2,
    title: "Chuyển đổi số trong ngành Dược – Xu hướng tất yếu của thời đại",
    date: "30/04/2023",
    image: "/blog2.png",
    category: "Chuyển đổi số",
    desc: "Ứng dụng công nghệ giúp quản lý chuỗi nhà thuốc hiệu quả và nâng cao trải nghiệm khách hàng.",
  },
  {
    id: 3,
    title: "Quản lý tồn kho tối ưu nhờ công nghệ thông minh",
    date: "01/05/2023",
    image: "/blog3.png",
    category: "Quản lý bán hàng",
    desc: "Giải pháp giúp các chủ nhà thuốc giảm thất thoát hàng tồn và tăng hiệu quả kinh doanh.",
  },
];
export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(
    "Kinh nghiệm kinh doanh"
  );

  const filteredBlogs = BLOGS.filter((b) => b.category === selectedCategory);
  const {
    solutionSection,
    experienceSection,
    testimonialSection,
    featureSection,
  } = homePageData;
  console.log("homepage", homePageData);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const allCategories = [
    "Tất cả",
    "Kinh nghiệm kinh doanh",
    "Chuyển đổi số",
    "Quản lý kho",
  ];
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredPosts = (
    activeCategory === "Tất cả"
      ? blogPosts
      : blogPosts.filter((post) => post.categories.includes(activeCategory))
  ).slice(0, 3); 
  return (
    <>
      <section
        id="hero"
        className="h-screen max-h-[1100px] bg-gradient-to-b from-blue-100 to-white overflow-y-clip"
      >
        <div className="container h-full w-full flex items-center justify-center flex-col text-center">
          <h6 className="capitalize text-primary mb-10">{homePageData.eyebrow}</h6>
          <h1 className="mx-auto max-w-5xl capitalize">{homePageData.title}</h1>
          <div className="flex items-center  justify-center mt-10">
            <button className="btn font-bold ">Đăng Ký dùng thử</button>
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
            className="group inline-flex items-center text-sub1 gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/30 transition hover:opacity-90"
          >
            Khám phá giải pháp
          </a>
        </div>
      </section>

      <section className="bg-ink">
        <div className="container">
          <div className="text-center">
            <p className="text-h6 mb-5 font-bold uppercase tracking-wide text-primary">
              V-Pharma
            </p>
            <h2 className="mb-15 text-white">
              Thiết Kế Riêng Biệt Cho Ngành Dược
            </h2>
          </div>
          <div className="mt-10 space-y-16">
          <FeatureCard
            features={featureSection.featureCards}
            direction="left"
          />
        </div>
          {/* CTA Button ngoài grid */}
          <div className="mt-10 w-full flex justify-center">
            <a
              href="/about-us"
              className="group inline-flex items-center text-sub1 gap-2 rounded-full bg-white px-5 py-3 font-bold text-primary shadow-lg shadow-primary/30 transition hover:opacity-90"
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
              Cập Nhật Kiến Thức Cùng V-Pharma
            </h2>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Tabs (Left-aligned) */}
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sub2 font-semibold border border-gray transition-colors ${
                    activeCategory === category
                      ? "bg-primary  text-white shadow-md"
                      : "bg-white text-black hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View All Link (Right-aligned) */}
            <Link
              href="/blog/blog-home"
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sub2 font-bold text-primary transition-colors hover:bg-sky-100"
            >
              Xem tất cả bài viết
              <FiArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Post Grid (No Change) */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.title}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <Link
                  href={`/blog/${post.categories.slug}/${post.slug}`}
                  className="block overflow-hidden"
                >
                  <Image
                    src={post.imageTitle}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">
                        {post.categories[0]}
                      </span>
                      <span className="text-sm text-slate-500">·</span>
                      <span className="text-sm text-colordescription ">
                        {new Date(post.date).toLocaleDateString("vi-VN")}
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
