"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiSearch, FiChevronDown, FiX } from "react-icons/fi";
import { blogCategories } from "@/lib/api/blog";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const MAX_VISIBLE_CATEGORIES = 5;
const visibleLinks = blogCategories.slice(0, MAX_VISIBLE_CATEGORIES);
const dropdownLinks = blogCategories.slice(MAX_VISIBLE_CATEGORIES);

const ebooksLink = { href: "/blog/ebooks", label: "Ebooks" };

export function BlogHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  console.log("categoryParam in header:", categoryParam);
  const activeCategory = categoryParam ?? "blog-home";

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isHomeActive = pathname.startsWith("/blog/blog-home") && !categoryParam;
  const isLinkActive = (categorySlug: string) => activeCategory === categorySlug;

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [isSearchOpen]);

  return (
    <header className="sticky top-[72px] z-30 bg-ink">
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="flex items-center">
          <Link href="/blog/blog-home" className="group flex items-center ">
            <FiHome
              className={cn(
                "h-8 w-8 transition-color duration-300",
                isHomeActive ? "text-primary" : "text-white hover:text-blue-500"
              )}
            />
          </Link>

          <nav className="mx-4 hidden items-center gap-6 text-sub2 font-medium md:flex">
            {visibleLinks.map((link) => (
              <Link
                key={link.id}
                href={`/blog/blog-home?category=${link.slug}`}
                className={cn(
                  "transition-colors mx-4",
                  isLinkActive(link.slug)
                    ? "text-primary"
                    : "text-white hover:text-blue-500"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Dropdown (giữ nguyên) */}
            {dropdownLinks.length > 0 && (
              <div className="group relative">
                <button className="flex items-center gap-1 text-white/70 transition-colors hover:text-white">
                  <span>Chủ đề khác</span>
                  <FiChevronDown className="text-base" />
                </button>
                <div className="absolute left-0 right-0 h-2 top-full" />
                <div className="absolute left-0 top-full z-100 mt-2 hidden w-48 flex-col rounded-lg bg-white p-2 shadow-lg group-hover:flex">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={`/blog/blog-home?category=${link.slug}`}
                      className={cn(
                        "block w-full rounded-md px-4 py-2 text-sub2 font-medium transition-colors",
                        isLinkActive(link.slug)
                          ? "text-primary"
                          : "text-gray-800 hover:text-blue-500"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ebooks (giữ nguyên) */}
            <Link
              key={ebooksLink.label}
              href={ebooksLink.href}
              className={cn(
                "transition-colors mx-4",
                pathname === ebooksLink.href
                  ? "text-primary"
                  : "text-white hover:text-blue-500"
              )}
            >
              {ebooksLink.label}
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.input
                ref={searchInputRef}
                key="search-input"
                type="text"
                placeholder="Bài viết..."
                initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0, marginRight: 0 }}
                animate={{ width: "200px", opacity: 1, paddingLeft: "1rem", paddingRight: "1rem", marginRight: "0.5rem" }}
                exit={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0, marginRight: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                // Kiểu dáng
                className="rounded-full bg-white py-1 text-sm text-gray-800 focus:outline-none"
              />
            )}
          </AnimatePresence>

          {/* Nút bấm (Icon Search/Close) */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)} // Toggle
            className="group flex items-center justify-center "
            aria-label={isSearchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
          >
            {isSearchOpen ? (
              <FiX className="h-8 w-8 text-white/70 transition-colors group-hover:text-white"  />
            ) : (
              <FiSearch
                className="h-8 w-8 text-white transition-colors group-hover:text-white"
 
              />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}