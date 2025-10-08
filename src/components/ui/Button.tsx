// "use client";
// import clsx from "clsx";

// type Props = {
//   readonly children: React.ReactNode;
//   readonly variant?: "primary" | "outline";
//   readonly disabled?: boolean;
//   readonly onClick?: () => void;
//   readonly iconLeft?: React.ReactNode;
// };

// export default function Button({
//   children,
//   variant = "primary",
//   disabled,
//   onClick,
//   iconLeft,
// }: Props) {
//   return (
//     <button
//       type="button"
//       disabled={disabled}
//       onClick={onClick}
//       className={clsx(
//         "btn sub2",
//         variant === "primary" && "btn-primary",
//         variant === "outline" && "btn-outline",
//         disabled && "btn-disabled"
//       )}
//       aria-disabled={disabled}
//     >
//       {iconLeft && <span className="mr-2">{iconLeft}</span>}
//       {children}
//     </button>
//   );
// }
