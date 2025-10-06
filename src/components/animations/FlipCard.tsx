// // src/components/FlipCard.tsx
// "use client";

// import { useState } from "react";

// interface FlipCardProps {
//   frontTitle: string;
//   frontIcon?: React.ReactNode;
//   backContent: {
//     title: string;
//     points: string[];
//   };
// }

// export default function FlipCard({ frontTitle, frontIcon, backContent }: FlipCardProps) {
//   const [isFlipped, setIsFlipped] = useState(false);

//   return (
//     <div
//       className="group h-[320px] cursor-pointer [perspective:1000px]"
//       onClick={() => setIsFlipped(!isFlipped)}
//     >
//       <div
//         className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${
//           isFlipped ? "[transform:rotateY(180deg)]" : ""
//         }`}
//       >
//         {/* FRONT SIDE */}
//         <div className="absolute inset-0 h-full w-full rounded-xl bg-white p-8 shadow-md [backface-visibility:hidden]">
//           {frontIcon && (
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//               {frontIcon}
//             </div>
//           )}
//           <h3 className="text-h6 font-bold text-ink">{frontTitle}</h3>
//           <div className="mt-4 text-sub1 text-primary">
//             Click để xem chi tiết →
//           </div>
//         </div>

//         {/* BACK SIDE */}
//         <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-br from-primary to-primary/80 p-8 text-white shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
//           <h4 className="mb-4 text-h6 font-bold">{backContent.title}</h4>
//           <ul className="space-y-2 text-sub1">
//             {backContent.points.map((point, index) => (
//               <li key={index} className="flex items-start gap-2">
//                 <span className="mt-1 text-success">✓</span>
//                 <span>{point}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4 text-sub1 opacity-80">
//             Click để quay lại ←
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/FlipCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface FlipCardProps {
  frontTitle: string;
  backContent: {
    title: string;
    items: {
      label: string;
      description: string;
    }[];
  };
}

export default function FlipCard({ frontTitle, backContent }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group h-[420px] cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ==================== FRONT SIDE ==================== */}
        <div className="absolute inset-0 flex h-full w-full flex-col rounded-xl bg-white p-6 shadow-lg [backface-visibility:hidden]">
          {/* Front Title */}
          <h3 className="mb-6 text-center text-h6 font-bold text-ink">
            {frontTitle}
          </h3>
          <div>
            <Image
              src="/hero-dashboard.jpg"
              alt="Dashboard"
              width={700}
              height={500}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>

        {/* ==================== BACK SIDE ==================== */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-white p-4 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h4 className="mb-6 text-center text-h6 font-bold text-ink">
            {backContent.title}
          </h4>

          <div className="space-y-5">
            {backContent.items.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <h5 className="mb-2 text-body2 font-bold text-ink">
                  {item.label}
                </h5>
                <p className="text-body2 leading-relaxed text-text/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
