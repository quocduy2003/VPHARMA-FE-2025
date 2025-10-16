//   // "use client";
//   // import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
//   // import CTASection from "@/components/CTA";

//   // export default function BlogDetail() {
//   //   return (
//   //     <div>
//   //       {/** Dashboard */}
//   //       <section className="bg-gradient-to-b from-blue-100 to-white py-20 text-center">
//   //         <div className="container mx-auto px-4 lg:px-80">
//   //           <h1 className="text-h1 font-bold text-black">Blog</h1>
//   //           <p className="mx-auto mt-4 max-w-3x">
//   //             Giải pháp toàn diện cho quản lý nhà thuốc, từ tồn kho đến bán hàng,
//   //             với công nghệ hiện đại và dễ sử dụng.
//   //           </p>
//   //         </div>
//   //       </section>
        
//   //       <FadeInOnScroll>
//   //         <CTASection />
//   //       </FadeInOnScroll>
//   //     </div>
//   //   );
//   // }


//   // app/blog/[slug]/page.tsx
// "use client";
// import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
// import CTASection from "@/components/CTA";
// import BlogNavigation from "@/components/BlogNavigation";
// import Link from "next/link";
// import Image from "next/image";
// import { Facebook, Linkedin, Mail } from "lucide-react";
// import { DUMMY_BLOG_DETAIL, DUMMY_BLOG_POSTS } from "@/data/blogData"; // Dữ liệu tĩnh

// // Component cho một bài viết được đề xuất
// const RecommendedPostCard = ({ post }: typeof DUMMY_BLOG_POSTS[0]) => (
//   <Link href={`/blog/${post.slug}`} className="block group">
//     <div className="relative aspect-video overflow-hidden rounded-lg">
//       <Image src={post.imageUrl} alt={post.title} layout="fill" objectFit="cover" />
//     </div>
//     <p className="mt-4 text-xs font-medium text-blue-600">{post.category}</p>
//     <h3 className="mt-1 text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
//       {post.title}
//     </h3>
//   </Link>
// );


// // Component cho mục lục (Table of Contents)
// const TableOfContents = ({ contentSections }: typeof DUMMY_BLOG_DETAIL) => (
//   <div className="p-4 border rounded-lg shadow-sm sticky top-20 bg-white">
//     <h4 className="font-bold mb-3">Nội dung chính</h4>
//     <nav>
//       <ul className="space-y-2 text-sm">
//         {contentSections.map(section => (
//           <li key={section.id}>
//             {/* Dùng <a> cho internal link/scroll */}
//             <a href={`#section-${section.id}`} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">
//               {section.id}. {section.title}
//             </a>
//             {section.subsections && (
//               <ul className="ml-4 mt-1 space-y-1 text-xs">
//                 {section.subsections.map(sub => (
//                   <li key={sub.id}>
//                     <a href={`#section-${sub.id}`} className="text-gray-600 hover:text-blue-600 transition-colors">
//                       {sub.id}. {sub.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   </div>
// );


// export default function BlogDetail() {
//   const post = DUMMY_BLOG_DETAIL;
//   // Giả sử bài viết này thuộc category "Kinh nghiệm kinh doanh" cho active nav
//   const activePathForNav = "/blog?tag=kinh-nghiem-kinh-doanh"; 

//   return (
//     <>
//       {/* 1. BLOG NAVIGATION */}
//       <BlogNavigation activePath={activePathForNav} />
      
//       {/* 2. Content Section */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
//         {/* Breadcrumb - Dùng <Link> */}
//         <div className="text-sm text-gray-500 mb-6">
//           {post.breadcrumbs.map((item, index) => (
//             <span key={index}>
//               <Link href={index === 0 ? "/blog" : "#"} className="hover:text-blue-600">
//                 {item}
//               </Link>
//               {index < post.breadcrumbs.length - 1 && <span className="mx-2">/</span>}
//             </span>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
//           {/* Main Content (3/4 width) */}
//           <div className="lg:col-span-3">
//             <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
//               {post.title}
//             </h1>
//             <p className="text-sm text-gray-500 mb-8">
//               Ngày cập nhật: {post.date}
//             </p>

//             {/* Social Share - Dùng <button> */}
//             <div className="flex items-center space-x-3 text-gray-500 mb-8">
//                 <span className="text-sm font-medium">Chia sẻ bài viết:</span>
//                 <button className="p-2 border rounded-full hover:bg-gray-100"><Facebook size={20} /></button>
//                 <button className="p-2 border rounded-full hover:bg-gray-100"><Linkedin size={20} /></button>
//                 <button className="p-2 border rounded-full hover:bg-gray-100"><Mail size={20} /></button>
//             </div>
            
//             {/* Featured Image */}
//             <div className="relative w-full h-96 overflow-hidden rounded-lg mb-10">
//               <Image src={post.featuredImage} alt="Featured Image" layout="fill" objectFit="cover" />
//             </div>

//             {/* Content Sections */}
//             {post.contentSections.map(section => (
//               <div key={section.id} className="mb-10" id={`section-${section.id}`}>
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                   {section.id}. {section.title}
//                 </h2>
//                 {section.subsections.map(sub => (
//                   <div key={sub.id} className="mb-6" id={`section-${sub.id}`}>
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                       {sub.id}. {sub.title}
//                     </h3>
//                     <p className="text-gray-700 leading-relaxed">
//                       {sub.content}
//                     </p>
//                   </div>
//                 ))}
                
//                 {/* CTA Button (TẢI EBOOK NGAY) - Dùng <Link> */}
//                 {section.id === "1" && (
//                     <div className="flex justify-center my-8">
//                         <Link href="/ebooks/download" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors uppercase text-lg tracking-wider">
//                             TẢI EBOOK NGAY
//                         </Link>
//                     </div>
//                 )}
//               </div>
//             ))}
            
//             {/* Read More link - Dùng <Link> */}
//             <div className="p-4 border-l-4 border-blue-500 bg-blue-50 my-8">
//                 <p className="text-sm font-medium">Đọc thêm: <Link href="#" className="text-blue-600 hover:underline">Kiểm Kê và Quản Lí Nhà Thuốc</Link></p>
//             </div>


//           </div>

//           {/* Sidebar (1/4 width) */}
//           <div className="lg:col-span-1">
            
//             {/* Table of Contents */}
//             <TableOfContents contentSections={post.contentSections} />

//             {/* Lưu vào kiến thức của bạn - Dùng <button> */}
//             <div className="p-4 border rounded-lg shadow-sm mt-6 bg-white">
//                 <p className="text-sm text-center mb-3">Lưu vào cảm nang kiến thức của bạn</p>
//                 <button className="w-full bg-blue-100 text-blue-600 font-medium py-2 rounded-full hover:bg-blue-200 transition-colors">
//                     Lưu lại
//                 </button>
//             </div>
            
//           </div>
//         </div>

//         {/* 3. Recommended Posts Section - Dựa trên image_ef607e.jpg */}
//         <div className="py-10 border-t mt-10">
//           <h2 className="text-2xl font-bold mb-6">Đề Xuất Dành Cho Bạn</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {post.recommendedPosts.map((rPost, index) => (
//               <RecommendedPostCard key={index} {...rPost} />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 4. CTA Section */}
//       <FadeInOnScroll>
//         <CTASection />
//       </FadeInOnScroll>
//     </>
//   );
// }

"use client";

import { blogPosts } from "@/data/blogData";
import { useSearchParams } from "next/navigation";

export default function BlogDetailPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy bài viết</h1>
        <p className="text-gray-500">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    );
  }

  return (
    <article className="prose prose-lg mx-auto max-w-4xl">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">{post.title}</h1>
      <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
        <span>Đăng bởi {post.author}</span>
        <span>|</span>
        <span>Vào ngày {post.date}</span>
      </div>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="mb-8 w-full rounded-lg object-cover"
      />
      <div className="text-gray-800">{post.content}</div>
    </article>
  );
}