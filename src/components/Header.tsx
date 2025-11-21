"use client";

import {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { headerData } from "@/lib/api/header";
import { Button } from "./ui/CTAButton";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");
const itemGap = 12; // = 0.75rem (ứng với class gap-3)
const safetyBuffer = 1; // 1px buffer để tránh lỗi làm tròn pixel

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const { menus, ctaButtons } = headerData || {};

  const mainMenus =
    menus?.filter((m) => m.level === 1 && m.parent === null) ?? [];

  const [visibleMenus, setVisibleMenus] = useState(mainMenus);
  const [hiddenMenus, setHiddenMenus] = useState<typeof mainMenus>([]);
  const navRef = useRef<HTMLElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const itemWidths = useRef<Map<number, number>>(new Map());
  const moreMenuContainerRef = useRef<HTMLDivElement>(null);

  const checkIsActive = (
    link: { link?: string | null; title: string },
    pathname: string
  ) => {
    if (!link.link || link.link === "#") return false;
    const basePath = link.link.split("/").slice(0, 2).join("/");
    return pathname === link.link || pathname.startsWith(basePath + "/");
  };

  const recalculateNav = useCallback(() => {
    if (!navRef.current) return;

    const moreMenuWidth = moreMenuRef.current?.offsetWidth ?? 70;
    const navContainerWidth = navRef.current.offsetWidth;

    let newVisible = [...mainMenus];
    let newHidden: typeof mainMenus = [];
    let cumulativeWidth = 0;

    for (let i = 0; i < mainMenus.length; i++) {
      const menu = mainMenus[i];
      const itemWidth = itemWidths.current.get(menu.id) ?? 100;

      const gap = i > 0 ? itemGap : 0;

      cumulativeWidth += itemWidth + gap;

      const widthWithMoreMenu =
        cumulativeWidth + moreMenuWidth + itemGap + safetyBuffer;

      if (widthWithMoreMenu > navContainerWidth) {
        newVisible = mainMenus.slice(0, i);
        newHidden = mainMenus.slice(i);

        let finalVisibleWidth = 0;
        for (let j = 0; j < newVisible.length; j++) {
          finalVisibleWidth += itemWidths.current.get(newVisible[j].id) ?? 100;
          if (j > 0) finalVisibleWidth += itemGap;
        }

        if (
          finalVisibleWidth + moreMenuWidth + itemGap + safetyBuffer >
            navContainerWidth &&
          newVisible.length > 0
        ) {
          const itemToHide = newVisible.pop();
          if (itemToHide) {
            newHidden.unshift(itemToHide);
          }
        }

        break;
      }
    }

    setVisibleMenus(newVisible);
    setHiddenMenus(newHidden);
  }, [mainMenus]);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      recalculateNav();

      const observer = new ResizeObserver(() => {
        recalculateNav();
      });

      if (navRef.current) {
        observer.observe(navRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [recalculateNav, pathname]);

  // Xử lý "click ra ngoài"
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreMenuContainerRef.current &&
        !moreMenuContainerRef.current.contains(event.target as Node)
      ) {
        setIsMoreMenuOpen(false); // Đóng dropdown
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Chạy 1 lần

  const renderDesktopNav = () => (
    <nav
      ref={navRef}
      className="hidden md:flex flex-1 items-center justify-center gap-3 font-medium min-w-0"
    >
      {/* Div ẩn để đo lường width */}
      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none flex">
        {mainMenus.map((menu) => (
          <Link
            key={menu.id}
            href={menu.link ?? "#"}
            ref={(el) => {
              if (el) itemWidths.current.set(menu.id, el.offsetWidth);
            }}
            className={cn(
              // SỬA: Dùng text-sm (14px) làm cơ sở, lg:text-sub2 (18px) cho desktop
              "transition-all duration-200 px-2 py-1 rounded-full text-sm lg:text-sub2 text-black whitespace-nowrap",
              checkIsActive(menu, pathname)
                ? "bg-blue-100 text-primary shadow-sm"
                : ""
            )}
          >
            {menu.title}
          </Link>
        ))}
        {/* Đo cả nút "Thêm" */}
        <div
          ref={moreMenuRef}
          className="flex items-center gap-1 hover:text-primary"
        >
          {/* SỬA: Dùng text-sm (14px) làm cơ sở, lg:text-sub2 (18px) cho desktop */}
          <span className="text-sm lg:text-sub2 px-2 text-black">Thêm</span>
          <FiChevronDown className="text-base" />
        </div>
      </div>

      {/* Render các item "visible" */}
      {visibleMenus.map((menu) => (
        <Link
          key={menu.id}
          href={menu.link ?? "#"}
          className={cn(
            // SỬA: Dùng text-sm (14px) làm cơ sở, lg:text-sub2 (18px) cho desktop
            "transition-all duration-200 px-2 py-1 rounded-full text-sm lg:text-sub2 text-black whitespace-nowrap",
            checkIsActive(menu, pathname)
              ? "bg-blue-100 text-primary shadow-sm hover:bg-blue-100"
              : "hover:text-primary"
          )}
        >
          {menu.title}
        </Link>
      ))}

      {/* Render nút "Thêm" */}
      {hiddenMenus.length > 0 && (
        <div className="group relative" ref={moreMenuContainerRef}>
          <button
            className="flex items-center gap-1 hover:text-primary"
            onClick={() => setIsMoreMenuOpen((prev) => !prev)} // Toggle state
          >
            {/* SỬA: Dùng text-sm (14px) làm cơ sở, lg:text-sub2 (18px) cho desktop */}
            <span className="text-sm lg:text-sub2 px-2 text-black">Thêm</span>
            <FiChevronDown className="text-base" />
          </button>
          <div className="absolute left-0 right-0 h-2 top-full" />

          <div
            className={cn(
              "absolute left-0 top-full mt-2 z-10 w-48 flex-col rounded-lg bg-white p-2 shadow-lg",
              "group-hover:flex", // Giữ hover cho desktop
              isMoreMenuOpen ? "flex" : "hidden" // Thêm logic click/touch
            )}
          >
            {hiddenMenus.map((menu) => (
              <Link
                key={menu.id}
                href={menu.link ?? "#"}
                onClick={() => setIsMoreMenuOpen(false)}
                // Giữ text-sm (14px) cho các mục trong dropdown
                className="text-sm rounded-md px-4 py-2 text-black hover:bg-blue-50 hover:text-primary"
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
    // Menu mobile vẫn giữ 'text-sub2'
    <nav className="md:hidden bg-white">
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
          <Link
            href="/log-in"
            className="rounded-full border border-primary px-4 py-1 text-body2 font-bold text-primary hover:bg-blue-100 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-primary bg-primary px-4 py-1 text-body2 font-bold text-white hover:bg-primary/70 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 gap-3">
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

        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {ctaButtons?.map((button, index) => (
            <Button
              key={index}
              href={button.link || "#"}
              variant={index === 1 ? "primary" : "secondary"}
              size="ssm"
              className="text-body2 font-bold px-4 py-2 rounded-full whitespace-nowrap"
            >
              {button.title}
            </Button>
          ))}
        </div>

        <div className="md:hidden">
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
