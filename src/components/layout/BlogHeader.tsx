// // components/BlogNavigation.tsx
// "use client";

// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import { FiHome, FiSearch, FiChevronDown  } from "react-icons/fi";
// import { blogPosts } from "@/data/blogData";

// const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// const allTags = new Set<string>();
// blogPosts.forEach(post => {
//   post.tags.forEach(tag => allTags.add(tag));
// });

// const dynamicNavLinks = Array.from(allTags).map(tag => ({
//   href: `/blog/blog-category?tag=${encodeURIComponent(tag)}`,
//   label: tag,
// }));

// const blogNavLinks = [
//   ...dynamicNavLinks,
//   { href: "/blog/ebook", label: "Ebooks" },
// ];

// export function BlogHeader() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const activeTag = searchParams.get("tag");

//   return (
//     <header className="sticky top-[72px] z-30 bg-ink text-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between px-4 py-4">
//         <div className="flex items-center gap-6">
//           <Link
//             href="/blog/blog-home"
//             className={cn(
//               "transition-colors hover:text-white",
//               pathname === "/blog/blog-home"
//                 ? "text-white font-bold"
//                 : "text-white/70"
//             )}
//           >
//             <FiHome className="h-8 w-8 text-h6" />
//           </Link>
//           <nav className="flex items-center gap-6 text-sub2 flex-1">
//             {blogNavLinks.map((link) => {
//               const isActive =
//                 (pathname === "/blog/blog-category" && activeTag === link.label) ||
//                 pathname === link.href;
//               return (
//                 <Link
//                   key={link.label}
//                   href={link.href}
//                   className={cn(
//                     "transition-colors hover:text-white",
//                     isActive ? "font-semibold text-white" : "text-white/70"
//                   )}
//                 >
//                   {link.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="relative justify-end">
//           <input
//             type="text"
//             placeholder="Bài viết..."
//             className="w-full rounded-full bg-white py-2 pl-4 pr-10 text-sm text-gray-800 focus:outline-none"
//           />
//           <button className="absolute inset-y-0 right-0 flex items-center justify-center rounded-full bg-blue-500 px-3">
//             <FiSearch className="h-5 w-5 text-white" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// components/layout/BlogHeader.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FiHome, FiSearch, FiChevronDown } from "react-icons/fi";
import { blogPosts } from "@/data/blogData";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const allTags = new Set<string>();
blogPosts.forEach(post => {
  post.tags.forEach(tag => allTags.add(tag));
});

// --- THAY ĐỔI Ở ĐÂY ---
// Đổi href từ "/blog/blog-category" thành "/blog/blog-home"
const dynamicNavLinks = Array.from(allTags).map(tag => ({
  href: `/blog/blog-home?tag=${encodeURIComponent(tag)}`,
  label: tag,
}));

const MAX_VISIBLE_TAGS = 4;
const visibleLinks = dynamicNavLinks.slice(0, MAX_VISIBLE_TAGS);
const dropdownLinks = dynamicNavLinks.slice(MAX_VISIBLE_TAGS);

const ebooksLink = { href: "/blog/ebook", label: "Ebooks" };

export function BlogHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  // Hàm kiểm tra link active
  const isLinkActive = (link: { href: string; label: string }) => {
    if (link.href.startsWith('/blog/blog-home?tag')) {
      return activeTag === link.label;
    }
    return pathname === link.href;
  };

  return (
    <header className="sticky top-[72px] z-30 bg-[#0A2560] text-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/blog/blog-home" className="flex items-center gap-2">
            <FiHome className="h-8 w-8 rounded-md bg-white p-1.5 text-[#0A2560]" />
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
            {visibleLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-white",
                  isLinkActive(link) ? "font-semibold text-white" : "text-white/70"
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
                <div className="absolute left-0 top-full z-10 mt-2 hidden w-48 flex-col rounded-lg bg-white p-2 text-gray-800 shadow-lg group-hover:flex">
                  {dropdownLinks.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "rounded-md px-4 py-2 text-sm hover:bg-gray-100",
                        isLinkActive(link) ? "font-semibold text-primary" : "text-gray-700"
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
                isLinkActive(ebooksLink) ? "font-semibold text-white" : "text-white/70"
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