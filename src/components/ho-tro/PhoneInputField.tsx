
"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import vi from "react-phone-number-input/locale/vi.json";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlur?: () => void;
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  value,
  onChange,
  onBlur,
  error,
}) => {
  // === 1. Class cho Wrapper (Khung viền bên ngoài) ===
  // Chịu trách nhiệm: Viền, Bo góc, Màu nền, Focus state
  const wrapperClasses = `
    flex items-center w-full
    rounded-lg border-2
    bg-white
    py-2
    overflow-hidden
    transition-all duration-200
    ${
      error
        ? "border-red-500"
        : "border-gray-300 focus-within:border-blue-500" // Thường: Viền xám -> Xanh khi focus
    }
  `;

  // === 2. Class cho Ô Input (Bên trong) ===
  // Chịu trách nhiệm: Cỡ chữ, Padding, Reset style mặc định
  const inputClasses = `
    w-full 
    bg-transparent 
    border-none outline-none 
    h-auto pr-2       /* Padding 8px giống input thường */
    
    /* --- RESPONSIVE FONT SIZE --- */
    text-sm                /* Mobile */
    md:text-body2          /* Tablet */
    lg:text-sub2           /* Desktop */
    
    text-black
    placeholder-gray-400
  `;

  return (
    <div className="w-full">
      {/* Vùng chứa tạo viền giả */}
      <div className={wrapperClasses}>
        <PhoneInput
          // Cấu hình cơ bản
          international
          defaultCountry="VN"
          labels={vi} // Hiển thị tên nước tiếng Việt
          
          // Dữ liệu
          value={value}
          onChange={(val) => onChange(val || "")} // Xử lý null/undefined
          onBlur={onBlur}
          placeholder="Số điện thoại"
          
          // --- CUSTOM STYLE ---
          // Class cho container flex (Cờ + Input)
          className="flex items-center w-full pl-3" 
          
          // Truyền class vào thẻ <input> thật sự bên trong
          numberInputProps={{
            className: inputClasses, // Áp dụng style responsive ở trên
            required: true, 
          }}
        />
      </div>

      {/* Hiển thị lỗi */}
      {error && <div className="mt-1 text-sm text-red-600">{error}</div>}

      {/* --- CSS TÙY CHỈNH NHỎ ĐỂ GHI ĐÈ STYLE CỜ CỦA THƯ VIỆN --- */}
      <style jsx global>{`
        /* Xóa viền mặc định của thư viện khi focus */
        .PhoneInputInput:focus {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        /* Chỉnh lại lá cờ cho cân đối với padding mới */
        .PhoneInputCountry {
          margin-right: 0.5rem; 
        }
        /* Chỉnh mũi tên dropdown */
        .PhoneInputCountrySelectArrow {
          opacity: 0.5;
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default PhoneInputField;