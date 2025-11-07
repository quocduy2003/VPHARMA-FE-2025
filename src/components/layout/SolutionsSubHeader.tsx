
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { headerSolutionData } from "@/lib/api/header";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");


export function SolutionsSubHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const getSlug = (url: string) => url.split("/").filter(Boolean).pop();

  const menus = Array.isArray(headerSolutionData?.menus) ? headerSolutionData.menus : [];
  console.log("headerSolutionData:", menus);
  return (
    <header className="sticky top-[64px] z-30 bg-ink">
      <div className="container mx-auto flex items-center gap-6 py-3">
        <div className="flex items-center gap-6">
          <p className="text-sub1 text-white font-bold">
            {headerSolutionData.title || "Phần mềm quản lý nhà thuốc"}
          </p>
          <span className="hidden lg:block rounded-2xl h-8 w-0.5 bg-blue-100" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sub2 flex-1">
          {menus?.map((link) => {
            const isActive = getSlug(pathname || "") === getSlug(link.link || "#");
            return (
              <Link
                key={link.link}
                href={link.link}
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-white font-bold "
                    : "text-blue-100 hover:text-white"
                )}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Icon Button */}
        <div className="lg:hidden ml-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-ink border-t border-blue-100/20">
          <div className="container mx-auto flex flex-col py-1 text-center">
            {menus.map((link) => {
              const isActive = getSlug(pathname || "") === getSlug(link.link || "#");
              return (
                <Link
                  key={link.link}
                  href={link.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "transition-colors py-2 text-sub2",
                    isActive
                      ? "text-white font-bold"
                      : "text-blue-100 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}