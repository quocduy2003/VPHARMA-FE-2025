// File: components/ui/Button.tsx

import React from 'react';
import { ButtonHTMLAttributes,  } from 'react';
import Link from 'next/link';

// Định nghĩa các kiểu dáng (variant) có sẵn
const buttonVariants = {
  primary: 'bg-primary text-white hover:opacity-90',
  secondary: 'border border-primary bg-white text-primary hover:bg-primary/10',
  ghost: 'text-primary hover:bg-primary/10',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

// Định nghĩa các kích thước có sẵn
const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 font-semibold',
  lg: 'px-8 py-4 text-lg',
};

// Định nghĩa kiểu cho props của component Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants; // 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: keyof typeof buttonSizes; // 'sm' | 'md' | 'lg'
  className?: string; // Cho phép ghi đè class từ bên ngoài
}
/**
 * Component Button tái sử dụng.
 * @param variant Kiểu dáng của nút ('primary', 'secondary', 'ghost', 'danger').
 * @param size Kích thước của nút ('sm', 'md', 'lg').
 * @param children Nội dung bên trong nút.
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {

  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];

  const finalClassName = `
    inline-flex items-center justify-center rounded-full transition-colors
    ${variantClasses}
    ${sizeClasses}
    ${className || ''} // Cho phép ghi đè class từ bên ngoài
  `.trim();

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};
