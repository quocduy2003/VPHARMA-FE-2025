

import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <PhoneInput
        defaultCountry="vn"
        value={value}
        onChange={onChange}
        inputClassName={`w-full px-4 py-3 rounded-lg border-2 text-base placeholder-gray-400 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        } outline-none transition-all`}
        placeholder="Nhập số điện thoại"
      />
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default PhoneInputField;
