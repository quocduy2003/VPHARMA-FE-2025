"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiSearch, FiChevronDown } from "react-icons/fi";
import { blogCategories } from "@/lib/api/blog";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const MAX_VISIBLE_CATEGORIES = 5;
const visibleLinks = blogCategories.slice(0, MAX_VISIBLE_CATEGORIES);
const dropdownLinks = blogCategories.slice(MAX_VISIBLE_CATEGORIES);

const ebooksLink = { href: "/blog/ebook", label: "Ebooks" };

export function BlogHeader() {
  const pathname = usePathname();
  const segments = pathname?.split('/') ?? [];
  const categoryParam = segments[1] === 'blog' ? segments[2] ?? '' : '';
  const activeCategory = categoryParam || "home";

  const isLinkActive = (categorySlug: string) => {
    return activeCategory === categorySlug;
  };

  const isHomeActive = pathname.startsWith("/blog/blog-home") && !activeCategory;


  return (
    <header className="sticky top-[72px] z-30 bg-ink text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-6">
          {/* Nút Home */}
          <Link href="/blog/blog-home" className="group flex items-center gap-2">
            <FiHome
              className={cn(
                "h-8 w-8 p-1.5 transition-all duration-300",
                "group-hover:text-white",
                isHomeActive ? "text-white" : "text-white/70"
              )}
            />
          </Link>

          {/* Danh mục */}
          <nav className="hidden items-center gap-5 text-sub2 font-medium md:flex">
            {visibleLinks.map((link) => (
              <Link
                key={link.id}
                href={`/blog/blog-home?category=${link.slug}`}
                className={cn(
                  "transition-colors hover:text-white",
                  isLinkActive(link.slug)
                    ? "font-semibold text-white"
                    : "text-white/70"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Dropdown */}
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
                      key={link.id}
                      href={`/blog/blog-home?category=${link.slug}`}
                      className={cn(
                        "rounded-md px-4 py-2 text-sm hover:bg-gray-100",
                        isLinkActive(link.slug)
                          ? "font-semibold text-primary"
                          : "text-gray-700"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ebooks */}
            <Link
              key={ebooksLink.label}
              href={ebooksLink.href}
              className={cn(
                "transition-colors hover:text-white",
                pathname === ebooksLink.href
                  ? "font-semibold text-white"
                  : "text-white/70"
              )}
            >
              {ebooksLink.label}
            </Link>
          </nav>
        </div>

        {/* Ô tìm kiếm */}
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


