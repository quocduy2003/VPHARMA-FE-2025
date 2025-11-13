"use client";

import { FiCheck, FiChevronDown } from "react-icons/fi"; // 1. IMPORT THÊM
import { pricingPageData } from "@/lib/api/pricing";
import { Button } from "@/components/ui/CTAButton";
import type { Feature } from "@/types";
import FaqSection from "@/components/Faq";
import CTASection from "@/components/CTA";
import React, { useState } from "react"; // 1. IMPORT THÊM

type FeatureDisplayValue = string | boolean | null | undefined | number;
const renderFeatureValue = (value: FeatureDisplayValue) => {
  if (value === true) {
    return <FiCheck className="mx-auto text-xl text-green-500" />;
  }

  if (value === false) {
    return <span className="text-gray-400">-</span>;
  }
  if (value !== undefined && value !== null && value !== "") {
    return value;
  }
  return <span className="text-gray-400">-</span>;
};

export default function PricePage() {
  const { pricingPlans, featureCategories, faqSection, ctaSection } =
    pricingPageData;
  const plans = pricingPlans;

  const HEADER_ROW_HEIGHT = "h-[220px]";
  // const CATEGORY_ROW_HEIGHT = "h-[57px]";
  // const FEATURE_ROW_HEIGHT = "h-[57px]";

  // 2. THÊM STATE ĐỂ QUẢN LÝ VIỆC ĐÓNG/MỞ
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  // 3. THÊM HÀM XỬ LÝ CLICK
  const toggleCategory = (categoryTitle: string) => {
    setCollapsedCategories((prev) => {
      const newCollapsed = { ...prev };
      if (newCollapsed[categoryTitle]) {
        delete newCollapsed[categoryTitle]; // Mở ra
      } else {
        newCollapsed[categoryTitle] = true; // Thu lại
      }
      return newCollapsed;
    });
  };

  const getFeatureDisplayValue = (feature: Feature, planId: number) => {
    const planValue = feature.PlanValues?.[planId];
    if (!planValue) return null;

    if (
      planValue.value !== undefined &&
      planValue.value !== null &&
      planValue.value !== ""
    ) {
      return planValue.value;
    }
    console.log("planValue", planValue, typeof planValue.isActive);
    if (planValue.isActive === true) return true;
    if (planValue.isActive === false) return false;

    return null;
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-blue-100 to-white py-10 text-center">
        {/* === PHẦN HEADER === */}
        <div className="container mx-auto px-4 lg:px-80">
          <h1 className="mt-10 text-h1 font-bold text-black">
            {pricingPageData.title}
          </h1>
          <p className="mx-auto mt-4 mb-10 max-w-3xl text-h6 text-colordescription">
            {pricingPageData.description}
          </p>
        </div>

        {/* === PHẦN BẢNG GIÁ === */}
        <div className="w-full ">
          <div className="container mx-auto max-w-7xl px-4 ">
            <div className="min-w-[1200px] grid grid-cols-5 gap-x-4">
              {/* === CỘT TÍNH NĂNG (CỘT 1) === */}
              <div className="sticky rounded-lg left-0 z-20">
                {/* Header trái */}
                <div
                  className={`${HEADER_ROW_HEIGHT} flex flex-col items-center justify-center `}
                >
                  <h2 className="text-black text-h5 mb-5 text-center">
                    Thông Tin Về Các Gói
                    <span className="mx-2 text-[28px] text-primary">
                      V-Pharma
                    </span>
                  </h2>
                  <Button
                    size="lg"
                    href="/dang-ky"
                    className="hover:shadow-primary/40 hover:shadow-lg "
                  >
                    Đăng ký dùng thử
                  </Button>
                </div>

                {/* Lặp qua các category và feature titles */}
                {featureCategories.map((category, index) => {
                  const isFirstCategory = index === 0;
                  const isCollapsed = isFirstCategory
                    ? false
                    : !!collapsedCategories[category.title];

                  return (
                    <div key={category.title}>
                      {/* Tiêu đề Cấp 1 */}
                      <div
                        className={`h-[57px] p-4 flex items-center justify-between border-gray-200 ${
                          isFirstCategory ? "" : "cursor-pointer"
                        }`}
                        onClick={
                          !isFirstCategory
                            ? () => toggleCategory(category.title)
                            : undefined
                        }
                      >
                        <h4 className="text-body2 font-bold text-black text-left">
                          {category.title}
                        </h4>
                        {/* 4. THÊM ICON (CHỈ KHI KHÔNG PHẢI MỤC ĐẦU) */}
                        {!isFirstCategory && (
                          <span className="text-ink">
                            <FiChevronDown
                              className={`
                text-xl transition-transform duration-300 ease-in-out
                ${isCollapsed ? "-rotate-90" : "rotate-0"}
              `}
                            />
                          </span>
                        )}{" "}
                        {/* ĐÓNG ĐIỀU KIỆN */}
                      </div>
                      {/* Tiêu đề Cấp 2 */}
                      {/* 4. CHỈ HIỆN KHI KHÔNG BỊ THU GỌN */}
                      <div
                        className={`
                        transition-[max-height] duration-300 ease-in-out overflow-hidden 
                        ${isCollapsed ? "max-h-0" : "max-h-[1000px]"}
                      `}
                      >
                        {category.features.map((feature) => (
                          <div
                            key={feature.id}
                            className={`h-[57px] p-4 flex items-start relative`}
                          >
                            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gray-200"></div>
                            <div className="text-sm text-colordescription text-left">
                              {feature.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* === 4 CARDS GÓI (CỘT 2-5) === */}
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="w-full rounded-lg border border-gray-200 bg-white relative"
                >
                  {/* Header của Card - Sticky */}
                  <div className="sticky top-0 z-30 bg-white rounded-t-lg border-gray-200 ">
                    <div
                      className={`${HEADER_ROW_HEIGHT} p-6 text-center flex flex-col justify-center`}
                    >
                      <h3 className="text-xl font-bold text-black">
                        {plan.name}
                      </h3>
                      <div className="">
                        <h4 className="text-sub2 font-bold text-primary">
                          {plan.price}
                          <span className="text-sm colordescription text-gray-500">
                            {" "}
                            {plan.billingCycle}
                          </span>
                        </h4>
                      </div>
                      <div className="text-xs text-gray-500 h-[30px]">
                        <p>{plan.trialNote}</p>
                        <p>{plan.audienceNote}</p>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-gray-200"></div>
                    </div>
                  </div>

                  {/* Body của Card (Lặp qua features) */}
                  <div>
                    {featureCategories.map((category,index) => {
                      const isFirstCategory = index === 0;
                      const isCollapsed = isFirstCategory ? false : !!collapsedCategories[category.title];

                      return (
                        <div key={category.title}>
                          {/* Ô trống cho Category title */}
                          <div
                            className={`h-[57px] p-4 border-gray-200 `}
                          >
                            &nbsp;
                          </div>
                          <div
                            className={`
                              transition-[max-height] duration-300 ease-in-out overflow-hidden 
                              ${isCollapsed ? "max-h-0" : "max-h-[1000px]"}
                            `}
                          >
                            {category.features.map((feature) => (
                              <div
                                key={feature.id}
                                className={`h-[57px] p-4 text-center text-sm text-colordescription relative border-gray-200 flex items-start justify-center`}
                              >
                                <div className="absolute top-0 left-4 right-4 h-[1px] bg-gray-200"></div>
                                {renderFeatureValue(
                                  getFeatureDisplayValue(feature, plan.id)
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* === KẾT THÚC SECTION CHUNG === */}

      {/* FAQ Section */}
      <FaqSection title={faqSection.title} items={faqSection.faqItems} />

      {/* Final CTA Section */}
      <CTASection ctaSection={ctaSection} />
    </div>
  );
}
