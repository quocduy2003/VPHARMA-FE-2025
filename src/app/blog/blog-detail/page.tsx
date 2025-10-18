"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { blogPosts, BlogPost, ContentSection } from "@/data/blogData";
import { useState, useEffect, useRef } from "react";
import { FiFacebook, FiLinkedin, FiList } from "react-icons/fi";
import { SiZalo } from "react-icons/si";

// Component Mục lục (Table of Contents) đã sửa logic
function TableOfContents({ sections }: { sections: ContentSection[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const activeItemRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    const SCROLL_OFFSET = 150;
    const handleScroll = () => {
      let currentId = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);

        if (element) {
          const rect = element.getBoundingClientRect();
          // Nếu đỉnh của mục đã vượt qua hoặc nằm trong ngưỡng offset
          if (rect.top <= SCROLL_OFFSET) {
            currentId = section.id;
            break;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);
  useEffect(() => {
    // Khi activeId thay đổi, và ref đã được gán vào một <li>
    if (activeItemRef.current) {
      // Tự động cuộn <ul> để đưa <li> đang active vào trong tầm nhìn
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Chỉ cuộn khi cần thiết
      });
    }
  }, [activeId]);
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    setActiveId(id);

    if (element) {
      // 1. Lấy vị trí của tiêu đề so với toàn bộ trang
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      // 2. Tạo khoảng đệm 140px.
      // Chúng ta muốn cuộn đến vị trí CÁCH TIÊU ĐỀ 140px VỀ PHÍA TRÊN.

      const offsetPosition = elementPosition - 140;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  let level1Counter = 0;
  let level2Counter = 0;
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-sub1 font-bold mb-3 flex items-center gap-2">
        <FiList />
        Nội dung chính
      </h3>

      <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {sections.map((section) => {
          let displayTitle = "";
          if (section.level === 1) {
            level1Counter++;
            level2Counter = 0;
            displayTitle = `${level1Counter}. ${section.title}`;
          } else {
            level2Counter++;
            displayTitle = `${level1Counter}.${level2Counter}. ${section.title}`;
          }
          const isActive = activeId === section.id;

          return (
            <li
              // --- THÊM BƯỚC 3: Gán ref vào <li> đang active ---
              ref={isActive ? activeItemRef : null}
              key={section.id}
              onClick={() => scrollToId(section.id)}
              className={`line-clamp-1 cursor-pointer transition-colors hover:text-primary ${
                section.level === 2
                  ? "pl-4 text-body2"
                  : "text-sub2 font-medium"
              } ${isActive ? "text-primary font-bold" : "text-gray-600"}`}
            >
              {displayTitle}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/blog-detail?title=${encodeURIComponent(post.title)}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={post.imageTitle}
          alt={post.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-2">
        <div className="flex items-center gap-4 mb-2">
          <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold uppercase text-primary">
            {post.categories[0]}
          </span>
          <span className="text-xs text-gray-500">{post.date}</span>
        </div>
        <h4 className="mt-1 font-semibold text-gray-800 group-hover:text-primary line-clamp-2">
          {post.title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
      </div>
    </Link>
  );
}

export default function BlogDetailPage() {
  const searchParams = useSearchParams();
  const postTitle = searchParams.get("title");
  const post = blogPosts.find((p) => p.title === postTitle);

  let level1Counter = 0;
  let level2Counter = 0;

  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-black">Không tìm thấy bài viết</h1>
        <p className="text-gray-500 mt-2">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link
          href="/blog/blog-home"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-2 text-white"
        >
          Quay lại trang Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.title !== post.title)
    .slice(0, 3);

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-body2 text-colordescription font-bold mb-4">
          <Link href="/blog/blog-home" className="hover:text-primary">
            Blog
          </Link>
          <span className="mx-2">&gt;</span>
          <Link
            href={`/blog/blog-home?category=${encodeURIComponent(
              post.categories[0]
            )}`}
            className="hover:text-primary"
          >
            {post.categories[0]}
          </Link>
          <span className="mx-2">&gt;</span>
          <span>{post.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-15">
          {/* Main Content */}
          <article className="lg:col-span-9">
            <h1 className="text-h2 font-bold text-black mb-3">{post.title}</h1>
            <p className="text-body2 mb-6">Ngày cập nhật: {post.date}</p>
            <p className="text-body2 mb-6">{post.description}</p>
            <img
              src={post.imageTitle}
              alt={post.title}
              className="w-full rounded-lg object-cover"
            />

            <div>
              {post.sections.map((section) => {
                let displayTitle = "";
                // Xử lý logic đánh số
                if (section.level === 1) {
                  level1Counter++;
                  level2Counter = 0; // Reset biến đếm con
                  displayTitle = `${level1Counter}. ${section.title}`;
                } else {
                  level2Counter++;
                  displayTitle = `${level1Counter}.${level2Counter}. ${section.title}`;
                }

                return (
                  <div key={section.id} className="mb-6">
                    {section.level === 1 ? (
                      <h2
                        id={section.id}
                        className="text-h5 font-bold text-black mt-8 mb-4 scroll-mt-24"
                      >
                        {displayTitle} {/* Dùng tiêu đề đã đánh số */}
                      </h2>
                    ) : (
                      <h3
                        id={section.id}
                        className="text-h6 font-bold text-black mt-6 mb-3 scroll-mt-24"
                      >
                        {displayTitle} {/* Dùng tiêu đề đã đánh số */}
                      </h3>
                    )}
                    <p className="text-sub1 text-colordescription">
                      {section.content}
                    </p>
                    {section.images?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${section.title} image ${index + 1}`}
                        className="w-full rounded-lg my-6 object-cover"
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-38 space-y-6 max-w-sm">
              <div className="rounded-lg border p-4">
                <h3 className="text-sub1 font-bold mb-3">Chia sẻ bài viết</h3>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-blue-600 hover:opacity-80">
                    <FiFacebook size={24} />
                  </a>
                  <a href="#" className="text-blue-800 hover:opacity-80">
                    <FiLinkedin size={24} />
                  </a>
                  <a href="#" className="text-blue-500 hover:opacity-80">
                    <SiZalo size={24} />
                  </a>
                </div>
              </div>
              <TableOfContents sections={post.sections} />
              <div className="rounded-lg border p-4 text-center">
                <h3 className="text-body2 mb-2">
                  Lưu vào cẩm nang kiến thức của bạn.
                </h3>
                <button className="rounded-md border border-primary bg-primary/10 px-6 py-2 text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
                  Lưu lại
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Posts */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-h4 font-bold mb-8 text-center">
            Đề Xuất Dành Cho Bạn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((p) => (
              <RelatedPostCard key={p.title} post={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
