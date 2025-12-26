"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiFacebook, FiLinkedin, FiList } from "react-icons/fi";
import { SiZalo } from "react-icons/si";
import { BlogCard, BlogPost } from "@/types";
import { getBlogPostBySlug } from "@/lib/api/blog";
import {
  transformBlogPostData,
  transformBlogListData,
} from "@/lib/transformers/blog";
import { normalizeHeadings } from "@/lib/utils/normalizeHeadings";
import { generateTableOfContents } from "@/lib/utils/generateTOC";
import { TocItem } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/CTAButton";
import { blogData, getBlogPostByCategories } from "@/lib/api";
import CTASection from "@/components/CTA";
import RelatedPostsCarousel from "@/components/blog/BlogCardView";
import { SavePostWidget } from "@/components/blog/SavePostWidget";
import { ProtectedRoute } from "@/components/ProtectedRoute"; `    `



export default function BlogDetailPage() {

  const { ctaSection } = blogData;
  const params = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogCard[]>([]);
  const [safeContent, setSafeContent] = useState<string>("");
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const { slug, category } = params;
  const HEADER_OFFSET = 152; // hoặc để tuỳ chỉnh

  //Fetch data by category slug
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getBlogPostByCategories(category as string);
      const transformed = transformBlogListData(data);
      setRelatedPosts(transformed);
      console.log("Fetched blog data:", transformed);
      setIsLoading(false);
    };
    fetchData();
  }, [category]);

  // Theo dõi sự kiện cuộn để cập nhật mục lục

  useEffect(() => {
    const handleScroll = () => {
      let active = toc[0]?.id;

      toc.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        // Nếu heading đã đi qua top (trừ header)
        if (rect.top <= HEADER_OFFSET + 10) {
          active = id;
        }
      });

      setActiveId(active);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const handleTocClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;

      const y = el.offsetTop - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getBlogPostBySlug(slug as string);
      const transformed = transformBlogPostData(data);

      // Xử lý content
      const normalizedContent = normalizeHeadings(transformed.content || "");
      setBlog(transformed);
      setSafeContent(normalizedContent);

      // 🔥 Sinh danh sách TOC sau khi normalize
      const tocItems = generateTableOfContents(normalizedContent);
      setToc(tocItems);
      setIsLoading(false);
    };
    fetchData();
  }, [slug]);
  if (isLoading) {
    return (
      <div className="container mx-auto mt-20">
        {/* Skeleton content */}
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          <div className="w-full h-[300px] md:h-[500px] bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="text-6xl mb-4 opacity-60">😕</div>
        <h1 className="text-h2 font-bold mb-2">Không tìm thấy bài viết</h1>
        <p className="text-sub1 text-gray-500 max-w-md">
          Bài viết có thể đã bị xoá hoặc đường dẫn không chính xác.
        </p>
        <Button variant="primary" href="/blog" className="mt-4">
          Quay lại trang Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white pt-10">
      <div className="container mx-auto">
        <div className="lg:px-[4.25rem]">
          {/* Breadcrumb */}
          <div className="text-body2 text-colordescription font-bold mb-6">
            <Link href="/blog/blog-home" className="hover:text-primary">
              Blog
            </Link>
            <span className="mx-2">&gt;</span>
            <Link
              href={`/blog/blog-home?category=${blog.blog_category.slug}`}
              className="hover:text-primary"
            >
              {blog.blog_category.name}
            </Link>
            <span className="mx-2">&gt;</span>
            <span>{blog.title}</span>
          </div>
        </div>
        <div className=" mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:px-[4.25rem] ">
            {/* Main Content */}
            <article className="col-span-1 lg:col-span-8 ">
              <h1>{blog.title}</h1>
              <p className="text-body2 mb-6">
                Ngày cập nhật:{" "}
                {blog.updatedAt
                  ? new Date(blog.updatedAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : ""}
              </p>
              <p className="text-body2 mb-6 text-justify">{blog.description}</p>
              <Image
                src={blog.coverImage?.url}
                alt={blog.alt || blog.title}
                width={500}
                height={400}
                className="w-full max-h-[500px] rounded-lg object-cover"
              />

              {/* Render nội dung HTML trực tiếp */}
              <div
                className="rich-text overflow-auto"
                dangerouslySetInnerHTML={{ __html: safeContent }}
              />
              {/* Khối chia sẻ */}
              <div>
                <div className="rounded-lg flex flex-row my-8">
                  <h3 className="text-sub1 font-bold mr-5">
                    Chia sẻ bài viết:
                  </h3>
                  <div className="flex items-center gap-5">
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
              </div>
              <div className="author-info rounded-lg mt-2 p-6 border flex flex-col border-dashed border-primary bg-blue-50">
                <div className="flex flex-row gap-6 items-center ">
                  <div className="w-17 h-17 relative rounded-full overflow-hidden flex items-center justify-center">
                    <Image
                      src="/avt1.jpg"
                      alt="Tác giả"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="">
                    <div className="mb-2 text-xs text-gray-600">Tác giả</div>
                    <div className="font-bold text-primary text-lg mb-1">
                      PHẠM THU A
                    </div>
                    <div className="italic text-sm text-gray-500 mb-1">
                      Biên tập viên
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 text-sm my-2 text-justify">
                    Là biên tập viên trong lĩnh vực marketing và bán hàng với 5
                    năm kinh nghiệm, tôi tập trung sản xuất nội dung chất lượng,
                    cập nhật xu hướng, mang lại giá trị ứng dụng cao cho nhà bán
                    hàng phát triển bền vững.
                  </p>
                  {/* <a
                                        href="https://www.sapo.vn/"
                                        className="text-blue-600 underline text-sm hover:text-blue-800"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        Quy trình biên tập nội dung tại Sapo
                                    </a> */}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="col-span-1 lg:col-span-4 lg:col-start-9">
              <div className="sticky top-38 space-y-6">
                {/* Mục lục */}
                {toc.length > 0 && (
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800 border-b pb-2">
                      <FiList className="text-primary" /> Nội dung chính
                    </h3>
                    <ul className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                      {toc.map((item) => (
                        <li
                          key={item.id}
                          className={`text-sm transition-all duration-200 
                             ${activeId === item.id ? "font-bold text-primary" : "text-gray-600 hover:text-primary"}
                             ${item.level === 3 ? "pl-4 border-l-2 border-gray-100" : ""}
                          `}
                        >
                          <a
                            href={`#${item.id}`}
                            onClick={handleTocClick(item.id)}
                            className="block py-1"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="z-[9999] relative">
                  <ProtectedRoute>
                    <SavePostWidget
                      postId={blog.id.toString()}
                    />
                  </ProtectedRoute>
                </div>
              </div>

            </aside>

          </div>

        </div>
      </div>
      {/* <RelatedPostsCarousel posts={relatedPosts} visibleCount={6}/> */}
      <RelatedPostsCarousel posts={relatedPosts} />
      <CTASection ctaSection={ctaSection} />
    </div>
  );
}
