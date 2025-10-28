"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const subNavLinks = [
  { href: "/giai-phap/tong-quan", label: "Tổng quan" },
  { href: "/giai-phap/chuoi-nha-thuoc", label: "Giải pháp chuỗi nhà thuốc" },
  {
    href: "/giai-phap/phong-kham-co-nha-thuoc",
    label: "Giải pháp tích hợp cho phòng khám/mạch",
  },
];

export function SolutionsSubHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-[72px] z-30 bg-ink">
      <div className="container mx-auto flex items-center py-3">
        <div className="flex items-center">
          <p className="text-sub2 text-white font-bold">
            Phần mềm quản lý nhà thuốc
          </p>
          {/* Divider dọc */}
          <span className="rounded-2xl mx-3 h-8 w-1 bg-white" />
        </div>
        <nav className="flex mx-3 items-center gap-6 font-bold text-sub2 flex-1">
          {subNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors mx-4 ",
                  isActive ? "text-primary" : "text-white hover:text-blue-500"
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
