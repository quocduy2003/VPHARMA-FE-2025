"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { blogPosts, BlogPost } from "@/data/blogData";
import { FeaturedNews } from "@/components/blog/FeaturedNews";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/blog-detail?title=${encodeURIComponent(post.title)}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={post.imageTitle}
          alt={post.title}
          className="h-48  w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-2">
        <p className="mb-2 text-body2 font-semibold uppercase text-primary">
          {post.categories[0]}
          <span className="ml-4 text-body2 font-normal text-colordescription">
            {post.date}
          </span>
        </p>
        <h3 className="mb-2 text-sub1 text-black group-hover:text-primary line-clamp-2">
          {post.title}
        </h3>
        <p className="text-body2 line-clamp-2">{post.description}</p>
      </div>
    </Link>
  );
}

export default function BlogHomePage() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Sắp xếp tất cả bài viết theo ngày
  const sortedPosts: BlogPost[] = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredPostTitles = [
    "12 Cách Kiểm Kê Hiệu Quả Vừa Tiết Kiệm Thời Gian Cho Nhà Thuốc",
    "Chuyển Đổi Số Trong Ngành Dược: Lợi Ích Và Thách Thức",
    "Marketing Dược Phẩm 4.0: Tiếp Cận Khách Hàng Đa Kênh",
    "Quyết Toán Thuế Cuối Năm Cho Nhà Thuốc: Những Điều Cần Biết",
    "5 Sai Lầm Phổ Biến Khi Quản Lý Tồn Kho Nhà Thuốc",
    "Tối Ưu Hóa Trải Nghiệm Khách Hàng Tại Điểm Bán",
    "Kỹ Năng Tư Vấn Bán Chéo (Cross-selling) Cho Dược Sĩ",
    "Làm Thế Nào Để Giảm Tỷ Lệ Hàng Hết Hạn Tồn Kho?",
    "Xây Dựng Chương Trình Khách Hàng Thân Thiết Hiệu Quả",
    "Hóa Đơn Điện Tử Trong Nhà Thuốc: Quy Định và Lợi Ích",
  ];
  const featuredNewsPosts = featuredPostTitles
    .map((title) => {
      // Tìm bài viết trong sortedPosts (hoặc blogPosts) có tiêu đề khớp
      return sortedPosts.find((post) => post.title === title);
    })
    .filter((post) => post !== undefined) as BlogPost[];

  // 2. Tạo một danh sách bài viết chính để hiển thị, dựa trên việc có category được chọn hay không
  const displayPosts = activeCategory
    ? sortedPosts.filter((post) => post.categories.includes(activeCategory)) // Nếu có category, lọc danh sách
    : sortedPosts; // Nếu không, dùng toàn bộ danh sách

  // 3. Lấy ra bài viết mới nhất và các bài còn lại TỪ danh sách đã được xử lý ở trên
  const latestPost = displayPosts[0];
  const postsForGrid = displayPosts.slice(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // 4. Logic phân trang áp dụng cho `postsForGrid`
  const totalPages = Math.ceil(postsForGrid.length / postsPerPage);
  const currentPosts = postsForGrid.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-black">
            {activeCategory ? activeCategory : "Blog"}
          </h1>
          <p className="mt-5 mx-auto max-w-3xl text-h6">
            Giải pháp toàn diện cho quản lý nhà thuốc, từ tồn kho đến bán hàng,
            với công nghệ hiện đại và dễ sử dụng.
          </p>
        </div>

        {/* Phần nội dung chính */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {latestPost ? (
              <Link
                href={`/blog/blog-detail?title=${encodeURIComponent(
                  latestPost.title
                )}`}
                className="group block"
              >
                <img
                  src={latestPost.imageTitle}
                  alt={latestPost.title}
                  className="mb-4 h-auto w-full rounded-lg object-cover lg:h-[500px]"
                />
                <h2 className="mb-5 text-h4 text-black group-hover:text-primary line-clamp-2">
                  {latestPost.title}
                </h2>
                <div className="flex items-center gap-4 mb-5">
                  <span className="rounded-md bg-blue-100 px-3 py-1 text-body2 font-bold uppercase text-primary">
                    {latestPost.categories[0]}
                  </span>
                  <span className="text-body2 text-colordescription">
                    {latestPost.date}
                  </span>
                </div>

                <p className="text-sub1 line-clamp-3">
                  {latestPost.description}
                </p>
              </Link>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg bg-gray-100">
                <p className="text-gray-500">
                  Không có bài viết nào để hiển thị.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Tin tức nổi bật (luôn không đổi) */}
          <div className="lg:col-span-1">
            <FeaturedNews posts={featuredNewsPosts} />
          </div>
        </div>

        {/* Lưới các bài viết còn lại (từ danh sách đã lọc) */}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <BlogPostCard key={post.title} post={post} />
            ))}
          </div>

          {postsForGrid.length === 0 && !activeCategory && (
            // Trường hợp đặc biệt: Chỉ có 1 bài viết trên toàn trang
            <p className="col-span-full mt-8 text-center text-gray-500">
              Không có bài viết nào khác.
            </p>
          )}

          {currentPosts.length === 0 && activeCategory && (
            <p className="col-span-full mt-8 text-center text-gray-500">
              Không có bài viết nào khác trong chủ đề này.
            </p>
          )}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110"
            >
              <FiArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`flex h-9 w-9 items-center justify-center text-sub1 ${
                  currentPage === index + 1
                    ? "text-primary"
                    : "text-colordescription hover:border-primary hover:text-primary"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110"
            >
              <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
