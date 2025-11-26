
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiPlus,       // Icon dấu cộng
  FiX,          // Icon đóng
  FiFileText,   // Icon bài viết/blog
  FiUser,       // Icon thông tin tk
  FiHelpCircle, // Icon hướng dẫn
  FiLogOut      // Icon đăng xuất
} from "react-icons/fi";

export default function AccountNavFab() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Danh sách các option
  const menuItems = [
    { 
      name: "Bài blog đã lưu", 
      href: "/account/saved-blogs", 
      icon: FiFileText,
      color: "bg-orange-500"
    },
    { 
      name: "Thông tin tài khoản", 
      href: "/account", 
      icon: FiUser,
      color: "bg-blue-500"
    },
    { 
      name: "Hướng dẫn sử dụng", 
      href: "/account/guide", 
      icon: FiHelpCircle,
      color: "bg-purple-500"
    },
  ];

  return (
    <div className="fixed bottom-10 left-10 z-50 flex flex-col-reverse items-start gap-4">
      
      {/* 1. Nút Chính (Trigger) - Style giống ScrollToTopButton */}
      <button
        onClick={toggleMenu}
        className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:bg-opacity-90 ${
          isOpen ? "bg-red-500 rotate-45" : "bg-blue-600" // Giả sử primary là blue-600
        }`}
        aria-label="Mở menu tài khoản"
      >
        {/* Dùng icon Plus, khi mở sẽ xoay 45 độ thành dấu X nhờ class rotate ở trên */}
        <FiPlus className="h-6 w-6" />
      </button>

      {/* 2. Các Option Menu (Hiện ra khi isOpen = true) */}
      <div className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {/* Nút Đăng xuất (Tách riêng để xử lý logic) */}
        <button
          onClick={() => console.log("Chức năng đăng xuất")}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-white shadow-md transition-transform hover:scale-110">
            <FiLogOut className="h-5 w-5" />
          </div>
          {/* Label (Hiện bên phải icon) */}
          <span className="rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            Đăng xuất
          </span>
        </button>

        {/* Các nút điều hướng trang */}
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)} // Đóng menu khi chọn
              className="group flex items-center gap-3"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-110 ${
                isActive ? "ring-2 ring-offset-2 ring-blue-600" : ""
              } ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              
              {/* Label mô tả */}
              <span className="whitespace-nowrap rounded bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}