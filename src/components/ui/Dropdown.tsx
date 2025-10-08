// "use client";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import clsx from "clsx";

// type Item = {
//   label: string;
//   href?: string;
//   onClick?: () => void;
// };

// type Props = {
//   readonly label: string;
//   readonly items: ReadonlyArray<Item>;
//   readonly active?: boolean;
// };

// export default function Dropdown({ label, items, active }: Props) {
//   const [open, setOpen] = useState(false);
//   const btnRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
//     window.addEventListener("keydown", onEsc);
//     return () => window.removeEventListener("keydown", onEsc);
//   }, []);

//   return (
//     <div className="relative">
//       <button
//         ref={btnRef}
//         className={clsx(
//           "sub2 flex items-center gap-2 px-3 py-2 rounded-md border border-[color:var(--color-primary)]",
//           "text-[color:var(--color-primary)] bg-white hover:bg-[color:var(--color-gray)]",
//           active && "shadow-[inset_0_-2px_0_var(--color-primary)]"
//         )}
//         onClick={() => setOpen((o) => !o)}
//         aria-haspopup="menu"
//         aria-expanded={open}
//       >
//         {label}
//         <span>▾</span>
//       </button>

//       {open && (
//         <div
//           role="menu"
//           className="absolute mt-2 w-64 rounded-md bg-white border border-[color:var(--color-gray)] shadow-lg p-2"
//         >
//           {items.map((it) =>
//             it.href ? (
//               <Link
//                 key={it.label}
//                 href={it.href}
//                 className="dropdown-item text-[color:var(--color-primary)]"
//                 onClick={() => setOpen(false)}
//               >
//                 {it.label}
//               </Link>
//             ) : (
//               <button
//                 key={it.label}
//                 className="dropdown-item text-[color:var(--color-primary)]"
//                 onClick={() => {
//                   it.onClick?.();
//                   setOpen(false);
//                 }}
//               >
//                 {it.label}
//               </button>
//             )
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
