// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FiCheck } from "react-icons/fi";
// import {
//   plans,
//   featureCategories,
//   type Feature,
//   type FeatureCategory,
//   FeatureValue,
// } from "@/data/pricing-data";

// const renderFeatureValue = (value: FeatureValue) => {
//   // Case 1: boolean (true) -> Dấu check
//   if (value === true) {
//     return <FiCheck className="mx-auto text-xl text-green-500" />;
//   }

//   // Case 2: boolean (false) hoặc null -> Dấu gạch
//   if (value === false || value === null) {
//     return <span className="text-gray-400">-</span>;
//   }

//   // Case 3: "coming_soon"
//   if (value === "coming_soon") {
//     return (
//       <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
//         Coming soon
//       </span>
//     );
//   }

//   // Case 4: "unlimited"
//   if (value === "unlimited") {
//     return "Unlimited";
//   }

//   // Case 5: Mặc định (string hoặc number)
//   return value;
// };

// import FaqSection, { type Faq } from "@/components/Faq";
// const hoTroFaqData: Faq[] = [
//   {
//     question: "Phần mềm V-Pharma có dễ sử dụng không?",
//     answer:
//       "Tuyệt đối! V-Pharma được thiết kế với giao diện thân thiện, trực quan, phù hợp với cả những người không rành về công nghệ. Đội ngũ của chúng tôi sẽ đào tạo 1-1 cho đến khi bạn và nhân viên thành thạo.",
//   },
//   {
//     question: "Chi phí sử dụng phần mềm là bao nhiêu?",
//     answer:
//       "Chi phí rất hợp lý và linh hoạt theo quy mô của nhà thuốc. Vui lòng liên hệ để nhận báo giá chi tiết.",
//   },
//   {
//     question: "Tôi có cần cài đặt phần mềm phức tạp không?",
//     answer:
//       "Không, V-Pharma là giải pháp dựa trên nền tảng web, bạn có thể truy cập từ bất kỳ đâu mà không cần cài đặt phức tạp.",
//   },
//   {
//     question: "Dữ liệu của tôi có được bảo mật không?",
//     answer:
//       "An toàn dữ liệu là ưu tiên hàng đầu của chúng tôi. Hệ thống sử dụng các biện pháp bảo mật tiên tiến và sao lưu dữ liệu thường xuyên.",
//   },
// ];

// import CTASection from "@/components/CTA";
// import type { CTASection as CTASectionType } from "@/types";
// import React from "react";
// const finalCtaData: CTASectionType = {
//   title: "Sẵn Sàng Số Hóa Nhà Thuốc Của Bạn?",
//   description:
//     "Trải nghiệm đầy đủ các tính năng ưu việt của V-Pharma hoàn toàn miễn phí trong 15 ngày. Không cần thẻ tín dụng.",
//   ctaButton: {
//     title: "Trải nghiệm miễn phí",
//     link: "/dang-ky-dung-thu", // Thêm trường link theo type CtaButton
//   },
// };

// export default function PricePage() {
//   return (
//     <div>
//       {/** Dashboard */}
//       <section className="bg-gradient-to-b from-blue-50 to-white py-20 text-center">
//         <div className="container mx-auto px-4 lg:px-80">
//           <h1 className="text-h1 font-bold text-ink">Bảng giá v-pharma</h1>
//           <p className="mx-auto mt-4 max-w-2xl text-h6">
//             Giải pháp toàn diện cho quản lý nhà thuốc, từ tồn kho đến bán hàng,
//             với công nghệ hiện đại và dễ sử dụng.
//           </p>
//         </div>
//       </section>

//       {/* === PHẦN BẢNG GIÁ ĐÃ CẬP NHẬT === */}
//       {/* 2. CẬP NHẬT: Thêm container và bỏ border/shadow */}
//       <div className="container mx-auto max-w-7xl px-4">
//         <div className="overflow-x-auto">
//           {/*
//             min-w-[1200px] để đảm bảo bảng không bị vỡ trên mobile
//             và cho phép cuộn ngang (overflow-x-auto)
//           */}
//           <div className="min-w-[1200px]">
//             {/* === HÀNG TIÊU ĐỀ (PLANS) === */}
//             {/* 3. CẬP NHẬT: bg-white, border-b */}
//             <div className="grid grid-cols-5 bg-white border-b border-gray-200">
//               {/* Cột tiêu đề bên trái */}
//               {/* 3. CẬP NHẬT: bg-white, align-top và thêm Button */}
//               <div className="sticky left-0 bg-white p-6 align-top">
//                 <h2 className="text-xl font-bold text-ink">
//                   Thông Tin Về Các Gói V-Pharma
//                 </h2>
//                 <button className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
//                   Đăng ký dùng thử
//                 </button>
//               </div>

//               {/* Các cột Gói (Plan) */}
//               {plans.map((plan) => (
//                 // 3. CẬP NHẬT: Bỏ border-l
//                 <div key={plan.id} className="p-6 text-center" >
//                   {/* 3. CẬP NHẬT: text-ink (màu đen) */}
//                   <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
//                   <div className="mt-4">
//                     {/* 3. CẬP NHẬT: text-primary (màu xanh) */}
//                     <h2 className="text-sub2 font-semibold text-primary">
//                       {plan.price}
//                       <span className="text-sub2 text-gray-500">
//                         {" "}
//                         {plan.billingCycle}
//                       </span>
//                     </h2>
//                   </div>
//                   {/* 3. CẬP NHẬT: Bỏ mt-2, đổi màu text-gray-500 */}
//                   <div className="text-xs text-gray-500 ">
//                     <p >{plan.trialNote}</p>
//                     <p >{plan.audienceNote}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {/* === KẾT THÚC HÀNG TIÊU ĐỀ === */}

//             {/* === CÁC HÀNG TÍNH NĂNG (FEATURES) === */}
//             {featureCategories.map((category) => (
//               <React.Fragment key={category.title}>
//                 {/* === Hàng Tiêu đề Cấp 1 === */}
//                 {/* 4. CẬP NHẬT: bg-white */}
//                 <div className="grid grid-cols-5 border-t border-gray-200 bg-white">
//                   {/* 4. CẬP NHẬT: bg-white, p-4, text-base, bỏ uppercase */}
//                   <div className="sticky left-0 col-span-5 bg-white p-4">
//                     <h4 className="text-base font-bold text-ink">
//                       {category.title}
//                     </h4>
//                   </div>
//                 </div>

//                 {/* === Hàng Tính năng Cấp 2 === */}
//                 {category.features.map((feature) => (
//                   <div
//                     key={feature.id}
//                     className="grid grid-cols-5 border-t border-gray-200"
//                   >
//                     {/* Tên tính năng (cột 1) */}
//                     {/* 5. CẬP NHẬT: text-gray-500 */}
//                     <div className="sticky left-0 bg-white p-4 text-sm text-gray-500">
//                       {feature.name}
//                     </div>

//                     {/* Giá trị tính năng (cột 2-5) */}
//                     {plans.map((plan) => (
//                       <div
//                         key={`${plan.id}-${feature.id}`}
//                         // 5. CẬP NHẬT: Bỏ border-l
//                         className="p-4 text-center text-sm text-ink"
//                       >
//                         {renderFeatureValue(feature.values[plan.id])}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </React.Fragment>
//             ))}
//             {/* === KẾT THÚC CÁC HÀNG TÍNH NĂNG === */}
//           </div>
//         </div>
//       </div>
//       {/* === KẾT THÚC PHẦN BẢNG GIÁ === */}
//       {/* FAQ Section */}
//       <FaqSection title="Câu Hỏi Thường Gặp" items={hoTroFaqData} />

//       {/* Final CTA Section */}
//       <CTASection ctaSection={finalCtaData} />
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import {
  plans,
  featureCategories,
  type Feature,
  type FeatureCategory,
  type FeatureValue, // Đảm bảo đã export type FeatureValue từ data file
} from "@/data/pricing-data";

// 1. CẬP NHẬT: "Coming soon" thành text thường (giống ảnh mới)
const renderFeatureValue = (value: FeatureValue) => {
  // Case 1: boolean (true) -> Dấu check
  if (value === true) {
    return <FiCheck className="mx-auto text-xl text-green-500" />;
  }

  // Case 2: boolean (false) hoặc null -> Dấu gạch
  if (value === false || value === null) {
    return <span className="text-gray-400">-</span>;
  }

  // Case 3: "coming_soon" -> Đổi thành text thường
  if (value === "coming_soon") {
    return "Coming soon";
  }

  // Case 4: "unlimited"
  if (value === "unlimited") {
    return "Unlimited";
  }

  // Case 5: Mặc định (string hoặc number)
  return value;
};

import FaqSection, { type Faq } from "@/components/Faq";
const hoTroFaqData: Faq[] = [
  // ... (dữ liệu FAQ của bạn)
  {
    question: "Phần mềm V-Pharma có dễ sử dụng không?",
    answer:
      "Tuyệt đối! V-Pharma được thiết kế với giao diện thân thiện, trực quan, phù hợp với cả những người không rành về công nghệ. Đội ngũ của chúng tôi sẽ đào tạo 1-1 cho đến khi bạn và nhân viên thành thạo.",
  },
  {
    question: "Chi phí sử dụng phần mềm là bao nhiêu?",
    answer:
      "Chi phí rất hợp lý và linh hoạt theo quy mô của nhà thuốc. Vui lòng liên hệ để nhận báo giá chi tiết.",
  },
  {
    question: "Tôi có cần cài đặt phần mềm phức tạp không?",
    answer:
      "Không, V-Pharma là giải pháp dựa trên nền tảng web, bạn có thể truy cập từ bất kỳ đâu mà không cần cài đặt phức tạp.",
  },
  {
    question: "Dữ liệu của tôi có được bảo mật không?",
    answer:
      "An toàn dữ liệu là ưu tiên hàng đầu của chúng tôi. Hệ thống sử dụng các biện pháp bảo mật tiên tiến và sao lưu dữ liệu thường xuyên.",
  },
];

import CTASection from "@/components/CTA";
import type { CTASection as CTASectionType } from "@/types";
import React from "react";
const finalCtaData: CTASectionType = {
  title: "Sẵn Sàng Số Hóa Nhà Thuốc Của Bạn?",
  description:
    "Trải nghiệm đầy đủ các tính năng ưu việt của V-Pharma hoàn toàn miễn phí trong 15 ngày. Không cần thẻ tín dụng.",
  ctaButton: {
    title: "Trải nghiệm miễn phí",
    link: "/dang-ky-dung-thu",
  },
};

export default function PricePage() {
  // Hằng số để đảm bảo chiều cao các hàng đồng bộ
  const HEADER_ROW_HEIGHT = "h-[202px]";
  const CATEGORY_ROW_HEIGHT = "h-[57px]";
  const FEATURE_ROW_HEIGHT = "h-[57px]";

  return (
    <div>
      {/** Dashboard */}
      <section className="bg-blue-100 py-20 text-center">
        <div className="container mx-auto px-4 lg:px-80">
          <h1 className="text-h1 font-bold text-ink">Bảng giá V-Pharma</h1>
          <p className="mx-auto mt-4 max-w-2xl text-h6">
            Giải pháp toàn diện cho quản lý nhà thuốc, từ tồn kho đến bán hàng,
            với công nghệ hiện đại và dễ sử dụng.
          </p>
        </div>
      </section>

      {/* === PHẦN BẢNG GIÁ ĐÃ CẬP NHẬT === */}
      {/* 2. CẬP NHẬT: Thêm nền xám (bg-gray-50) để làm nổi bật card trắng */}
      <section className="bg-gradient-to-b from-blue-100 to-white text-center ">
        <div className="container mx-auto max-w-7xl ">
        <div className="overflow-x-auto">
          {/* 3. CẬP NHẬT: grid-cols-5 và thêm gap-x-4 (khoảng cách) */}
          <div className="min-w-[1200px] grid grid-cols-5 gap-x-4">
            
            {/* === CỘT TÍNH NĂNG (CỘT 1) === */}
            <div className="sticky left-0">
              {/* Header trái */}
              <div className={`${HEADER_ROW_HEIGHT} pt-6`}>
                <h2 className="text-xl font-bold text-ink">
                  Thông Tin Về Các Gói 
                  <br />
                  <span className="text-primaty">V-Pharma</span>
                </h2>
                <button className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                  Đăng ký dùng thử
                </button>
              </div>

              {/* Lặp qua các category và feature titles */}
              {featureCategories.map((category) => (
                <div key={category.title}>
                  {/* Tiêu đề Cấp 1 */}
                  <div
                    className={`${CATEGORY_ROW_HEIGHT} p-4 flex items-center border-t border-gray-200`}
                  >
                    <h4 className="text-base font-bold text-ink">
                      {category.title}
                    </h4>
                  </div>
                  {/* Tiêu đề Cấp 2 */}
                  {category.features.map((feature) => (
                    <div
                      key={feature.id}
                      className={`${FEATURE_ROW_HEIGHT} p-4 flex items-center border-t border-gray-200`}
                    >
                      <div className="text-sm text-gray-500">
                        {feature.name}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* === 4 CARDS GÓI (CỘT 2-5) === */}
            {/* 4. CẬP NHẬT: Lặp qua 4 plans, mỗi plan là 1 card hoàn chỉnh */}
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="w-full rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* Header của Card */}
                <div
                  className={`${HEADER_ROW_HEIGHT} p-6 text-center`}
                >
                  <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
                  {/* CẬP NHẬT: h-[96px] và text-3xl (giống ảnh) */}
                  <div className="">
                    <h2 className="text-sub2 font-bold text-primary">
                      {plan.price}
                      <span className="text-sm colordescription text-gray-500">
                        {" "}
                        {plan.billingCycle}
                      </span>
                    </h2>
                  </div>
                  <div className="text-xs text-gray-500 h-[30px]">
                    <p>{plan.trialNote}</p>
                    <p>{plan.audienceNote}</p>
                  </div>
                </div>

                {/* Body của Card (Lặp qua features) */}
                {featureCategories.map((category) => (
                  <div key={category.title}>
                    {/* Ô trống cho Category title */}
                    <div
                      className={`${CATEGORY_ROW_HEIGHT} p-4 border-t border-gray-200`}
                    >
                      &nbsp;
                    </div>
                    {/* Lặp qua các feature values */}
                    {category.features.map((feature) => (
                      <div
                        key={feature.id}
                        className={`${FEATURE_ROW_HEIGHT} p-4 text-center text-sm text-ink border-t border-gray-200`}
                      >
                        {renderFeatureValue(feature.values[plan.id])}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* FAQ Section */}
      <FaqSection title="Câu Hỏi Thường Gặp" items={hoTroFaqData} />

      {/* Final CTA Section */}
      <CTASection ctaSection={finalCtaData} />
    </div>
  );
}