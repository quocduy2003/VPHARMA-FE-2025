"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { headerData } from "@/lib/api/header";
import { Button } from "./ui/CTAButton";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");



const VISIBLE_ITEMS_COUNT = 5;

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { menus, ctaButtons } = headerData || {};

  const mainMenus = menus.filter((m) => m.level === 1 && m.parent === null);

  const visibleMenus = mainMenus.slice(0, VISIBLE_ITEMS_COUNT);
  const hiddenMenus = mainMenus.slice(VISIBLE_ITEMS_COUNT);

  const checkIsActive = (link: { link?: string | null; title: string }, pathname: string) => {
    if (!link.link || link.link === "#") return false;

    const basePath = link.link.split("/").slice(0, 2).join("/");
    return pathname === link.link || pathname.startsWith(basePath + "/");
  };


  const renderDesktopNav = () => (
    <nav className="hidden min-[1280px]:flex items-center gap-4 font-medium">
      {visibleMenus.map((menu) => (
        <Link
          key={menu.id}
          href={menu.link ?? "#"}
          className={cn(
            "transition-all duration-200 px-3 py-1 rounded-full text-sub2 text-black",
            checkIsActive(menu, pathname)
              ? "bg-blue-100 text-primary shadow-sm hover:bg-blue-100"
              : "hover:text-primary"
          )}
        >
          {menu.title}
        </Link>
      ))}

      {hiddenMenus.length > 0 && (
        <div className="group relative">
          <button className="flex items-center gap-1 hover:text-primary shad">
            <span className="text-sub2 px-3 text-black">Thêm</span>
            <FiChevronDown className="text-base" />
          </button>
          <div className="absolute left-0 right-0 h-2 top-full" />
          <div className="absolute left-0 top-full mt-2 z-10 hidden w-48 flex-col rounded-lg bg-white p-2 shadow-lg group-hover:flex">
            {hiddenMenus.map((menu) => (
              <Link
                key={menu.id}
                href={menu.link ?? "#"}
                className="text-sub2 rounded-md px-4 py-2 text-black hover:bg-blue-50 hover:text-primary"
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  const renderMobileNav = () => (
    <nav className="min-[1280px]:hidden bg-white">
      <div className="container mx-auto flex flex-col py-1 text-center">
        {menus.map((menu) => (
          <Link
            key={menu.id}
            href={menu.link ?? "#"}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "transition-colors py-2 text-sub2",
              checkIsActive(menu, pathname)
                ? "text-primary font-bold"
                : "text-colordescription hover:text-primary"
            )}
          >
            {menu.title}
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
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src={headerData?.logo?.url || "/Vpharma-AMIT.png"}
            alt={headerData?.logo?.alt || "Logo VPharma"}
            className="h-10 w-auto"
            width={200}
            height={150}
          />
        </Link>

        {renderDesktopNav()}

        <div className="hidden min-[1280px]:flex items-center gap-2">
          {
            ctaButtons?.map((button, index) => (
              <Button
                key={index}
                href={button.link || "#"}
                variant={index === 1 ? "primary" : "secondary"}
                size="ssm"
                className="text-body2 font-bold px-4 py-2 rounded-full"
              >
                {button.title}
              </Button>
            ))
          }
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