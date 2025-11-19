"use client";

import { FiCheck, FiChevronDown } from "react-icons/fi";
import { pricingPageData } from "@/lib/api/pricing";
import { Button } from "@/components/ui/CTAButton";
import type { Feature } from "@/types";
import FaqSection from "@/components/Faq";
import CTASection from "@/components/CTA";
import React, { useState } from "react";

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

  //THÊM STATE ĐỂ QUẢN LÝ VIỆC ĐÓNG/MỞ
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  // THÊM HÀM XỬ LÝ CLICK
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
      <section className="bg-gradient-to-b from-blue-100 to-white ">
        {/* === PHẦN HEADER === */}
        <div className=" container py-15 text-center">
          <div className=" mx-auto lg:px-80">
            <h1 className="mb-6 ">{pricingPageData.title}</h1>
            <p className="mx-auto mb-10 max-w-lg text-body2 md:text-sub1 lg:text-h6 text-colordescription md:max-w-xl lg:max-w-2xl">
              {pricingPageData.description}
            </p>
          </div>

          {/* === PHẦN BẢNG GIÁ === */}
          <div className="w-full ">
            <div className=" mx-auto max-w-7xl ">
              <div className="grid grid-cols-[170px_1fr] sm:grid-cols-[220px_1fr] gap-x-4">
                {/* === CỘT TÍNH NĂNG (CỘT 1) === */}
                <div className="sticky rounded-lg left-0 z-20">
                  {/* Header trái */}
                  <div
                    className={`${HEADER_ROW_HEIGHT} flex flex-col items-center justify-center `}
                  >
                    <h2 className="text-black lg:text-h5 md:text-h6 text-sub1 mb-5 text-center">
                      Thông Tin Về Các Gói
                      <span className="mx-2 lg:text-[28px] md:text-h5 text-body3 text-primary">
                        Vpharma
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
                          className={`h-[57px] py-4 flex items-center justify-between border-gray-200 ${
                            isFirstCategory ? "" : "cursor-pointer"
                          }`}
                          onClick={
                            !isFirstCategory
                              ? () => toggleCategory(category.title)
                              : undefined
                          }
                        >
                          <h4 className="text-sm sm:text-body2 font-bold text-black text-left">
                            {category.title}
                          </h4>
                          {/* THÊM ICON (CHỈ KHI KHÔNG PHẢI MỤC ĐẦU) */}
                          {!isFirstCategory && (
                            <span className="text-black">
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
                        {/*CHỈ HIỆN KHI KHÔNG BỊ THU GỌN */}
                        <div
                          className={`
                        transition-[max-height] duration-300 ease-in-out overflow-hidden 
                        ${isCollapsed ? "max-h-0" : "max-h-[1000px]"}
                      `}
                        >
                          {category.features.map((feature) => (
                            <div
                              key={feature.id}
                              className={`h-[57px] px-3 py-4 flex items-start relative`}
                            >
                              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-200" />
                              <div className="text-xs sm:text-sm text-colordescription text-left">
                                {feature.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* === CARDS GÓI (CỘT 2-5) === */}
                <div className="overflow-x-auto xl:overflow-visible">
                  <div className="min-w-[750px] sm:min-w-[900px] grid grid-cols-4 gap-x-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className="w-full rounded-lg border border-gray-200 bg-white relative"
                      >
                        {/* Header của Card - Sticky */}
                        <div className="relative xl:sticky top-0 z-30 bg-white rounded-t-lg border-gray-200">
                          <div
                            className={`${HEADER_ROW_HEIGHT} p-6 text-center flex flex-col justify-center`}
                          >
                            <h3 className="text-sub2 sm:text-sub1 font-bold text-black">
                              {plan.name}
                            </h3>
                            <div className="">
                              <h4 className="text-sm sm:text-body2 font-bold text-primary ">
                                {plan.price}
                                <span className="text-xs sm:text-sm colordescription text-gray-500">
                                  {" "}
                                  {plan.billingCycle}
                                </span>
                              </h4>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 h-[30px]">
                              <p>{plan.trialNote}</p>
                              <p>{plan.audienceNote}</p>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-gray-200"></div>
                          </div>
                        </div>

                        {/* Body của Card (Lặp qua features) */}
                        <div>
                          {featureCategories.map((category, index) => {
                            const isFirstCategory = index === 0;
                            const isCollapsed = isFirstCategory
                              ? false
                              : !!collapsedCategories[category.title];

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
                                      className={`h-[57px] p-4 text-center text-xs sm:text-sm text-colordescription relative border-gray-200 flex items-start justify-center`}
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
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
        <FaqSection title={faqSection.title} items={faqSection.faqItems} />

      {/* Final CTA Section */}
      <CTASection ctaSection={ctaSection} />
    </div>
  );
}
