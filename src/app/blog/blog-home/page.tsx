"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FeaturedNews } from "@/components/blog/FeaturedNews";
import { BlogPostCard } from "@/components/blog/BlogCard";

import {
  blogData,
  getBlogPosts,
  getBlogLastest,
} from "@/lib/api";
import {
  transformBlogListData,
  transformBlogCardData,
} from "@/lib/transformers/blog";
import { BlogCard, BlogCardData } from "@/types";

export default function BlogHomePage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const activeCategory = categoryParam || "home";

  const [mainBlog, setMainBlog] = useState<BlogCardData | null>(null);
  const [blogList, setBlogList] = useState<BlogCard[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);

  // Lấy bài viết chính (luôn là bài mới nhất của chủ đề)
  useEffect(() => {
    const category = activeCategory === "home" ? "home" : activeCategory;
    async function fetchLatestBlog() {
      const data = await getBlogLastest(category);
      const transformedData = transformBlogCardData(data);
      setMainBlog(transformedData);
    }
    fetchLatestBlog();
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    const category = activeCategory === "home" ? "home" : activeCategory;

    async function fetchData() {
      const data = await getBlogPosts(category, currentPage, postsPerPage);

      // Transform toàn bộ danh sách
      const transformedList = transformBlogListData(data);
      setBlogList(transformedList);

      const totalItems = data.meta.pagination.total - (currentPage === 1 ? 1 : 0);
      setTotalPages(Math.ceil(totalItems / postsPerPage));
    }

    fetchData();
  }, [activeCategory, currentPage, mainBlog]);


  // Điều khiển phân trang
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-black">{blogData.title}</h1>
          <p className="mt-5 mx-auto max-w-3xl text-h6">{blogData.description}</p>
        </div>

        {/* Bài viết chính + Sidebar */}
        <div className="container mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {mainBlog ? (
              <Link
                href={`/blog/${mainBlog.posts.category.slug}/${mainBlog.posts.slug}`}
                className="group block"
              >
                <img
                  src={mainBlog.posts.coverImage.url}
                  alt={mainBlog.posts.title}
                  className="mb-4 h-auto w-full rounded-lg object-cover lg:h-[500px]"
                />
                <h2 className="mb-5 text-h4 text-black group-hover:text-primary line-clamp-2">
                  {mainBlog.posts.title}
                </h2>
                <div className="flex items-center gap-4 mb-5">
                  <span className="rounded-md bg-blue-100 px-3 py-1 text-body2 font-bold uppercase text-primary">
                    {mainBlog.posts.category.name}
                  </span>
                  <span className="text-body2 text-colordescription">
                    {new Date(mainBlog.posts.createdAt || "").toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sub1 line-clamp-3">{mainBlog.posts.description}</p>
              </Link>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg bg-gray-100">
                <p className="text-gray-500">Không có bài viết nào để hiển thị.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <FeaturedNews posts={blogData.featuredNews} />
          </div>
        </div>

        {/* Danh sách bài viết */}
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogList && blogList.length ? (
              blogList.map((post, index) => (
                <BlogPostCard key={index} post={post} />
              ))
            ) : (
              <p className="col-span-full mt-8 text-center text-gray-500">
                Không có bài viết nào khác.
              </p>
            )}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110 disabled:opacity-50"
              >
                <FiArrowLeft />
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sub1 transition ${currentPage === index + 1
                    ? "border-primary text-primary"
                    : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                    }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110 disabled:opacity-50"
              >
                <FiArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
