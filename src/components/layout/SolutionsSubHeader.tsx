'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const subNavLinks = [
  { href: "/giai-phap/tong-quan", label: "Tổng quan" },
  { href: "/giai-phap/chuoi-nha-thuoc", label: 'Giải pháp chuỗi nhà thuốc' },
  { href: "/giai-phap/giai-phap-tich-hop-cho-phong-kham", label: "Giải pháp tích hợp cho phòng khám/mạch" },
];

export function SolutionsSubHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-[72px] z-30 bg-ink text-white shadow-md">
      <div className="container mx-auto flex items-center gap-8 px-4 py-4">
        <h2 className="text-lg font-semibold">Phần mềm quản lý nhà thuốc</h2>
        <nav className="flex items-center gap-6 text-sm">
          {subNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-white",
                  isActive ? "font-semibold text-white" : "text-white/70"
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
