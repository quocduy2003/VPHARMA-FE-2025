"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiFacebook, FiLinkedin, FiList } from "react-icons/fi";
import { SiZalo } from "react-icons/si";
import { BlogPost } from "@/types";
import { getBlogPostBySlug } from "@/lib/api/blog";
import { transformBlogPostData } from "@/lib/transformers/blog";

// function TableOfContents({ sections }: { sections: ContentSection[] }) {
//   const slug = useParams().slug as string;
//   const [activeId, setActiveId] = useState<string>("");
//   const activeItemRef = useRef<HTMLLIElement | null>(null);

//   useEffect(() => {
//     const SCROLL_OFFSET = 150;
//     const handleScroll = () => {
//       let currentId = "";
//       for (let i = sections.length - 1; i >= 0; i--) {
//         const element = document.getElementById(sections[i].id);
//         if (element && element.getBoundingClientRect().top <= SCROLL_OFFSET) {
//           currentId = sections[i].id;
//           break;
//         }
//       }
//       setActiveId(currentId);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [sections]);

//   useEffect(() => {
//     if (activeItemRef.current) {
//       activeItemRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//       });
//     }
//   }, [activeId]);

//   const scrollToId = (id: string) => {
//     const element = document.getElementById(id);
//     setActiveId(id);
//     if (element) {
//       const offsetPosition =
//         element.getBoundingClientRect().top + window.pageYOffset - 140;
//       window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//     }
//   };

//   let level1Counter = 0;
//   let level2Counter = 0;

//   return (
//     <div className="rounded-lg border p-4">
//       <h3 className="text-sub1 font-bold mb-3 flex items-center gap-2">
//         <FiList /> Nội dung chính
//       </h3>
//       <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//         {sections.map((section) => {
//           let displayTitle = "";
//           if (section.level === 1) {
//             level1Counter++;
//             level2Counter = 0;
//             displayTitle = `${level1Counter}. ${section.title}`;
//           } else {
//             level2Counter++;
//             displayTitle = `${level1Counter}.${level2Counter}. ${section.title}`;
//           }
//           const isActive = activeId === section.id;

//           return (
//             <li
//               ref={isActive ? activeItemRef : null}
//               key={section.id}
//               onClick={() => scrollToId(section.id)}
//               className={`line-clamp-1 cursor-pointer transition-colors hover:text-primary ${
//                 section.level === 2 ? "pl-4 text-body2" : "text-sub2 font-medium"
//               } ${isActive ? "text-primary font-bold" : "text-gray-600"}`}
//             >
//               {displayTitle}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

export default function BlogDetailPage() {
    const params = useParams();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const { slug } = params;
    useEffect(() => {
        const fetchData = async () => {
            const data = await getBlogPostBySlug(slug as string);
            setBlog(transformBlogPostData(data));
        }
        fetchData();
    }, [slug]);
    const post = blog;


    if (!post) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-black">Không có bài viết để hiển thị</h1>
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
                    <span>{post.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-15">
                    {/* Main Content */}
                    <article className="lg:col-span-9">
                        <h1 className="text-h2 font-bold text-black mb-3">{post.title}</h1>
                        <p className="text-body2 mb-6">
                            Ngày cập nhật:{" "}
                            {post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                : ""}
                        </p>
                        <p className="text-body2 mb-6">{post.description}</p>
                        <img
                            src={post.coverImage?.url}
                            alt={post.alt || post.title}
                            className="w-full rounded-lg object-cover"
                        />

                        {/* Render nội dung HTML trực tiếp */}
                        <div
                            className=" rich-text"
                            dangerouslySetInnerHTML={{ __html: post.content || "" }}
                        />
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
                            {/* Bỏ TableOfContents vì không cần */}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
