
"use client";
import Link from "next/link";
import { BlogCard } from "@/types";
import Image from "next/image";

export function BlogPostCard({ post }: { post: BlogCard }) {
  return (
    <Link
      href={`/blog/${post.category.slug}/${post.slug}`}
      // --- LOGIC RESPONSIVE ĐÃ SỬA ---
      // 1. flex-row: Mặc định (Mobile < 480px) xếp ngang (List view)
      // 2. sm:flex-col: Từ SM (>= 480px) trở lên xếp dọc (Card view)
      className="group flex flex-row sm:flex-col gap-4 bg-white rounded-lg transition-all h-full"
    >
      {/* --- KHỐI HÌNH ẢNH --- */}
      {/* Mobile: w-32 (cố định chiều ngang), h-full hoặc aspect-square để vuông vắn */}
      {/* SM: w-full (full width card), h-48 (chiều cao cố định) */}
      <div className="relative shrink-0 overflow-hidden rounded-lg w-32 h-24 sm:w-full sm:h-48">
        <Image
          src={post.coverImage.url}
          alt={post.alt || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 480px) 128px, 400px"
        />
      </div>

      {/* --- KHỐI NỘI DUNG --- */}
      <div className="flex flex-col flex-1 p-3 justify-center">
        {/* Category & Date */}
        <div className="mb-1 sm:mb-2 flex items-center flex-wrap text-xs md:text-sm lg:text-body2 font-bold text-primary uppercase tracking-wider">
          {post.category.name}
          <span className="mx-1 sm:mx-2 text-gray-300 ">•</span>
          <span className="font-normal text-gray-500 text-xs md:text-sm lg:text-body2 normal-case">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1 sm:mb-2 text-body2 md:text-sub2 lg:text-body3 sm:text-base font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>

        {/* Description - Ẩn trên mobile để tiết kiệm diện tích, hiện trên desktop */}
        <p className="hidden sm:line-clamp-2 text-sm sm:text-body2 lg:text-sub2 text-gray-500 text-ellipsis leading-relaxed">
          {post.description}
        </p>
      </div>
    </Link>
  );
}