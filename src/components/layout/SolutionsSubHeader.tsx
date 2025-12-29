
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";
import { headerSolutionData } from "@/lib/api/header";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export function SolutionsSubHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Xử lý active link
  const getSlug = (url: string) => url.split("/").filter(Boolean).pop();

  const menus = Array.isArray(headerSolutionData?.menus)
    ? headerSolutionData.menus
    : [];
  
  const title = headerSolutionData.title || "Phần mềm quản lý nhà thuốc";

  // Khóa cuộn trang khi mở menu mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // --- Render Mobile Nav (Sidebar trượt từ phải) ---
  const renderMobileNav = () => {
    return (
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[9999] flex justify-end transition-all duration-300",
          isMobileMenuOpen ? "visible" : "invisible delay-300"
        )}
      >
        {/* Backdrop (Nền đen mờ) */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar Container */}
        <div
          className={cn(
            "relative z-10 w-[85%] max-w-[360px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-ink text-white">
            <span className="font-bold text-lg truncate pr-2">
              {title}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Body Sidebar (List Menu) */}
          <div className="flex-1 overflow-y-auto py-2 bg-white">
            <div className="flex flex-col">
              {menus.map((link) => {
                const isActive = getSlug(pathname || "") === getSlug(link.link || "#");
                return (
                  <Link
                    key={link.link}
                    href={link.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-5 py-4 text-sub2 font-medium border-b border-gray-50 transition-colors",
                      isActive
                        ? "text-primary bg-blue-50/50 font-bold"
                        : "text-colordescription hover:bg-gray-50 hover:text-primary"
                    )}
                  >
                    {link.label || link.title}
                    {/* Icon mũi tên nhỏ để chỉ thị điều hướng */}
                    <FiChevronRight className={cn("text-lg", isActive ? "text-primary" : "text-gray-300")} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    // Sticky dưới Header chính (giả sử Header chính cao 70px)
    <header className="sticky top-[70px] z-30 bg-ink shadow-sm transition-all">
      <div className="container mx-auto flex items-center justify-between gap-6 py-3 min-h-[56px]">
        {/* Left Side: Title */}
        <div className="flex items-center gap-6 flex-1 lg:flex-none">
          <p className="text-sub1 text-white font-bold truncate">
            {title}
          </p>
          <span className="hidden lg:block rounded-2xl h-6 w-0.5 bg-blue-100/30" />
        </div>

        {/* Desktop Nav (Hidden on Mobile) */}
        <nav className="hidden lg:flex items-center gap-6 text-sub2 flex-1 justify-start xl:justify-start">
          {menus?.map((link) => {
            const isActive = getSlug(pathname || "") === getSlug(link.link || "#");
            return (
              <Link
                key={link.link}
                href={link.link}
                className={cn(
                  "transition-all relative py-1",
                  isActive
                    ? "text-white font-bold"
                    : "text-blue-100 hover:text-white"
                )}
              >
                {link.title || link.label}
                {/* Active Indicator (Gạch chân nhẹ) */}
                {isActive && (
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button (Visible < 1280px) */}
        <div className="lg:hidden ml-auto">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 text-2xl text-white hover:text-blue-200 transition-colors"
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Render Mobile Menu */}
      {renderMobileNav()}
    </header>
  );
}