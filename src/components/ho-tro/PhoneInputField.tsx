"use client";

import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// 1. Thêm onBlur vào interface
interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlur?: () => void; // Thêm prop onBlur
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  value,
  onChange,
  error,
  onBlur, // 2. Nhận prop onBlur
}) => {
  return (
    <div>
      <PhoneInput
        defaultCountry="vn"
        value={value}
        onChange={onChange}
        onBlur={onBlur} // 3. Gán onBlur vào component
        className="text-sub2"
        
        // 4. Style trực tiếp ô input 
        inputClassName={`w-full px-4 py-3 rounded-lg border-2 text-sub2 placeholder-gray-400 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        } outline-none transition-all`}
        
        placeholder="Số điện thoại"
      />
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default PhoneInputField;