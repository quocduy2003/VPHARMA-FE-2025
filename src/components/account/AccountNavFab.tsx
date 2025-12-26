"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiPlus,
  FiFileText,
  FiUser,
  FiHelpCircle,
  FiLogOut
} from "react-icons/fi";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AccountNavFab() {
  const { signOut } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsOpen(false);
      router.replace("/signin");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  const menuItems = [
    {
      name: "Bài blog đã lưu",
      href: "/saved-blog",
      icon: FiFileText,
      color: "bg-orange-500",
    },
    {
      name: "Thông tin tài khoản",
      href: "/account/thong-tin-tai-khoan",
      icon: FiUser,
      color: "bg-blue-500",
    },
    {
      name: "Hướng dẫn sử dụng",
      href: "/account/guide",
      icon: FiHelpCircle,
      color: "bg-purple-500",
    },
  ];

  return (
    // [SỬA 1]: Bỏ 'flex flex-col-reverse gap-4'. 
    // Container này giờ chỉ to bằng đúng nội dung hiển thị (là nút button).
    <div className="fixed bottom-10 left-10 z-50">

      {/* [SỬA 2]: Menu Option chuyển sang 'absolute'.
          - bottom-full: Đẩy menu lên trên đỉnh của container.
          - mb-4: Tạo khoảng cách với nút chính (thay cho gap-4 cũ).
      */}
      <div
        className={`absolute bottom-full left-0 mb-4 flex flex-col gap-3 transition-all duration-300 origin-bottom ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-10 pointer-events-none" // scale-0 để thu nhỏ hoàn toàn
        }`}
      >
        {/* Nút Đăng xuất */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-white shadow-md transition-transform hover:scale-110">
            <FiLogOut className="h-5 w-5" />
          </div>
          <span className="whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            Đăng xuất
          </span>
        </button>

        {/* Các nút điều hướng */}
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-110 ${
                  isActive ? "ring-2 ring-offset-2 ring-blue-600" : ""
                } ${item.color}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <span className="whitespace-nowrap rounded bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 3. Nút Chính (Trigger) - Giữ nguyên vị trí */}
      <button
        onClick={toggleMenu}
        className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:bg-opacity-90 ${
          isOpen ? "bg-red-500 rotate-45" : "bg-blue-600"
        }`}
        aria-label="Mở menu tài khoản"
      >
        <FiPlus className="h-6 w-6" />
      </button>
    </div>
  );
}