"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { blogPosts } from "@/data/blogData";
import ReviewCarousel from "@/components/ReviewCarousel";

type Feature = {
  title: string;
  desc: string;
  icon?: string;
};

const FEATURES: Feature[] = [
  {
    title: "Quản Lý Giá Bán Toàn Chuỗi",
    desc: "Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách sử dụng danh mục dùng chung. Dễ dàng cập nhật.",
  },
  {
    title: "Quản Lý Giá Bán Toàn Chuỗi",
    desc: "Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách sử dụng danh mục dùng chung. Dễ dàng cập nhật.",
  },
  {
    title: "Quản Lý Giá Bán Toàn Chuỗi",
    desc: "Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách sử dụng danh mục dùng chung. Dễ dàng cập nhật.",
  },
  {
    title: "Quản Lý Giá Bán Toàn Chuỗi",
    desc: "Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách sử dụng danh mục dùng chung. Dễ dàng cập nhật.",
  },
];

// <--DATA  Review Carouel-->
const reviewSectionData = {
  title: "Khách Hàng Nói Gì Về V-Pharma",
  testimonials: [
    {
      id: 1,
      authorName: "Chị Ngọc Anh",
      authorLocation: "Nhà thuốc Cổ Nhuế 2",
      quote:
        "Dịch vụ hỗ trợ 1:1 thực sự khác biệt. Mọi vấn đề của tôi đều được giải quyết nhanh chóng.",
      avatar: { url: "/avt1.jpg" }, // Đã sửa
    },
    {
      id: 2,
      authorName: "Chị Ngọc Anh",
      authorLocation: "Nhà thuốc Cổ Nhuế 2",
      quote:
        "Dịch vụ hỗ trợ 1:1 thực sự khác biệt. Mọi vấn đề của tôi đều được giải quyết nhanh chóng.",
      avatar: { url: "/avt2.jpg" }, // Đã sửa
    },
    {
      id: 3,
      authorName: "Chị Ngọc Anh",
      authorLocation: "Nhà thuốc Cổ Nhuế 2",
      quote:
        "Dịch vụ hỗ trợ 1:1 thực sự khác biệt. Mọi vấn đề của tôi đều được giải quyết nhanh chóng.",
      avatar: { url: "/avt3.jpg" }, // Đã sửa
    },
    {
      id: 4,
      authorName: "Chị Ngọc Anh",
      authorLocation: "Nhà thuốc Cổ Nhuế 2",
      quote:
        "Dịch vụ hỗ trợ 1:1 thực sự khác biệt. Mọi vấn đề của tôi đều được giải quyết nhanh chóng.",
      avatar: { url: "/avt4.jpg" }, // Đã sửa
    },
    {
      id: 5,
      authorName: "Anh Minh Tuấn",
      authorLocation: "Nhà thuốc An Tâm",
      quote:
        "Phần mềm rất dễ dùng, báo cáo tồn kho và doanh thu rõ ràng, giúp tôi tiết kiệm nhiều thời gian.",
      avatar: { url: "/avt1.jpg" }, // Đã sửa (dùng lại)
    },
    {
      id: 6,
      authorName: "Chị Thanh Lan",
      authorLocation: "Quầy thuốc Hạnh Phúc",
      quote:
        "Từ khi dùng V-Pharma, tôi không còn lo lắng về việc kiểm kê hay thuốc hết hạn. Rất tuyệt vời!",
      avatar: { url: "/avt2.jpg" }, // Đã sửa (dùng lại)
    },
    {
      id: 7,
      authorName: "Dược sĩ Hùng",
      authorLocation: "Nhà thuốc Sức Khỏe Vàng",
      quote:
        "Đội ngũ hỗ trợ của V-Pharma rất chuyên nghiệp. Mọi thắc mắc đều được giải đáp ngay lập tức.",
      avatar: { url: "/avt3.jpg" }, // Đã sửa (dùng lại)
    },
  ],
};

export default function HomePage() {
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
  ).slice(0, 3); // Chỉ lấy 3 bài viết đầu tiên
  // <-- END NEW STATE FOR BLOG -->

  return (
    <>
      {/* Section 1: Hero (No Change) */}
      <section
        id="hero"
        className=" py-20 bg-gradient-to-b from-blue-100 to-white overflow-y-clip"
      >
        <div className="container h-full w-full flex items-center justify-center flex-col text-center">
          <h3 className="capitalize text-primary">
            the Best Pharmacy Management System
          </h3>
          <h1 className="mx-auto mt-4 max-w-5xl">
            Vận Hành Nhà Thuốc Hiệu Quả Cùng Giải Pháp V-Pharma
          </h1>
          <div className="flex items-center justify-center mt-9">
            <button className="text-sub1 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
              Đăng ký dùng thử
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Features (Hover Added) */}
      <section className="bg-ink rounded-3xl py-20  ">
        <div className="container  ">
          <div className="text-center ">
            <h2 className="text-white">
              Điều Gì Tạo Nên Sự Khác Biệt Của V-Pharma ?
            </h2>
            <p className="mt-5 text-h6 text-white">
              Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình vận
              hành và nâng cao hiệu quả kinh doanh.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 ">
              {/* <-- HOVER MODIFIED */}
              <h3 className="text-center mt-2 text-black">
                Nhà Thuốc/Quầy Thuốc
              </h3>
              <img
                src="/features-dashboard1.png"
                alt=""
                className="mt-5 mx-auto my-4 h-70 w-auto object-cover"
              />
              <div className="flex justify-center">
                <a
                  href="/giai-phap/tong-quan"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sub2 font-bold text-primary ring-1 ring-blue-500 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <FiArrowRight className=" h-5 w-5" />
                </a>
              </div>
              {/* glow under card */}
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>

            {/* Card 2 */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-1xl">
              {/* <-- HOVER MODIFIED */}
              <h3 className="text-center mt-2 text-black">Chuỗi Nhà Thuốc</h3>
              <img
                src="/features-dashboard2.png"
                alt=""
                className="mx-auto my-4 h-70 w-auto object-cover"
              />
              <div className="mt-5 flex justify-center">
                <a
                  href="/giai-phap/chuoi-nha-thuoc"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sub2 font-bold text-primary ring-1 ring-blue-500 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <FiArrowRight className=" h-5 w-5" />
                </a>
              </div>
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>

            {/* Card 3 */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              {/* <-- HOVER MODIFIED */}
              <h3 className="text-center mt-2 text-black">
                Phòng Khám/Phòng Mạch
              </h3>
              <img
                src="/features-dashboard3.jpg"
                alt=""
                className="mx-auto my-4 h-70 w-auto object-cover"
              />
              <div className="flex justify-center mt-5">
                <a
                  href="/giai-phap/giai-phap-tich-hop-cho-phong-kham"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sub2 font-bold text-primary ring-1 ring-blue-500 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <FiArrowRight className=" h-5 w-5" />
                </a>
              </div>
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>
          </div>
        </div>
      </section>

      {/* Section 2: Features light theme*/}
      <section className="container py-20">
        {/* Logo nhỏ trên tiêu đề */}
        <div className="text-center">
          <p className=" text-sub2 font-bold uppercase tracking-wide text-primary">
            V-Pharma
          </p>
          <h2 className="mt-3 text-black">
            Thiết Kế Riêng Biệt Cho Ngành Dược
          </h2>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          {/* Khối media bên trái */}
          <div>
            <ul className="space-y-7">
              {FEATURES.map((f, i) => (
                // <-- ADDED 'group' -->
                <li key={i} className=" flex gap-4 group">
                  <span
                    className="mt-1 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full 
                    bg-emerald-100 text-success ring-1 ring-inset ring-emerald-200
                    transition-all duration-300
                    group-hover:bg-success group-hover:text-white group-hover:ring-emerald-500"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 6v12M6 12h12" />
                    </svg>
                  </span>
                  <div>
                    {/* <-- FIXED TYPO 'fext-black' --> */}
                    <h3 className="font-semibold text-black group-hover:text-h5 group-hover:text-primary">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sub2 leading-6 text-colordescription group-hover:text-sub1 group-hover:text-primary">
                      {f.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Danh sách tính năng bên phải */}
          <div className="relative">
              {/* tấm nền bo góc */}
              <div className="rounded-2xl p-10">
                <div className=" mx-auto h-64 w-full max-w-[520px]">
                  {/* chart lớn - ĐÃ CHUYỂN SANG TOP-RIGHT */}
                  <Image
                    src="/chart.png"
                    alt="Total Balance"
                    width={640}
                    height={420}
                    className="absolute -top-4 right-0 w-[85%] h-auto"
                  />
                </div>
              </div>
            </div>
        </div>
        <div className="mt-8 w-full text-center">
          {/* <-- UPDATED BUTTON STYLE TO MATCH IMAGE --> */}
          <a
            href="/giai-phap/tong-quan"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/30 transition hover:opacity-90"
          >
            Khám phá giải pháp
          </a>
        </div>
      </section>

      {/* Section 3: Features dark theme */}
      <section className="bg-ink py-20">
        {/* Logo nhỏ trên tiêu đề */}
        <div className="container">
          <div className="text-center">
            <p className=" text-sub2 font-bold uppercase tracking-wide text-primary">
              V-Pharma
            </p>
            <h2 className="mt-3 text-white">
              Thiết Kế Riêng Biệt Cho Ngành Dược
            </h2>
          </div>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            {/* Khối media bên trái */}
            <div className="relative">
              {/* tấm nền bo góc */}
              <div className="rounded-2xl p-10">
                <div className=" mx-auto h-64 w-full max-w-[520px]">
                  {/* chart lớn - ĐÃ CHUYỂN SANG TOP-RIGHT */}
                  <Image
                    src="/chart.png"
                    alt="Total Balance"
                    width={640}
                    height={420}
                    className="absolute -top-4 right-0 w-[85%] h-auto"
                  />
                </div>
              </div>
            </div>
            {/* Danh sách tính năng bên phải */}
            <div>
              <ul className="space-y-7">
                {FEATURES.map((f, i) => (
                  // <-- ADDED 'group' -->
                  <li key={i} className=" flex gap-4 group">
                    <span
                      className="mt-1 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full 
                    bg-emerald-100 text-success 
                    transition-all duration-300
                    group-hover:bg-success group-hover:text-white" // <-- ADDED HOVER CLASSES -->
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 6v12M6 12h12" />
                      </svg>
                    </span>
                    <div>
                      {/* <-- FIXED TYPO 'fext-black' --> */}
                      <h3 className="font-semibold text-white group-hover:text-h5">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sub2 leading-6 text-white group-hover:text-sub1">
                        {f.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* CTA */}
          <div className="mt-8 w-full text-center">
            <a
              href="/giai-phap/tong-quan"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/30 transition hover:opacity-90"
            >
              Khám phá giải pháp
            </a>
          </div>
        </div>
      </section>

      <ReviewCarousel sectionData={reviewSectionData} />

      {/* <-- NEW SECTION 5: BLOG --> */}
      <section className="py-20 bg-gradient-to-t from-white to-blue-100">
        <div className="container">
          {/* Header (Centered) */}
          <div className="text-center">
            <h2 className="mt-1 text-black">
              Cập Nhật Kiến Thức Cùng V-Pharma
            </h2>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Tabs (Left-aligned) */}
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
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
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-body2 font-bold text-primary transition-colors hover:bg-sky-100"
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
                  href={`/blog/blog-detail?title=${encodeURIComponent(
                    post.title
                  )}`}
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
