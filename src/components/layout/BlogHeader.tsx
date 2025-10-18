"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FiHome, FiSearch, FiChevronDown } from "react-icons/fi";
import { blogPosts } from "@/data/blogData";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const allCategories = new Set<string>(); // Set dùng loại bỏ trùng lập
blogPosts.forEach((post) => {
  // Duyệt qua tất cả bài viết để lấy categories rồi thêm vào Set
  post.categories.forEach((category) => allCategories.add(category)); // allCategories chứa tất cả categories duy nhất
});

const dynamicNavLinks = Array.from(allCategories).map((category) => ({
  //Array.from(allCategories) chuyển Set thành mảng.
  href: `/blog/blog-home?category=${encodeURIComponent(category)}`, // .map(...) tạo ra danh sách link tương ứng cho mỗi category. ( tạo url với category được mã hóa)
  label: category,
}));

const MAX_VISIBLE_CATEGORIES = 7; // Số lượng link hiển thị trực tiếp trên header ( số categories)
const visibleLinks = dynamicNavLinks.slice(0, MAX_VISIBLE_CATEGORIES);
const dropdownLinks = dynamicNavLinks.slice(MAX_VISIBLE_CATEGORIES); // Các link còn lại sẽ nằm trong dropdown

const ebooksLink = { href: "/blog/ebook", label: "Ebooks" };

export function BlogHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const isLinkActive = (link: { href: string; label: string }) => {
    if (link.href.startsWith("/blog/blog-home?category")) {
      return activeCategory === link.label;
    }
    return pathname === link.href;
  };
  const isHomeActive = pathname === '/blog/blog-home' && !activeCategory;
  return (
    <header className="sticky top-[72px] z-30 bg-ink text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/blog/blog-home"
            className="group flex items-center gap-2"
          >
            <FiHome
              className={cn(
                "h-8 w-8 p-1.5 transition-all duration-300",
                "group-hover:text-white", // Hiệu ứng khi hover vào thẻ Link cha
                isHomeActive ? "text-white" : "text-white/70" // Style khi active và inactive
              )}
            />
          </Link>
          <nav className="hidden items-center gap-5 text-sub2 font-medium md:flex">
            {visibleLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-white",
                  isLinkActive(link)
                    ? "font-semibold text-white"
                    : "text-white/70"
                )}
              >
                {link.label}
              </Link>
            ))}
            {dropdownLinks.length > 0 && (
              <div className="group relative">
                <button className="flex items-center gap-1 text-white/70 transition-colors hover:text-white">
                  <span>Chủ đề khác</span>
                  <FiChevronDown className="text-base" />
                </button>
                <div className="absolute left-0 right-0 h-2 top-full" />
                <div className="absolute left-0 top-full z-100 mt-2 hidden w-48 flex-col rounded-lg bg-white p-2 text-gray-800 shadow-lg group-hover:flex">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "rounded-md px-4 py-2 text-sm hover:bg-gray-100",
                        isLinkActive(link)
                          ? "font-semibold text-primary"
                          : "text-gray-700"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <Link
              key={ebooksLink.label}
              href={ebooksLink.href}
              className={cn(
                "transition-colors hover:text-white",
                isLinkActive(ebooksLink)
                  ? "font-semibold text-white"
                  : "text-white/70"
              )}
            >
              {ebooksLink.label}
            </Link>
          </nav>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Bài viết..."
            className="w-full rounded-full bg-white py-2 pl-4 pr-10 text-sm text-gray-800 focus:outline-none"
          />
          <button className="absolute inset-y-0 right-0 flex items-center justify-center rounded-full bg-blue-500 px-3">
            <FiSearch className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}

// "use client";
// import Link from "next/link";
// import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { FiHome, FiSearch, FiChevronDown } from "react-icons/fi";
// import { blogPosts } from "@/data/blogData";
// import React, { useState, useLayoutEffect, useRef } from "react";

// const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// const allCategories = new Set<string>();
// blogPosts.forEach((post) => {
//   post.categories.forEach((category) => allCategories.add(category));
// });

// const dynamicNavLinks = Array.from(allCategories).map((category) => ({
//   href: `/blog/blog-home?category=${encodeURIComponent(category)}`,
//   label: category,
// }));

// const ebooksLink = { href: "/blog/ebook", label: "Ebooks" };
// // Đây là logic cho yêu cầu mới: gộp tất cả link lại
// const allLinks = [...dynamicNavLinks, ebooksLink];

// export function BlogHeader() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const activeCategory = searchParams.get("category");

//   // Thêm state cho thanh tìm kiếm
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   // State cho yêu cầu mới: tính toán link động
//   const [visibleNavLinks, setVisibleNavLinks] = useState(allLinks);
//   const [dropdownNavLinks, setDropdownNavLinks] = useState<typeof allLinks>([]);

//   // Refs cho yêu cầu mới: dùng để đo đạc
//   const navContainerRef = useRef<HTMLElement>(null);
//   const dropdownButtonRef = useRef<HTMLButtonElement>(null);
//   const measuringLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

//   const isLinkActive = (link: { href: string; label: string }) => {
//     if (link.href.startsWith("/blog/blog-home?category")) {
//       return activeCategory === link.label;
//     }
//     return pathname === link.href;
//   };
//   const isHomeActive = pathname === "/blog/blog-home" && !activeCategory;

//   // Đây là logic chính cho yêu cầu mới (co giãn động)
//   useLayoutEffect(() => {
//     const calculateLayout = () => {
//       if (!navContainerRef.current) return;

//       const containerWidth = navContainerRef.current.clientWidth;
//       const dropdownWidth = dropdownButtonRef.current?.offsetWidth || 90;
//       const gap = 20; // Tailwind 'gap-5' = 1.25rem = 20px

//       let currentWidth = 0;
//       const newVisible = [];
//       const newDropdown = [];

//       for (let i = 0; i < allLinks.length; i++) {
//         const linkElement = measuringLinkRefs.current[i];
//         if (!linkElement) continue;

//         const linkWidth = linkElement.offsetWidth;
//         const spaceForThisLink = linkWidth + (i > 0 ? gap : 0);

//         const willNeedDropdown = allLinks.length - 1 - i > 0;
//         const spaceForDropdown = willNeedDropdown ? dropdownWidth + gap : 0;

//         if (
//           currentWidth + spaceForThisLink + spaceForDropdown >
//           containerWidth
//         ) {
//           newDropdown.push(...allLinks.slice(i));
//           break;
//         } else {
//           newVisible.push(allLinks[i]);
//           currentWidth += spaceForThisLink;
//         }
//       }

//       setVisibleNavLinks(newVisible);
//       setDropdownNavLinks(newDropdown);
//     };

//     calculateLayout();

//     const navElement = navContainerRef.current;
//     if (!navElement) return; // Sửa lỗi TypeScript (null check)

//     const observer = new ResizeObserver(calculateLayout);
//     observer.observe(navElement);
//     return () => observer.disconnect();
//   }, []);

//   // Hàm xử lý tìm kiếm
//   const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/blog/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//     }
//   };

//   return (
//     // Tăng z-index lên z-50 để đảm bảo dropdown luôn ở trên
//     <header className="sticky top-[72px] z-50 bg-ink text-white shadow-md">
//       {/* === Bộ chứa đo lường (cho logic co giãn động) === */}
//       <div
//         className="absolute top-0 left-0 -z-10 h-0 overflow-hidden invisible"
//         aria-hidden="true"
//       >
//         <div className="flex items-center gap-5">
//           {allLinks.map((link, i) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               ref={(el) => { // Sửa lỗi TypeScript (ref callback)
//                 measuringLinkRefs.current[i] = el;
//               }}
//               className="text-sub2 font-medium whitespace-nowrap"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <div className="group relative">
//             <button
//               ref={dropdownButtonRef}
//               className="flex items-center gap-1 text-white/70"
//             >
//               <span>Chủ đề khác</span>
//               <FiChevronDown className="text-base" />
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* === Hết bộ chứa đo lường === */}

//       <div className="container mx-auto flex items-center justify-between py-4 px-4">
//         <div className="flex flex-1 items-center gap-6 ">
//           <Link
//             href="/blog/blog-home"
//             className="group flex items-center gap-2"
//           >
//             <FiHome
//               className={cn(
//                 "h-8 w-8 p-1.5 transition-all duration-300",
//                 "group-hover:text-white",
//                 isHomeActive ? "text-white" : "text-white/70"
//               )}
//             />
//           </Link>
//           {/* Thanh Nav hiển thị các link đã được tính toán động */}
//           <nav
//             ref={navContainerRef}
//             className="hidden flex-1 items-center gap-5 text-sub2 font-medium md:flex"
//           >
//             {/* Render các link TỪ STATE 'visibleNavLinks' */}
//             {visibleNavLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 href={link.href}
//                 className={cn(
//                   "transition-colors hover:text-white whitespace-nowrap",
//                   isLinkActive(link)
//                     ? "font-semibold text-white"
//                     : "text-white/70"
//                 )}
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {/* Chỉ hiển thị dropdown NẾU STATE 'dropdownNavLinks' có item */}
//             {dropdownNavLinks.length > 0 && (
//               <div className="group relative">
//                 <button className="flex items-center gap-1 text-white/70 transition-colors hover:text-white">
//                   <span>Chủ đề khác</span>
//                   <FiChevronDown className="text-base" />
//                 </button>
//                 <div className="absolute left-0 top-full z-40 hidden w-48 flex-col rounded-lg bg-white p-2 text-gray-800 shadow-lg group-hover:flex">
//                   {/* Render các link TỪ STATE 'dropdownNavLinks' */}
//                   {dropdownNavLinks.map((link) => (
//                     <Link
//                       key={link.label}
//                       href={link.href}
//                       className={cn(
//                         "rounded-md px-4 py-2 text-sm hover:bg-gray-100",
//                         isLinkActive(link)
//                           ? "font-semibold text-primary"
//                           : "text-gray-700"
//                       )}
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </nav>
//         </div>
        
//         {/* Thanh tìm kiếm đã hoàn thiện logic */}
//         <form className="relative" onSubmit={handleSearchSubmit}>
//           <input
//             type="text"
//             placeholder="Bài viết..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-48 rounded-full bg-white py-2 pl-4 pr-10 text-sm text-gray-800 focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="absolute inset-y-0 right-0 flex items-center justify-center rounded-full bg-blue-500 px-3"
//             aria-label="Tìm kiếm"
//           >
//             <FiSearch className="h-5 w-5 text-white" />
//           </button>
//         </form>
//       </div>
//     </header>
//   );
// }