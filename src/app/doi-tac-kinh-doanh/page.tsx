// "use client";

// export default function BusinessActivities() {
//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-4">
//       <h1 className="text-center text-3xl font-bold text-gray-800">
//         Giao diện đang được phát triển
//       </h1>
//       <p className="mt-4 text-center text-lg text-gray-600">
//         Phiên bản chính thức sẽ có trong thời gian tới.
//       </p>
//     </div>
//   );
// }
"use client";

import React from "react";
import CTASection from "@/components/CTA";
import type { CTASection as CTASectionType } from "@/types";

const staticCtaData: CTASectionType = {
  title: "Hãy Trở Thành Đối Tác Kinh Doanh Của V-Pharma",
  description:
    "Cùng chúng tôi mở rộng mạng lưới phân phối và mang các giải pháp về dược phẩm thông minh đến hàng triệu khách hàng",
  ctaButton: {
    title: "Đăng Ký Trở Thành Đối Tác",
    link: "/dang-ky", 
  },
};
const IconBenefit1 = () => (
  <svg
    className="w-12 h-12 text-blue-600 mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2 2zm0 8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2 2zm0-4c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2 2z"
    />
  </svg>
);

const IconBenefit2 = () => (
  <svg
    className="w-12 h-12 text-blue-600 mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13.5M8.25 6.253h7.5M8.25 19.753h7.5M3.75 13.5h16.5"
    />
  </svg>
);


interface PartnerProgramCardProps {
  title: string;
  description: string;
  borderColor: string;
}

function PartnerProgramCard({
  title,
  description,
  borderColor,
}: PartnerProgramCardProps) {
  return (
    <div
      className={`bg-white border-2 ${borderColor} rounded-lg shadow-lg p-6 flex flex-col transition duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <h3 className="text-h6 text-black mb-5">{title}</h3>
      <p className="text-black mb-5 text-body2 flex-grow">{description}</p>
      <a
        href="#"
        className="text-blue-600 font-semibold hover:underline mt-auto"
      >
        Tìm hiểu thêm →
      </a>
    </div>
  );
}

// Component con cho các quyền lợi
interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center md:flex-row md:text-left md:items-start">
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">{icon}</div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default function BusinessActivities() {
  return (
    <div className="w-full bg-white py-10">
  
      <CTASection ctaSection={staticCtaData} />

      <section className="py-15 px-6">
        <h2 className="text-center text-black mb-15">
          Chương Trình Hợp Tác Dành Cho Bạn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Card 1 */}
          <PartnerProgramCard
            title="Đối Tác Công Nghệ"
            description="Cùng phát triển và thử nghiệm các sản phẩm công nghệ mới"
            borderColor="border-blue-500"
          />
          {/* Card 2 */}
          <PartnerProgramCard
            title="Cộng Tác Viên"
            description="Tham gia quản bá thương hiệu V-Pharma đến cộng đồng"
            borderColor="border-yellow-500"
          />
          {/* Card 3 */}
          <PartnerProgramCard
            title="Cộng Tác Viên"
            description="Tham gia quản bá thương hiệu V-Pharma đến cộng đồng"
            borderColor="border-green-500"
          />
          {/* Card 4 */}
          <PartnerProgramCard
            title="Cộng Tác Viên"
            description="Tham gia quản bá thương hiệu V-Pharma đến cộng đồng"
            borderColor="border-red-500"
          />
        </div>
      </section>

      <section className="py-15 ">
        <h2 className="text-center text-black mb-15">
          Quyền Lợi Dành Cho Đối Tác
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <BenefitCard
            icon={<IconBenefit1 />}
            title="Kiếm thêm thu nhập"
            description="Mỗi dự án hợp tác đều có khoản hoa hồng xứng đáng để hỗ trợ các Partner của VPharma"
          />
          {/* Card 2 */}
          <BenefitCard
            icon={<IconBenefit2 />}
            title="Đào tạo và các tài liệu hướng dẫn chuyên nghiệp"
            description="Mỗi dự án hợp tác đều có khoản hoa hồng xứng đáng để hỗ trợ các Partner của VPharma"
          />
        </div>
      </section>
    </div>
  );
}

