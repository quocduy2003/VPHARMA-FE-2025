// File: components/ui/Button.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

// ----- Các kiểu dáng (variant) -----
const buttonVariants = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "border border-primary bg-white text-primary hover:bg-primary/10",
  ghost: "text-primary hover:bg-primary/10",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

// ----- Các kích thước -----
const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 font-semibold",
  lg: "px-8 py-4 text-lg",
};

// ----- Props cho Button -----
interface BaseButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  children: React.ReactNode;
}

// Nếu có href ⇒ render Link
type LinkButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

// Nếu không có href ⇒ render button
type RegularButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

// Union type cho cả hai trường hợp
type ButtonProps = LinkButtonProps | RegularButtonProps;

/**
 * Component Button tái sử dụng:
 * - Nếu có prop `href` → render <Link>
 * - Nếu không có `href` → render <button>
 */
export const Button = ({
  variant = "primary",
  size = "md",
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
    ${className || ""}
  `.trim();

  // Nếu có href ⇒ Link
  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={finalClassName}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  // Nếu không có href ⇒ Button
  return (
    <button
      className={finalClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
