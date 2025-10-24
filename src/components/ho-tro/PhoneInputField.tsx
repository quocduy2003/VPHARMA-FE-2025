// src/components/PhoneInputField.tsx (hoặc đường dẫn của bạn)

"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Bắt buộc import CSS cơ bản

// Interface giữ nguyên, không cần đổi
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
  // === ĐỊNH NGHĨA CLASS MỚI ===

  // 1. Class cho ô input: Bỏ border, bỏ rounded-l
  const inputClasses = `
    !w-full !h-auto !min-h-[50px]
    !px-4 !py-3 !pl-14
    !text-base !placeholder-gray-400 !text-sub2
    !border-0 !outline-none
    !rounded-r-lg
    !bg-white
  `;

  // 2. Class cho nút bấm (lá cờ): Bỏ border, bỏ rounded-r
  const buttonClasses = `
    !border-0 !outline-none
    !rounded-l-lg
    !bg-white
  `;

  // 3. Class cho DIV BỌC BÊN NGOÀI (CHÌA KHÓA)
  // Div này sẽ chứa border và hiệu ứng focus-within
  const containerWrapperClasses = `
    flex items-center
    rounded-lg border-2
    transition-all
    ${
      error
        ? "border-red-500" // Style khi có lỗi
        : "border-gray-300" // Style mặc định
    }
    focus-within:border-blue-500 // Style khi active (focus)
  `;

  return (
    <div>
      {/* Bọc PhoneInput trong div wrapper */}
      <div className={containerWrapperClasses}>
        <PhoneInput
          country={"vn"} // Đặt quốc gia mặc định là Việt Nam
          value={value}
          onChange={onChange}
          onBlur={onBlur} // Gán onBlur
          placeholder="Số điện thoại"
          
          // Class cho container GỐC của thư viện:
          // Cho nó full-width và đảm bảo nó không tạo border/shadow
          containerClass="w-full"
          
          // Gán class cho input và button
          inputClass={inputClasses}
          buttonClass={buttonClasses}
          
          // Class cho dropdown menu
          dropdownClass="!rounded-lg !border-gray-300"
          
          inputProps={{
            name: "phone",
            required: true,
          }}
        />
      </div>
      
      {/* Phần hiển thị lỗi nằm bên ngoài div wrapper */}
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default PhoneInputField;