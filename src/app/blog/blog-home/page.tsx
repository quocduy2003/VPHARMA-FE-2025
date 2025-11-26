// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { useRef } from "react";
// import Link from "next/link";
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import { FeaturedNews } from "@/components/blog/FeaturedNews";
// import { BlogPostCard } from "@/components/blog/BlogTableView";
// import Image from "next/image";

// import {
//   blogData,
//   getBlogPosts,
//   getBlogLastest,
//   blogCategories,
// } from "@/lib/api";
// import {
//   transformBlogListData,
//   transformBlogCardData,
// } from "@/lib/transformers/blog";
// import { BlogCard, BlogCardData } from "@/types";
// import { HeroSkeleton, BlogCardSkeleton, FeaturedNewsSkeleton } from "@/components/animations/BlogSkeleton";

// export default function BlogHomePage() {
//   const searchParams = useSearchParams();
//   const categoryParam = searchParams.get("category");
//   const listRef = useRef<HTMLDivElement | null>(null);


//   const activeCategory = categoryParam || "home";

//   const [mainBlog, setMainBlog] = useState<BlogCardData | null>(null);
//   const [blogList, setBlogList] = useState<BlogCard[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 6;
//   const [totalPages, setTotalPages] = useState(1);
//   const [shouldScroll, setShouldScroll] = useState(false);




//   const activeCategoryObj = blogCategories.find(
//     (cat) => cat.slug === activeCategory
//   );
//   const title =
//     activeCategory === "home" ? "Blog" : activeCategoryObj?.name || "Blog";

//   // fetch bài mới nhất
//   useEffect(() => {
//     const category = activeCategory === "home" ? "home" : activeCategory;
//     async function fetchLatestBlog() {
//       setIsLoading(true);
//       const data = await getBlogLastest(category);
//       const transformedData = transformBlogCardData(data);
//       setMainBlog(transformedData);
//       setIsLoading(false);
//     }
//     fetchLatestBlog();
//     setCurrentPage(1);
//   }, [activeCategory]);

//   // fetch danh sách
//   useEffect(() => {
//     const category = activeCategory === "home" ? "home" : activeCategory;

//     async function fetchData() {
//       setIsLoading(true);
//       const data = await getBlogPosts(category, currentPage, postsPerPage);

//       const transformedList = transformBlogListData(data);
//       setBlogList(transformedList);

//       const totalItems =
//         data.meta.pagination.total - (currentPage === 1 ? 1 : 0);
//       setTotalPages(Math.ceil(totalItems / postsPerPage));

//       setIsLoading(false);
//     }

//     fetchData();
//   }, [activeCategory, currentPage]);

//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber > 0 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//       setShouldScroll(true)
//     }
//   };

//   // Scroll sau khi trang đã load dữ liệu mới
//   useEffect(() => {
//     if (!isLoading && shouldScroll) {
//       const el = listRef.current;
//       if (el) {
//         // Cộng tổng chiều cao các header
//         let HEADER_HEIGHT = 0;
//         document.querySelectorAll('header').forEach(header => {
//           HEADER_HEIGHT += header.offsetHeight;
//         });
//         console.log("Total HEADER_HEIGHT:", HEADER_HEIGHT);
//         HEADER_HEIGHT += 20;
//         const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
//         window.scrollTo({ top: y, behavior: "smooth" });

//       }
//       setShouldScroll(false);
//     }
//   }, [currentPage, isLoading, shouldScroll]);



//   return (
//     <div className="bg-gray-50 py-10">
//       <div className="container">
//         {/* Header */}
//         <div className="mb-10 text-center">
//           <h1 className="text-black mb-5">{title}</h1>
//           <p className="mx-auto max-w-3xl text-h6">{blogData.description}</p>
//         </div>

//         {/* Main + Sidebar */}
//         <div className="container mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             {isLoading ? (
//               <HeroSkeleton />
//             ) : mainBlog ? (
//               <Link
//                 href={`/blog/${mainBlog.posts.category.slug}/${mainBlog.posts.slug}`}
//                 className="group block"
//               >
//                 <Image
//                   width={250}
//                   height={68}
//                   src={mainBlog.posts.coverImage.url}
//                   alt={mainBlog.posts.title}
//                   className="mb-4 h-auto w-full rounded-lg object-cover lg:h-[500px]"
//                 />
//                 <h2 className="mb-5 text-h4 text-black group-hover:text-primary line-clamp-2">
//                   {mainBlog.posts.title}
//                 </h2>
//                 <div className="flex items-center gap-4 mb-5">
//                   <span className="rounded-md bg-blue-100 px-3 py-1 text-body2 font-bold capitalize text-primary">
//                     {mainBlog.posts.category.name}
//                   </span>
//                   <span className="text-body2 text-colordescription">
//                     {new Date(mainBlog.posts.createdAt).toLocaleDateString("vi-VN", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </div>
//                 <p className="text-sub1 line-clamp-3">{mainBlog.posts.description}</p>
//               </Link>
//             ) : null}
//           </div>


//           <div className="lg:col-span-1">
//             {isLoading ? (
//               <FeaturedNewsSkeleton />
//             ) : (
//               <FeaturedNews posts={blogData.featuredNews} />
//             )}
//           </div>
//         </div>

//         {/* Danh sách bài */}
//         <div ref={listRef} className="container">
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {isLoading
//               ? Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
//               : blogList && blogList.length
//                 ? blogList.map((post, index) => (
//                   <BlogPostCard key={index} post={post} />
//                 ))
//                 : (
//                   <p className="col-span-full mt-8 text-center text-gray-500">
//                     Không có bài viết nào khác.
//                   </p>
//                 )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-12 flex items-center justify-center gap-2">

//               {/* Previous */}
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110 disabled:opacity-50"
//               >
//                 <FiArrowLeft />
//               </button>

//               {/* Trang 1 */}
//               <button
//                 onClick={() => handlePageChange(1)}
//                 className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${currentPage === 1
//                   ? "border-primary text-primary"
//                   : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
//                   }`}
//               >
//                 1
//               </button>

//               {/* Nếu chỉ có <=3 trang giữa thì render trực tiếp (2..totalPages-1) */}
//               {totalPages <= 5 ? (
//                 Array.from({ length: Math.max(0, totalPages - 2) }).map((_, i) => {
//                   const page = i + 2;
//                   return (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${currentPage === page
//                         ? "border-primary text-primary"
//                         : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
//                         }`}
//                     >
//                       {page}
//                     </button>
//                   );
//                 })
//               ) : (
//                 (() => {
//                   // Tính start/end cho phần giữa (không bao gồm trang 1 và trang cuối)
//                   let start = Math.max(2, currentPage - 1);
//                   let end = Math.min(totalPages - 1, currentPage + 1);

//                   // Nếu đang ở trang cuối, muốn hiển thị 3 trang phía trước: totalPages-2, totalPages-1, totalPages
//                   if (currentPage === totalPages) {
//                     start = Math.max(2, totalPages - 2);
//                     end = totalPages - 1;
//                   }

//                   // Nếu đang ở trang 2 hoặc 3 đảm bảo start ít nhất là 2 và không trùng nhau
//                   if (currentPage <= 3) {
//                     start = 2;
//                     end = Math.min(4, totalPages - 1);
//                   }

//                   const items = [];

//                   if (start > 2) {
//                     items.push(<span key="left-ellipsis" className="px-1 text-gray-400">…</span>);
//                   }

//                   for (let p = start; p <= end; p++) {
//                     items.push(
//                       <button
//                         key={p}
//                         onClick={() => handlePageChange(p)}
//                         className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${currentPage === p
//                           ? "border-primary text-primary"
//                           : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
//                           }`}
//                       >
//                         {p}
//                       </button>
//                     );
//                   }

//                   if (end < totalPages - 1) {
//                     items.push(<span key="right-ellipsis" className="px-1 text-gray-400">…</span>);
//                   }

//                   return items;
//                 })()
//               )}

//               {/* Trang cuối */}
//               {totalPages > 1 && (
//                 <button
//                   onClick={() => handlePageChange(totalPages)}
//                   className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${currentPage === totalPages
//                     ? "border-primary text-primary"
//                     : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
//                     }`}
//                 >
//                   {totalPages}
//                 </button>
//               )}

//               {/* Next */}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110 disabled:opacity-50"
//               >
//                 <FiArrowRight />
//               </button>
//             </div>
//           )}


//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// Components
import { FeaturedNews } from "@/components/blog/FeaturedNews";
import { BlogPostCard } from "@/components/blog/BlogTableView";
import { HeroSkeleton, BlogCardSkeleton, FeaturedNewsSkeleton } from "@/components/animations/BlogSkeleton";

// Data & Types
import { mockAllPosts } from "@/data/mockBlogData"; // Import data tĩnh
import { BlogCard, BlogCardData } from "@/types";

// --- Cấu hình giả lập ---
const BLOG_DESCRIPTION = "Chia sẻ kiến thức, kinh nghiệm và những câu chuyện thú vị về công nghệ, đời sống và du lịch.";
const POSTS_PER_PAGE = 6;

// Danh sách category (nên khớp với data mock)
const BLOG_CATEGORIES = [
  { name: "Công nghệ", slug: "cong-nghe" },
  { name: "Du lịch", slug: "du-lich" },
  { name: "Ẩm thực", slug: "am-thuc" },
  { name: "Đời sống", slug: "doi-song" },
  { name: "Marketing", slug: "marketing" },
];

export default function BlogHomePage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const listRef = useRef<HTMLDivElement | null>(null);

  const activeCategory = categoryParam || "home";

  // State
  const [mainBlog, setMainBlog] = useState<BlogCardData | null>(null);
  const [blogList, setBlogList] = useState<BlogCard[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shouldScroll, setShouldScroll] = useState(false);

  // Lấy tên Category hiển thị
  const activeCategoryObj = BLOG_CATEGORIES.find(
    (cat) => cat.slug === activeCategory
  );
  const title = activeCategory === "home" ? "Blog" : activeCategoryObj?.name || "Blog";

  // --- MAIN LOGIC: Xử lý Data tĩnh ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // 1. Giả lập delay mạng (0.5s)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 2. Lọc bài viết theo Category
      let filteredPosts = [...mockAllPosts];
      if (activeCategory !== "home") {
        filteredPosts = filteredPosts.filter(
          (post) => post.category.slug === activeCategory
        );
      }

      // 3. Sắp xếp theo ngày tạo mới nhất (desc)
      filteredPosts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // 4. Xử lý Hero Section (Bài mới nhất)
      if (filteredPosts.length > 0) {
        // Lấy bài đầu tiên làm Main Blog
        const heroPost = filteredPosts[0];
        setMainBlog({ posts: heroPost });

        // 5. Xử lý Danh sách bên dưới (Trừ bài hero ra để đỡ trùng)
        const listSource = filteredPosts.slice(1);
        
        // Tính toán phân trang
        const total = listSource.length;
        setTotalPages(Math.ceil(total / POSTS_PER_PAGE));

        // Cắt mảng cho trang hiện tại
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        setBlogList(listSource.slice(startIndex, endIndex));
      } else {
        setMainBlog(null);
        setBlogList([]);
        setTotalPages(1);
      }

      // 6. Featured News (Lấy ngẫu nhiên hoặc 5 bài đầu tiên của tất cả)
      // Ở đây lấy 5 bài bất kỳ khác bài hero
      setFeaturedPosts(mockAllPosts.slice(0, 5));

      setIsLoading(false);
    };

    fetchData();
  }, [activeCategory, currentPage]);


  // Scroll logic (Giữ nguyên)
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setShouldScroll(true);
    }
  };

  useEffect(() => {
    if (!isLoading && shouldScroll) {
      const el = listRef.current;
      if (el) {
        let HEADER_HEIGHT = 0;
        document.querySelectorAll('header').forEach(header => {
          HEADER_HEIGHT += header.offsetHeight;
        });
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 20;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setShouldScroll(false);
    }
  }, [currentPage, isLoading, shouldScroll]);


  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">{BLOG_DESCRIPTION}</p>
        </div>

        {/* Main + Sidebar */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Hero Section (Main Blog) */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <HeroSkeleton />
            ) : mainBlog ? (
              <Link
                href={`/blog/${mainBlog.posts.category.slug}/${mainBlog.posts.slug}`}
                className="group block overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-[300px] lg:h-[450px] w-full overflow-hidden">
                    <Image
                    fill
                    src={mainBlog.posts.coverImage.url}
                    alt={mainBlog.posts.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                        {mainBlog.posts.category.name}
                    </span>
                    <span className="text-sm text-gray-500">
                        {new Date(mainBlog.posts.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        })}
                    </span>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {mainBlog.posts.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">{mainBlog.posts.description}</p>
                </div>
              </Link>
            ) : (
                <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200 text-gray-500">
                    Không có bài viết nổi bật
                </div>
            )}
          </div>

          {/* Sidebar (Featured News) */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <FeaturedNewsSkeleton />
            ) : (
                // Ép kiểu vì MockData là BlogCard[], Component có thể cần BlogPost[]
                // Tuy nhiên về cơ bản các trường hiển thị (title, image, slug) là giống nhau
               <FeaturedNews posts={featuredPosts as any} />
            )}
          </div>
        </div>

        {/* Danh sách bài viết (Grid) */}
        <div ref={listRef} className="scroll-mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
              : blogList.length > 0
                ? blogList.map((post, index) => (
                  <BlogPostCard key={index} post={post} />
                ))
                : (
                  !isLoading && (
                    <div className="col-span-full py-12 text-center">
                        <p className="text-xl text-gray-400 font-medium">Không tìm thấy bài viết nào.</p>
                        <Link href="/blog" className="text-primary hover:underline mt-2 inline-block">Xem tất cả</Link>
                    </div>
                  )
                )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && !isLoading && (
            <div className="mt-16 flex items-center justify-center gap-2">

              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm transition hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600"
              >
                <FiArrowLeft />
              </button>

              {/* Page 1 */}
              <button
                onClick={() => handlePageChange(1)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition font-medium ${currentPage === 1
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                  }`}
              >
                1
              </button>

              {/* Pagination Logic (Ellipsis) */}
              {(() => {
                  let start = Math.max(2, currentPage - 1);
                  let end = Math.min(totalPages - 1, currentPage + 1);

                  if (currentPage === totalPages) {
                    start = Math.max(2, totalPages - 2);
                  }
                  if (currentPage <= 3) {
                    end = Math.min(4, totalPages - 1);
                  }

                  const items = [];
                  if (start > 2) items.push(<span key="dots-1" className="px-1 text-gray-400">...</span>);

                  for (let p = start; p <= end; p++) {
                    items.push(
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border transition font-medium ${currentPage === p
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                          }`}
                      >
                        {p}
                      </button>
                    );
                  }

                  if (end < totalPages - 1) items.push(<span key="dots-2" className="px-1 text-gray-400">...</span>);
                  return items;
              })()}

              {/* Last Page */}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition font-medium ${currentPage === totalPages
                   ? "bg-primary border-primary text-white"
                   : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                  }`}
              >
                {totalPages}
              </button>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm transition hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600"
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