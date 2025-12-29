"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import Link from "next/link";
import { FeaturedNews } from "@/components/blog/FeaturedNews";
import { BlogPostCard } from "@/components/blog/BlogTableView";
import BlogPagination from "@/components/blog/BlogPagination";
import Image from "next/image";

import {
  blogData,
  getBlogPosts,
  getBlogLastest,
  blogCategories,
} from "@/lib/api";
import {
  transformBlogListData,
  transformBlogCardData,
} from "@/lib/transformers/blog";
import { BlogCard, BlogCardData } from "@/types";
import { HeroSkeleton, BlogCardSkeleton, FeaturedNewsSkeleton } from "@/components/animations/BlogSkeleton";

export default function BlogHomePage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const listRef = useRef<HTMLDivElement | null>(null);


  const activeCategory = categoryParam || "home";

  const [mainBlog, setMainBlog] = useState<BlogCardData | null>(null);
  const [blogList, setBlogList] = useState<BlogCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [shouldScroll, setShouldScroll] = useState(false);




  const activeCategoryObj = blogCategories.find(
    (cat) => cat.slug === activeCategory
  );
  const title =
    activeCategory === "home" ? "Blog" : activeCategoryObj?.name || "Blog";

  // fetch bài mới nhất
  useEffect(() => {
    const category = activeCategory === "home" ? "home" : activeCategory;
    async function fetchLatestBlog() {
      setIsLoading(true);
      const data = await getBlogLastest(category);
      const transformedData = transformBlogCardData(data);
      setMainBlog(transformedData);
      setIsLoading(false);
    }
    fetchLatestBlog();
    setCurrentPage(1);
  }, [activeCategory]);

  // fetch danh sách
  useEffect(() => {
    const category = activeCategory === "home" ? "home" : activeCategory;

    async function fetchData() {
      setIsLoading(true);
      const data = await getBlogPosts(category, currentPage, postsPerPage);

      const transformedList = transformBlogListData(data);
      setBlogList(transformedList);

      const totalItems =
        data.meta.pagination.total - (currentPage === 1 ? 1 : 0);
      setTotalPages(Math.ceil(totalItems / postsPerPage));

      setIsLoading(false);
    }

    fetchData();
  }, [activeCategory, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setShouldScroll(true)
    }
  };

  // Scroll sau khi trang đã load dữ liệu mới
  useEffect(() => {
    if (!isLoading && shouldScroll) {
      const el = listRef.current;
      if (el) {
        // Cộng tổng chiều cao các header
        let HEADER_HEIGHT = 0;
        document.querySelectorAll('header').forEach(header => {
          HEADER_HEIGHT += header.offsetHeight;
        });
        console.log("Total HEADER_HEIGHT:", HEADER_HEIGHT);
        HEADER_HEIGHT += 20;
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
        window.scrollTo({ top: y, behavior: "smooth" });

      }
      setShouldScroll(false);
    }
  }, [currentPage, isLoading, shouldScroll]);



  return (
    <div className="bg-gray-50 py-10">
      <div className="container">
        {/* Header */}
        
        <div className="mb-10 text-center">
          <h1 className="text-black mb-5">{title}</h1>
          <p className="mx-auto max-w-3xl text-h6">{blogData.description}</p>
        </div>

        {/* Main + Sidebar */}
        <div className="container mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {isLoading ? (
              <HeroSkeleton />
            ) : mainBlog ? (
              <Link
                href={`/blog/${mainBlog.posts.category.slug}/${mainBlog.posts.slug}`}
                className="group block"
              >
                <Image
                  width={250}
                  height={68}
                  src={mainBlog.posts.coverImage.url}
                  alt={mainBlog.posts.title}
                  className="mb-4 h-auto w-full rounded-lg object-cover lg:h-[500px]"
                />
                <h2 className="mb-5 text-h4 text-black group-hover:text-primary line-clamp-2">
                  {mainBlog.posts.title}
                </h2>
                <div className="flex items-center gap-4 mb-5">
                  <span className="rounded-md bg-blue-100 px-3 py-1 text-body2 font-bold capitalize text-primary">
                    {mainBlog.posts.category.name}
                  </span>
                  <span className="text-body2 text-colordescription">
                    {new Date(mainBlog.posts.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sub1 line-clamp-3">{mainBlog.posts.description}</p>
              </Link>
            ) : null}
          </div>


          <div className="lg:col-span-1">
            {isLoading ? (
              <FeaturedNewsSkeleton />
            ) : (
              <FeaturedNews posts={blogData.featuredNews} />
            )}
          </div>
        </div>

        {/* Danh sách bài */}
        <div ref={listRef} className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
              : blogList && blogList.length
                ? blogList.map((post, index) => (
                  <BlogPostCard key={index} post={post} />
                ))
                : (
                  <p className="col-span-full mt-8 text-center text-gray-500">
                    Không có bài viết nào khác.
                  </p>
                )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
              <BlogPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
          )}


        </div>
      </div>
    </div>
  );
}

