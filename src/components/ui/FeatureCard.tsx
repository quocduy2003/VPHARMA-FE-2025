// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { FeatureCardProps } from "@/types";
// import { FiCheckCircle } from "react-icons/fi";

// export default function FeatureCard({
//   features,
//   direction = "right",
//   variant = "light",
// }: FeatureCardProps) {
//   const [hoveredIndex, setHoveredIndex] = useState<number>(0);
//   const isLeft = direction === "left";

//   const baseTitleColor = variant === "dark" ? "text-white" : "text-black";
//   const baseDescColor =
//     variant === "dark" ? "text-white" : "text-colordescription";

//   return (
//     <div className={`grid items-center lg:grid-cols-2`}>
//       <div
//         className={`${
//           isLeft ? "lg:order-2" : "lg:order-1"
//         } flex justify-center relative`}
//       >
//         <div className="relative w-full max-w-[720px] h-84 rounded-2xl overflow-hidden shadow-lg">
//           {features.map((item, index) => (
//             <Image
//               key={index}
//               src={item.image}
//               alt={item.title}
//               width={640}
//               height={420}
//               className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
//                   w-[85%] h-auto rounded-xl object-cover transition-opacity duration-500
//                   ${
//                     hoveredIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
//                   }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Cột mô tả */}
//       <div className={`${isLeft ? "lg:order-1" : "lg:order-2"} flex justify-center ml-5`}>
//         <ul className="space-y-7">
//           {features.map((item, index) => (
//             <li
//               key={index}
//               className={`flex gap-5 group cursor-pointer transition-all duration-300 ${
//                 hoveredIndex === index ? "opacity-100" : "opacity-80"
//               }`}
//               onMouseEnter={() => setHoveredIndex(index)}
//             >
//               <span
//                 className={`inline-flex h-9 w-9 flex-none items-center justify-center rounded-full
//                 bg-emerald-100 text-success ring-1 ring-inset ring-emerald-200
//                 transition-all duration-300
//                 ${
//                   hoveredIndex === index
//                     ? "bg-success text-white ring-emerald-500"
//                     : "group-hover:bg-success group-hover:text-white "
//                 }`}
//               >
//                 <FiCheckCircle className="h-6 w-6" strokeWidth={2} />
//               </span>
//               <div>
//                 <h3
//                   className={`font-bold mb-2 transition-colors duration-300 ${
//                     hoveredIndex === index
//                       ? "text-primary"
//                       : `${baseTitleColor} group-hover:text-primary`
//                   }`}
//                 >
//                   {item.title}
//                 </h3>
//                 <p
//                   className={`text-sub2 leading-6 max-w-lg transition-colors duration-300 ${
//                     hoveredIndex === index
//                       ? "text-primary"
//                       : `${baseDescColor} group-hover:text-primary`
//                   }`}
//                 >
//                   {item.description}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
// 1. Import thêm useEffect và useRef
import { useState, useEffect, useRef } from "react";
import { FeatureCardHomeProps } from "@/types";
import { FiCheckCircle } from "react-icons/fi";
import { RichTextRenderer } from "./RichTextRenderer";

export default function FeatureCard({
  features,
  direction = "right",
  variant = "light",
}: FeatureCardHomeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const isLeft = direction === "left";

  // 2. Thêm Refs để lưu trữ ID của các timers
  // intervalRef: Lưu timer tự động chuyển đổi 2 giây
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // resumeTimerRef: Lưu timer chờ 5 giây để bắt đầu lại
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const baseTitleColor = variant === "dark" ? "text-white" : "text-black";
  const baseDescColor =
    variant === "dark" ? "text-white" : "text-colordescription";

  // --- 3. Thêm các hàm logic điều khiển ---

  // Hàm DỪNG tất cả các timer (cả 2s và 5s)
  const stopAutoCycle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  // Hàm BẮT ĐẦU timer tự động chuyển 2 giây
  const startAutoCycle = () => {
    stopAutoCycle(); // Luôn xóa timer cũ trước khi bắt đầu
    intervalRef.current = setInterval(() => {
      // Tự động chuyển sang item tiếp theo
      setHoveredIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 2000); // 2 giây
  };

  // Hàm xử lý khi NGƯỜI DÙNG HOVER vào một item
  const handleUserHover = (index: number) => {
    stopAutoCycle(); // Dừng tự động
    setHoveredIndex(index); // Đặt index theo hover của người dùng
  };

  // Hàm xử lý khi NGƯỜI DÙNG RỜI CHUỘT khỏi danh sách
  const handleMouseLeaveList = () => {
    stopAutoCycle(); // Dừng mọi timer hiện tại
    // Bắt đầu đếm ngược 5s để chạy lại tự động
    resumeTimerRef.current = setTimeout(() => {
      startAutoCycle();
    }, 5000); // 5 giây
  };

  // 4. Thêm useEffect để quản lý vòng đời component
  useEffect(() => {
    // Bắt đầu tự động chạy khi component được tải
    startAutoCycle();

    // Dọn dẹp (cleanup): Dừng tất cả timer khi component bị hủy
    return () => {
      stopAutoCycle();
    };
  }, [features.length]); // Chạy lại nếu số lượng features thay đổi

  return (
    <div className={`grid items-center lg:grid-cols-2`}>
      {/* Cột hình ảnh (Không đổi) */}
      <div
        className={`${isLeft ? "lg:order-2" : "lg:order-1"
          } flex justify-center relative`}
      >
        <div className="relative w-full max-w-[720px] h-84 rounded-2xl overflow-hidden shadow-lg">
          {features.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt={item.title}
              width={640}
              height={420}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[85%] h-auto rounded-xl object-cover transition-opacity duration-500
                      ${hoveredIndex === index
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Cột mô tả */}
      <div
        className={`${isLeft ? "lg:order-1" : "lg:order-2"
          } flex justify-center ml-5`}
      >
        {/* 5. Thêm onMouseLeave vào thẻ <ul> */}
        <ul className="space-y-7" onMouseLeave={handleMouseLeaveList}>
          {features.map((item, index) => (
            <li
              key={index}
              className={`flex gap-5 group cursor-pointer transition-all duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-80"
                }`}
              // 6. Cập nhật onMouseEnter để gọi hàm handleUserHover
              onMouseEnter={() => handleUserHover(index)}
            >
              <span
                className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-full
                bg-emerald-100 text-success mr-1
                transition-all duration-300
                ${hoveredIndex === index
                    ? "bg-success text-white"
                    : "group-hover:bg-success group-hover:text-white "
                  }`}
              >
                <FiCheckCircle className="h-7 w-7" strokeWidth={2} />
              </span>
              <div>
                <h3
                  className={`font-bold mb-2 transition-colors duration-300 ${hoveredIndex === index
                      ? "text-primary"
                      : `${baseTitleColor} group-hover:text-primary`
                    }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sub2 leading-6 max-w-lg transition-colors duration-300 ${hoveredIndex === index
                      ? "text-primary"
                      : `${baseDescColor} group-hover:text-primary`
                    }`}
                >
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
