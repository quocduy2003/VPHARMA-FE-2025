
"use client";

import { FiCheck } from "react-icons/fi";
// import {
//   plans,
//   featureCategories,
//   type FeatureValue,
// } from "@/data/pricing-data";
import { pricingPageData } from "@/lib/api/pricing";
import type { Feature } from "@/types";

// 1. CẬP NHẬT: "Coming soon" thành text thường (giống ảnh mới)
type FeatureDisplayValue = string | boolean | null | undefined | number;
const renderFeatureValue = (value: FeatureDisplayValue) => {

  // Nếu không có value → xử lý theo trạng thái isActive (true / false)
  if (value === true) {
    return <FiCheck className="mx-auto text-xl text-green-500" />;
  }

  if (value === false) {
    return <span className="text-gray-400">-</span>;
  }
  if (value !== undefined && value !== null && value !== "") {
    return value;
  }
  // Nếu tất cả đều null / rỗng → trả dấu gạch
  return <span className="text-gray-400">-</span>;
};


import FaqSection, { type Faq } from "@/components/Faq";
const hoTroFaqData: Faq[] = [
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
  const { pricingPlans, featureCategories } = pricingPageData
  const plans = pricingPlans;

  // Hằng số để đảm bảo chiều cao các hàng đồng bộ
  const HEADER_ROW_HEIGHT = "h-[220px]";
  const CATEGORY_ROW_HEIGHT = "h-[57px]";
  const FEATURE_ROW_HEIGHT = "h-[57px]";
  // Lấy giá trị hiển thị đúng ưu tiên value nếu có, ngược lại dựa theo trạng thái

  const getFeatureDisplayValue = (feature: Feature, planId: number) => {
    const planValue = feature.PlanValues?.[planId];
    if (!planValue) return null;

    // Nếu có value (string hay number), trả value
    if (planValue.value !== undefined && planValue.value !== null && planValue.value !== "") {
      return planValue.value;
    }
    console.log("planValue", planValue, typeof planValue.isActive);
    // Nếu không có value -> xét theo trạng thái
    if (planValue.isActive === true) return true;
    if (planValue.isActive === false) return false;

    return null;
  };


  return (
    <div>
      {/* CẬP NHẬT: Gộp 2 section thành 1.
        Section này sẽ chứa cả Header (H1, P) và Bảng giá.
      */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-10 text-center ">
        {/* === PHẦN HEADER === */}
        <div className="container mx-auto px-4 lg:px-80">
          <h1 className="mt-10 text-h1 font-bold text-ink">
            Bảng giá V-Pharma
          </h1>
          <p className="mx-auto mt-4 mb-10 max-w-2xl text-h6">
            Giải pháp toàn diện cho quản lý nhà thuốc, từ tồn kho đến bán hàng,
            với công nghệ hiện đại và dễ sử dụng.
          </p>
        </div>

        {/* === PHẦN BẢNG GIÁ === */}
        <div className="container mx-auto max-w-7xl ">
          <div className="overflow-x-auto">
            <div className="min-w-[1200px] grid grid-cols-5 gap-x-4">
              {/* === CỘT TÍNH NĂNG (CỘT 1) === */}
              <div className="sticky left-0">
                {/* Header trái */}
                {/* CẬP NHẬT: Bỏ pt-6, thêm text-left */}
                <div className={`${HEADER_ROW_HEIGHT} text-left`}>
                  <h2 className="text-black">
                    Thông Tin Về Các Gói
                    <br />
                    {/* CẬP NHẬT: Sửa 'text-primaty' -> 'text-primary' */}
                    <span className="text-primary">V-Pharma</span>
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
                      className={`${CATEGORY_ROW_HEIGHT} p-4 flex items-center border-gray-200`}
                    >
                      <h4 className="text-base font-bold text-ink">
                        {category.title}
                      </h4>
                    </div>
                    {/* Tiêu đề Cấp 2 */}
                    {category.features.map((feature) => (
                      <div
                        key={feature.id}
                        className={`${FEATURE_ROW_HEIGHT} p-4 flex items-start border-t border-gray-200`}
                      >
                        <div className="text-sm text-colordescription text-left">
                          {feature.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* === 4 CARDS GÓI (CỘT 2-5) === */}
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="w-full rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  {/* Header của Card */}
                  <div className={`${HEADER_ROW_HEIGHT} p-6 text-center`}>
                    <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
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
                        className={`${CATEGORY_ROW_HEIGHT} p-4 border-gray-200`}
                      >
                        &nbsp;
                      </div>
                      {/* Lặp qua các feature values */}
                      {category.features.map((feature) => (
                        <div
                          key={feature.id}
                          className={`${FEATURE_ROW_HEIGHT} p-4 text-center text-sm text-ink border-t border-gray-200`}
                        >
                          {renderFeatureValue(getFeatureDisplayValue(feature, plan.id))}
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
      {/* === KẾT THÚC SECTION CHUNG === */}

      {/* FAQ Section */}
      <FaqSection title="Câu Hỏi Thường Gặp" items={hoTroFaqData} />

      {/* Final CTA Section */}
      <CTASection ctaSection={finalCtaData} />
    </div>
  );
}