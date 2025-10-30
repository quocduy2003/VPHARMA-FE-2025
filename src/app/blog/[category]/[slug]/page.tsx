"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiFacebook, FiLinkedin, FiList } from "react-icons/fi";
import { SiZalo } from "react-icons/si";
import { BlogPost } from "@/types";
import { getBlogPostBySlug } from "@/lib/api/blog";
import { transformBlogPostData } from "@/lib/transformers/blog";
import { normalizeHeadings } from "@/lib/utils/normalizeHeadings";
import { generateTableOfContents } from "@/lib/utils/generateTOC";
import { TocItem } from "@/types";
import Image from "next/image";

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [safeContent, setSafeContent] = useState<string>("");
  const [toc, setToc] = useState<TocItem[]>([]);
  const { slug } = params;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBlogPostBySlug(slug as string);
      const transformed = transformBlogPostData(data);

      // Xử lý content
      const normalizedContent = normalizeHeadings(transformed.content || "");
      setBlog(transformed);
      setSafeContent(normalizedContent);

      // 🔥 Sinh danh sách TOC sau khi normalize
      const tocItems = generateTableOfContents(normalizedContent);
      setToc(tocItems);
    };
    fetchData();
  }, [slug]);

  if (!blog) {
    return (
        <div className="bg-white py-20">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-body2 text-colordescription font-bold mb-4">
                    <Link href="/blog/blog-home" className="hover:text-primary">
                        Blog
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span>{blog.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-15">
                    {/* Main Content */}
                    <article className="lg:col-span-9">
                        <h1 className="text-h2 font-bold text-black mb-3">{blog.title}</h1>
                        <p className="text-body2 mb-6">
                            Ngày cập nhật:{" "}
                            {blog.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                : ""}
                        </p>
                        <p className="text-body2 mb-6">{blog.description}</p>
                        <Image
                            src={blog.coverImage?.url}
                            alt={blog.alt || blog.title}
                            width={500}
                            height={400}
                            className="w-full rounded-lg object-cover"
                        />

                        {/* Render nội dung HTML trực tiếp */}
                        <div
                            className="rich-text"
                            dangerouslySetInnerHTML={{ __html: safeContent }}
                        />
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-38 space-y-6 max-w-sm">
                            {/* Khối chia sẻ */}
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

                            {/* Mục lục */}
                            {toc.length > 0 && (
                                <div className="rounded-lg border p-4">
                                    <h3 className="text-sub1 font-bold mb-3 flex items-center gap-2">
                                        <FiList /> Nội dung chính
                                    </h3>
                                    <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                        {toc.map((item) => (
                                            <li
                                                key={item.id}
                                                className={`cursor-pointer transition-colors hover:text-primary ${item.level === 3 ? "pl-4 text-body2" : "text-sub2 font-medium"
                                                    }`}
                                            >
                                                <a href={`#${item.id}`}>{item.text}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-body2 text-colordescription font-bold mb-4">
          <Link href="/blog/blog-home" className="hover:text-primary">
            Blog
          </Link>
          <span className="mx-2">&gt;</span>
          <span>{blog.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-15">
          {/* Main Content */}
          <article className="lg:col-span-9">
            <h1 className="text-h2 font-bold text-black mb-3">{blog.title}</h1>
            <p className="text-body2 mb-6">
              Ngày cập nhật:{" "}
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : ""}
            </p>
            <p className="text-body2 mb-6">{blog.description}</p>
            <Image
              width={250}
              height={68}
              src={blog.coverImage?.url}
              alt={blog.alt || blog.title}
              className="w-full rounded-lg object-cover"
            />

            {/* Render nội dung HTML trực tiếp */}
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-38 space-y-6 max-w-sm">
              {/* Khối chia sẻ */}
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

              {/* Mục lục */}
              {toc.length > 0 && (
                <div className="rounded-lg border p-4">
                  <h3 className="text-sub1 font-bold mb-3 flex items-center gap-2">
                    <FiList /> Nội dung chính
                  </h3>
                  <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {toc.map((item) => (
                      <li
                        key={item.id}
                        className={`cursor-pointer transition-colors hover:text-primary ${
                          item.level === 3
                            ? "pl-4 text-body2"
                            : "text-sub2 font-medium"
                        }`}
                      >
                        <a href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
