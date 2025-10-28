"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const mainNavLinks = [
  { href: "/giai-phap/tong-quan", matchPath: "/giai-phap", label: "Giải Pháp" },
  { href: "/bang-gia", label: "Bảng Giá" },
  { href: "/khach-hang", label: "Khách Hàng" },
  { href: "/doi-tac-kinh-doanh", label: "Đối Tác" },
  { href: "/ho-tro", label: "Hỗ Trợ" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-[1536px] items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <img
            src="/Vpharma-AMIT.png"
            alt="Logo VPharma"
            className="h-10 w-auto"
          />
        </Link>

        {/* Main Nav */}
        <nav className="hidden lg:flex items-center gap-4 font-medium">
          {mainNavLinks.map((link) => {
            const pathToMatch = link.matchPath || link.href;
            const isActive =
              pathname !== "/" && pathname.startsWith(pathToMatch);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "transition-all duration-200 px-3 py-1 rounded-full text-sub2 text-colordescription",
                  isActive
                    ? "bg-blue-100 text-primary shadow-sm hover:bg-blue-100"
                    : "hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Dropdown */}
          <div className="group relative ">
            <button className="flex items-center gap-1 hover:text-primary">
              <span className="text-sub2 text-colordescription">Thêm</span>
              <FiChevronDown className="text-base" />
            </button>
            <div className="absolute left-0 right-0 h-2 top-full" />
            <div className="absolute right-0 top-full z-10 mt-2 hidden w-48 flex-col rounded-lg bg-white p-2 shadow-lg group-hover:flex">
              <Link
                href="/about-us"
                className="text-sub2 rounded-md px-4 py-2 text-colordescription hover:bg-blue-50 hover:text-primary"
              >
                Về V-Pharma
              </Link>
              <Link
                href="/blog/blog-home"
                className="text-sub2  rounded-md px-4 py-2 text-colordescription hover:bg-blue-50 hover:text-primary"
              >
                Blog
              </Link>
            </div>
          </div>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="rounded-full border border-primary px-4 py-1 text-body2 font-bold text-primary hover:bg-blue-100 transition">
            Đăng nhập
          </button>
          <button className="rounded-full border border-primary bg-primary px-4 py-1 text-body2 font-bold text-white hover:bg-primary/70 transition">
            Đăng ký
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button className="text-2xl text-primary">☰</button>
        </div>
      </div>
    </header>
  );
}

