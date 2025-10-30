"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const mainNavLinks = [
  { href: "/giai-phap/tong-quan", matchPath: "/giai-phap", label: "Giải Pháp" },
  { href: "/bang-gia", label: "Bảng Giá" },
  { href: "/khach-hang", label: "Khách Hàng" },
  { href: "/doi-tac-kinh-doanh", label: "Đối Tác" },
  { href: "/ho-tro", label: "Hỗ Trợ" },
];

const moreLinks = [
  { href: "/about-us", label: "Về V-Pharma" },
  { href: "/blog/blog-home", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Main Header Bar */}
      <div className=" container  mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(false)} 
        >
          <Image
            src="/Vpharma-AMIT.png"
            alt="Logo VPharma"
            className="h-10 w-auto"
            width={200}
            height={150}
          />
        </Link>

        {/* Desktop Main Nav */}
        <nav className="hidden min-[1280px]:flex items-center gap-4 font-medium">
          {mainNavLinks.map((link) => {
            const pathToMatch = link.matchPath || link.href;
            const isActive = pathname !== "/" && pathname.startsWith(pathToMatch);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "transition-all duration-200 px-3 py-1 rounded-full text-sub2 text-black",
                  isActive
                    ? "bg-blue-100 text-primary shadow-sm hover:bg-blue-100"
                    : "hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Dropdown Thêm */}
          <div className="group relative ">
            <button className="flex items-center gap-1 hover:text-primary shad">
              <span className="text-sub2 text-black">Thêm</span>
              <FiChevronDown className="text-base" />
            </button>
            <div className="absolute left-0 right-0 h-2 top-full" />
            <div className="absolute right-0 top-full z-10 hidden w-48 flex-col rounded-lg bg-white p-2 shadow-lg group-hover:flex">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sub2 rounded-md px-4 py-2 text-black hover:bg-blue-50 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        {/* Desktop Auth Buttons */}
        <div className="hidden min-[1280px]:flex items-center gap-2">
          <button className="rounded-full border border-primary px-4 py-1 text-body2 font-bold text-primary hover:bg-blue-100 transition">
            Đăng nhập
          </button>
          <button className="rounded-full border border-primary bg-primary px-4 py-1 text-body2 font-bold text-white hover:bg-primary/70 transition">
            Đăng ký
          </button>
        </div>

        {/* Mobile Menu Icon Button */}
        <div className="min-[1280px]:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="min-[1280px]:hidden bg-white">
          <div className="container mx-auto flex flex-col py-1 text-center">
            {/* Mobile Main Nav Links */}
            {mainNavLinks.map((link) => {
              const pathToMatch = link.matchPath || link.href;
              const isActive =
                pathname !== "/" && pathname.startsWith(pathToMatch);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "transition-colors py-2 text-sub2",
                    isActive
                      ? "text-primary font-bold"
                      : "text-colordescription hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="transition-colors py-2 text-sub2 text-colordescription hover:text-primary "
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-row justify-center gap-3 mt-4">
              <button
                className="rounded-full border border-primary px-4 py-1 text-body2 font-bold text-primary hover:bg-blue-100 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đăng nhập
              </button>
              <button
                className="rounded-full border border-primary bg-primary px-4 py-1 text-body2 font-bold text-white hover:bg-primary/70 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}