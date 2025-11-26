// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { FiFacebook, FiLinkedin, FiList } from "react-icons/fi";
// import { SiZalo } from "react-icons/si";
// import { BlogCard, BlogPost } from "@/types";
// import { getBlogPostBySlug } from "@/lib/api/blog";
// import {
//   transformBlogPostData,
//   transformBlogListData,
// } from "@/lib/transformers/blog";
// import { normalizeHeadings } from "@/lib/utils/normalizeHeadings";
// import { generateTableOfContents } from "@/lib/utils/generateTOC";
// import { TocItem } from "@/types";
// import Image from "next/image";
// import { Button } from "@/components/ui/CTAButton";
// import { blogData, getBlogPostByCategories } from "@/lib/api";
// import CTASection from "@/components/CTA";
// import RelatedPostsCarousel from "@/components/blog/BlogCardView";

// const articles = [
//   {
//     image: "/features-dashboard1.png",
//     views: 34795,
//     title: "Tổng đài ShopeeFood là gì?",
//     desc: "Các cách liên hệ với Shopee...",
//   },
//   {
//     image: "/features-dashboard2.png",
//     views: 19155,
//     title: "Ship hóa tốc Shopee là gì?",
//     desc: "Giao hàng hoả tốc Shopee...",
//   },
//   {
//     image: "/features-dashboard3.jpg",
//     views: 721,
//     title: "Conversational Commerce là gì?",
//     desc: "Từ A-Z về thương mại hội thoại...",
//   },
//   {
//     image: "/features-dashboard5.jpg",
//     views: 7615,
//     title: "Shopee, TikTok đồng loạt tăng phí",
//     desc: "Và những điều nhà bán cần chú ý...",
//   },
//   {
//     image: "/features-dashboard1.png",
//     views: 4321,
//     title: "Ưu đãi tài khoản Shopee mới",
//     desc: "Hướng dẫn đăng ký Shopee...",
//   },
//   {
//     image: "/features-dashboard1.png",
//     views: 5678,
//     title: "Làm content Shopee hiệu quả",
//     desc: "Bí quyết viết content bán hàng...",
//   },
//   {
//     image: "/features-dashboard1.png",
//     views: 1234,
//     title: "Quy trình xử lý đơn Shopee",
//     desc: "Các bước xử lý đơn nhanh chóng...",
//   },
//   {
//     image: "/features-dashboard1.png",
//     views: 2525,
//     title: "Cách quảng cáo trên TikTok Shop",
//     desc: "Làm sao chạy quảng cáo hiệu quả...",
//   },
//   {
//     image: "/features-dashboard1.png",
//     views: 1100,
//     title: "Kinh nghiệm livestream bán hàng",
//     desc: "Tăng tỷ lệ chốt đơn qua livestream...",
//   },
//   {
//     image: "/features-dashboard1.png",
//     views: 4699,
//     title: "Tips giữ chân khách Shopee",
//     desc: "Chiến lược giữ chân khách hàng lâu...",
//   },
// ];
// export default function BlogDetailPage() {
//   const { ctaSection } = blogData;
//   const params = useParams();
//   const [blog, setBlog] = useState<BlogPost | null>(null);
//   const [relatedPosts, setRelatedPosts] = useState<BlogCard[]>([]);
//   const [safeContent, setSafeContent] = useState<string>("");
//   const [toc, setToc] = useState<TocItem[]>([]);
//   const [activeId, setActiveId] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(true);

//   const { slug, category } = params;
//   const HEADER_OFFSET = 152; // hoặc để tuỳ chỉnh

//   //Fetch data by category slug
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const data = await getBlogPostByCategories(category as string);
//       const transformed = transformBlogListData(data);
//       setRelatedPosts(transformed);
//       console.log("Fetched blog data:", transformed);
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [category]);

//   // Theo dõi sự kiện cuộn để cập nhật mục lục

//   useEffect(() => {
//     const handleScroll = () => {
//       let active = toc[0]?.id;

//       toc.forEach(({ id }) => {
//         const el = document.getElementById(id);
//         if (!el) return;

//         const rect = el.getBoundingClientRect();

//         // Nếu heading đã đi qua top (trừ header)
//         if (rect.top <= HEADER_OFFSET + 10) {
//           active = id;
//         }
//       });

//       setActiveId(active);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [toc]);

//   const handleTocClick =
//     (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
//       e.preventDefault();
//       const el = document.getElementById(id);
//       if (!el) return;

//       const y = el.offsetTop - HEADER_OFFSET;
//       window.scrollTo({ top: y, behavior: "smooth" });
//     };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const data = await getBlogPostBySlug(slug as string);
//       const transformed = transformBlogPostData(data);

//       // Xử lý content
//       const normalizedContent = normalizeHeadings(transformed.content || "");
//       setBlog(transformed);
//       setSafeContent(normalizedContent);

//       // 🔥 Sinh danh sách TOC sau khi normalize
//       const tocItems = generateTableOfContents(normalizedContent);
//       setToc(tocItems);
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [slug]);
//   if (isLoading) {
//     return (
//       <div className="container mx-auto mt-20">
//         {/* Skeleton content */}
//         <div className="animate-pulse space-y-6">
//           <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
//           <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
//           <div className="w-full h-[300px] md:h-[500px] bg-gray-200 rounded-lg"></div>
//           <div className="h-4 w-full bg-gray-200 rounded"></div>
//           <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-center px-4">
//         <div className="text-6xl mb-4 opacity-60">😕</div>
//         <h1 className="text-h2 font-bold mb-2">Không tìm thấy bài viết</h1>
//         <p className="text-sub1 text-gray-500 max-w-md">
//           Bài viết có thể đã bị xoá hoặc đường dẫn không chính xác.
//         </p>
//         <Button variant="primary" href="/blog" className="mt-4">
//           Quay lại trang Blog
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white pt-10">
//       <div className="container mx-auto">
//         <div className="lg:px-[4.25rem]">
//           {/* Breadcrumb */}
//           <div className="text-body2 text-colordescription font-bold mb-6">
//             <Link href="/blog/blog-home" className="hover:text-primary">
//               Blog
//             </Link>
//             <span className="mx-2">&gt;</span>
//             <Link
//               href={`/blog/blog-home?category=${blog.blog_category.slug}`}
//               className="hover:text-primary"
//             >
//               {blog.blog_category.name}
//             </Link>
//             <span className="mx-2">&gt;</span>
//             <span>{blog.title}</span>
//           </div>
//         </div>
//         <div className=" mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:px-[4.25rem] ">
//             {/* Main Content */}
//             <article className="col-span-1 lg:col-span-8 ">
//               <h1>{blog.title}</h1>
//               <p className="text-body2 mb-6">
//                 Ngày cập nhật:{" "}
//                 {blog.updatedAt
//                   ? new Date(blog.updatedAt).toLocaleDateString("vi-VN", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })
//                   : ""}
//               </p>
//               <p className="text-body2 mb-6 text-justify">{blog.description}</p>
//               <Image
//                 src={blog.coverImage?.url}
//                 alt={blog.alt || blog.title}
//                 width={500}
//                 height={400}
//                 className="w-full max-h-[500px] rounded-lg object-cover"
//               />

//               {/* Render nội dung HTML trực tiếp */}
//               <div
//                 className="rich-text overflow-auto"
//                 dangerouslySetInnerHTML={{ __html: safeContent }}
//               />
//               {/* Khối chia sẻ */}
//               <div>
//                 <div className="rounded-lg flex flex-row my-8">
//                   <h3 className="text-sub1 font-bold mr-5">
//                     Chia sẻ bài viết:
//                   </h3>
//                   <div className="flex items-center gap-5">
//                     <a href="#" className="text-blue-600 hover:opacity-80">
//                       <FiFacebook size={24} />
//                     </a>
//                     <a href="#" className="text-blue-800 hover:opacity-80">
//                       <FiLinkedin size={24} />
//                     </a>
//                     <a href="#" className="text-blue-500 hover:opacity-80">
//                       <SiZalo size={24} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//               <div className="author-info rounded-lg mt-2 p-6 border flex flex-col border-dashed border-primary bg-blue-50">
//                 <div className="flex flex-row gap-6 items-center ">
//                   <div className="w-17 h-17 relative rounded-full overflow-hidden flex items-center justify-center">
//                     <Image
//                       src="/avt1.jpg"
//                       alt="Tác giả"
//                       fill
//                       className="object-cover"
//                       priority
//                     />
//                   </div>
//                   <div className="">
//                     <div className="mb-2 text-xs text-gray-600">Tác giả</div>
//                     <div className="font-bold text-primary text-lg mb-1">
//                       PHẠM THU A
//                     </div>
//                     <div className="italic text-sm text-gray-500 mb-1">
//                       Biên tập viên
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-gray-700 text-sm my-2 text-justify">
//                     Là biên tập viên trong lĩnh vực marketing và bán hàng với 5
//                     năm kinh nghiệm, tôi tập trung sản xuất nội dung chất lượng,
//                     cập nhật xu hướng, mang lại giá trị ứng dụng cao cho nhà bán
//                     hàng phát triển bền vững.
//                   </p>
//                   {/* <a
//                                         href="https://www.sapo.vn/"
//                                         className="text-blue-600 underline text-sm hover:text-blue-800"
//                                         target="_blank"
//                                         rel="noopener"
//                                     >
//                                         Quy trình biên tập nội dung tại Sapo
//                                     </a> */}
//                 </div>
//               </div>
//             </article>

//             {/* Sidebar */}
//             <aside className="col-span-1 lg:col-span-4 lg:col-start-9">
//               <div className="sticky top-38 space-y-6">
//                 {/* Mục lục */}
//                 {toc.length > 0 && (
//                   <div className="rounded-lg border p-4 ">
//                     <h3 className="text-sub1 font-bold mb-3 flex items-center gap-2">
//                       <FiList /> Nội dung chính
//                     </h3>
//                     <ul className="space-y-2">
//                       {toc.map((item) => (
//                         <li
//                           key={item.id}
//                           className={`cursor-pointer transition-colors 
//                                                                 ${
//                                                                   activeId ===
//                                                                   item.id
//                                                                     ? "text-primary "
//                                                                     : "text-colordescription"
//                                                                 }
//                                                                 ${
//                                                                   item.level ===
//                                                                   3
//                                                                     ? "pl-4 text-body2"
//                                                                     : "text-sub2"
//                                                                 }
//                                                             `}
//                         >
//                           <a onClick={handleTocClick(item.id)}>{item.text}</a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>
//       {/* <RelatedPostsCarousel posts={relatedPosts} visibleCount={6}/> */}
//       <RelatedPostsCarousel posts={relatedPosts} />
//       <CTASection ctaSection={ctaSection} />
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiFacebook, FiLinkedin, FiList } from "react-icons/fi";
import { SiZalo } from "react-icons/si";
import Image from "next/image";

// Types & Mock Data
import { BlogCard, BlogPost, TocItem } from "@/types";
import { mockAllPosts } from "@/data/mockBlogData"; // Data tĩnh mới tạo
import { normalizeHeadings } from "@/lib/utils/normalizeHeadings";
import { generateTableOfContents } from "@/lib/utils/generateTOC";

// Components
import { Button } from "@/components/ui/CTAButton";
import CTASection from "@/components/CTA";
import RelatedPostsCarousel from "@/components/blog/BlogCardView";
import { SavePostWidget } from "@/components/blog/SavePostWidget"; // Widget lưu bài viết

// Dữ liệu giả cho nội dung bài viết (để test TOC và render HTML)
const DUMMY_CONTENT = `
  <h2>1. Tổng quan vấn đề</h2>
  <p>Đây là nội dung mô phỏng để kiểm tra giao diện. Bài viết này sẽ giúp bạn hiểu rõ hơn về các xu hướng mới nhất.</p>
  
  <h2>2. Lợi ích mang lại</h2>
  <p>Việc áp dụng các phương pháp này mang lại hiệu quả cao trong công việc.</p>
  
  <h3>2.1. Tiết kiệm chi phí</h3>
  <p>Giúp doanh nghiệp tối ưu hóa nguồn lực và giảm thiểu lãng phí.</p>
  
  <h3>2.2. Tăng trưởng doanh thu</h3>
  <p>Cải thiện chỉ số ROI và thu hút nhiều khách hàng tiềm năng hơn.</p>
  
  <h2>3. Các bước thực hiện chi tiết</h2>
  <p>Dưới đây là quy trình 5 bước chuẩn mà bạn nên tuân thủ:</p>
  <ul>
    <li>Bước 1: Nghiên cứu thị trường</li>
    <li>Bước 2: Lên kế hoạch chi tiết</li>
    <li>Bước 3: Triển khai thử nghiệm</li>
  </ul>
  
  <h2>4. Kết luận</h2>
  <p>Hy vọng bài viết này hữu ích với bạn. Hãy lưu lại để đọc khi cần thiết nhé!</p>
`;

export default function BlogDetailPage() {
  // Dữ liệu CTA tĩnh (thay vì lấy từ blogData)
  const ctaSection = {
    title: "Bạn đã sẵn sàng bùng nổ doanh số?",
    description: "Đăng ký ngay để nhận tư vấn miễn phí từ chuyên gia.",
    btnText: "Đăng ký ngay",
    btnUrl: "/contact",
  };

  const params = useParams();
  const { slug, category } = params;
  
  // State
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogCard[]>([]);
  const [safeContent, setSafeContent] = useState<string>("");
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const HEADER_OFFSET = 152;

  // --- LOGIC 1: LẤY BÀI VIẾT TỪ DATA TĨNH (Mock Data) ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Giả lập delay mạng nhẹ (0.5s) cho mượt
      await new Promise(resolve => setTimeout(resolve, 500));

      // 1. Tìm bài viết trong mockAllPosts dựa vào slug trên URL
      const foundPost = mockAllPosts.find((p) => p.slug === slug);

      if (foundPost) {
        // 2. Convert từ BlogCard sang BlogPost (vì mock data chỉ là card)
        // Chúng ta ghép thêm DUMMY_CONTENT vào để có cái hiển thị
        const detailedPost: BlogPost = {
            id: 123, // Fake ID
            title: foundPost.title,
            description: foundPost.description,
            alt: foundPost.alt || foundPost.title,
            coverImage: foundPost.coverImage,
            slug: foundPost.slug,
            createdAt: foundPost.createdAt,
            updatedAt: foundPost.createdAt,
            blog_category: foundPost.category, // Category đã có ID number từ mock data
            author: {
                id: 99,
                name: "PHẠM THU A",
                email: "author@example.com",
                avatar: { url: "/avt1.jpg", alt: "Avatar" }
            },
            content: DUMMY_CONTENT // Sử dụng nội dung giả
        };

        // 3. Xử lý Content & TOC
        const normalizedContent = normalizeHeadings(detailedPost.content || "");
        setBlog(detailedPost);
        setSafeContent(normalizedContent);
        
        const tocItems = generateTableOfContents(normalizedContent);
        setToc(tocItems);
      } else {
        setBlog(null);
      }

      // 4. Lấy bài viết liên quan (Cùng category, trừ bài hiện tại)
      const related = mockAllPosts.filter(
        (p) => p.category.slug === category && p.slug !== slug
      );
      setRelatedPosts(related);

      setIsLoading(false);
    };

    fetchData();
  }, [slug, category]);

  // --- LOGIC 2: SCROLL SPY CHO MỤC LỤC ---
  useEffect(() => {
    const handleScroll = () => {
      let active = toc[0]?.id;
      toc.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= HEADER_OFFSET + 10) {
          active = id;
        }
      });
      setActiveId(active || "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const handleTocClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.offsetTop - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
  };

  // --- RENDER UI ---

  if (isLoading) {
    return (
      <div className="container mx-auto mt-20 px-4">
        <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          <div className="w-full h-[300px] md:h-[500px] bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="text-6xl mb-4 opacity-60">😕</div>
        <h1 className="text-2xl font-bold mb-2">Không tìm thấy bài viết</h1>
        <p className="text-gray-500 max-w-md mb-6">
          Bài viết "{slug}" chưa có trong dữ liệu mẫu hoặc đường dẫn không chính xác.
        </p>
        <Button variant="primary" href="/blog" className="px-6">
          Quay lại trang Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white pt-10">
      <div className="container mx-auto">
        <div className="lg:px-[4.25rem] px-4">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 font-medium mb-6 flex items-center flex-wrap gap-1">
            <Link href="/blog/blog-home" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link
              href={`/blog/blog-home?category=${blog.blog_category.slug}`}
              className="hover:text-primary transition-colors"
            >
              {blog.blog_category.name}
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-gray-900 truncate max-w-[200px] md:max-w-md">{blog.title}</span>
          </div>
        </div>

        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 lg:px-[4.25rem] px-4">
            
            {/* Main Content */}
            <article className="col-span-1 lg:col-span-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{blog.title}</h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                 <span>Ngày cập nhật: </span>
                 <span className="ml-1 font-medium text-gray-700">
                    {blog.updatedAt
                      ? new Date(blog.updatedAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "Vừa xong"}
                 </span>
              </div>

              <p className="text-lg text-gray-600 mb-8 italic border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded-r-lg">
                  {blog.description}
              </p>

              <div className="relative w-full h-[300px] md:h-[450px] mb-8 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={blog.coverImage?.url}
                    alt={blog.alt || blog.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
              </div>

              {/* Render nội dung HTML */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-blue-600 hover:prose-a:text-blue-800"
                dangerouslySetInnerHTML={{ __html: safeContent }}
              />

              {/* Social Share */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-base font-bold text-gray-700">
                    Chia sẻ bài viết:
                  </h3>
                  <div className="flex items-center gap-4">
                    <button className="p-2 bg-white rounded-full text-blue-600 shadow-sm hover:shadow-md hover:bg-blue-50 transition-all" title="Facebook">
                      <FiFacebook size={20} />
                    </button>
                    <button className="p-2 bg-white rounded-full text-blue-800 shadow-sm hover:shadow-md hover:bg-blue-50 transition-all" title="LinkedIn">
                      <FiLinkedin size={20} />
                    </button>
                    <button className="p-2 bg-white rounded-full text-blue-500 shadow-sm hover:shadow-md hover:bg-blue-50 transition-all" title="Zalo">
                      <SiZalo size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-8 p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                <div className="flex flex-row gap-5 items-center">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                    <Image
                      src="/avt1.jpg" // Đảm bảo file này tồn tại trong public hoặc thay bằng link mạng
                      alt="Tác giả"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Tác giả</div>
                    <div className="font-bold text-primary text-xl leading-none mb-1">
                      {blog.author.name}
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      Biên tập viên
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-gray-600 text-sm leading-relaxed text-justify">
                    Là biên tập viên trong lĩnh vực marketing và bán hàng với 5
                    năm kinh nghiệm, tôi tập trung sản xuất nội dung chất lượng,
                    cập nhật xu hướng, mang lại giá trị ứng dụng cao cho nhà bán
                    hàng phát triển bền vững.
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="col-span-1 lg:col-span-4 lg:col-start-9">
              <div className="sticky top-24 space-y-6">
                
                {/* 1. MỤC LỤC */}
                {toc.length > 0 && (
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800 border-b pb-2">
                      <FiList className="text-primary" /> Nội dung chính
                    </h3>
                    <ul className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                      {toc.map((item) => (
                        <li
                          key={item.id}
                          className={`text-sm transition-all duration-200 hover:translate-x-1
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

                {/* 2. WIDGET LƯU BÀI VIẾT (Mới thêm) */}
                <SavePostWidget 
                    post={{
                        slug: blog.slug,
                        title: blog.title,
                        category: blog.blog_category,
                        coverImage: blog.coverImage,
                        description: blog.description,
                        createdAt: blog.createdAt,
                        alt: blog.alt
                    }} 
                />

              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="mt-16">
         <RelatedPostsCarousel posts={relatedPosts} />
      </div>

    </div>
  );
}