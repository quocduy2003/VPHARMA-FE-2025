"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi"; // Dùng icon giống dự án của bạn

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Logic: Hiện/ẩn nút
  useEffect(() => {
    // Hàm này sẽ kiểm tra vị trí cuộn
    const toggleVisibility = () => {
      // Nếu cuộn xuống quá 300px thì hiện nút
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Thêm listener khi cuộn
    window.addEventListener("scroll", toggleVisibility);

    // Dọn dẹp listener khi component bị hủy
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // 2. Logic: Cuộn lên đầu
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  };

  // Don't render anything until mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          // Style bằng Tailwind
          className="fixed bottom-10 right-10 z-50 flex h-12 w-12 
                     items-center justify-center rounded-full 
                     bg-primary text-white shadow-lg 
                     transition-opacity duration-300 hover:bg-primary/90"
          aria-label="Cuộn lên đầu trang"
        >
          <FiArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
}