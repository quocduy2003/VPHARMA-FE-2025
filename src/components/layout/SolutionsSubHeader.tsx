
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const subNavLinks = [
  { href: "/giai-phap/tong-quan", label: "Tổng quan" },
  { href: "/giai-phap/chuoi-nha-thuoc", label: "Giải pháp chuỗi nhà thuốc" },
  // {
  //   href: "/giai-phap/phong-kham-co-nha-thuoc",
  //   label: "Giải pháp tích hợp cho phòng khám/mạch",
  // },
];

export function SolutionsSubHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-[64px] z-30 bg-ink">
      <div className="container mx-auto flex items-center gap-6 py-3">
        <div className="flex items-center gap-6">
          <p className="text-sub1 text-white font-bold">
            Phần mềm quản lý nhà thuốc
          </p>
          <span className="hidden lg:block rounded-2xl h-8 w-0.5 bg-blue-100" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sub2 flex-1">
          {subNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-white font-bold "
                    : "text-blue-100 hover:text-white"
                )}
              >
                {link.label}
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
            {subNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
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