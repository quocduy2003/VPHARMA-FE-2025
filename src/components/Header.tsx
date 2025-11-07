"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { headerData } from "@/lib/api/header";
import { HeaderMenuItem } from "@/types";


const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const mainNavLinks: HeaderMenuItem[] = [
  {
    id: 1,
    link: "/giai-phap/tong-quan",
    title: "Giải Pháp",
    level: 1,
    parent: null,
    target: "_self",
    children: [
      { id: 11, link: "/giai-phap/tong-quan", title: "Tổng Quan", level: 3, parent: { id: 1 }, target: "_self", children: [] },
      { id: 12, link: "/giai-phap/chuoi-nha-thuoc", title: "Chuỗi Nhà Thuốc", level: 3, parent: { id: 1 }, target: "_self", children: [] },
      // các menu con khác
    ],
  },
  { id: 2, link: "/bang-gia", title: "Bảng Giá", level: 1, parent: null, target: "_self", children: [] },
  { id: 3, link: "/khach-hang", title: "Khách Hàng", level: 1, parent: null, target: "_self", children: [] },
  { id: 4, link: "/doi-tac-kinh-doanh", title: "Đối Tác", level: 1, parent: null, target: "_self", children: [] },
  { id: 5, link: "/ho-tro", title: "Hỗ Trợ", level: 1, parent: null, target: "_self", children: [] },

];


const moreLinks = [
  { link: "/about-us", title: "Về V-Pharma" },
  { link: "/blog/blog-home", title: "Blog" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { ctaButtons } = headerData;
  const menus = headerData?.menus ?? mainNavLinks;
  const mainMenus = menus.filter((m) => m.level === 1 && m.parent === null);
  const childrenMenus = menus.flatMap((menu) =>
    menu.children
      ?.filter((child) => child.level === 2)
      .map((child) => ({ ...child, parentId: menu.id })) || []
  );
  console.log("childrenMenus:", mainMenus);
  

  // Hàm kiểm tra link có active hay không
  const checkIsActive = (link: typeof mainNavLinks[number], pathname: string) => {

    if (link.children?.length) {
      return link.title === pathname || link.children.some((child) => child.title === pathname);
    }

    return link.title === pathname;
  };


  const renderDesktopNav = () => (
    <nav className="hidden min-[1280px]:flex items-center gap-4 font-medium">
      {mainMenus.map((link) => {

        const isActive = checkIsActive(link, pathname);

        return (
          <Link
            key={link.title}
            href={link.link ?? "#"}
            className={cn(
              "transition-all duration-200 px-3 py-1 rounded-full text-sub2 text-black",
              isActive
                ? "bg-blue-100 text-primary shadow-sm hover:bg-blue-100"
                : "hover:text-primary"
            )}
          >
            {link.title}
          </Link>
        );
      })}

      <div className="group relative">
        <button className="flex items-center gap-1 hover:text-primary shad">
          <span className="text-sub2 px-3 text-black">Thêm</span>
          <FiChevronDown className="text-base" />
        </button>

        <div className="absolute left-0 right-0 h-2 top-full" />
        <div className="absolute left-0 top-full mt-2 z-10 hidden w-48 flex-col rounded-lg bg-white p-2 shadow-lg group-hover:flex">
          {childrenMenus.map((link) => (
            <Link
              key={link.link}
              href={link.link || "#"}
              className="text-sub2 rounded-md px-4 py-2 text-black hover:bg-blue-50 hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );


  const renderMobileNav = () => (
    <nav className="min-[1280px]:hidden bg-white">
      <div className="container mx-auto flex flex-col py-1 text-center">
        {mainNavLinks.map((link) => {

          const isActive = checkIsActive(link, pathname);

          return (
            <Link
              key={link.link}
              href={link.link || "#"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "transition-colors py-2 text-sub2",
                isActive ? "text-primary font-bold" : "text-colordescription hover:text-primary"
              )}
            >
              {link.title}
            </Link>
          );
        })}

        {moreLinks.map((link) => (
          <Link
            key={link.title}
            href={link.link}
            onClick={() => setIsMobileMenuOpen(false)}
            className="transition-colors py-2 text-sub2 text-colordescription hover:text-primary"
          >
            {link.title}
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
  );

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className=" container mx-auto flex items-center justify-between py-3">
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

        {renderDesktopNav()}

        <div className="hidden min-[1280px]:flex items-center gap-2">
          <button className="rounded-full border border-primary px-4 py-2 text-body2 font-bold text-primary hover:bg-blue-100 transition">
            Đăng nhập
          </button>
          <button className="rounded-full border border-primary bg-primary px-4 py-2 text-body2 font-bold text-white hover:bg-primary/70 transition">
            Đăng ký dùng thử
          </button>
        </div>

        <div className="min-[1280px]:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-primary"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && renderMobileNav()}
    </header>
  );
}
