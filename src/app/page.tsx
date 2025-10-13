// app/page.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

type Feature = {
  title: string;
  desc: string;
  icon?: string;
};


const FEATURES: Feature[] = [
  {
    title: "Quản Lý Giá Bán Toàn Chuỗi",
    desc:
      "Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách sử dụng danh mục dùng chung. Dễ dàng cập nhật."
  },
  {
    title: "Quản Lý Giá Bán Toàn Chuỗi",
    desc:
      "Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách sử dụng danh mục dùng chung. Dễ dàng cập nhật."
  },
  {
    title: "Quản Lý Giá Bán Toàn Chuỗi",
    desc:
      "Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách sử dụng danh mục dùng chung. Dễ dàng cập nhật."
  },
  {
    title: "Quản Lý Giá Bán Toàn Chuỗi",
    desc:
      "Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách sử dụng danh mục dùng chung. Dễ dàng cập nhật."
  }
];
export default function HomePage() {
  return (
    <>
      <section
        id="hero"
        className="h-screen max-h-[1100px] bg-gradient-to-t from-blue-100 to-white overflow-y-clip"
      >
        <div className="container h-full w-full flex items-center justify-center flex-col text-center">
          <h6 className="capitalize">the Best Pharmacy Management System</h6>
          <h1>Vận Hành Nhà Thuốc Hiệu quả Cùng giải pháp v-pharma</h1>
          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-xl rounded-full border border-primary/30 mt-9">
              <input
                className="h-10 flex-1 rounded-full bg-transparent px-4 text-sm outline-none"
                placeholder="Nhập email của bạn"
                type="email"
              />
              <button className="btn ">
                Bắt đầu
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink ">
        <div className="container  ">
          <div className="text-center ">
            <h2 className="font-semibold text-white">
              Điều Gì Tạo Nên Sự Khác Biệt Của V-Pharma?
            </h2>
            <p className="mt-5 text-lg text-white/80">
              Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình
              vận hành và nâng cao hiệu quả kinh doanh.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* <!-- Card 1 --> */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg">
              <h3 className="text-center text-[15px] font-semibold text-gray-800">
                Nhà Thuốc/Quầy Thuốc
              </h3>
              <img
                src="/features-dashboard1.png"
                alt=""
                className="mx-auto my-4 h-70 w-auto object-cover"
              />
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <span className="text-sky-600">→</span>
                </a>
              </div>

              {/* glow under card */}
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>

            {/* Card 2 */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg">
              <h3 className="text-center text-[15px] font-semibold text-gray-800">
                Chuỗi Nhà Thuốc
              </h3>
              <img
                src="/features-dashboard2.png"
                alt=""
                className="mx-auto my-4 h-70 w-auto object-cover"
              />
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <span className="text-sky-600">→</span>
                </a>
              </div>
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>

            {/* Card 3 */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg">
              <h6 className="text-center font-semibold">
                Phòng Khám/Phòng Mạch
              </h6>
              <img
                src="/features-dashboard3.jpg"
                alt=""
                className="mx-auto my-4 h-70 w-auto object-cover"
              />
              <div className="flex justify-center mt-5">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <span className="text-sky-600">→</span>
                </a>
              </div>
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>
          </div>
        </div>
      </section>

      <section className="container ">
      {/* Logo nhỏ trên tiêu đề */}
      <div className="text-center">
        <span className="text-sm font-semibold text-sky-600">V-Pharma</span>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Thiết Kế Riêng Biệt Cho Ngành Dược
        </h2>
      </div>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
        {/* Khối media bên trái */}
        <div className="relative">
          {/* tấm nền bo góc */}
          <div className="rounded-2xl bg-sky-100/60 p-10">
            <div className="relative mx-auto h-64 w-full max-w-[420px]">
              {/* chart lớn */}
              <div className="absolute left-1/2 top-0 w-[85%] -translate-x-1/2 rounded-xl bg-white p-4 shadow-xl">
                <Image
                  src="/chart.png"   /* thay bằng ảnh/biểu đồ thật */
                  alt="Total Balance"
                  width={640}
                  height={420}
                  className="h-auto w-full"
                />
              </div>
              {/* chart nhỏ dưới trái */}
              <div className="absolute -bottom-6 left-0 w-[55%] rounded-xl bg-white p-4 shadow-lg">
                <Image
                  src="/chart.png"
                  alt="Total Balance Mini"
                  width={400}
                  height={260}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách tính năng bên phải */}
        <div>
          <ul className="space-y-6">
            {FEATURES.map((f, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-1 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-inset ring-emerald-200">
                  {/* có thể thay bằng icon thật */}
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
                  <h3 className="font-semibold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-6 text-slate-500">
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
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-sky-600/30 transition hover:bg-sky-700"
            >
              Khám phá giải pháp
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
     
    </section>

    </>
  );
}
