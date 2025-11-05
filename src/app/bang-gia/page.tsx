"use client";

import { FiCheck } from "react-icons/fi";
import { pricingPageData } from "@/lib/api/pricing";
import { Button } from "@/components/ui/CTAButton";
import type { Feature } from "@/types";

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

import FaqSection from "@/components/Faq";

import CTASection from "@/components/CTA";
import React from "react";

export default function PricePage() {
  const { pricingPlans, featureCategories, faqSection, ctaSection } =
    pricingPageData;
  const plans = pricingPlans;

  const HEADER_ROW_HEIGHT = "h-[220px]";
  const CATEGORY_ROW_HEIGHT = "h-[57px]";
  const FEATURE_ROW_HEIGHT = "h-[57px]";

  const getFeatureDisplayValue = (feature: Feature, planId: number) => {
    const planValue = feature.PlanValues?.[planId];
    if (!planValue) return null;

    // Nếu có value (string hay number), trả value
    if (
      planValue.value !== undefined &&
      planValue.value !== null &&
      planValue.value !== ""
    ) {
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
      <section className="bg-gradient-to-b from-blue-100 to-white py-10 text-center">
        {/* === PHẦN HEADER === */}
        <div className="container mx-auto px-4 lg:px-80">
          <h1 className="mt-10 text-h1 font-bold text-ink">
            {pricingPageData.title}
          </h1>
          <p className="mx-auto mt-4 mb-10 max-w-2xl text-h6">
            {pricingPageData.description}
          </p>
        </div>

        {/* === PHẦN BẢNG GIÁ === */}
        <div className="w-full ">
          <div className="container mx-auto max-w-7xl px-4 ">
            <div className="min-w-[1200px] grid grid-cols-5 gap-x-4">
              {/* === CỘT TÍNH NĂNG (CỘT 1) === */}
              <div className="sticky rounded-lg left-0 bg-gradient-to-b from-blue-100 to-white z-20">
                {/* Header trái */}
                <div className={`${HEADER_ROW_HEIGHT} flex flex-col items-center justify-center pb-5`}>
                  <h2 className="text-black text-h5 mb-5 text-center">
                    Thông Tin Về Các Gói
                    <span className="mx-2 text-[28px] text-primary">V-Pharma</span>
                  </h2>
                  <Button
                    size="md"
                    href="/dang-ky"
                    className="hover:shadow-primary/40 hover:shadow-lg "
                  >
                    Đăng ký dùng thử
                  </Button>
                </div>

                {/* Lặp qua các category và feature titles */}
                {featureCategories.map((category) => (
                  <div key={category.title}>
                    {/* Tiêu đề Cấp 1 */}
                    <div
                      className={`${CATEGORY_ROW_HEIGHT} p-5 flex items-center border-gray-200`}
                    >
                      <h4 className="text-body2 font-bold text-ink">
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
                  className="w-full rounded-lg border border-gray-200 bg-white "
                >
                  {/* Header của Card - Sticky */}
                  <div className="sticky top-0 z-30 bg-white rounded-t-lg border-gray-200 ">
                    <div
                      className={`${HEADER_ROW_HEIGHT} p-6 text-center flex flex-col justify-center`}
                    >
                      <h3 className="text-xl font-bold text-ink">
                        {plan.name}
                      </h3>
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
                  </div>

                  {/* Body của Card (Lặp qua features) */}
                  <div>
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
                            {renderFeatureValue(
                              getFeatureDisplayValue(feature, plan.id)
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
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
