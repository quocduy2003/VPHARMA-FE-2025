"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const subNavLinks = [
  { href: "/giai-phap/tong-quan", label: "Tổng quan" },
  { href: "/giai-phap/chuoi-nha-thuoc", label: "Giải pháp chuỗi nhà thuốc" },
  {
    href: "/giai-phap/giai-phap-tich-hop-cho-phong-kham",
    label: "Giải pháp tích hợp cho phòng khám/mạch",
  },
];

export function SolutionsSubHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-[72px] z-30 bg-ink text-white shadow-md">
      <div className="container mx-auto flex items-center  px-4 py-4">
        <div className="flex items-center">
          <p className="text-h6 text-white font-semibold">
            Phần mềm quản lý nhà thuốc
          </p>
          {/* Divider dọc */}
          <span className="rounded-2xl mx-4 h-9 w-1 bg-white" />
        </div>
        <nav className="flex items-center gap-6 text-sub2 flex-1">
          {subNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-white",
                  isActive ? "font-bold text-white" : "text-white/70"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
