"use client";

import {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { headerData } from "@/lib/api/header";
import { Button } from "./ui/CTAButton";
import { useAuthStore } from "@/stores/useAuthStore";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");
const itemGap = 12;
const safetyBuffer = 1;

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const { menus, ctaButtons } = headerData || {};
  const { user } = useAuthStore();

  const mainMenus = useMemo(
    () => menus?.filter((m) => m.level === 1 && m.parent === null) ?? [],
    [menus]
  );

  const [visibleMenus, setVisibleMenus] = useState(mainMenus);
  const [hiddenMenus, setHiddenMenus] = useState<typeof mainMenus>([]);
  const navRef = useRef<HTMLElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const itemWidths = useRef<Map<number, number>>(new Map());
  const moreMenuContainerRef = useRef<HTMLDivElement>(null);

  // --- Logic tính toán resize menu (Desktop) - Giữ nguyên ---
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
          if (itemToHide) newHidden.unshift(itemToHide);
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
      const observer = new ResizeObserver(() => recalculateNav());
      if (navRef.current) observer.observe(navRef.current);
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [recalculateNav, pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreMenuContainerRef.current &&
        !moreMenuContainerRef.current.contains(event.target as Node)
      ) {
        setIsMoreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // --- Render Menu Desktop ---
  const renderDesktopNav = () => (
    <nav
      ref={navRef}
      className="hidden lg:flex flex-1 items-center justify-center gap-3 font-medium min-w-0"
    >
      {/* Hidden measure items */}
      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none flex">
        {mainMenus.map((menu) => (
          <Link
            key={menu.id}
            href={menu.link ?? "#"}
            ref={(el) => {
              if (el) itemWidths.current.set(menu.id, el.offsetWidth);
            }}
            className="px-2 py-1"
          >
            {menu.title}
          </Link>
        ))}
        <div ref={moreMenuRef} className="flex px-2">
          <span>Thêm</span>
        </div>
      </div>

      {visibleMenus.map((menu) => (
        <Link
          key={menu.id}
          href={menu.link ?? "#"}
          className={cn(
            "transition-all duration-200 px-3 py-1.5 rounded-full text-sub2 whitespace-nowrap",
            checkIsActive(menu, pathname)
              ? "bg-blue-100 text-primary font-bold shadow-sm"
              : "text-black hover:text-primary hover:bg-gray-50"
          )}
        >
          {menu.title}
        </Link>
      ))}

      {hiddenMenus.length > 0 && (
        <div className="group relative" ref={moreMenuContainerRef}>
          <button
            className="flex items-center gap-1 hover:text-primary py-1"
            onClick={() => setIsMoreMenuOpen((prev) => !prev)}
          >
            <span className="text-sub2 px-2 text-black font-medium">Thêm</span>
            <FiChevronDown className="text-base" />
          </button>
          <div className="absolute left-0 right-0 h-2 top-full" />
          <div
            className={cn(
              "absolute right-0 top-full mt-2 z-50 w-56 flex-col rounded-xl bg-white p-2 shadow-xl border border-gray-100",
              "group-hover:flex",
              isMoreMenuOpen ? "flex" : "hidden"
            )}
          >
            {hiddenMenus.map((menu) => (
              <Link
                key={menu.id}
                href={menu.link ?? "#"}
                onClick={() => setIsMoreMenuOpen(false)}
                className="text-body2 rounded-lg px-4 py-3 text-black hover:bg-blue-50 hover:text-primary transition-colors"
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  // --- Render Menu Mobile (Luôn render, dùng CSS để ẩn/hiện) ---
  const renderMobileNav = () => {
    return (
      <div
        // 1. Container chính: Luôn hiện diện (để giữ transition), dùng pointer-events để tắt tương tác khi đóng
        className={cn(
          "lg:hidden fixed inset-0 z-[9999] flex justify-end transition-all duration-300",
          isMobileMenuOpen ? "visible" : "invisible delay-300" // delay invisible để chờ animation chạy xong
        )}
      >
        {/* 2. Backdrop (Nền đen): Fade in/out */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* 3. Sidebar: Slide in/out (Translate X) */}
        <div
          className={cn(
            "relative z-10 w-[85%] max-w-[360px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src={headerData?.logo?.url || "/Vpharma-AMIT.png"}
                alt={headerData?.logo?.alt || "Logo VPharma"}
                className="h-8 w-auto"
                width={150}
                height={100}
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-danger"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Danh sách Menu */}
          <div className="flex-1 overflow-y-auto py-2 custom-scrollbar bg-white">
            <div className="flex flex-col">
              {menus.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.link ?? "#"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block w-full px-5 py-4 text-sub2 font-medium border-b border-gray-50 transition-colors",
                    checkIsActive(menu, pathname)
                      ? "text-primary bg-blue-50/50"
                      : "text-colordescription hover:bg-gray-50 hover:text-primary"
                  )}
                >
                  {menu.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Sidebar (CTA) */}
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-col gap-3">
              <Link
                href="/log-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full rounded-full border border-gray-300 bg-white py-3 text-body2 font-bold text-gray-700 hover:border-primary hover:text-primary transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full rounded-full bg-primary py-3 text-body2 font-bold text-white shadow-md hover:bg-primary/90 transition-all"
              >
                Đăng ký dùng thử
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm h-[70px] flex items-center">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src={headerData?.logo?.url || "/Vpharma-AMIT.png"}
            alt={headerData?.logo?.alt || "Logo VPharma"}
            className="h-10 w-auto object-contain"
            width={200}
            height={150}
          />
        </Link>

        {renderDesktopNav()}

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {user ? (
            /* ===== ĐÃ ĐĂNG NHẬP ===== */
            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-2 rounded-full transition"
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-primary">
                {user.displayName?.charAt(0).toUpperCase()}
              </div>
              <span className="text-body2 font-semibold text-black">
                {user.displayName}
              </span>
            </Link>
          ) : (
            <>
              {ctaButtons?.map((button, index) => (
                <Button
                  key={index}
                  href={button.link || "#"}
                  variant={index === 1 ? "primary" : "secondary"}
                  size="ssm"
                  className="text-body2 font-bold px-6 py-2.5 rounded-full whitespace-nowrap min-w-[120px]"
                >
                  {button.title}
                </Button>
              ))}
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-primary hover:bg-blue-50 rounded-full transition-colors"
          >
            <FiMenu className="text-3xl" />
          </button>
        </div>
      </div>

      {/* SỬA: Luôn gọi hàm render, không dùng điều kiện {isMobileMenuOpen && ...} */}
      {renderMobileNav()}
    </header>
  );
}